import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  getApiHealth, 
  exportDataPackage, 
  importDataPackage, 
  createDiscountRequestApi, 
  registerWebhookApi, 
  triggerTestWebhookApi,
  adaptExternalHisRecord
} from '../utils/apiClient';
import { 
  Globe, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  Radio, 
  Code, 
  FileText, 
  Terminal, 
  ShieldCheck, 
  RefreshCw, 
  Send, 
  Cpu, 
  Layers, 
  Settings,
  Database,
  ArrowRight,
  Calendar,
  Clock,
  Save,
  CheckCircle2
} from 'lucide-react';

export const PortingModal = ({ onClose }) => {
  const { 
    requests, 
    users, 
    doctors, 
    departments, 
    services, 
    importSystemSyncData, 
    triggerToast,
    dailyBackups,
    performDailyBackup,
    downloadDailyBackup,
    restoreDailyBackup,
    autoDownloadDailyBackup,
    setAutoDownloadDailyBackup
  } = useApp();

  const [activeTab, setActiveTab] = useState('DAILY_BACKUP'); // 'DAILY_BACKUP', 'EXPORT_IMPORT', 'REST_API', 'OPENAPI', 'WEBHOOKS', 'HIS_ADAPTER'
  const [copiedCurl, setCopiedCurl] = useState('');
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [apiHealth, setApiHealth] = useState(null);
  const [apiKey, setApiKey] = useState('stavya_live_key_prod_v1');
  const [copiedKey, setCopiedKey] = useState(false);
  
  // Webhooks state
  const [webhookUrl, setWebhookUrl] = useState('https://his.stavya.org/api/discount-callback');
  const [webhooksList, setWebhooksList] = useState([]);
  const [webhookTestStatus, setWebhookTestStatus] = useState(null);

  // HIS Adapter state
  const [hisJsonInput, setHisJsonInput] = useState(`{
  "uhid": "UHID-2026-9042",
  "patient_name": "Suresh Patel",
  "age": 55,
  "gender": "Male",
  "department": "Radiology",
  "service": "MRI",
  "doctor": "Dr. Rajesh Kumar",
  "gross_amount": 22000,
  "discount_percent": 15,
  "remarks": "Spine OPD patient requesting hospital concession"
}`);
  const [convertedHisRecord, setConvertedHisRecord] = useState(null);

  useEffect(() => {
    getApiHealth().then(setApiHealth);
  }, []);

  useEffect(() => {
    try {
      const parsed = JSON.parse(hisJsonInput);
      setConvertedHisRecord(adaptExternalHisRecord(parsed));
    } catch (e) {
      setConvertedHisRecord(null);
    }
  }, [hisJsonInput]);

  const handleExportPackage = () => {
    exportDataPackage()
      .then(bundle => {
        const jsonStr = JSON.stringify(bundle, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `stavya_software_export_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        triggerToast('Full software data package exported successfully!', 'success');
      })
      .catch(err => {
        triggerToast(`Export error: ${err.message}`, 'warning');
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsed = JSON.parse(content);
        const ok = importSystemSyncData(content);
        if (ok) {
          triggerToast('Data package successfully ported into software!', 'success');
          onClose();
        }
      } catch (err) {
        triggerToast('Invalid JSON file format', 'warning');
      }
    };
    reader.readAsText(file);
  };

  const handleTextImport = (e) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const ok = importSystemSyncData(importJsonText);
    if (ok) {
      triggerToast('External software data imported successfully!', 'success');
      setImportJsonText('');
      onClose();
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    if (key === 'OPENAPI') {
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2500);
    } else if (key === 'APIKEY') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2500);
    } else {
      setCopiedCurl(key);
      setTimeout(() => setCopiedCurl(''), 2500);
    }
    triggerToast('Copied to clipboard!', 'success');
  };

  const handleRegisterWebhook = (e) => {
    e.preventDefault();
    if (!webhookUrl) return;
    registerWebhookApi(webhookUrl)
      .then(res => {
        setWebhooksList(prev => [...prev, res.webhook]);
        triggerToast('Webhook URL registered successfully!', 'success');
      })
      .catch(err => {
        triggerToast(`Webhook registration failed: ${err.message}`, 'warning');
      });
  };

  const handleTestWebhook = () => {
    setWebhookTestStatus('sending');
    triggerTestWebhookApi()
      .then(res => {
        setWebhookTestStatus('success');
        triggerToast('Test Webhook dispatched successfully!', 'success');
      })
      .catch(() => {
        setWebhookTestStatus('error');
      });
  };

  const handleImportConvertedHisRecord = () => {
    if (!convertedHisRecord) return;
    createDiscountRequestApi(convertedHisRecord)
      .then(res => {
        triggerToast(`Ported HIS record into system! Request ID: ${res.request.id}`, 'success');
        onClose();
      })
      .catch(err => {
        triggerToast(`Port error: ${err.message}`, 'warning');
      });
  };

  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/v1` : 'http://localhost:3000/api/v1';

  const Curls = {
    health: `curl -X GET "${baseUrl}/health"`,
    export: `curl -X GET "${baseUrl}/export" -o "stavya_export.json"`,
    import: `curl -X POST "${baseUrl}/import" \\
  -H "Content-Type: application/json" \\
  -d '{"payload": {"requests": []}}'`,
    createRequest: `curl -X POST "${baseUrl}/requests" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "patientId": "UHID-2026-9901",
    "patientName": "Sunil Varma",
    "totalBillAmount": 25000,
    "requestedDiscountVal": 10,
    "requestedDiscountType": "PERCENTAGE",
    "serviceName": "MRI",
    "doctorName": "Dr. Rajesh Kumar"
  }'`,
    getRequests: `curl -X GET "${baseUrl}/requests?status=APPROVED"`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-auto text-slate-900">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
              <Globe className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                Software Integration & Porting API
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-extrabold uppercase">
                  v1.0 REST API
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Port data to/from external Hospital Software (HIS, EMR, ERP, Tally, SQL, or custom apps).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {apiHealth && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                API Server {apiHealth.status === 'online' ? 'Online (3000)' : 'Offline'}
              </span>
            )}

            <button
              onClick={onClose}
              className="h-9 w-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 px-4 pt-3 border-b border-slate-200 flex gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('DAILY_BACKUP')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'DAILY_BACKUP'
                ? 'bg-white text-emerald-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            📅 Daily Auto-Backup & Snapshots
          </button>

          <button
            onClick={() => setActiveTab('EXPORT_IMPORT')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'EXPORT_IMPORT'
                ? 'bg-white text-blue-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-blue-600" />
            Data Package Migration
          </button>

          <button
            onClick={() => setActiveTab('REST_API')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'REST_API'
                ? 'bg-white text-blue-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-600" />
            REST API Explorer
          </button>

          <button
            onClick={() => setActiveTab('OPENAPI')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'OPENAPI'
                ? 'bg-white text-blue-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-4 h-4 text-blue-600" />
            OpenAPI 3.0 Spec
          </button>

          <button
            onClick={() => setActiveTab('WEBHOOKS')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'WEBHOOKS'
                ? 'bg-white text-blue-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4 text-amber-600" />
            Webhooks & Callbacks
          </button>

          <button
            onClick={() => setActiveTab('HIS_ADAPTER')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'HIS_ADAPTER'
                ? 'bg-white text-blue-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-blue-600" />
            HIS / EMR Adapter
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 custom-scrollbar bg-slate-50/50">
          
          {/* 0. DAILY AUTOMATED BACKUP TAB */}
          {activeTab === 'DAILY_BACKUP' && (
            <div className="space-y-6">
              
              {/* Daily Backup Status Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl space-y-4 relative overflow-hidden border border-blue-800/40">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 inline-flex items-center gap-1 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Automated Daily Backup Scheduler Active
                    </span>
                    <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      Every Day Automatic Data Backup & Snapshots
                    </h4>
                    <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
                      System automatically creates full database backup snapshots of all discount requests, staff accounts, doctors, and configuration data every day.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => performDailyBackup()}
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 whitespace-nowrap"
                  >
                    <Save className="w-4 h-4 stroke-[3]" />
                    <span>Create Daily Backup Now</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-200 relative z-10">
                  <div className="flex items-center gap-4">
                    <span>📅 Today: <strong className="text-white">{new Date().toISOString().split('T')[0]}</strong></span>
                    <span>⚡ Daily Snapshots Saved: <strong className="text-emerald-300">{dailyBackups.length} Days</strong></span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer bg-blue-900/40 hover:bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-700/60 transition-all">
                    <input
                      type="checkbox"
                      checked={autoDownloadDailyBackup}
                      onChange={e => setAutoDownloadDailyBackup(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                    <span className="text-xs font-bold text-white">Auto-Download Daily JSON File to Browser</span>
                  </label>
                </div>
              </div>

              {/* Daily Backup History List */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Daily Backup Snapshots History ({dailyBackups.length})
                    </h4>
                    <p className="text-xs text-slate-500">
                      Rolling 30-day automated data backups. Download JSON or restore system state anytime.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => performDailyBackup()}
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Take Today's Snapshot</span>
                  </button>
                </div>

                {dailyBackups.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <Database className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 font-semibold">No daily backup snapshots saved yet for today.</p>
                    <button
                      type="button"
                      onClick={() => performDailyBackup()}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md"
                    >
                      Generate Today's Daily Backup Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                    {dailyBackups.map(item => (
                      <div
                        key={item.id || item.date}
                        className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm flex-shrink-0">
                            📅
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-slate-900">{item.date}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-200">
                                {item.requestsCount} Requests | {item.usersCount} Staff | {item.doctorsCount} Doctors
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                              Snapshot Time: {new Date(item.timestamp).toLocaleTimeString()} | Size: {(item.sizeBytes / 1024).toFixed(1)} KB
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => downloadDailyBackup(item)}
                            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download JSON</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => restoreDailyBackup(item)}
                            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-slate-700" />
                            <span>Restore Data</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 1. DATA PACKAGE MIGRATION TAB */}
          {activeTab === 'EXPORT_IMPORT' && (
            <div className="space-y-6">
              
              {/* Export Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest block">
                    Export Complete System State
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    Export Complete Software Package (.JSON)
                  </h4>
                  <p className="text-xs text-slate-600 max-w-lg leading-relaxed font-medium">
                    Downloads a signed JSON bundle containing all {requests.length} discount requests, {users.length} hospital staff users, doctors, departments, and services.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExportPackage}
                  className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-95 flex-shrink-0"
                >
                  <Download className="w-4 h-4 stroke-[3]" />
                  <span>Download Export Package</span>
                </button>
              </div>

              {/* Import File Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest block">
                    Import & Restore State
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    Upload & Port External Data Package
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Select an exported `.json` data package from another software instance or backup to merge/overwrite.
                  </p>
                </div>

                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors bg-blue-50/40">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2 opacity-80" />
                  <label className="cursor-pointer inline-block">
                    <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm">
                      Choose Export JSON File
                    </span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 mt-2 font-medium">Supports official Stavya JSON Package schema (v1.0)</p>
                </div>
              </div>

              {/* Paste Raw JSON */}
              <form onSubmit={handleTextImport} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  Or Paste Raw JSON Package Payload
                </h4>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste JSON array or export bundle object here..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 transition-all"
                />
                <button
                  type="submit"
                  disabled={!importJsonText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-all active:scale-95 disabled:opacity-40"
                >
                  Import Pasted Payload
                </button>
              </form>

            </div>
          )}

          {/* 2. REST API EXPLORER TAB */}
          {activeTab === 'REST_API' && (
            <div className="space-y-6">
              
              {/* API Bearer Token Banner */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Authentication API Bearer Key</span>
                  <p className="text-xs font-mono font-bold text-blue-700">{apiKey}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(apiKey, 'APIKEY')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-extrabold text-xs flex items-center gap-1.5 transition-all"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>

              {/* Endpoints List */}
              <div className="space-y-4">
                
                {/* 1. GET /api/v1/health */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      GET /api/v1/health
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Health Check & Server Status</span>
                  </div>
                  <div className="relative bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-100 overflow-x-auto">
                    <pre>{Curls.health}</pre>
                    <button
                      onClick={() => handleCopy(Curls.health, 'health')}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      {copiedCurl === 'health' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 2. POST /api/v1/requests */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                      POST /api/v1/requests
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Create Request from HIS/EMR</span>
                  </div>
                  <div className="relative bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-100 overflow-x-auto">
                    <pre>{Curls.createRequest}</pre>
                    <button
                      onClick={() => handleCopy(Curls.createRequest, 'createRequest')}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      {copiedCurl === 'createRequest' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 3. GET /api/v1/export */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                      GET /api/v1/export
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Download JSON Data Bundle</span>
                  </div>
                  <div className="relative bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-100 overflow-x-auto">
                    <pre>{Curls.export}</pre>
                    <button
                      onClick={() => handleCopy(Curls.export, 'export')}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      {copiedCurl === 'export' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 4. GET /api/v1/requests */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      GET /api/v1/requests
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Fetch Discount Requests</span>
                  </div>
                  <div className="relative bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-100 overflow-x-auto">
                    <pre>{Curls.getRequests}</pre>
                    <button
                      onClick={() => handleCopy(Curls.getRequests, 'getRequests')}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      {copiedCurl === 'getRequests' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. OPENAPI SPEC TAB */}
          {activeTab === 'OPENAPI' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">OpenAPI 3.0 Specification (Swagger Format)</h4>
                  <p className="text-xs text-slate-500">Use this JSON spec to auto-generate Python/C#/Java/JS clients for hospital developers.</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`${baseUrl}/openapi.json`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-all flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Open Raw URL</span>
                  </a>
                  <button
                    onClick={() => {
                      fetch(`${baseUrl}/openapi.json`)
                        .then(r => r.text())
                        .then(t => handleCopy(t, 'OPENAPI'));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    {copiedSpec ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{copiedSpec ? 'Copied' : 'Copy Spec JSON'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-100 max-h-[380px] overflow-y-auto">
                <pre>{JSON.stringify({
                  openapi: "3.0.3",
                  info: {
                    title: "Stavya Spine Hospital — Discount & Approval Integration API",
                    version: "1.0.0"
                  },
                  servers: [{ url: `${baseUrl}` }],
                  paths: {
                    "/health": { get: { summary: "Check API Health Status" } },
                    "/export": { get: { summary: "Export Full Software Data Package" } },
                    "/import": { post: { summary: "Import External System Data Package" } },
                    "/requests": { get: { summary: "List Discount Requests" }, post: { summary: "Create New Request" } },
                    "/users": { get: { summary: "List User Directory" }, post: { summary: "Sync User Directory" } },
                    "/webhooks": { get: { summary: "List Webhooks" }, post: { summary: "Register Webhook Callback" } }
                  }
                }, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* 4. WEBHOOKS TAB */}
          {activeTab === 'WEBHOOKS' && (
            <div className="space-y-6">
              <form onSubmit={handleRegisterWebhook} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-amber-600" />
                    Register Integration Webhook Callback
                  </h4>
                  <p className="text-xs text-slate-500">
                    Enter an external HIS HTTP POST endpoint to receive live payloads whenever discount requests are created or approved.
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-his-server.com/api/webhooks/discount"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    Register Callback
                  </button>
                </div>
              </form>

              {/* Webhook Live Test Trigger */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Test Webhook Delivery</h4>
                  <p className="text-xs text-slate-500">Send a sample discount approval payload to test listener connectivity.</p>
                </div>
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fire Test Event</span>
                </button>
              </div>

              {/* Registered Webhooks List */}
              {webhooksList.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Active Registered Webhooks</h4>
                  {webhooksList.map(wh => (
                    <div key={wh.id} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-700 font-bold">{wh.url}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">ACTIVE</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. HIS / EMR ADAPTER TAB */}
          {activeTab === 'HIS_ADAPTER' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  Third-Party HIS/EMR Payload Adapter Transformer
                </h4>
                <p className="text-xs text-slate-500">
                  Paste JSON from Epic, Cerner, Tally, or custom hospital software. The adapter automatically maps fields to Stavya Discount format.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Input Payload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">External Software JSON Payload</label>
                  <textarea
                    rows={12}
                    value={hisJsonInput}
                    onChange={(e) => setHisJsonInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono text-blue-900 focus:outline-none focus:border-blue-600 transition-all font-medium"
                  />
                </div>

                {/* Transformed Output */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-blue-700 flex items-center gap-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                      Adapted Stavya System Format
                    </label>
                    {convertedHisRecord && (
                      <button
                        onClick={handleImportConvertedHisRecord}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
                      >
                        Port & Create Request
                      </button>
                    )}
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 h-[260px] overflow-y-auto">
                    {convertedHisRecord ? (
                      <pre>{JSON.stringify(convertedHisRecord, null, 2)}</pre>
                    ) : (
                      <span className="text-rose-400">Invalid JSON input</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold transition-all"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
