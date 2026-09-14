import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldAlert, 
  UserCheck, 
  PlusCircle, 
  FileSpreadsheet, 
  Bell, 
  Radio,
  Settings,
  Users,
  LogOut,
  RotateCcw,
  Smartphone,
  Globe,
  Link2,
  Cpu,
  Menu,
  X
} from 'lucide-react';

export const Header = ({ 
  onOpenNewModal, 
  onOpenExcelModal, 
  onOpenNotifDrawer, 
  onOpenSupabaseModal,
  onOpenMobileSyncModal,
  onOpenPortingModal,
  onOpenLoginModal,
  activeTab,
  setActiveTab 
}) => {
  const { users, activeUser, setActiveUser, notifications, supabaseConfig, logout, isBillingRole, getRoleMeta, resetSystemDefaults, manualSync } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBillingStaff = isBillingRole(activeUser?.role);
  const roleMeta = getRoleMeta(activeUser?.role);

  return (
    <header className="glass-panel sticky top-0 z-30 border-b border-slate-800/80 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand & Connection Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-sky-500/20 text-slate-950 font-extrabold flex-shrink-0">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-extrabold text-sm sm:text-lg text-slate-100 tracking-tight truncate">
                Stavya Spine Hospital
              </h1>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wide hidden sm:inline-block">
                Stavya Intelligence
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-teal-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-teal-400 pulse-badge"></span>
                <span className="hidden sm:inline">{supabaseConfig.isConnected ? 'Supabase Realtime' : 'Spine OPD System'}</span>
                <span className="sm:hidden">Online</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-cyan-300 hidden sm:inline">ID: #STAVYA-SPINE-9902</span>
            </div>
          </div>
        </div>

        {/* Center Tabs: Desktop Only */}
        {activeUser?.role === 'ADMIN' && (
          <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-sky-400 to-teal-300 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-slate-200 font-semibold'
              }`}
            >
              OPD Dashboard & Waivers
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-sky-400 to-teal-300 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-slate-200 font-semibold'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>User Directory & Roles</span>
            </button>
          </div>
        )}

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2 flex-wrap justify-end">
          
          {/* Active Logged-In User Session */}
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
            <UserCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block -mb-0.5">
                Active User Session
              </span>
              {activeUser?.role === 'ADMIN' ? (
                <select
                  value={activeUser?.id || activeUser?.role}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const targetUser = users.find(u => u.id === selectedId || u.role === selectedId || u.username === selectedId);
                    if (targetUser) {
                      setActiveUser(targetUser);
                    }
                  }}
                  className="bg-transparent text-xs font-extrabold text-teal-300 focus:outline-none cursor-pointer hover:text-teal-200 transition-colors max-w-[180px] truncate"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id} className="bg-slate-900 text-slate-100 font-sans">
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-xs font-extrabold text-teal-300 block max-w-[180px] truncate">
                  {activeUser?.name || 'Staff User'}
                </span>
              )}
            </div>
          </div>

          {/* New Request Button */}
          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            New Discount
          </button>

          {/* Export Excel Button */}
          {!isBillingStaff && (
            <button
              onClick={onOpenExcelModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold text-xs transition-all active:scale-95"
              title="Download Formatted Excel Report"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Excel</span>
            </button>
          )}

          {/* Mobile Sync Trigger Button */}
          <button
            onClick={onOpenMobileSyncModal}
            className="px-3 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Mobile Sync & QR Code"
          >
            <Smartphone className="w-4 h-4 text-teal-400" />
            <span>Mobile Sync</span>
          </button>

          {/* Port & API Integration Modal Button */}
          <button
            onClick={onOpenPortingModal}
            className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Software Migration, OpenAPI & REST Integration API"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Port & API</span>
          </button>

          {/* Quick Manual Sync Refresh Button */}
          <button
            onClick={() => {
              if (manualSync) manualSync();
            }}
            className="px-2.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-teal-300 border border-slate-800 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
            title="Instant Live Network Sync & Refresh"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
          </button>

          {/* Supabase Config Trigger (Admin Only) */}
          {activeUser?.role === 'ADMIN' && (
            <button
              onClick={onOpenSupabaseModal}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
              title="Supabase & Realtime Settings"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          {/* Live Notification Drawer Trigger */}
          <button
            onClick={onOpenNotifDrawer}
            className="relative p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            title="Live SMS & Email Activity Feed"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center animate-bounce">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Reset System Defaults (Admin Only) */}
          {activeUser?.role === 'ADMIN' && (
            <button
              onClick={() => {
                if (window.confirm('Reset all roles, services, and requests to default system configuration?')) {
                  resetSystemDefaults();
                }
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 border border-teal-500/30 transition-all"
              title="Reset System Data to Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all"
            title="Logout Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile View Right Controls (Notifications & Drawer Menu Toggle) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenNotifDrawer}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:scale-95"
          >
            <Bell className="w-4.5 h-4.5 text-amber-400" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-teal-300 active:scale-95"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 mt-2 border-t border-slate-800 space-y-3 animate-fadeIn">
          
          {/* Mobile Active User session badge */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <UserCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block -mb-0.5">Session User</span>
                <span className="text-xs font-bold text-teal-300 truncate block">{activeUser?.name}</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {activeUser?.role}
            </span>
          </div>

          {/* Admin Tabs Switcher for Admin role on Mobile */}
          {activeUser?.role === 'ADMIN' && (
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-bold ${activeTab === 'dashboard' ? 'bg-teal-400 text-slate-950' : 'text-slate-400'}`}
              >
                OPD Dashboard
              </button>
              <button
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-bold ${activeTab === 'admin' ? 'bg-teal-400 text-slate-950' : 'text-slate-400'}`}
              >
                User Directory
              </button>
            </div>
          )}

          {/* Grid of Action Buttons on Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => { onOpenNewModal(); setMobileMenuOpen(false); }}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Discount</span>
            </button>

            <button
              onClick={() => { onOpenMobileSyncModal(); setMobileMenuOpen(false); }}
              className="py-2.5 px-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Sync</span>
            </button>

            <button
              onClick={() => { onOpenPortingModal(); setMobileMenuOpen(false); }}
              className="py-2.5 px-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Cpu className="w-4 h-4" />
              <span>Port & API</span>
            </button>

            {!isBillingStaff && (
              <button
                onClick={() => { onOpenExcelModal(); setMobileMenuOpen(false); }}
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Excel</span>
              </button>
            )}

            <button
              onClick={() => { if (manualSync) manualSync(); setMobileMenuOpen(false); }}
              className="py-2.5 px-3 rounded-xl bg-slate-900 text-teal-300 border border-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-teal-400" />
              <span>Sync Refresh</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono">Stavya Spine Hospital OS v1.0</span>
            <button
              onClick={() => { logout(); setMobileMenuOpen(false); }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
