import React, { useState } from 'react';
import { FileText, Copy, Archive, Trash2, UserPlus } from 'lucide-react';
import { useFormStore } from '../../store/formStore';
import { AssignFormModal } from './AssignFormModal';
import { format } from 'date-fns';
import type { AssignmentType } from '../../types/formAssignment';
import type { FormTemplate } from '../../types/form';

export function FormList() {
  const { templates, duplicateTemplate, updateStatus, deleteTemplate } = useFormStore();
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);
  const [assignmentType, setAssignmentType] = useState<AssignmentType>('patient');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const activeTemplates = templates.filter((template) => template.status !== 'archived');

  // Mock data for demonstration - will be replaced with actual data
  const assignToOptions = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];

  const handleAssign = (template: FormTemplate, type: AssignmentType) => {
    setSelectedTemplate(template);
    setAssignmentType(type);
    setIsAssignModalOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Templates</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {activeTemplates.map((template) => (
            <li
              key={template.id}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {template.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Version {template.version} • Last updated{' '}
                    {format(new Date(template.updatedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAssign(template, 'patient')}
                  className="p-2 text-gray-400 hover:text-primary-500"
                  title="Assign to patient/contact/provider"
                >
                  <UserPlus className="h-5 w-5" />
                </button>
                <button
                  onClick={() => duplicateTemplate(template.id)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                  title="Duplicate template"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  onClick={() => updateStatus(template.id, 'archived')}
                  className="p-2 text-gray-400 hover:text-gray-500"
                  title="Archive template"
                >
                  <Archive className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                  title="Delete template"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
          {activeTemplates.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No active form templates
            </li>
          )}
        </ul>
      </div>

      {selectedTemplate && (
        <AssignFormModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          template={selectedTemplate}
          assignmentType={assignmentType}
          assignToOptions={assignToOptions}
        />
      )}
    </>
  );
}