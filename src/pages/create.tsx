

import { useState } from "react";

export default function CreateVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [scenes, setScenes] = useState<string[]>([]);

  const handleGenerateScenes = () => {
    // Mock logic: split the prompt into 3 scenes
    const sampleScenes = [
      "Scene 1: Intro with logo",
      "Scene 2: " + prompt,
      "Scene 3: Call to action",
    ];
    setScenes(sampleScenes);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">🎬 Create a New Video</h1>

        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Describe your video</label>
          <textarea
            className="w-full border rounded-md px-4 py-2 text-gray-800"
            placeholder="e.g., A modern ad for a coffee brand..."
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Music Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload music or voiceover (optional)</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
            className="border rounded-md px-3 py-2 text-sm"
          />
          {musicFile && <p className="mt-1 text-gray-600 text-sm">Uploaded: {musicFile.name}</p>}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateScenes}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Generate Scenes
        </button>

        {/* Scene Builder Preview */}
        {scenes.length > 0 && (
          <div className="space-y-4 mt-6">
            <h2 className="text-lg font-bold text-gray-800">Timeline Preview</h2>
            {scenes.map((scene, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-md shadow text-gray-800">
                <strong>Scene {idx + 1}:</strong> {scene}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
