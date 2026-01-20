
import React, { useState } from 'react';
import { Campaign, HistoryEntry, TrafficLight, CampaignDay } from '../types';
import { 
  FileText, Activity, ShieldCheck, 
  TrendingUp, MessageSquare, Award, 
  BarChart2, Zap, HelpCircle, Info, Download, Share,
  ChevronDown, ChevronUp, ImageIcon, AlignLeft, Globe,
  Linkedin, Instagram, MessageCircle, Facebook
} from 'lucide-react';

interface Props {
  campaign: Campaign;
}

const AnalyticsHistory: React.FC<Props> = ({ campaign }) => {
  const history = campaign.history || [];
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  
  const totalSales = history.reduce((acc, curr) => acc + (curr.sales || 0), 0);
  const totalDms = history.reduce((acc, curr) => acc + (curr.dms || 0), 0);
  const avgClosingRate = totalDms > 0 ? Math.round((totalSales / totalDms) * 100) : 0;

  const handleExport = () => {
    const data = JSON.stringify({
        campaign_name: campaign.name,
        history: history,
        full_days: campaign.days.filter(d => d.published)
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EXPEDIENTE_ESTRATEGICO_GIC_${campaign.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('linkedin')) return <Linkedin className="w-3 h-3" />;
    if (p.includes('instagram')) return <Instagram className="w-3 h-3" />;
    if (p.includes('facebook')) return <Facebook className="w-3 h-3" />;
    if (p.includes('whatsapp')) return <MessageCircle className="w-3 h-3" />;
    return <Globe className="w-3 h-3" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-slate-900 rounded-xl text-blue-500 shadow-lg">
                <BarChart2 className="w-6 h-6" />
             </div>
             <span className="text-[11px] font-extrabold uppercase tracking-[0.5em] text-slate-400 italic">Strategic Ledger</span>
          </div>
          <h2 className="text-5xl font-geometric font-bold tracking-tight text-slate-900">Bitácora de Éxito</h2>
          <p className="text-slate-500 text-lg font-light max-w-xl leading-relaxed">
            Expediente completo de <span className="text-slate-900 font-bold italic">{campaign.name}</span>. Consulta aquí la evidencia de cada misión ejecutada.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <SummaryStat label="Ventas Totales" value={totalSales.toString()} sub="Unidades Cerradas" />
          <SummaryStat label="Tasa Media Cierre" value={`${avgClosingRate}%`} sub="Conversión en DM" highlight />
          
          <button 
            onClick={handleExport}
            className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-all shadow-sm group"
          >
             <Download className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-2" />
             <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Exportar Expediente</span>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-24 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
               <Activity className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Esperando primer sellado de resultados</p>
            <p className="text-xs text-slate-300 mt-2 italic">Completa la misión de hoy y sella resultados para archivar la evidencia aquí.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 flex items-center gap-6">
             <div className="p-4 bg-blue-600/20 rounded-2xl text-blue-500">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] block mb-1">Diagnóstico Operativo</span>
                <p className="text-white text-sm font-light max-w-2xl leading-relaxed">
                  Has archivado <span className="text-blue-500 font-bold">{history.length} misiones</span> exitosas. Haz clic en cualquier fila para auditar el contenido publicado.
                </p>
             </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold italic w-20">Día</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold">Misión y Distribución</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-center">DMs</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-center">Cierres</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-center">ROI</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-right">Evidencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((entry, idx) => {
                    const dayData = campaign.days[entry.day - 1];
                    const isExpanded = expandedDay === entry.day;

                    return (
                      <React.Fragment key={idx}>
                        <tr 
                          onClick={() => toggleDay(entry.day)}
                          className={`cursor-pointer transition-colors group ${isExpanded ? 'bg-blue-50/30' : 'hover:bg-slate-50/80'}`}
                        >
                          <td className="px-8 py-6">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900 group-hover:bg-slate-200'}`}>
                                {entry.day}
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{entry.phase}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <div className="flex gap-1">
                                   {dayData.publishedPlatforms?.map(p => (
                                     <span key={p} className="p-1 bg-slate-100 rounded text-slate-500" title={p}>
                                        {getPlatformIcon(p)}
                                     </span>
                                   ))}
                                </div>
                             </div>
                             <p className="text-xs font-bold text-slate-900 truncate max-w-[300px]">"{entry.theme}"</p>
                          </td>
                          <td className="px-8 py-6 text-center font-geometric font-bold text-slate-900">{entry.dms}</td>
                          <td className="px-8 py-6 text-center">
                             <span className={`px-3 py-1 rounded-lg font-bold text-[11px] ${entry.sales > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                                {entry.sales}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-center">
                             <span className="text-sm font-geometric font-bold text-blue-600">
                                {entry.dms > 0 ? Math.round((entry.sales / entry.dms) * 100) : 0}%
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             {isExpanded ? <ChevronUp className="w-4 h-4 ml-auto text-blue-600" /> : <ChevronDown className="w-4 h-4 ml-auto text-slate-300 group-hover:text-blue-400" />}
                          </td>
                        </tr>
                        
                        {isExpanded && (
                          <tr>
                            <td colSpan={6} className="px-8 py-10 bg-slate-50/50 border-y border-slate-100">
                               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-top-4 duration-500">
                                  {/* Columna de Imagen */}
                                  <div className="lg:col-span-4 space-y-4">
                                     <div className="flex items-center gap-2 mb-2">
                                        <ImageIcon className="w-4 h-4 text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Visual Guardado</span>
                                     </div>
                                     <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-square shadow-xl border border-white/5 group/img relative">
                                        {dayData.imageUrl ? (
                                          <img src={dayData.imageUrl} alt="Evidencia" className="w-full h-full object-cover" />
                                        ) : (
                                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 p-8 text-center">
                                             <ImageIcon className="w-10 h-10 mb-3 opacity-20" />
                                             <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Sin Imagen Registrada</p>
                                          </div>
                                        )}
                                     </div>
                                  </div>

                                  {/* Columna de Copy */}
                                  <div className="lg:col-span-8 space-y-4">
                                     <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                           <AlignLeft className="w-4 h-4 text-blue-500" />
                                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Arquitectura de Copy</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Registrado el {entry.timestamp}</span>
                                     </div>
                                     <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative group/copy">
                                        <div className="absolute top-4 right-4 opacity-0 group-hover/copy:opacity-100 transition-opacity">
                                           <button 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(dayData.generatedCopy || '');
                                                alert('Copy copiado al portapapeles');
                                              }}
                                              className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                                           >
                                              <Share className="w-3 h-3" />
                                           </button>
                                        </div>
                                        <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans italic">
                                           {dayData.generatedCopy || "No se registró texto para esta misión."}
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryStat = ({ label, value, sub, highlight }: { label: string, value: string, sub: string, highlight?: boolean }) => (
  <div className={`p-6 rounded-2xl border text-center min-w-[180px] transition-all hover:scale-[1.02] ${highlight ? 'bg-blue-600 text-white border-transparent shadow-xl' : 'bg-white text-slate-900 border-slate-100 shadow-sm'}`}>
    <span className={`text-[9px] uppercase font-bold tracking-widest block mb-1 ${highlight ? 'text-white/60' : 'text-slate-400'}`}>{label}</span>
    <span className="text-3xl font-geometric font-bold block">{value}</span>
    <span className={`text-[8px] uppercase font-bold tracking-widest block mt-1 ${highlight ? 'text-white/50' : 'text-slate-400'}`}>{sub}</span>
  </div>
);

export default AnalyticsHistory;
