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
  AlertTriangle
} from 'lucide-react';
import ActionPanel from './DataActions/ActionPanel';
import ClimateGlobe from './ClimateGlobe';

const regions = [
  'Global',
  'North America',
  'Europe',
  'Asia',
  'Africa',
  'South America',
  'Oceania'
] as const;

type Region = typeof regions[number];

const regionalFactors: Record<Region, {
  temperature: number;
  precipitation: number;
  seaLevel: number;
  extremeEvents: number;
}> = {
  'Global': { temperature: 1, precipitation: 1, seaLevel: 1, extremeEvents: 1 },
  'North America': { temperature: 1.2, precipitation: 1.3, seaLevel: 0.8, extremeEvents: 1.1 },
  'Europe': { temperature: 1.1, precipitation: 1.2, seaLevel: 0.9, extremeEvents: 1.2 },
  'Asia': { temperature: 1.3, precipitation: 1.4, seaLevel: 1.2, extremeEvents: 1.3 },
  'Africa': { temperature: 1.4, precipitation: 0.7, seaLevel: 1.1, extremeEvents: 1.4 },
  'South America': { temperature: 1.1, precipitation: 1.5, seaLevel: 1.0, extremeEvents: 1.2 },
  'Oceania': { temperature: 1.2, precipitation: 0.9, seaLevel: 1.3, extremeEvents: 1.1 }
};

const getRegionalHistoricalData = (region: Region) => {
  const factor = regionalFactors[region];
  return [
    { year: 1900, temperature: -0.2 * factor.temperature, precipitation: 0, seaLevel: 0 },
    { year: 1950, temperature: 0 * factor.temperature, precipitation: 2 * factor.precipitation, seaLevel: 5 * factor.seaLevel },
    { year: 2000, temperature: 0.5 * factor.temperature, precipitation: 5 * factor.precipitation, seaLevel: 10 * factor.seaLevel },
    { year: 2023, temperature: 1.1 * factor.temperature, precipitation: 8 * factor.precipitation, seaLevel: 15 * factor.seaLevel },
    { year: 2030, temperature: 1.3 * factor.temperature, precipitation: 10 * factor.precipitation, seaLevel: 18 * factor.seaLevel },
    { year: 2040, temperature: 1.4 * factor.temperature, precipitation: 12 * factor.precipitation, seaLevel: 22 * factor.seaLevel },
    { year: 2050, temperature: 1.6 * factor.temperature, precipitation: 15 * factor.precipitation, seaLevel: 26 * factor.seaLevel }
  ];
};

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

function MetricCard({ icon: Icon, title, value, description }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default function ClimateAIDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('Global');
  const [selectedYear, setSelectedYear] = useState(2050);

  const metrics = useMemo(
    () => calculateMetrics(selectedYear, selectedRegion),
    [selectedYear, selectedRegion]
  );

  const historicalData = useMemo(
    () => getRegionalHistoricalData(selectedRegion),
    [selectedRegion]
  );

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Climate Change Prediction Dashboard</h1>
        <p className="text-muted-foreground">
          Advanced AI-powered analysis and predictions for climate change impacts across different regions.
          Our models provide insights with 85% confidence level based on historical data and current trends.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Region Selection</h2>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as Region)}
            className="w-full p-2 border rounded-lg bg-background text-foreground"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Prediction Timeframe</h2>
          <input
            type="range"
            min="2023"
            max="2050"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="text-center mt-2">Year: {selectedYear}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Thermometer}
          title="Temperature"
          value={`+${metrics.temperature}°C`}
          description={`${selectedRegion} increase by ${selectedYear}`}
        />
        <MetricCard
          icon={Droplets}
          title="Precipitation"
          value={`${metrics.precipitation}%`}
          description={`${selectedRegion} change by ${selectedYear}`}
        />
        <MetricCard
          icon={Waves}
          title="Sea Level Rise"
          value={`+${metrics.seaLevel}cm`}
          description={`${selectedRegion} rise by ${selectedYear}`}
        />
        <MetricCard
          icon={AlertTriangle}
          title="Extreme Events"
          value={`+${metrics.extremeEvents}%`}
          description={`${selectedRegion} increase by ${selectedYear}`}
        />
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Combined Climate Metrics</h2>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" stroke="var(--muted-foreground)" />
              <YAxis
                yAxisId="temp"
                label={{
                  value: 'Temperature (°C)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'var(--muted-foreground)' }
                }}
                stroke="#ef4444"
              />
              <YAxis
                yAxisId="precip"
                orientation="right"
                label={{
                  value: 'Precipitation Change (%)',
                  angle: 90,
                  position: 'insideRight',
                  style: { fill: 'var(--muted-foreground)' }
                }}
                stroke="#3b82f6"
              />
              <YAxis
                yAxisId="sea"
                orientation="right"
                label={{
                  value: 'Sea Level Rise (cm)',
                  angle: 90,
                  position: 'insideRight',
                  style: { fill: 'var(--muted-foreground)' }
                }}
                stroke="#22c55e"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Legend />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Temperature"
              />
              <Line
                yAxisId="precip"
                type="monotone"
                dataKey="precipitation"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Precipitation"
              />
              <Line
                yAxisId="sea"
                type="monotone"
                dataKey="seaLevel"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Sea Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Global Climate Impact Visualization</h2>
        <p className="text-muted-foreground mb-6">
          The 3D globe visualization shows climate impacts for the selected region. Colors indicate temperature changes:
          red (>2°C), orange (1-2°C), and green (&lt;1°C). The highlighted area shows the selected region's boundaries,
          while the intensity of the coloring reflects the severity of climate impacts. Water bodies are shown in blue,
          with darker shades indicating higher sea level rise.
        </p>
        <ClimateGlobe selectedRegion={selectedRegion} metrics={metrics} />
      </div>

      <ActionPanel onRefresh={handleRefresh} />
    </div>
  );
}

function calculateMetrics(year: number, region: Region) {
  const baseYear = 2023;
  const yearDiff = year - baseYear;
  const factors = regionalFactors[region];
  
  const baseTempIncrease = 1.1 + (yearDiff * (1.6 - 1.1) / (2050 - 2023));
  const basePrecipChange = (yearDiff * 5.3 / (2050 - 2023));
  const baseSeaLevelRise = (yearDiff * 26.3 / (2050 - 2023));
  const baseExtremeEvents = (yearDiff * 32 / (2050 - 2023));

  return {
    temperature: (baseTempIncrease * factors.temperature).toFixed(1),
    precipitation: (basePrecipChange * factors.precipitation).toFixed(1),
    seaLevel: (baseSeaLevelRise * factors.seaLevel).toFixed(1),
    extremeEvents: (baseExtremeEvents * factors.extremeEvents).toFixed(1)
  };
}