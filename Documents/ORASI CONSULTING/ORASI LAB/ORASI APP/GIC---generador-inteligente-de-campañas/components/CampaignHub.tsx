
import React, { useMemo, useState, useEffect } from 'react';
import { Campaign, ViewType, PhaseType, CampaignDay } from '../types';
import { 
  Calendar, Flag, TrendingUp, ShieldCheck, 
  LayoutGrid, Target, MessageSquare, Award, ShoppingCart,
  Zap, ArrowRight, Play, ChevronRight, Info,
  Lock, CheckCircle2, AlertCircle, Linkedin, Instagram, MessageCircle, RotateCcw,
  CheckSquare, Square, ShieldAlert, CircleDot, AlertTriangle, AlertOctagon, Facebook,
  Globe
} from 'lucide-react';

interface Props {
  campaign: Campaign;
  onSelectDay?: (day: number) => void;
  setView: (view: ViewType) => void;
  onManualTogglePublish?: (day: number, platform: string) => void;
}

const CampaignHub: React.FC<Props> = ({ campaign, onSelectDay, setView, onManualTogglePublish }) => {
  const currentDayData = campaign.days[campaign.currentDay - 1];
  const realCurrentDay = campaign.realCurrentDay || 1;
  const [showConciliator, setShowConciliator] = useState(false);

  const missedMissions = useMemo(() => {
    return campaign.days.filter(day => {
      if (day.day >= realCurrentDay) return false;
      return !day.published;
    });
  }, [campaign.days, realCurrentDay]);

  useEffect(() => {
    if (missedMissions.length > 0) {
      setShowConciliator(true);
    }
  }, [missedMissions.length]);

  const phasesData = useMemo(() => {
    const groups: Record<PhaseType, { days: CampaignDay[], description: string, icon: React.ReactNode }> = {
      [PhaseType.CONCIENCIA]: {
        days: [],
        description: "Despertar interés rompiendo el statu quo del mercado.",
        icon: <Target className="w-4 h-4" />
      },
      [PhaseType.AUTORIDAD]: {
        days: [],
        description: "Validar el método con pruebas técnicas de élite.",
        icon: <Award className="w-4 h-4" />
      },
      [PhaseType.CONVERSACION]: {
        days: [],
        description: "Fomentar cercanía y resolver dudas específicas.",
        icon: <MessageSquare className="w-4 h-4" />
      },
      [PhaseType.CIERRE]: {
        days: [],
        description: "Ejecutar la oferta con arquitectura de urgencia.",
        icon: <ShoppingCart className="w-4 h-4" />
      }
    };

    campaign.days.forEach(day => {
      groups[day.phase].days.push(day);
    });

    return Object.entries(groups);
  }, [campaign.days]);

  const getPlatformIcon = (p: string) => {
    const platform = p.toLowerCase();
    if (platform.includes('linkedin')) return <Linkedin className="w-3 h-3" />;
    if (platform.includes('instagram')) return <Instagram className="w-3 h-3" />;
    if (platform.includes('facebook')) return <Facebook className="w-3 h-3" />;
    if (platform.includes('whatsapp')) return <MessageCircle className="w-3 h-3" />;
    return <Globe className="w-3 h-3" />;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Alerta Global de Sincronización */}
      {missedMissions.length > 0 && (
        <div className="bg-red-600 p-6 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-red-600/30 border-4 border-red-400/20">
           <div className="flex items-center gap-6 text-center md:text-left">
              <div className="p-4 bg-white/20 rounded-full animate-bounce">
                 <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                 <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">ALERTA DE BRECHA ESTRATÉGICA</h4>
                 <p className="text-red-100 text-sm font-medium mt-1">
                    Hay {missedMissions.length} días pasados sin reportar publicación. La estrategia está perdiendo integridad.
                 </p>
              </div>
           </div>
           <button 
             onClick={() => setShowConciliator(true)}
             className="px-8 py-4 bg-white text-red-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-red-50 transition-all active:scale-95"
           >
              Sincronizar Bitácora Ahora
           </button>
        </div>
      )}

      {/* Banner Principal */}
      <div className="bg-slate-900 text-white p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Mando Centralizado</span>
                 </div>
              </div>
              <h2 className="text-5xl font-geometric font-bold tracking-tight leading-none">{campaign.name}</h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl font-light">
                Monitor de Despliegue. <span className="text-white font-medium italic">Garantiza que no queden días en rojo antes de proceder.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => setView('tasks')}
                  disabled={missedMissions.length > 0}
                  className={`w-full sm:w-auto px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group font-bold text-sm shadow-xl active:scale-95 ${missedMissions.length > 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'}`}
                >
                  {missedMissions.length > 0 ? 'Misión Bloqueada por Brecha' : `Misión del Día ${campaign.currentDay}`}
                  <Zap className="w-4 h-4 fill-current" />
                </button>
            </div>
          </div>

          <div className="lg:w-72 flex flex-col justify-center items-center lg:items-end lg:border-l border-white/5 lg:pl-10">
             <div className="text-center lg:text-right mb-6">
                <span className="text-[9px] uppercase text-slate-500 font-bold block mb-1 tracking-widest">Estado de Sincronización</span>
                <span className={`text-6xl font-geometric font-bold tracking-tighter ${missedMissions.length > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {Math.round((campaign.days.filter(d => d.published).length / campaign.totalDays) * 100)}%
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Centro de Conciliación Manual */}
      {showConciliator && missedMissions.length > 0 && (
        <div className="bg-white border-4 border-red-600 p-10 rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 text-red-600">
              <AlertOctagon className="w-40 h-40" />
           </div>
           
           <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-8">
              <div>
                 <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Conciliador de Misiones Perdidas</h3>
                 <p className="text-sm text-red-600 font-bold italic mt-1">Sincroniza los días pasados para restaurar la integridad del sistema.</p>
              </div>
              <button onClick={() => setShowConciliator(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 text-[10px] font-black uppercase tracking-widest transition-all">
                 Cerrar Panel
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {missedMissions.map(day => (
                <div key={day.day} className="p-8 bg-slate-50 rounded-[2rem] border-2 border-red-100 space-y-5 hover:bg-white hover:border-blue-400 transition-all group">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-xs font-black">D{day.day}</span>
                         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{day.phase}</span>
                      </div>
                      <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                   </div>
                   <p className="text-sm font-bold text-slate-900 leading-tight">"{day.theme}"</p>
                   
                   <div className="flex flex-wrap gap-2 pt-2">
                      {day.channel.split(/[/,]/).map(p => {
                        const platform = p.trim();
                        const isDone = day.publishedPlatforms?.some(pp => pp.toLowerCase().includes(platform.toLowerCase()));
                        return (
                          <button 
                            key={platform}
                            onClick={() => onManualTogglePublish?.(day.day, platform)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${isDone ? 'bg-green-600 text-white' : 'bg-white text-slate-400 border border-slate-200 hover:border-blue-500 hover:text-blue-500 shadow-sm'}`}
                          >
                            {isDone ? <CheckSquare className="w-3 h-3" /> : getPlatformIcon(platform)}
                            {platform}
                          </button>
                        );
                      })}
                   </div>
                   {day.published && (
                     <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase">
                        <CheckCircle2 className="w-4 h-4" /> Misión Sincronizada
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Radar de Despliegue */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <LayoutGrid className="w-5 h-5 text-slate-400" />
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest text-sm">Mapa Táctico de Campaña</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phasesData.map(([phase, data]) => (
            <div key={phase} className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col min-h-[140px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                    {data.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{phase}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light italic">
                  {data.description}
                </p>
              </div>

              <div className="space-y-3">
                {data.days.map((day) => {
                  const isFuture = day.day > realCurrentDay;
                  const isCurrent = day.day === campaign.currentDay;
                  const isDone = day.published;
                  const isBreach = !isDone && !isFuture && day.day < realCurrentDay;
                  
                  return (
                    <div 
                      key={day.day}
                      onClick={() => !isFuture && onSelectDay?.(day.day)}
                      className={`relative group p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-blue-600 text-white border-transparent shadow-xl scale-[1.02] z-10' 
                          : isDone 
                            ? 'bg-green-50 text-green-700 border-green-100'
                            : isBreach
                              ? 'bg-red-50 text-red-700 border-red-100 border-2 animate-pulse'
                              : isFuture
                                ? 'bg-slate-50 text-slate-300 border-slate-100 opacity-60 pointer-events-none'
                                : 'bg-white text-slate-900 border-slate-100 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${isCurrent ? 'bg-white text-blue-600' : isDone ? 'bg-green-600 text-white' : isBreach ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {day.day}
                           </div>
                           <span className="text-[10px] font-bold truncate max-w-[120px]">{day.theme}</span>
                         </div>
                         {isDone ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : isBreach ? <ShieldAlert className="w-4 h-4 text-red-500" /> : <ChevronRight className="w-4 h-4 opacity-20" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampaignHub;
