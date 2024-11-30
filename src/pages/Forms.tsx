import React from 'react';
import { Plus, FileText, Archive } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { FormList } from '../components/forms/FormList';

export default function Forms() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Form Templates</h1>
        <div className="flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Archive className="h-5 w-5 mr-2" />
            Archived Forms
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </button>
        </div>
      </div>
      <FormList />
    </div>
  );
}