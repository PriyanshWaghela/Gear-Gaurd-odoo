const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: String,
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  type: { 
    type: String, 
    enum: ['corrective', 'preventive'], 
    required: true 
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'repaired', 'scrap'],
    default: 'new'
  },
  assignedTo: {
    name: String,
    avatar: String
  },
  scheduledDate: Date,
  completedDate: Date,
  durationHours: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
