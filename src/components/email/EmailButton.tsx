import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { EmailComposer } from './EmailComposer';
import type { EmailOptions } from '../../services/email';

interface EmailButtonProps {
  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
  attachments?: EmailOptions['attachments'];
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function EmailButton({
  defaultTo,
  defaultSubject,
  defaultBody,
  attachments,
  variant = 'primary',
  className,
}: EmailButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${variantStyles[variant]} ${className}`}
      >
        <Mail className="h-4 w-4 mr-2" />
        Send Email
      </button>

      <EmailComposer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultTo={defaultTo}
        defaultSubject={defaultSubject}
        defaultBody={defaultBody}
        attachments={attachments}
      />
    </>
  );
}