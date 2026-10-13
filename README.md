# SafeRide – Smart Motorcycle Accident Detection and Emergency Response Platform

SafeRide is an IoT-enabled motorcycle safety platform designed to detect potential motorcycle accidents using multiple sensor measurements and support emergency response through a mobile application, backend system, and emergency notifications.

The system combines a smart helmet and handlebar sensor unit with an Android mobile application to monitor riding conditions, identify possible accidents, allow rider verification, and notify registered emergency contacts when necessary.

> **Project status:** Under development  
> **Project type:** University Mini Project  
> **Module:** SE5104 – Mini Project  
> **Group:** 09  
> **Institution:** Department of Software Engineering, Faculty of Computing, Sabaragamuwa University of Sri Lanka

## Project Overview

Motorcycle riders can be particularly vulnerable during accidents, especially when travelling alone or unable to request assistance. SafeRide aims to address this problem by combining IoT-based sensing, embedded accident detection, mobile application functionality, and emergency communication.

Rather than relying on a single sensor, SafeRide uses a rule-based, multi-sensor approach to estimate the likelihood of an accident. When a potential accident is detected, the system provides a warning and an opportunity for the rider to confirm that they are safe. If the rider does not respond, the system is designed to escalate the incident and notify registered emergency contacts with the available location information.

## Key Features

- **User Authentication:** Rider registration, login, and profile management.
- **Smart Helmet Pairing:** Connect the helmet unit to the mobile application using Bluetooth Low Energy (BLE).
- **Sensor Calibration:** Establish orientation references and left/right grip-contact baselines.
- **Pre-Ride Safety Check:** Check helmet connectivity, sensor responsiveness, GPS availability, and emergency-contact configuration.
- **Accident Detection:** Combine motion, orientation, grip-contact, GPS speed, and post-impact movement information.
- **Accident Warning and Verification:** Give riders an opportunity to confirm that they are safe before an alert is escalated.
- **Manual SOS:** Allow riders to trigger an emergency alert manually.
- **Emergency Contact Management:** Add, edit, remove, and prioritize emergency contacts.
- **Emergency Notifications:** Notify registered contacts of confirmed incidents with available location information.
- **Ride and Incident History:** Review recorded rides, incidents, and relevant sensor evidence.

*These are planned system capabilities; individual features are subject to implementation and testing.*

## System Architecture

SafeRide consists of three main components:

### 1. Mobile Application

The mobile application is being designed for Android using React Native.

Responsibilities include:

- Rider authentication and profile management
- Helmet pairing and sensor calibration
- Pre-ride checks and active-ride monitoring
- Accident warnings and rider verification
- Manual SOS and emergency-contact management
- Ride and incident history

### 2. Backend System

The backend is planned using Node.js and Express.js, with a relational database such as MySQL or PostgreSQL.

Responsibilities include:

- REST API development
- Authentication and authorization
- User and helmet management
- Calibration, ride, and incident records
- Emergency-contact management
- Incident lifecycle management and notification processing

### 3. IoT and Embedded System

The embedded prototype is based on the ESP32-S3 microcontroller.

Planned hardware components include:

- **ESP32-S3:** Main embedded controller
- **ICM-42688-P:** Six-axis accelerometer and gyroscope
- **Force-Sensitive Resistors (FSRs):** Left and right handlebar-grip contact sensing
- **MAX-M10S GNSS module:** Location, speed, and time information
- **Buzzer:** Local warning for potential accidents
- **SOS/Cancel button:** Manual interaction with the safety system

The embedded firmware will process sensor measurements, extract relevant features, and apply a rule-based sensor-fusion algorithm to identify potential accident events.

## Technology Stack

| Component | Technologies |
|---|---|
| Mobile application | React Native |
| Mobile language | JavaScript / TypeScript |
| Bluetooth communication | Bluetooth Low Energy (BLE) |
| Backend | Node.js, Express.js |
| API communication | REST API, HTTPS |
| Authentication | JSON Web Tokens (JWT) |
| Password security | bcrypt |
| Database | MySQL / PostgreSQL |
| Embedded controller | ESP32-S3 |
| Firmware | C / C++ |
| Motion sensor | ICM-42688-P |
| Grip sensors | Force-Sensitive Resistors |
| Location | MAX-M10S GNSS |
| Push notifications | Firebase Cloud Messaging (FCM) |
| Version control | Git and GitHub |
| API testing | Postman |

