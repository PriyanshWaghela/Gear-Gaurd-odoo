import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Equipment } from '../types';
import { Wrench, MapPin, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface EquipmentGridProps {
  equipments: Equipment[];
  onEquipmentSelect: (equipment: Equipment) => void;
}

export function EquipmentGrid({ equipments, onEquipmentSelect }: EquipmentGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'from-green-500 to-emerald-500';
      case 'maintenance':
        return 'from-yellow-500 to-orange-500';
      case 'offline':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <TrendingUp className="h-3 w-3" />;
      case 'maintenance':
        return <Wrench className="h-3 w-3" />;
      case 'offline':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {equipments.map((equipment, index) => (
        <motion.div 
          key={equipment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="relative group"
        >
          {/* Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
            className="absolute -top-3 -right-3 z-20"
          >
            <Badge 
              className={`${
                equipment.openRequests > 0 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/50' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/50'
              } border-0 text-white`}
            >
              {equipment.openRequests > 0 ? `${equipment.openRequests} Open` : '✓ All Clear'}
            </Badge>
          </motion.div>

          {/* Glow effect on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor(equipment.status)} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
          
          <Card 
            className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group"
            onClick={() => onEquipmentSelect(equipment)}
          >
            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getStatusColor(equipment.status)}`} />
            
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
            
            <CardHeader className="pb-3 relative">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base leading-tight flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {equipment.name}
                  </h3>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getStatusColor(equipment.status)} shadow-lg`}>
                    <Wrench className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`bg-gradient-to-r ${getStatusColor(equipment.status)} border-0 text-white shadow-md flex items-center gap-1`}
                    variant="secondary"
                  >
                    {getStatusIcon(equipment.status)}
                    {getStatusText(equipment.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 text-sm relative">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>{equipment.category}</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>{equipment.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Next Maintenance</span>
                  <span>{new Date(equipment.nextMaintenance).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Uptime</span>
                  <span>98%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>
            </CardContent>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
