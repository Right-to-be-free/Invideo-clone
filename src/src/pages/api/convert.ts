import PDFDocument from 'pdfkit';
import fs from 'fs';

if (conversionType === "jpeg-to-pdf") {
  const doc = new PDFDocument();
  const pdfStream = fs.createWriteStream(pdfPath);

  doc.pipe(pdfStream);
  doc.image(inputPath, 0, 0, { fit: [500, 700] }); // Adjust if needed
  doc.end();

  await new Promise((resolve, reject) => {
    pdfStream.on('finish', resolve);
    pdfStream.on('error', reject);
  });

  fs.unlinkSync(inputPath);

  return res.status(200).json({ downloadUrl: `/converted/${path.basename(pdfPath)}` });
}
