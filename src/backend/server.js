// src/backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const credentialRoutes = require('./routes/credentialRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/credentials', credentialRoutes);  // Ensure this is correctly set

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
