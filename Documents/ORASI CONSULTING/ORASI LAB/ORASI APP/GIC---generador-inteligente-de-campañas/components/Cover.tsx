
import React from 'react';
import { Campaign, ViewType } from '../types';
import { ArrowRight, ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';

interface Props {
  campaign: Campaign;
  setView: (view: ViewType) => void;
}

const OrasiLogoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="url(#sphereGradientCover)" />
    <mask id="barsMaskCover">
      <circle cx="50" cy="50" r="48" fill="white" />
    </mask>
    <g mask="url(#barsMaskCover)">
      <rect x="10" y="25" width="40" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="5" y="38" width="70" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="15" y="51" width="75" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="10" y="64" width="60" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="25" y="77" width="30" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
    </g>
    <defs>
      <linearGradient id="sphereGradientCover" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#94A3B8" />
        <stop offset="1" stopColor="#334155" />
      </linearGradient>
    </defs>
  </svg>
);

const Cover: React.FC<Props> = ({ campaign, setView }) => {
  return (
    <div className="h-full min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-4xl w-full relative z-10 space-y-12 text-center py-12">
        {/* Branding */}
        <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-1000">
          <OrasiLogoIcon className="w-24 h-24 mb-4 transform hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />
          <div className="space-y-1">
             <h2 className="text-3xl font-bold tracking-tighter text-slate-200 uppercase leading-none">ORASI<span className="text-sky-400">Lab</span></h2>
             <p className="text-[10px] text-sky-500 font-bold uppercase tracking-[0.4em]">Strategic Intelligence Engine</p>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-1000">
           <h1 className="text-6xl md:text-8xl font-geometric font-extrabold text-white tracking-tighter leading-[0.9]">
             GENERADOR <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">INTELIGENTE</span>
           </h1>
           <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
             Sistema de mando táctico para consultores de élite. <br/>
             Arquitectura de la decisión para <span className="text-white font-medium italic">"{campaign.name}"</span>.
           </p>
        </div>

        {/* Stats / Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-in fade-in duration-1000 delay-500">
           <StatusBox icon={<Cpu className="w-4 h-4 text-sky-500" />} label="Estatus AI" value="Núcleo Optimizado" />
           <StatusBox icon={<ShieldCheck className="w-4 h-4 text-green-500" />} label="Protocolo" value="Arquitectura Activa" />
           <StatusBox icon={<Globe className="w-4 h-4 text-purple-500" />} label="Despliegue" value="Multi-Canal Ready" />
        </div>

        {/* CTA */}
        <div className="animate-in fade-in duration-1000 delay-700">
          <button 
            onClick={() => setView('hub')}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-sky-600 rounded-2xl hover:bg-sky-500 shadow-2xl shadow-sky-600/40 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-widest">
              Entrar al Centro de Operaciones
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Footer Brand */}
        <div className="pt-12 text-slate-600 text-[9px] uppercase font-bold tracking-[0.3em] flex items-center justify-center gap-4 animate-in fade-in duration-1000 delay-1000">
           <span>Propiedad de ORASI Consulting Group</span>
           <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
           <span>Global Presence 2025</span>
        </div>
      </div>
    </div>
  );
};

const StatusBox = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-sm">
     <div className="mb-1">{icon}</div>
     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{label}</span>
     <span className="text-xs text-white font-semibold">{value}</span>
  </div>
);

export default Cover;
