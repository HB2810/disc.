import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Copy, Check, QrCode, Download, Upload, ShieldCheck, Sparkles, Globe } from 'lucide-react';

export const MobileSyncModal = ({ onClose }) => {
  const { getMobileSyncUrl, importSystemSyncData, triggerToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [pasteToken, setPasteToken] = useState('');

  const mobileSyncUrl = getMobileSyncUrl ? getMobileSyncUrl() : window.location.href;
  const targetQrValue = mobileSyncUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mobileSyncUrl);
    setCopied(true);
    triggerToast('Mobile Sync Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleImport = (e) => {
    e.preventDefault();
    if (!pasteToken) return;
    const ok = importSystemSyncData(pasteToken);
    if (ok) {
      setPasteToken('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 md:p-8 bg-white border border-slate-200 shadow-2xl relative my-auto custom-scrollbar text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Desktop ➔ Mobile Sync
                <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                  Cross-Device
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Scan QR Code with any phone camera to launch Stavya Spine Hospital on Mobile.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition-all"
          >
            ✕
          </button>
        </div>

        {/* QR Code & Direct Link Section */}
        <div className="space-y-6">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center justify-center gap-1.5">
              <QrCode className="w-4 h-4 text-blue-600" />
              Scan to Open Mobile Web App
            </h4>

            {/* Ultra High Contrast Scannable SVG QR Code */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mx-auto border-2 border-slate-200">
              <QRCodeSVG 
                value={targetQrValue} 
                size={210}
                level="L"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono font-bold text-blue-800 bg-blue-50 py-1.5 px-3 rounded-lg border border-blue-200 inline-block max-w-full truncate">
                {targetQrValue}
              </p>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed pt-1 font-medium">
                Open Camera app on your phone and point at the QR code above.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Mobile Sync Link Copied!' : 'Copy Mobile Sync Link'}</span>
              </button>
            </div>
          </div>

          {/* Paste Sync Token Section */}
          <form onSubmit={handleImport} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-blue-600" />
              Or Paste Sync Link / Token Manually
            </h4>

            <div>
              <input
                type="text"
                placeholder="Paste mobile sync URL or token here..."
                value={pasteToken}
                onChange={e => setPasteToken(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!pasteToken}
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-all active:scale-95 disabled:opacity-40"
            >
              Import System Data to Mobile
            </button>
          </form>

          {/* Instructions Guide */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 text-xs text-slate-600 space-y-2 font-medium">
            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">How It Works</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>When you create a user or request on Desktop, click <b>Copy Mobile Sync Link</b>.</li>
              <li>Open the copied link on your phone (e.g. via WhatsApp, Email, or Browser).</li>
              <li>Your phone will automatically load all desktop users, roles, and requests!</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
