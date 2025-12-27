<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MaintenanceRequest } from '../types';
import { Clock, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';
<<<<<<< HEAD
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
=======
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d

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
<<<<<<< HEAD
  isOverlay?: boolean;
}

function RequestCard({ request, onStatusChange, isOverlay }: RequestCardProps) {
=======
}

function RequestCard({ request, onStatusChange }: RequestCardProps) {
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
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
<<<<<<< HEAD
      className={`mb-3 ${showOverdue ? 'border-l-4 border-l-red-500 bg-red-50' : ''} ${isOverlay ? 'shadow-2xl cursor-grabbing' : 'cursor-grab'}`}
=======
      className={`mb-3 ${showOverdue ? 'border-l-4 border-l-red-500 bg-red-50' : ''}`}
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
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

<<<<<<< HEAD
          {/* Only show select when not dragging/overlay to prevent issues */}
          <div onPointerDown={(e) => e.stopPropagation()}>
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
=======
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
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
        </div>
      </CardContent>
    </Card>
  );
}

<<<<<<< HEAD
function SortableRequestCard({ request, onStatusChange }: RequestCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: request.id, data: { request } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RequestCard request={request} onStatusChange={onStatusChange} />
    </div>
  );
}

=======
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
interface ColumnProps {
  column: typeof COLUMNS[0];
  requests: MaintenanceRequest[];
  onStatusChange: (requestId: string, newStatus: MaintenanceRequest['status']) => void;
}

function Column({ column, requests, onStatusChange }: ColumnProps) {
<<<<<<< HEAD
  const { setNodeRef } = useSortable({
    id: column.key,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div ref={setNodeRef} className="flex-1 min-w-[280px] bg-slate-100 rounded-lg p-4">
=======
  return (
    <div className="flex-1 min-w-[280px] bg-slate-100 rounded-lg p-4">
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${column.color}`} />
        <h3 className="text-base">{column.title}</h3>
        <Badge className={column.color}>{requests.length}</Badge>
      </div>
<<<<<<< HEAD
      
      <SortableContext items={requests.map(r => r.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-0 min-h-[100px]">
          {requests.map(request => (
            <SortableRequestCard key={request.id} request={request} onStatusChange={onStatusChange} />
          ))}
        </div>
      </SortableContext>
=======
      <div>
        {requests.map(request => (
          <RequestCard key={request.id} request={request} onStatusChange={onStatusChange} />
        ))}
      </div>
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
    </div>
  );
}

export function TaskBoard({ requests, onStatusChange }: TaskBoardProps) {
<<<<<<< HEAD
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeRequest, setActiveRequest] = useState<MaintenanceRequest | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    setActiveRequest(active.data.current?.request || requests.find(r => r.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveRequest(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the request and the target status
    const activeRequest = requests.find(r => r.id === activeId);
    
    // Check if we dropped over a column
    const overColumn = COLUMNS.find(col => col.key === overId);
    
    // Check if we dropped over another card
    const overRequest = requests.find(r => r.id === overId);
    
    let newStatus: MaintenanceRequest['status'] | undefined;

    if (overColumn) {
      newStatus = overColumn.key;
    } else if (overRequest) {
      newStatus = overRequest.status;
    }

    if (activeRequest && newStatus && activeRequest.status !== newStatus) {
      onStatusChange(activeRequest.id, newStatus);
    }

    setActiveId(null);
    setActiveRequest(null);
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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

      <DragOverlay dropAnimation={dropAnimation}>
        {activeRequest ? (
          <RequestCard 
            request={activeRequest} 
            onStatusChange={() => {}} 
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
=======
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
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
  );
}
