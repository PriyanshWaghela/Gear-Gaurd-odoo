import axios from 'axios';
import { Equipment, MaintenanceRequest, Team } from '../types';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getEquipments = async (): Promise<Equipment[]> => {
  const response = await api.get('/equipments');
  return response.data.map((item: any) => ({
    ...item,
    id: item._id, // Map _id to id for frontend compatibility
    openRequests: item.openRequestsCount || 0 // Map virtual
  }));
};

export const getRequests = async (): Promise<MaintenanceRequest[]> => {
  const response = await api.get('/requests');
  return response.data.map((item: any) => ({
    ...item,
    id: item._id,
    title: item.subject, // Map subject to title
    equipmentId: item.equipment?._id || item.equipment,
    equipmentName: item.equipment?.name || 'Unknown',
    category: item.equipment?.category || 'Unknown',
    team: item.equipment?.team?.name || 'Unknown', // Flatten team name if needed
    createdDate: item.createdAt,
  }));
};

export const createRequest = async (request: Partial<MaintenanceRequest>) => {
  // Map frontend fields to backend fields
  const payload = {
    ...request,
    subject: request.title,
    equipment: request.equipmentId
  };
  const response = await api.post('/requests', payload);
  return response.data;
};

export const updateRequest = async (id: string, updates: Partial<MaintenanceRequest>) => {
  const response = await api.patch(`/requests/${id}`, updates);
  return response.data;
};

export const getTeams = async (): Promise<Team[]> => {
  const response = await api.get('/teams');
  return response.data;
};
