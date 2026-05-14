package main

import (
	"biosense/db"
	"biosense/handlers"
	"biosense/services"
	"biosense/utils"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file, using default/environment variables")
	}

	db.ConnectDB()

	// start MQTT subscriber
	mqttBroker := os.Getenv("MQTT_BROKER")
	if mqttBroker == "" {
		mqttBroker = "localhost"
	}
	services.StartMQTTSubscriber(mqttBroker, 1883)

	router := mux.NewRouter()

	// public routes
	router.HandleFunc("/register/admin", handlers.RegisterHandler("admin")).Methods("POST")
	router.HandleFunc("/register/doctor", handlers.RegisterHandler("doctor")).Methods("POST")
	router.HandleFunc("/register/patient", handlers.RegisterHandler("patient")).Methods("POST")
	router.HandleFunc("/login", handlers.LoginHandler).Methods("POST")

	// WebSocket route (no JWT for now, easy to add later)
	router.HandleFunc("/ws/stream", handlers.StreamHandler)

	// protected routes
	adminRouter := router.PathPrefix("/admin").Subrouter()
	adminRouter.Use(utils.AuthMiddleware, utils.RoleMiddleware("admin"))
	adminRouter.HandleFunc("/dashboard", handlers.ProtectedEndpoint("admin")).Methods("GET")
	adminRouter.HandleFunc("/alerts", handlers.GetAlertsHandler).Methods("GET")

	doctorRouter := router.PathPrefix("/doctor").Subrouter()
	doctorRouter.Use(utils.AuthMiddleware, utils.RoleMiddleware("doctor"))
	doctorRouter.HandleFunc("/dashboard", handlers.ProtectedEndpoint("doctor")).Methods("GET")
	doctorRouter.HandleFunc("/alerts", handlers.GetAlertsHandler).Methods("GET")

	patientRouter := router.PathPrefix("/patient").Subrouter()
	patientRouter.Use(utils.AuthMiddleware, utils.RoleMiddleware("patient"))
	patientRouter.HandleFunc("/dashboard", handlers.ProtectedEndpoint("patient")).Methods("GET")

	handlerWithCORS := utils.CORSMiddleware(router)
	fmt.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", handlerWithCORS); err != nil {
		log.Fatalf("could not start server: %v\n", err)
	}
}