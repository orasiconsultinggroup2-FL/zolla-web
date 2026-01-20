
import React, { useState, useMemo, useEffect } from 'react';
import { Campaign, TrafficLight, HistoryEntry } from '../types';
import { 
  BarChart3, CheckCircle, Save, Database, 
  MessageSquare, Share2, MousePointer2, 
  UserPlus, Award, Zap, Sparkles, Brain, TrendingUp, Info, HelpCircle,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  campaign: Campaign;
  onUpdateMetric: (val: number) => void;
  onSaveHistory: (entry: HistoryEntry) => void;
}

const DailyAnalytics: React.FC<Props> = ({ campaign, onUpdateMetric, onSaveHistory }) => {
  const currentDayData = campaign.days[campaign.currentDay - 1];
  
  const [dms, setDms] = useState(0);
  const [sales, setSales] = useState(0); 
  const [shares, setShares] = useState(0);
  const [linkClicks, setLinkClicks] = useState(0);
  const [authority, setAuthority] = useState(5);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mainVal, setMainVal] = useState<number>(currentDayData.actualValue || 0);

  const safeNumeric = (val: string): number => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 0) return 0;
    return parsed;
  };

  // AUTO-LLENADO INTELIGENTE: Al montar el componente, dispara una proyección si no hay datos
  useEffect(() => {
    if (!currentDayData.actualValue && !isAnalyzing) {
        analyzeWithAI();
    }
  }, [campaign.currentDay]);

  useEffect(() => {
    if (campaign.history) {
      const existing = campaign.history.find(h => h.day === campaign.currentDay);
      if (existing) {
        setDms(existing.dms);
        setSales(existing.sales);
        setShares(existing.shares);
        setLinkClicks(existing.linkClicks);
        setAuthority(existing.authorityScore);
        setMainVal(existing.actual);
      }
    }
  }, [campaign.currentDay, campaign.history]);

  const closingRate = useMemo(() => {
    if (dms === 0) return 0;
    return Math.round((sales / dms) * 100);
  }, [dms, sales]);

  const efficiency = useMemo(() => {
    return Math.round((mainVal / currentDayData.targetValue) * 100);
  }, [mainVal, currentDayData.targetValue]);

  const status = useMemo(() => {
    if (efficiency >= 90) return TrafficLight.GREEN;
    if (efficiency >= 50) return TrafficLight.YELLOW;
    return TrafficLight.RED;
  }, [efficiency]);

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analiza este tema de campaña de consultoría: "${currentDayData.theme}". 
      Estima valores lógicos de rendimiento para la fase ${currentDayData.phase}.
      Responde SOLO en formato JSON: {"authority": 8, "shares": 5, "clicks": 12, "reach": 850, "dms": 3}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      // Accessing text as a property per @google/genai guidelines
      const jsonStr = response.text?.trim() || '{}';
      const data = JSON.parse(jsonStr);
      setAuthority(data.authority || 7);
      setShares(data.shares || 0);
      setLinkClicks(data.clicks || 0);
      setMainVal(data.reach || 0);
      setDms(data.dms || 0);
      onUpdateMetric(data.reach || 0);
    } catch (err) {
      console.error("Error en proyección IA", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogData = () => {
    setIsSaving(true);
    const entry: HistoryEntry = {
      timestamp: new Date().toLocaleString(),
      day: campaign.currentDay,
      phase: currentDayData.phase,
      theme: currentDayData.theme,
      metric: currentDayData.metricLabel,
      target: currentDayData.targetValue,
      actual: mainVal,
      efficiency,
      status,
      dms,
      sales,
      shares,
      linkClicks,
      authorityScore: authority,
      strategicAlignment: 95
    };
    onSaveHistory(entry);
    onUpdateMetric(mainVal);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">Módulo de Rendimiento Orgánico</span>
          </div>
          <h2 className="text-4xl font-geometric font-bold tracking-tight text-slate-900">Consola de Resultados</h2>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={analyzeWithAI}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-slate-50 disabled:opacity-50"
          >
            {/* Fix: Added Loader2 to imports */}
            {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-blue-500" />}
            Sugerir Métricas IA
          </button>
          
          <button 
            onClick={handleLogData}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-blue-500 shadow-lg disabled:opacity-50"
          >
            {/* Fix: Added Loader2 to imports */}
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            Sellar Resultados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* KPI PRINCIPAL: VENTAS */}
          <div className="bg-slate-900 text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <TrendingUp className="w-32 h-32 text-blue-400" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 text-white rounded-xl">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight">Conversión Final (Ventas)</h3>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">Inscripciones confirmadas al taller</p>
                  </div>
                  <Tooltip text="Esta es la métrica de éxito definitiva. Representa contratos firmados o pagos realizados hoy." />
                </div>
                
                <div className="flex items-end gap-6">
                   <input 
                    type="number" 
                    value={sales} 
                    onChange={(e) => setSales(safeNumeric(e.target.value))}
                    className="text-8xl font-geometric font-bold w-36 outline-none border-b-4 border-blue-600 text-white bg-transparent focus:border-blue-400"
                   />
                   <div className="pb-3 text-slate-500 font-bold uppercase tracking-widest text-xs italic">
                      Talleres Cerrados
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <KPICard 
                icon={<MessageSquare className="w-5 h-5 text-blue-500" />} 
                label="DMs / Prospectos" 
                value={dms} 
                onChange={setDms} 
                safeNumeric={safeNumeric}
                desc="Personas que iniciaron una conversación."
                tooltip="Mide el interés real y la intención de compra. Cada DM es una oportunidad de cierre."
             />
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Eficiencia de Cierre</span>
                   <Tooltip text="Porcentaje de prospectos (DMs) que se convirtieron en ventas reales." />
                </div>
                <div className="text-5xl font-geometric font-bold text-slate-900">{closingRate}%</div>
                <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${closingRate}%` }}></div>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 pb-4">Social Metrics Intelligence</h3>
              
              <MetricRow 
                label="Alcance Único" 
                value={mainVal} 
                onChange={setMainVal} 
                safeNumeric={safeNumeric}
                icon={<TrendingUp className="w-4 h-4 text-slate-400" />} 
                tooltip="Personas totales que vieron tu post. Crucial en fase de Conciencia."
              />
              
              <MetricRow 
                label="Shares / Viralidad" 
                value={shares} 
                onChange={setShares} 
                safeNumeric={safeNumeric}
                icon={<Share2 className="w-4 h-4 text-slate-400" />} 
                tooltip="Veces que tu contenido fue compartido. Valida tu autoridad en el tema."
              />
              
              <MetricRow 
                label="Clicks en Bio / Link" 
                value={linkClicks} 
                onChange={setLinkClicks} 
                safeNumeric={safeNumeric}
                icon={<MousePointer2 className="w-4 h-4 text-slate-400" />} 
                tooltip="Acciones directas hacia tu oferta o página de captura."
              />
              
              <div className="pt-6 border-t border-slate-50">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Authority Score</span>
                    <span className="text-sm font-bold text-blue-600">{authority}/10</span>
                 </div>
                 <input 
                    type="range" min="1" max="10" value={authority} 
                    onChange={(e) => setAuthority(parseInt(e.target.value) || 5)}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                 />
                 <p className="text-[9px] text-slate-400 mt-3 italic text-center">Calidad percibida del consultor según el feedback</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ icon, label, value, onChange, safeNumeric, desc, tooltip }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-6">
       <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl">{icon}</div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{label}</span>
       </div>
       <Tooltip text={tooltip} />
    </div>
    <input 
      type="number" 
      value={value} 
      onChange={(e) => onChange(safeNumeric(e.target.value))}
      className="text-5xl font-geometric font-bold w-full outline-none bg-transparent"
    />
    <p className="text-[10px] text-slate-400 mt-4 font-medium italic">{desc}</p>
  </div>
);

const MetricRow = ({ label, value, onChange, safeNumeric, icon, tooltip }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
       {icon}
       <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</span>
       <Tooltip text={tooltip} />
    </div>
    <input 
      type="number" 
      value={value} 
      onChange={(e) => onChange(safeNumeric(e.target.value))}
      className="w-16 text-right font-bold text-slate-900 border-b border-transparent group-hover:border-slate-100 focus:border-blue-500 outline-none bg-transparent text-sm"
    />
  </div>
);

const Tooltip = ({ text }: { text: string }) => (
  <div className="relative group/tooltip inline-block ml-1">
    <HelpCircle className="w-3.5 h-3.5 text-slate-300 hover:text-blue-500 cursor-help transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900 text-white text-[9px] leading-relaxed rounded-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all shadow-xl z-50 text-center font-medium">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
    </div>
  </div>
);

export default DailyAnalytics;
