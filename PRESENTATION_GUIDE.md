# BioSense Presentation Guide

## Core Pitch

BioSense is an ISAC-enabled IoMT healthcare prototype that combines shared-waveform communication and sensing, edge fall detection, privacy-aware federated intelligence, and a role-based hospital dashboard workflow.

Say it in one sentence:

"BioSense reuses the same simulated wireless signal for patient communication and fall sensing, processes it at the edge using NOMA, SIC, residual/radar analysis, and FedSense-style privacy-aware learning, then streams vitals and alerts into secure admin, doctor, and patient dashboards."

## Important Framing

Use this framing consistently:

- The current visible codebase implements the ISAC/NOMA simulation, edge fall detection, Flask control API, MQTT stream, Go backend, PostgreSQL alert persistence, WebSocket broadcasting, and React dashboards.
- The attached report describes the Federated Learning module as a true project component: Flower-based FL with three decentralized clients, non-IID partitions, FedAvg/FedSense aggregation, model saving, prediction, and simulated privacy helpers.
- Homomorphic Encryption is part of the privacy/security direction described in the report. The report also states that the current simulated encryption is not production-grade HE and should later be replaced with verified secure aggregation or real homomorphic encryption.
- Do not present the system as medically validated or diagnosis-ready.

Best phrasing:

"The main application path is implemented end to end in the checked codebase. The FL module is presented in the project report as a separate demonstrated privacy-learning component, and HE is treated as the cryptographic privacy direction, with production-grade HE listed as future hardening."

## Opening Script

Start with the problem:

"Continuous healthcare monitoring needs low latency, privacy, and role-specific access. Traditional IoMT systems often separate sensing, communication, storage, analytics, and visualization into different silos. That adds delay, duplicates infrastructure, and makes it harder to trace a critical event from patient signal to clinical alert."

Then introduce BioSense:

"BioSense addresses this by joining three ideas: ISAC for shared sensing and communication, edge intelligence for fast fall detection, and privacy-aware learning through federated training. The result is an end-to-end software prototype where simulated patient signals become live vitals and fall alerts on hospital dashboards."

## Slide-By-Slide Talk Track

### Slide 1: Title

Say:

"Our project is BioSense: ISAC-enabled IoMT for smart and secure healthcare. The key idea is that a medical IoT signal should not only carry patient data, but can also provide sensing evidence for events such as falls."

Emphasize:

- ISAC means Integrated Sensing and Communication.
- IoMT means Internet of Medical Things.
- The project combines signal processing, privacy-aware learning, backend services, and healthcare dashboards.

### Slide 2: Objectives

Say:

"BioSense has four objectives: real-time health monitoring, fall-event sensing, secure role-based hospital workflow, and privacy-aware intelligence."

Map objectives to the project:

- Real-time monitoring: simulated patient vitals, MQTT, WebSocket, React dashboards.
- Fall detection: residual/radar analysis and radar track-loss detection.
- Secure workflow: JWT login, bcrypt password hashing, role-protected Go routes, PostgreSQL alert storage.
- Privacy-aware intelligence: Flower-based FL demo with FedAvg/FedSense concepts and HE/secure aggregation as the privacy-hardening path.

### Slide 3: Problem Definition

Say:

"The project addresses the lack of a compact prototype that connects patient signal generation, shared communication/sensing, fall detection, persistent alerts, and role-specific dashboards in one workflow."

Then:

"A conventional design might use separate sensing hardware, separate communication channels, centralized analytics, and isolated dashboards. BioSense instead moves the first decision loop closer to the patient and forwards compact, actionable information to the hospital system."

### Slide 4: Literature Review

Say:

"The literature points to three needs. ISAC improves spectrum and hardware efficiency by sharing waveform resources. Edge IoMT reduces latency and bandwidth use. Federated Learning and encryption-based privacy mechanisms reduce the need to centralize sensitive patient data."

Keep it crisp:

- NOMA supports multiple patients on the same time/frequency resource.
- SIC separates overlapped patient signals.
- ISAC reuses the communication waveform for sensing.
- FL trains models across clients without sharing raw data.
- HE or secure aggregation protects model updates, but real production-grade HE adds computational cost.

### Slide 5: Architecture

Say:

"BioSense is easiest to explain as five connected layers."

Layer mapping:

