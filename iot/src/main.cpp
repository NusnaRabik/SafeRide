#include <Arduino.h>
#include <Wire.h>
#include "Gyroscopesensor.h" // Include the MPU6050 gyroscope class

// Instantiate MotionDetector object with a vibration threshold of 2.5
MotionDetector bikeSensor(2.5);

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
   
}