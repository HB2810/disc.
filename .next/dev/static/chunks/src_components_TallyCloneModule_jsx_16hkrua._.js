(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/TallyCloneModule.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TallyCloneModule",
    ()=>TallyCloneModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$tallyExporter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/tallyExporter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-client] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus-circle.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders.js [app-client] (ecmascript) <export default as Sliders>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const TallyCloneModule = ({ onClose })=>{
    _s();
    const { requests, addRequest, triggerToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    // Mode: 'CLASSIC' (Original Tally ERP 9 Gold/Green UI) or 'PRIME' (Modern Tally Prime)
    const [uiTheme, setUiTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('CLASSIC');
    // Active Screen: 
    // 'GATEWAY', 'VOUCHER_ENTRY', 'DAYBOOK', 'ACCOUNTS_INFO', 'LEDGER_CREATE', 'INVENTORY_INFO', 'STOCK_CREATE', 'STOCK_SUMMARY', 'CREATE_COMPANY', 'BANKING', 'GST_SETTINGS', 'TRIAL_BALANCE', 'P_AND_L', 'BALANCE_SHEET', 'RATIO_ANALYSIS'
    const [currentScreen, setCurrentScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('GATEWAY');
    // Selected item index in Gateway Menu for keyboard navigation
    const [selectedMenuItem, setSelectedMenuItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Active Voucher Type for Voucher Entry: 'Journal' (F7), 'Receipt' (F6), 'Payment' (F5), 'Contra' (F4), 'Sales' (F8), 'Purchase' (F9)
    const [activeVoucherType, setActiveVoucherType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Journal');
    // Company Master State (persisted to localStorage 'createdCompany' like tally-clone-master)
    const [company, setCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TallyCloneModule.useState": ()=>{
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
        }
    }["TallyCloneModule.useState"]);
    // Company Form State
    const [companyForm, setCompanyForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
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
    const [ledgers, setLedgers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TallyCloneModule.useState": ()=>{
            try {
                const saved = localStorage.getItem('ledgers');
                if (saved) return JSON.parse(saved);
            } catch (e) {}
            return [
                {
                    id: 'L1',
                    name: 'Hospital Discount Allowed Account',
                    group: 'Indirect Expenses',
                    balance: 15000,
                    type: 'Dr'
                },
                {
                    id: 'L2',
                    name: 'Sundry Debtors - OPD Patients',
                    group: 'Sundry Debtors',
                    balance: 85000,
                    type: 'Dr'
                },
                {
                    id: 'L3',
                    name: 'Hospital Services OPD Revenue',
                    group: 'Direct Incomes',
                    balance: 450000,
                    type: 'Cr'
                },
                {
                    id: 'L4',
                    name: 'State Bank of India (Hospital A/c)',
                    group: 'Bank Accounts',
                    balance: 650000,
                    type: 'Dr'
                },
                {
                    id: 'L5',
                    name: 'Cash in Hand',
                    group: 'Cash-in-hand',
                    balance: 45000,
                    type: 'Dr'
                }
            ];
        }
    }["TallyCloneModule.useState"]);
    // New Ledger Form
    const [ledgerForm, setLedgerForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        group: 'Indirect Expenses',
        balance: '',
        type: 'Dr'
    });
    // Inventory Stock Items State (persisted in localStorage 'stockItems')
    const [stockItems, setStockItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TallyCloneModule.useState": ()=>{
            try {
                const saved = localStorage.getItem('stockItems');
                if (saved) return JSON.parse(saved);
            } catch (e) {}
            return [
                {
                    name: 'Spine Surgical Implant Set',
                    qty: 25,
                    unit: 'Set',
                    rate: 45000,
                    category: 'Implants'
                },
                {
                    name: 'OPD Prescription Consultation Card',
                    qty: 500,
                    unit: 'Nos',
                    rate: 500,
                    category: 'Stationery'
                },
                {
                    name: 'Spine MRI Scanning Requisition Slip',
                    qty: 200,
                    unit: 'Pcs',
                    rate: 3500,
                    category: 'Services'
                },
                {
                    name: 'Physiotherapy Session Package',
                    qty: 60,
                    unit: 'Package',
                    rate: 1200,
                    category: 'Therapy'
                }
            ];
        }
    }["TallyCloneModule.useState"]);
    // New Stock Form
    const [stockForm, setStockForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        qty: '',
        unit: 'Nos',
        rate: '',
        category: 'Implants'
    });
    // GST Configuration State
    const [gstConfig, setGstConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        gstin: '24AAAAA0000A1Z5',
        state: 'Gujarat',
        type: 'Regular',
        applicableDate: '2026-04-01',
        hsnCode: '999312'
    });
    // Vouchers List State (Synced with approved Stavya Hospital discounts)
    const [vouchers, setVouchers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TallyCloneModule.useState": ()=>{
            try {
                const saved = localStorage.getItem('vouchers');
                if (saved) return JSON.parse(saved);
            } catch (e) {}
            const initial = [];
            requests.forEach({
                "TallyCloneModule.useState": (req, idx)=>{
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
                }
            }["TallyCloneModule.useState"]);
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
        }
    }["TallyCloneModule.useState"]);
    // Save vouchers to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TallyCloneModule.useEffect": ()=>{
            try {
                localStorage.setItem('vouchers', JSON.stringify(vouchers));
            } catch (e) {}
        }
    }["TallyCloneModule.useEffect"], [
        vouchers
    ]);
    // New Voucher Entry Form State
    const [voucherForm, setVoucherForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
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
        {
            section: 'MASTERS',
            items: [
                {
                    name: 'Accounts Info.',
                    hotkey: 'A',
                    screen: 'ACCOUNTS_INFO'
                },
                {
                    name: 'Inventory Info.',
                    hotkey: 'I',
                    screen: 'INVENTORY_INFO'
                }
            ]
        },
        {
            section: 'TRANSACTIONS',
            items: [
                {
                    name: 'Accounting Vouchers',
                    hotkey: 'V',
                    screen: 'VOUCHER_ENTRY'
                },
                {
                    name: 'Day Book',
                    hotkey: 'D',
                    screen: 'DAYBOOK'
                }
            ]
        },
        {
            section: 'UTILITIES & BANKING',
            items: [
                {
                    name: 'Banking & Reconcile',
                    hotkey: 'N',
                    screen: 'BANKING'
                },
                {
                    name: 'GST Settings',
                    hotkey: 'G',
                    screen: 'GST_SETTINGS'
                }
            ]
        },
        {
            section: 'REPORTS',
            items: [
                {
                    name: 'Balance Sheet',
                    hotkey: 'B',
                    screen: 'BALANCE_SHEET'
                },
                {
                    name: 'Profit & Loss A/c',
                    hotkey: 'P',
                    screen: 'P_AND_L'
                },
                {
                    name: 'Stock Summary',
                    hotkey: 'S',
                    screen: 'STOCK_SUMMARY'
                },
                {
                    name: 'Ratio Analysis',
                    hotkey: 'R',
                    screen: 'RATIO_ANALYSIS'
                },
                {
                    name: 'Trial Balance',
                    hotkey: 'T',
                    screen: 'TRIAL_BALANCE'
                }
            ]
        },
        {
            section: '',
            items: [
                {
                    name: 'Quit',
                    hotkey: 'Q',
                    screen: 'QUIT'
                }
            ]
        }
    ];
    // Flatten menu items for keyboard arrow navigation
    const flatMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TallyCloneModule.useMemo[flatMenu]": ()=>{
            const list = [];
            menuItems.forEach({
                "TallyCloneModule.useMemo[flatMenu]": (sec)=>sec.items.forEach({
                        "TallyCloneModule.useMemo[flatMenu]": (item)=>list.push(item)
                    }["TallyCloneModule.useMemo[flatMenu]"])
            }["TallyCloneModule.useMemo[flatMenu]"]);
            return list;
        }
    }["TallyCloneModule.useMemo[flatMenu]"], []);
    // Keyboard Hotkey Listener (Original Tally ERP 9 style)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TallyCloneModule.useEffect": ()=>{
            const handleKeyDown = {
                "TallyCloneModule.useEffect.handleKeyDown": (e)=>{
                    // Ignore keybindings if user is typing in an input or textarea
                    if ([
                        'INPUT',
                        'TEXTAREA',
                        'SELECT'
                    ].includes(e.target.tagName)) return;
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
                            setSelectedMenuItem({
                                "TallyCloneModule.useEffect.handleKeyDown": (prev)=>(prev + 1) % flatMenu.length
                            }["TallyCloneModule.useEffect.handleKeyDown"]);
                            return;
                        }
                        if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            setSelectedMenuItem({
                                "TallyCloneModule.useEffect.handleKeyDown": (prev)=>(prev - 1 + flatMenu.length) % flatMenu.length
                            }["TallyCloneModule.useEffect.handleKeyDown"]);
                            return;
                        }
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const target = flatMenu[selectedMenuItem];
                            if (target) handleMenuClick(target);
                            return;
                        }
                        // Direct Hotkey Triggers (A, I, V, D, B, P, S, R, T, N, G, Q)
                        const matched = flatMenu.find({
                            "TallyCloneModule.useEffect.handleKeyDown.matched": (m)=>m.hotkey === key
                        }["TallyCloneModule.useEffect.handleKeyDown.matched"]);
                        if (matched) {
                            e.preventDefault();
                            handleMenuClick(matched);
                            return;
                        }
                    }
                    // Function Keys (F1 - F12)
                    if (e.key === 'F1') {
                        e.preventDefault();
                        setCurrentScreen('CREATE_COMPANY');
                    }
                    if (e.key === 'F2') {
                        e.preventDefault();
                        triggerToast('Current Date set to 14-Sep-2026', 'info');
                    }
                    if (e.key === 'F3') {
                        e.preventDefault();
                        setCurrentScreen('CREATE_COMPANY');
                    }
                    if (e.key === 'F4') {
                        e.preventDefault();
                        setActiveVoucherType('Contra');
                        setVoucherForm({
                            "TallyCloneModule.useEffect.handleKeyDown": (f)=>({
                                    ...f,
                                    voucherType: 'Contra'
                                })
                        }["TallyCloneModule.useEffect.handleKeyDown"]);
                        setCurrentScreen('VOUCHER_ENTRY');
                    }
                    if (e.key === 'F5') {
                        e.preventDefault();
                        setActiveVoucherType('Payment');
                        setVoucherForm({
                            "TallyCloneModule.useEffect.handleKeyDown": (f)=>({
                                    ...f,
                                    voucherType: 'Payment'
                                })
                        }["TallyCloneModule.useEffect.handleKeyDown"]);
                        setCurrentScreen('VOUCHER_ENTRY');
                    }
                    if (e.key === 'F6') {
                        e.preventDefault();
                        setActiveVoucherType('Receipt');
                        setVoucherForm({
                            "TallyCloneModule.useEffect.handleKeyDown": (f)=>({
                                    ...f,
                                    voucherType: 'Receipt'
                                })
                        }["TallyCloneModule.useEffect.handleKeyDown"]);
                        setCurrentScreen('VOUCHER_ENTRY');
                    }
                    if (e.key === 'F7') {
                        e.preventDefault();
                        setActiveVoucherType('Journal');
                        setVoucherForm({
                            "TallyCloneModule.useEffect.handleKeyDown": (f)=>({
                                    ...f,
                                    voucherType: 'Journal'
                                })
                        }["TallyCloneModule.useEffect.handleKeyDown"]);
                        setCurrentScreen('VOUCHER_ENTRY');
                    }
                    if (e.key === 'F8') {
                        e.preventDefault();
                        setActiveVoucherType('Sales');
                        setVoucherForm({
                            "TallyCloneModule.useEffect.handleKeyDown": (f)=>({
                                    ...f,
                                    voucherType: 'Sales'
                                })
                        }["TallyCloneModule.useEffect.handleKeyDown"]);
                        setCurrentScreen('VOUCHER_ENTRY');
                    }
                    if (e.key === 'F9') {
                        e.preventDefault();
                        setActiveVoucherType('Purchase');
                        setVoucherForm({
                            "TallyCloneModule.useEffect.handleKeyDown": (f)=>({
                                    ...f,
                                    voucherType: 'Purchase'
                                })
                        }["TallyCloneModule.useEffect.handleKeyDown"]);
                        setCurrentScreen('VOUCHER_ENTRY');
                    }
                }
            }["TallyCloneModule.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "TallyCloneModule.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["TallyCloneModule.useEffect"];
        }
    }["TallyCloneModule.useEffect"], [
        currentScreen,
        selectedMenuItem,
        flatMenu
    ]);
    const handleMenuClick = (item)=>{
        if (item.screen === 'QUIT') {
            onClose();
        } else {
            setCurrentScreen(item.screen);
        }
    };
    // Financial summary calculation
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TallyCloneModule.useMemo[totals]": ()=>{
            let totalDiscounts = 0;
            let totalReceipts = 0;
            let totalSales = 0;
            let totalPurchases = 0;
            vouchers.forEach({
                "TallyCloneModule.useMemo[totals]": (v)=>{
                    const amt = Number(v.amount || 0);
                    if (v.voucherType === 'Journal') totalDiscounts += amt;
                    if (v.voucherType === 'Receipt') totalReceipts += amt;
                    if (v.voucherType === 'Sales') totalSales += amt;
                    if (v.voucherType === 'Purchase') totalPurchases += amt;
                }
            }["TallyCloneModule.useMemo[totals]"]);
            return {
                totalDiscounts,
                totalReceipts,
                totalSales,
                totalPurchases
            };
        }
    }["TallyCloneModule.useMemo[totals]"], [
        vouchers
    ]);
    // Handle Save Company
    const handleSaveCompany = (e)=>{
        e.preventDefault();
        if (!companyForm.name.trim()) return;
        setCompany(companyForm);
        localStorage.setItem('createdCompany', JSON.stringify(companyForm));
        triggerToast(`Company '${companyForm.name}' saved to Tally Master!`, 'success');
        setCurrentScreen('GATEWAY');
    };
    // Handle Save Ledger
    const handleSaveLedger = (e)=>{
        e.preventDefault();
        if (!ledgerForm.name.trim()) return;
        const newL = {
            id: `L${ledgers.length + 1}`,
            name: ledgerForm.name,
            group: ledgerForm.group,
            balance: Number(ledgerForm.balance || 0),
            type: ledgerForm.type
        };
        const updated = [
            ...ledgers,
            newL
        ];
        setLedgers(updated);
        localStorage.setItem('ledgers', JSON.stringify(updated));
        triggerToast(`Ledger '${ledgerForm.name}' added to Tally Chart of Accounts!`, 'success');
        setLedgerForm({
            name: '',
            group: 'Indirect Expenses',
            balance: '',
            type: 'Dr'
        });
    };
    // Handle Delete Ledger
    const handleDeleteLedger = (id)=>{
        const updated = ledgers.filter((l)=>l.id !== id);
        setLedgers(updated);
        localStorage.setItem('ledgers', JSON.stringify(updated));
        triggerToast('Ledger account removed.', 'info');
    };
    // Handle Save Stock Item
    const handleSaveStock = (e)=>{
        e.preventDefault();
        if (!stockForm.name.trim()) return;
        const newStock = {
            name: stockForm.name,
            qty: Number(stockForm.qty || 0),
            unit: stockForm.unit,
            rate: Number(stockForm.rate || 0),
            category: stockForm.category
        };
        const updated = [
            ...stockItems,
            newStock
        ];
        setStockItems(updated);
        localStorage.setItem('stockItems', JSON.stringify(updated));
        triggerToast(`Stock item '${stockForm.name}' created!`, 'success');
        setStockForm({
            name: '',
            qty: '',
            unit: 'Nos',
            rate: '',
            category: 'Implants'
        });
    };
    // Handle Save Voucher Entry
    const handleSaveVoucher = (e)=>{
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
        setVouchers([
            newVoucher,
            ...vouchers
        ]);
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
    const handleSyncStavyaDiscounts = ()=>{
        let syncedCount = 0;
        const existingNos = new Set(vouchers.map((v)=>v.voucherNo));
        requests.forEach((req, idx)=>{
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
        setVouchers([
            ...vouchers
        ]);
        triggerToast(`Synced ${syncedCount} new approved discount vouchers into Tally Day Book!`, 'success');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-y-auto font-mono",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full max-w-6xl max-h-[98vh] flex flex-col rounded-xl border-2 shadow-2xl overflow-hidden my-auto text-xs ${uiTheme === 'CLASSIC' ? 'bg-[#fff8dc] border-[#014421] text-slate-900 font-sans' : 'bg-slate-900 border-slate-700 text-slate-100 font-sans'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#014421] text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-emerald-950 shadow-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-8 w-8 rounded bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                        className: "w-5 h-5 stroke-[2.5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-sm font-black tracking-widest text-white uppercase font-serif",
                                                    children: [
                                                        "Tally.ERP 9 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-300 font-sans text-xs",
                                                            children: "Series A Release 6.6 (Stavya Hospital Edition)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 449,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 448,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-emerald-700 font-bold font-mono",
                                                    children: "STATUTORY COMPLIANT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 451,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 447,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-emerald-200",
                                            children: [
                                                "Company: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-amber-300",
                                                    children: company?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 456,
                                                    columnNumber: 26
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " | Period: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white font-mono",
                                                    children: "1-Apr-2026 to 31-Mar-2027"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 456,
                                                    columnNumber: 96
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 455,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setUiTheme(uiTheme === 'CLASSIC' ? 'PRIME' : 'CLASSIC'),
                                    className: "px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__["Sliders"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 467,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Theme: ",
                                                uiTheme === 'CLASSIC' ? 'Classic ERP 9 Gold' : 'Modern Prime'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 468,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen !== 'GATEWAY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentScreen('GATEWAY'),
                                    className: "px-3 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-emerald-700 font-bold text-[11px] flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 476,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Gateway (Esc)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 477,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSyncStavyaDiscounts,
                                    className: "px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "w-3.5 h-3.5 fill-slate-950"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 485,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Sync Discounts"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 486,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "h-7 w-7 rounded bg-emerald-950 hover:bg-emerald-900 text-white flex items-center justify-center font-bold text-xs",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 489,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 461,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                    lineNumber: 441,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col md:flex-row overflow-hidden min-h-[490px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-72 bg-[#014421] text-white p-4 border-r border-emerald-950 flex flex-col justify-between space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-emerald-800 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-amber-300 uppercase font-black tracking-widest block",
                                                    children: "Current Period"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 505,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono font-bold text-white block",
                                                    children: "1-Apr-2026 to 31-Mar-2027"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 506,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-emerald-800 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-amber-300 uppercase font-black tracking-widest block",
                                                    children: "Current Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 510,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono font-bold text-emerald-200 block",
                                                    children: "Monday, 14 Sep 2026"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 511,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 509,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-emerald-800 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-amber-300 uppercase font-black tracking-widest block",
                                                    children: "Selected Company"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 515,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-[#e3ffe3] text-slate-950 p-2.5 rounded border border-emerald-600 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-extrabold text-xs block",
                                                            children: company?.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 517,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-700 block mt-0.5",
                                                            children: company?.companyType
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 518,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-700 block",
                                                            children: company?.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 519,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 516,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 514,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-emerald-800 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-amber-300 uppercase font-black tracking-widest block",
                                                    children: "Date of Last Entry"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 524,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono text-white block",
                                                    children: [
                                                        "14-Sep-2026 (",
                                                        vouchers.length,
                                                        " Vouchers)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 525,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 523,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 503,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentScreen('CREATE_COMPANY'),
                                            className: "w-full py-1.5 px-3 rounded bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-[11px] border border-slate-950 text-center block",
                                            children: "F3: Select / Create Company"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 531,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentScreen('ACCOUNTS_INFO'),
                                            className: "w-full py-1.5 px-3 rounded bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] border border-slate-950 text-center block",
                                            children: "A: Accounts Info & Ledgers"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 538,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 530,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col justify-between ${uiTheme === 'CLASSIC' ? 'bg-[#fff8dc]' : 'bg-slate-950/70'}`,
                            children: [
                                currentScreen === 'GATEWAY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "my-auto max-w-md mx-auto w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#d6f1c6] border-2 border-[#014421] rounded shadow-2xl overflow-hidden text-slate-950 font-sans",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#014421] text-amber-300 px-4 py-2 text-center font-black uppercase tracking-widest text-xs border-b border-emerald-950",
                                                children: "Gateway of Tally"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 558,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-3",
                                                children: menuItems.map((sec, secIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            sec.section && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] font-black uppercase text-[#014421] tracking-wider mb-1",
                                                                children: sec.section
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 567,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: sec.items.map((item)=>{
                                                                    const flatIdx = flatMenu.indexOf(item);
                                                                    const isSelected = selectedMenuItem === flatIdx;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        onClick: ()=>handleMenuClick(item),
                                                                        onMouseEnter: ()=>setSelectedMenuItem(flatIdx),
                                                                        className: `px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-[#014421] text-white shadow' : 'hover:bg-[#014421] hover:text-white text-slate-900'}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("u", {
                                                                                        className: `font-mono font-black mr-2 ${isSelected ? 'text-amber-300' : 'text-[#014421]'}`,
                                                                                        children: item.hotkey
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                        lineNumber: 588,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    item.name
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                lineNumber: 587,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            item.name === 'Day Book' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-mono font-black",
                                                                                children: vouchers.length
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                lineNumber: 594,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, item.name, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 577,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0));
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 571,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, secIdx, true, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 565,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 563,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#c2e8af] px-3 py-1.5 border-t border-[#014421] text-[10px] text-center font-mono font-bold text-[#014421]",
                                                children: "Use Up/Down Arrow Keys & Enter, or press yellow Hotkey letter"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 606,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 555,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 554,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen === 'ACCOUNTS_INFO' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white border-2 border-[#014421] rounded-xl p-5 space-y-5 shadow-xl text-slate-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center border-b border-slate-300 pb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-[#014421] font-black uppercase tracking-wider block",
                                                            children: "Gateway of Tally ➔ Accounts Info"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 619,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-base font-black text-slate-900",
                                                            children: "Master Chart of Accounts & Ledgers"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 620,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 618,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCurrentScreen('LEDGER_CREATE'),
                                                    className: "px-3.5 py-1.5 rounded bg-[#014421] text-amber-300 font-black text-xs flex items-center gap-1 shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 626,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Create Ledger"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 627,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 622,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 617,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-x-auto border border-slate-300 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full text-xs text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "bg-[#014421] text-white uppercase font-mono font-bold text-[10px]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5",
                                                                    children: "Ledger Account Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 635,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5",
                                                                    children: "Group / Under"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 636,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-right",
                                                                    children: "Balance (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 637,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-center",
                                                                    children: "Action"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 638,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 634,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 633,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        className: "divide-y divide-slate-200",
                                                        children: ledgers.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "hover:bg-slate-50 font-sans",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 font-bold text-slate-900",
                                                                        children: l.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 644,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-slate-600 font-mono",
                                                                        children: l.group
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 645,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono font-extrabold text-emerald-800",
                                                                        children: [
                                                                            "₹",
                                                                            Number(l.balance || 0).toLocaleString('en-IN'),
                                                                            " ",
                                                                            l.type
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 646,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeleteLedger(l.id),
                                                                            className: "text-rose-600 hover:underline font-bold text-[11px]",
                                                                            children: "Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 650,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, l.id, true, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 643,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 641,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 632,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 631,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 616,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen === 'LEDGER_CREATE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-slate-300 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-[#014421] font-black uppercase",
                                                    children: "Accounts Info ➔ Ledger Creation"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 669,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-black text-slate-900",
                                                    children: "Create New Ledger Account"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 670,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 668,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSaveLedger,
                                            className: "space-y-3 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Ledger Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 675,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "e.g. Hospital Discount Allowed Account",
                                                            value: ledgerForm.name,
                                                            onChange: (e)=>setLedgerForm({
                                                                    ...ledgerForm,
                                                                    name: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#014421]",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 676,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 674,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Group / Under"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 687,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: ledgerForm.group,
                                                            onChange: (e)=>setLedgerForm({
                                                                    ...ledgerForm,
                                                                    group: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Indirect Expenses",
                                                                    children: "Indirect Expenses"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 693,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Sundry Debtors",
                                                                    children: "Sundry Debtors"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 694,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Direct Incomes",
                                                                    children: "Direct Incomes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 695,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Bank Accounts",
                                                                    children: "Bank Accounts"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 696,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Cash-in-hand",
                                                                    children: "Cash-in-hand"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 697,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 688,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 686,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Opening Balance (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 703,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    placeholder: "0",
                                                                    value: ledgerForm.balance,
                                                                    onChange: (e)=>setLedgerForm({
                                                                            ...ledgerForm,
                                                                            balance: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 704,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 702,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Dr / Cr"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 714,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: ledgerForm.type,
                                                                    onChange: (e)=>setLedgerForm({
                                                                            ...ledgerForm,
                                                                            type: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Dr",
                                                                            children: "Debit (Dr)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 720,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Cr",
                                                                            children: "Credit (Cr)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 721,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 715,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 713,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 701,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 flex justify-end gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setCurrentScreen('ACCOUNTS_INFO'),
                                                            className: "px-3 py-1.5 rounded bg-slate-200 text-slate-800 font-bold",
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 727,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "px-5 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow",
                                                            children: "Accept (Enter)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 735,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 726,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 667,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                (currentScreen === 'INVENTORY_INFO' || currentScreen === 'STOCK_SUMMARY') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center border-b border-slate-300 pb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-[#014421] font-black uppercase",
                                                            children: "Gateway of Tally ➔ Inventory Info"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 751,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-base font-black text-slate-900",
                                                            children: "Stock Summary & Inventory Items"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 752,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 750,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCurrentScreen('STOCK_CREATE'),
                                                    className: "px-3.5 py-1.5 rounded bg-[#014421] text-amber-300 font-black text-xs flex items-center gap-1 shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 758,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Create Stock Item"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 759,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 754,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 749,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-x-auto border border-slate-300 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full text-xs text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "bg-[#014421] text-white uppercase font-mono font-bold text-[10px]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5",
                                                                    children: "Name of Item"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 767,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5",
                                                                    children: "Category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 768,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-right",
                                                                    children: "Opening Qty"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 769,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-right",
                                                                    children: "Rate (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 770,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-right",
                                                                    children: "Value (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 771,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 766,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 765,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        className: "divide-y divide-slate-200 font-sans",
                                                        children: stockItems.map((item, idx)=>{
                                                            const val = Number(item.qty || 0) * Number(item.rate || 0);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "hover:bg-slate-50",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 font-bold text-slate-900",
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 779,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-slate-600",
                                                                        children: item.category
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 780,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono font-bold",
                                                                        children: [
                                                                            item.qty,
                                                                            " ",
                                                                            item.unit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 781,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono",
                                                                        children: [
                                                                            "₹",
                                                                            item.rate.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 782,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono font-extrabold text-emerald-800",
                                                                        children: [
                                                                            "₹",
                                                                            val.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 783,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 778,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 774,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 764,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 763,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 748,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen === 'STOCK_CREATE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-slate-300 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-[#014421] font-black uppercase",
                                                    children: "Inventory Info ➔ Stock Creation"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 797,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-black text-slate-900",
                                                    children: "Create Stock Item Master"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 798,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 796,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSaveStock,
                                            className: "space-y-3 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Item Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 803,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "e.g. Spine Implant Set Titanium",
                                                            value: stockForm.name,
                                                            onChange: (e)=>setStockForm({
                                                                    ...stockForm,
                                                                    name: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#014421]",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 804,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 802,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 816,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "Implants",
                                                                    value: stockForm.category,
                                                                    onChange: (e)=>setStockForm({
                                                                            ...stockForm,
                                                                            category: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 817,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 815,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Unit of Measure"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 827,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: stockForm.unit,
                                                                    onChange: (e)=>setStockForm({
                                                                            ...stockForm,
                                                                            unit: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Nos",
                                                                            children: "Nos"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 833,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Set",
                                                                            children: "Set"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 834,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Pcs",
                                                                            children: "Pcs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 835,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Package",
                                                                            children: "Package"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 836,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 828,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 826,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 814,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Opening Quantity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 843,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    placeholder: "10",
                                                                    value: stockForm.qty,
                                                                    onChange: (e)=>setStockForm({
                                                                            ...stockForm,
                                                                            qty: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 844,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 842,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Rate per Unit (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 854,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    placeholder: "15000",
                                                                    value: stockForm.rate,
                                                                    onChange: (e)=>setStockForm({
                                                                            ...stockForm,
                                                                            rate: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 855,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 853,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 841,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 flex justify-end gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setCurrentScreen('INVENTORY_INFO'),
                                                            className: "px-3 py-1.5 rounded bg-slate-200 text-slate-800 font-bold",
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 866,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "px-5 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow",
                                                            children: "Save Item (Enter)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 874,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 865,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 801,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 795,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen === 'VOUCHER_ENTRY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-3xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-5 shadow-xl text-slate-900 font-sans",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-slate-300 pb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-[#014421] font-black uppercase font-mono",
                                                            children: [
                                                                "Voucher Entry Mode: ",
                                                                activeVoucherType.toUpperCase()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 890,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-base font-black text-slate-900",
                                                            children: [
                                                                "Accounting Voucher Entry (",
                                                                activeVoucherType,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 891,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 889,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1 font-mono text-[10px]",
                                                    children: [
                                                        'Contra (F4)',
                                                        'Payment (F5)',
                                                        'Receipt (F6)',
                                                        'Journal (F7)',
                                                        'Sales (F8)',
                                                        'Purchase (F9)'
                                                    ].map((vt)=>{
                                                        const typeName = vt.split(' ')[0];
                                                        const isActive = activeVoucherType === typeName;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setActiveVoucherType(typeName);
                                                                setVoucherForm((f)=>({
                                                                        ...f,
                                                                        voucherType: typeName
                                                                    }));
                                                            },
                                                            className: `px-2 py-1 rounded font-bold transition-all ${isActive ? 'bg-[#014421] text-amber-300 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`,
                                                            children: vt
                                                        }, vt, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 900,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 895,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 888,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSaveVoucher,
                                            className: "space-y-4 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Voucher Date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 921,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "date",
                                                                    value: voucherForm.date,
                                                                    onChange: (e)=>setVoucherForm({
                                                                            ...voucherForm,
                                                                            date: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#014421]",
                                                                    required: true
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 922,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 920,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-slate-700 mb-1",
                                                                    children: "Patient / Party Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 932,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "e.g. Ramesh Patel",
                                                                    value: voucherForm.patientName,
                                                                    onChange: (e)=>setVoucherForm({
                                                                            ...voucherForm,
                                                                            patientName: e.target.value
                                                                        }),
                                                                    className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#014421]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 933,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 931,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 919,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 p-4 rounded-lg border border-slate-300 space-y-3 font-mono",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] uppercase font-bold text-slate-600 block",
                                                            children: "Particulars (Debit & Credit Ledgers)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 945,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "block font-bold text-[#014421] mb-1",
                                                                            children: "By (Debit Ledger)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 949,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            value: voucherForm.debitLedger,
                                                                            onChange: (e)=>setVoucherForm({
                                                                                    ...voucherForm,
                                                                                    debitLedger: e.target.value
                                                                                }),
                                                                            className: "w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#014421]",
                                                                            children: ledgers.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: l.name,
                                                                                    children: [
                                                                                        l.name,
                                                                                        " (",
                                                                                        l.group,
                                                                                        ")"
                                                                                    ]
                                                                                }, l.id, true, {
                                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                    lineNumber: 956,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 950,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 948,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "block font-bold text-blue-700 mb-1",
                                                                            children: "To (Credit Ledger)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 962,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            value: voucherForm.creditLedger,
                                                                            onChange: (e)=>setVoucherForm({
                                                                                    ...voucherForm,
                                                                                    creditLedger: e.target.value
                                                                                }),
                                                                            className: "w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#014421]",
                                                                            children: ledgers.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: l.name,
                                                                                    children: [
                                                                                        l.name,
                                                                                        " (",
                                                                                        l.group,
                                                                                        ")"
                                                                                    ]
                                                                                }, l.id, true, {
                                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                    lineNumber: 969,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 963,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 961,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 947,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-bold text-emerald-800 mb-1",
                                                                    children: "Voucher Amount (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 976,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    placeholder: "e.g. 5000",
                                                                    value: voucherForm.amount,
                                                                    onChange: (e)=>setVoucherForm({
                                                                            ...voucherForm,
                                                                            amount: e.target.value
                                                                        }),
                                                                    className: "w-full bg-white border border-slate-300 rounded px-3 py-2 text-lg font-mono font-bold text-emerald-800 focus:outline-none focus:border-[#014421]",
                                                                    required: true
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 977,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 975,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 944,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Narration"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 989,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            rows: 2,
                                                            placeholder: "Enter narration details...",
                                                            value: voucherForm.narration,
                                                            onChange: (e)=>setVoucherForm({
                                                                    ...voucherForm,
                                                                    narration: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 focus:outline-none focus:border-[#014421]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 990,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 988,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 flex justify-end gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setCurrentScreen('GATEWAY'),
                                                            className: "px-3.5 py-1.5 rounded bg-slate-200 text-slate-800 font-bold",
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1000,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "px-6 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow active:scale-95",
                                                            children: "Accept (Enter)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1008,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 999,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 918,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 887,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen === 'DAYBOOK' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-[#014421] font-black uppercase font-mono",
                                                            children: "Gateway of Tally ➔ Day Book"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1024,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-base font-black text-slate-900",
                                                            children: [
                                                                "Day Book Vouchers (",
                                                                vouchers.length,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1025,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1023,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCurrentScreen('VOUCHER_ENTRY'),
                                                    className: "px-3.5 py-1.5 rounded bg-[#014421] text-amber-300 font-black text-xs flex items-center gap-1 shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1032,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Add Voucher (F7)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1033,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1028,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1022,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white border-2 border-[#014421] rounded-xl overflow-hidden shadow-xl",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "overflow-x-auto max-h-[440px] custom-scrollbar",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "w-full text-xs text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            className: "bg-[#014421] text-white uppercase font-mono font-bold text-[10px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-2.5",
                                                                        children: "Date"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1042,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-2.5",
                                                                        children: "Voucher No"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1043,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-2.5",
                                                                        children: "Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1044,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-2.5",
                                                                        children: "Particulars (Debit ➔ Credit)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1045,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-2.5",
                                                                        children: "Patient / Party"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1046,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "p-2.5 text-right",
                                                                        children: "Amount (₹)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1047,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 1041,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1040,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            className: "divide-y divide-slate-200 text-slate-900 font-sans",
                                                            children: vouchers.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "hover:bg-slate-50",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2.5 font-mono text-slate-600 whitespace-nowrap",
                                                                            children: v.date
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 1053,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2.5 font-mono font-bold text-blue-700 whitespace-nowrap",
                                                                            children: v.voucherNo
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 1054,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2.5",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300",
                                                                                children: v.voucherType
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                lineNumber: 1056,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 1055,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold text-emerald-800 block",
                                                                                    children: v.debitLedger
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                    lineNumber: 1061,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[11px] text-slate-500 block",
                                                                                    children: [
                                                                                        "To ",
                                                                                        v.creditLedger
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                    lineNumber: 1062,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[10px] text-slate-400 italic block",
                                                                                    children: v.narration
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                                    lineNumber: 1063,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 1060,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2.5 font-bold text-slate-900 whitespace-nowrap",
                                                                            children: v.patientName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 1065,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-2.5 text-right font-mono font-extrabold text-emerald-800 text-sm whitespace-nowrap",
                                                                            children: [
                                                                                "₹",
                                                                                Number(v.amount).toLocaleString('en-IN')
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                            lineNumber: 1066,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1052,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1050,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1038,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1037,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1021,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                (currentScreen === 'BALANCE_SHEET' || currentScreen === 'P_AND_L' || currentScreen === 'TRIAL_BALANCE' || currentScreen === 'RATIO_ANALYSIS' || currentScreen === 'BANKING' || currentScreen === 'GST_SETTINGS') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900 font-sans",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-slate-300 pb-3 flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-[#014421] font-black uppercase font-mono",
                                                            children: "Gateway of Tally ➔ Reports"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1083,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-black text-slate-900 uppercase tracking-wider font-serif",
                                                            children: currentScreen.replace('_', ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1084,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-600 font-mono",
                                                    children: "Financial Year 2026-27"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1088,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1081,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        currentScreen === 'GST_SETTINGS' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4 max-w-lg mx-auto bg-slate-50 p-4 rounded border border-slate-300 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-[#014421]",
                                                    children: "GSTIN Configuration"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1093,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-slate-700 font-bold mb-1",
                                                            children: "GSTIN Registration Number"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1095,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: gstConfig.gstin,
                                                            onChange: (e)=>setGstConfig({
                                                                    ...gstConfig,
                                                                    gstin: e.target.value
                                                                }),
                                                            className: "w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono font-bold"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1096,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1094,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-slate-700 font-bold mb-1",
                                                            children: "HSN/SAC Code"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: gstConfig.hsnCode,
                                                            onChange: (e)=>setGstConfig({
                                                                    ...gstConfig,
                                                                    hsnCode: e.target.value
                                                                }),
                                                            className: "w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1105,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>triggerToast('GST Configuration saved!', 'success'),
                                                    className: "px-4 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow",
                                                    children: "Save GST Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1092,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)) : currentScreen === 'RATIO_ANALYSIS' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4 font-mono text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 p-4 rounded border border-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold block text-[#014421]",
                                                            children: "Quick Ratio"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1122,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-emerald-800",
                                                            children: "2.45"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1123,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1121,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 p-4 rounded border border-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold block text-[#014421]",
                                                            children: "Debt-Equity Ratio"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1126,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-emerald-800",
                                                            children: "0.18"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 p-4 rounded border border-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold block text-[#014421]",
                                                            children: "Debtors Turnover Ratio"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1130,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-emerald-800",
                                                            children: "5.2 Days"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1131,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1129,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 p-4 rounded border border-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold block text-[#014421]",
                                                            children: "Gross Margin %"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-emerald-800",
                                                            children: "68.5%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1133,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1120,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-x-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full text-xs text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "bg-[#014421] text-white uppercase font-mono font-bold text-[10px]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5",
                                                                    children: "Particulars Account"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1143,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-right",
                                                                    children: "Debit (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1144,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "p-2.5 text-right",
                                                                    children: "Credit (₹)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1145,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1142,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 1141,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        className: "divide-y divide-slate-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 font-bold text-slate-900",
                                                                        children: "Hospital Discount Allowed Account"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1150,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono text-emerald-800 font-bold",
                                                                        children: [
                                                                            "₹",
                                                                            totals.totalDiscounts.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1151,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono text-slate-400",
                                                                        children: "-"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1152,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 1149,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 font-bold text-slate-900",
                                                                        children: "Sundry Debtors - OPD Patients"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1155,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono text-slate-400",
                                                                        children: "-"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1156,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono text-emerald-800 font-bold",
                                                                        children: [
                                                                            "₹",
                                                                            totals.totalDiscounts.toLocaleString('en-IN')
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1157,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 1154,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 font-bold text-slate-900",
                                                                        children: "State Bank of India (Hospital A/c)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1160,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono text-emerald-800 font-bold",
                                                                        children: "₹6,50,000"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1161,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "p-2.5 text-right font-mono text-slate-400",
                                                                        children: "-"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                        lineNumber: 1162,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                lineNumber: 1159,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 1148,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                                        className: "bg-slate-100 border-t-2 border-[#014421] text-[#014421] font-mono font-black",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2.5 uppercase",
                                                                    children: "Total Balanced Figures"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1167,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2.5 text-right text-sm",
                                                                    children: [
                                                                        "₹",
                                                                        (totals.totalDiscounts + 650000).toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1168,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2.5 text-right text-sm",
                                                                    children: [
                                                                        "₹",
                                                                        (totals.totalDiscounts + 650000).toLocaleString('en-IN')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                                    lineNumber: 1169,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1166,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                        lineNumber: 1165,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1140,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1139,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1080,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentScreen === 'CREATE_COMPANY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-xl mx-auto bg-white border-2 border-[#014421] rounded-xl p-5 space-y-4 shadow-xl text-slate-900 font-sans",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-b border-slate-300 pb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-[#014421] font-black uppercase font-mono",
                                                    children: "Company Info ➔ Creation"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1182,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-black text-slate-900",
                                                    children: "Create / Alter Company Master"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1183,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1181,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSaveCompany,
                                            className: "space-y-3 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Company Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1188,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: companyForm.name,
                                                            onChange: (e)=>setCompanyForm({
                                                                    ...companyForm,
                                                                    name: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#014421]",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1189,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1187,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Industry Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1199,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: companyForm.companyType,
                                                            onChange: (e)=>setCompanyForm({
                                                                    ...companyForm,
                                                                    companyType: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1200,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1198,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block font-bold text-slate-700 mb-1",
                                                            children: "Address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1209,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: companyForm.address,
                                                            onChange: (e)=>setCompanyForm({
                                                                    ...companyForm,
                                                                    address: e.target.value
                                                                }),
                                                            className: "w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1210,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1208,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 flex justify-end gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setCurrentScreen('GATEWAY'),
                                                            className: "px-3 py-1.5 rounded bg-slate-200 text-slate-800 font-bold",
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1219,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "px-5 py-1.5 rounded bg-[#014421] text-amber-300 font-black shadow",
                                                            children: "Save Company (Enter)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                            lineNumber: 1227,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                    lineNumber: 1218,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                                            lineNumber: 1186,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1180,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 548,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-48 bg-[#014421] text-white p-2.5 border-l border-emerald-950 flex flex-col justify-start space-y-1 text-[11px] font-mono select-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-amber-300 uppercase font-black tracking-widest border-b border-emerald-800 pb-1 mb-1 text-center",
                                    children: "Function Keys"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1242,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentScreen('CREATE_COMPANY'),
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F1:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1247,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Select Cmp"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1247,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1246,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>triggerToast('Current Date: 14-Sep-2026', 'info'),
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F2:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1251,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Date / Period"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1251,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1250,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentScreen('CREATE_COMPANY'),
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F3:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1255,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Cmp Info"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1255,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1254,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveVoucherType('Contra');
                                        setVoucherForm((f)=>({
                                                ...f,
                                                voucherType: 'Contra'
                                            }));
                                        setCurrentScreen('VOUCHER_ENTRY');
                                    },
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F4:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1259,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Contra"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1259,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1258,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveVoucherType('Payment');
                                        setVoucherForm((f)=>({
                                                ...f,
                                                voucherType: 'Payment'
                                            }));
                                        setCurrentScreen('VOUCHER_ENTRY');
                                    },
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F5:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1263,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Payment"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1263,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1262,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveVoucherType('Receipt');
                                        setVoucherForm((f)=>({
                                                ...f,
                                                voucherType: 'Receipt'
                                            }));
                                        setCurrentScreen('VOUCHER_ENTRY');
                                    },
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F6:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1267,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Receipt"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1267,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1266,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveVoucherType('Journal');
                                        setVoucherForm((f)=>({
                                                ...f,
                                                voucherType: 'Journal'
                                            }));
                                        setCurrentScreen('VOUCHER_ENTRY');
                                    },
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F7:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1271,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Journal"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1271,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1270,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveVoucherType('Sales');
                                        setVoucherForm((f)=>({
                                                ...f,
                                                voucherType: 'Sales'
                                            }));
                                        setCurrentScreen('VOUCHER_ENTRY');
                                    },
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F8:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1275,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Sales"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1275,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1274,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveVoucherType('Purchase');
                                        setVoucherForm((f)=>({
                                                ...f,
                                                voucherType: 'Purchase'
                                            }));
                                        setCurrentScreen('VOUCHER_ENTRY');
                                    },
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F9:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1279,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Purchase"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1279,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1278,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentScreen('GST_SETTINGS'),
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F11:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1283,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Features"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1283,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1282,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentScreen('GST_SETTINGS'),
                                    className: "p-1.5 rounded hover:bg-amber-400 hover:text-slate-950 text-left border-b border-emerald-800/40 transition-colors font-bold flex justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: "F12:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TallyCloneModule.jsx",
                                                lineNumber: 1287,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Configure"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TallyCloneModule.jsx",
                                        lineNumber: 1287,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1286,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 1241,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                    lineNumber: 499,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#01351a] text-white px-4 py-2 border-t border-emerald-950 text-[11px] font-mono flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-black text-amber-300",
                                    children: "Tally MAIN"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1296,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-300",
                                    children: [
                                        "-- Gateway of Tally ➔ ",
                                        currentScreen
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1297,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 1295,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 text-emerald-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Stavya Spine Hospital OS Sync: Active"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1301,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-bold",
                                    children: "14-Sep-2026"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                                    lineNumber: 1302,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TallyCloneModule.jsx",
                            lineNumber: 1300,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TallyCloneModule.jsx",
                    lineNumber: 1294,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TallyCloneModule.jsx",
            lineNumber: 434,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/TallyCloneModule.jsx",
        lineNumber: 433,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TallyCloneModule, "n9ta07uRU7iGtw41rzQ/BI/zlc4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = TallyCloneModule;
var _c;
__turbopack_context__.k.register(_c, "TallyCloneModule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_TallyCloneModule_jsx_16hkrua._.js.map