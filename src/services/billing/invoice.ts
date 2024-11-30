import { Document, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle } from 'docx';
import type { BillingItem } from '../../types/billing';

export async function generateInvoice(item: Partial<BillingItem>): Promise<Buffer> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          children: [
            new TextRun({
              text: 'MEDICAL LIEN STATEMENT',
              bold: true,
              size: 32,
            }),
          ],
          alignment: 'center',
          spacing: { after: 400 },
        }),

        // Service Details Table
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ 
                  children: [new Paragraph('Service Date')],
                  width: { size: 25, type: 'percentage' },
                }),
                new TableCell({ 
                  children: [new Paragraph('Service')],
                  width: { size: 50, type: 'percentage' },
                }),
                new TableCell({ 
                  children: [new Paragraph('Amount')],
                  width: { size: 25, type: 'percentage' },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ 
                  children: [new Paragraph(new Date(item.serviceDate!).toLocaleDateString())],
                }),
                new TableCell({ 
                  children: [
                    new Paragraph(item.serviceType!),
                    new Paragraph({ 
                      text: item.description!,
                      style: 'small',
                    }),
                  ],
                }),
                new TableCell({ 
                  children: [new Paragraph(`$${item.amount!.toFixed(2)}`)],
                }),
              ],
            }),
          ],
          width: { size: 100, type: 'percentage' },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),

        // Totals
        new Paragraph({
          children: [
            new TextRun({
              text: `Total Amount: $${item.amount!.toFixed(2)}`,
              bold: true,
            }),
          ],
          alignment: 'right',
          spacing: { before: 400 },
        }),
      ],
    }],
  });

  return await doc.save();
}