import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Grid3x3, 
  Columns3, 
  Calendar, 
  LogOut, 
  Settings, 
  Bell,
  BarChart3,
  FileText,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

export function Sidebar({ activeTab, onTabChange, onLogout, userName }: SidebarProps) {
  const navItems = [
    { id: 'equipment', label: 'Equipment', icon: Grid3x3, badge: null },
    { id: 'dashboard', label: 'Dashboard', icon: Columns3, badge: '12' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'reports', label: 'Reports', icon: FileText, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white flex flex-col h-screen border-r border-white/5 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      {/* Logo */}
      <div className="relative p-6 border-b border-white/10">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-50"
            />
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="h-6 w-6" />
            </div>
          </div>
          <div>
            <div className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gear
            </div>
            <div className="text-xs text-slate-400">Guard System</div>      </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="relative px-6 py-4 border-b border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-slate-400">Active</span>
            </div>
            <div className="text-xl text-white">24</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-slate-400">This Week</span>
            </div>
            <div className="text-xl text-white">86</div>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="text-xs uppercase text-slate-500 mb-3 px-3">Navigation</div>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {/* Active background with gradient */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              
              <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="relative z-10 flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge className="relative z-10 bg-white/20 hover:bg-white/20 text-white border-0 text-xs">
                  {item.badge}
                </Badge>
              )}
            </motion.button>
          );
        })}

        <div className="pt-6">
          <div className="text-xs uppercase text-slate-500 mb-3 px-3">Other</div>
          
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <FileText className="h-5 w-5" />
            <span className="flex-1 text-left">Reports</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group relative"
          >
            <Bell className="h-5 w-5" />
            <span className="flex-1 text-left">Notifications</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <Settings className="h-5 w-5" />
            <span className="flex-1 text-left">Settings</span>
          </motion.button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="relative p-4 border-t border-white/10">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 p-4 mb-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50"
              />
              <Avatar className="h-12 w-12 relative bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-white/20">
                <AvatarFallback className="text-white bg-transparent">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{userName}</div>
              <div className="text-xs text-slate-400">Administrator</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
            <span className="text-slate-400">75%</span>
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all group"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-3 group-hover:text-red-400 transition-colors" />
            <span className="group-hover:text-red-400 transition-colors">Logout</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
