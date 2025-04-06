export default function FeatureSection() {
  const features = [
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
  ];

  return (
    <section className="py-20 bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Invideo Clone?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
