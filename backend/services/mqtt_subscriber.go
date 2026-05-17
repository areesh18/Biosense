package services

import (
	"biosense/db"
	"biosense/models"
	"encoding/json"
	"fmt"
	"log"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type VitalSign struct {
	PatientID           string  `json:"patient_id"`
	Timestamp           string  `json:"timestamp"`
	DistanceM           float64 `json:"distance_m"`
	HeartRateBPM        int     `json:"heart_rate_bpm"`
	Spo2Percent         int     `json:"spo2_percent"`
	TemperatureC        float64 `json:"temperature_c"`
	RespirationRateBPM  int     `json:"respiration_rate_bpm"`
}

type SensingData struct {
	FallDetected               bool    `json:"fall_detected"`
	Severity                   string  `json:"severity"`
	Confidence                 float64 `json:"confidence"`
	Basis                      string  `json:"basis"`
	SpikeCount                 int     `json:"spike_count"`
	Peak                       float64 `json:"peak"`
	RadarEventFrames           int     `json:"radar_event_frames"`
	RadarMaxSnrDb              float64 `json:"radar_max_snr_db"`
	RadarRangeMigrationM       float64 `json:"radar_range_migration_m"`
	RadarEstimatedVelocityMps  float64 `json:"radar_estimated_velocity_mps"`
	RadarTrackStable           bool    `json:"radar_track_stable"`
	RadarTrackLost             bool    `json:"radar_track_lost"`
	RadarTrackRangeM           float64 `json:"radar_track_range_m"`
	RadarTrackLossFrames       int     `json:"radar_track_loss_frames"`
}

type StreamFrame struct {
	FrameID         int           `json:"frame_id"`
	PatientCount    int           `json:"patient_count"`
	Vitals          []VitalSign   `json:"vitals"`
	Sensing         SensingData   `json:"sensing"`
	Alerts          []AlertPayload `json:"alerts"`
	FallProbability float64       `json:"fall_probability"`
}
type AlertPayload struct {
	PatientID       string  `json:"patient_id"`
	Alert           string  `json:"alert"`
	Severity        string  `json:"severity"`
	Confidence      float64 `json:"confidence"`
	Timestamp       string  `json:"timestamp"`
	FallProbability float64 `json:"fall_probability"`
	Reason          string  `json:"reason"`
}

func handleVitals(client mqtt.Client, msg mqtt.Message) {
	// broadcast raw vitals JSON directly to WebSocket clients
	GlobalHub.Broadcast(msg.Payload())
}

func handleAlert(client mqtt.Client, msg mqtt.Message) {
	var payload AlertPayload
	if err := json.Unmarshal(msg.Payload(), &payload); err != nil {
		log.Println("Failed to parse alert:", err)
		return
	}

	// parse timestamp
	t, err := time.Parse(time.RFC3339, payload.Timestamp)
	if err != nil {
		t = time.Now()
	}

	// save to DB
	alert := models.Alert{
		PatientID:  payload.PatientID,
		Severity:   payload.Severity,
		Confidence: payload.Confidence,
		Timestamp:  t,
	}

	if result := db.DB.Create(&alert); result.Error != nil {
		log.Println("Failed to save alert:", result.Error)
	} else {
		fmt.Println("Alert saved for:", payload.PatientID)
	}

	// also broadcast to WebSocket
	GlobalHub.Broadcast(msg.Payload())
}

func handleResidual(client mqtt.Client, msg mqtt.Message) {
	// broadcast residual/sensing data to WebSocket
	GlobalHub.Broadcast(msg.Payload())
}

func StartMQTTSubscriber(broker string, port int) {
	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("tcp://%s:%d", broker, port))
	opts.SetClientID("biosense-go-subscriber")
	opts.SetAutoReconnect(true)
	opts.SetOnConnectHandler(func(client mqtt.Client) {
		fmt.Println("MQTT connected")

		client.Subscribe("hospital/patient/vitals", 1, handleVitals)
		client.Subscribe("hospital/patient/alerts", 1, handleAlert)
		client.Subscribe("hospital/isac/residual", 1, handleResidual)

		fmt.Println("Subscribed to all topics")
	})

	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatal("MQTT connection failed:", token.Error())
	}
}