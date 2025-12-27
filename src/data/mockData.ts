import { Equipment, MaintenanceRequest } from '../types';

export const equipments: Equipment[] = [
  {
    id: 'eq-001',
    name: 'CNC Milling Machine #1',
    category: 'Production Equipment',
    team: 'Manufacturing',
    location: 'Workshop A',
    status: 'operational',
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2025-01-15',
    openRequests: 2
  },
  {
    id: 'eq-002',
    name: 'Industrial Compressor',
    category: 'HVAC',
    team: 'Facilities',
    location: 'Utility Room',
    status: 'maintenance',
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2025-01-20',
    openRequests: 1
  },
  {
    id: 'eq-003',
    name: 'Conveyor Belt System',
    category: 'Material Handling',
    team: 'Logistics',
    location: 'Warehouse B',
    status: 'operational',
    lastMaintenance: '2024-12-01',
    nextMaintenance: '2025-02-01',
    openRequests: 3
  },
  {
    id: 'eq-004',
    name: 'Diesel Generator',
    category: 'Power Systems',
    team: 'Facilities',
    location: 'Generator Room',
    status: 'operational',
    lastMaintenance: '2024-11-30',
    nextMaintenance: '2025-01-30',
    openRequests: 0
  },
  {
    id: 'eq-005',
    name: 'Packaging Machine #3',
    category: 'Production Equipment',
    team: 'Manufacturing',
    location: 'Production Line C',
    status: 'offline',
    lastMaintenance: '2024-09-15',
    nextMaintenance: '2024-12-15',
    openRequests: 4
  }
];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'req-001',
    equipmentId: 'eq-001',
    equipmentName: 'CNC Milling Machine #1',
    category: 'Production Equipment',
    team: 'Manufacturing',
    title: 'Spindle bearing replacement',
    description: 'Unusual noise detected from the main spindle bearing',
    priority: 'high',
    status: 'in-progress',
    createdDate: '2024-12-20',
    dueDate: '2024-12-28',
    assignedTo: {
      name: 'John Miller',
      avatar: 'JM'
    },
    scheduledDate: '2024-12-28'
  },
  {
    id: 'req-002',
    equipmentId: 'eq-001',
    equipmentName: 'CNC Milling Machine #1',
    category: 'Production Equipment',
    team: 'Manufacturing',
    title: 'Coolant system leak',
    description: 'Minor leak detected in coolant circulation system',
    priority: 'medium',
    status: 'new',
    createdDate: '2024-12-25',
    dueDate: '2025-01-05',
    assignedTo: {
      name: 'Sarah Chen',
      avatar: 'SC'
    }
  },
  {
    id: 'req-003',
    equipmentId: 'eq-002',
    equipmentName: 'Industrial Compressor',
    category: 'HVAC',
    team: 'Facilities',
    title: 'Pressure sensor calibration',
    description: 'Routine pressure sensor calibration required',
    priority: 'low',
    status: 'in-progress',
    createdDate: '2024-12-22',
    dueDate: '2025-01-08',
    assignedTo: {
      name: 'Mike Rodriguez',
      avatar: 'MR'
    },
    scheduledDate: '2025-01-08'
  },
  {
    id: 'req-004',
    equipmentId: 'eq-003',
    equipmentName: 'Conveyor Belt System',
    category: 'Material Handling',
    team: 'Logistics',
    title: 'Belt alignment adjustment',
    description: 'Belt showing signs of misalignment, needs adjustment',
    priority: 'medium',
    status: 'new',
    createdDate: '2024-12-24',
    dueDate: '2024-12-26',
    assignedTo: {
      name: 'David Kim',
      avatar: 'DK'
    }
  },
  {
    id: 'req-005',
    equipmentId: 'eq-003',
    equipmentName: 'Conveyor Belt System',
    category: 'Material Handling',
    team: 'Logistics',
    title: 'Motor bearing lubrication',
    description: 'Scheduled lubrication of motor bearings',
    priority: 'low',
    status: 'repaired',
    createdDate: '2024-12-15',
    dueDate: '2024-12-20',
    assignedTo: {
      name: 'David Kim',
      avatar: 'DK'
    }
  },
  {
    id: 'req-006',
    equipmentId: 'eq-003',
    equipmentName: 'Conveyor Belt System',
    category: 'Material Handling',
    team: 'Logistics',
    title: 'Emergency stop button replacement',
    description: 'Emergency stop button not responding properly',
    priority: 'critical',
    status: 'in-progress',
    createdDate: '2024-12-26',
    dueDate: '2024-12-27',
    assignedTo: {
      name: 'David Kim',
      avatar: 'DK'
    },
    scheduledDate: '2024-12-27'
  },
  {
    id: 'req-007',
    equipmentId: 'eq-005',
    equipmentName: 'Packaging Machine #3',
    category: 'Production Equipment',
    team: 'Manufacturing',
    title: 'Main drive motor failure',
    description: 'Main drive motor completely failed, needs replacement',
    priority: 'critical',
    status: 'new',
    createdDate: '2024-12-23',
    dueDate: '2024-12-25',
    assignedTo: {
      name: 'John Miller',
      avatar: 'JM'
    }
  },
  {
    id: 'req-008',
    equipmentId: 'eq-005',
    equipmentName: 'Packaging Machine #3',
    category: 'Production Equipment',
    team: 'Manufacturing',
    title: 'Sealing unit malfunction',
    description: 'Heat sealing unit not maintaining proper temperature',
    priority: 'high',
    status: 'in-progress',
    createdDate: '2024-12-24',
    dueDate: '2024-12-29',
    assignedTo: {
      name: 'Sarah Chen',
      avatar: 'SC'
    },
    scheduledDate: '2024-12-29'
  },
  {
    id: 'req-009',
    equipmentId: 'eq-005',
    equipmentName: 'Packaging Machine #3',
    category: 'Production Equipment',
    team: 'Manufacturing',
    title: 'Control panel display issue',
    description: 'Touch screen display intermittently unresponsive',
    priority: 'medium',
    status: 'new',
    createdDate: '2024-12-26',
    dueDate: '2025-01-02',
    assignedTo: {
      name: 'John Miller',
      avatar: 'JM'
    }
  },
  {
    id: 'req-010',
    equipmentId: 'eq-005',
    equipmentName: 'Packaging Machine #3',
    category: 'Production Equipment',
    team: 'Manufacturing',
    title: 'Pneumatic valve replacement',
    description: 'Pneumatic valve beyond repair, marked for scrap',
    priority: 'low',
    status: 'scrap',
    createdDate: '2024-12-18',
    dueDate: '2024-12-22',
    assignedTo: {
      name: 'Sarah Chen',
      avatar: 'SC'
    }
  }
];