1. ISAC-IoMT sensor layer: simulated patients, bits, vitals, channel gain, and waveform generation in `python/core/patients` and `python/simulation`.
2. Edge processing layer: NOMA, Rayleigh fading, AWGN, weak-first SIC, residual analysis, radar processing, and fall detection in `python/core`.
3. Federated intelligence layer: report-described FL module using Flower, three clients, non-IID partitions, FedAvg/FedSense aggregation, confidence scoring, and simulated privacy helpers.
4. Backend service layer: Go backend with authentication, MQTT ingestion, PostgreSQL alert persistence, and WebSocket broadcast.
5. Web application layer: React dashboards for admin, doctor, and patient workflows.

Strong explanation:

"The workflow is bottom-up: signal generation creates communication and sensing evidence, edge processing converts it into decisions, FL supports privacy-aware learning, backend services persist and broadcast events, and dashboards turn events into clinical actions."

### Slide 6: Workflow And Algorithms

Explain the implemented ISAC workflow:

1. Patient objects generate random bits and BPSK-style symbols.
2. Power allocation gives more power to the weaker/farther patient.
3. NOMA superposes strong and weak patient signals.
4. Rayleigh fading and AWGN simulate wireless channel behavior.
5. Radar echo is injected into the shared waveform for sensing evidence.
6. Weak-first SIC recovers communication bits and leaves a residual.
7. Residual and matched-filter radar processing extract sensing features.
8. Fall detector checks stable radar track followed by track loss.
9. Alerts and vitals are published through MQTT and displayed in dashboards.

Explain the report-described FL workflow:

1. Server initializes a global model.
2. Three hospital clients receive model parameters.
3. Each client trains locally on its own non-IID data partition.
4. Clients return model updates, sample counts, and reliability values.
5. FedAvg/FedSense aggregates updates without sharing raw datasets.
6. Confidence scoring supports sensing-aware reliability and alert severity.

Key algorithm names:

- NOMA: multi-user communication over shared resources.
- SIC: receiver-side separation of overlapping signals.
- Matched-filter radar processing: estimates range and SNR from residual evidence.
- Radar track-loss detection: detects a fall-like event when a stable track disappears.
- FedAvg: baseline federated averaging.
- FedSense: sensing-aware FL aggregation using data quality, sensing reliability, and communication quality.
- Sigmoid confidence calibration: maps raw anomaly evidence to low, medium, or high risk.

### Slide 7: Methodology And Tech Stack

Say:

"The methodology follows acquisition, edge processing, federated learning, backend integration, and visualization."

Current codebase tech stack:

- Python: ISAC/NOMA simulation, radar processing, fall detection, vitals stream, Monte Carlo metrics.
- Flask: simulation and stream control API on port 5000.
- MQTT: vitals, residual/sensing, and alert topics.
- Go: backend API, JWT auth, role middleware, MQTT subscriber, WebSocket hub, PostgreSQL persistence.
- React/Vite/Tailwind: role-based dashboards.
- PostgreSQL: users and fall alerts.

Report-described privacy stack:

- Flower: federated server and clients.
- FedAvg/FedSense: model aggregation.
- Simulated privacy helpers/encryption: demonstration-level privacy protection.
- Homomorphic Encryption/secure aggregation: future production-grade privacy hardening.

Hardware note:

"The present sensing and vitals are software-simulated. ESP32, Raspberry Pi, Jetson Nano, and SDR-style hardware are future deployment targets."

### Slide 8: Experimental Details

Say:

"For the ISAC experiment, we simulate a two-user NOMA environment, assign patients at different distances, generate bits, transmit through channel and noise, inject radar echo for fall events, and evaluate both communication and sensing performance."

Measured outputs:

- Weak and strong user BER.
- Radar event frame count.
- Maximum radar SNR in dB.
- Range migration and velocity estimate.
- Track stability and track loss.
- Fall confidence, severity, and basis.
- Detection probability, false alarm rate, and missed detection rate.

Local verification from this repo:

- Seeded fall run with `rng_seed=7`: fall detected, `HIGH` severity, confidence about `0.817`, radar max SNR about `23.69 dB`, and track loss true.
- One local 10-trial Monte Carlo run: detection probability `0.8`, false alarm rate `0.4`, missed detection rate `0.2`, mean weak BER about `0.163`, mean strong BER about `0.378`.
- Treat these as demonstration values. They vary with random channel conditions and trial count.

FL results from the report:

- Five federated rounds.
- Three sampled clients per round.
- Total execution time: `122.47 seconds`.
- Reported global accuracy moved from `96.43%` to `97.62%`.
- The report notes a numerical symmetry between reported accuracy and loss and lists future refinement of local evaluation functions.

