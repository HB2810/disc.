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
  FolderPlus,
  Printer,
  Package,
  CreditCard
} from 'lucide-react';

export const TallyCloneModule = ({ onClose }) => {
  const { requests, addRequest, triggerToast } = useApp();

  // Mode: 'CLASSIC' (Original Tally ERP 9 Gold/Green UI) or 'PRIME' (Modern Tally Prime)
  const [uiTheme, setUiTheme] = useState('CLASSIC');

  // Active Screen: 
  // 'GATEWAY', 'VOUCHER_ENTRY', 'DAYBOOK', 'ACCOUNTS_INFO', 'LEDGER_CREATE', 'INVENTORY_INFO', 'STOCK_CREATE', 'STOCK_SUMMARY', 'CREATE_COMPANY', 'BANKING', 'GST_SETTINGS', 'TRIAL_BALANCE', 'P_AND_L', 'BALANCE_SHEET', 'RATIO_ANALYSIS'
  const [currentScreen, setCurrentScreen] = useState('GATEWAY');

  // Selected item index in Gateway Menu for keyboard navigation
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  // Active Voucher Type for Voucher Entry: 'Journal' (F7), 'Receipt' (F6), 'Payment' (F5), 'Contra' (F4), 'Sales' (F8), 'Purchase' (F9)
  const [activeVoucherType, setActiveVoucherType] = useState('Journal');

  // Company Master State (persisted to localStorage 'createdCompany' like tally-clone-master)
  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem('createdCompany');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Stavya Spine Hospital Pvt Ltd',
      companyType: 'Hospital Healthcare',
      about: 'Spine OPD & Surgical Super-Specialty Center',
      address: 'Near Gulbai Tekra, Ahmedabad, Gujarat',
      country: 'India',
      email: 'billing@stavyahospital.com',
      phone: '+91 79 2630 0000',
      currency: 'INR',
      decimals: 2
    };
  });

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    name: company?.name || 'Stavya Spine Hospital Pvt Ltd',
    companyType: company?.companyType || 'Hospital Healthcare',
    about: company?.about || '',
    address: company?.address || 'Ahmedabad, Gujarat',
    country: company?.country || 'India',
    email: company?.email || '',
    phone: company?.phone || '',
    currency: company?.currency || 'INR',
    decimals: company?.decimals || 2
  });

  // Master Ledgers State (persisted in localStorage 'ledgers')
  const [ledgers, setLedgers] = useState(() => {
    try {
      const saved = localStorage.getItem('ledgers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'L1', name: 'Hospital Discount Allowed Account', group: 'Indirect Expenses', balance: 15000, type: 'Dr' },
      { id: 'L2', name: 'Sundry Debtors - OPD Patients', group: 'Sundry Debtors', balance: 85000, type: 'Dr' },
      { id: 'L3', name: 'Hospital Services OPD Revenue', group: 'Direct Incomes', balance: 450000, type: 'Cr' },
      { id: 'L4', name: 'State Bank of India (Hospital A/c)', group: 'Bank Accounts', balance: 650000, type: 'Dr' },
      { id: 'L5', name: 'Cash in Hand', group: 'Cash-in-hand', balance: 45000, type: 'Dr' }
    ];
  });

  // New Ledger Form
  const [ledgerForm, setLedgerForm] = useState({ name: '', group: 'Indirect Expenses', balance: '', type: 'Dr' });

  // Inventory Stock Items State (persisted in localStorage 'stockItems')
  const [stockItems, setStockItems] = useState(() => {
    try {
      const saved = localStorage.getItem('stockItems');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { name: 'Spine Surgical Implant Set', qty: 25, unit: 'Set', rate: 45000, category: 'Implants' },
      { name: 'OPD Prescription Consultation Card', qty: 500, unit: 'Nos', rate: 500, category: 'Stationery' },
      { name: 'Spine MRI Scanning Requisition Slip', qty: 200, unit: 'Pcs', rate: 3500, category: 'Services' },
      { name: 'Physiotherapy Session Package', qty: 60, unit: 'Package', rate: 1200, category: 'Therapy' }
    ];
  });

  // New Stock Form
  const [stockForm, setStockForm] = useState({ name: '', qty: '', unit: 'Nos', rate: '', category: 'Implants' });

  // GST Configuration State
  const [gstConfig, setGstConfig] = useState({
    gstin: '24AAAAA0000A1Z5',
    state: 'Gujarat',
    type: 'Regular',
    applicableDate: '2026-04-01',
    hsnCode: '999312'
  });

  // Vouchers List State (Synced with approved Stavya Hospital discounts)
  const [vouchers, setVouchers] = useState(() => {
    try {
      const saved = localStorage.getItem('vouchers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    const initial = [];
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
          narration: `Discount approval granted to ${req.patientName} (${req.reasonCategory || 'Medical Grounds'}) Ref ${req.requestCode}`,
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

  // Save vouchers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vouchers', JSON.stringify(vouchers));
    } catch (e) {}
  }, [vouchers]);

  // New Voucher Entry Form State
  const [voucherForm, setVoucherForm] = useState({
    voucherType: 'Journal',
    date: new Date().toISOString().split('T')[0],
    debitLedger: 'Hospital Discount Allowed Account',
    creditLedger: 'Sundry Debtors - OPD Patients',
    amount: '',
    patientName: '',
    narration: ''
  });

  // Gateway Menu Items Structure (Original Tally ERP 9)
  const menuItems = [
    { section: 'MASTERS', items: [
      { name: 'Accounts Info.', hotkey: 'A', screen: 'ACCOUNTS_INFO' },
      { name: 'Inventory Info.', hotkey: 'I', screen: 'INVENTORY_INFO' }
    ]},
    { section: 'TRANSACTIONS', items: [
      { name: 'Accounting Vouchers', hotkey: 'V', screen: 'VOUCHER_ENTRY' },
      { name: 'Day Book', hotkey: 'D', screen: 'DAYBOOK' }
    ]},
    { section: 'UTILITIES & BANKING', items: [
      { name: 'Banking & Reconcile', hotkey: 'N', screen: 'BANKING' },
      { name: 'GST Settings', hotkey: 'G', screen: 'GST_SETTINGS' }
    ]},
    { section: 'REPORTS', items: [
      { name: 'Balance Sheet', hotkey: 'B', screen: 'BALANCE_SHEET' },
      { name: 'Profit & Loss A/c', hotkey: 'P', screen: 'P_AND_L' },
      { name: 'Stock Summary', hotkey: 'S', screen: 'STOCK_SUMMARY' },
      { name: 'Ratio Analysis', hotkey: 'R', screen: 'RATIO_ANALYSIS' },
      { name: 'Trial Balance', hotkey: 'T', screen: 'TRIAL_BALANCE' }
    ]},
    { section: '', items: [
      { name: 'Quit', hotkey: 'Q', screen: 'QUIT' }
    ]}
  ];

  // Flatten menu items for keyboard arrow navigation
  const flatMenu = useMemo(() => {
    const list = [];
    menuItems.forEach(sec => sec.items.forEach(item => list.push(item)));
    return list;
  }, []);

  // Keyboard Hotkey Listener (Original Tally ERP 9 style)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore keybindings if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();

      if (e.key === 'Escape') {
        if (currentScreen === 'GATEWAY') {
          onClose();
        } else {
          setCurrentScreen('GATEWAY');
        }
        return;
      }

      if (currentScreen === 'GATEWAY') {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedMenuItem(prev => (prev + 1) % flatMenu.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedMenuItem(prev => (prev - 1 + flatMenu.length) % flatMenu.length);
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const target = flatMenu[selectedMenuItem];
          if (target) handleMenuClick(target);
          return;
        }

        // Direct Hotkey Triggers (A, I, V, D, B, P, S, R, T, N, G, Q)
        const matched = flatMenu.find(m => m.hotkey === key);
        if (matched) {
          e.preventDefault();
          handleMenuClick(matched);
          return;
        }
      }

      // Function Keys (F1 - F12)
      if (e.key === 'F1') { e.preventDefault(); setCurrentScreen('CREATE_COMPANY'); }
      if (e.key === 'F2') { e.preventDefault(); triggerToast('Current Date set to 14-Sep-2026', 'info'); }
      if (e.key === 'F3') { e.preventDefault(); setCurrentScreen('CREATE_COMPANY'); }
      if (e.key === 'F4') { e.preventDefault(); setActiveVoucherType('Contra'); setVoucherForm(f => ({ ...f, voucherType: 'Contra' })); setCurrentScreen('VOUCHER_ENTRY'); }
      if (e.key === 'F5') { e.preventDefault(); setActiveVoucherType('Payment'); setVoucherForm(f => ({ ...f, voucherType: 'Payment' })); setCurrentScreen('VOUCHER_ENTRY'); }
      if (e.key === 'F6') { e.preventDefault(); setActiveVoucherType('Receipt'); setVoucherForm(f => ({ ...f, voucherType: 'Receipt' })); setCurrentScreen('VOUCHER_ENTRY'); }
      if (e.key === 'F7') { e.preventDefault(); setActiveVoucherType('Journal'); setVoucherForm(f => ({ ...f, voucherType: 'Journal' })); setCurrentScreen('VOUCHER_ENTRY'); }
      if (e.key === 'F8') { e.preventDefault(); setActiveVoucherType('Sales'); setVoucherForm(f => ({ ...f, voucherType: 'Sales' })); setCurrentScreen('VOUCHER_ENTRY'); }
      if (e.key === 'F9') { e.preventDefault(); setActiveVoucherType('Purchase'); setVoucherForm(f => ({ ...f, voucherType: 'Purchase' })); setCurrentScreen('VOUCHER_ENTRY'); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, selectedMenuItem, flatMenu]);

  const handleMenuClick = (item) => {
    if (item.screen === 'QUIT') {
      onClose();
    } else {
      setCurrentScreen(item.screen);
    }
  };

  // Financial summary calculation
  const totals = useMemo(() => {
    let totalDiscounts = 0;
    let totalReceipts = 0;
    let totalSales = 0;
    let totalPurchases = 0;

    vouchers.forEach(v => {
      const amt = Number(v.amount || 0);
      if (v.voucherType === 'Journal') totalDiscounts += amt;
      if (v.voucherType === 'Receipt') totalReceipts += amt;
      if (v.voucherType === 'Sales') totalSales += amt;
      if (v.voucherType === 'Purchase') totalPurchases += amt;
    });

    return { totalDiscounts, totalReceipts, totalSales, totalPurchases };
  }, [vouchers]);

  // Handle Save Company
  const handleSaveCompany = (e) => {
    e.preventDefault();
    if (!companyForm.name.trim()) return;
    setCompany(companyForm);
    localStorage.setItem('createdCompany', JSON.stringify(companyForm));
    triggerToast(`Company '${companyForm.name}' saved to Tally Master!`, 'success');
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
    triggerToast(`Ledger '${ledgerForm.name}' added to Tally Chart of Accounts!`, 'success');
    setLedgerForm({ name: '', group: 'Indirect Expenses', balance: '', type: 'Dr' });
  };

  // Handle Delete Ledger
  const handleDeleteLedger = (id) => {
    const updated = ledgers.filter(l => l.id !== id);
    setLedgers(updated);
    localStorage.setItem('ledgers', JSON.stringify(updated));
    triggerToast('Ledger account removed.', 'info');
  };

  // Handle Save Stock Item
  const handleSaveStock = (e) => {
    e.preventDefault();
    if (!stockForm.name.trim()) return;
    const newStock = { name: stockForm.name, qty: Number(stockForm.qty || 0), unit: stockForm.unit, rate: Number(stockForm.rate || 0), category: stockForm.category };
    const updated = [...stockItems, newStock];
    setStockItems(updated);
    localStorage.setItem('stockItems', JSON.stringify(updated));
    triggerToast(`Stock item '${stockForm.name}' created!`, 'success');
    setStockForm({ name: '', qty: '', unit: 'Nos', rate: '', category: 'Implants' });
  };

  // Handle Save Voucher Entry
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
      narration: voucherForm.narration || `${voucherForm.voucherType} voucher posted in Tally ERP 9`,
      source: 'Tally Voucher Entry'
    };

    setVouchers([newVoucher, ...vouchers]);

    if (voucherForm.voucherType === 'Journal') {
      addRequest({
        requestCode: newVoucher.voucherNo,
        patientName: voucherForm.patientName || 'Tally Patient',
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

    triggerToast(`Voucher ${newVoucher.voucherNo} posted into Tally Day Book!`, 'success');
    setVoucherForm({
      voucherType: activeVoucherType,
      date: new Date().toISOString().split('T')[0],
      debitLedger: 'Hospital Discount Allowed Account',
      creditLedger: 'Sundry Debtors - OPD Patients',
      amount: '',
      patientName: '',
      narration: ''
    });
    setCurrentScreen('DAYBOOK');
  };

  // Sync approved discounts into Tally Day Book
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
    triggerToast(`Synced ${syncedCount} new approved discount vouchers into Tally Day Book!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-y-auto font-mono">
      <div className={`w-full max-w-6xl max-h-[98vh] flex flex-col rounded-xl border-2 shadow-2xl overflow-hidden my-auto text-xs ${
        uiTheme === 'CLASSIC' 
          ? 'bg-[#fff8dc] border-[#014421] text-slate-900 font-sans' 
          : 'bg-slate-900 border-slate-700 text-slate-100 font-sans'
      }`}>
        
        {/* ORIGINAL TALLY TOP BAR (#014421 Deep Green Header) */}
        <div className="bg-[#014421] text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-emerald-950 shadow-md">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow">
              <Calculator className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-widest text-white uppercase font-serif">
                  Tally.ERP 9 <span className="text-amber-300 font-sans text-xs">Series A Release 6.6 (Stavya Hospital Edition)</span>
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-emerald-700 font-bold font-mono">
                  STATUTORY COMPLIANT
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Company: <strong className="text-amber-300">{company?.name}</strong> | Period: <span className="text-white font-mono">1-Apr-2026 to 31-Mar-2027</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setUiTheme(uiTheme === 'CLASSIC' ? 'PRIME' : 'CLASSIC')}
              className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow transition-all"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Theme: {uiTheme === 'CLASSIC' ? 'Classic ERP 9 Gold' : 'Modern Prime'}</span>
            </button>

            {currentScreen !== 'GATEWAY' && (
              <button
                onClick={() => setCurrentScreen('GATEWAY')}
                className="px-3 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-emerald-700 font-bold text-[11px] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Gateway (Esc)</span>
              </button>
            )}

            <button
              onClick={handleSyncStavyaDiscounts}
              className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Sync Discounts</span>
            </button>

            <button
              onClick={onClose}
              className="h-7 w-7 rounded bg-emerald-950 hover:bg-emerald-900 text-white flex items-center justify-center font-bold text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TALLY MAIN WORKSPACE: LEFT STATUS PANEL + GATEWAY MENU BOX + RIGHT FUNCTION KEYS BAR */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[490px]">
          
          {/* LEFT PANEL: COMPANY & PERIOD STATUS SUMMARY */}
          <div className="w-full md:w-72 bg-[#014421] text-white p-4 border-r border-emerald-950 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="border-b border-emerald-800 pb-2">
                <span className="text-[10px] text-amber-300 uppercase font-black tracking-widest block">Current Period</span>
                <span className="text-xs font-mono font-bold text-white block">1-Apr-2026 to 31-Mar-2027</span>
              </div>

              <div className="border-b border-emerald-800 pb-2">
                <span className="text-[10px] text-amber-300 uppercase font-black tracking-widest block">Current Date</span>
                <span className="text-xs font-mono font-bold text-emerald-200 block">Monday, 14 Sep 2026</span>
              </div>

              <div className="border-b border-emerald-800 pb-2">
                <span className="text-[10px] text-amber-300 uppercase font-black tracking-widest block">Selected Company</span>
                <div className="bg-[#e3ffe3] text-slate-950 p-2.5 rounded border border-emerald-600 mt-1">
                  <span className="font-extrabold text-xs block">{company?.name}</span>
                  <span className="text-[10px] text-slate-700 block mt-0.5">{company?.companyType}</span>
                  <span className="text-[10px] text-slate-700 block">{company?.address}</span>
                </div>
              </div>

              <div className="border-b border-emerald-800 pb-2">
                <span className="text-[10px] text-amber-300 uppercase font-black tracking-widest block">Date of Last Entry</span>
                <span className="text-xs font-mono text-white block">14-Sep-2026 ({vouchers.length} Vouchers)</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-1.5 pt-2">
              <button
                onClick={() => setCurrentScreen('CREATE_COMPANY')}
                className="w-full py-1.5 px-3 rounded bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-[11px] border border-slate-950 text-center block"
              >
                F3: Select / Create Company
              </button>

              <button
                onClick={() => setCurrentScreen('ACCOUNTS_INFO')}
                className="w-full py-1.5 px-3 rounded bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] border border-slate-950 text-center block"
              >
                A: Accounts Info & Ledgers
              </button>
            </div>
          </div>

          {/* CENTER PANEL: SCREEN VIEWS OR GATEWAY OF TALLY BOX */}
          <div className={`flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col justify-between ${
            uiTheme === 'CLASSIC' ? 'bg-[#fff8dc]' : 'bg-slate-950/70'
          }`}>
            
            {/* SCREEN 1: GATEWAY OF TALLY MENU */}
            {currentScreen === 'GATEWAY' && (
              <div className="my-auto max-w-md mx-auto w-full">
                <div className="bg-[#d6f1c6] border-2 border-[#014421] rounded shadow-2xl overflow-hidden text-slate-950 font-sans">
                  
                  {/* Gateway Box Title Bar */}
                  <div className="bg-[#014421] text-amber-300 px-4 py-2 text-center font-black uppercase tracking-widest text-xs border-b border-emerald-950">
                    Gateway of Tally
                  </div>

                  {/* Gateway Interactive Menu List */}
                  <div className="p-4 space-y-3">
                    {menuItems.map((sec, secIdx) => (
                      <div key={secIdx}>
                        {sec.section && (
                          <div className="text-[10px] font-black uppercase text-[#014421] tracking-wider mb-1">
                            {sec.section}
                          </div>
                        )}
                        <div className="space-y-1">
                          {sec.items.map((item) => {
                            const flatIdx = flatMenu.indexOf(item);
                            const isSelected = selectedMenuItem === flatIdx;
                            
                            return (
                              <div
                                key={item.name}
                                onClick={() => handleMenuClick(item)}
                                onMouseEnter={() => setSelectedMenuItem(flatIdx)}
                                className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                                  isSelected 
                                    ? 'bg-[#014421] text-white shadow' 
                                    : 'hover:bg-[#014421] hover:text-white text-slate-900'
                                }`}
                              >
                                <span>
                                  <u className={`font-mono font-black mr-2 ${isSelected ? 'text-amber-300' : 'text-[#014421]'}`}>
                                    {item.hotkey}
                                  </u>
                                  {item.name}
                                </span>
                                {item.name === 'Day Book' && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-mono font-black">
                                    {vouchers.length}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#c2e8af] px-3 py-1.5 border-t border-[#014421] text-[10px] text-center font-mono font-bold text-[#014421]">
                    Use Up/Down Arrow Keys & Enter, or press yellow Hotkey letter
                  </div>

                </div>
              </div>
            )}

            {/* SCREEN 2: ACCOUNTS INFO & LEDGER LIST */}
            {currentScreen === 'ACCOUNTS_INFO' && (
              <div className="bg-white border-2 border-[#014421] rounded-xl p-5 space-y-5 shadow-xl text-slate-900">
                <div className="flex justify-between items-center border-b border-slate-300 pb-3">
                  <div>
                    <span className="text-[10px] text-[#014421] font-black uppercase tracking-wider block">Gateway of Tally ➔ Accounts Info</span>
                    <h2 className="text-base font-black text-slate-900">Master Chart of Accounts & Ledgers</h2>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('LEDGER_CREATE')}
                    className="px-3.5 py-1.5 rounded bg-[#014421] text-amber-300 font-black text-xs flex items-center gap-1 shadow"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Ledger</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-300 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#014421] text-white uppercase font-mono font-bold text-[10px]">
                      <tr>
                        <th className="p-2.5">Ledger Account Name</th>
                        <th className="p-2.5">Group / Under</th>
                        <th className="p-2.5 text-right">Balance (₹)</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {ledgers.map(l => (
                        <tr key={l.id} className="hover:bg-slate-50 font-sans">
                          <td className="p-2.5 font-bold text-slate-900">{l.name}</td>
                          <td className="p-2.5 text-slate-600 font-mono">{l.group}</td>
                          <td className="p-2.5 text-right font-mono font-extrabold text-emerald-800">
                            ₹{Number(l.balance || 0).toLocaleString('en-IN')} {l.type}
                          </td>
                          <td className="p-2.5 text-center">
                            <button
                              onClick={() => handleDeleteLedger(l.id)}
                              className="text-rose-600 hover:underline font-bold text-[11px]"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SCREEN 3: CREATE LEDGER FORM */}
            {currentScreen === 'LEDGER_CREATE' && (
              <div className="max-w-xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900">
                <div className="border-b border-slate-300 pb-2">
                  <span className="text-[10px] text-[#014421] font-black uppercase">Accounts Info ➔ Ledger Creation</span>
                  <h3 className="text-base font-black text-slate-900">Create New Ledger Account</h3>
                </div>

                <form onSubmit={handleSaveLedger} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ledger Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Hospital Discount Allowed Account"
                      value={ledgerForm.name}
                      onChange={e => setLedgerForm({ ...ledgerForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#014421]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Group / Under</label>
                    <select
                      value={ledgerForm.group}
                      onChange={e => setLedgerForm({ ...ledgerForm, group: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold"
                    >
                      <option value="Indirect Expenses">Indirect Expenses</option>
                      <option value="Sundry Debtors">Sundry Debtors</option>
                      <option value="Direct Incomes">Direct Incomes</option>
                      <option value="Bank Accounts">Bank Accounts</option>
                      <option value="Cash-in-hand">Cash-in-hand</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Opening Balance (₹)</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={ledgerForm.balance}
                        onChange={e => setLedgerForm({ ...ledgerForm, balance: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Dr / Cr</label>
                      <select
                        value={ledgerForm.type}
                        onChange={e => setLedgerForm({ ...ledgerForm, type: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold"
                      >
                        <option value="Dr">Debit (Dr)</option>
                        <option value="Cr">Credit (Cr)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('ACCOUNTS_INFO')}
                      className="px-3 py-1.5 rounded bg-slate-200 text-slate-800 font-bold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow"
                    >
                      Accept (Enter)
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SCREEN 4: INVENTORY INFO & STOCK SUMMARY */}
            {(currentScreen === 'INVENTORY_INFO' || currentScreen === 'STOCK_SUMMARY') && (
              <div className="bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900">
                <div className="flex justify-between items-center border-b border-slate-300 pb-3">
                  <div>
                    <span className="text-[10px] text-[#014421] font-black uppercase">Gateway of Tally ➔ Inventory Info</span>
                    <h2 className="text-base font-black text-slate-900">Stock Summary & Inventory Items</h2>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('STOCK_CREATE')}
                    className="px-3.5 py-1.5 rounded bg-[#014421] text-amber-300 font-black text-xs flex items-center gap-1 shadow"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Stock Item</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-300 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#014421] text-white uppercase font-mono font-bold text-[10px]">
                      <tr>
                        <th className="p-2.5">Name of Item</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5 text-right">Opening Qty</th>
                        <th className="p-2.5 text-right">Rate (₹)</th>
                        <th className="p-2.5 text-right">Value (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {stockItems.map((item, idx) => {
                        const val = (Number(item.qty || 0) * Number(item.rate || 0));
                        return (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold text-slate-900">{item.name}</td>
                            <td className="p-2.5 text-slate-600">{item.category}</td>
                            <td className="p-2.5 text-right font-mono font-bold">{item.qty} {item.unit}</td>
                            <td className="p-2.5 text-right font-mono">₹{item.rate.toLocaleString('en-IN')}</td>
                            <td className="p-2.5 text-right font-mono font-extrabold text-emerald-800">₹{val.toLocaleString('en-IN')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SCREEN 5: CREATE STOCK ITEM FORM */}
            {currentScreen === 'STOCK_CREATE' && (
              <div className="max-w-xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900">
                <div className="border-b border-slate-300 pb-2">
                  <span className="text-[10px] text-[#014421] font-black uppercase">Inventory Info ➔ Stock Creation</span>
                  <h3 className="text-base font-black text-slate-900">Create Stock Item Master</h3>
                </div>

                <form onSubmit={handleSaveStock} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Spine Implant Set Titanium"
                      value={stockForm.name}
                      onChange={e => setStockForm({ ...stockForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#014421]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        placeholder="Implants"
                        value={stockForm.category}
                        onChange={e => setStockForm({ ...stockForm, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Unit of Measure</label>
                      <select
                        value={stockForm.unit}
                        onChange={e => setStockForm({ ...stockForm, unit: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold"
                      >
                        <option value="Nos">Nos</option>
                        <option value="Set">Set</option>
                        <option value="Pcs">Pcs</option>
                        <option value="Package">Package</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Opening Quantity</label>
                      <input
                        type="number"
                        placeholder="10"
                        value={stockForm.qty}
                        onChange={e => setStockForm({ ...stockForm, qty: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Rate per Unit (₹)</label>
                      <input
                        type="number"
                        placeholder="15000"
                        value={stockForm.rate}
                        onChange={e => setStockForm({ ...stockForm, rate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('INVENTORY_INFO')}
                      className="px-3 py-1.5 rounded bg-slate-200 text-slate-800 font-bold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow"
                    >
                      Save Item (Enter)
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SCREEN 6: VOUCHER CREATION ENTRY */}
            {currentScreen === 'VOUCHER_ENTRY' && (
              <div className="max-w-3xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-5 shadow-xl text-slate-900 font-sans">
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <div>
                    <span className="text-[10px] text-[#014421] font-black uppercase font-mono">Voucher Entry Mode: {activeVoucherType.toUpperCase()}</span>
                    <h2 className="text-base font-black text-slate-900">Accounting Voucher Entry ({activeVoucherType})</h2>
                  </div>

                  {/* Function Keys Shortcuts */}
                  <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                    {['Contra (F4)', 'Payment (F5)', 'Receipt (F6)', 'Journal (F7)', 'Sales (F8)', 'Purchase (F9)'].map(vt => {
                      const typeName = vt.split(' ')[0];
                      const isActive = activeVoucherType === typeName;
                      return (
                        <button
                          key={vt}
                          type="button"
                          onClick={() => {
                            setActiveVoucherType(typeName);
                            setVoucherForm(f => ({ ...f, voucherType: typeName }));
                          }}
                          className={`px-2 py-1 rounded font-bold transition-all ${
                            isActive ? 'bg-[#014421] text-amber-300 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {vt}
                        </button>
                      );
                    })}
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
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#014421]"
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
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#014421]"
                      />
                    </div>
                  </div>

                  {/* Particulars Table */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 space-y-3 font-mono">
                    <span className="text-[10px] uppercase font-bold text-slate-600 block">Particulars (Debit & Credit Ledgers)</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#014421] mb-1">By (Debit Ledger)</label>
                        <select
                          value={voucherForm.debitLedger}
                          onChange={e => setVoucherForm({ ...voucherForm, debitLedger: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#014421]"
                        >
                          {ledgers.map(l => (
                            <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-blue-700 mb-1">To (Credit Ledger)</label>
                        <select
                          value={voucherForm.creditLedger}
                          onChange={e => setVoucherForm({ ...voucherForm, creditLedger: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#014421]"
                        >
                          {ledgers.map(l => (
                            <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-emerald-800 mb-1">Voucher Amount (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 5000"
                        value={voucherForm.amount}
                        onChange={e => setVoucherForm({ ...voucherForm, amount: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-lg font-mono font-bold text-emerald-800 focus:outline-none focus:border-[#014421]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Narration</label>
                    <textarea
                      rows={2}
                      placeholder="Enter narration details..."
                      value={voucherForm.narration}
                      onChange={e => setVoucherForm({ ...voucherForm, narration: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 focus:outline-none focus:border-[#014421]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('GATEWAY')}
                      className="px-3.5 py-1.5 rounded bg-slate-200 text-slate-800 font-bold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow active:scale-95"
                    >
                      Accept (Enter)
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SCREEN 7: DAY BOOK */}
            {currentScreen === 'DAYBOOK' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#014421] font-black uppercase font-mono">Gateway of Tally ➔ Day Book</span>
                    <h2 className="text-base font-black text-slate-900">Day Book Vouchers ({vouchers.length})</h2>
                  </div>

                  <button
                    onClick={() => setCurrentScreen('VOUCHER_ENTRY')}
                    className="px-3.5 py-1.5 rounded bg-[#014421] text-amber-300 font-black text-xs flex items-center gap-1 shadow"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Voucher (F7)</span>
                  </button>
                </div>

                <div className="bg-white border-2 border-[#014421] rounded-xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto max-h-[440px] custom-scrollbar">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#014421] text-white uppercase font-mono font-bold text-[10px]">
                        <tr>
                          <th className="p-2.5">Date</th>
                          <th className="p-2.5">Voucher No</th>
                          <th className="p-2.5">Type</th>
                          <th className="p-2.5">Particulars (Debit ➔ Credit)</th>
                          <th className="p-2.5">Patient / Party</th>
                          <th className="p-2.5 text-right">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-900 font-sans">
                        {vouchers.map((v, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-2.5 font-mono text-slate-600 whitespace-nowrap">{v.date}</td>
                            <td className="p-2.5 font-mono font-bold text-blue-700 whitespace-nowrap">{v.voucherNo}</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                {v.voucherType}
                              </span>
                            </td>
                            <td className="p-2.5">
                              <span className="font-semibold text-emerald-800 block">{v.debitLedger}</span>
                              <span className="text-[11px] text-slate-500 block">To {v.creditLedger}</span>
                              <span className="text-[10px] text-slate-400 italic block">{v.narration}</span>
                            </td>
                            <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">{v.patientName}</td>
                            <td className="p-2.5 text-right font-mono font-extrabold text-emerald-800 text-sm whitespace-nowrap">
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

            {/* SCREEN 8: REPORTS (BALANCE SHEET, PROFIT & LOSS, TRIAL BALANCE, RATIO ANALYSIS, BANKING, GST) */}
            {(currentScreen === 'BALANCE_SHEET' || currentScreen === 'P_AND_L' || currentScreen === 'TRIAL_BALANCE' || currentScreen === 'RATIO_ANALYSIS' || currentScreen === 'BANKING' || currentScreen === 'GST_SETTINGS') && (
              <div className="bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900 font-sans">
                <div className="border-b border-slate-300 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#014421] font-black uppercase font-mono">Gateway of Tally ➔ Reports</span>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider font-serif">
                      {currentScreen.replace('_', ' ')}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-600 font-mono">Financial Year 2026-27</span>
                </div>

                {currentScreen === 'GST_SETTINGS' ? (
                  <div className="space-y-4 max-w-lg mx-auto bg-slate-50 p-4 rounded border border-slate-300 text-xs">
                    <h3 className="font-bold text-[#014421]">GSTIN Configuration</h3>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">GSTIN Registration Number</label>
                      <input
                        type="text"
                        value={gstConfig.gstin}
                        onChange={e => setGstConfig({ ...gstConfig, gstin: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">HSN/SAC Code</label>
                      <input
                        type="text"
                        value={gstConfig.hsnCode}
                        onChange={e => setGstConfig({ ...gstConfig, hsnCode: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono"
                      />
                    </div>
                    <button
                      onClick={() => triggerToast('GST Configuration saved!', 'success')}
                      className="px-4 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow"
                    >
                      Save GST Settings
                    </button>
                  </div>
                ) : currentScreen === 'RATIO_ANALYSIS' ? (
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="bg-slate-50 p-4 rounded border border-slate-300">
                      <span className="font-bold block text-[#014421]">Quick Ratio</span>
                      <span className="text-lg font-black text-emerald-800">2.45</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded border border-slate-300">
                      <span className="font-bold block text-[#014421]">Debt-Equity Ratio</span>
                      <span className="text-lg font-black text-emerald-800">0.18</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded border border-slate-300">
                      <span className="font-bold block text-[#014421]">Debtors Turnover Ratio</span>
                      <span className="text-lg font-black text-emerald-800">5.2 Days</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded border border-slate-300">
                      <span className="font-bold block text-[#014421]">Gross Margin %</span>
                      <span className="text-lg font-black text-emerald-800">68.5%</span>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#014421] text-white uppercase font-mono font-bold text-[10px]">
                        <tr>
                          <th className="p-2.5">Particulars Account</th>
                          <th className="p-2.5 text-right">Debit (₹)</th>
                          <th className="p-2.5 text-right">Credit (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-2.5 font-bold text-slate-900">Hospital Discount Allowed Account</td>
                          <td className="p-2.5 text-right font-mono text-emerald-800 font-bold">₹{totals.totalDiscounts.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 text-right font-mono text-slate-400">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-900">Sundry Debtors - OPD Patients</td>
                          <td className="p-2.5 text-right font-mono text-slate-400">-</td>
                          <td className="p-2.5 text-right font-mono text-emerald-800 font-bold">₹{totals.totalDiscounts.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-900">State Bank of India (Hospital A/c)</td>
                          <td className="p-2.5 text-right font-mono text-emerald-800 font-bold">₹6,50,000</td>
                          <td className="p-2.5 text-right font-mono text-slate-400">-</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-slate-100 border-t-2 border-[#014421] text-[#014421] font-mono font-black">
                        <tr>
                          <td className="p-2.5 uppercase">Total Balanced Figures</td>
                          <td className="p-2.5 text-right text-sm">₹{(totals.totalDiscounts + 650000).toLocaleString('en-IN')}</td>
                          <td className="p-2.5 text-right text-sm">₹{(totals.totalDiscounts + 650000).toLocaleString('en-IN')}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* CREATE COMPANY SCREEN */}
            {currentScreen === 'CREATE_COMPANY' && (
              <div className="max-w-xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900 font-sans">
                <div className="border-b border-slate-300 pb-2">
                  <span className="text-[10px] text-[#014421] font-black uppercase font-mono">Company Info ➔ Creation</span>
                  <h3 className="text-base font-black text-slate-900">Create / Alter Company Master</h3>
                </div>

                <form onSubmit={handleSaveCompany} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#014421]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Industry Type</label>
                    <input
                      type="text"
                      value={companyForm.companyType}
                      onChange={e => setCompanyForm({ ...companyForm, companyType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={companyForm.address}
                      onChange={e => setCompanyForm({ ...companyForm, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('GATEWAY')}
                      className="px-3 py-1.5 rounded bg-slate-200 text-slate-800 font-bold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow"
                    >
                      Save Company (Enter)
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

          {/* RIGHT PANEL: ORIGINAL TALLY FUNCTION KEYS COLUMN (F1 - F12) */}
          <div className="w-full md:w-48 bg-[#014421] text-white p-2.5 border-l border-emerald-950 flex flex-col justify-start space-y-1 text-[11px] font-mono select-none">
            <div className="text-[10px] text-amber-300 uppercase font-black tracking-widest border-b border-emerald-800 pb-1 mb-1 text-center">
              Function Keys
            </div>

            <button onClick={() => setCurrentScreen('CREATE_COMPANY')} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F1:</b> Select Cmp</span>
            </button>

            <button onClick={() => triggerToast('Current Date: 14-Sep-2026', 'info')} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F2:</b> Date / Period</span>
            </button>

            <button onClick={() => setCurrentScreen('CREATE_COMPANY')} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F3:</b> Cmp Info</span>
            </button>

            <button onClick={() => { setActiveVoucherType('Contra'); setVoucherForm(f => ({ ...f, voucherType: 'Contra' })); setCurrentScreen('VOUCHER_ENTRY'); }} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F4:</b> Contra</span>
            </button>

            <button onClick={() => { setActiveVoucherType('Payment'); setVoucherForm(f => ({ ...f, voucherType: 'Payment' })); setCurrentScreen('VOUCHER_ENTRY'); }} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F5:</b> Payment</span>
            </button>

            <button onClick={() => { setActiveVoucherType('Receipt'); setVoucherForm(f => ({ ...f, voucherType: 'Receipt' })); setCurrentScreen('VOUCHER_ENTRY'); }} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F6:</b> Receipt</span>
            </button>

            <button onClick={() => { setActiveVoucherType('Journal'); setVoucherForm(f => ({ ...f, voucherType: 'Journal' })); setCurrentScreen('VOUCHER_ENTRY'); }} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F7:</b> Journal</span>
            </button>

            <button onClick={() => { setActiveVoucherType('Sales'); setVoucherForm(f => ({ ...f, voucherType: 'Sales' })); setCurrentScreen('VOUCHER_ENTRY'); }} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F8:</b> Sales</span>
            </button>

            <button onClick={() => { setActiveVoucherType('Purchase'); setVoucherForm(f => ({ ...f, voucherType: 'Purchase' })); setCurrentScreen('VOUCHER_ENTRY'); }} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F9:</b> Purchase</span>
            </button>

            <button onClick={() => setCurrentScreen('GST_SETTINGS')} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F11:</b> Features</span>
            </button>

            <button onClick={() => setCurrentScreen('GST_SETTINGS')} className="p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between">
              <span><b className="text-amber-300">F12:</b> Configure</span>
            </button>
          </div>

        </div>

        {/* ORIGINAL TALLY BOTTOM FOOTER STATUS BAR */}
        <div className="bg-[#01351a] text-white px-4 py-2 border-t border-emerald-950 text-[11px] font-mono flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-amber-300">Tally MAIN</span>
            <span className="text-slate-300">-- Gateway of Tally ➔ {currentScreen}</span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200">
            <span>Stavya Spine Hospital OS Sync: Active</span>
            <span className="text-white font-bold">14-Sep-2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};
