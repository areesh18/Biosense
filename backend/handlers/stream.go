package handlers

import (
	"biosense/services"
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func StreamHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("WebSocket upgrade failed:", err)
		return
	}

	services.GlobalHub.Register(conn)
	defer services.GlobalHub.Unregister(conn)

	// keep connection alive, wait for client to disconnect
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			break
		}
	}
}
