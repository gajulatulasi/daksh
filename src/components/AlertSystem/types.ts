export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'snoozed' | 'resolved';
export type NotificationChannel = 'dashboard' | 'email' | 'sms' | 'slack' | 'push';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: Date;
  status: AlertStatus;
  kpi: string;
  value: number;
  threshold: number;
  region: string;
}

export interface AlertRule {
  id: string;
  name: string;
  kpi: string;
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  severity: AlertSeverity;
  channels: NotificationChannel[];
  enabled: boolean;
}