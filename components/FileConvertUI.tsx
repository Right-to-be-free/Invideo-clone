"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // ✅ make sure this path is correct

export default function FileConvertUI() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "jpg" || ext === "jpeg" || ext === "png") setFileType("image");
    else if (ext === "pdf") setFileType("pdf");
    else if (ext === "docx" || ext === "doc") setFileType("word");
    else setFileType("unknown");
  };

  const handleConvert = () => {
    if (!selectedFile) return alert("❗ No file selected");

    if (fileType === "image") {
      alert("🖼️ Image → PDF conversion coming soon...");
    } else if (fileType === "word") {
      alert("📄 DOCX → PDF conversion coming soon...");
    } else if (fileType === "pdf") {
      alert("🔄 PDF → Word/Image coming soon...");
    } else {
      alert("⚠️ Unsupported file type");
    }
  };

  // ✅ Handle sign out using Supabase
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Failed to sign out: " + error.message);
    } else {
      window.location.href = "/"; // or redirect to /login
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "2rem", borderRadius: "8px" }}>
      <h2 className="text-xl font-semibold mb-4">📁 File Converter</h2>

      <input type="file" onChange={handleFileChange} />

      {previewURL && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Preview:</strong>
          <br />
          {fileType === "image" && (
            <img
              src={previewURL}
              alt="Preview"
              style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "8px" }}
            />
          )}
          <p className="text-sm mt-2 text-gray-600">{selectedFile?.name}</p>
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleConvert}
        >
          Convert
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
