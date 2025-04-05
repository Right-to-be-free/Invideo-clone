import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample mock video data
const videoMockData = [
  { title: "AI Promo Video", thumbnail: "/thumb1.jpg" },
  { title: "Product Demo", thumbnail: "/thumb2.jpg" },
  { title: "Launch Teaser", thumbnail: "/thumb3.jpg" },
  { title: "Tutorial", thumbnail: "/thumb4.jpg" },
];

const chartMockData = [
  { name: "Jan", videos: 12 },
  { name: "Feb", videos: 18 },
  { name: "Mar", videos: 24 },
  { name: "Apr", videos: 10 },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(videoMockData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredVideos(
      videoMockData.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-10">
      {/* Header and action */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Create New Video
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Videos" value="36" />
        <Card title="Monthly Views" value="12.4K" />
        <Card title="Subscribers" value="1.2K" />
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full max-w-md px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Videos */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Videos</h2>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video, idx) => (
              <VideoCard key={idx} title={video.title} thumbnail={video.thumbnail} />
            ))}
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Uploads</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartMockData}>
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Bar dataKey="videos" fill="#3B82F6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}

function VideoCard({ title, thumbnail }: { title: string; thumbnail: string }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="text-md font-semibold text-gray-800">{title}</h4>
      </div>
    </div>
  );
}
