# BioSense Presentation Guide

## One-Line Project Pitch

BioSense is an ISAC-enabled IoMT healthcare prototype that uses the same wireless signal for patient communication and sensing, processes it at the edge using NOMA and SIC, detects fall-like events from residual/radar features, and streams live vitals and alerts to role-based hospital dashboards.

## How To Open The Presentation

Start with the problem, not the technology:

"Continuous patient monitoring is becoming common, but most systems treat sensing, communication, analytics, and privacy as separate problems. That creates latency, fragmented decisions, and more risk around patient data. BioSense addresses this by combining Integrated Sensing and Communication, edge analytics, and a secure hospital application workflow."

Then give the codebase reality:

"In our current implementation, we have a working software prototype for ISAC/NOMA simulation, fall sensing, MQTT streaming, backend alert handling, authentication, and React dashboards. Federated learning and homomorphic encryption are part of the proposed architecture and future privacy layer."

## Slide-By-Slide Talk Track

### Slide 1: Title

Say:

"Our project is BioSense: ISAC-enabled IoMT for smart and secure health monitoring. The key idea is that medical IoT devices should not only transmit vitals, but also use the communication signal itself for sensing events like falls."

Emphasize:

- ISAC means Integrated Sensing and Communication.
- IoMT means Internet of Medical Things.
- The project is healthcare-focused: patient vitals, emergency detection, hospital dashboards.

### Slide 2: Objectives

Say:

"We designed BioSense around four objectives: real-time health monitoring, adaptive anomaly detection, synchronized hospital architecture, and privacy-preserving intelligence."

Connect to implementation:

- Real-time monitoring is represented by simulated patient vitals and WebSocket dashboards.
- Anomaly detection is implemented as fall detection using residual signal and radar track-loss analysis.
- Synchronized architecture is implemented through Python simulation, MQTT, Go backend, PostgreSQL, and React dashboards.
- Privacy preservation is an architectural target through FL/HE, not fully implemented in this prototype.

### Slide 3: Problem Definition

Say:

"The problem is that conventional IoMT systems often collect vitals but analyze them in separated layers. That increases delay and makes urgent decisions harder. Also, sending raw medical data to a central server creates privacy concerns."

Then:

"BioSense's solution is to move intelligence closer to the patient. The edge node receives a mixed communication/sensing signal, separates patient data using NOMA-SIC, analyzes leftover sensing information, and raises alerts quickly."

### Slide 4: Literature Review

Say:

"Our literature review led to two main directions. First, federated learning and homomorphic encryption support privacy-preserving medical intelligence. Second, NOMA-ISAC research supports the technical idea of serving communication and sensing simultaneously."

Keep it crisp:

- NOMA helps support multiple users on the same resource block.
- SIC is necessary to decode overlapping signals.
- FL helps train without sharing raw patient data.
- HE protects model updates, but adds computation overhead.

Judge-safe distinction:

"Our current prototype focuses on the NOMA-ISAC and hospital application pipeline. The FL and HE layer is proposed as the next privacy-preserving extension."

### Slide 5: Layered Architecture

Use this as your main structure slide.

Say:

"BioSense is organized into five layers."

Layer mapping:

1. ISAC-IoMT Sensor Layer: simulated patients and signal generation in `python/core/patients` and `python/simulation`.
2. Edge/Local Processing Layer: NOMA-SIC, residual analysis, radar processing, and fall detection in `python/core`.
3. Federated Learning Layer: proposed privacy-preserving learning layer from the PPT architecture.
4. Backend Service Layer: Go backend with authentication, MQTT subscriber, WebSocket broadcast, PostgreSQL alert persistence.
5. Web Application Layer: React dashboards for admin, doctor, and patient.

Strong explanation:

"The important workflow is bottom-up: sensor data becomes a wireless signal, the edge extracts communication and sensing features, backend services distribute events, and dashboards make those events actionable."

### Slide 6: Workflow Diagram And Algorithms

Explain the actual implemented workflow:

