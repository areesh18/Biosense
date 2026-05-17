import React from 'react';
import { Activity, Shield, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    title: 'Admin',
    description: 'Manage the system, control the data stream, and view all stored fall alerts across all patients.',
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    color: 'border-purple-200 hover:border-purple-400 bg-purple-50',
    iconBg: 'bg-purple-100',
    badge: 'bg-purple-100 text-purple-700',
    path: '/login',
  },
  {
    title: 'Doctor',
    description: 'Monitor all 6 patients in real time. View live vitals, fall detection alerts, and sensing data.',
    icon: <Activity className="w-8 h-8 text-blue-600" />,
    color: 'border-blue-200 hover:border-blue-400 bg-blue-50',
    iconBg: 'bg-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    path: '/login',
  },
  {
    title: 'Patient',
    description: 'View your own live vital signs including heart rate, SpO2, temperature and respiration rate.',
    icon: <Brain className="w-8 h-8 text-green-600" />,
    color: 'border-green-200 hover:border-green-400 bg-green-50',
    iconBg: 'bg-green-100',
    badge: 'bg-green-100 text-green-700',
    path: '/login',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">BioSense</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <div className="text-center pt-16 pb-10 px-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Real-time hospital fall detection system
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          ISAC-Powered Patient<br />
          <span className="text-blue-600">Fall Detection</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          A wireless sensing system using NOMA and SIC technology to detect patient falls in real time and stream live vitals to clinical staff.
        </p>
      </div>

      {/* How it works — simple 3 step */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
            <p className="text-sm font-medium text-gray-800">Python simulates patient signals via ISAC sensing</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
            <p className="text-sm font-medium text-gray-800">Go backend receives data via MQTT and streams via WebSocket</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
            <p className="text-sm font-medium text-gray-800">Dashboard shows live vitals and fall alerts by role</p>
          </div>
        </div>
      </div>

      {/* Role cards */}
      <div className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <p className="text-center text-gray-500 text-sm mb-6 font-medium">
          Choose your role to sign in
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.title}
              onClick={() => navigate(role.path)}
              className={`text-left p-6 rounded-xl border-2 transition cursor-pointer ${role.color}`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${role.iconBg}`}>
                {role.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${role.badge}`}>
                  {role.title}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{role.description}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                Sign in as {role.title} <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Credentials hint for presentation */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-500">
          <p className="font-medium text-gray-700 mb-2">Demo credentials</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-medium text-purple-700">Admin</p>
              <p>admin@biosense.com</p>
              <p>admin123</p>
            </div>
            <div>
              <p className="font-medium text-blue-700">Doctor</p>
              <p>doctor@biosense.com</p>
              <p>doctor123</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Patient</p>
              <p>patient@biosense.com</p>
              <p>patient123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        BioSense — ISAC Fall Detection System · Built with Python, Go, React
      </div>
    </div>
  );
}