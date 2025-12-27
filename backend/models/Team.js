const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{
    name: String,
    role: String, // e.g., Technician, Manager
    avatar: String // URL or initials
  }]
});

module.exports = mongoose.model('Team', teamSchema);
