// Suggested code may be subject to a license. Learn more: ~LicenseLog:4163024060.
import React, { useState, useCallback } from 'react';
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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      assignForm({
        formTemplateId: template.id,
        assignmentType,
        assignedToId: selectedId,
        assignedById: 'current-user',
        status: 'pending',
        dueDate: dueDate ? dueDate : undefined, 
        metadata: {
          originalTemplateVersion: template.version,
          notes: notes ? notes : undefined,
        },
      });

      onClose();
    },
    [assignForm, template.id, assignmentType, selectedId, dueDate, notes, onClose, template.version],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... Form content ... */}
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {assignToOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
