const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Equipment = require('../models/Equipment');

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().populate({
      path: 'equipment',
      populate: { path: 'team' }
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create request
router.post('/', async (req, res) => {
  try {
    // Auto-fill logic: If equipment is selected, ensure we have the correct team/category info if needed,
    // though in this data model, those are stored on the Equipment itself.
    // The request mainly links to the equipment.
    
    const request = new MaintenanceRequest(req.body);
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update request (Status change, Assignment, etc.)
router.patch('/:id', async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Scrap Logic: If moving to scrap, potentially update equipment status
    if (req.body.status === 'scrap' && request.status !== 'scrap') {
       await Equipment.findByIdAndUpdate(request.equipment, { status: 'scrap' });
    }
    
    // If moving to repaired, potentially update completedDate and Duration
    if (req.body.status === 'repaired' && request.status !== 'repaired') {
        req.body.completedDate = new Date();
        // Duration should be passed from frontend or calculated if start time was tracked
    }

    Object.assign(request, req.body);
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
