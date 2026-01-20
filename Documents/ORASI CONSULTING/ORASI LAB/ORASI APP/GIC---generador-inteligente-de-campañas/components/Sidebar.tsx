
import React, { useMemo } from 'react';
import { ViewType, Campaign } from '../types';
import { LayoutGrid, CheckSquare, BarChart3, BookOpen, History, ChevronRight, Settings, Home, ShieldAlert, ShieldCheck } from 'lucide-react';

interface Props {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  campaign: Campaign;
}

const OrasiLogoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="url(#sphereGradient)" />
    <mask id="barsMask">
      <circle cx="50" cy="50" r="48" fill="white" />
    </mask>
    <g mask="url(#barsMask)">
      <rect x="10" y="25" width="40" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="5" y="38" width="70" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="15" y="51" width="75" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="10" y="64" width="60" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="25" y="77" width="30" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
    </g>
    <defs>
      <linearGradient id="sphereGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#64748B" />
        <stop offset="1" stopColor="#1E293B" />
      </linearGradient>
    </defs>
  </svg>
);

const Sidebar: React.FC<Props> = ({ currentView, setView, campaign }) => {
  const navItems = [
    { id: 'cover', label: 'Portal Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'hub', label: 'Estrategia Core', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'tasks', label: 'Misión Diaria', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'analytics', label: 'Consola de KPIs', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', label: 'Bitácora de Éxito', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Ajustes Control', icon: <Settings className="w-4 h-4" /> },
    { id: 'manual', label: 'Manual GIC', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const hasGaps = useMemo(() => {
    const realDay = campaign.realCurrentDay || 1;
    return campaign.days.some(d => d.day < realDay && !d.published);
  }, [campaign.days, campaign.realCurrentDay]);

  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col fixed inset-y-0 left-0 z-50 border-r border-white/5 shadow-2xl">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => setView('cover')}>
          <OrasiLogoIcon className="w-10 h-10 shadow-lg shadow-slate-900/50" />
          <div className="flex flex-col">
             <span className="text-lg font-bold tracking-tight text-slate-300 leading-none">ORASI<span className="text-sky-400">Lab</span></span>
             <span className="text-[7px] text-slate-500 uppercase tracking-[0.3em] font-black mt-1">Consulting Group</span>
          </div>
        </div>
        
        <div className="space-y-4">
            <div className="space-y-1">
                <h1 className="text-lg font-geometric font-bold tracking-tight text-white flex items-center gap-2">
                  GIC <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[8px] font-black uppercase">v2.6 PRO</span>
                </h1>
                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-medium italic">Tactical Intelligence</p>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${hasGaps ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
               {hasGaps ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
               <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest leading-none">Integridad</span>
                  <span className="text-[10px] font-bold">{hasGaps ? 'BRECHAS DETECTADAS' : 'SISTEMA SEGURO'}</span>
               </div>
            </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold transition-all rounded-lg group ${
              currentView === item.id 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-sky-400'}`}>
                  {item.icon}
              </span>
              {item.label}
            </div>
            {currentView === item.id && <ChevronRight className="w-3 h-3 text-white/50" />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
             ORASI CONSULTING GROUP<br/>
             <span className="text-sky-500 opacity-80 italic">Global Presence</span>
           </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
