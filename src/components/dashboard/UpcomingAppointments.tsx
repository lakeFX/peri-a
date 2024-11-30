import React from 'react';

export function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      <div className="space-y-4">
        <p className="text-gray-500">No upcoming appointments</p>
      </div>
    </div>
  );
}