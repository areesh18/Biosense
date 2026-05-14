import { useEffect, useState } from 'react';

export default function useStream() {
  const [vitals, setVitals] = useState({});
  const [sensing, setSensing] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/stream');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WS message:', data);

        // individual vital per patient
        // shape: { patient_id, heart_rate_bpm, spo2_percent, ... }
        if (data.patient_id && data.heart_rate_bpm !== undefined) {
          setVitals(prev => ({
            ...prev,
            [data.patient_id]: data
          }));
        }

        // residual/sensing frame
        // shape: { frame_id, sensing: { fall_detected, severity, ... } }
        if (data.sensing) {
          setSensing(data.sensing);
        }

        // alert
        // shape: { patient_id, alert, severity, confidence, timestamp }
        if (data.alert === 'FALL_DETECTED') {
          setAlerts(prev => [data, ...prev].slice(0, 50));
        }

      } catch (e) {
        console.error('Failed to parse message:', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    return () => ws.close();
  }, []);

  // convert vitals object to array for rendering
  const vitalsArray = Object.values(vitals);

  return { vitals: vitalsArray, sensing, alerts, connected };
}