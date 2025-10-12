package utils

import (
	"biosense/models"
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware verifies the JWT from the Authorization header.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing authorization header", http.StatusUnauthorized)
			return
		}

		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) != 2 || strings.ToLower(bearerToken[0]) != "bearer" {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		}

		tokenStr := bearerToken[1]
		claims := &models.Claims{}
		jwtKey := []byte(os.Getenv("JWT_SECRET"))

		token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				http.Error(w, "Invalid token signature", http.StatusUnauthorized)
				return
			}
			http.Error(w, "Invalid token", http.StatusBadRequest)
			return
		}

		if !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Add claims to the request context
		ctx := context.WithValue(r.Context(), "userClaims", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// RoleMiddleware checks if the user has the required role.
func RoleMiddleware(requiredRole string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			claims, ok := r.Context().Value("userClaims").(*models.Claims)
			if !ok {
				http.Error(w, "Could not retrieve user claims", http.StatusInternalServerError)
				return
			}

			// Admin has access to everything
			if claims.Role == "admin" {
				next.ServeHTTP(w, r)
				return
			}

			if claims.Role != requiredRole {
				http.Error(w, "Forbidden: Insufficient permissions", http.StatusForbidden)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
