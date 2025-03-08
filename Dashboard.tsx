import React from 'react';
import { 
  BarChart3, 
  Thermometer, 
  Droplets, 
  Trees, 
  Factory, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-green-600" />
        <span className={`flex items-center ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Climate Analytics Dashboard</h2>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Global Temperature"
            value="+1.5°C"
            change={2.3}
            icon={Thermometer}
          />
          <MetricCard
            title="Sea Level Rise"
            value="3.3mm/year"
            change={4.1}
            icon={Droplets}
          />
          <MetricCard
            title="Forest Coverage"
            value="31.2%"
            change={-1.2}
            icon={Trees}
          />
          <MetricCard
            title="Carbon Emissions"
            value="36.3 GT"
            change={1.8}
            icon={Factory}
          />
          <MetricCard
            title="Extreme Weather Events"
            value="432 this year"
            change={15.4}
            icon={AlertTriangle}
          />
          <MetricCard
            title="AI Predictions Accuracy"
            value="94.7%"
            change={5.2}
            icon={BarChart3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Temperature Trends</h3>
            <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Temperature visualization would go here</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Emission Forecasts</h3>
            <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Emissions visualization would go here</p>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">AI-Driven Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-700">Positive Trend</h4>
              <p className="text-green-600">Renewable energy adoption has increased by 23% in the last quarter, leading to reduced carbon emissions in major cities.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-700">Alert</h4>
              <p className="text-red-600">AI models predict a 40% chance of severe drought conditions in southeastern regions within the next 6 months.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-700">Recommendation</h4>
              <p className="text-blue-600">Based on current trends, implementing urban forestry programs could offset 15% of city emissions by 2026.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;