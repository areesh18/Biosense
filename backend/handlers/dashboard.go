package handlers

import (
	"biosense/models"
	"fmt"
	"net/http"
)

// ProtectedEndpoint is a generic handler for role-specific dashboards.
func ProtectedEndpoint(role string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		claims, ok := r.Context().Value("userClaims").(*models.Claims)
		if !ok {
			respondWithError(w, http.StatusInternalServerError, "Could not retrieve user claims")
			return
		}
		message := fmt.Sprintf("Welcome %s! You have access to the %s dashboard.", claims.Email, role)
		respondWithJSON(w, http.StatusOK, map[string]string{"message": message})
	}
}