1. Patient objects generate bits and vitals.
2. Power allocation assigns more power to the weaker/farther user.
3. NOMA superposes strong and weak patient signals.
4. Rayleigh channels and AWGN simulate wireless behavior.
5. Radar echo is injected to represent sensing evidence during a fall.
6. Edge node applies weak-first SIC to recover patient data.
7. Residual and radar processors analyze what remains after cancellation.
8. Fall detector decides severity and confidence.
9. Alerts are published through MQTT and shown in dashboards.

Key algorithm names:

- NOMA: non-orthogonal multiple access for multi-patient communication.
- SIC: successive interference cancellation to decode overlapping signals.
- Matched-filter radar processing: estimates range/SNR from the residual signal.
- Track-loss fall detection: detects loss of a stable radar track after movement.
- FedSense/FedAvg: proposed FL direction for future decentralized learning.

### Slide 7: Methodology And Tech Stack

Say:

"Our development follows a five-phase pipeline: acquisition, edge processing, model training as the proposed privacy layer, backend integration, and visualization."

Codebase tech stack:

- Python: signal simulation, ISAC/NOMA, radar processing, stream generation, Flask APIs.
- Flask: simulation control endpoints on port 5000.
- MQTT: topics for vitals, residual sensing, and alerts.
- Go: backend service, role-based auth, JWT, GORM, PostgreSQL, WebSocket stream.
- React and Tailwind: live dashboards.
- PostgreSQL: stores users and fall alerts.

Important:

"The present demo is software-simulated. ESP32, Raspberry Pi, and SDR hardware are future deployment targets."

### Slide 8: Experimental Details

Say:

"For the implemented experiment, we simulate a multi-patient hospital environment. The Python layer creates patients at different distances, generates communication bits, applies NOMA transmission, injects radar echo for fall events, and evaluates communication and sensing outcomes."

Mention measurable outputs:

- BER for weak and strong users.
- Radar event frame count.
- Maximum SNR in dB.
- Track stability and track loss.
- Fall confidence and severity.
- Detection probability and false alarm rate through Monte Carlo runs.

Sample prototype result from current code:

- A seeded single fall run detected a fall with `HIGH` severity and about `0.817` confidence.
- In one 10-trial Monte Carlo sample, detection probability was `0.8`, false alarm rate was `0.0`, and missed detection rate was `0.2`.
- Treat these as demonstration values; they vary with seed, number of trials, and channel conditions.

### Slide 9: Results And Analysis

Say:

"The system result has two parts: communication reliability and sensing reliability. Communication reliability is measured through BER after SIC. Sensing reliability is measured through radar features such as SNR, event frames, range migration, track stability, and track loss."

Interpretation:

- Lower BER means cleaner communication recovery.
- Higher radar SNR and stable-to-lost track behavior support fall detection.
- False alarms are controlled by requiring a stable track before declaring track loss.

Current code demo points:

- `python/simulation/run_complete_pipeline.py` runs one complete ISAC pipeline.
- `python/simulation/monte_carlo.py` repeats trials and computes detection statistics.
- `python/api/app.py` exposes simulation, metrics, stream control, latest vitals, and alerts.

### Slide 10: Frontend And UI

Say:

"The UI is role-based. Admin manages the stream and reviews stored alerts. Doctors monitor live patient vitals and fall alerts. Patients see their own vitals and status."

Dashboard mapping:

- Admin dashboard: starts/stops stream through Flask, fetches stored alerts from Go backend.
- Doctor dashboard: receives live vitals and fall alerts through WebSocket.
- Patient dashboard: displays live personal vitals and normal/abnormal status.
- Login/signup: JWT-based role flow.

### Slide 11: Conclusion

Say:

"BioSense demonstrates how ISAC can make IoMT more responsive. Instead of only sending vitals, the wireless signal also becomes a sensing source. The edge node extracts both communication and fall evidence, and the hospital application turns that into real-time alerts."

End with:

