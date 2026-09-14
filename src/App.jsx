import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { EmployeeView } from './components/EmployeeView';
import { DoctorPortalView } from './components/DoctorPortalView';
import { AdminUserManagement } from './components/AdminUserManagement';
import { NewDiscountModal } from './components/NewDiscountModal';
import { RequestDetailModal } from './components/RequestDetailModal';
import { ExcelReportModal } from './components/ExcelReportModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { SupabaseSettingsModal } from './components/SupabaseSettingsModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { LoginModal } from './components/LoginModal';
import { LoginPage } from './components/LoginPage';
import { MobileSyncModal } from './components/MobileSyncModal';
import { PortingModal } from './components/PortingModal';
import { AlertCircle, CheckCircle, Info, ShieldAlert, PlusCircle, Globe, Smartphone } from 'lucide-react';

export function AppContent() {
  const { toastAlert, isAuthenticated, activeUser, isBillingRole } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'admin'
  const [showNewModal, setShowNewModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileSyncModal, setShowMobileSyncModal] = useState(false);
  const [showPortingModal, setShowPortingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Enforce non-admin users stay on dashboard tab
  React.useEffect(() => {
    if (activeUser?.role !== 'ADMIN' && activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  }, [activeUser, activeTab]);

  // If user is not authenticated, display full-screen Login Page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isAdmin = activeUser?.role === 'ADMIN';
  const isDoctor = activeUser?.role === 'DOCTOR';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Toast Alert Banner */}
      {toastAlert && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`glass-card px-4 py-3 rounded-2xl border flex items-center gap-3 shadow-2xl ${
            toastAlert.type === 'success' 
              ? 'border-emerald-500/40 bg-emerald-950/90 text-emerald-300' 
              : toastAlert.type === 'warning' 
              ? 'border-rose-500/40 bg-rose-950/90 text-rose-300' 
              : 'border-teal-500/40 bg-slate-900/90 text-teal-300'
          }`}>
            {toastAlert.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            {toastAlert.type === 'warning' && <AlertCircle className="w-5 h-5 text-rose-400" />}
            {toastAlert.type === 'info' && <Info className="w-5 h-5 text-teal-400" />}
            <span className="text-xs font-bold">{toastAlert.msg}</span>
          </div>
        </div>
      )}

      {/* Top Header Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewModal={() => setShowNewModal(true)}
        onOpenExcelModal={() => setShowExcelModal(true)}
        onOpenNotifDrawer={() => setShowNotifDrawer(true)}
        onOpenSupabaseModal={() => setShowSupabaseModal(true)}
        onOpenMobileSyncModal={() => setShowMobileSyncModal(true)}
        onOpenPortingModal={() => setShowPortingModal(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {isAdmin ? (
          activeTab === 'dashboard' ? (
            <Dashboard
              onSelectRequest={(req) => setSelectedRequest(req)}
              onOpenNewModal={() => setShowNewModal(true)}
              onOpenExcelModal={() => setShowExcelModal(true)}
            />
          ) : (
            <AdminUserManagement />
          )
        ) : isDoctor ? (
          <DoctorPortalView
            onSelectRequest={(req) => setSelectedRequest(req)}
            onOpenNewModal={() => setShowNewModal(true)}
          />
        ) : (
          <EmployeeView
            onSelectRequest={(req) => setSelectedRequest(req)}
            onOpenNewModal={() => setShowNewModal(true)}
          />
        )}
      </main>

      {/* Modals & Slide-overs */}
      {showNewModal && (
        <NewDiscountModal onClose={() => setShowNewModal(false)} />
      )}

      {selectedRequest && (
        <RequestDetailModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequest(null)} 
        />
      )}

      {showExcelModal && (
        <ExcelReportModal onClose={() => setShowExcelModal(false)} />
      )}

      {showNotifDrawer && (
        <NotificationDrawer 
          onClose={() => setShowNotifDrawer(false)} 
          onOpenGatewayModal={() => setShowGatewayModal(true)}
        />
      )}

      {showSupabaseModal && (
        <SupabaseSettingsModal onClose={() => setShowSupabaseModal(false)} />
      )}

      {showGatewayModal && (
        <NotificationSettingsModal onClose={() => setShowGatewayModal(false)} />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showMobileSyncModal && (
        <MobileSyncModal onClose={() => setShowMobileSyncModal(false)} />
      )}

      {showPortingModal && (
        <PortingModal onClose={() => setShowPortingModal(false)} />
      )}

      {/* Mobile Bottom Navigation Bar (Thumb Accessible on Smartphones) */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-4 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 active:scale-95"
        >
          <PlusCircle className="w-4.5 h-4.5 stroke-[2.5]" />
          <span>Ask Discount</span>
        </button>

        <button
          onClick={() => setShowMobileSyncModal(true)}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-teal-300 text-[10px] font-bold py-1 active:scale-95"
        >
          <Smartphone className="w-5 h-5 text-teal-400" />
          <span>Sync</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 py-6 px-4 pb-16 md:pb-6 text-center text-xs text-slate-400 bg-slate-950/80">
        <p className="font-medium">
          Stavya Spine Hospital & Research Institute Pvt. Ltd. — Discount Permission & Approval System • Powered by Stavya Intelligence
        </p>
      </footer>

    </div>
  );
}

export default AppContent;
