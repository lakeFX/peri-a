export function generateMailtoLink(
  to: string,
  subject: string,
  body: string
): string {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function generateQuestionnaireLink(
  patientName: string,
  questionnaireTitle: string,
  questionnaireUrl: string
): { subject: string; body: string } {
  return {
    subject: `${questionnaireTitle} - Please Complete`,
    body: `Dear ${patientName},\n\nPlease complete your questionnaire: ${questionnaireUrl}\n\nBest regards,\nYour Healthcare Team`
  };
}

export function generateAttorneyUpdate(
  patientName: string,
  caseNumber: string,
  updateContent: string
): { subject: string; body: string } {
  return {
    subject: `Medical Treatment Update - ${patientName}`,
    body: `Re: ${patientName}\nCase #: ${caseNumber}\n\n${updateContent}\n\nBest regards,\nYour Healthcare Team`
  };
}

export function generateInvoiceNotification(
  patientName: string,
  invoiceNumber: string,
  amount: number
): { subject: string; body: string } {
  return {
    subject: `Medical Invoice #${invoiceNumber}`,
    body: `Dear ${patientName},\n\nYour invoice #${invoiceNumber} for $${amount.toFixed(2)} has been generated.\n\nBest regards,\nYour Healthcare Team`
  };
}