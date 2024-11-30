import React, { useState } from 'react';
import { IntakeProcessor } from './IntakeProcessor';
import { PatientForm } from './form';

export function PatientIntake() {
  const [mode, setMode] = useState<'ai' | 'manual'>('manual');

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setMode('ai')}
          className={`px-4 py-2 rounded-md ${
            mode === 'ai'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          AI Processing
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`px-4 py-2 rounded-md ${
            mode === 'manual'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Manual Entry
        </button>
      </div>

      {mode === 'ai' ? <IntakeProcessor /> : <PatientForm />}
    </div>
  );
}