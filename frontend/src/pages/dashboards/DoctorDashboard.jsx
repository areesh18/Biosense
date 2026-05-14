import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Activity, AlertTriangle, Wind, Wifi, WifiOff, Bell } from 'lucide-react';
import useStream from '../../hooks/useStream';

const severityColor = (severity) => {
  switch (severity) {
    case 'HIGH': return 'bg-red-100 border-red-500 text-red-700';
    case 'MEDIUM': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
    case 'LOW': return 'bg-blue-100 border-blue-500 text-blue-700';
    default: return 'bg-gray-100 border-gray-400 text-gray-700';
  }
};

const severityBadge = (severity) => {
  switch (severity) {
    case 'HIGH': return 'bg-red-500 text-white';
    case 'MEDIUM': return 'bg-yellow-500 text-white';
    case 'LOW': return 'bg-blue-500 text-white';
    default: return 'bg-gray-400 text-white';
  }
};

const VitalCard = ({ icon, label, value, unit, normal }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-between mb-2">
      {icon}
      <span className="text-2xl font-bold text-gray-900">{value ?? '--'}</span>
    </div>
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-xs text-gray-400 mt-1">{unit} · {normal}</p>
  </div>
);

export default function DoctorDashboard() {
  const { vitals, sensing, alerts, connected } = useStream();
  const [selectedId, setSelectedId] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(false);

  // accumulate all fall alerts, don't replace
  useEffect(() => {
    if (sensing?.fall_detected) {
      setActiveAlerts(prev => {
        // avoid exact duplicates in same second
        const alreadyExists = prev.some(
          a => a.severity === sensing.severity && a.spike_count === sensing.spike_count
        );
        if (alreadyExists) return prev;
        return [{ ...sensing, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 20);
      });
      setDismissed(false);
    }
  }, [sensing]);

  const selectedPatient = vitals.find(v => v.patient_id === selectedId) || vitals[0];
  const hasActiveAlerts = activeAlerts.length > 0 && !dismissed;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Live patient monitoring via ISAC sensing</p>
        </div>
        <div className="flex items-center gap-4">
          {/* alert count badge */}
          {activeAlerts.length > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              <Bell className="w-4 h-4 text-red-500" />
              <span className="text-red-600 text-sm font-medium">{activeAlerts.length} fall events</span>
            </div>
          )}
          {connected
            ? <><Wifi className="text-green-500 w-5 h-5" /><span className="text-green-600 text-sm font-medium">Live</span></>
            : <><WifiOff className="text-red-400 w-5 h-5" /><span className="text-red-500 text-sm">Disconnected</span></>
          }
        </div>
      </div>

      {/* Active Fall Alerts Panel */}
      {hasActiveAlerts && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-600 w-5 h-5" />
              <span className="font-semibold text-red-700">
                {activeAlerts.length} Fall Event{activeAlerts.length > 1 ? 's' : ''} Detected This Session
              </span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-red-400 hover:text-red-600 text-sm underline"
            >
              Dismiss all
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {activeAlerts.map((a, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-red-100 rounded p-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${severityBadge(a.severity)}`}>
                    {a.severity}
                  </span>
                  <span className="text-sm text-gray-700">
                    Confidence: {(a.confidence * 100).toFixed(0)}% · Spikes: {a.spike_count}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* two column layout below */}
      <div className="flex gap-6">

        {/* LEFT — patient vitals */}
        <div className="flex-1 min-w-0">

          {/* Patient Selector */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <p className="text-sm text-gray-500 mb-3">Select Patient</p>
            <div className="flex flex-wrap gap-2">
              {vitals.map(v => (
                <button
                  key={v.patient_id}
                  onClick={() => setSelectedId(v.patient_id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition
                    ${(selectedId === v.patient_id || (!selectedId && vitals[0]?.patient_id === v.patient_id))
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                >
                  {v.patient_id}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Patient Vitals */}
          {selectedPatient && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <VitalCard
                  icon={<Heart className="w-8 h-8 text-red-500" />}
                  label="Heart Rate"
                  value={selectedPatient.heart_rate_bpm}
                  unit="BPM"
                  normal="Normal: 60-100"
                />
                <VitalCard
                  icon={<Activity className="w-8 h-8 text-green-500" />}
                  label="SpO2"
                  value={selectedPatient.spo2_percent}
                  unit="%"
                  normal="Normal: >95%"
                />
                <VitalCard
                  icon={<Thermometer className="w-8 h-8 text-orange-500" />}
                  label="Temperature"
                  value={selectedPatient.temperature_c}
                  unit="°C"
                  normal="Normal: 36.1-37.2"
                />
                <VitalCard
                  icon={<Wind className="w-8 h-8 text-purple-500" />}
                  label="Respiration"
                  value={selectedPatient.respiration_rate_bpm}
                  unit="breaths/min"
                  normal="Normal: 12-20"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex gap-6 text-sm text-gray-600">
                <span>Patient ID: <strong className="text-gray-900">{selectedPatient.patient_id}</strong></span>
                <span>Distance: <strong className="text-gray-900">{selectedPatient.distance_m} m</strong></span>
                <span>Last update: <strong className="text-gray-900">{new Date(selectedPatient.timestamp).toLocaleTimeString()}</strong></span>
              </div>
            </>
          )}

          {/* All Patients Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">All Patients Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Heart Rate</th>
                    <th className="pb-3">SpO2</th>
                    <th className="pb-3">Temp (°C)</th>
                    <th className="pb-3">Respiration</th>
                    <th className="pb-3">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {vitals.map(v => (
                    <tr
                      key={v.patient_id}
                      onClick={() => setSelectedId(v.patient_id)}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-3 font-medium text-gray-900">{v.patient_id}</td>
                      <td className="py-3">{v.heart_rate_bpm} BPM</td>
                      <td className="py-3">{v.spo2_percent}%</td>
                      <td className="py-3">{v.temperature_c}°C</td>
                      <td className="py-3">{v.respiration_rate_bpm}/min</td>
                      <td className="py-3">{v.distance_m} m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT — live alerts feed */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Live Alerts Feed
              <span className="ml-2 text-sm font-normal text-gray-400">({alerts.length})</span>
            </h2>
            {alerts.length === 0
              ? <p className="text-gray-400 text-sm">No alerts yet this session.</p>
              : (
                <div className="space-y-3 max-h-screen overflow-y-auto">
                  {alerts.map((a, i) => (
                    <div key={i} className={`border-l-4 p-3 rounded ${severityColor(a.severity)}`}>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{a.patient_id}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${severityBadge(a.severity)}`}>
                          {a.severity}
                        </span>
                      </div>
                      <p className="text-xs mt-1">
                        Confidence: {(a.confidence * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(a.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

      </div>
    </div>
  );
}