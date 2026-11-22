require('dotenv').config({ quiet: true });

// Used by BOTH the app (models/index.js) and sequelize-cli (migrations)
const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  logging: false,
  timezone: '+00:00', // store everything in UTC
  define: { underscored: true },
};

module.exports = {
  development: { ...base },
  test: { ...base, database: process.env.DB_NAME_TEST || `${process.env.DB_NAME}_test` },
  production: { ...base },
};
