import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Sidebar } from './components/Sidebar';
import { EquipmentGrid } from './components/EquipmentGrid';
import { RequestForm } from './components/RequestForm';
import { TaskBoard } from './components/TaskBoard';
import { CalendarView } from './components/CalendarView';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/sonner';
import { Plus, Sparkles, TrendingUp, Clock, CheckCircle, Bell } from 'lucide-react';
import { getEquipments, getRequests, createRequest } from './services/api';
import { Equipment, MaintenanceRequest } from './types';
import { equipments as mockEquipments, maintenanceRequests as mockRequests } from './data/mockData';

interface User {
  name: string;
  email: string;
}

function RequireAuth({ user }: { user: User | null }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function ReportsView({ requests }: { requests: MaintenanceRequest[] }) {
  const inProgress = requests.filter(r => r.status === 'in-progress');
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reports: In Progress Summary</h2>
      <div className="grid gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total In Progress</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inProgress.length}</div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-4">
          <h3 className="text-lg font-medium mb-4">Active Tasks</h3>
          {inProgress.length === 0 ? (
            <p className="text-slate-500">No tasks currently in progress.</p>
          ) : (
            <div className="space-y-4">
              {inProgress.map(req => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="font-medium">{req.title}</div>
                    <div className="text-sm text-slate-500">{req.equipmentName}</div>
                  </div>
                  <div className="text-sm text-slate-500">Due: {req.dueDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationsView({ requests }: { requests: MaintenanceRequest[] }) {
  const newRequests = requests.filter(r => r.status === 'new');
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Notifications: New Tasks</h2>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-4">
        {newRequests.length === 0 ? (
          <p className="text-slate-500">No new notifications.</p>
        ) : (
          <div className="space-y-4">
            {newRequests.map(req => (
              <div key={req.id} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-l-4 border-blue-500">
                <Bell className="h-5 w-5 text-blue-500 mt-1" />
                <div className="flex-1">
                  <div className="font-medium">{req.title}</div>
                  <p className="text-sm text-slate-500 mt-1">{req.description}</p>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{req.priority}</span>
                    <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{req.category}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{req.createdDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardLayout({ 
  user, 
  onLogout, 
  equipments, 
  requests, 
  onStatusChange, 
  onEquipmentSelect, 
  isFormOpen, 
  setIsFormOpen, 
  selectedEquipment, 
  setSelectedEquipment, 
  handleRequestSubmit 
}: any) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab from URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard/equipment')) return 'equipment';
    if (path.includes('/dashboard/board')) return 'dashboard'; // Sidebar ID is 'dashboard' for Kanban
    if (path.includes('/dashboard/calendar')) return 'calendar';
    if (path.includes('/dashboard/reports')) return 'reports';
    if (path.includes('/dashboard/notifications')) return 'notifications';
    if (path.includes('/dashboard/settings')) return 'settings';
    return 'equipment';
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'dashboard') navigate('/dashboard/board');
    else navigate(`/dashboard/${tab}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 overflow-hidden">
      <Sidebar 
        activeTab={getActiveTab()}
        onTabChange={handleTabChange}
        onLogout={onLogout}
        userName={user?.name || 'User'}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30">
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
              style={{ backgroundSize: '400% 400%' }}
            />
          </div>

          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h1 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Dashboard
                    </h1>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Welcome back, {user?.name}! Here's what's happening today.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-4 ml-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="text-xs text-green-600 dark:text-green-400">Completed</div>
                      <div className="text-sm text-green-900 dark:text-green-100">{requests.filter((r: MaintenanceRequest) => r.status === 'repaired').length}</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                  >
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">In Progress</div>
                      <div className="text-sm text-blue-900 dark:text-blue-100">{requests.filter((r: MaintenanceRequest) => r.status === 'in-progress').length}</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800"
                  >
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <div>
                      <div className="text-xs text-orange-600 dark:text-orange-400">Pending</div>
                      <div className="text-sm text-orange-900 dark:text-orange-100">{requests.filter((r: MaintenanceRequest) => r.status === 'new').length}</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => setSelectedEquipment(undefined)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/30"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Request
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      New Maintenance Request
                    </DialogTitle>
                  </DialogHeader>
                  <RequestForm
                    equipments={equipments}
                    selectedEquipment={selectedEquipment}
                    onSubmit={handleRequestSubmit}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.2 }}
               className="h-full"
             >
               <Outlet />
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  // Lazy initialization of user state from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [equipments, setEquipments] = useState(mockEquipments);
  const [requests, setRequests] = useState(mockRequests);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | undefined>();
  const { toast } = useToast();

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eqData, reqData] = await Promise.all([
          getEquipments(),
          getRequests()
        ]);
        if (eqData && eqData.length > 0) setEquipments(eqData);
        if (reqData && reqData.length > 0) setRequests(reqData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          title: 'Connection Error',
          description: 'Could not connect to the database. Using cached/mock data.',
          variant: 'destructive'
        });
      }
    };
    
    // Only fetch if we are logged in or just checking connectivity
    fetchData();
  }, []);

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    const userData = {
      name: email === 'demo@example.com' ? 'Demo User' : email.split('@')[0],
      email
    };
    
    setUser(userData);
    
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
    
    toast({
      title: '🎉 Welcome back!',
      description: 'You have successfully logged in.'
    });
    navigate('/dashboard');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const userData = { name, email };
    setUser(userData);
    toast({
      title: '✨ Account created!',
<<<<<<< HEAD
      description: 'Welcome to Gear Guard.'
=======
      description: 'Welcome to Maintenance Pro.'
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
    });
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
<<<<<<< HEAD
    sessionStorage.removeItem('user');
=======
>>>>>>> 9855f5c64dd95b410e65fe395c591204e1b5095d
    toast({
      title: '👋 Logged out',
      description: 'You have been successfully logged out.'
    });
    navigate('/login');
  };

  const handleEquipmentSelect = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsFormOpen(true);
  };

  const handleRequestSubmit = async (newRequest: Partial<MaintenanceRequest>) => {
    try {
      await createRequest(newRequest);
      
      // Refresh data
      const [eqData, reqData] = await Promise.all([
        getEquipments(),
        getRequests()
      ]);
      
      setEquipments(eqData);
      setRequests(reqData);

      toast({
        title: 'Request Created',
        description: 'The maintenance request has been successfully created.',
      });
      setIsFormOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create request.',
        variant: 'destructive'
      });
    }
  };

  const handleStatusChange = async (requestId: string, newStatus: MaintenanceRequest['status']) => {
    try {
      // Optimistic update
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      ));
      
      toast({
        title: '✅ Success',
        description: 'Request status updated'
      });
    } catch (error) {
      // Revert on error
       const [_, reqData] = await Promise.all([
        getEquipments(),
        getRequests()
      ]);
      setRequests(reqData);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage onShowLogin={() => navigate('/login')} onShowSignup={() => navigate('/signup')} />} />
        
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" replace /> : 
          <LoginPage 
            onLogin={handleLogin} 
            onShowSignup={() => navigate('/signup')}
            onBackToLanding={() => navigate('/')}
          />
        } />
        
        <Route path="/signup" element={
          user ? <Navigate to="/dashboard" replace /> :
          <SignupPage 
            onSignup={handleSignup}
            onShowLogin={() => navigate('/login')}
            onBackToLanding={() => navigate('/')}
          />
        } />

        <Route element={<RequireAuth user={user} />}>
          <Route path="/dashboard" element={
            <DashboardLayout 
              user={user} 
              onLogout={handleLogout}
              equipments={equipments}
              requests={requests}
              onStatusChange={handleStatusChange}
              onEquipmentSelect={handleEquipmentSelect}
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              selectedEquipment={selectedEquipment}
              setSelectedEquipment={setSelectedEquipment}
              handleRequestSubmit={handleRequestSubmit}
              setRequests={setRequests}
              setEquipments={setEquipments}
            />
          }>
            <Route index element={<Navigate to="equipment" replace />} />
            <Route path="equipment" element={
              <EquipmentGrid 
                equipments={equipments} 
                onEquipmentSelect={handleEquipmentSelect}
              />
            } />
            <Route path="board" element={
              <TaskBoard 
                requests={requests}
                onStatusChange={handleStatusChange}
              />
            } />
            <Route path="calendar" element={<CalendarView requests={requests} />} />
            <Route path="reports" element={<ReportsView requests={requests} />} />
            <Route path="notifications" element={<NotificationsView requests={requests} />} />
            <Route path="settings" element={
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p className="text-slate-500">Settings module coming soon.</p>
              </div>
            } />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
