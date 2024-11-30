import ExcelJS from 'exceljs';
import type { BillingItem } from '../../types/billing';
import type { Patient } from '../../types/patient';
import type { TimelineEvent } from '../../types/timeline';

interface ReportOptions {
  title: string;
  author: string;
  date: Date;
  type: 'billing' | 'patient' | 'timeline' | 'custom';
}

export async function generateExcelReport(
  data: BillingItem[] | Patient[] | TimelineEvent[] | any[],
  options: ReportOptions
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(options.title);

  // Add header with report metadata
  worksheet.addRow([
    options.title,
    `Generated: ${options.date.toLocaleDateString()}`,
    `Author: ${options.author}`,
  ]);

  // Add data based on report type
  switch (options.type) {
    case 'billing':
      addBillingData(worksheet, data as BillingItem[]);
      break;
    case 'patient':
      addPatientData(worksheet, data as Patient[]);
      break;
    case 'timeline':
      addTimelineData(worksheet, data as TimelineEvent[]);
      break;
    case 'custom':
      addCustomData(worksheet, data);
      break;
  }

  // Auto-fit columns
  worksheet.columns.forEach((column) => {
    column.width = Math.max(
      ...worksheet.getColumn(column.key || '').values.map((v) => 
        v ? v.toString().length : 0
      )
    );
  });

  // Generate buffer
  return await workbook.xlsx.writeBuffer();
}

function addBillingData(worksheet: ExcelJS.Worksheet, items: BillingItem[]): void {
  // Add headers
  worksheet.addRow([
    'Invoice #',
    'Date',
    'Patient',
    'Service',
    'Amount',
    'Status',
    'Balance',
  ]);

  // Add data rows
  items.forEach((item) => {
    worksheet.addRow([
      item.id,
      new Date(item.serviceDate).toLocaleDateString(),
      item.patientId,
      item.serviceType,
      item.amount,
      item.status,
      item.balance,
    ]);
  });

  // Add summary
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalBalance = items.reduce((sum, item) => sum + item.balance, 0);
  
  worksheet.addRow([]);
  worksheet.addRow(['Total Amount', '', '', '', totalAmount]);
  worksheet.addRow(['Total Balance', '', '', '', totalBalance]);
}

function addPatientData(worksheet: ExcelJS.Worksheet, patients: Patient[]): void {
  // Add headers
  worksheet.addRow([
    'ID',
    'Name',
    'DOB',
    'Gender',
    'Email',
    'Phone',
    'Status',
  ]);

  // Add data rows
  patients.forEach((patient) => {
    worksheet.addRow([
      patient.id,
      `${patient.firstName} ${patient.lastName}`,
      new Date(patient.dateOfBirth).toLocaleDateString(),
      patient.gender,
      patient.contactInfo.email,
      patient.contactInfo.phone,
      patient.caseStatus,
    ]);
  });
}

function addTimelineData(worksheet: ExcelJS.Worksheet, events: TimelineEvent[]): void {
  // Add headers
  worksheet.addRow([
    'Date',
    'Type',
    'Status',
    'Patient ID',
    'Priority',
    'Notes',
  ]);

  // Add data rows
  events.forEach((event) => {
    worksheet.addRow([
      new Date(event.suggestedDate).toLocaleDateString(),
      event.type,
      event.status,
      event.patientId,
      event.priority,
      event.notes || '',
    ]);
  });
}

function addCustomData(worksheet: ExcelJS.Worksheet, data: any[]): void {
  if (!data.length) return;

  // Get headers from first object
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Add data rows
  data.forEach((item) => {
    worksheet.addRow(headers.map(header => item[header]));
  });
}