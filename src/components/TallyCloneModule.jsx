import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  X,
  Sliders,
  Landmark,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  FolderPlus
} from 'lucide-react';

export const TallyCloneModule = ({ onClose }) => {
  const { requests, addRequest, triggerToast } = useApp();

  // Mode: 'PRIME' (Modern White/Blue) or 'CLASSIC' (Tally-clone-master Gold/Green UI)
  const [uiTheme, setUiTheme] = useState('CLASSIC');

  // Active Screen within Tally Clone Module: 
  // 'GATEWAY', 'VOUCHER_ENTRY', 'DAYBOOK', 'LEDGERS', 'CREATE_COMPANY', 'ACCOUNTS_INFO', 'INVENTORY_INFO', 'BANKING', 'GST_SETTINGS', 'TRIAL_BALANCE', 'P_AND_L', 'BALANCE_SHEET', 'RATIO_ANALYSIS'
  const [currentScreen, setCurrentScreen] = useState('GATEWAY');

  // Company Master State (persisted to localStorage 'createdCompany' like tally-clone-master)
  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem('createdCompany');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Stavya Spine Hospital Pvt Ltd',
      companyType: 'Hospital & Healthcare',
      about: 'Spine OPD & Surgical Super-Specialty Center',
      address: 'Near Near Gulbai Tekra, Ahmedabad, Gujarat',
      country: 'India',
      email: 'billing@stavyahospital.com',
      phone: '+91 79 2630 0000',
      currency: 'INR',
      decimals: 2
    };
  });

  // Company Creation Form State
  const [companyForm, setCompanyForm] = useState({
    name: '',
    companyType: 'Hospital Healthcare',
    about: '',
    address: '',
    country: 'India',
    email: '',
    phone: '',
    currency: 'INR',
    decimals: 2
  });

  // Ledger Master State
  const [ledgers, setLedgers] = useState(() => {
    try {
      const saved = localStorage.getItem('ledgers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'L1', name: 'Hospital Discount Allowed Account', group: 'Indirect Expenses', balance: 0, type: 'Dr' },
      { id: 'L2', name: 'Sundry Debtors - OPD Patients', group: 'Sundry Debtors', balance: 0, type: 'Dr' },
      { id: 'L3', name: 'Hospital Services OPD Revenue', group: 'Direct Incomes', balance: 0, type: 'Cr' },
      { id: 'L4', name: 'State Bank of India (Hospital A/c)', group: 'Bank Accounts', balance: 450000, type: 'Dr' },
      { id: 'L5', name: 'Cash in Hand', group: 'Cash-in-hand', balance: 85000, type: 'Dr' }
    ];
  });

  // New Ledger Form
  const [ledgerForm, setLedgerForm] = useState({ name: '', group: 'Indirect Expenses', balance: '', type: 'Dr' });

  // Vouchers List State (Synced with approved Stavya Hospital discounts)
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

  // Handle Save Company
  const handleSaveCompany = (e) => {
    e.preventDefault();
    if (!companyForm.name.trim()) return;
    setCompany(companyForm);
    localStorage.setItem('createdCompany', JSON.stringify(companyForm));
    triggerToast(`Company '${companyForm.name}' created in Tally Master!`, 'success');
    setCurrentScreen('GATEWAY');
  };

  // Handle Save Ledger
  const handleSaveLedger = (e) => {
    e.preventDefault();
    if (!ledgerForm.name.trim()) return;
    const newL = { id: `L${ledgers.length + 1}`, name: ledgerForm.name, group: ledgerForm.group, balance: Number(ledgerForm.balance || 0), type: ledgerForm.type };
    const updated = [...ledgers, newL];
    setLedgers(updated);
    localStorage.setItem('ledgers', JSON.stringify(updated));
    triggerToast(`Ledger '${ledgerForm.name}' created!`, 'success');
    setLedgerForm({ name: '', group: 'Indirect Expenses', balance: '', type: 'Dr' });
  };

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
      narration: voucherForm.narration || `${voucherForm.voucherType} entry recorded in Tally Master`,
      source: 'Tally Master Manual Entry'
    };

    setVouchers([newVoucher, ...vouchers]);

    // Also sync to Stavya requests if it's a discount journal
    if (voucherForm.voucherType === 'Journal') {
      addRequest({
        requestCode: newVoucher.voucherNo,
        patientName: voucherForm.patientName || 'Tally Patient',
        patientUhid: `STV-TALLY-${Math.floor(100 + Math.random() * 900)}`,
        contactNumber: '9898000000',
        doctorName: 'Dr. Bharat Dave',
        department: 'Spine Surgery',
        reasonCategory: 'Tally Master Sync',
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

  // Sync all approved Stavya hospital discounts into Tally
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`w-full max-w-6xl max-h-[96vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden my-auto font-sans ${
        uiTheme === 'CLASSIC' 
          ? 'bg-[#fff8dc] border-emerald-800 text-slate-900' 
          : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}>
        
        {/* Tally Master Top Bar */}
        <div className={`${
          uiTheme === 'CLASSIC' ? 'bg-[#014421] text-white' : 'bg-slate-950 text-white'
        } px-4 py-3 border-b flex items-center justify-between shadow-md`}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Calculator className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  Tally ERP 9 / Prime Master <span className="text-amber-300 font-serif text-sm">Hospital OS Edition</span>
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 border border-emerald-600 font-bold uppercase tracking-wider">
                  {uiTheme === 'CLASSIC' ? 'Classic ERP 9 Gold' : 'Prime Modern'}
                </span>
              </div>
              <p className="text-[11px] opacity-90">
                Company: <strong className="text-amber-300">{company?.name || 'Stavya Spine Hospital Pvt Ltd'}</strong> | Directory: <code className="font-mono text-amber-200">f:\Discount\Tally-clone-master</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Selector Toggle */}
            <button
              onClick={() => setUiTheme(uiTheme === 'CLASSIC' ? 'PRIME' : 'CLASSIC')}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all"
              title="Toggle Theme between Classic Tally ERP 9 and Modern Tally Prime"
            >
              <Sliders className="w-4 h-4" />
              <span>Switch UI: {uiTheme === 'CLASSIC' ? 'Modern Blue' : 'Classic Green/Gold'}</span>
            </button>

            {currentScreen !== 'GATEWAY' && (
              <button
                onClick={() => setCurrentScreen('GATEWAY')}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-amber-300 border border-emerald-600 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Gateway of Tally</span>
              </button>
            )}

            <button
              onClick={handleSyncStavyaDiscounts}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Sync Discounts</span>
            </button>

            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-white flex items-center justify-center font-bold text-xs transition-all ml-2"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Action Shortcuts Bar (F1 - F12 Tally Bar) */}
        <div className={`${
          uiTheme === 'CLASSIC' ? 'bg-[#01351a] text-slate-200' : 'bg-slate-900 text-slate-300'
        } border-b border-emerald-900/40 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none`}>
          <button 
            onClick={() => setCurrentScreen('VOUCHER_ENTRY')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">F7:</span> Accounting Vouchers
          </button>
          <button 
            onClick={() => setCurrentScreen('DAYBOOK')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">D:</span> Day Book ({vouchers.length})
          </button>
          <button 
            onClick={() => setCurrentScreen('ACCOUNTS_INFO')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">A:</span> Accounts Info
          </button>
          <button 
            onClick={() => setCurrentScreen('CREATE_COMPANY')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">F3:</span> Create Company
          </button>
          <button 
            onClick={() => setCurrentScreen('TRIAL_BALANCE')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">T:</span> Trial Balance
          </button>
          <button 
            onClick={() => setCurrentScreen('BALANCE_SHEET')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">B:</span> Balance Sheet
          </button>
          <button 
            onClick={() => setCurrentScreen('P_AND_L')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">P:</span> Profit & Loss
          </button>
          <button 
            onClick={() => setCurrentScreen('BANKING')} 
            className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-950 font-bold transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span className="text-amber-300 font-black">N:</span> Banking
          </button>
        </div>

        {/* Tally Main Content Body */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar min-h-[490px] ${
          uiTheme === 'CLASSIC' ? 'bg-[#fff8dc]' : 'bg-slate-950/60'
        }`}>
          
          {/* SCREEN 1: GATEWAY OF TALLY */}
          {currentScreen === 'GATEWAY' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Panel: Company Status Summary */}
              <div className={`lg:col-span-5 border rounded-2xl p-5 space-y-4 ${
                uiTheme === 'CLASSIC' 
                  ? 'bg-[#014421] text-white border-emerald-800' 
                  : 'bg-slate-900 text-slate-100 border-slate-800'
              }`}>
                <div className="border-b border-white/20 pb-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-300">Current Status</h3>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-80">Current Period:</span>
                      <span className="font-mono font-bold text-amber-200">1-Apr-2026 to 31-Mar-2027</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Current Date:</span>
                      <span className="font-mono font-bold text-emerald-300">Monday, 14 Sep 2026</span>
                    </div>
                  </div>
                </div>

                <div className="border-b border-white/20 pb-3 space-y-2">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-300">Selected Company</h3>
                  <div className={`p-3.5 rounded-xl border text-xs font-sans ${
                    uiTheme === 'CLASSIC' ? 'bg-[#e3ffe3] text-slate-900 border-emerald-400' : 'bg-slate-950 text-slate-100 border-slate-800'
                  }`}>
                    <span className="font-extrabold text-sm block">{company?.name || 'Stavya Spine Hospital Pvt Ltd'}</span>
                    <span className="text-[11px] opacity-80 block mt-0.5">Type: {company?.companyType || 'Hospital Healthcare'}</span>
                    <span className="text-[11px] opacity-80 block mt-0.5">Location: {company?.address || 'Ahmedabad, Gujarat'}</span>
                  </div>
                </div>

                {/* Company Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setCurrentScreen('CREATE_COMPANY')}
                    className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all text-center flex items-center justify-center gap-1"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>Create Company</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('ACCOUNTS_INFO')}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all text-center flex items-center justify-center gap-1"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>Accounts Info</span>
                  </button>
                </div>
              </div>

              {/* Right Panel: GATEWAY OF TALLY Menu (Classic Tally-clone-master Box) */}
              <div className={`lg:col-span-7 border-2 rounded-2xl p-6 shadow-2xl relative overflow-hidden ${
                uiTheme === 'CLASSIC'
                  ? 'bg-[#d6f1c6] border-emerald-800 text-slate-950'
                  : 'bg-slate-900 border-amber-500/40 text-slate-100'
              }`}>
                <div className="absolute top-0 right-0 bg-[#014421] text-amber-300 text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-xl tracking-widest">
                  Gateway of Tally
                </div>

                <div className="text-center border-b border-emerald-800/30 pb-4 mb-4">
                  <h2 className={`text-xl font-black tracking-widest uppercase font-serif ${
                    uiTheme === 'CLASSIC' ? 'text-[#014421]' : 'text-amber-400'
                  }`}>
                    Gateway of Tally
                  </h2>
                  <p className="text-xs font-bold opacity-80">Stavya Spine Hospital Integrated Accounting Module</p>
                </div>

                {/* Gateway Menu Categories */}
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Category: Masters */}
                  <div>
                    <span className="text-[11px] uppercase font-black tracking-wider text-[#014421] block mb-1">
                      MASTERS
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setCurrentScreen('ACCOUNTS_INFO')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm flex items-center justify-between group"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">A.</b> Accounts Info</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('INVENTORY_INFO')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm flex items-center justify-between group"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">I.</b> Inventory Info</span>
                      </button>
                    </div>
                  </div>

                  {/* Category: Transactions */}
                  <div>
                    <span className="text-[11px] uppercase font-black tracking-wider text-[#014421] block mb-1">
                      TRANSACTIONS
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setCurrentScreen('VOUCHER_ENTRY')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm flex items-center justify-between group"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">V.</b> Accounting Vouchers</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('DAYBOOK')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm flex items-center justify-between group"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">D.</b> Day Book ({vouchers.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Category: Utilities */}
                  <div>
                    <span className="text-[11px] uppercase font-black tracking-wider text-[#014421] block mb-1">
                      UTILITIES & BANKING
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setCurrentScreen('BANKING')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">N.</b> Banking & Reconcile</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('GST_SETTINGS')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">G.</b> GST Configuration</span>
                      </button>
                    </div>
                  </div>

                  {/* Category: Reports */}
                  <div>
                    <span className="text-[11px] uppercase font-black tracking-wider text-[#014421] block mb-1">
                      REPORTS
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setCurrentScreen('BALANCE_SHEET')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">B.</b> Balance Sheet</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('P_AND_L')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">P.</b> Profit & Loss A/c</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('TRIAL_BALANCE')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">T.</b> Trial Balance</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('RATIO_ANALYSIS')}
                        className="text-left px-4 py-2.5 rounded-xl bg-white hover:bg-[#014421] hover:text-white font-bold transition-all border border-emerald-800/20 shadow-sm"
                      >
                        <span><b className="text-amber-600 group-hover:text-amber-300 mr-2 font-mono">R.</b> Ratio Analysis</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* SCREEN 2: CREATE COMPANY FORM */}
          {currentScreen === 'CREATE_COMPANY' && (
            <div className="max-w-3xl mx-auto bg-white border border-emerald-800 rounded-2xl p-6 space-y-6 shadow-2xl text-slate-900">
              <div className="border-b border-emerald-800/20 pb-3 flex justify-between items-center">
                <h3 className="text-lg font-black text-[#014421]">Company Creation Master</h3>
                <span className="text-xs font-mono font-bold text-slate-500">Directory: C:\Users\Public\Tally.ERP9\Data</span>
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })}
                      placeholder="e.g. Stavya Spine Hospital Pvt Ltd"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Industry Type</label>
                    <input
                      type="text"
                      value={companyForm.companyType}
                      onChange={e => setCompanyForm({ ...companyForm, companyType: e.target.value })}
                      placeholder="Healthcare & Medical"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={e => setCompanyForm({ ...companyForm, address: e.target.value })}
                    placeholder="Gulbai Tekra, Ahmedabad, Gujarat"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country</label>
                    <select
                      value={companyForm.country}
                      onChange={e => setCompanyForm({ ...companyForm, country: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-medium"
                    >
                      <option value="India">India</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="UAE">UAE</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Currency Symbol</label>
                    <input
                      type="text"
                      value={companyForm.currency}
                      onChange={e => setCompanyForm({ ...companyForm, currency: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={e => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('GATEWAY')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#014421] hover:bg-emerald-900 text-white font-extrabold shadow-md active:scale-95 transition-all"
                  >
                    Save Company Master
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SCREEN 3: ACCOUNTS INFO MASTER */}
          {currentScreen === 'ACCOUNTS_INFO' && (
            <div className="space-y-6">
              <div className="bg-white border border-emerald-800 rounded-2xl p-6 space-y-4 shadow-xl text-slate-900">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-black text-[#014421]">Accounts Info - Ledgers Master</h3>
                    <p className="text-xs text-slate-500">Create, edit and display Tally Ledger Chart of Accounts</p>
                  </div>
                </div>

                <form onSubmit={handleSaveLedger} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ledger Name</label>
                    <input
                      type="text"
                      placeholder="e.g. OPD Consultation Income"
                      value={ledgerForm.name}
                      onChange={e => setLedgerForm({ ...ledgerForm, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Group Under</label>
                    <select
                      value={ledgerForm.group}
                      onChange={e => setLedgerForm({ ...ledgerForm, group: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                    >
                      <option value="Indirect Expenses">Indirect Expenses</option>
                      <option value="Sundry Debtors">Sundry Debtors</option>
                      <option value="Direct Incomes">Direct Incomes</option>
                      <option value="Bank Accounts">Bank Accounts</option>
                      <option value="Cash-in-hand">Cash-in-hand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Opening Balance (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={ledgerForm.balance}
                      onChange={e => setLedgerForm({ ...ledgerForm, balance: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-[#014421] text-white font-extrabold shadow-md active:scale-95"
                    >
                      Add Ledger
                    </button>
                  </div>
                </form>

                {/* Ledgers List */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Ledger Name</th>
                        <th className="p-3">Group</th>
                        <th className="p-3 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {ledgers.map(l => (
                        <tr key={l.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{l.name}</td>
                          <td className="p-3 text-slate-600">{l.group}</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-700">₹{Number(l.balance || 0).toLocaleString('en-IN')} {l.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: VOUCHER CREATION ENTRY */}
          {currentScreen === 'VOUCHER_ENTRY' && (
            <div className="max-w-3xl mx-auto bg-white border border-emerald-800 rounded-2xl p-6 space-y-6 shadow-2xl text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#014421] tracking-wider">Accounting Voucher Creation</span>
                  <h3 className="text-lg font-black text-slate-900">Create Tally Journal / Receipt Entry</h3>
                </div>

                <div className="flex gap-1.5">
                  {['Journal', 'Receipt', 'Payment', 'Sales'].map(vt => (
                    <button
                      key={vt}
                      type="button"
                      onClick={() => setVoucherForm({ ...voucherForm, voucherType: vt })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        voucherForm.voucherType === vt
                          ? 'bg-[#014421] text-white font-black'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                    <label className="block font-bold text-slate-700 mb-1">Voucher Date</label>
                    <input
                      type="date"
                      value={voucherForm.date}
                      onChange={e => setVoucherForm({ ...voucherForm, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Patient / Party Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      value={voucherForm.patientName}
                      onChange={e => setVoucherForm({ ...voucherForm, patientName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Particulars Table */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Particulars (Debit & Credit Ledgers)</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#014421] mb-1 font-mono">By (Debit Ledger)</label>
                      <select
                        value={voucherForm.debitLedger}
                        onChange={e => setVoucherForm({ ...voucherForm, debitLedger: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                      >
                        {ledgers.map(l => (
                          <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-blue-700 mb-1 font-mono">To (Credit Ledger)</label>
                      <select
                        value={voucherForm.creditLedger}
                        onChange={e => setVoucherForm({ ...voucherForm, creditLedger: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                      >
                        {ledgers.map(l => (
                          <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-700 mb-1 font-mono">Voucher Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={voucherForm.amount}
                      onChange={e => setVoucherForm({ ...voucherForm, amount: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-lg font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Narration</label>
                  <textarea
                    rows={2}
                    placeholder="Enter voucher narration details..."
                    value={voucherForm.narration}
                    onChange={e => setVoucherForm({ ...voucherForm, narration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('GATEWAY')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#014421] hover:bg-emerald-900 text-white font-extrabold shadow-md active:scale-95 transition-all"
                  >
                    Post & Sync Voucher (Enter)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SCREEN 5: DAY BOOK */}
          {currentScreen === 'DAYBOOK' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#014421] tracking-wider">Day Book Transactions</span>
                  <h3 className="text-base font-black text-slate-900">Tally Day Book Vouchers ({vouchers.length})</h3>
                </div>

                <button
                  onClick={() => setCurrentScreen('VOUCHER_ENTRY')}
                  className="px-4 py-2 rounded-xl bg-[#014421] hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Voucher (F7)</span>
                </button>
              </div>

              <div className="bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto max-h-[440px] custom-scrollbar">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#014421] text-white uppercase font-mono font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Voucher No</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Particulars (Debit ➔ Credit)</th>
                        <th className="p-3">Patient / Party</th>
                        <th className="p-3 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-900">
                      {vouchers.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono text-slate-600 whitespace-nowrap">{v.date}</td>
                          <td className="p-3 font-mono font-bold text-blue-700 whitespace-nowrap">{v.voucherNo}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              {v.voucherType}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-emerald-800 block">{v.debitLedger}</span>
                            <span className="text-[11px] text-slate-500 block">To {v.creditLedger}</span>
                            <span className="text-[10px] text-slate-400 italic block">{v.narration}</span>
                          </td>
                          <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{v.patientName}</td>
                          <td className="p-3 text-right font-mono font-extrabold text-emerald-800 text-sm whitespace-nowrap">
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

          {/* SCREEN 6: REPORTS & STATEMENTS */}
          {(currentScreen === 'BALANCE_SHEET' || currentScreen === 'P_AND_L' || currentScreen === 'TRIAL_BALANCE' || currentScreen === 'RATIO_ANALYSIS' || currentScreen === 'BANKING') && (
            <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-xl text-slate-900">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#014421] tracking-wider">Financial Master Statement</span>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider font-serif">
                    {currentScreen.replace('_', ' ')}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">Financial Year 2026-27</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#014421] text-white uppercase font-mono font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Particulars Account</th>
                      <th className="p-3 text-right">Debit (₹)</th>
                      <th className="p-3 text-right">Credit (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Hospital Discount Allowed Account</td>
                      <td className="p-3 text-right font-mono text-emerald-700 font-bold">₹{totals.totalDiscounts.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono text-slate-400">-</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Sundry Debtors - OPD Patients</td>
                      <td className="p-3 text-right font-mono text-slate-400">-</td>
                      <td className="p-3 text-right font-mono text-emerald-700 font-bold">₹{totals.totalDiscounts.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">State Bank of India (Hospital A/c)</td>
                      <td className="p-3 text-right font-mono text-emerald-700 font-bold">₹4,50,000</td>
                      <td className="p-3 text-right font-mono text-slate-400">-</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-[#014421] text-[#014421] font-mono font-black">
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
        <div className={`${
          uiTheme === 'CLASSIC' ? 'bg-[#014421] text-white' : 'bg-slate-950 text-white'
        } px-4 py-2.5 border-t border-emerald-900 text-[11px] flex items-center justify-between shadow-inner`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Tally ERP 9 / Prime Master Synchronized with Stavya Hospital OS</span>
          </div>

          <button
            onClick={() => setCurrentScreen('GATEWAY')}
            className="text-amber-300 hover:underline font-bold"
          >
            Press Esc / Back to Gateway
          </button>
        </div>

      </div>
    </div>
  );
};
