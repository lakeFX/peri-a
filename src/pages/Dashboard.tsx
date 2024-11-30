import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, FileText, Bell } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { TimelineTasks } from '../components/dashboard/TimelineTasks';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { useCalendarStore } from '../store/calendarStore';
import { usePatientStore } from '../store/patientStore';
import { useCaseStore } from '../store/caseStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { events, setSelectedDate, setView } = useCalendarStore();
  const { patients } = usePatientStore();
  const { cases } = useCaseStore();

  const activePatients = patients.filter(p => p.caseStatus === 'active');
  const activeCases = cases.filter(c => c.status === 'active');

  const todaysAppointments = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  });

  const handleTodayClick = () => {
    setSelectedDate(new Date());
    setView('day');
    navigate('/calendar');
  };

  const handleActivePatientsClick = () => {
    navigate('/patients', { state: { filter: 'active' } });
  };

  const handleActiveCasesClick = () => {
    navigate('/cases', { state: { filter: 'active' } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div onClick={handleTodayClick} className="cursor-pointer">
          <DashboardCard
            title="Today's Appointments"
            value={todaysAppointments.length.toString()}
            icon={Calendar}
            trend={todaysAppointments.length > 0 ? `${todaysAppointments.length} scheduled` : 'No appointments'}
          />
        </div>
        <div onClick={handleActivePatientsClick} className="cursor-pointer">
          <DashboardCard
            title="Active Patients"
            value={activePatients.length.toString()}
            icon={Users}
            trend={`${activePatients.length} patients`}
          />
        </div>
        <div onClick={handleActiveCasesClick} className="cursor-pointer">
          <DashboardCard
            title="Active Cases"
            value={activeCases.length.toString()}
            icon={FileText}
            trend={`${activeCases.length} cases`}
          />
        </div>
        <DashboardCard
          title="Pending Tasks"
          value="12"
          icon={Bell}
          trend="-3.2%"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TimelineTasks />
        <RecentActivity />
      </div>
    </div>
  );
}