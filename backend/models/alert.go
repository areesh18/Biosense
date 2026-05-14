package models

import "time"

type Alert struct {
	ID         uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	PatientID  string    `gorm:"not null" json:"patient_id"`
	Severity   string    `gorm:"not null" json:"severity"`
	Confidence float64   `gorm:"not null" json:"confidence"`
	Timestamp  time.Time `gorm:"not null" json:"timestamp"`
	CreatedAt  time.Time `json:"created_at"`
}