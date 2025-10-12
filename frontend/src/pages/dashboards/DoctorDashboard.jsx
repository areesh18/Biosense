import React from 'react';

const DashboardCard = ({ title, children, color }) => {
  const colors = {
    teal: 'border-teal-500 bg-teal-50',
    sky: 'border-sky-500 bg-sky-50',
    amber: 'border-amber-500 bg-amber-50',
  };

  return (
    <div className={`p-6 rounded-lg border-l-4 ${colors[color]}`}>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <div className="mt-4 text-gray-600">{children}</div>
    </div>
  );
};

export default function DoctorDashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'doctor';

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900">Doctor's Dashboard</h1>
      <p className="mt-2 text-lg text-gray-600">Welcome back, <span className="font-semibold">{userEmail}</span>.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Patient Roster" color="teal">
          <p>View and manage your list of assigned patients and their records.</p>
        </DashboardCard>
        <DashboardCard title="Appointments" color="sky">
          <p>Check your schedule for upcoming appointments and consultations.</p>
        </DashboardCard>
        <DashboardCard title="Reports" color="amber">
          <p>Generate and review patient health reports and analytics.</p>
        </DashboardCard>
      </div>
    </div>
  );
}
