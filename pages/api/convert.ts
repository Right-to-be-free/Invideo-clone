import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable"; // ✅ Fixed import
import fs from "fs";
import path from "path";
import libre from "libreoffice-convert";
import sharp from "sharp";

export const config = {
  api: { bodyParser: false }, // Needed for file uploads
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  const convertedDir = path.join(process.cwd(), "public/converted");

  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.mkdirSync(convertedDir, { recursive: true });

  const form = new IncomingForm({ uploadDir: uploadsDir, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      console.error("🛑 Formidable parse error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    try {
      const uploaded = Array.isArray(files.file) ? files.file[0] : files.file;
      const inputPath = uploaded.filepath;
      const originalName = uploaded.originalFilename || "unknown.docx";
      const fileName = path.basename(inputPath);
      const outputPath = path.join(convertedDir, `converted_${fileName}`);

      const conversionType = Array.isArray(fields.conversionType)
        ? fields.conversionType[0]
        : fields.conversionType;

      console.log("=== New Conversion Request ===");
      console.log("📝 File:", originalName);
      console.log("📁 Path:", inputPath);
      console.log("⚙️ Type:", conversionType);

      if (!fs.existsSync(inputPath)) {
        return res.status(400).json({ error: "File not found on server" });
      }

      // WORD ➝ PDF
      if (conversionType === "word-to-pdf") {
        const docxBuf = fs.readFileSync(inputPath);
        console.log("📦 DOCX buffer size:", docxBuf.length);

        const pdfBuf = await new Promise<Buffer>((resolve, reject) => {
          libre.convert(docxBuf, ".pdf", undefined, (err, done) => {
            if (err) {
              console.error("🔥 LibreOffice conversion error:", err);
              return reject(err);
            }
            resolve(done as Buffer);
          });
        });

        const pdfPath = outputPath.replace(/\.(docx|doc)$/i, ".pdf");
        fs.writeFileSync(pdfPath, pdfBuf);
        fs.unlinkSync(inputPath); // Cleanup

        console.log("✅ PDF created:", pdfPath);
        return res.status(200).json({ downloadUrl: `/converted/${path.basename(pdfPath)}` });
      }

      // JPEG ➝ PDF
      if (conversionType === "jpeg-to-pdf") {
        const pdfPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, ".pdf");
        await sharp(inputPath).pdf().toFile(pdfPath);
        fs.unlinkSync(inputPath);
        return res.status(200).json({ downloadUrl: `/converted/${path.basename(pdfPath)}` });
      }

      // PDF ➝ JPEG
      if (conversionType === "pdf-to-jpeg") {
        const jpgPath = outputPath.replace(/\.pdf$/i, ".jpg");
        await sharp(inputPath).jpeg().toFile(jpgPath);
        fs.unlinkSync(inputPath);
        return res.status(200).json({ downloadUrl: `/converted/${path.basename(jpgPath)}` });
      }

      // PDF ➝ PNG
      if (conversionType === "pdf-to-png") {
        const pngPath = outputPath.replace(/\.pdf$/i, ".png");
        await sharp(inputPath).png().toFile(pngPath);
        fs.unlinkSync(inputPath);
        return res.status(200).json({ downloadUrl: `/converted/${path.basename(pngPath)}` });
      }

      console.warn("⚠️ Unsupported conversion type:", conversionType);
      return res.status(400).json({ error: "Unsupported conversion type" });

    } catch (e: any) {
      console.error("🔥 Conversion error:", e.stack || e.message || e);
      return res.status(500).json({
        error: "Conversion failed",
        message: e.message || "Unexpected server error",
      });
    }
  });
}
