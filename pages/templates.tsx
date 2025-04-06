export default function Templates() {
  const templates = [
    { id: 1, title: "YouTube Intro", thumbnail: "/template1.jpg" },
    { id: 2, title: "Promo Video", thumbnail: "/template2.jpg" },
    { id: 3, title: "Instagram Reel", thumbnail: "/template3.jpg" },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Explore Templates</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {templates.map((t) => (
          <div key={t.id} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={t.thumbnail} alt={t.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{t.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
