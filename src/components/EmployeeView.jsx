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
  const { requests, activeUser, isExecutiveRole } = useApp();
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
          desc: 'Submit patient discount requests at billing payment time & track status of your submitted requests.'
        };
    }
  };

  const deskInfo = getDeskInfo();

  // Filter requests with user data isolation (non-executives see ONLY their own data)
  const employeeRequests = requests.filter(r => {
    const isExecutive = isExecutiveRole(activeUser?.role);
    
    let isRelevant = false;
    if (isExecutive) {
      // Executive management roles (MD, CFO, Chairman, Vice Chairman, Director, Finance Manager) see all data
      isRelevant = true;
    } else {
      // Billing & Counter Operations Desk (Receptionists/Clerks) see ONLY their own data
      const reqBy = (r.requestedBy || '').toLowerCase();
      const userName = (activeUser?.name || '').toLowerCase();
      const userUsername = (activeUser?.username || '').toLowerCase();
      const userId = (activeUser?.id || '').toLowerCase();

      isRelevant = (
        (userName && reqBy.includes(userName)) ||
        (userUsername && reqBy.includes(userUsername)) ||
        (userId && reqBy.includes(userId))
      );
    }

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
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-blue-200 bg-gradient-to-r from-white via-blue-50/60 to-blue-100/40 relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                {deskInfo.badge}
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: {activeUser.username || activeUser.email || activeUser.id}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              {deskInfo.title}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {deskInfo.desc}
            </p>
          </div>

          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            Ask Discount at Billing
          </button>
        </div>
      </div>

      {/* Direct Executive Discount Live Alert Notice */}
      {directGrantCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-amber-900 block">
                {directGrantCount} Direct Executive Discount Grant(s) Active on Billing Desk!
              </span>
              <p className="text-[11px] text-amber-700">
                Chairman, Vice Chairman, or MD issued direct discounts directly to patients. Apply immediately during payment settlement.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
            Ready to Apply
          </span>
        </div>
      )}

      {/* Quick Status Pill Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-amber-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Pending</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-700">{pendingCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-amber-700 font-bold uppercase hidden sm:inline">CA / CFO / Exec</span>
        </div>

        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-emerald-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Approved</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700">{approvedCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold uppercase hidden sm:inline">Ready for Bill</span>
        </div>

        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-indigo-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Direct Exec</span>
              <span className="text-lg sm:text-xl font-extrabold text-indigo-700">{directGrantCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-indigo-700 font-bold uppercase hidden sm:inline">Chairman/MD</span>
        </div>

        <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-rose-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold flex-shrink-0">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Rejected</span>
              <span className="text-lg sm:text-xl font-extrabold text-rose-700">{rejectedCount}</span>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-rose-700 font-bold uppercase hidden sm:inline">Declined</span>
        </div>
      </div>

      {/* Search & Touch-Friendly Status Filter Carousel */}
      <div className="glass-card p-3.5 sm:p-4 rounded-2xl border border-slate-200 space-y-3 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search patient name, ID, or request code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto overflow-x-auto no-scrollbar scroll-px-2">
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
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
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
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-200 bg-white">
          <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700">No discount requests found</h4>
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
