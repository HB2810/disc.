import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabaseClient';
import { Radio, Database, Copy, Check, ShieldCheck, Key } from 'lucide-react';

export const SupabaseSettingsModal = ({ onClose }) => {
  const { supabaseConfig, setSupabaseConfig, triggerToast } = useApp();
  const [url, setUrl] = useState(supabaseConfig.url || '');
  const [anonKey, setAnonKey] = useState(supabaseConfig.anonKey || '');
  const [copied, setCopied] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (url && anonKey) {
      setSupabaseConfig({
        url,
        anonKey,
        isConnected: true
      });
      triggerToast('Custom Supabase cloud database connected successfully!', 'success');
    } else {
      setSupabaseConfig({
        url: '',
        anonKey: '',
        isConnected: false
      });
      triggerToast('Using built-in WebSocket reactive engine with local cache.', 'info');
    }
    onClose();
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    triggerToast('Supabase SQL Schema copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card w-full max-w-xl rounded-3xl p-6 md:p-8 bg-white border border-slate-200 shadow-2xl relative my-8 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Supabase & WebSocket Realtime Config</h3>
              <p className="text-xs text-slate-500">Configure Cloud Database Connection or SQL Schema</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 font-bold text-sm transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Supabase Project URL</label>
            <input
              type="text"
              placeholder="https://your-project.supabase.co"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Supabase Anon Public Key</label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono transition-all"
            />
          </div>

          {/* SQL Schema Generator Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Supabase PostgreSQL Schema SQL Script
              </span>
              <button
                type="button"
                onClick={handleCopySchema}
                className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                {copied ? 'Copied!' : 'Copy SQL Schema'}
              </button>
            </div>
            
            <pre className="p-3 rounded-xl bg-white border border-slate-200 text-[10px] text-slate-700 font-mono overflow-x-auto max-h-36 scrollbar-thin">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              Save Configuration
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