"Our current prototype validates the core workflow in software. The next step is adding the FL/HE privacy layer and moving from simulated sensors to hardware-assisted sensing."

### Slide 12: References

Say:

"The references cover three areas: privacy-preserving learning, leakage risks in FL, and NOMA-ISAC communication design. These papers justify why we combine FL/HE for privacy and NOMA/SIC for integrated sensing and communication."

### Slide 13: Thank You

Close:

"Thank you. I am ready for questions."

## Codebase Structure To Explain

### Python ISAC Layer

`python/simulation/run_complete_pipeline.py`

- Orchestrates one full experiment.
- Creates strong and weak patients.
- Generates bits.
- Allocates power.
- Superposes NOMA signal.
- Applies channel, noise, and radar echo.
- Sends received signal into the edge node.

`python/core/communication`

- `power_allocator.py`: allocates higher power to weaker channel users.
- `noma.py`: combines patient signals into one transmitted waveform.
- `channel.py`: simulates Rayleigh channel.
- `awgn.py`: adds noise.

`python/core/sic`

- `weak_first_sic.py`: decodes weak user first, cancels it, then decodes strong user.
- Produces BER and residual signal.

`python/core/sensing`

- `radar_processor.py`: matched-filter radar analysis, SNR, range, track-loss features.
- `fall_detector.py`: final fall decision, severity, confidence.
- `residual_analyzer.py`: residual envelope, spikes, energy.

`python/core/edge/edge_node.py`

- Connects SIC, residual analysis, radar processing, fall detection, and alert generation.
- This is the "brain" of the local edge layer.

`python/simulation/stream_vitals.py`

- Generates continuous multi-patient frames.
- Produces vitals and sensing summaries.
- Publishes data to MQTT topics when enabled.

`python/api/app.py`

- Flask control API.
- Important endpoints: `/simulate`, `/metrics`, `/stream/start`, `/stream/stop`, `/stream/status`, `/vitals/latest`, `/alerts`.

### Go Backend Layer

`backend/main.go`

- Starts the backend on port 8080.
- Connects database.
- Starts MQTT subscriber.
- Registers auth, dashboard, alert, and WebSocket routes.

`backend/services/mqtt_subscriber.go`

- Subscribes to:
  - `hospital/patient/vitals`
  - `hospital/patient/alerts`
  - `hospital/isac/residual`
- Saves fall alerts to PostgreSQL.
- Broadcasts vitals/residual/alerts to WebSocket clients.

`backend/services/broadcaster.go`

- Maintains connected WebSocket clients.
- Broadcasts incoming MQTT messages.

`backend/handlers/auth.go`

- Registers admin, doctor, and patient users.
- Logs users in and returns JWT.

`backend/handlers/alerts.go`

- Fetches stored fall alerts for admin/doctor views.

### Frontend Layer

`frontend/src/App.jsx`

- Defines routes and role-protected dashboards.

`frontend/src/hooks/useStream.js`

- Connects to `ws://localhost:8080/ws/stream`.
- Separates incoming messages into vitals, sensing, and alerts.

`frontend/src/pages/dashboards/AdminDashboard.jsx`

- Starts/stops Python stream.
- Fetches stored alerts from Go backend.

`frontend/src/pages/dashboards/DoctorDashboard.jsx`

- Shows live patients, vitals, and fall alerts.

`frontend/src/pages/dashboards/PatientDashboard.jsx`

- Shows patient-facing vitals and status.

## End-To-End Demo Script

Use this order if you demo live:

1. Start the Python Flask API.
2. Start MQTT broker if using MQTT streaming.
3. Start Go backend.
4. Start React frontend.
5. Login as admin and start stream.
6. Open doctor dashboard and show live vitals.
7. Wait for or force a fall probability event.
8. Show fall alert in doctor dashboard.
9. Show stored alerts in admin dashboard.

Explain during demo:

"The Python layer is generating the ISAC sensing/communication stream. MQTT carries vitals, sensing residuals, and alerts. The Go backend subscribes to those topics, saves alerts, and broadcasts live data to React through WebSocket."

