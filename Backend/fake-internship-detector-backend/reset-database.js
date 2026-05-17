// Script to reset the database
const { sequelize } = require('./config/database-sqlite');
const User = require('./models/User-sqlite');

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...');
    
    // Force sync will drop and recreate all tables
    await sequelize.sync({ force: true });
    
    console.log('✅ Database reset complete!');
    console.log('📊 All tables recreated with new schema');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
