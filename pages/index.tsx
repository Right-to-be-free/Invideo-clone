import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white px-6 py-12 md:px-12 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
         All In One Editor
        </h1>
        <p className="text-lg text-gray-600">
          Powerful tools, beautiful templates, and AI magic — all in one platform.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition"
        >
          Get Started for Free
        </Link>
      </div>

      {/* Feature Section */}
      <section className="py-20 bg-gray-50 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose All In One Editor?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Video Creation",
                desc: "Generate professional-quality videos from just text prompts.",
                icon: "⚡",
              },
              {
                title: "Drag & Drop Editor",
                desc: "Easily arrange scenes, add music, and control timing without editing skills.",
                icon: "🎨",
              },
              {
                title: "1000+ Templates",
                desc: "Pick from a massive library of high-converting templates.",
                icon: "📁",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-4 text-orange-500">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
