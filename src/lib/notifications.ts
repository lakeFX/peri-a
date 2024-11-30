export function generateMailtoLink(
  to: string,
  subject: string,
  body: string
): string {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function generateAppointmentLink(
  patientName: string,
  appointmentDate: Date,
  location: string
): string {
  const subject = `Appointment Confirmation - ${patientName}`;
  const body = `Your appointment is scheduled for ${appointmentDate.toLocaleString()} at ${location}`;
  
  return generateMailtoLink('', subject, body);
}

export function generateBillingLink(
  patientName: string,
  invoiceNumber: string,
  amount: number
): string {
  const subject = `Invoice #${invoiceNumber}`;
  const body = `Dear ${patientName},\n\nYour invoice #${invoiceNumber} for $${amount.toFixed(2)} has been generated.`;
  
  return generateMailtoLink('', subject, body);
}