// SQLite Database Configuration using Sequelize
const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database in the project directory
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false, // Set to console.log to see SQL queries
});

/**
 * Connect to SQLite database and sync models
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected');

    // Register all models before sync
    require('../models/User-sqlite');
    require('../models/ScamPattern');

    // In development, alter: true adds new columns automatically
    // In production, use force: false (no-op) — run proper migrations instead
    const syncOptions = process.env.NODE_ENV === 'production'
      ? { force: false }
      : { alter: true };
    await sequelize.sync(syncOptions);
    console.log(`📊 Database tables synced (mode: ${process.env.NODE_ENV === 'production' ? 'safe' : 'alter'})`);
  } catch (error) {
    console.error('❌ SQLite Connection Error:', error.message);
    console.log('⚠️  Server will continue without database. Authentication features disabled.');
  }
};

module.exports = { sequelize, connectDB };
