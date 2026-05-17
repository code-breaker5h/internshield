const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database-sqlite');

const ScamPattern = sequelize.define('ScamPattern', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phrase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  riskWeight: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    // payment_request, urgency, unrealistic_salary, suspicious_contact, vague_details, pressure_tactic, other
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'manual',
    // user_report, ai_detected, manual
  },
  matchCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  tableName: 'scam_patterns',
});

module.exports = ScamPattern;
