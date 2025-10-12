import React from 'react';

const DashboardCard = ({ title, children, color }) => {
  const colors = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    purple: 'border-purple-500 bg-purple-50',
  };

  return (
    <div className={`p-6 rounded-lg border-l-4 ${colors[color]}`}>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <div className="mt-4 text-gray-600">{children}</div>
    </div>
  );
};

export default function AdminDashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'admin';

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-2 text-lg text-gray-600">Welcome, <span className="font-semibold">{userEmail}</span>. You have full system access.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="User Management" color="blue">
          <p>View, add, or remove doctors and patients. Monitor system activity.</p>
        </DashboardCard>
        <DashboardCard title="System Analytics" color="green">
          <p>Access overall usage statistics, registration trends, and more.</p>
        </DashboardCard>
        <DashboardCard title="Content Moderation" color="purple">
          <p>Review and manage shared content across the platform.</p>
        </DashboardCard>
      </div>
    </div>
  );
}
