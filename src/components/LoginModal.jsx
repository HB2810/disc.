import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KeyRound, User, Lock, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const LoginModal = ({ onClose }) => {
  const { users, setActiveUser, triggerToast } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const matchedUser = users.find(u => {
      const matchIdentifier = (
        (u.username && u.username.trim().toLowerCase() === inputUser) ||
        (u.email && u.email.trim().toLowerCase() === inputUser) ||
        (u.name && u.name.trim().toLowerCase() === inputUser) ||
        (u.id && u.id.trim().toLowerCase() === inputUser)
      );

      const userPass = (u.password || 'Pass@123').trim();
      const matchPassword = userPass === inputPass || userPass.toLowerCase() === inputPass.toLowerCase();

      return matchIdentifier && matchPassword;
    });

    if (matchedUser) {
      setActiveUser(matchedUser);
      triggerToast(`Successfully authenticated as ${matchedUser.name} (${matchedUser.role})!`, 'success');
      onClose();
    } else {
      setErrorMsg(`Invalid login details for "${username}". Please check credentials or select a user from the directory below.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card w-full max-w-md rounded-3xl p-6 md:p-8 bg-white border border-slate-200 shadow-2xl relative my-8 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">User Credentials Login</h3>
              <p className="text-xs text-slate-500">Authenticate using User ID, Email, or Name & Password</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 font-bold text-sm transition-all"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">User ID / Username / Email</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. admin_sys, md_evelyn, or email..."
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600 transition-all font-medium"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter account password..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600 transition-all font-medium"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              Authenticate & Login
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
