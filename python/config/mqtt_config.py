import os
BROKER = os.getenv("MQTT_BROKER", "localhost")
PORT = int(os.getenv("MQTT_PORT", 1883))
TOPIC_FALLS = "hospital/patient/falls"
TOPIC_ALERTS = "hospital/patient/alerts"
TOPIC_RESIDUAL = "hospital/isac/residual"
TOPIC_VITALS = "hospital/patient/vitals"
