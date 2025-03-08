export type ExportFormat = 'pdf' | 'csv' | 'excel';

export interface ShareFormData {
  email: string;
  message: string;
  format: ExportFormat;
}

export interface ActionPanelProps {
  onRefresh: () => Promise<void>;
}

export interface ExportResponse {
  url: string;
  filename: string;
}