### Slide 9: Results And Analysis

Say:

"BioSense has two result tracks. The first is the implemented application path from ISAC signal to dashboard alert. The second is privacy-aware learning through the FL pipeline described in the report."

ISAC result interpretation:

- Lower BER means better communication recovery after SIC.
- Radar SNR and event frames show sensing evidence.
- Stable track followed by track loss supports fall detection.
- False alarms and missed detections depend on thresholds, random channels, and simulation assumptions.

Backend/frontend result interpretation:

- Backend supports registration, login, JWT, role middleware, MQTT subscription, alert persistence, and WebSocket streaming.
- Frontend supports admin stream control, doctor monitoring, and patient vital views.

FL result interpretation:

- Local clients train without raw data sharing.
- Aggregation produces a global model.
- FedSense weights client updates using data quality, sensing reliability, and communication quality.
- Confidence calibration separates low fluctuations from medium and high-risk events.

### Slide 10: Frontend And UI

Say:

"The UI is role-based. Admin controls the stream and reviews stored alerts. Doctors monitor live vitals and fall alerts. Patients see their current vital status."

Dashboard mapping:

- Admin dashboard: calls Flask stream start/stop/status and fetches stored alerts from the Go backend.
- Doctor dashboard: consumes live WebSocket vitals and alerts.
- Patient dashboard: displays patient-facing vital status from the live stream.
- Login/signup: role-specific registration and JWT login.

### Slide 11: Limitations

Say this confidently:

"The prototype is strong because it connects the full workflow, but it is still a prototype."

Limitations:

- Sensing and vitals are simulated, not hardware-generated.
- WebSocket stream is not yet JWT-protected.
- WebSocket origin policy currently allows all origins.
- Patient dashboard does not yet bind logged-in users to real patient IDs.
- Admin dashboard directly calls the Flask service on localhost.
- PostgreSQL, MQTT broker, Flask, Go backend, and React frontend must run as separate services.
- The report-described FL module is a standalone demo, not yet integrated into the main dashboard workflow.
- Simulated encryption is not production-grade homomorphic encryption.
- The system is not medically validated.

### Slide 12: Conclusion

Say:

"BioSense demonstrates how ISAC can make IoMT more responsive. The same waveform carries patient communication and provides fall-sensing evidence. Edge processing detects fall-like events, federated learning supports privacy-aware intelligence, and the hospital application turns events into real-time role-based alerts."

End with:

"The current prototype proves the software workflow. The next step is deeper FL-dashboard integration, verified secure aggregation or homomorphic encryption, JWT-protected streaming, patient identity binding, and hardware validation."

### Slide 13: References

Say:

"The references support ISAC waveform sharing, IoMT edge architectures, latency-aware monitoring, security and privacy in healthcare software, federated learning for healthcare IoT, and future secure aggregation or homomorphic encryption."

### Slide 14: Thank You

Close:

"Thank you. I am ready for questions."

## Codebase Structure To Explain

### Python ISAC Layer

`python/simulation/run_complete_pipeline.py`

- Orchestrates one complete ISAC experiment.
- Creates a strong patient at 5 m and a weak patient at 20 m.
- Generates bits and BPSK symbols.
- Allocates NOMA power.
- Applies Rayleigh channels, AWGN, and radar echo.
- Sends the received signal into `EdgeNode`.

`python/core/communication`

- `power_allocator.py`: allocates more power to the weaker channel.
- `noma.py`: superposes patient signals.
- `channel.py`: simulates Rayleigh fading.
- `awgn.py`: adds complex AWGN.
- `modulation.py`: supports communication modulation helpers.

`python/core/sic/weak_first_sic.py`

- Decodes weak user first.
- Reconstructs and cancels weak contribution.
- Decodes strong user.
- Returns BER and residual signal.

`python/core/sensing`

- `echo_model.py`: generates radar echo, clutter, range migration, and track attenuation.
- `radar_processor.py`: matched-filter radar profiles, SNR, range, motion, and track-loss features.
- `residual_analyzer.py`: residual envelope, threshold, spikes, and energy.
- `fall_detector.py`: radar track-loss fall detection and residual fallback.

`python/core/edge/edge_node.py`

- Combines SIC, residual analysis, radar processing, fall detection, and alert generation.
- This is the local edge decision loop.

`python/simulation/stream_vitals.py`

