import React from 'react';
import { Mail } from 'lucide-react';
import { generateMailtoLink } from '../../services/notifications';
import { cn } from '../../lib/utils';

interface EmailButtonProps {
  to: string;
  subject: string;
  body: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function EmailButton({
  to,
  subject,
  body,
  variant = 'primary',
  className,
}: EmailButtonProps) {
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  };

  const mailtoLink = generateMailtoLink(to, subject, body);

  return (
    <a
      href={mailtoLink}
      className={cn(
        'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium',
        variantStyles[variant],
        className
      )}
    >
      <Mail className="h-4 w-4 mr-2" />
      Send Email
    </a>
  );
}