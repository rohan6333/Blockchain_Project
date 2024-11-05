const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const credentialRoutes = require('./routes/credentialRoutes'); // Make sure the path matches

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/credentials', credentialRoutes); // Using the route for credential operations

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
