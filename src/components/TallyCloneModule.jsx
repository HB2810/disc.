import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { generateTallyVoucherXml, parseTallyExportXml } from '../utils/tallyExporter';
import { 
  Calculator, 
  BookOpen, 
  FileText, 
  Layers, 
  PlusCircle, 
  RefreshCw, 
  Check, 
  ArrowLeft, 
  Search, 
  Download, 
  Upload,
  Calendar,
  Building2,
  DollarSign,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';

export const TallyCloneModule = ({ onClose }) => {
  const { requests, addRequest, triggerToast } = useApp();

  // Active Screen within Tally Clone Module: 
  // 'GATEWAY', 'VOUCHER_ENTRY', 'DAYBOOK', 'LEDGERS', 'TRIAL_BALANCE', 'P_AND_L', 'BALANCE_SHEET', 'XML_SYNC'
  const [currentScreen, setCurrentScreen] = useState('GATEWAY');

  // Ledger Master State
  const [ledgers, setLedgers] = useState([
    { id: 'L1', name: 'Hospital Discount Allowed Account', group: 'Indirect Expenses', balance: 0, type: 'Dr' },
    { id: 'L2', name: 'Sundry Debtors - OPD Patients', group: 'Sundry Debtors', balance: 0, type: 'Dr' },
    { id: 'L3', name: 'Hospital Services OPD Revenue', group: 'Direct Incomes', balance: 0, type: 'Cr' },
    { id: 'L4', name: 'State Bank of India (Hospital A/c)', group: 'Bank Accounts', balance: 450000, type: 'Dr' },
    { id: 'L5', name: 'Cash in Hand', group: 'Cash-in-hand', balance: 85000, type: 'Dr' }
  ]);

  // Vouchers List State (Pre-populated with approved Stavya Hospital discounts)
  const [vouchers, setVouchers] = useState(() => {
    const initial = [];
    // Convert approved discount requests to Tally Journal Vouchers
    requests.forEach((req, idx) => {
      const amt = Number(req.calculatedDiscountAmount || req.requestedDiscountValue || 0);
      const isApproved = req.status === 'APPROVED' || req.status?.startsWith('APPROVED');
      if (amt > 0 && isApproved) {
        initial.push({
          voucherNo: `STV-JRNL-${1000 + idx}`,
          date: req.createdAt ? new Date(req.createdAt).toISOString().split('T')[0] : '2026-09-14',
          voucherType: 'Journal',
          debitLedger: 'Hospital Discount Allowed Account',
          creditLedger: 'Sundry Debtors - OPD Patients',
          amount: amt,
          patientName: req.patientName,
          narration: `Discount granted to ${req.patientName} (${req.reasonCategory || 'Medical Grounds'}) as per Approval Ref ${req.requestCode}`,
          source: 'Stavya OPD Sync'
        });
      }
    });

    // Default sample Tally entries if none
    if (initial.length === 0) {
      initial.push({
        voucherNo: 'STV-JRNL-1001',
        date: '2026-09-14',
        voucherType: 'Journal',
        debitLedger: 'Hospital Discount Allowed Account',
        creditLedger: 'Sundry Debtors - OPD Patients',
        amount: 2500,
        patientName: 'Ramesh Patel',
        narration: 'OPD Spine Consultation Fee Concession Granted',
        source: 'Stavya OPD Sync'
      });
    }
    return initial;
  });

  // New Voucher Entry Form State
  const [voucherForm, setVoucherForm] = useState({
    voucherType: 'Journal', // Journal, Receipt, Payment, Sales
    date: new Date().toISOString().split('T')[0],
    debitLedger: 'Hospital Discount Allowed Account',
    creditLedger: 'Sundry Debtors - OPD Patients',
    amount: '',
    patientName: '',
    narration: ''
  });

  // Calculate live financial summary statistics
  const totals = useMemo(() => {
    let totalDiscounts = 0;
    let totalReceipts = 0;
    let totalSales = 0;

    vouchers.forEach(v => {
      const amt = Number(v.amount || 0);
      if (v.voucherType === 'Journal') totalDiscounts += amt;
      if (v.voucherType === 'Receipt') totalReceipts += amt;
      if (v.voucherType === 'Sales') totalSales += amt;
    });

    return { totalDiscounts, totalReceipts, totalSales };
  }, [vouchers]);

  // Handle adding custom Tally voucher
  const handleSaveVoucher = (e) => {
    e.preventDefault();
    if (!voucherForm.amount || Number(voucherForm.amount) <= 0) {
      triggerToast('Please enter a valid voucher amount.', 'warning');
      return;
    }

    const newVoucher = {
      voucherNo: `STV-${voucherForm.voucherType.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: voucherForm.date,
      voucherType: voucherForm.voucherType,
      debitLedger: voucherForm.debitLedger,
      creditLedger: voucherForm.creditLedger,
      amount: Number(voucherForm.amount),
      patientName: voucherForm.patientName || 'Walk-in Patient',
      narration: voucherForm.narration || `${voucherForm.voucherType} entry recorded in Tally Prime`,
      source: 'Tally Clone Manual Entry'
    };

    setVouchers([newVoucher, ...vouchers]);

    // Also sync to Stavya requests if it's a discount journal
    if (voucherForm.voucherType === 'Journal') {
      addRequest({
        requestCode: newVoucher.voucherNo,
        patientName: voucherForm.patientName || 'Tally Imported Patient',
        patientUhid: `STV-TALLY-${Math.floor(100 + Math.random() * 900)}`,
        contactNumber: '9898000000',
        doctorName: 'Dr. Bharat Dave',
        department: 'Spine Surgery',
        reasonCategory: 'Tally Accounting Sync',
        estimatedBillAmount: Number(voucherForm.amount) * 2,
        discountType: 'FLAT',
        requestedDiscountValue: Number(voucherForm.amount),
        calculatedDiscountAmount: Number(voucherForm.amount),
        justificationNotes: voucherForm.narration,
        status: 'APPROVED',
        currentApproverRole: 'ADMIN'
      });
    }

    triggerToast(`Tally Voucher ${newVoucher.voucherNo} posted & synced successfully!`, 'success');
    setVoucherForm({
      voucherType: 'Journal',
      date: new Date().toISOString().split('T')[0],
      debitLedger: 'Hospital Discount Allowed Account',
      creditLedger: 'Sundry Debtors - OPD Patients',
      amount: '',
      patientName: '',
      narration: ''
    });
    setCurrentScreen('DAYBOOK');
  };

  // Quick Sync all approved Stavya hospital discounts into Tally
  const handleSyncStavyaDiscounts = () => {
    let syncedCount = 0;
    const existingNos = new Set(vouchers.map(v => v.voucherNo));

    requests.forEach((req, idx) => {
      const isApproved = req.status === 'APPROVED' || req.status?.startsWith('APPROVED');
      const amt = Number(req.calculatedDiscountAmount || req.requestedDiscountValue || 0);
      const vNo = req.requestCode ? `TALLY-${req.requestCode}` : `STV-JRNL-${2000 + idx}`;

      if (isApproved && amt > 0 && !existingNos.has(vNo)) {
        vouchers.push({
          voucherNo: vNo,
          date: req.createdAt ? new Date(req.createdAt).toISOString().split('T')[0] : '2026-09-14',
          voucherType: 'Journal',
          debitLedger: 'Hospital Discount Allowed Account',
          creditLedger: 'Sundry Debtors - OPD Patients',
          amount: amt,
          patientName: req.patientName,
          narration: `Discount approval synced for ${req.patientName} (${req.department})`,
          source: 'Stavya Hospital OS Sync'
        });
        syncedCount++;
      }
    });

    setVouchers([...vouchers]);
    triggerToast(`Synced ${syncedCount} new approved discount vouchers into Tally DayBook!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-6xl max-h-[95vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-auto text-slate-100 font-sans">
        
        {/* Tally Top Bar (Classic Navy & Gold Tally Look) */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Calculator className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  Tally Prime v4.0 <span className="text-amber-400 font-serif text-sm">Enterprise Edition</span>
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700 font-bold uppercase tracking-wider">
                  Stavya Hospital Live Accounting Module
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Company: <strong className="text-amber-300">Stavya Spine Hospital Pvt Ltd (2026-2027)</strong> | Local Server Port: 9000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentScreen !== 'GATEWAY' && (
              <button
                onClick={() => setCurrentScreen('GATEWAY')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Gateway of Tally</span>
              </button>
            )}

            <button
              onClick={handleSyncStavyaDiscounts}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              title="Sync Approved Discounts to Tally"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Sync Discounts</span>
            </button>

            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs transition-all ml-2"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Action Shortcuts Bar (F1 - F12 Tally Bar) */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <button 
            onClick={() => setCurrentScreen('VOUCHER_ENTRY')} 
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-400 font-extrabold">F7:</span> Journal Voucher
          </button>
          <button 
            onClick={() => setCurrentScreen('DAYBOOK')} 
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-400 font-extrabold">D:</span> Day Book ({vouchers.length})
          </button>
          <button 
            onClick={() => setCurrentScreen('LEDGERS')} 
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-400 font-extrabold">L:</span> Chart of Accounts
          </button>
          <button 
            onClick={() => setCurrentScreen('TRIAL_BALANCE')} 
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-400 font-extrabold">T:</span> Trial Balance
          </button>
          <button 
            onClick={() => setCurrentScreen('P_AND_L')} 
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-400 font-extrabold">P:</span> Profit & Loss
          </button>
          <button 
            onClick={() => setCurrentScreen('BALANCE_SHEET')} 
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-400 font-extrabold">B:</span> Balance Sheet
          </button>
        </div>

        {/* Tally Main Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-950/60 min-h-[480px]">
          
          {/* SCREEN 1: GATEWAY OF TALLY */}
          {currentScreen === 'GATEWAY' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Panel: Company Status Summary */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-400">Current Status</h3>
                  <div className="mt-2 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Period:</span>
                      <span className="font-mono font-bold text-white">1-Apr-2026 to 31-Mar-2027</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Date:</span>
                      <span className="font-mono font-bold text-emerald-400">Monday, 14 Sep 2026</span>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-800 pb-3 space-y-2">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-400">Selected Company</h3>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-white block">Stavya Spine Hospital Pvt Ltd</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Date of Last Entry: 14-Sep-2026</span>
                  </div>
                </div>

                {/* Financial Overview Cards */}
                <div className="space-y-2 pt-1">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-400">Stavya OPD Sync Stats</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Discounts</span>
                      <span className="text-sm font-extrabold text-amber-400 font-mono">₹{totals.totalDiscounts.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Vouchers</span>
                      <span className="text-sm font-extrabold text-emerald-400 font-mono">{vouchers.length} Entries</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Classic GATEWAY OF TALLY Menu */}
              <div className="lg:col-span-7 bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-widest">
                  Gateway Menu
                </div>

                <div className="text-center border-b border-slate-800 pb-4 mb-4">
                  <h2 className="text-lg font-black text-white tracking-widest uppercase font-serif">
                    Gateway of Tally
                  </h2>
                  <p className="text-xs text-amber-400 font-medium">Stavya Hospital Accounting & Voucher Management</p>
                </div>

                {/* Menu Categories */}
                <div className="space-y-4 text-xs">
                  
                  {/* Category: Masters */}
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block mb-1">
                      MASTERS
                    </span>
                    <div className="space-y-1">
                      <button
                        onClick={() => setCurrentScreen('LEDGERS')}
                        className="w-full text-left px-4 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all flex items-center justify-between group"
                      >
                        <span><span className="text-amber-400 group-hover:text-slate-950 font-extrabold mr-2">C</span>reate Ledgers & Accounts</span>
                        <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>

                  {/* Category: Transactions */}
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block mb-1">
                      TRANSACTIONS
                    </span>
                    <div className="space-y-1">
                      <button
                        onClick={() => setCurrentScreen('VOUCHER_ENTRY')}
                        className="w-full text-left px-4 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all flex items-center justify-between group"
                      >
                        <span><span className="text-amber-400 group-hover:text-slate-950 font-extrabold mr-2">V</span>oucher Entry (Accounting Vouchers)</span>
                        <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        onClick={() => setCurrentScreen('DAYBOOK')}
                        className="w-full text-left px-4 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all flex items-center justify-between group"
                      >
                        <span><span className="text-amber-400 group-hover:text-slate-950 font-extrabold mr-2">D</span>ay Book Vouchers</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900 text-blue-300 font-mono">{vouchers.length}</span>
                      </button>
                    </div>
                  </div>

                  {/* Category: Reports */}
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block mb-1">
                      REPORTS
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setCurrentScreen('BALANCE_SHEET')}
                        className="text-left px-4 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all"
                      >
                        <span className="text-amber-400 group-hover:text-slate-950 font-extrabold mr-2">B</span>alance Sheet
                      </button>

                      <button
                        onClick={() => setCurrentScreen('P_AND_L')}
                        className="text-left px-4 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all"
                      >
                        <span className="text-amber-400 group-hover:text-slate-950 font-extrabold mr-2">P</span>rofit & Loss
                      </button>

                      <button
                        onClick={() => setCurrentScreen('TRIAL_BALANCE')}
                        className="text-left px-4 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all col-span-2"
                      >
                        <span className="text-amber-400 group-hover:text-slate-950 font-extrabold mr-2">T</span>rial Balance Sheet
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* SCREEN 2: VOUCHER CREATION ENTRY */}
          {currentScreen === 'VOUCHER_ENTRY' && (
            <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Accounting Voucher Creation</span>
                  <h3 className="text-lg font-black text-white">Create Tally Journal / Receipt Entry</h3>
                </div>

                <div className="flex gap-1.5">
                  {['Journal', 'Receipt', 'Payment', 'Sales'].map(vt => (
                    <button
                      key={vt}
                      type="button"
                      onClick={() => setVoucherForm({ ...voucherForm, voucherType: vt })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        voucherForm.voucherType === vt
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {vt}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveVoucher} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Voucher Date</label>
                    <input
                      type="date"
                      value={voucherForm.date}
                      onChange={e => setVoucherForm({ ...voucherForm, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Patient / Party Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={voucherForm.patientName}
                      onChange={e => setVoucherForm({ ...voucherForm, patientName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Dr / Cr Particulars Table */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Particulars (Debit & Credit Ledgers)</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-amber-400 font-bold mb-1 font-mono">By (Debit Ledger)</label>
                      <select
                        value={voucherForm.debitLedger}
                        onChange={e => setVoucherForm({ ...voucherForm, debitLedger: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-400"
                      >
                        {ledgers.map(l => (
                          <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-blue-400 font-bold mb-1 font-mono">To (Credit Ledger)</label>
                      <select
                        value={voucherForm.creditLedger}
                        onChange={e => setVoucherForm({ ...voucherForm, creditLedger: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-400"
                      >
                        {ledgers.map(l => (
                          <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-emerald-400 font-bold mb-1 font-mono">Voucher Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={voucherForm.amount}
                      onChange={e => setVoucherForm({ ...voucherForm, amount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-lg font-mono font-bold text-emerald-300 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Narration</label>
                  <textarea
                    rows={2}
                    placeholder="Enter voucher narration details..."
                    value={voucherForm.narration}
                    onChange={e => setVoucherForm({ ...voucherForm, narration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('GATEWAY')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    Post & Sync Voucher (Enter)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SCREEN 3: DAY BOOK VOUCHERS LIST */}
          {currentScreen === 'DAYBOOK' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Day Book Transactions</span>
                  <h3 className="text-base font-black text-white">Tally Day Book Vouchers ({vouchers.length})</h3>
                </div>

                <button
                  onClick={() => setCurrentScreen('VOUCHER_ENTRY')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Voucher (F7)</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto max-h-[440px] custom-scrollbar">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-mono font-bold text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Voucher No</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Particulars (Debit ➔ Credit)</th>
                        <th className="p-3">Patient / Party</th>
                        <th className="p-3 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {vouchers.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-850 transition-colors">
                          <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{v.date}</td>
                          <td className="p-3 font-mono font-bold text-amber-400 whitespace-nowrap">{v.voucherNo}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                              {v.voucherType}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-emerald-400 block">{v.debitLedger}</span>
                            <span className="text-[11px] text-slate-400 block">To {v.creditLedger}</span>
                            <span className="text-[10px] text-slate-500 italic block">{v.narration}</span>
                          </td>
                          <td className="p-3 font-bold text-slate-100 whitespace-nowrap">{v.patientName}</td>
                          <td className="p-3 text-right font-mono font-extrabold text-amber-300 text-sm whitespace-nowrap">
                            ₹{Number(v.amount).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: LEDGERS & CHART OF ACCOUNTS */}
          {currentScreen === 'LEDGERS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Chart of Accounts</span>
                  <h3 className="text-base font-black text-white">Tally Master Ledgers</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ledgers.map(l => (
                  <div key={l.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{l.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono mt-1 inline-block">
                        Group: {l.group}
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs text-slate-400 block">Balance</span>
                      <span className="text-sm font-extrabold text-amber-400">₹{l.balance.toLocaleString('en-IN')} {l.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 5: FINANCIAL REPORTS (BALANCE SHEET / P&L / TRIAL BALANCE) */}
          {(currentScreen === 'BALANCE_SHEET' || currentScreen === 'P_AND_L' || currentScreen === 'TRIAL_BALANCE') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Financial Statement</span>
                  <h3 className="text-lg font-black text-white uppercase tracking-wider font-serif">
                    {currentScreen.replace('_', ' ')}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">For Financial Year 2026-27</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-amber-400 uppercase font-mono font-bold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Particulars Account</th>
                      <th className="p-3 text-right">Debit (₹)</th>
                      <th className="p-3 text-right">Credit (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-3 font-bold text-white">Hospital Discount Allowed Account</td>
                      <td className="p-3 text-right font-mono text-emerald-400 font-bold">₹{totals.totalDiscounts.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono text-slate-500">-</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Sundry Debtors - OPD Patients</td>
                      <td className="p-3 text-right font-mono text-slate-500">-</td>
                      <td className="p-3 text-right font-mono text-amber-400 font-bold">₹{totals.totalDiscounts.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">State Bank of India (Hospital A/c)</td>
                      <td className="p-3 text-right font-mono text-emerald-400 font-bold">₹4,50,000</td>
                      <td className="p-3 text-right font-mono text-slate-500">-</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-950 border-t-2 border-amber-500 text-amber-300 font-mono font-black">
                    <tr>
                      <td className="p-3 uppercase">Total Balanced Figures</td>
                      <td className="p-3 text-right text-sm">₹{(totals.totalDiscounts + 450000).toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right text-sm">₹{(totals.totalDiscounts + 450000).toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Tally Prime Synchronized & Connected via HTTP XML Endpoint (Port 9000)</span>
          </div>

          <button
            onClick={() => setCurrentScreen('GATEWAY')}
            className="text-amber-400 hover:underline font-bold"
          >
            Press Esc / Back to Gateway
          </button>
        </div>

      </div>
    </div>
  );
};
