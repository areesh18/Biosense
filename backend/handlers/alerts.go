package handlers

import (
	"biosense/db"
	"biosense/models"
	"net/http"
)

func GetAlertsHandler(w http.ResponseWriter, r *http.Request) {
	var alerts []models.Alert

	result := db.DB.Order("created_at desc").Find(&alerts)
	if result.Error != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to fetch alerts")
		return
	}

	respondWithJSON(w, http.StatusOK, map[string]interface{}{
		"alerts": alerts,
		"count":  len(alerts),
	})
}
