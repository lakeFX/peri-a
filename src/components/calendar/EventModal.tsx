import React, { useState, useEffect } from 'react';
import { useCalendarStore } from '../../store/calendarStore';
import { usePatientStore } from '../../store/patientStore';
import { format, addMinutes, setHours, setMinutes } from 'date-fns';
import { APPOINTMENT_TYPES, APPOINTMENT_DURATIONS } from '../../lib/constants';
import type { CalendarEvent, AppointmentType } from '../../types/calendar';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  mode: 'create' | 'edit';
}

export function EventModal({ isOpen, onClose, event, mode }: EventModalProps) {
  const { addEvent, updateEvent } = useCalendarStore();
  const { patients } = usePatientStore();
  
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    start: setHours(setMinutes(new Date(), 0), 8), // Default to 8:00 AM
    end: setHours(setMinutes(new Date(), 0), 9), // Default to 9:00 AM
    type: APPOINTMENT_TYPES.INITIAL_INTAKE,
    status: 'scheduled'
  });

  useEffect(() => {
    if (event && mode === 'edit') {
      setFormData(event);
    }
  }, [event, mode]);

  const handleTypeChange = (type: AppointmentType) => {
    const duration = APPOINTMENT_DURATIONS[type];
    const start = formData.start || setHours(setMinutes(new Date(), 0), 8);
    const end = addMinutes(start, duration);
    
    setFormData({
      ...formData,
      type,
      end,
      title: type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure appointment is within business hours
    const startHour = formData.start?.getHours() || 0;
    const endHour = formData.end?.getHours() || 0;
    
    if (startHour < 8 || startHour >= 20 || endHour < 8 || endHour > 20) {
      alert('Appointments must be scheduled between 8:00 AM and 8:00 PM');
      return;
    }
    
    if (mode === 'create') {
      addEvent(formData as Omit<CalendarEvent, 'id'>);
    } else if (mode === 'edit' && event?.id) {
      updateEvent(event.id, formData);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-lg font-medium mb-4">
          {mode === 'create' ? 'New Appointment' : 'Edit Appointment'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Appointment Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value as AppointmentType)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {Object.entries(APPOINTMENT_TYPES).map(([key, value]) => (
                <option key={value} value={value}>
                  {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient
            </label>
            <select
              value={formData.patientId || ''}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={format(formData.start || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => {
                  const start = new Date(e.target.value);
                  const duration = APPOINTMENT_DURATIONS[formData.type as AppointmentType];
                  setFormData({
                    ...formData,
                    start,
                    end: addMinutes(start, duration)
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <div className="mt-1 block w-full text-gray-700">
                {APPOINTMENT_DURATIONS[formData.type as AppointmentType]} minutes
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
              {mode === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}