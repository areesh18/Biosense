import React from 'react';

const DashboardCard = ({ title, children, color }) => {
  const colors = {
    rose: 'border-rose-500 bg-rose-50',
    cyan: 'border-cyan-500 bg-cyan-50',
    lime: 'border-lime-500 bg-lime-50',
  };

  return (
    <div className={`p-6 rounded-lg border-l-4 ${colors[color]}`}>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <div className="mt-4 text-gray-600">{children}</div>
    </div>
  );
};

export default function PatientDashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'patient';

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900">Patient Dashboard</h1>
      <p className="mt-2 text-lg text-gray-600">Welcome, <span className="font-semibold">{userEmail}</span>.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="My Health Records" color="rose">
          <p>Access your medical history, test results, and prescriptions.</p>
        </DashboardCard>
        <DashboardCard title="Upcoming Appointments" color="cyan">
          <p>View your scheduled appointments and get reminders.</p>
        </DashboardCard>
        <DashboardCard title="My Vitals" color="lime">
          <p>Track your health metrics like blood pressure and heart rate.</p>
        </DashboardCard>
      </div>
    </div>
  );
}
