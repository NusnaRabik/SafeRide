#include "GpsSensor.h"
#include "Gyroscopesensor.h"
#include "Touchsensor.h"
#include <Arduino.h>
#include <FirebaseESP32.h>
#include <WiFi.h>
#include <Wire.h>


// Wi-Fi Network Credentials
#define WIFI_SSID "Dialog 4G 815"
#define WIFI_PASSWORD "bd7cAe60"

// Firebase Database Credentials
#define FIREBASE_HOST "https://saferide-60b37-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "AIzaSyDm-YYjzWncOF2W3UT5D21x8OLngY7bEQY"

// Instantiate Objects
MotionDetector bikeSensor(1.0); // MPU6050 vibration threshold
TouchDetector leftTouch(4);     // Left Handle Touch Sensor on GPIO 4
TouchDetector rightTouch(5);    // Right Handle Touch Sensor on GPIO 5
GpsSensor
    gpsTracker(Serial2); // GPS Module connected to Serial2 (RX: 16, TX: 17)

// Firebase Data Object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // Connect to Wi-Fi network
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi Connected successfully!");

  // Setup Firebase configuration
  config.database_url = String(FIREBASE_HOST);
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  // Initialize Firebase with config and auth pointers
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Give a small delay for handshake
  delay(2000);

  // Initialize GPS communication
  gpsTracker.begin(9600);

  // Initialize MPU6050 gyroscope sensor
  if (!bikeSensor.initSensor()) {
    Serial.println("Error: MPU6050 Sensor not found! Check wiring.");
    while (1) {
      delay(10);
    }
  }

  Serial.println(
      "System Initialized Successfully! MPU6050, Touch & GY-GPS6MV2 Ready.");
}

void loop() {
  // Continuously update GPS data in the background
  gpsTracker.update();

  // 1. Read both touch sensors state
  bool leftTouched = leftTouch.isTouched();
  bool rightTouched = rightTouch.isTouched();

  // 2. Read vibration sensor state
  bool vibrationDetected = bikeSensor.isVibrationDetected();

  // 3. Accident Condition:
  // Both touch sensors are NOT touched (!leftTouched && !rightTouched)
  // AND sudden vibration/impact is detected.
  if (!leftTouched && !rightTouched && vibrationDetected) {
    Serial.println("----------------------------------------");
    Serial.println(
        "ACCIDENT DETECTED! Rider hands are off handles and impact occurred!");

    // Check if GPS has a valid lock and print coordinates
    if (gpsTracker.isLocationValid()) {
      float lat = gpsTracker.getLatitude();
      float lng = gpsTracker.getLongitude();

      Serial.print("Emergency Location Lat: ");
      Serial.println(lat, 6);
      Serial.print("Emergency Location Lng: ");
      Serial.println(lng, 6);

      // Send emergency accident data to Firebase Realtime Database
      if (Firebase.ready()) {
        Firebase.setFloat(fbdo, "/SafeRide/AccidentAlert/Latitude", lat);
        Firebase.setFloat(fbdo, "/SafeRide/AccidentAlert/Longitude", lng);
        Firebase.setString(fbdo, "/SafeRide/AccidentAlert/Status",
                           "ACCIDENT DETECTED");
        Serial.println("Data successfully sent to Firebase Cloud!");
      } else {
        Serial.print("Error: Firebase not ready! Reason: ");
        Serial.println(fbdo.errorReason());
      }
    } else {
      Serial.println(
          "Warning: GPS Location fix not acquired yet (No satellite lock).");
    }
    Serial.println("----------------------------------------");
  } else {
    Serial.println("Status: Normal riding conditions");
  }

  // Delay between loop iterations
  delay(1000);
}