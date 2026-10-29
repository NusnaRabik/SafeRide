#include <Arduino.h>
#include <Wire.h>
#include "Gyroscopesensor.h"
#include "Touchsensor.h"

// Instantiate Objects
MotionDetector bikeSensor(2.5);      // MPU6050 vibration threshold
TouchDetector leftTouch(4);         // Left Handle Touch Sensor on GPIO 4
TouchDetector rightTouch(5);        // Right Handle Touch Sensor on GPIO 5

void setup() {
    Serial.begin(115200);
    Wire.begin();

    // Initialize MPU6050 gyroscope sensor
    if (!bikeSensor.initSensor()) {
        Serial.println("Error: MPU6050 Sensor not found! Check wiring.");
        while (1) {
            delay(10);
        }
    }

    Serial.println("System Initialized Successfully! Ready for Monitoring.");
}

void loop() {
    // 1. Read touch sensors state (true if touched, false if not touched)
    bool leftTouched = leftTouch.isTouched();
    bool rightTouched = rightTouch.isTouched();

    // 2. Read vibration sensor state
    bool vibrationDetected = bikeSensor.isVibrationDetected();

    // 3. Accident Condition: 
    // Both touch sensors are NOT touched (!leftTouched && !rightTouched) 
    // AND sudden vibration/impact is detected.
    if (!leftTouched && !rightTouched && vibrationDetected) {
        Serial.println("ACCIDENT DETECTED! Rider hands are off handles and impact occurred!");
    } else {
        Serial.println("Status: Normal riding conditions");
    }

    // Small delay between readings
    delay(500);
}