const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // Department
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Maintenance Team responsible
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['operational', 'maintenance', 'offline', 'scrap'], 
    default: 'operational' 
  },
  purchaseDate: Date,
  warrantyExpiration: Date,
  assignedTechnician: { type: String }, // Name or ID of default technician
  image: String,
  lastMaintenance: Date,
  nextMaintenance: Date
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual to count open requests (will be populated separately or via aggregation)
equipmentSchema.virtual('openRequestsCount', {
  ref: 'MaintenanceRequest',
  localField: '_id',
  foreignField: 'equipment',
  count: true,
  match: { status: { $in: ['new', 'in-progress'] } }
});

module.exports = mongoose.model('Equipment', equipmentSchema);
