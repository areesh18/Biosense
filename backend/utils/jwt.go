package utils

import (
	"biosense/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// HashPassword generates a bcrypt hash of the password.
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// GenerateJWT creates a new JWT for a given user.
func GenerateJWT(user *models.User) (string, error) {
	jwtKey := []byte(os.Getenv("JWT_SECRET"))
	// Token expires in 24 hours
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &models.Claims{
		UserID: user.ID,
		Email:  user.Email,
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}
