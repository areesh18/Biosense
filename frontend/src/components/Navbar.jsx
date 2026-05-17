import React from 'react';
import { Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ role }) {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';

  const roleColors = {
    admin: 'bg-purple-600',
    doctor: 'bg-blue-600',
    patient: 'bg-green-600',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">BioSense</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-white ${roleColors[role] || 'bg-gray-500'}`}>
          {role}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 hidden sm:block">{userEmail}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}