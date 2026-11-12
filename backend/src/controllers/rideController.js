const dataStore = require('../models/dataStore');

const rideController = {

  getPreRideCheck: (req, res) => {
    try {
      const contacts = dataStore.emergencyContacts;
      const user = dataStore.currentUser;

      const hasEmergencyContacts = contacts && contacts.length > 0;
      const isReady = hasEmergencyContacts;

      return res.status(200).json({
        status: 'success',
        message: isReady ? 'Rider is ready to start ride' : 'Safety prerequisites not met',
        data: {
          ready: isReady,
          rider: {
            id: user.id,
            name: user.name,
            bloodGroup: user.bloodGroup,
            bike: `${user.bikeModel} (${user.bikePlate})`,
          },
          checklist: {
            emergencyContactsConfigured: hasEmergencyContacts,
            contactsCount: contacts.length,
            primaryContact: hasEmergencyContacts ? contacts[0] : null,
            serverOnline: true,
          },
        },
      });
    } catch (error) {
      console.error('Error in getPreRideCheck:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during pre-ride check',
      });
    }
  },

  startRide: (req, res) => {
    try {
      const contacts = dataStore.emergencyContacts;
      if (!contacts || contacts.length === 0) {
        return res.status(400).json({
          status: 'fail',
          message: 'Cannot start ride: At least one emergency contact must be configured.',
        });
      }

      const { startLocation, destination } = req.body || {};

      const existingActiveRide = dataStore.rides.find(
        (r) => r.status === 'ACTIVE' && r.userId === dataStore.currentUser.id
      );

      if (existingActiveRide) {
        return res.status(200).json({
          status: 'success',
          message: 'Active ride session already in progress',
          data: {
            ride: existingActiveRide,
          },
        });
      }

      const newRide = {
        id: `ride_${Date.now()}`,
        userId: dataStore.currentUser.id,
        status: 'ACTIVE',
        startTime: new Date().toISOString(),
        endTime: null,
        startLocation: startLocation || { latitude: 6.9271, longitude: 79.8612 }, // default GPS coords
        destination: destination || null,
        distanceKm: 0.0,
        durationSeconds: 0,
        averageSpeedKmh: 0.0,
        currentSpeedKmh: 0.0,
      };

      dataStore.rides.push(newRide);

      return res.status(201).json({
        status: 'success',
        message: 'Ride session started successfully',
        data: {
          ride: newRide,
        },
      });
    } catch (error) {
      console.error('Error in startRide:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error while starting ride',
      });
    }
  },
};

module.exports = rideController;