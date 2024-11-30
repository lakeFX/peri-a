import type { Patient } from '../../types/patient';
import type { FormTemplate } from '../../types/form';
import type { BillingItem } from '../../types/billing';

export function generateQuestionnaireEmail(
  patient: Patient,
  questionnaire: FormTemplate
): { subject: string; body: string } {
  return {
    subject: `${questionnaire.title} - Please Complete`,
    body: `
      <p>Dear ${patient.firstName},</p>
      
      <p>Please complete the following questionnaire as part of your treatment plan:</p>
      
      <p><strong>${questionnaire.title}</strong></p>
      
      <p>You can access the questionnaire by clicking the link below:</p>
      
      <p><a href="[QUESTIONNAIRE_LINK]">Complete Questionnaire</a></p>
      
      <p>If you have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>Your Healthcare Team</p>
    `,
  };
}

export function generateAttorneyUpdateEmail(
  patient: Patient,
  updateContent: string
): { subject: string; body: string } {
  return {
    subject: `Medical Treatment Update - ${patient.firstName} ${patient.lastName}`,
    body: `
      <p>Dear Counselor,</p>
      
      <p>This email provides an update regarding your client's medical treatment:</p>
      
      <p><strong>Patient:</strong> ${patient.firstName} ${patient.lastName}</p>
      <p><strong>Case Number:</strong> ${patient.caseNumber}</p>
      
      <div style="margin: 20px 0; padding: 10px; border-left: 4px solid #0284c7;">
        ${updateContent}
      </div>
      
      <p>Please let us know if you need any additional information.</p>
      
      <p>Best regards,<br>Your Healthcare Team</p>
    `,
  };
}

export function generateInvoiceEmail(
  patient: Patient,
  billing: BillingItem
): { subject: string; body: string } {
  return {
    subject: `Medical Invoice - ${patient.firstName} ${patient.lastName}`,
    body: `
      <p>Dear ${patient.firstName},</p>
      
      <p>Please find attached your medical invoice for recent services:</p>
      
      <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px;">
        <p><strong>Invoice Number:</strong> ${billing.id}</p>
        <p><strong>Service Date:</strong> ${new Date(billing.serviceDate).toLocaleDateString()}</p>
        <p><strong>Amount Due:</strong> $${billing.amount.toFixed(2)}</p>
      </div>
      
      <p>Payment is due within 30 days of receipt.</p>
      
      <p>If you have any questions about this invoice, please don't hesitate to contact our billing department.</p>
      
      <p>Thank you for choosing our services.</p>
      
      <p>Best regards,<br>Your Healthcare Team</p>
    `,
  };
}