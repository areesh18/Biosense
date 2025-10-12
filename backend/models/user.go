package models

import (
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

// User represents a user in the system with a specific role.
type User struct {
	gorm.Model
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	Role     string `gorm:"not null"` // "admin", "doctor", "patient"
}

// Credentials is used for parsing login requests.
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Claims represents the JWT claims.
type Claims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

