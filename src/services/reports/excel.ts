import ExcelJS from 'exceljs';
import type { ReportType } from '../../types/report';

interface ReportOptions {
  type: ReportType;
  title: string;
  author: string;
  date: Date;
}

export async function generateExcelReport(
  data: any,
  options: ReportOptions
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = options.author;
  workbook.lastModifiedBy = options.author;
  workbook.created = options.date;
  workbook.modified = options.date;

  const worksheet = workbook.addWorksheet(options.title);

  // Add report header
  worksheet.addRow([options.title]);
  worksheet.addRow([`Generated: ${options.date.toLocaleString()}`]);
  worksheet.addRow([`Author: ${options.author}`]);
  worksheet.addRow([`Type: ${options.type}`]);
  worksheet.addRow([]); // Empty row for spacing

  // Add data based on report type
  switch (options.type) {
    case 'initial':
      addInitialExamData(worksheet, data);
      break;
    case 'progress':
      addProgressExamData(worksheet, data);
      break;
    case 'final':
      addFinalExamData(worksheet, data);
      break;
    case 'narrative':
      addNarrativeData(worksheet, data);
      break;
    default:
      addCustomData(worksheet, data);
  }

  // Format header
  worksheet.getRow(1).font = { bold: true, size: 14 };
  worksheet.getRow(1).height = 25;

  // Auto-fit columns
  worksheet.columns.forEach((column) => {
    const maxLength = worksheet.getColumn(column.number).values.reduce(
      (max, value) => Math.max(max, value ? value.toString().length : 0),
      0
    );
    column.width = Math.min(maxLength + 2, 50); // Cap width at 50 characters
  });

  return await workbook.xlsx.writeBuffer();
}

function addInitialExamData(worksheet: ExcelJS.Worksheet, data: any): void {
  // Patient Information
  worksheet.addRow(['Patient Information']);
  worksheet.addRow(['Name', data.patientName]);
  worksheet.addRow(['Date of Birth', data.dateOfBirth]);
  worksheet.addRow(['Case Number', data.caseNumber]);
  worksheet.addRow([]);

  // Examination Findings
  worksheet.addRow(['Examination Findings']);
  if (data.findings) {
    Object.entries(data.findings).forEach(([key, value]) => {
      worksheet.addRow([key, value]);
    });
  }
  worksheet.addRow([]);

  // Diagnosis
  worksheet.addRow(['Diagnosis']);
  if (data.diagnosis) {
    data.diagnosis.forEach((diagnosis: any) => {
      worksheet.addRow([diagnosis.code, diagnosis.description]);
    });
  }
}

function addProgressExamData(worksheet: ExcelJS.Worksheet, data: any): void {
  // Progress Information
  worksheet.addRow(['Progress Examination']);
  worksheet.addRow(['Visit Number', data.visitNumber]);
  worksheet.addRow(['Date', data.examDate]);
  worksheet.addRow([]);

  // Subjective Complaints
  worksheet.addRow(['Subjective Complaints']);
  if (data.complaints) {
    data.complaints.forEach((complaint: string) => {
      worksheet.addRow([complaint]);
    });
  }
  worksheet.addRow([]);

  // Objective Findings
  worksheet.addRow(['Objective Findings']);
  if (data.findings) {
    Object.entries(data.findings).forEach(([key, value]) => {
      worksheet.addRow([key, value]);
    });
  }
}

function addFinalExamData(worksheet: ExcelJS.Worksheet, data: any): void {
  // Final Examination
  worksheet.addRow(['Final Examination']);
  worksheet.addRow(['Treatment Duration', data.treatmentDuration]);
  worksheet.addRow(['Total Visits', data.totalVisits]);
  worksheet.addRow([]);

  // Treatment Outcomes
  worksheet.addRow(['Treatment Outcomes']);
  if (data.outcomes) {
    data.outcomes.forEach((outcome: any) => {
      worksheet.addRow([outcome.condition, outcome.improvement]);
    });
  }
  worksheet.addRow([]);

  // Permanent Impairment
  if (data.impairment) {
    worksheet.addRow(['Permanent Impairment']);
    worksheet.addRow(['Rating', data.impairment.rating]);
    worksheet.addRow(['Description', data.impairment.description]);
  }
}

function addNarrativeData(worksheet: ExcelJS.Worksheet, data: any): void {
  // Case Information
  worksheet.addRow(['Case Information']);
  worksheet.addRow(['Accident Date', data.accidentDate]);
  worksheet.addRow(['Initial Visit', data.initialVisitDate]);
  worksheet.addRow([]);

  // Treatment History
  worksheet.addRow(['Treatment History']);
  if (data.treatments) {
    data.treatments.forEach((treatment: any) => {
      worksheet.addRow([
        treatment.date,
        treatment.type,
        treatment.provider,
        treatment.notes,
      ]);
    });
  }
  worksheet.addRow([]);

  // Conclusions
  if (data.conclusions) {
    worksheet.addRow(['Conclusions']);
    data.conclusions.forEach((conclusion: string) => {
      worksheet.addRow([conclusion]);
    });
  }
}

function addCustomData(worksheet: ExcelJS.Worksheet, data: any): void {
  if (Array.isArray(data)) {
    // If data is an array of objects, create a table
    if (data.length > 0 && typeof data[0] === 'object') {
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);
      
      data.forEach((item) => {
        worksheet.addRow(headers.map((header) => item[header]));
      });
    }
  } else if (typeof data === 'object') {
    // If data is an object, create key-value pairs
    Object.entries(data).forEach(([key, value]) => {
      worksheet.addRow([key, value]);
    });
  }
}