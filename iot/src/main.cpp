#include <Arduino.h>
#include <Wire.h>
#include "Gyroscopesensor.h" 
#include "Touchsensor.h"
// Instantiate MotionDetector object with a vibration threshold of 2.5
MotionDetector bikeSensor(1.0);
// Touch sensor connected to GPIO 4
TouchDetector handleTouch(4);

void setup() {
    // Initialize serial communication for debugging
    Serial.begin(115200);

    // Initialize I2C communication for the MPU6050 sensor (SDA, SCL)
    Wire.begin();

    // Initialize the gyroscope sensor and verify its physical connection
    if (!bikeSensor.initSensor()) {
        Serial.println("Error: MPU6050 Sensor not found! Check wiring.");
        while (1) {
            delay(10); // Halt program execution if sensor initialization fails
        }
    }
}

void loop() {
    // Check if sudden vibration or impact is detected by the sensor
    if (bikeSensor.isVibrationDetected()) {
        Serial.println("ALERT: Sudden vibration or impact detected!");
    } else {
        Serial.println("Status: Normal riding conditions");
    }
    // Empty loop for now
    delay(1000);

    // 1. Check if rider is touching the handlebar
    bool riderTouching = handleTouch.isTouched();

    if (riderTouching) {
        Serial.println("Status: Rider holding the handle.");
    } else {
        Serial.println("WARNING: Handle not touched!");
    }

    // 2. Check if sudden vibration or impact is detected by the MPU6050
    if (bikeSensor.isVibrationDetected()) {
        Serial.println("ALERT: Sudden vibration or impact detected!");
    }

    delay(1000);
   
}