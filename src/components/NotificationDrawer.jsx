import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Phone, Mail, CheckCircle2, Radio, Send, ShieldAlert, X, MessageSquare, ExternalLink, Settings } from 'lucide-react';

export const NotificationDrawer = ({ onClose, onOpenGatewayModal }) => {
  const { notifications, activeUser } = useApp();

  const handleOpenWhatsApp = (phone, body) => {
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  const handleOpenSms = (phone, body) => {
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    const url = `sms:${cleanPhone}?body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  const handleOpenMail = (email, subject, body) => {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md h-full bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl overflow-hidden text-slate-900">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Live Notification Dispatch Log</h3>
                <p className="text-xs text-slate-500">Real-time SMS & Email tracking stream</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeUser?.role === 'ADMIN' && (
                <button
                  onClick={onOpenGatewayModal}
                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1 transition-all"
                  title="Configure Live SMS API (Twilio / EmailJS)"
                >
                  <Settings className="w-4 h-4" />
                  <span>Config API</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-3.5 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No notification dispatches logged yet.
              </div>
            ) : (
              notifications.map((notif) => {
                const isSMS = notif.type === 'SMS';
                return (
                  <div 
                    key={notif.id} 
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                          isSMS 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          {isSMS ? <Phone className="w-3 h-3 text-amber-600" /> : <Mail className="w-3 h-3 text-blue-600" />}
                          {notif.type} DISPATCH
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{notif.timestamp}</span>
                      </div>

                      <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        {notif.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-slate-800">
                        Recipient: <span className="text-blue-700 font-bold">{notif.recipientName}</span> ({notif.recipientContact})
                      </div>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed font-mono text-[11px]">
                        "{notif.body}"
                      </p>
                    </div>

                    {/* Direct 1-Click Mobile Dispatch Links */}
                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-medium">{notif.gateway}</span>
                      
                      <div className="flex items-center gap-2">
                        {isSMS ? (
                          <>
                            <button
                              onClick={() => handleOpenWhatsApp(notif.recipientContact, notif.body)}
                              className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold border border-emerald-200 flex items-center gap-1 transition-all"
                              title="Send real WhatsApp message to this mobile number"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-600" /> WhatsApp
                            </button>
                            <button
                              onClick={() => handleOpenSms(notif.recipientContact, notif.body)}
                              className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold border border-amber-200 flex items-center gap-1 transition-all"
                              title="Send real SMS via phone app"
                            >
                              <Phone className="w-3 h-3 text-amber-600" /> Direct SMS
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleOpenMail(notif.recipientContact, notif.subject, notif.body)}
                            className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold border border-blue-200 flex items-center gap-1 transition-all"
                            title="Send real Email via mail client"
                          >
                            <Mail className="w-3 h-3 text-blue-600" /> Direct Email
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
            <Radio className="w-3.5 h-3.5 text-blue-600 pulse-badge" />
            <span>Real-time SMS & Email Gateway connected</span>
          </p>
        </div>

      </div>
    </div>
  );
};
