import React, { useState } from 'react';
import { Bell, Settings, Clock, CheckCircle, AlertTriangle, AlertOctagon, Info, X, Volume2, Volume1, VolumeX } from 'lucide-react';
import { AlertRule, Alert, AlertSeverity, NotificationChannel } from './types';

const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    title: 'Critical Temperature Rise',
    message: 'Temperature increase of 2.5°C detected in Southeast Asia region',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'active',
    kpi: 'temperature',
    value: 2.5,
    threshold: 2.0,
    region: 'Southeast Asia'
  },
  {
    id: '2',
    title: 'Sea Level Anomaly',
    message: 'Unusual sea level rise pattern detected in Pacific Islands',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'active',
    kpi: 'sea_level',
    value: 15.2,
    threshold: 12.0,
    region: 'Pacific'
  },
  {
    id: '3',
    title: 'Precipitation Pattern Shift',
    message: 'Significant change in rainfall patterns detected in Central Africa',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: 'snoozed',
    kpi: 'precipitation',
    value: 45.3,
    threshold: 40.0,
    region: 'Central Africa'
  }
];

const MOCK_RULES: AlertRule[] = [
  {
    id: '1',
    name: 'High Temperature Alert',
    kpi: 'temperature',
    condition: 'above',
    threshold: 2.0,
    severity: 'critical',
    channels: ['dashboard', 'email', 'slack'],
    enabled: true
  },
  {
    id: '2',
    name: 'Sea Level Warning',
    kpi: 'sea_level',
    condition: 'above',
    threshold: 12.0,
    severity: 'high',
    channels: ['dashboard', 'email'],
    enabled: true
  }
];

const severityStyles = {
  critical: 'bg-red-50 border-red-200 text-red-700',
  high: 'bg-orange-50 border-orange-200 text-orange-700',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  low: 'bg-blue-50 border-blue-200 text-blue-700'
};

const severityIcons = {
  critical: AlertOctagon,
  high: AlertTriangle,
  medium: Info,
  low: Info
};

interface AlertCardProps {
  alert: Alert;
  onDismiss: (id: string) => void;
  onSnooze: (id: string) => void;
}

function AlertCard({ alert, onDismiss, onSnooze }: AlertCardProps) {
  const SeverityIcon = severityIcons[alert.severity];
  const formattedTime = alert.timestamp.toLocaleTimeString();

  return (
    <div className={`p-4 rounded-lg border ${severityStyles[alert.severity]} mb-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <SeverityIcon className="w-5 h-5 mt-1" />
          <div>
            <h3 className="font-semibold">{alert.title}</h3>
            <p className="text-sm mt-1">{alert.message}</p>
            <div className="flex items-center space-x-2 mt-2 text-sm opacity-75">
              <Clock className="w-4 h-4" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onSnooze(alert.id)}
            className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
            title="Snooze"
          >
            <Clock className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDismiss(alert.id)}
            className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {alert.status === 'snoozed' && (
        <div className="mt-2 text-sm flex items-center space-x-1 opacity-75">
          <VolumeX className="w-4 h-4" />
          <span>Snoozed</span>
        </div>
      )}
    </div>
  );
}

interface RuleCardProps {
  rule: AlertRule;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
}

function RuleCard({ rule, onToggle, onEdit }: RuleCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{rule.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {rule.kpi} {rule.condition} {rule.threshold}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            {rule.channels.map((channel) => (
              <span
                key={channel}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(rule.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggle(rule.id)}
            className={`w-11 h-6 rounded-full transition-colors ${
              rule.enabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                rule.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AlertsPanel() {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'rules'>('current');
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [rules, setRules] = useState(MOCK_RULES);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleSnoozeAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: 'snoozed' } : alert
    ));
  };

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleEditRule = (id: string) => {
    // Implement rule editing logic
    console.log('Edit rule:', id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Alerts & Notifications</span>
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'current'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Current Alerts
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Alert History
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'rules'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Alert Rules
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'current' && (
          <div className="space-y-4">
            {alerts
              .filter(alert => alert.status === 'active')
              .map(alert => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onDismiss={handleDismissAlert}
                  onSnooze={handleSnoozeAlert}
                />
              ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {alerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={handleDismissAlert}
                onSnooze={handleSnoozeAlert}
              />
            ))}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4">
            {rules.map(rule => (
              <RuleCard
                key={rule.id}
                rule={rule}
                onToggle={handleToggleRule}
                onEdit={handleEditRule}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}