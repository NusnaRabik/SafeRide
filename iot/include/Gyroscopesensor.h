#ifndef GYROSCOPESENSOR_H
#define GYROSCOPESENSOR_H

#include <Arduino.h>
#include <Wire.h>
#include <MPU6050.h>

class MotionDetector {
private:
    MPU6050 mpu;
    float threshold;

public:
    // Constructor to set the vibration threshold
    MotionDetector(float thresh) {
        threshold = thresh;
    }

    // Initialize the MPU6050 sensor
    bool initSensor() {
        mpu.initialize();
        return mpu.testConnection();
    }

    // Check if sudden vibration or impact is detected
    bool isVibrationDetected() {
        int16_t ax, ay, az;
        mpu.getAcceleration(&ax, &ay, &az);
        
        // Simple threshold check based on accelerometer values
        float totalAccel = sqrt(pow(ax, 2) + pow(ay, 2) + pow(az, 2)) / 16384.0;
        
        if (totalAccel > threshold) {
            return true;
        }
        return false;
    }
};

#endif