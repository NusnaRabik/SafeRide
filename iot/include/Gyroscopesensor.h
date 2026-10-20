#ifndef GYROSCOPESENSOR_H
#define GYROSCOPESENSOR_H

#include <Arduino.h>
#include <Wire.h>
#include <MPU6050.h>

class MotionDetector {
private:
    MPU6050 mpu;
    float threshold;

#endif