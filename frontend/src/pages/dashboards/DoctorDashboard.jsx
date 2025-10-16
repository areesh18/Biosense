import React, { useState } from 'react';
import { ChevronDown, Heart, Thermometer, Activity, AlertTriangle, Eye, Zap, Droplets, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState('john-doe');

  const patients = {
    'john-doe': {
      name: 'John Doe',
      id: 'P001',
      age: 68,
      room: '102A',
      condition: 'Post-Surgery Recovery',
      status: 'Stable',
      vitals: {
        heartRate: 78,
        bloodPressure: '125/80',
        temperature: 98.6,
        spo2: 97,
        respiratoryRate: 16,
        bloodSugar: 110
      },
      alerts: [
        { type: 'warning', message: 'Heart rate slightly elevated', time: '2 hours ago' },
        { type: 'info', message: 'Medication administered', time: '4 hours ago' }
      ],
      fallDetection: {
        status: 'Normal',
        lastIncident: 'None in 30 days',
        riskLevel: 'Low'
      }
    },
    'jane-smith': {
      name: 'Jane Smith',
      id: 'P002',
      age: 45,
      room: '205B',
      condition: 'Diabetes Management',
      status: 'Monitoring',
      vitals: {
        heartRate: 72,
        bloodPressure: '118/75',
        temperature: 99.1,
        spo2: 98,
        respiratoryRate: 14,
        bloodSugar: 145
      },
      alerts: [
        { type: 'warning', message: 'Blood sugar elevated', time: '30 minutes ago' },
        { type: 'success', message: 'Vital signs stable', time: '1 hour ago' }
      ],
      fallDetection: {
        status: 'Normal',
        lastIncident: 'None',
        riskLevel: 'Low'
      }
    },
    'robert-wilson': {
      name: 'Robert Wilson',
      id: 'P003',
      age: 72,
      room: '301C',
      condition: 'Cardiac Monitoring',
      status: 'Critical',
      vitals: {
        heartRate: 95,
        bloodPressure: '145/92',
        temperature: 100.2,
        spo2: 94,
        respiratoryRate: 22,
        bloodSugar: 98
      },
      alerts: [
        { type: 'danger', message: 'SpO2 below normal range', time: '15 minutes ago' },
        { type: 'warning', message: 'Blood pressure elevated', time: '45 minutes ago' }
      ],
      fallDetection: {
        status: 'High Risk',
        lastIncident: '3 days ago',
        riskLevel: 'High'
      }
    }
  };

  const heartRateData = [
    { time: '00:00', value: 72 },
    { time: '04:00', value: 68 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 78 },
    { time: '16:00', value: 82 },
    { time: '20:00', value: 76 },
    { time: '24:00', value: 74 }
  ];

  const spo2Data = [
    { time: '00:00', value: 98 },
    { time: '04:00', value: 97 },
    { time: '08:00', value: 98 },
    { time: '12:00', value: 97 },
    { time: '16:00', value: 96 },
    { time: '20:00', value: 97 },
    { time: '24:00', value: 97 }
  ];

  const temperatureData = [
    { time: '00:00', value: 98.4 },
    { time: '04:00', value: 98.2 },
    { time: '08:00', value: 98.6 },
    { time: '12:00', value: 98.8 },
    { time: '16:00', value: 99.1 },
    { time: '20:00', value: 98.9 },
    { time: '24:00', value: 98.6 }
  ];

  const bloodPressureData = [
    { time: '00:00', systolic: 120, diastolic: 78 },
    { time: '06:00', systolic: 118, diastolic: 75 },
    { time: '12:00', systolic: 125, diastolic: 80 },
    { time: '18:00', systolic: 128, diastolic: 82 },
    { time: '24:00', systolic: 122, diastolic: 79 }
  ];

  const activityData = [
    { name: 'Sleep', value: 8, color: '#3B82F6' },
    { name: 'Active', value: 6, color: '#10B981' },
    { name: 'Rest', value: 10, color: '#F59E0B' }
  ];

  const currentPatient = patients[selectedPatient];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'stable': return 'text-green-600 bg-green-100';
      case 'monitoring': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'danger': return 'border-red-500 bg-red-50 text-red-700';
      case 'warning': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'success': return 'border-green-500 bg-green-50 text-green-700';
      default: return 'border-blue-500 bg-blue-50 text-blue-700';
    }
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Health Dashboard</h1>
            <p className="text-gray-600">Real-time patient monitoring and health analytics</p>
          </div>
          
          <div className="relative">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(patients).map(([key, patient]) => (
                <option key={key} value={key}>
                  {patient.name} - {patient.id}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentPatient.name}</h3>
            <p className="text-gray-600">ID: {currentPatient.id}</p>
            <p className="text-gray-600">Age: {currentPatient.age}</p>
            <p className="text-gray-600">Room: {currentPatient.room}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Condition</p>
            <p className="font-medium text-gray-900">{currentPatient.condition}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentPatient.status)}`}>
              {currentPatient.status}
            </span>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Fall Risk</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(currentPatient.fallDetection.riskLevel)}`}>
              {currentPatient.fallDetection.riskLevel} Risk
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">{currentPatient.vitals.heartRate}</span>
          </div>
          <p className="text-gray-600 text-sm">Heart Rate (BPM)</p>
          <p className="text-xs text-gray-500 mt-1">Normal: 60-100</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{currentPatient.vitals.bloodPressure}</span>
          </div>
          <p className="text-gray-600 text-sm">Blood Pressure</p>
          <p className="text-xs text-gray-500 mt-1">Normal: &lt;120/80</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Thermometer className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">{currentPatient.vitals.temperature}°F</span>
          </div>
          <p className="text-gray-600 text-sm">Temperature</p>
          <p className="text-xs text-gray-500 mt-1">Normal: 97.8-99.1°F</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{currentPatient.vitals.spo2}%</span>
          </div>
          <p className="text-gray-600 text-sm">SpO2</p>
          <p className="text-xs text-gray-500 mt-1">Normal: &gt;95%</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Wind className="h-8 w-8 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">{currentPatient.vitals.respiratoryRate}</span>
          </div>
          <p className="text-gray-600 text-sm">Respiratory Rate</p>
          <p className="text-xs text-gray-500 mt-1">Normal: 12-20/min</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="h-8 w-8 text-indigo-500" />
            <span className="text-2xl font-bold text-gray-900">{currentPatient.vitals.bloodSugar}</span>
          </div>
          <p className="text-gray-600 text-sm">Blood Sugar</p>
          <p className="text-xs text-gray-500 mt-1">Normal: 70-140 mg/dL</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Rate Trend (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SpO2 Levels (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={spo2Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Monitoring (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[97, 101]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Pressure Readings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bloodPressureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="systolic" fill="#3B82F6" name="Systolic" />
              <Bar dataKey="diastolic" fill="#93C5FD" name="Diastolic" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            Fall Detection
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Current Status</p>
              <p className="font-medium text-gray-900">{currentPatient.fallDetection.status}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Last Incident</p>
              <p className="font-medium text-gray-900">{currentPatient.fallDetection.lastIncident}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Risk Level</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(currentPatient.fallDetection.riskLevel)}`}>
                {currentPatient.fallDetection.riskLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity (Hours)</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}h`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {activityData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {currentPatient.alerts.map((alert, index) => (
              <div key={index} className={`border-l-4 p-3 rounded ${getAlertColor(alert.type)}`}>
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs opacity-75 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;