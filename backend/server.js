const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/GearGuardDatabase';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected to GearGuardDatabase'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const equipmentRoutes = require('./routes/equipments');
const requestRoutes = require('./routes/requests');
const teamRoutes = require('./routes/teams');

app.use('/api/equipments', equipmentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
  res.send('GearGuard API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
