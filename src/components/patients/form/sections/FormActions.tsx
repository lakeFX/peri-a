import React from 'react';

interface FormActionsProps {
  onClear: () => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export function FormActions({ onClear, isSubmitting, error }: FormActionsProps) {
  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Clear Form
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Patient Record'}
        </button>
      </div>
    </div>
  );
}