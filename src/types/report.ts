export type ReportType = 
  | 'initial'    // Initial examination report
  | 'progress'   // Progress/re-exam report
  | 'final'      // Final/discharge report
  | 'narrative'  // Narrative report
  | 'custom';    // Custom report type

export interface ReportOptions {
  type: ReportType;
  title: string;
  author: string;
  date: Date;
  generateInvoice?: boolean;
  template?: string;
  data: any;
}

export interface ReportUrls {
  excelUrl?: string;
  wordUrl?: string;
  invoiceUrl?: string;
}