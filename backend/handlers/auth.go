package handlers

import (
	"biosense/db"
	"biosense/models"
	"biosense/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

// respondWithError sends a JSON error message.
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

// respondWithJSON sends a JSON response.
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

// RegisterHandler creates a new user with a specific role.
func RegisterHandler(role string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var creds models.Credentials
		if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid request payload")
			return
		}

		hashedPassword, err := utils.HashPassword(creds.Password)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Could not hash password")
			return
		}

		user := models.User{
			Email:    creds.Email,
			Password: hashedPassword,
			Role:     role,
		}

		if result := db.DB.Create(&user); result.Error != nil {
			respondWithError(w, http.StatusInternalServerError, "Could not create user: "+result.Error.Error())
			return
		}

		respondWithJSON(w, http.StatusCreated, map[string]string{"message": fmt.Sprintf("%s registered successfully", role)})
	}
}

// LoginHandler authenticates a user and returns a JWT.
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds models.Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	var user models.User
	if result := db.DB.Where("email = ?", creds.Email).First(&user); result.Error != nil {
		respondWithError(w, http.StatusUnauthorized, "Invalid email or password")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		respondWithError(w, http.StatusUnauthorized, "Invalid email or password")
		return
	}

	tokenString, err := utils.GenerateJWT(&user)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not generate token")
		return
	}

	respondWithJSON(w, http.StatusOK, map[string]string{"token": tokenString})
}

