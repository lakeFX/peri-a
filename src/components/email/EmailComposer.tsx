import React, { useState } from 'react';
import { X, Paperclip, Send } from 'lucide-react';
import { sendEmail } from '../../services/email';
import type { EmailOptions } from '../../services/email';

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
  attachments?: EmailOptions['attachments'];
}

export function EmailComposer({
  isOpen,
  onClose,
  defaultTo = '',
  defaultSubject = '',
  defaultBody = '',
  attachments = [],
}: EmailComposerProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await sendEmail({
        to: to.split(',').map((email) => email.trim()),
        subject,
        body,
        attachments,
      });
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
      // Handle error (show notification, etc.)
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-medium">Compose Email</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {attachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <ul className="space-y-2">
                {attachments.map((attachment, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    {attachment.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
              disabled={isSending}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}