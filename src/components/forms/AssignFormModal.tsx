import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useFormStore } from '../../store/formStore';
import { useFormAssignmentStore } from '../../store/formAssignmentStore';
import type { AssignmentType } from '../../types/formAssignment';
import type { FormTemplate } from '../../types/form';

interface AssignFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: FormTemplate;
  assignmentType: AssignmentType;
  assignToOptions: Array<{ id: string; name: string }>;
}

export function AssignFormModal({
  isOpen,
  onClose,
  template,
  assignmentType,
  assignToOptions,
}: AssignFormModalProps) {
  const [selectedId, setSelectedId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const { assignForm } = useFormAssignmentStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    assignForm({
      formTemplateId: template.id,
      assignmentType,
      assignedToId: selectedId,
      assignedById: 'current-user', // Will be replaced with actual user ID
      status: 'pending',
      dueDate: dueDate || undefined,
      metadata: {
        originalTemplateVersion: template.version,
        notes: notes || undefined,
      },
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Assign Form</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign to
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Select {assignmentType}</option>
              {assignToOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              Assign Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}