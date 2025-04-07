import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // make sure this path is correct

export default function CreatePage() {
  const [prompt, setPrompt] = useState('');
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [scenes, setScenes] = useState<string[]>([]);

  const handleGenerateScenes = async () => {
    const sampleScenes = [
      `Scene 1: Intro with logo`,
      `Scene 2: ${prompt}`,
      `Scene 3: Call to action`,
    ];

    setScenes(sampleScenes);

    const { error } = await supabase.from('Table.csv').insert([
      {
        prompt,
        scenes: sampleScenes,
        music_url: musicFile?.name || null,
      },
    ]);

    if (error) {
      console.error('Error saving to Supabase:', error);
    } else {
      console.log('Saved to Supabase!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Page</h1>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <input
        type="file"
        onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleGenerateScenes}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Scenes
      </button>

      {scenes.length > 0 && (
        <ul className="mt-4">
          {scenes.map((scene, index) => (
            <li key={index}>{scene}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
