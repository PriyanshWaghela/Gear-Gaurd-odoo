export interface Team {
  _id: string;
  name: string;
  members: {
    name: string;
    role: string;
    avatar: string;
  }[];
}

export interface Equipment {
  id?: string; // Frontend might use id or _id
  _id: string;
  name: string;
  serialNumber: string;
  category: string;
  team: Team | string; // Populated or ID
  location: string;
  status: 'operational' | 'maintenance' | 'offline' | 'scrap';
  purchaseDate?: string;
  warrantyExpiration?: string;
  assignedTechnician?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  openRequestsCount?: number;
  openRequests?: number; // Keep for compatibility if needed
}

export interface MaintenanceRequest {
  id?: string;
  _id: string;
  subject: string; // Replaces title
  title?: string; // Keep for compatibility (mapped to subject)
  description?: string;
  equipment: Equipment | string; // Populated or ID
  equipmentId?: string; // Helper for forms
  equipmentName?: string; // Helper for UI
  type: 'corrective' | 'preventive';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in-progress' | 'repaired' | 'scrap';
  assignedTo?: {
    name: string;
    avatar: string;
  };
  scheduledDate?: string;
  completedDate?: string;
  durationHours?: number;
  createdDate?: string; // Mapped from createdAt
  createdAt?: string;
  dueDate?: string; // Optional
}
