import { FC } from "react";

interface RoadmapCardProps {
  phase: string;
  items: string[];
  status: "completed" | "current" | "upcoming";
}

const RoadmapCard: FC<RoadmapCardProps> = ({ phase, items, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50";
      case "current":
        return "border-blue-500 bg-blue-50";
      case "upcoming":
        return "border-gray-300 bg-white";
    }
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md border-2 ${getStatusColor()} transition-all duration-300 hover:shadow-lg`}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{phase}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Roadmap: FC = () => {
  return (
    <div className=" py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Development Roadmap
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <RoadmapCard
            phase="Phase I: Core Functionality"
            items={[
              "Document Ingestion & Preprocessing",
              "Agentic RAG for Data Extraction",
              "Template Processing",
              "API Development",
              "Basic Front End Interface",
            ]}
            status="current"
          />
          <RoadmapCard
            phase="Phase II: Enhanced Financial Planning"
            items={[
              "Refined Benchmarking & Analysis",
              "Interactive Chat & Feedback Loop",
              "Advanced Financial Metrics",
              "Industry-Specific Templates",
            ]}
            status="upcoming"
          />
          <RoadmapCard
            phase="Phase III: Commercialization"
            items={[
              "Comprehensive Dashboard",
              "ERP/CRM Integration",
              "Enhanced Security Features",
              "Enterprise Scaling Solutions",
            ]}
            status="upcoming"
          />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