## Repository Structure

```text
SafeRide/
├── .github/
│   └── workflows/
├── mobile-app/
│   ├── android/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   ├── helmet/
│   │   │   ├── ride/
│   │   │   ├── incidents/
│   │   │   ├── contacts/
│   │   │   └── profile/
│   │   ├── navigation/
│   │   ├── services/
│   │   │   ├── api/
│   │   │   ├── ble/
│   │   │   └── notifications/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── constants/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── migrations/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.js
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── iot/
│   └── firmware/
│       ├── src/
│       │   ├── main.cpp
│       │   ├── imu/
│       │   ├── fsr/
│       │   ├── gps/
│       │   ├── ble/
│       │   ├── accident_detection/
│       │   └── calibration/
│       ├── include/
│       └── platformio.ini
├── .gitignore
└── README.md
```

The directories organize the mobile application, backend services, and embedded firmware into separate modules to support parallel development and integration.

## Accident Detection Workflow

1. The rider logs in, pairs the helmet, completes calibration, and configures emergency contacts.
2. The rider completes the pre-ride safety check and starts a ride.
3. The ESP32-S3 processes measurements from the IMU, grip sensors, and GNSS module.
4. When a suspicious combination of sensor readings is detected, the system raises a potential-accident event.
5. The rider receives a warning and can confirm that they are safe.
6. If the rider does not respond, the incident is escalated according to the configured incident workflow.
7. The backend processes the incident and is designed to notify registered emergency contacts.
8. Ride and incident records can be reviewed through the mobile application.

## Security and Privacy

SafeRide is designed with the following security and privacy considerations:

- JWT-based authentication and authorization
- Password hashing using bcrypt
- HTTPS communication between the mobile application and backend
- Access controls to protect rider-specific records
- Protection of emergency-contact details and location information
- Local processing of sensor measurements where possible
- Appropriate Bluetooth permissions and secure pairing
- Collection of only the information required for the system's functionality

## Testing and Evaluation

The project will be evaluated through unit, integration, system, hardware, performance, and usability testing.

Accident-detection evaluation will use labelled data from normal riding and safe simulated scenarios, such as potholes, hard braking, and controlled helmet-unit drop tests.

Planned evaluation metrics include:

- Precision
- Recall
- F1-score
- False-positive rate
- False-negative rate
- Accident-detection response time
- BLE communication reliability
- Emergency notification delivery

Real motorcycle crashes will not be intentionally created for testing.

## Project Scope and Limitations

The initial release targets Android devices and uses the paired smartphone as the primary communication gateway between the IoT unit and backend.

The following are outside the current minimum viable product (MVP) scope:

- iOS application release
- Independent cellular communication from the IoT unit
- Machine-learning-based accident classification
- A separate administrator web dashboard
- Certification as a commercial motorcycle safety device

Accident detection is an estimate rather than a guarantee. Sensor limitations, GPS availability, connectivity failures, false alarms, and missed events may affect system performance.

SafeRide is a university engineering prototype and is not a replacement for certified safety equipment or established emergency services.

## Development Workflow

GitHub is used for source-code management and team collaboration.

The team follows a module-based development approach:

- `mobile-app/` – Mobile application development
- `backend/` – Backend API and database integration
- `iot/` – Embedded firmware and accident-detection logic

Feature branches, pull requests, code reviews, testing, and integration activities are intended to support maintainable development and clear team contributions.

## Team Members

**Group 09 – Department of Software Engineering**

- **A.W. R. F. Nusna** – Backend and Cloud System
- **K. Kasun Vinod Gunawardhana** – Mobile Application: Incidents, Contacts and Notifications
- **N. G. Irosha Abeyrathna** – IoT Embedded System and Accident Detection
- **I. M. Mohammed Saajith** – Mobile Application: Ride and Safety Core

**Internal Supervisor:** Mr. Y. M. S. Tharaka

**Mentor:** Mr. Dilakshan M., Software Engineer at H2O.ai

## Future Improvements

Potential future enhancements include iOS support, additional emergency communication channels, improved accident-detection algorithms based on a larger labelled dataset, and broader real-world validation after appropriate safety testing.

---

**SafeRide — Building a smarter approach to motorcycle safety and emergency response.**
