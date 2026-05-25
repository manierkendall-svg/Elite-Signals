import { useState } from 'react';
import { Lock, Mail, User, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from './lib/api';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.detail || 'Signup failed.');
      }

      alert('Account request submitted. Approving operator...');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed. Check backend connection.');
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
               <UserPlus className="text-[#39FF14]" size={32} />
               <div className="absolute inset-0 bg-[#39FF14]/20 blur-lg -z-10 animate-pulse" />
             </div>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em]">
            Join <span className="text-[#39FF14]">EliteSignal</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-mono">
            New Operator Registration
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Operator Callsign (Username)</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-[#39FF14] transition-colors" size={16} />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Alpha_One"
                  className="w-full bg-[#03030b] border border-[#1a1a23] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#39FF14]/50 transition-all font-mono"
                />
              </div>
            </div>

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
            Request Commission
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            Already Commissioned?{' '}
            <Link to="/login" className="text-[#39FF14] hover:underline font-bold">Authenticate Session</Link>
          </p>
        </div>

        <div className="pt-6 border-t border-[#1a1a23] flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-[#39FF14]/50" />
          <span className="text-[8px] font-mono text-slate-700 uppercase tracking-tighter">Secure Operator Enrollment Protocol</span>
        </div>
      </motion.div>
    </div>
  );
}