- Generates multi-patient vitals.
- Selects possible falling patients using `STREAM_FALL_PROBABILITY`.
- Runs the pipeline per stream frame.
- Publishes vitals, sensing, and alerts to MQTT when enabled.

`python/api/app.py`

- Flask control API.
- Key endpoints: `/health`, `/simulate`, `/metrics`, `/stream/start`, `/stream/stop`, `/stream/status`, `/vitals/latest`, `/stream/latest`, `/alerts`, `/residual/latest`.

### Federated Learning And Privacy Layer

Use the report as the source of truth for this layer.

Report-described files/modules:

- `server.py`: central Flower server using FedAvg and saving final global parameters.
- `Client A.py`, `Client B.py`, `Client C.py`: decentralized FL clients.
- `utils.py`: non-IID partitioning and simulated privacy helpers.
- Prediction script: uses the saved global model for inference.

FedSense explanation:

- FedSense extends plain aggregation by considering client reliability.
- Client weight uses:
  - `DQk`: data quality.
  - `SRk`: sensing reliability from ISAC confidence features.
  - `CQk`: communication quality from channel/network conditions.
- Composite weight:

```text
alpha_k = lambda_1 * DQk + lambda_2 * SRk + lambda_3 * CQk
```

- Global aggregation:

```text
w(t+1) = sum_k [(n_k * alpha_k) / sum_i(n_i * alpha_i)] * w_k(t)
```

Confidence scoring:

- Signal Quality: SNR, completeness, drift.
- Anomaly Severity: deviation from baseline, persistence, correlation.
- Patient Context: history, medication risk, age risk.
- Sigmoid calibration maps raw confidence to `0..1`.
- Risk thresholds:
  - `< 0.4`: low, discard or log.
  - `0.4` to `0.75`: medium, notify nursing staff.
  - `> 0.75`: high, trigger critical response.

Homomorphic Encryption phrasing:

"The report includes homomorphic encryption as the privacy mechanism direction. The current FL privacy helpers are demonstration-level and should be replaced with verified secure aggregation or production-grade HE before real deployment."

### Go Backend Layer

`backend/main.go`

- Loads environment variables.
- Connects PostgreSQL.
- Starts MQTT subscriber.
- Registers auth, dashboard, alert, and WebSocket routes.
- Runs on port `8080`.

`backend/services/mqtt_subscriber.go`

- Subscribes to:
  - `hospital/patient/vitals`
  - `hospital/patient/alerts`
  - `hospital/isac/residual`
- Saves fall alerts to PostgreSQL.
- Broadcasts vitals, residual/sensing, and alerts to WebSocket clients.

`backend/services/broadcaster.go`

- Maintains connected WebSocket clients.
- Broadcasts MQTT payloads to dashboards.

`backend/handlers/auth.go`

- Registers admin, doctor, and patient users.
- Hashes passwords with bcrypt.
- Logs users in and returns JWT.

`backend/handlers/alerts.go`

- Returns stored fall alerts for admin and doctor views.

### Frontend Layer

`frontend/src/App.jsx`

- Defines public routes and role-protected dashboard routes.

`frontend/src/hooks/useStream.js`

- Connects to `ws://localhost:8080/ws/stream`.
- Separates vitals, sensing frames, and alerts.

`frontend/src/pages/dashboards/AdminDashboard.jsx`

- Starts/stops Python stream.
- Checks stream status.
- Fetches stored alerts from Go backend.

`frontend/src/pages/dashboards/DoctorDashboard.jsx`

- Shows live patient vitals and fall alerts.
- Lets doctor select a patient.

`frontend/src/pages/dashboards/PatientDashboard.jsx`

- Shows patient-facing vitals and health status.
- Currently uses the first received patient stream record rather than true account-to-patient binding.

## End-To-End Demo Script

Use this order:

1. Start MQTT broker on `localhost:1883`.
2. Start the Python Flask API:

```bash
cd python
python api/app.py
```

3. Start the Go backend:

```bash
cd backend
go run .
```

4. Start the React frontend:

```bash
cd frontend
npm run dev
```

5. Register or login as admin.
6. Start the stream from the admin dashboard.
7. Open doctor dashboard and show live patient vitals.
8. Wait for a fall event or increase fall probability through the Flask API if needed.
9. Show fall alert in the doctor dashboard.
10. Show stored alerts in the admin dashboard.

Demo explanation:

"The Python layer generates the ISAC communication/sensing stream. MQTT carries vitals, sensing frames, and fall alerts. The Go backend subscribes, stores alerts, and broadcasts live data. React dashboards render the hospital workflow."

