const mongoose = require('mongoose');
const Team = require('./models/Team');
const Equipment = require('./models/Equipment');
const MaintenanceRequest = require('./models/MaintenanceRequest');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/GearGuardDatabase';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB (GearGuardDatabase)');

    // Clear existing data
    await Team.deleteMany({});
    await Equipment.deleteMany({});
    await MaintenanceRequest.deleteMany({});

    // Create Teams
    const teams = await Team.insertMany([
      { 
        name: 'Mechanics', 
        members: [{ name: 'John Doe', role: 'Senior Mechanic', avatar: 'JD' }, { name: 'Mike Ross', role: 'Junior Mechanic', avatar: 'MR' }] 
      },
      { 
        name: 'Electricians', 
        members: [{ name: 'Sarah Connor', role: 'Lead Electrician', avatar: 'SC' }] 
      },
      { 
        name: 'IT Support', 
        members: [{ name: 'Elliot Alderson', role: 'Sysadmin', avatar: 'EA' }] 
      }
    ]);

    // Create Equipment
    const equipment = await Equipment.insertMany([
      {
        name: 'CNC Milling Machine',
        serialNumber: 'CNC-001',
        category: 'Production',
        team: teams[0]._id, // Mechanics
        location: 'Floor 1',
        status: 'operational',
        purchaseDate: new Date('2023-01-15'),
        assignedTechnician: 'John Doe'
      },
      {
        name: 'Office Printer',
        serialNumber: 'PRT-999',
        category: 'Office',
        team: teams[2]._id, // IT
        location: 'Office 202',
        status: 'operational',
        purchaseDate: new Date('2024-05-10'),
        assignedTechnician: 'Elliot Alderson'
      },
      {
        name: 'Forklift X500',
        serialNumber: 'FL-500',
        category: 'Logistics',
        team: teams[0]._id, // Mechanics
        location: 'Warehouse',
        status: 'maintenance',
        purchaseDate: new Date('2022-08-20'),
        assignedTechnician: 'Mike Ross'
      }
    ]);

    // Create Requests
    await MaintenanceRequest.insertMany([
      {
        subject: 'Leaking Oil',
        equipment: equipment[2]._id, // Forklift
        type: 'corrective',
        priority: 'high',
        status: 'in-progress',
        description: 'Oil leak detected near the hydraulic pump.',
        assignedTo: { name: 'Mike Ross', avatar: 'MR' },
        createdAt: new Date()
      },
      {
        subject: 'Routine Checkup',
        equipment: equipment[0]._id, // CNC
        type: 'preventive',
        priority: 'medium',
        status: 'new',
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Next week
        createdAt: new Date()
      }
    ]);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
