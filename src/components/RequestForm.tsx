import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Equipment, MaintenanceRequest } from '../types';
import dayjs from 'dayjs';

interface RequestFormProps {
  equipments: Equipment[];
  selectedEquipment?: Equipment;
  onSubmit: (request: Partial<MaintenanceRequest>) => void;
}

export function RequestForm({ equipments, selectedEquipment, onSubmit }: RequestFormProps) {
  const [equipmentId, setEquipmentId] = useState(selectedEquipment?.id || '');
  const [category, setCategory] = useState(selectedEquipment?.category || '');
  const [team, setTeam] = useState(selectedEquipment?.team || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [type, setType] = useState<'corrective' | 'preventive'>('corrective');
  const [scheduledDate, setScheduledDate] = useState('');

  useEffect(() => {
    if (selectedEquipment) {
      setEquipmentId(selectedEquipment.id);
      setCategory(selectedEquipment.category);
      setTeam(selectedEquipment.team);
    }
  }, [selectedEquipment]);

  const handleEquipmentChange = (value: string) => {
    setEquipmentId(value);
    const equipment = equipments.find(eq => eq.id === value);
    if (equipment) {
      setCategory(equipment.category);
      setTeam(equipment.team);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const equipment = equipments.find(eq => eq.id === equipmentId);
    
    const request: Partial<MaintenanceRequest> = {
      equipmentId,
      equipmentName: equipment?.name || '',
      category,
      team,
      title,
      description,
      priority: priority as MaintenanceRequest['priority'],
      dueDate,
      type,
      scheduledDate: type === 'preventive' ? scheduledDate : undefined,
      createdDate: dayjs().format('YYYY-MM-DD'),
      status: 'new'
    };
    
    onSubmit(request);
    
    // Reset form
    setEquipmentId('');
    setCategory('');
    setTeam('');
    setTitle('');
    setDescription('');
    setPriority('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="equipment">Equipment</Label>
        <Select value={equipmentId} onValueChange={handleEquipmentChange} required>
          <SelectTrigger id="equipment">
            <SelectValue placeholder="Select equipment" />
          </SelectTrigger>
          <SelectContent>
            {equipments.map(eq => (
              <SelectItem key={eq.id} value={eq.id}>
                {eq.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={category}
          disabled
          placeholder="Auto-filled from equipment"
          className="bg-slate-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="team">Team</Label>
        <Input
          id="team"
          value={team}
          disabled
          placeholder="Auto-filled from equipment"
          className="bg-slate-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Request Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the issue"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the maintenance request"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Request Type</Label>
        <Select value={type} onValueChange={(val: 'corrective' | 'preventive') => setType(val)} required>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="corrective">Corrective</SelectItem>
            <SelectItem value="preventive">Preventive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={priority} onValueChange={setPriority} required>
          <SelectTrigger id="priority">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      {type === 'preventive' && (
        <div className="space-y-2">
          <Label htmlFor="scheduledDate">Scheduled Date</Label>
          <Input
            id="scheduledDate"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">
          Create Request
        </Button>
      </div>
    </form>
  );
}