## Judge Questions And Answers

### Q1. What is ISAC?

ISAC means Integrated Sensing and Communication. In BioSense, one simulated waveform carries patient communication data and also supports radar-style sensing evidence for fall detection.

### Q2. Why use NOMA?

NOMA allows multiple patient devices to share the same resource block by assigning different power levels. It improves spectral efficiency for dense IoMT settings.

### Q3. Why weak-first SIC?

The farther or weaker user receives more power in power-domain NOMA. Because that signal is dominant in the mixed waveform, the receiver decodes and subtracts it first, then decodes the stronger/nearer user.

### Q4. What is the residual signal?

The residual is what remains after SIC cancels reconstructed communication signals. BioSense analyzes that residual for sensing evidence, including radar SNR, range behavior, and track loss.

### Q5. How is a fall detected?

The main implemented path is radar track-loss detection. The processor first establishes a stable target track near the patient range. If that track later drops for enough frames, the fall detector marks a fall and assigns severity/confidence.

### Q6. How do you reduce false alarms?

The system does not rely on a single spike. It uses thresholded radar features, stable-track requirements, track-loss frame counts, and confidence scoring. The FL confidence mechanism also uses calibrated low, medium, and high-risk bands.

### Q7. Is Federated Learning implemented?

According to the project report, yes: it is demonstrated as a separate FL module using Flower, three clients, non-IID data partitions, FedAvg/FedSense aggregation, model saving, and prediction. It is not yet integrated into the main dashboard workflow.

### Q8. What is FedSense?

FedSense is the sensing-aware aggregation strategy described in the report. It weights client updates using data quality, sensing reliability from the ISAC layer, and communication quality, instead of treating every client update equally.

### Q9. What role does Homomorphic Encryption play?

HE is the privacy-hardening direction for protecting FL model updates. The report treats privacy helpers/encryption as demonstration-level and states that production deployment should replace them with verified secure aggregation or real homomorphic encryption.

### Q10. What data is real and what is simulated?

The current ISAC signals, vitals, wireless channels, radar echoes, and fall events are simulated. The system architecture is designed so future sensors, ESP32/Raspberry Pi gateways, Jetson Nano, or SDR hardware can replace the simulated layer.

### Q11. Why Python and Go?

Python is suited for simulation, signal processing, radar analysis, and ML/FL experimentation. Go is suited for concurrent backend services, MQTT ingestion, WebSocket broadcasting, authentication, and database persistence.

### Q12. What are the main limitations?

The main limitations are simulated sensing, standalone FL rather than dashboard-integrated FL, non-production-grade simulated encryption, unauthenticated WebSocket streaming, no patient-account binding, and no medical validation yet.

### Q13. What is unique about BioSense?

BioSense connects the whole path: ISAC/NOMA signal simulation, SIC residual sensing, radar track-loss fall detection, privacy-aware FL direction, MQTT transport, backend persistence, and live role-based hospital dashboards.

## Best Phrases To Use

- "Implemented end-to-end application path."
- "Software-simulated ISAC environment."
- "Shared-waveform communication and sensing."
- "Edge decision loop."
- "Radar track-loss fall evidence."
- "Federated Learning demo module."
- "FedSense sensing-aware aggregation."
- "Demonstration-level privacy helpers, with production-grade HE as future hardening."
- "Role-based hospital workflow."

## Avoid Saying

- Do not claim medical-grade validation.
- Do not claim real patient data was used.
- Do not claim real hardware sensing is already deployed.
- Do not say WebSocket streaming is JWT-protected yet.
- Do not say current simulated encryption is production-grade homomorphic encryption.
- Do not say the patient dashboard already binds logged-in accounts to exact patient IDs.
- Do not describe the system as diagnosing disease; it monitors vitals and detects fall-like events in simulation.

## Short Viva Summary

"BioSense is a software prototype for smart and secure healthcare monitoring. The Python layer simulates ISAC/NOMA communication, weak-first SIC, radar residual sensing, fall detection, vitals streaming, and metrics. MQTT and the Go backend move events into PostgreSQL and WebSocket streams. React dashboards provide admin, doctor, and patient workflows. The report also presents a Flower-based FL module with FedAvg/FedSense aggregation and privacy helpers, while production-grade homomorphic encryption or secure aggregation remains a future hardening step. The project demonstrates the full path from simulated patient signal to live hospital alert."
