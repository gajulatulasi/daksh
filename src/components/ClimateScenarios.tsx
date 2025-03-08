import React from 'react';
import { Cloud, CloudRain, CloudSnow, Waves, Thermometer } from 'lucide-react';

interface ScenarioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ElementType;
  probability: number;
}

function ScenarioCard({ title, description, imageUrl, icon: Icon, probability }: ScenarioCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
          <Icon className="w-5 h-5" />
          <span className="font-semibold">{title}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Probability</span>
          <span className="text-sm font-semibold text-primary">{probability}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${probability}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function ClimateScenarios() {
  const scenarios = [
    {
      title: 'Rising Sea Levels',
      description: 'Coastal areas experiencing significant flooding due to accelerated ice melt and thermal expansion of oceans.',
      imageUrl: 'https://images.unsplash.com/photo-1544585424-0c7c12c4a533?auto=format&fit=crop&w=800&q=80',
      icon: Waves,
      probability: 85
    },
    {
      title: 'Extreme Weather',
      description: 'Increased frequency and intensity of storms, hurricanes, and other extreme weather events.',
      imageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=800&q=80',
      icon: CloudRain,
      probability: 78
    },
    {
      title: 'Temperature Rise',
      description: 'Urban heat islands and prolonged heat waves affecting metropolitan areas globally.',
      imageUrl: 'https://images.unsplash.com/photo-1583589259561-3cd05571f369?auto=format&fit=crop&w=800&q=80',
      icon: Thermometer,
      probability: 92
    },
    {
      title: 'Arctic Changes',
      description: 'Rapid ice melt and permafrost thaw leading to significant ecosystem changes.',
      imageUrl: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&w=800&q=80',
      icon: CloudSnow,
      probability: 89
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">AI-Generated Climate Scenarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.title} {...scenario} />
        ))}
      </div>
    </div>
  );
}