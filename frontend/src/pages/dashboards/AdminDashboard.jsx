import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, Activity, Users, RefreshCw, Play, Square } from 'lucide-react';
import Navbar from '../../components/Navbar.jsx';
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

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
    </div>
    <p className="text-gray-700 font-medium">{label}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

export default function AdminDashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'admin';
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streamRunning, setStreamRunning] = useState(false);
  const [streamLoading, setStreamLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/admin/alerts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (e) {
      console.error('Failed to fetch alerts:', e);
    } finally {
      setLoading(false);
    }
  };

  const checkStreamStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/stream/status');
      const data = await res.json();
      setStreamRunning(data.running);
    } catch (e) {
      setStreamRunning(false);
    }
  };

  const startStream = async () => {
    setStreamLoading(true);
    try {
      await fetch('http://localhost:5000/stream/start', { method: 'POST' });
      setStreamRunning(true);
    } catch (e) {
      console.error('Failed to start stream:', e);
    } finally {
      setStreamLoading(false);
    }
  };

  const stopStream = async () => {
    setStreamLoading(true);
    try {
      await fetch('http://localhost:5000/stream/stop', { method: 'POST' });
      setStreamRunning(false);
    } catch (e) {
      console.error('Failed to stop stream:', e);
    } finally {
      setStreamLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    checkStreamStatus();
  }, []);

  const highCount = alerts.filter(a => a.severity === 'HIGH').length;
  const medCount = alerts.filter(a => a.severity === 'MEDIUM').length;
  const lowCount = alerts.filter(a => a.severity === 'LOW').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar role="admin" />
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome, {userEmail} — full system access</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Stream control */}
          <button
            onClick={streamRunning ? stopStream : startStream}
            disabled={streamLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
              ${streamRunning
                ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100'
                : 'bg-green-50 border border-green-200 text-green-600 hover:bg-green-100'
              } disabled:opacity-50`}
          >
            {streamRunning
              ? <><Square className="w-4 h-4" /> Stop Stream</>
              : <><Play className="w-4 h-4" /> Start Stream</>
            }
          </button>
          {/* Refresh alerts */}
          <button
            onClick={fetchAlerts}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stream status banner */}
      <div className={`mb-6 px-4 py-3 rounded-lg border text-sm font-medium flex items-center gap-2
        ${streamRunning
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-gray-50 border-gray-200 text-gray-500'
        }`}>
        <span className={`w-2 h-2 rounded-full ${streamRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
        {streamRunning ? 'Stream is live — receiving patient data' : 'Stream is stopped — click Start Stream to begin'}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Bell className="w-5 h-5 text-blue-600" />}
          label="Total Alerts"
          value={alerts.length}
          sub="stored in database"
          color="bg-blue-50"
        />
        <StatCard
          icon={<ShieldAlert className="w-5 h-5 text-red-600" />}
          label="High Severity"
          value={highCount}
          sub="immediate attention"
          color="bg-red-50"
        />
        <StatCard
          icon={<Activity className="w-5 h-5 text-yellow-600" />}
          label="Medium Severity"
          value={medCount}
          sub="monitor closely"
          color="bg-yellow-50"
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-green-600" />}
          label="Low Severity"
          value={lowCount}
          sub="low priority"
          color="bg-green-50"
        />
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          All Stored Fall Alerts
          <span className="ml-2 text-sm font-normal text-gray-400">({alerts.length} total)</span>
        </h2>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading alerts...</p>
        ) : alerts.length === 0 ? (
          <p className="text-gray-400 text-sm">No alerts stored yet. Start the stream to begin receiving data.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Severity</th>
                  <th className="pb-3">Confidence</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Saved At</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{a.patient_id}</td>
                    <td className="py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${severityBadge(a.severity)}`}>
                        {a.severity}
                      </span>
                    </td>
                    <td className="py-3">{(a.confidence * 100).toFixed(0)}%</td>
                    <td className="py-3 text-gray-500">{new Date(a.timestamp).toLocaleString()}</td>
                    <td className="py-3 text-gray-400">{new Date(a.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}