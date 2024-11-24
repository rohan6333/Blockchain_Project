require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes'); 
const credentialRoutes = require('./routes/credentialRoutes'); 
const db = require('./models'); 
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

// Enable CORS for frontend requests
app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
}));
// Middleware to parse incoming requests
app.use(helmet()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err.message);
    });

// Initialize the database and sync models
db.sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database connected and synced successfully.');
    })
    .catch((err) => {
        console.error('Failed to sync database:', err.message);
    });

// Define routes with logs
app.use('/api/users', (req, res, next) => {
    console.log(`User route accessed: ${req.method} ${req.url}`);
    next();
}, userRoutes); // User authentication routes
app.use('/api/credentials', (req, res, next) => {
    console.log(`Credential route accessed: ${req.method} ${req.url}`);
    next();
}, credentialRoutes); // Credential management routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
