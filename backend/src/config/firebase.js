const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let initialised = false;

// Initialises the Admin SDK once. Throws a clear error if the key is missing.
function getFirebase() {
  if (!initialised) {
    const keyPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json');
    if (!fs.existsSync(keyPath)) {
      throw new Error(`Firebase service account key not found at ${keyPath}`);
    }
    admin.initializeApp({
      credential: admin.cert(require(keyPath)),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
    initialised = true;
  }
  return admin;
}

module.exports = { getFirebase };
