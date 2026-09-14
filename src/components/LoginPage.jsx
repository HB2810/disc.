import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      if (!success) {
        setErrorMsg('Invalid User ID or Password. Please verify your credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Navbar Brand Bar */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-600/20 text-white font-extrabold text-xl">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
              Stavya Spine Hospital <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-blue-50 text-blue-700 border border-blue-200">Stavya Intelligence</span>
            </h1>
            <p className="text-xs text-slate-500">Research Institute Pvt. Ltd. • Discount Permission Portal</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-badge"></span>
          <span>Stavya System Active • Live Sync</span>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-10">
        <div className="w-full max-w-md">
          
          <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5">
            <div className="mb-8 text-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Stavya Intelligence Portal</h2>
              <p className="text-xs text-slate-500 mt-1">
                Stavya Spine Hospital & Research Institute Pvt. Ltd. Login Portal
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  User ID / Username / Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Enter your User ID or Username..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                  />
                  <User className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Enter account password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-11 py-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                  />
                  <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              Stavya Spine Hospital OS • Official Authorization Platform
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-slate-500 relative z-10 border-t border-slate-200 bg-white/60">
        © 2026 Stavya Spine Hospital & Research Institute Pvt. Ltd. All rights reserved.
      </footer>

    </div>
  );
};
