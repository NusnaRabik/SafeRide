const dataStore = {
  currentUser: {
    id: 'usr_001',
    name: 'Kasun Vinod',
    phone: '+94771234567',
    bloodGroup: 'O+',
    bikeModel: 'Yamaha FZ-S V3',
    bikePlate: 'WP BBO-1234',
  },

  emergencyContacts: [
    {
      id: 'cnt_001',
      userId: 'usr_001',
      name: 'Amma (Mother)',
      phone: '+94779876543',
      relationship: 'Mother',
      priority: 1,
    },
    {
      id: 'cnt_002',
      userId: 'usr_001',
      name: 'Dr. Perera',
      phone: '+94712345678',
      relationship: 'Doctor',
      priority: 2,
    },
  ],

  rides: [],

  incidents: [],
};

module.exports = dataStore;