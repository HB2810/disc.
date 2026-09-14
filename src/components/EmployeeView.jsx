import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RequestCard } from './RequestCard';
import { 
  PlusCircle, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  UserCheck, 
  Building, 
  ShieldAlert,
  Inbox,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EmployeeView = ({ onSelectRequest, onOpenNewModal }) => {
  const { requests, activeUser, isBillingRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const getDeskInfo = () => {
    switch (activeUser?.role) {
      case 'CFO':
        return {
          badge: 'Executive Finance Desk (CFO)',
          title: 'CFO Concession & Approval Hub',
          desc: 'Review and approve discount permission requests above ₹25,000/- up to ₹2,00,000/-.'
        };
      case 'CHIEF_ACCOUNTANT':
        return {
          badge: 'Chief Accountant Desk',
          title: 'Chief Accountant Approval Portal',
          desc: 'Review standard discount requests (Up to ₹25,000/-) submitted by billing officers.'
        };
      case 'MD':
      case 'EXECUTIVE':
      case 'CHAIRMAN':
      case 'VICE_CHAIRMAN':
      case 'DIRECTOR':
        return {
          badge: 'Executive Board Desk',
          title: 'Managing Director & Executive Board Portal',
          desc: 'Review high-value requests (> ₹2,00,000/-) or issue direct patient discount grants.'
        };
      default:
        return {
          badge: 'Billing & Counter Operations Desk',
          title: `Welcome, ${activeUser.name}`,
          desc: 'Submit patient discount requests at billing payment time (Chief Accountant ➔ CFO ➔ MD/Chairman) & receive live direct grants.'
        };
    }
  };

  const deskInfo = getDeskInfo();

  // Filter requests relevant to employee (receptionist, clerk, manager, CA, CFO, MD)
  const employeeRequests = requests.filter(r => {
    const isRelevant = 
      (activeUser?.name && r.requestedBy?.includes(activeUser.name)) ||
      r.currentApproverRole === activeUser?.role ||
      r.requiredAuthorityRole === activeUser?.role ||
      (activeUser?.role && r.status?.includes(activeUser?.role)) ||
      isBillingRole(activeUser?.role) ||
      r.isDirectExecutiveGrant;

    const matchesSearch = (
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.requestCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter || (statusFilter === 'APPROVED' && r.status === 'APPROVED');

    return isRelevant && matchesSearch && matchesStatus;
  });

  const pendingCount = employeeRequests.filter(r => r.status?.startsWith('PENDING')).length;
  const approvedCount = employeeRequests.filter(r => r.status === 'APPROVED').length;
  const rejectedCount = employeeRequests.filter(r => r.status === 'REJECTED').length;
  const directGrantCount = employeeRequests.filter(r => r.isDirectExecutiveGrant).length;

  return (
    <div className="space-y-6">
      
      {/* Top Billing Department Desk Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-teal-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/40">
                {deskInfo.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {activeUser.username || activeUser.email || activeUser.id}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100 mt-1">
              {deskInfo.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {deskInfo.desc}
            </p>
          </div>

          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 hover:from-teal-400 hover:to-emerald-400 transition-all active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            Ask Discount at Billing
          </button>
        </div>
      </div>

      {/* Direct Executive Discount Live Alert Notice */}
      {directGrantCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-amber-200 block">
                {directGrantCount} Direct Executive Discount Grant(s) Active on Billing Desk!
              </span>
              <p className="text-[11px] text-amber-300/80">
                Chairman, Vice Chairman, or MD issued direct discounts directly to patients. Apply immediately during payment settlement.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Ready to Apply
          </span>
        </div>
      )}

      {/* Quick Status Pill Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 block truncate">Pending</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-300">{pendingCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-amber-400/80 font-bold uppercase hidden sm:inline">CA / CFO / Exec</span>
        </div>

        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 block truncate">Approved</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-400">{approvedCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-emerald-400/80 font-bold uppercase hidden sm:inline">Ready for Bill</span>
        </div>

        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 block truncate">Direct Exec</span>
              <span className="text-lg sm:text-xl font-extrabold text-purple-300">{directGrantCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-purple-400/80 font-bold uppercase hidden sm:inline">Chairman/MD</span>
        </div>

        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold flex-shrink-0">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 block truncate">Rejected</span>
              <span className="text-lg sm:text-xl font-extrabold text-rose-400">{rejectedCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-rose-400/80 font-bold uppercase hidden sm:inline">Declined</span>
        </div>
      </div>

      {/* Search & Touch-Friendly Status Filter Carousel */}
      <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search patient name, ID, or request code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto overflow-x-auto no-scrollbar scroll-px-2">
            {['ALL', 'PENDING_CA', 'PENDING_CFO', 'PENDING_EXECUTIVE', 'APPROVED', 'REJECTED'].map(st => {
              let label = 'All';
              if (st === 'PENDING_CA') label = 'Pending CA';
              if (st === 'PENDING_CFO') label = 'Pending CFO';
              if (st === 'PENDING_EXECUTIVE') label = 'Executive';
              if (st === 'APPROVED') label = 'Approved';
              if (st === 'REJECTED') label = 'Rejected';
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 whitespace-nowrap min-w-max ${
                    statusFilter === st 
                      ? 'bg-teal-500 text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      {employeeRequests.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-800">
          <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="font-bold text-slate-300">No discount requests found</h4>
          <p className="text-xs text-slate-500 mt-1">Click "Ask Discount at Billing" to submit a new waiver for Chief Accountant & CFO permission.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {employeeRequests.map(req => (
            <RequestCard key={req.id} request={req} onSelect={onSelectRequest} />
          ))}
        </div>
      )}

    </div>
  );
};
