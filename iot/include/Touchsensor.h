#ifndef TOUCHSENSOR_H
#define TOUCHSENSOR_H

#include <Arduino.h>

class TouchDetector {
private:
    int touchPin;

public:
    // Constructor to set the touch sensor pin
    TouchDetector(int pin) {
        touchPin = pin;
        pinMode(touchPin, INPUT);
    }

    // Check if the handlebar is touched
    bool isTouched() {
        if (digitalRead(touchPin) == HIGH) {
            return true;
        }
        return false;
    }
};

#endif