import React, { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("convert");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [conversionType, setConversionType] = useState("word-to-pdf");
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setConvertedUrl(null);
  };

  const handleProcess = async () => {
    if (!selectedFiles.length) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    formData.append("conversionType", conversionType);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setConvertedUrl(data.downloadUrl);
      } else {
        alert("Conversion failed.");
      }
    } catch (err) {
      console.error("Error during conversion:", err);
      alert("Something went wrong.");
    }
  };

  const renderTab = () => {
    return (
      <div className="bg-white shadow rounded-lg p-6 mt-4">
        {activeTab === "convert" && (
          <>
            <h2 className="text-lg font-semibold mb-4">Convert Files</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Conversion Type</label>
              <select
                className="w-full border px-3 py-2 rounded text-sm"
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
              >
                <option value="word-to-pdf">Word → PDF</option>
                <option value="jpeg-to-pdf">JPEG → PDF</option>
                <option value="pdf-to-jpeg">PDF → JPEG</option>
                <option value="pdf-to-png">PDF → PNG</option>
              </select>
            </div>
          </>
        )}

        <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-all">
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFileSelect}
          />
          <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-base text-gray-700">Drag and drop files here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-4 bg-gray-50 p-4 rounded shadow-inner">
            <h3 className="text-sm font-semibold mb-2">Selected Files</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {selectedFiles.map((file, i) => (
                <li key={i}>📎 {file.name}</li>
              ))}
            </ul>
            <button
              onClick={handleProcess}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              🔄 Process Conversion
            </button>

            {convertedUrl && (
              <div className="mt-4">
                <a
                  href={convertedUrl}
                  download
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  ⬇️ Download Converted File
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📁 Dashboard – File Tools</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Dashboard</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Templates</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">+ Create</button>
        </div>
      </header>

      <div className="bg-white text-gray-800 rounded-lg shadow-md p-4">
        <div className="flex border-b">
          {["convert", "merge", "compress", "edit"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab === "convert" && "🔄 Convert"}
              {tab === "merge" && "🔗 Merge"}
              {tab === "compress" && "🗜️ Compress"}
              {tab === "edit" && "🕋️ Edit"}
            </button>
          ))}
        </div>
        {renderTab()}
      </div>

      <div className="bg-white text-gray-800 rounded-lg shadow-md mt-8 p-6">
        <h2 className="text-lg font-semibold mb-4">⚙️ Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-100 rounded">
            <strong>✅ File Conversion</strong>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>Word, PDF, JPEG</li>
              <li>Image ↔ PDF ↔ DOCX</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <strong>🔗 File Merging</strong>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>PDFs, images to single file</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <strong>🗜️ Compression</strong>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>Image & PDF compression</li>
              <li>Resize & reduce size</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <strong>🕋️ Inline Editing</strong>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>Edit DOCX, TXT, Markdown</li>
              <li>Basic image editor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
