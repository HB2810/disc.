import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RequestCard } from './RequestCard';
import { 
  IndianRupee, 
  Percent, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  Filter, 
  ShieldAlert, 
  FileSpreadsheet,
  PieChart as PieIcon,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

export const Dashboard = ({ onSelectRequest, onOpenNewModal, onOpenExcelModal }) => {
  const { requests, activeUser, services } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [authorityFilter, setAuthorityFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [matrixFilter, setMatrixFilter] = useState('ALL');

  // Key KPI metrics calculations
  const totalBillSum = requests.reduce((acc, r) => acc + Number(r.totalBillAmount || 0), 0);
  const approvedRequests = requests.filter(r => r.status === 'APPROVED');
  const pendingRequests = requests.filter(r => r.status?.startsWith('PENDING'));
  const rejectedRequests = requests.filter(r => r.status === 'REJECTED');
  const directGrantRequests = requests.filter(r => r.isDirectExecutiveGrant);

  const totalDiscountGranted = approvedRequests.reduce((acc, r) => acc + Number(r.calculatedDiscountAmount || 0), 0);
  const pendingDiscountValue = pendingRequests.reduce((acc, r) => acc + Number(r.calculatedDiscountAmount || 0), 0);
  
  const approvalRate = requests.length > 0 ? ((approvedRequests.length / requests.length) * 100).toFixed(0) : 0;

  // Chart Data 1: Departmental Breakdown
  const deptDataMap = requests.reduce((acc, r) => {
    const dept = (r.department || 'General').split(' ')[0];
    const val = Number(r.calculatedDiscountAmount || 0);
    acc[dept] = (acc[dept] || 0) + val;
    return acc;
  }, {});

  const realDeptChartData = Object.keys(deptDataMap).map(dept => ({
    department: dept,
    discountAmount: deptDataMap[dept]
  }));

  const sampleDeptChartData = [
    { department: 'Spine Surg.', discountAmount: 185000 },
    { department: 'OPD/Consult', discountAmount: 64000 },
    { department: 'Pathology', discountAmount: 42000 },
    { department: 'MRI/Rad.', discountAmount: 120000 },
    { department: 'Physio.', discountAmount: 35000 }
  ];

  const departmentChartData = realDeptChartData.length > 0 ? realDeptChartData : sampleDeptChartData;

  // Chart Data 2: Reason Distribution
  const reasonDataMap = requests.reduce((acc, r) => {
    const reason = (r.reasonCategory || 'Other').split('/')[0].trim();
    acc[reason] = (acc[reason] || 0) + 1;
    return acc;
  }, {});

  const realReasonChartData = Object.keys(reasonDataMap).map(reason => ({
    name: reason,
    value: reasonDataMap[reason]
  }));

  const sampleReasonChartData = [
    { name: 'Financial Hardship', value: 14 },
    { name: 'Doctor Concession', value: 11 },
    { name: 'Staff / Relative', value: 8 },
    { name: 'Senior Citizen', value: 6 },
    { name: 'Institutional', value: 5 }
  ];

  const reasonChartData = realReasonChartData.length > 0 ? realReasonChartData : sampleReasonChartData;

  const BAR_COLORS = ['#2563eb', '#0d9488', '#7c3aed', '#ea580c', '#059669', '#e11d48', '#0284c7', '#d97706'];
  const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#6366f1'];

  // Filter requests
  const filteredRequests = requests.filter(r => {
    const matchesSearch = (
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.requestCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus = 
      statusFilter === 'ALL' || 
      r.status === statusFilter || 
      (statusFilter === 'PENDING' && r.status?.startsWith('PENDING')) ||
      (statusFilter === 'PENDING_CFO' && (r.status === 'PENDING_CFO' || (r.requiredAuthorityRole === 'CFO' && r.status?.startsWith('PENDING'))));

    const matchesAuthority = 
      authorityFilter === 'ALL' || 
      r.requiredAuthorityRole === authorityFilter || 
      r.currentApproverRole === authorityFilter ||
      (authorityFilter === 'CFO' && (r.requiredAuthorityRole === 'CFO' || r.status === 'PENDING_CFO'));
    const matchesService = serviceFilter === 'ALL' || r.serviceName === serviceFilter;
    const matchesMatrix = matrixFilter === 'ALL' || Number(r.requestedDiscountVal) === Number(matrixFilter);

    return matchesSearch && matchesStatus && matchesAuthority && matchesService && matchesMatrix;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Stavya Spine Hospital & Research Institute Pvt. Ltd.
            <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase tracking-wider">
              Stavya Intelligence
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Stavya Billing Desk ➔ Chief Accountant ➔ CFO Permission ➔ MD/Chairman Approval • Live Sync
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExcelModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export Excel Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 border-l-4 border-l-blue-600 relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Discount Authorized</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-blue-700">
              ₹{totalDiscountGranted.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Out of ₹{totalBillSum.toLocaleString('en-IN')} gross billings</span>
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Permissions</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-extrabold text-amber-700">{pendingRequests.length}</h3>
              <span className="text-xs text-amber-700 font-bold">(₹{pendingDiscountValue.toLocaleString('en-IN')})</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Chief Accountant / CFO / MD / Chairman</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Approval Ratio</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-700">{approvalRate}%</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {approvedRequests.length} approved • {rejectedRequests.length} rejected
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200 border-l-4 border-l-indigo-600 relative overflow-hidden transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Direct Exec Grants</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-indigo-700">{directGrantRequests.length}</h3>
            <p className="text-[11px] font-semibold text-blue-600 mt-1">
              Direct MD / Chairman Patient Waivers
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Discount Value by Department */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-900">Discount Waiver Granted by Department (₹)</h3>
            </div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Live Analytics</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentChartData}>
                <XAxis dataKey="department" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#2563eb', borderRadius: '12px', fontSize: '12px', color: '#0f172a', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.15)' }}
                  itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Discount Waiver']}
                />
                <Bar dataKey="discountAmount" radius={[8, 8, 0, 0]}>
                  {departmentChartData.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Reason Breakdown */}
        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Requests Breakdown by Reason Category</h3>
            </div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Proportion</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reasonChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {reasonChartData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#2563eb', borderRadius: '12px', fontSize: '12px', color: '#0f172a', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.15)' }}
                  itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  formatter={(val, name) => [`${val} Request(s)`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#475569' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search patient, ID, doctor, or code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
            
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto overflow-x-auto no-scrollbar scroll-px-2">
              {['ALL', 'PENDING', 'PENDING_CFO', 'APPROVED', 'REJECTED'].map(st => {
                let label = 'All';
                if (st === 'PENDING') label = 'Pending';
                if (st === 'PENDING_CFO') label = 'Pending CFO';
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

            {/* Authority Target Filter */}
            <select
              value={authorityFilter}
              onChange={e => setAuthorityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-8 py-2 text-xs text-slate-900 focus:outline-none font-semibold w-full md:w-auto max-w-full truncate"
            >
              <option value="ALL">All Approval Procedure Tiers</option>
              <option value="BILLING_MANAGER">Finance Manager (Up to ₹25,000/-)</option>
              <option value="CFO">CFO (Above ₹25,000/- - ₹2,00,000/-)</option>
              <option value="MD">MD / Chairman / Director (Above ₹2,00,000/-)</option>
            </select>

            {/* Hospital Service Filter */}
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="bg-slate-50 border border-blue-200 text-blue-900 rounded-xl pl-4 pr-8 py-2 text-xs focus:outline-none font-semibold w-full md:w-auto max-w-full truncate"
            >
              <option value="ALL">All Hospital Services</option>
              {services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Discount Matrix Filter */}
            <select
              value={matrixFilter}
              onChange={e => setMatrixFilter(e.target.value)}
              className="bg-slate-50 border border-indigo-200 text-indigo-900 rounded-xl pl-4 pr-8 py-2 text-xs focus:outline-none font-bold w-full md:w-auto max-w-full truncate"
            >
              <option value="ALL">All Matrix Tiers</option>
              <option value="10">10% Matrix</option>
              <option value="25">25% Matrix</option>
              <option value="50">50% Matrix</option>
              <option value="100">100% Matrix (Full Charity)</option>
            </select>

          </div>

        </div>
      </div>

      {/* Requests Grid */}
      {filteredRequests.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-200">
          <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700">No discount requests found</h4>
          <p className="text-xs text-slate-500 mt-1">Try resetting search filters or submit a new discount request.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRequests.map(req => (
            <RequestCard key={req.id} request={req} onSelect={onSelectRequest} />
          ))}
        </div>
      )}

    </div>
  );
};
