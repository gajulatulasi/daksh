import React, { useState } from 'react';
import { Home, BookOpen, Library, Github, Twitter, Mail, Bell } from 'lucide-react';
import ClimateAIDashboard from './components/ClimateAIDashboard';
import ThemeToggle from './components/ThemeToggle';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

function NavItem({ icon: Icon, label, active, onClick, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'
      }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge !== undefined && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span>{label}</span>
    </button>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications] = useState(3); // Example notification count

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary">ClimateAI Predictor</h1>
              <div className="flex space-x-2">
                <NavItem
                  icon={Home}
                  label="Dashboard"
                  active={activeSection === 'dashboard'}
                  onClick={() => setActiveSection('dashboard')}
                />
                <NavItem
                  icon={BookOpen}
                  label="About"
                  active={activeSection === 'about'}
                  onClick={() => setActiveSection('about')}
                />
                <NavItem
                  icon={Library}
                  label="Resources"
                  active={activeSection === 'resources'}
                  onClick={() => setActiveSection('resources')}
                />
                <NavItem
                  icon={Bell}
                  label="Notifications"
                  active={activeSection === 'notifications'}
                  onClick={() => setActiveSection('notifications')}
                  badge={notifications}
                />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'dashboard' && <ClimateAIDashboard />}
        {activeSection === 'about' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">About ClimateAI Predictor</h2>
            <p className="text-muted-foreground mb-6">
              ClimateAI Predictor leverages advanced artificial intelligence to provide accurate climate change predictions
              and insights. Our platform combines historical data, satellite imagery, and machine learning models to help
              understand and prepare for climate-related challenges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                  alt="Nature landscape"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-muted-foreground">
                  Our AI models analyze vast amounts of environmental data to predict future climate patterns and their impact on ecosystems.
                </p>
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Climate impact"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-muted-foreground">
                  We use advanced machine learning algorithms to predict and visualize potential climate change impacts across different regions.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'resources' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Climate Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">Research Papers</h3>
                <p className="text-muted-foreground">Access the latest climate research and AI prediction methodologies.</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">Data Sources</h3>
                <p className="text-muted-foreground">Explore our comprehensive collection of climate data sources.</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-muted-foreground">Learn how to integrate our climate predictions into your applications.</p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'notifications' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                <h3 className="font-semibold">Critical Temperature Alert</h3>
                <p>Temperature increase of 2.5°C detected in Southeast Asia region</p>
              </div>
              <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                <h3 className="font-semibold">Sea Level Warning</h3>
                <p>Unusual sea level rise pattern detected in Pacific Islands</p>
              </div>
              <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
                <h3 className="font-semibold">Precipitation Update</h3>
                <p>Significant change in rainfall patterns detected in Central Africa</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground mb-4 md:mb-0">
              © 2025 ClimateAI Predictor. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="mailto:contact@climateai.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/climateai" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/climateai" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;