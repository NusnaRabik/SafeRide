#include <Arduino.h>
#include "Gyroscopesensor.h" // Include the MPU6050 gyroscope class

// Instantiate MotionDetector object with a vibration threshold of 2.5
MotionDetector bikeSensor(2.5);

void setup() {
    // Initialize serial communication for debugging
    Serial.begin(115200);
}

void loop() {
    // Empty loop for now
    delay(1000);
}