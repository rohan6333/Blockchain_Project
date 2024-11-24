const Sequelize = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with environment variables for database connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    }
);

const db = {};

// Initialize Sequelize and add models
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and initialize models
db.User = require('./user')(sequelize, Sequelize); // Updated to use the correct model name

// Database connection test and sync
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.error('Error connecting to the database:', error));

sequelize.sync()
    .then(() => console.log('Database synchronized.'))
    .catch((error) => console.error('Database synchronization error:', error));

module.exports = db;
