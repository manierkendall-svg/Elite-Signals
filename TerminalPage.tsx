import React, { useState, useEffect } from 'react';
import { 
  Target, Activity, BarChart2, Cpu, Database, 
  Settings, LogOut, Shield, Zap, Globe, 
  ChevronRight, Calculator, PieChart, TrendingUp,
  Video, Search, UploadCloud, FileJson, Key, HardDrive, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

// TradingView Widget Component
const TVWidget = ({ symbol, title }: { symbol: string, title: string }) => {
  const containerId = `tv_widget_${symbol.replace('/', '_')}`;
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": symbol,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "dateRange": "12M",
      "colorTheme": "dark",
      "isTransparent": true,
      "autosize": true,
      "largeChartUrl": ""
    });
    
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] border border-[#1a1a23] rounded-xl overflow-hidden group hover:border-[#39FF14]/30 transition-all">
      <div className="px-3 py-2 border-b border-[#1a1a23] bg-black/40 flex justify-between items-center">
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{title}</span>
        <TrendingUp size={12} className="text-[#39FF14] opacity-50" />
      </div>
      <div id={containerId} className="flex-1 w-full" />
    </div>
  );
};

export default function TerminalPage() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'intelligence' | 'vault' | 'settings'>('terminal');
  const navigate = useNavigate();

  const forexPairs = [
    { symbol: "FX:EURUSD", title: "EUR/USD" },
    { symbol: "FX:GBPUSD", title: "GBP/USD" },
    { symbol: "FX:USDJPY", title: "USD/JPY" },
    { symbol: "FX:AUDUSD", title: "AUD/USD" },
    { symbol: "FX:USDCAD", title: "USD/CAD" },
  ];

  const cryptoPairs = [
    { symbol: "BINANCE:BTCUSDT", title: "BTC/USDT" },
    { symbol: "BINANCE:ETHUSDT", title: "ETH/USDT" },
    { symbol: "BINANCE:SOLUSDT", title: "SOL/USDT" },
    { symbol: "BINANCE:BNBUSDT", title: "BNB/USDT" },
    { symbol: "BINANCE:XRPUSDT", title: "XRP/USDT" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#03030b] text-slate-300 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-[#0a0a0f] border-r border-[#1a1a23] flex flex-col z-20 transition-all">
        <div className="h-20 flex items-center px-6 border-b border-[#1a1a23] gap-3">
          <div className="p-2 bg-[#39FF14]/10 rounded-lg border border-[#39FF14]/20">
            <Target className="text-[#39FF14]" size={20} />
          </div>
          <span className="hidden lg:block font-black text-xs tracking-[0.2em] text-white uppercase">
            EliteSignal <span className="text-[#39FF14]">AI</span>
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {[
            { id: 'terminal', icon: Activity, label: 'Market Pulse' },
            { id: 'intelligence', icon: Zap, label: 'Sniper Engine' },
            { id: 'vault', icon: Database, label: 'Data Vault' },
            { id: 'settings', icon: Settings, label: 'Infra Hub' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                activeTab === item.id 
                  ? "bg-[#39FF14]/10 text-white border border-[#39FF14]/30" 
                  : "text-slate-500 hover:text-slate-200 hover:bg-[#1a1a23]/50"
              )}
            >
              <item.icon size={20} className={cn("transition-colors", activeTab === item.id ? "text-[#39FF14]" : "group-hover:text-white")} />
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto hidden lg:block text-[#39FF14]" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-[#1a1a23]">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all uppercase text-[10px] font-bold tracking-widest"
          >
            <LogOut size={20} />
            <span className="hidden lg:block">Terminate</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 border-b border-[#1a1a23] bg-[#0a0a0f]/50 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Environment</span>
              <span className="text-xs font-black text-white uppercase tracking-wider">{activeTab}</span>
            </div>
            <div className="h-8 w-px bg-[#1a1a23]" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-full animate-pulse-neon-green">
              <Shield size={12} className="text-[#39FF14]" />
              <span className="text-[9px] font-black text-[#39FF14] uppercase tracking-tighter">SECURE_OPERATOR: admin_master</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">System Latency</span>
              <span className="text-[10px] font-bold text-[#39FF14] font-mono">14ms / AES-256</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a1a23] to-black border border-[#1a1a23] flex items-center justify-center text-[#39FF14] font-black text-xs">
              A1
            </div>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 overflow-y-auto p-8 neon-scrollbar bg-[#03030b]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-[1600px] mx-auto space-y-8"
            >
              {activeTab === 'terminal' && (
                <>
                  {/* Forex Pulse */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                        <Globe size={14} className="text-blue-400" />
                        Forex Market Pulse
                      </h3>
                      <div className="h-px flex-1 mx-6 bg-[#1a1a23]" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-40">
                      {forexPairs.map(pair => <TVWidget key={pair.symbol} {...pair} />)}
                    </div>
                  </div>

                  {/* Crypto Pulse */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                        <Zap size={14} className="text-[#eab308]" />
                        Digital Asset Pulse
                      </h3>
                      <div className="h-px flex-1 mx-6 bg-[#1a1a23]" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-40">
                      {cryptoPairs.map(pair => <TVWidget key={pair.symbol} {...pair} />)}
                    </div>
                  </div>

                  {/* Intelligence Center Placeholder */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                    <div className="lg:col-span-2 bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl p-6 h-[400px] flex flex-col">
                       <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                           <Activity size={16} className="text-[#39FF14]" />
                           NEXXUS Signal Terminal
                         </h3>
                         <div className="flex gap-2">
                           <button 
                            onClick={() => setActiveTab('intelligence')}
                            className="px-3 py-1 bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] rounded text-[8px] font-mono uppercase hover:bg-[#39FF14]/20 transition-all"
                           >
                            Enter Sniper Mode
                           </button>
                         </div>
                       </div>
                       <div className="flex-1 border border-[#1a1a23] rounded-xl bg-black/40 flex items-center justify-center italic text-slate-700 font-mono text-xs text-center px-10 leading-relaxed">
                         The Sniper Engine is standing by. <br /> Select 'Sniper Mode' from the navigation or button above to begin Triple Confirmation Analysis.
                       </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-[#39FF14]/10 to-[#0a0a0f] border border-[#39FF14]/20 rounded-2xl p-6">
                        <h4 className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest mb-4">Risk Matrix</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-slate-500 uppercase tracking-tighter">Current Balance</span>
                            <span className="text-white font-black">$25,000.00</span>
                          </div>
                          <div className="w-full h-1 bg-[#1a1a23] rounded-full overflow-hidden">
                            <div className="w-[80%] h-full bg-[#39FF14]" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl p-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Active Sessions</h4>
                        <div className="space-y-3">
                          {['London', 'New York', 'Tokyo'].map(session => (
                            <div key={session} className="flex items-center justify-between p-2 bg-black/40 rounded border border-[#1a1a23]">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{session}</span>
                              <div className={cn("w-2 h-2 rounded-full", session === 'London' ? "bg-[#39FF14] shadow-[0_0_10px_#39FF14]" : "bg-slate-800")} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'intelligence' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3 space-y-6">
                    <div className="bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl p-8 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-[#39FF14]/5 blur-[100px] -z-10 group-hover:bg-[#39FF14]/10 transition-all duration-700" />
                       <div className="flex items-center justify-between mb-8 border-b border-[#1a1a23] pb-6">
                         <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                              <Zap size={24} className="text-[#39FF14]" />
                              NEXXUS-6 Sniper Protocol
                            </h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-mono">Real-time Triple Confirmation Engine / EURUSD Default</p>
                         </div>
                         <div className="flex gap-4">
                            <div className="text-right">
                              <span className="text-[8px] text-slate-500 uppercase block font-mono">Algorithm Status</span>
                              <span className="text-[10px] text-[#39FF14] font-black uppercase tracking-tighter">OPTIMIZED_ACTIVE</span>
                            </div>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                             <div className="p-4 bg-black/40 border border-[#1a1a23] rounded-xl space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1. Target Instrument</label>
                                <select className="w-full bg-[#03030b] border border-[#1a1a23] rounded-lg p-3 text-sm text-white font-black uppercase tracking-widest outline-none focus:border-[#39FF14]/50">
                                   <option value="EURUSD">EUR / USD (Sniper Default)</option>
                                   <option value="GBPUSD">GBP / USD</option>
                                   <option value="BTCUSD">BTC / USD</option>
                                </select>
                             </div>

                             <div className="p-4 bg-black/40 border border-[#1a1a23] rounded-xl space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2. Execution Context</label>
                                <div className="grid grid-cols-3 gap-2">
                                   {['Scalper', 'Sniper', 'Swing'].map(mode => (
                                     <button key={mode} className={cn("py-2 text-[10px] font-black rounded border transition-all", mode === 'Sniper' ? "bg-[#39FF14] text-black border-[#39FF14]" : "bg-transparent text-slate-500 border-[#1a1a23]")}>
                                       {mode.toUpperCase()}
                                     </button>
                                   ))}
                                </div>
                             </div>

                             <button className="w-full py-5 bg-[#39FF14] text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:bg-white transition-all flex items-center justify-center gap-3 group">
                                <Activity size={18} className="group-hover:animate-pulse" />
                                Initiate Signal Analysis
                             </button>
                          </div>

                          <div className="bg-black/60 border border-[#1a1a23] rounded-xl p-6 flex flex-col">
                             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Live Execution Log</h4>
                             <div className="flex-1 font-mono text-[9px] text-slate-600 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                                <p><span className="text-white">[14:02:11]</span> SYSTEM_READY: Waiting for operator trigger...</p>
                                <p><span className="text-white">[14:02:11]</span> RAG_DB: 512.4 GB metadata indexed.</p>
                                <p><span className="text-white">[14:02:11]</span> MODEL: G3mini-Flash-Turbo (Cloud) active.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl p-6">
                       <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Signal Statistics</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-black/40 rounded-xl border border-[#1a1a23] text-center">
                             <span className="text-[8px] text-slate-500 uppercase block mb-1">Win Rate</span>
                             <span className="text-xl font-black text-[#39FF14]">84.2%</span>
                          </div>
                          <div className="p-3 bg-black/40 rounded-xl border border-[#1a1a23] text-center">
                             <span className="text-[8px] text-slate-500 uppercase block mb-1">Signals/Day</span>
                             <span className="text-xl font-black text-white">12</span>
                          </div>
                       </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-[#1a1a23] to-black border border-[#1a1a23] rounded-2xl">
                       <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Confidence Metric</h4>
                       <div className="flex items-center justify-center h-32 relative">
                          <div className="w-24 h-24 rounded-full border-4 border-[#1a1a23] flex items-center justify-center">
                             <span className="text-2xl font-black text-white">92</span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                             <div className="w-32 h-32 border-t-2 border-[#39FF14] rounded-full blur-[2px]" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vault' && (
                <div className="space-y-8">
                  <div className="bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                          <Database size={24} className="text-blue-500" />
                          500GB Intelligence Vault
                        </h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-mono">Multimedia Knowledge Base / Vectorized Search</p>
                      </div>
                      <div className="flex gap-4">
                        <button className="px-4 py-2 bg-[#1a1a23] border border-[#1a1a23] text-white rounded text-[10px] font-bold uppercase hover:bg-[#1f1f2b] transition-all flex items-center gap-2">
                          <Upload size={14} />
                          Ingest New Data
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[
                        { type: 'Text (RAG)', size: '142.5 GB', count: '1.2M Docs', icon: FileText, color: 'text-[#39FF14]' },
                        { type: 'Visual (Chart)', size: '84.2 GB', count: '450k Files', icon: ImageIcon, color: 'text-blue-400' },
                        { type: 'Training (Video)', size: '210.8 GB', count: '12k MP4s', icon: Video, color: 'text-purple-400' },
                        { type: 'Other (BIN/GGUF)', size: '62.5 GB', count: '8 Models', icon: Cpu, color: 'text-[#eab308]' },
                      ].map((stat, i) => (
                        <div key={i} className="p-4 bg-black/40 border border-[#1a1a23] rounded-xl group hover:border-slate-700 transition-all">
                          <div className="flex items-center justify-between mb-4">
                             <stat.icon size={18} className={stat.color} />
                             <span className="text-[9px] font-mono text-slate-600 uppercase">{stat.count}</span>
                          </div>
                          <h4 className="text-[10px] font-black text-white uppercase mb-1">{stat.type}</h4>
                          <p className="text-lg font-black text-slate-300">{stat.size}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl overflow-hidden h-[600px] flex flex-col">
                     <div className="p-4 border-b border-[#1a1a23] bg-black/20 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Document Registry / Search Active</span>
                        <div className="relative w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                          <input type="text" placeholder="Search the 500GB Vault..." className="w-full bg-[#03030b] border border-[#1a1a23] rounded-full py-1.5 pl-9 pr-4 text-[10px] text-white focus:outline-none focus:border-[#39FF14]/50" />
                        </div>
                     </div>
                     <div className="flex-1 bg-black/40 flex items-center justify-center italic text-slate-800 font-mono text-xs">
                        Registry loading... indexing petabytes of intelligence vectors.
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="bg-[#0a0a0f] border border-[#1a1a23] rounded-2xl p-8">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Settings size={24} className="text-slate-400" />
                      Infrastructure Hub
                    </h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-8 font-mono">System Orchestration & Global API Registry</p>

                    <div className="space-y-8">
                       {/* Global API Vault */}
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest flex items-center gap-2">
                             <Key size={14} />
                             1. Global API Registry
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {['Google Gemini', 'OpenAI (GPT-4)', 'Anthropic (Claude)', 'DeepSeek'].map(provider => (
                               <div key={provider} className="p-4 bg-black/40 border border-[#1a1a23] rounded-xl space-y-3">
                                  <label className="text-[9px] font-bold text-slate-500 uppercase">{provider} Protocol Key</label>
                                  <input type="password" placeholder="sk-••••••••••••••••" className="w-full bg-[#03030b] border border-[#1a1a23] rounded-lg p-2 text-xs text-white font-mono focus:border-[#39FF14]/50 outline-none" />
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Local Model Loader */}
                       <div className="space-y-4 pt-4 border-t border-[#1a1a23]">
                          <h4 className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest flex items-center gap-2">
                             <HardDrive size={14} />
                             2. Local Intelligence Loader (GGUF / BIN)
                          </h4>
                          <div className="p-8 border border-dashed border-[#1a1a23] rounded-2xl bg-black/20 text-center space-y-4 group hover:border-[#39FF14]/30 transition-all cursor-pointer">
                             <UploadCloud size={32} className="mx-auto text-slate-700 group-hover:text-[#39FF14] transition-colors" />
                             <div>
                               <p className="text-[10px] font-black text-white uppercase tracking-widest">Select Model File from Device</p>
                               <p className="text-[8px] text-slate-600 uppercase font-mono mt-1">Supports: .gguf, .bin, .safetensors (Max 32GB)</p>
                             </div>
                          </div>
                       </div>

                       <button className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-[#39FF14] transition-all">
                          Sync Global Infrastructure
                       </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
