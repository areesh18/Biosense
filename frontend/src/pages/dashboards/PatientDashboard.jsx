import React, { useState } from 'react';
import { Heart, Thermometer, Activity, Wind, Wifi, WifiOff } from 'lucide-react';
import useStream from '../../hooks/useStream';
import Navbar from '../../components/Navbar.jsx';
const VitalCard = ({ icon, label, value, unit, normal, normalRange }) => {
  const isAbnormal = normalRange && value !== null && (value < normalRange[0] || value > normalRange[1]);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${isAbnormal ? 'border-red-400' : 'border-green-400'}`}>
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className={`text-3xl font-bold ${isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
          {value ?? '--'}
        </span>
      </div>
      <p className="text-gray-700 font-medium">{label}</p>
      <p className="text-xs text-gray-400 mt-1">{unit} · {normal}</p>
      {isAbnormal && (
        <p className="text-xs text-red-500 mt-2 font-medium">⚠ Outside normal range</p>
      )}
    </div>
  );
};

export default function PatientDashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'patient';
  const { vitals, connected } = useStream();

  // Patient sees only their own data — using patient_1 as demo
  // In a real system this would match the logged-in patient's ID
  const myVitals = vitals[0] || null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar role="patient" />
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Health Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome, {userEmail}</p>
        </div>
        <div className="flex items-center gap-2">
          {connected
            ? <><Wifi className="text-green-500 w-5 h-5" /><span className="text-green-600 text-sm font-medium">Live</span></>
            : <><WifiOff className="text-red-400 w-5 h-5" /><span className="text-red-500 text-sm">Disconnected</span></>
          }
        </div>
      </div>

      {!myVitals ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-400">Waiting for vitals data...</p>
          <p className="text-gray-300 text-sm mt-2">Make sure the stream is running</p>
        </div>
      ) : (
        <>
          {/* Last update bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 text-sm text-gray-500 flex items-center justify-between">
            <span>Patient ID: <strong className="text-gray-900">{myVitals.patient_id}</strong></span>
            <span>Last updated: <strong className="text-gray-900">{new Date(myVitals.timestamp).toLocaleTimeString()}</strong></span>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <VitalCard
              icon={<Heart className="w-8 h-8 text-red-500" />}
              label="Heart Rate"
              value={myVitals.heart_rate_bpm}
              unit="BPM"
              normal="Normal: 60–100"
              normalRange={[60, 100]}
            />
            <VitalCard
              icon={<Activity className="w-8 h-8 text-green-500" />}
              label="SpO2"
              value={myVitals.spo2_percent}
              unit="%"
              normal="Normal: >95%"
              normalRange={[95, 100]}
            />
            <VitalCard
              icon={<Thermometer className="w-8 h-8 text-orange-500" />}
              label="Temperature"
              value={myVitals.temperature_c}
              unit="°C"
              normal="Normal: 36.1–37.2"
              normalRange={[36.1, 37.2]}
            />
            <VitalCard
              icon={<Wind className="w-8 h-8 text-purple-500" />}
              label="Respiration"
              value={myVitals.respiration_rate_bpm}
              unit="breaths/min"
              normal="Normal: 12–20"
              normalRange={[12, 20]}
            />
          </div>

          {/* Overall status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Heart Rate</p>
                <p className={`text-lg font-bold ${myVitals.heart_rate_bpm >= 60 && myVitals.heart_rate_bpm <= 100 ? 'text-green-600' : 'text-red-600'}`}>
                  {myVitals.heart_rate_bpm >= 60 && myVitals.heart_rate_bpm <= 100 ? 'Normal' : 'Abnormal'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Oxygen Level</p>
                <p className={`text-lg font-bold ${myVitals.spo2_percent >= 95 ? 'text-green-600' : 'text-red-600'}`}>
                  {myVitals.spo2_percent >= 95 ? 'Normal' : 'Low'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Temperature</p>
                <p className={`text-lg font-bold ${myVitals.temperature_c >= 36.1 && myVitals.temperature_c <= 37.2 ? 'text-green-600' : 'text-red-600'}`}>
                  {myVitals.temperature_c >= 36.1 && myVitals.temperature_c <= 37.2 ? 'Normal' : 'Abnormal'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}