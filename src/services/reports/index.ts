import { generateExcelReport } from './excel';
import { generateWordReport } from './word';
import { generateInvoice } from '../billing/invoice';
import type { ReportType } from '../../types/report';
import type { BillingItem } from '../../types/billing';

export async function generateReport(
  data: any,
  options: {
    type: ReportType;
    title: string;
    author: string;
    date: Date;
    generateInvoice?: boolean;
  }
): Promise<{
  excelUrl?: string;
  wordUrl?: string;
  invoiceUrl?: string;
}> {
  const results: {
    excelUrl?: string;
    wordUrl?: string;
    invoiceUrl?: string;
  } = {};

  // Generate Excel report
  const excelBuffer = await generateExcelReport(data, options);
  results.excelUrl = URL.createObjectURL(
    new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
  );

  // Generate Word report
  const wordBuffer = await generateWordReport(data, options);
  results.wordUrl = URL.createObjectURL(
    new Blob([wordBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    })
  );

  // Generate corresponding invoice if requested
  if (options.generateInvoice) {
    const billingItem: Partial<BillingItem> = {
      patientId: data.patientId,
      caseId: data.caseId,
      serviceDate: options.date.toISOString(),
      serviceType: `${options.type} Report`,
      description: options.title,
      status: 'pending',
      amount: calculateReportFee(options.type),
      paymentMethod: 'lien',
      balance: calculateReportFee(options.type),
      adjustments: 0,
      paid: 0,
    };

    const invoiceBuffer = await generateInvoice(billingItem);
    results.invoiceUrl = URL.createObjectURL(
      new Blob([invoiceBuffer], { type: 'application/pdf' })
    );
  }

  return results;
}

function calculateReportFee(type: ReportType): number {
  switch (type) {
    case 'initial':
      return 150;
    case 'progress':
      return 100;
    case 'final':
      return 200;
    default:
      return 75;
  }
}