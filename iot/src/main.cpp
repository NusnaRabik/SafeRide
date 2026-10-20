#include <Arduino.h>

void setup() {
    // Initialize Serial Monitor to communicate with the computer
    Serial.begin(115200);
    delay(1000); // Give some time for the serial monitor to open

    Serial.println("----------------------------------------");
    Serial.println("ESP32 Base System Started Successfully!");
    Serial.println("System status: No sensors connected yet.");
    Serial.println("----------------------------------------");
}

void loop() {
    // Basic heartbeat message to verify the core system is running
    Serial.println("Core system is running smoothly...");
    
    // Wait for 1 second
    delay(1000);
}