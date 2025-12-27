import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MaintenanceRequest } from '../types';
import { Clock, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';

interface TaskBoardProps {
  requests: MaintenanceRequest[];
  onStatusChange: (requestId: string, newStatus: MaintenanceRequest['status']) => void;
}

const COLUMNS = [
  { key: 'new' as const, title: 'New', color: 'bg-blue-500' },
  { key: 'in-progress' as const, title: 'In Progress', color: 'bg-yellow-500' },
  { key: 'repaired' as const, title: 'Repaired', color: 'bg-green-500' },
  { key: 'scrap' as const, title: 'Scrap', color: 'bg-red-500' }
];

interface RequestCardProps {
  request: MaintenanceRequest;
  onStatusChange: (requestId: string, newStatus: MaintenanceRequest['status']) => void;
}

function RequestCard({ request, onStatusChange }: RequestCardProps) {
  const isOverdue = dayjs(request.dueDate).isBefore(dayjs(), 'day');
  const showOverdue = isOverdue && request.status !== 'repaired' && request.status !== 'scrap';
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500 hover:bg-red-600';
      case 'high':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Card 
      className={`mb-3 ${showOverdue ? 'border-l-4 border-l-red-500 bg-red-50' : ''}`}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm leading-tight flex-1">{request.title}</h4>
            {showOverdue && (
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
            )}
          </div>
          
          <p className="text-xs text-slate-600">{request.equipmentName}</p>

          <div className="flex flex-wrap gap-1">
            <Badge className={`${getPriorityColor(request.priority)} text-xs`}>
              {request.priority.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {request.team}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1 text-xs ${showOverdue ? 'text-red-600' : 'text-slate-600'}`}>
              <Clock className="h-3 w-3" />
              <span>{dayjs(request.dueDate).format('MMM DD')}</span>
              {showOverdue && <span className="ml-1">OVERDUE</span>}
            </div>
            {request.assignedTo && (
              <Avatar className="h-6 w-6 bg-blue-500">
                <AvatarFallback className="text-xs text-white">
                  {request.assignedTo.avatar || request.assignedTo.name?.substring(0, 2).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <Select value={request.status} onValueChange={(value) => onStatusChange(request.id, value as MaintenanceRequest['status'])}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="repaired">Repaired</SelectItem>
              <SelectItem value="scrap">Scrap</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

interface ColumnProps {
  column: typeof COLUMNS[0];
  requests: MaintenanceRequest[];
  onStatusChange: (requestId: string, newStatus: MaintenanceRequest['status']) => void;
}

function Column({ column, requests, onStatusChange }: ColumnProps) {
  return (
    <div className="flex-1 min-w-[280px] bg-slate-100 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${column.color}`} />
        <h3 className="text-base">{column.title}</h3>
        <Badge className={column.color}>{requests.length}</Badge>
      </div>
      <div>
        {requests.map(request => (
          <RequestCard key={request.id} request={request} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}

export function TaskBoard({ requests, onStatusChange }: TaskBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map(column => (
        <Column
          key={column.key}
          column={column}
          requests={requests.filter(r => r.status === column.key)}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
