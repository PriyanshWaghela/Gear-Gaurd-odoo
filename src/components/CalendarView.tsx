import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { MaintenanceRequest } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarViewProps {
  requests: MaintenanceRequest[];
}

export function CalendarView({ requests }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const getRequestsForDate = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    return requests.filter(request => {
      const scheduled = request.scheduledDate ? dayjs(request.scheduledDate).format('YYYY-MM-DD') : null;
      const due = request.dueDate ? dayjs(request.dueDate).format('YYYY-MM-DD') : null;
      return scheduled === dateStr || due === dateStr;
    });
  };

  const generateCalendarDays = () => {
    const days = [];
    let day = startDate;

    while (day.isBefore(endDate) || day.isSame(endDate, 'day')) {
      days.push(day);
      day = day.add(1, 'day');
    }

    return days;
  };

  const days = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const goToToday = () => {
    setCurrentDate(dayjs());
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{currentDate.format('MMMM YYYY')}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded" />
              <span>Scheduled Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
              <span>Due Date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded" />
              <span>Overdue</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm text-slate-600">
                {day}
              </div>
            ))}

            {days.map((day, index) => {
              const dayRequests = getRequestsForDate(day);
              const isCurrentMonth = day.month() === currentDate.month();
              const isToday = day.isSame(dayjs(), 'day');

              return (
                <div
                  key={index}
                  className={`min-h-[120px] border rounded p-2 ${
                    isCurrentMonth ? 'bg-white' : 'bg-slate-50'
                  } ${isToday ? 'border-blue-500 border-2' : 'border-slate-200'}`}
                >
                  <div className={`text-sm mb-2 ${isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>
                    {day.date()}
                  </div>
                  <div className="space-y-1">
                    {dayRequests.map(request => {
                      const isScheduled = request.scheduledDate === day.format('YYYY-MM-DD');
                      const isDue = request.dueDate === day.format('YYYY-MM-DD');
                      const isOverdue = dayjs(request.dueDate).isBefore(dayjs(), 'day') && 
                                       request.status !== 'repaired' && 
                                       request.status !== 'scrap';

                      let bgColor = 'bg-green-100 border-green-300';
                      if (isScheduled) bgColor = 'bg-blue-100 border-blue-300';
                      if (isOverdue) bgColor = 'bg-red-100 border-red-300';

                      return (
                        <div
                          key={request.id}
                          className={`${bgColor} border rounded p-1.5 text-xs`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            {request.assignedTo && (
                              <Avatar className="h-4 w-4 bg-blue-500">
                                <AvatarFallback className="text-[8px] text-white">
                                  {request.assignedTo.avatar || request.assignedTo.name?.substring(0, 2).toUpperCase() || '?'}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <span className="truncate flex-1" title={request.title}>
                              {request.title}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-600 truncate" title={request.equipmentName}>
                            {request.equipmentName}
                          </div>
                          {isScheduled && (
                            <Badge variant="outline" className="text-[9px] h-4 mt-1">
                              Scheduled
                            </Badge>
                          )}
                          {isDue && !isScheduled && (
                            <Badge variant="outline" className="text-[9px] h-4 mt-1">
                              {isOverdue ? 'Overdue' : 'Due'}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
