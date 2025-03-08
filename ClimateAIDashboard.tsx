import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Thermometer,
  Droplets,
  Waves,
  AlertTriangle,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react';

const regions = [
  'Global',
  'North America',
  'Europe',
  'Asia',
  'Africa',
  'South America',
  'Oceania'
];

const historicalData = [
  { year: 1900, temperature: -0.2 },
  { year: 1950, temperature: 0 },
  { year: 2000, temperature: 0.5 },
  { year: 2023, temperature: 1.1 },
  { year: 2030, temperature: 1.3 },
  { year: 2040, temperature: 1.4 },
  { year: 2050, temperature: 1.6 }
];

// Metric calculation functions
const calculateMetrics = (year: number) => {
  const baseYear = 2023;
  const yearDiff = year - baseYear;
  
  // Temperature: Linear increase from 1.1°C (2023) to 1.6°C (2050)
  const tempIncrease = 1.1 + (yearDiff * (1.6 - 1.1) / (2050 - 2023));
  
  // Precipitation: Increases from 0% (2023) to 5.3% (2050)
  const precipChange = (yearDiff * 5.3 / (2050 - 2023));
  
  // Sea Level: Linear rise from 0cm (2023) to 26.3cm (2050)
  const seaLevelRise = (yearDiff * 26.3 / (2050 - 2023));
  
  // Extreme Events: Increases from 0% (2023) to 32% (2050)
  const extremeEvents = (yearDiff * 32 / (2050 - 2023));

  return {
    temperature: tempIncrease.toFixed(1),
    precipitation: precipChange.toFixed(1),
    seaLevel: seaLevelRise.toFixed(1),
    extremeEvents: extremeEvents.toFixed(1)
  };
};

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

function MetricCard({ icon: Icon, title, value, description }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function ImpactCard({ level, description, color }: { level: string; description: string; color: string }) {
  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <h4 className="font-semibold mb-2">{level}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default function ClimateAIDashboard() {
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [selectedYear, setSelectedYear] = useState(2050);

  // Calculate metrics based on selected year
  const metrics = useMemo(() => calculateMetrics(selectedYear), [selectedYear]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Climate Change Prediction Dashboard</h1>
        <p className="text-gray-600">
          Advanced AI-powered analysis and predictions for climate change impacts across different regions.
          Our models provide insights with 85% confidence level based on historical data and current trends.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Region Selection</h2>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Prediction Timeframe</h2>
          <input
            type="range"
            min="2023"
            max="2050"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">Year: {selectedYear}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Thermometer}
          title="Temperature"
          value={`+${metrics.temperature}°C`}
          description={`Projected increase by ${selectedYear}`}
        />
        <MetricCard
          icon={Droplets}
          title="Precipitation"
          value={`+${metrics.precipitation}%`}
          description={`Change in patterns by ${selectedYear}`}
        />
        <MetricCard
          icon={Waves}
          title="Sea Level Rise"
          value={`+${metrics.seaLevel}cm`}
          description={`Projected rise by ${selectedYear}`}
        />
        <MetricCard
          icon={AlertTriangle}
          title="Extreme Events"
          value={`+${metrics.extremeEvents}%`}
          description={`Increase in frequency by ${selectedYear}`}
        />
      </div>

      {/* Temperature Graph */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Historical and Projected Temperature</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Temperature Deviation (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactCard
          level="Low Impact"
          description="Regions with minimal climate change effects, requiring standard adaptation measures."
          color="border-green-200 bg-green-50"
        />
        <ImpactCard
          level="Moderate Impact"
          description="Areas experiencing notable changes, requiring significant adaptation strategies."
          color="border-yellow-200 bg-yellow-50"
        />
        <ImpactCard
          level="Severe Impact"
          description="Zones facing critical climate challenges, demanding immediate intervention."
          color="border-red-200 bg-red-50"
        />
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">AI Prediction Analysis</h2>
          <div className="text-sm text-gray-600">Confidence Level: 85%</div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Findings</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Temperature rise accelerating in urban areas</li>
              <li>Coastal regions face increased flooding risks</li>
              <li>Shifting precipitation patterns affect agriculture</li>
              <li>Biodiversity impacts in sensitive ecosystems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}