## Judging Panel Counter Questions And Answers

### Q1. What is ISAC, and why use it here?

ISAC means Integrated Sensing and Communication. In BioSense, the same wireless infrastructure is used to transmit patient data and sense physical events. This reduces separate hardware dependence and supports faster edge decisions.

### Q2. Why NOMA instead of ordinary orthogonal access?

NOMA allows multiple users to share the same time/frequency resource by assigning different power levels. In a hospital with many IoMT devices, this can improve spectral efficiency. We then use SIC to separate the overlapping user signals.

### Q3. Why decode the weak user first?

The weaker/farther user receives higher power in power-domain NOMA. Because its signal is stronger in the composite waveform, the receiver decodes and subtracts it first, then decodes the strong/near user.

### Q4. What is the residual signal, and why is it useful?

After SIC cancels reconstructed communication signals, what remains is residual energy. In our prototype, that residual contains sensing evidence such as radar echo behavior, so it is analyzed for spikes, SNR, range migration, and track loss.

### Q5. How is a fall detected?

The stronger implemented path is radar track-loss detection. The system first checks whether a radar track is stable at the expected patient range. If that track later drops for enough frames, the fall detector marks a fall and assigns severity/confidence.

### Q6. How do you reduce false alarms?

We do not declare a fall from one noisy spike alone. The radar path requires track stability first, then sustained track loss. The system also uses thresholds like SNR, event frame count, and track-loss frame count.

### Q7. Is federated learning implemented?

In the current codebase, the implemented prototype focuses on ISAC/NOMA simulation, edge fall detection, streaming, backend, and dashboards. Federated learning is part of the proposed architecture and future extension for privacy-preserving anomaly models.

### Q8. Is homomorphic encryption implemented?

Not in the present codebase. It is included in the architecture and literature direction. The current implemented security is role-based access with JWT and database-backed users. Homomorphic encryption would be added to protect FL model updates.

### Q9. What data is real and what is simulated?

The current system uses simulated patient vitals, wireless channels, NOMA signals, radar echo, and fall events. The architecture is designed so future hardware such as ESP32, Raspberry Pi, or SDR can replace the simulated sensor layer.

### Q10. Why use both Python and Go?

Python is better suited for simulation, signal processing, and data science workflows. Go is used for backend services because it is fast, concurrent, and clean for APIs, MQTT subscribers, WebSocket broadcasting, and database integration.

### Q11. What are the main limitations?

The main limitations are that the sensing is simulated, FL/HE are architectural rather than fully implemented, and detection performance depends on channel assumptions, thresholds, and trial conditions. Hardware validation is the next important step.

### Q12. What is the unique value of your project?

The value is the full pipeline: not just a dashboard and not just an algorithm. BioSense connects ISAC-based sensing, NOMA communication, edge fall detection, backend alert persistence, and real-time hospital dashboards.

## Best Phrases To Use In Front Of Judges

- "Implemented prototype" for the current code.
- "Proposed privacy layer" for FL and homomorphic encryption.
- "Software-simulated ISAC environment" for the current experiment.
- "Edge decision loop" for SIC, radar processing, and fall detection.
- "Role-based hospital workflow" for admin, doctor, and patient dashboards.

## Avoid Saying

- Do not say FL and homomorphic encryption are fully implemented unless you add that code later.
- Do not claim medical-grade accuracy.
- Do not claim hardware validation yet.
- Do not say the system diagnoses disease; it monitors vitals and detects fall-like events in the prototype.

## Short Final Summary For Viva

"BioSense is a software prototype for ISAC-enabled healthcare monitoring. The Python layer simulates multi-patient NOMA communication and radar sensing, the edge node uses SIC and radar residual analysis to detect falls, MQTT and the Go backend move events into the hospital system, PostgreSQL stores alerts, and React dashboards show role-based live monitoring. The current implementation proves the end-to-end workflow, while federated learning, homomorphic encryption, and hardware sensing are the next extensions."
