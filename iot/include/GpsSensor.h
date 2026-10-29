#ifndef GPSSENSOR_H
#define GPSSENSOR_H

#include <Arduino.h>
#include <TinyGPSPlus.h>

class GpsSensor {
private:
    TinyGPSPlus gps;
    HardwareSerial &gpsSerial;