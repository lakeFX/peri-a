import React from 'react';
import { EmailButton } from './EmailButton';
import {
  generateQuestionnaireEmail,
  generateAttorneyUpdateEmail,
  generateInvoiceEmail,
} from '../../services/email';
import type { Patient } from '../../types/patient';
import type { FormTemplate } from '../../types/form';
import type { BillingItem } from '../../types/billing';

interface EmailTemplateButtonProps {
  type: 'questionnaire' | 'attorney-update' | 'invoice';
  patient: Patient;
  data?: {
    questionnaire?: FormTemplate;
    updateContent?: string;
    billing?: BillingItem;
  };
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function EmailTemplateButton({
  type,
  patient,
  data,
  variant,
  className,
}: EmailTemplateButtonProps) {
  const getEmailContent = () => {
    switch (type) {
      case 'questionnaire':
        if (!data?.questionnaire) return null;
        return generateQuestionnaireEmail(patient, data.questionnaire);
      
      case 'attorney-update':
        if (!data?.updateContent) return null;
        return generateAttorneyUpdateEmail(patient, data.updateContent);
      
      case 'invoice':
        if (!data?.billing) return null;
        return generateInvoiceEmail(patient, data.billing);
      
      default:
        return null;
    }
  };

  const emailContent = getEmailContent();
  if (!emailContent) return null;

  return (
    <EmailButton
      defaultTo={type === 'attorney-update' ? patient.attorneyEmail : patient.contactInfo.email}
      defaultSubject={emailContent.subject}
      defaultBody={emailContent.body}
      variant={variant}
      className={className}
    />
  );
}