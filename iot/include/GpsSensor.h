#ifndef GPSSENSOR_H
#define GPSSENSOR_H

#include <Arduino.h>
#include <TinyGPSPlus.h>

class GpsSensor {
private:
    TinyGPSPlus gps;
    HardwareSerial &gpsSerial;

public:
    // Constructor to set serial port (e.g., Serial2 on ESP32)
    GpsSensor(HardwareSerial &serialPort) : gpsSerial(serialPort) {}

    // Initialize GPS serial communication (Default pins: RX=16, TX=17 on ESP32)
    void begin(unsigned long baudRate = 9600) {
        gpsSerial.begin(baudRate, SERIAL_8N1, 16, 17);
    }

    // Continuously read GPS data from serial
    void update() {
        while (gpsSerial.available() > 0) {
            gps.encode(gpsSerial.read());
        }
    }