import {
  FileText,
  MessageSquare,
  GitCompare,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Summaries",
    desc: "Generate concise summaries from research papers instantly.",
  },
  {
    icon: MessageSquare,
    title: "Chat with PDFs",
    desc: "Ask questions and get answers directly from your documents.",
  },
  {
    icon: GitCompare,
    title: "Compare Papers",
    desc: "Compare methodologies, results and conclusions side by side.",
  },
  {
    icon: Brain,
    title: "Literature Reviews",
    desc: "Generate structured literature reviews in seconds.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6 bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition"
            >
              <feature.icon className="w-10 h-10 text-blue-500 mb-5" />

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;