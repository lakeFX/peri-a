import React, { useState } from 'react';
import { useCaseStore } from '../../store/caseStore';
import { useTimelineStore } from '../../store/timelineStore';
import { addDays } from 'date-fns';
import type { LienCase, AccidentType } from '../../types/case';

export default function CaseForm() {
  const { addCase } = useCaseStore();
  const { generateTimeline } = useTimelineStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<LienCase>>({
    status: 'active',
    accidentType: 'auto',
    accidentDate: new Date().toISOString().split('T')[0],
    initialVisitDate: new Date().toISOString().split('T')[0],
    statuteOfLimitationsDate: addDays(new Date(), 730).toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const caseId = await addCase(formData as LienCase);
      await generateTimeline(formData.patientId!, 'default');
      // Handle success (e.g., redirect to case details)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create case');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Case Number</label>
          <input
            type="text"
            value={formData.caseNumber || ''}
            onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Accident Type</label>
          <select
            value={formData.accidentType}
            onChange={(e) => setFormData({ ...formData, accidentType: e.target.value as AccidentType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          >
            <option value="auto">Auto Accident</option>
            <option value="work">Work Injury</option>
            <option value="slip-and-fall">Slip and Fall</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Accident Date</label>
          <input
            type="date"
            value={formData.accidentDate?.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, accidentDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Visit Date</label>
          <input
            type="date"
            value={formData.initialVisitDate?.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, initialVisitDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Statute of Limitations</label>
          <input
            type="date"
            value={formData.statuteOfLimitationsDate?.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, statuteOfLimitationsDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lien Amount</label>
          <input
            type="number"
            value={formData.lienAmount || ''}
            onChange={(e) => setFormData({ ...formData, lienAmount: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Accident Description</label>
        <textarea
          value={formData.accidentDescription || ''}
          onChange={(e) => setFormData({ ...formData, accidentDescription: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isSubmitting ? 'Creating...' : 'Create Case'}
        </button>
      </div>
    </form>
  );
}