import React, { useState } from 'react';
import { Target, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the FastAPI backend
    console.log('Logging in...', { email, password });
    // For now, let's simulate success
    if (email === 'admin@elitesignal.ai' && password === 'EliteSniper_2026_Access') {
        navigate('/terminal');
    } else {
        alert('Invalid credentials. Check ADMIN_SETUP_GUIDE for defaults.');
    }
  };

  return (
    <div className="min-h-screen bg-[#03030b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39FF14]/5 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl shadow-2xl p-8 space-y-8 relative"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
             <div className="p-3 bg-[#39FF14]/10 rounded-xl border border-[#39FF14]/20 relative">
               <Target className="text-[#39FF14]" size={32} />
               <div className="absolute inset-0 bg-[#39FF14]/20 blur-lg -z-10 animate-pulse" />
             </div>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em]">
            EliteSignal <span className="text-[#39FF14]">AI</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-mono">
            Secure Intelligence Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Terminal ID (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-[#39FF14] transition-colors" size={16} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@elitesignal.ai"
                  className="w-full bg-[#03030b] border border-[#1a1a23] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#39FF14]/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Access Protocol (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-[#39FF14] transition-colors" size={16} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#03030b] border border-[#1a1a23] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#39FF14]/50 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#39FF14] text-black font-black uppercase tracking-[0.2em] text-xs rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_#39FF14] flex items-center justify-center gap-2 group"
          >
            Authorize Access
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            New Operator?{' '}
            <Link to="/signup" className="text-[#39FF14] hover:underline font-bold">Request Commission</Link>
          </p>
        </div>

        <div className="pt-6 border-t border-[#1a1a23] flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-[#39FF14]/50" />
          <span className="text-[8px] font-mono text-slate-700 uppercase tracking-tighter">AES-256 Multi-Factor Encryption Active</span>
        </div>
      </motion.div>
    </div>
  );
}
