
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'OnSite Backend Server is running!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

