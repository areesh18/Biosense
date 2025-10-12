package main

import (
	"biosense/db"
	"biosense/handlers"
	"biosense/utils"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file, using default/environment variables")
	}
	db.ConnectDB()

	router := mux.NewRouter()

	// Public routes
	router.HandleFunc("/register/admin", handlers.RegisterHandler("admin")).Methods("POST")
	router.HandleFunc("/register/doctor", handlers.RegisterHandler("doctor")).Methods("POST")
	router.HandleFunc("/register/patient", handlers.RegisterHandler("patient")).Methods("POST")
	router.HandleFunc("/login", handlers.LoginHandler).Methods("POST")

	// Protected routes
	adminRouter := router.PathPrefix("/admin").Subrouter()
	adminRouter.Use(utils.AuthMiddleware, utils.RoleMiddleware("admin"))
	adminRouter.HandleFunc("/dashboard", handlers.ProtectedEndpoint("admin")).Methods("GET")

	doctorRouter := router.PathPrefix("/doctor").Subrouter()
	doctorRouter.Use(utils.AuthMiddleware, utils.RoleMiddleware("doctor"))
	doctorRouter.HandleFunc("/dashboard", handlers.ProtectedEndpoint("doctor")).Methods("GET")

	patientRouter := router.PathPrefix("/patient").Subrouter()
	patientRouter.Use(utils.AuthMiddleware, utils.RoleMiddleware("patient"))
	patientRouter.HandleFunc("/dashboard", handlers.ProtectedEndpoint("patient")).Methods("GET")

	fmt.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}

