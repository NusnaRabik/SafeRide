#include <Arduino.h>
#include <Wire.h>
#include "Gyroscopesensor.h"
#include "Touchsensor.h"
#include "GpsSensor.h"

// Instantiate Objects
MotionDetector bikeSensor(1.0);      // MPU6050 vibration threshold
TouchDetector leftTouch(4);         // Left Handle Touch Sensor on GPIO 4
TouchDetector rightTouch(5);        // Right Handle Touch Sensor on GPIO 5
GpsSensor gpsTracker(Serial2);      // GPS Module connected to Serial2 (RX: 16, TX: 17)

void setup() {
    Serial.begin(115200);
    Wire.begin();
    
    // Initialize GPS communication
    gpsTracker.begin(9600);

    // Initialize MPU6050 gyroscope sensor
    if (!bikeSensor.initSensor()) {
        Serial.println("Error: MPU6050 Sensor not found! Check wiring.");
        while (1) {
            delay(10);
        }
    }

    Serial.println("System Initialized Successfully! MPU6050, Touch & GY-GPS6MV2 Ready.");
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
        Serial.println("ACCIDENT DETECTED! Rider hands are off handles and impact occurred!");

        // Check if GPS has a valid lock and print coordinates
        if (gpsTracker.isLocationValid()) {
            Serial.print("Emergency Location Lat: ");
            Serial.println(gpsTracker.getLatitude(), 6);
            Serial.print("Emergency Location Lng: ");
            Serial.println(gpsTracker.getLongitude(), 6);
        } else {
            Serial.println("Warning: GPS Location fix not acquired yet (No satellite lock).");
        }
        Serial.println("----------------------------------------");
    } else {
        Serial.println("Status: Normal riding conditions");
    }

    // Delay between loop iterations
    delay(1000);
}