#ifndef GPSSENSOR_H
#define GPSSENSOR_H

#include <Arduino.h>
#include <TinyGPSPlus.h>

class GpsSensor {
private:
    TinyGPSPlus gps;
    HardwareSerial &gpsSerial;

public:
    GpsSensor(HardwareSerial &serialPort) : gpsSerial(serialPort) {}

    void begin(unsigned long baudRate = 9600) {
        gpsSerial.begin(baudRate, SERIAL_8N1, 16, 17); // RX: 16, TX: 17
    }

    void update() {
        while (gpsSerial.available() > 0) {
            gps.encode(gpsSerial.read());
        }
    }

    bool isLocationValid() {
        return gps.location.isValid();
    }

    double getLatitude() {
        return gps.location.lat();
    }

    double getLongitude() {
        return gps.location.lng();
    }
};

#endif