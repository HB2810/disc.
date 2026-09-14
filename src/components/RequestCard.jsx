import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  FileText, 
  UserCheck, 
  ChevronRight, 
  Download, 
  MessageSquare, 
  Lock,
  Building,
  IndianRupee,
  Sparkles,
  ArrowRight,
  Trash2
} from 'lucide-react';

export const RequestCard = ({ request, onSelect }) => {
  const { activeUser, approveRequest, rejectRequest, escalateRequest, deleteRequest } = useApp();
  const [showQuickReject, setShowQuickReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const isPending = request.status?.startsWith('PENDING');
  const isApproved = request.status === 'APPROVED';
  const isRejected = request.status === 'REJECTED';

  // Role permissions check for quick actions
  const userRole = activeUser?.role || '';
  const isBMgr = userRole === 'BILLING_MANAGER';
  const isCA = userRole === 'CHIEF_ACCOUNTANT';
  const isCFO = userRole === 'CFO';
  const isExecutive = ['CHAIRMAN', 'VICE_CHAIRMAN', 'MD'].includes(userRole);
  const isAdmin = userRole === 'ADMIN';

  const canBMgrAction = (isBMgr || isAdmin) && (request.status === 'PENDING_BMGR' || request.status === 'PENDING');
  const canCAAction = (isCA || isAdmin) && (request.status === 'PENDING_CA' || request.status === 'PENDING_BMGR' || request.status === 'PENDING');
  const canCFOAction = (isCFO || isAdmin) && (request.status === 'PENDING_CFO' || request.status === 'PENDING_CA' || request.status === 'PENDING_BMGR' || request.status === 'PENDING');
  const canExecAction = (isExecutive || isAdmin) && isPending;

  const canAction = canBMgrAction || canCAAction || canCFOAction || canExecAction;

  const handleConfirmReject = (e) => {
    e.stopPropagation();
    if (rejectRequest(request.id, rejectReason)) {
      setShowQuickReject(false);
      setRejectReason('');
    }
  };

  // Status text formatter
  const getStatusDisplay = () => {
    if (isApproved) return 'APPROVED';
    if (isRejected) return 'REJECTED';
    if (request.status === 'PENDING_BMGR') return 'PENDING MGR';
    if (request.status === 'PENDING_CA') return 'PENDING CA';
    if (request.status === 'PENDING_CFO') return 'PENDING CFO';
    if (request.status === 'PENDING_EXECUTIVE') return 'PENDING EXEC';
    return request.status || 'PENDING';
  };

  return (
    <div 
      onClick={() => onSelect(request)}
      className={`glass-card p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group bg-white ${
        isApproved 
          ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-md' 
          : isRejected 
          ? 'border-rose-200 hover:border-rose-400 hover:shadow-md' 
          : 'border-amber-200 hover:border-blue-400 hover:shadow-md'
      }`}
    >
      {/* Top Bar: Code & Status Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            #{request.requestCode}
          </span>
          {request.isDirectExecutiveGrant && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> Direct Grant
            </span>
          )}
        </div>

        {/* Status Pill & Admin Delete Button */}
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
            isApproved 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : isRejected 
              ? 'bg-rose-50 text-rose-800 border-rose-200' 
              : 'bg-amber-50 text-amber-800 border-amber-200 pulse-badge'
          }`}>
            {isApproved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            {isRejected && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            {isPending && <Clock className="w-3.5 h-3.5 text-amber-600" />}
            {getStatusDisplay()}
          </span>

          {activeUser && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Delete discount request #${request.requestCode} permanently?`)) {
                  deleteRequest(request.id);
                }
              }}
              className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all active:scale-95 ml-1"
              title="Remove Request"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Patient & Financial Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
              {request.patientName}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
              <span>ID: {request.patientId}</span>
              <span>•</span>
              <span>{request.department}</span>
              {request.serviceName && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {request.serviceName}
                  </span>
                </>
              )}
              {request.receiptNo && (
                <>
                  <span>•</span>
                  <span className="font-mono text-blue-600">Rcpt: {request.receiptNo}</span>
                </>
              )}
              {request.opdIpdNo && (
                <>
                  <span>•</span>
                  <span className="font-mono text-amber-700">{request.opdIpdNo}</span>
                </>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Requested Waiver</span>
            <span className="text-lg font-extrabold text-blue-600">
              {request.requestedDiscountVal}%
            </span>
          </div>
        </div>

        {/* Financial Numbers Bar */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Gross Bill</span>
            <span className="font-bold text-slate-800">₹{Number(request.totalBillAmount).toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] text-blue-600 uppercase font-semibold block">Waiver Amt</span>
            <span className="font-extrabold text-blue-600">-₹{Number(request.calculatedDiscountAmount).toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-600 uppercase font-semibold block">Net Payable</span>
            <span className="font-bold text-emerald-700">₹{Number(request.finalPayableAmount).toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Reason snippet */}
        <div className="text-xs text-slate-700 bg-slate-100/70 p-2.5 rounded-xl border border-slate-200 line-clamp-2">
          <strong className="text-slate-900 font-semibold">{request.reasonCategory}:</strong> {request.detailedReason}
        </div>
      </div>

      {/* Target Permission Level Info */}
      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Permission Level: <strong className="text-slate-800">{request.requiredAuthorityRole}</strong></span>
        </div>

        <span className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5">
          Details <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Quick Approver Action Strip (Shown when pending & user authorized) */}
      {isPending && canAction && (
        <div 
          onClick={e => e.stopPropagation()} 
          className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2"
        >
          {showQuickReject ? (
            <div className="w-full space-y-2">
              <input
                type="text"
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuickReject(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold whitespace-nowrap shadow-md"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowQuickReject(true)}
                className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0"
              >
                <XCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>Reject</span>
              </button>

              {(canBMgrAction && !isCA && !isCFO && !isExecutive) && (
                <button
                  type="button"
                  onClick={() => escalateRequest(request.id, 'CHIEF_ACCOUNTANT', 'Amount exceeds Billing Manager threshold. Escalating to Chief Accountant.')}
                  className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Escalate CA</span>
                </button>
              )}

              {(canCAAction && !isCFO && !isExecutive) && (
                <button
                  type="button"
                  onClick={() => escalateRequest(request.id, 'CFO', 'Amount is High. Chief Accountant escalating to CFO.')}
                  className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Escalate CFO</span>
                </button>
              )}

              {(canCFOAction && !isExecutive) && (
                <button
                  type="button"
                  onClick={() => escalateRequest(request.id, 'EXECUTIVE', 'Amount is Too High. CFO escalating to Executive Board.')}
                  className="py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Escalate MD</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => approveRequest(request.id, 'Approved via Quick Action')}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all active:scale-95 whitespace-nowrap ml-auto"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5] flex-shrink-0 text-white" />
                <span>Approve Now</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Signature badge if approved */}
      {isApproved && (
        <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Authorized by {request.approvedBy}</span>
        </div>
      )}
    </div>
  );
};
