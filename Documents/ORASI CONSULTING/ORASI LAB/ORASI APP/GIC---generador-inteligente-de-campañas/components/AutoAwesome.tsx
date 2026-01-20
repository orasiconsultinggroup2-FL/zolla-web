
import React, { useState, useEffect } from 'react';
import { Campaign, PhaseType } from '../types';
import { generateCampaignContent } from '../services/geminiService';
import { Sparkles, Loader2, Copy, Check, MessageSquareText, BrainCircuit, Lightbulb, Zap } from 'lucide-react';

interface Props {
  campaign: Campaign;
}

const AutoAwesome: React.FC<Props> = ({ campaign }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const currentDayData = campaign.days[campaign.currentDay - 1];

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      const content = await generateCampaignContent(
        campaign.name,
        currentDayData.phase,
        campaign.currentDay,
        currentDayData.theme,
        currentDayData.channel,
        currentDayData.postType,
        prompt
      );
      setResult(content);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDynamicPlaceholder = (phase: PhaseType) => {
    switch (phase) {
      case PhaseType.CONCIENCIA:
        return "Estrategia: Aplica el sesgo de 'Aversión a la Pérdida'. Ej: 'Enfócate en los $ que pierden por no saber decir No'. Usa un hook que rompa el scroll atacando un error común...";
      case PhaseType.AUTORIDAD:
        return "Estrategia: 'Efecto Halo de Experto'. Ej: 'Cita una métrica real del Método ORASI o menciona un marco de trabajo de Harvard para anclar autoridad'. Tono más académico pero accionable...";
      case PhaseType.CONVERSACION:
        return "Estrategia: 'Sesgo de Reciprocidad'. Ej: 'Ofrece una revisión rápida de su última propuesta si comentan NEGOCIAR'. Haz que la pregunta final sea sobre su mayor dolor actual...";
      case PhaseType.CIERRE:
        return "Estrategia: 'Prueba Social Colectiva' + 'Escasez'. Ej: 'Menciona que el 80% de cupos ya se llenó por consultores de X industria'. Sé extremadamente directo, sin rodeos, foco 100% en el ROI...";
      default:
        return "Matiza tu instrucción estratégica aquí...";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400">ORASI Lab Intelligence</span>
          </div>
          <h2 className="text-5xl font-geometric font-extrabold tracking-tighter">
            Auto_Awesome <span className="text-blue-600">Post Engine</span>
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Ingeniería de copy para: <span className="text-gray-900 font-bold italic">"{currentDayData.theme}"</span></p>
        </div>
        <div className="flex gap-3">
            <Tag label={currentDayData.channel} icon={<MessageSquareText className="w-3 h-3" />} />
            <Tag label={currentDayData.postType} icon={<BrainCircuit className="w-3 h-3" />} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Zap className="w-20 h-20 text-blue-600" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Brief Estratégico</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block tracking-widest">Tema de Misión</label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-blue-50 font-bold text-blue-900 leading-snug text-sm">
                    {currentDayData.theme}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest">Matiz Táctico (Opcional)</label>
                    <span className="text-[8px] font-black text-blue-500 uppercase px-2 py-0.5 bg-blue-50 rounded-md">IA Ready</span>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={getDynamicPlaceholder(currentDayData.phase)}
                    className="w-full h-44 p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm leading-relaxed placeholder:text-gray-300 italic"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/30 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Calculando Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Ejecutar Generación</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#0a0f18] p-6 rounded-2xl text-white/50 space-y-3">
             <p className="text-[10px] uppercase font-bold tracking-widest text-blue-500">Parámetros de Publicación</p>
             <ul className="text-[11px] space-y-2">
                <li className="flex gap-2"><span>✓</span> Formato específico para {currentDayData.channel}</li>
                <li className="flex gap-2"><span>✓</span> Estructura de Hook Profundo (3s)</li>
                <li className="flex gap-2"><span>✓</span> CTA optimizado para {currentDayData.phase}</li>
             </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-[#0a0f18] text-white p-12 rounded-[2rem] shadow-2xl flex flex-col relative border border-white/5 min-h-[580px]">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                 <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">Preview de Arquitectura de Texto</span>
              </div>
              {result && (
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg ${
                    copied ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? '¡PIEZA COPIADA!' : 'COPIAR PARA RED SOCIAL'}
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-8 text-blue-400/30">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-500 animate-spin duration-[3000ms]"></div>
                    <Zap className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-geometric font-extrabold text-white tracking-tight">Arquitectando Post Estratégico</p>
                    <p className="text-sm italic opacity-50 mt-2">Día {campaign.currentDay}: {currentDayData.theme}</p>
                  </div>
                </div>
              ) : result ? (
                <div className="font-sans text-2xl leading-relaxed text-gray-200 whitespace-pre-wrap selection:bg-blue-600/50 pr-4">
                  {result}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-6 opacity-20">
                   <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Copy className="w-10 h-10" />
                   </div>
                   <div className="space-y-2">
                     <p className="text-sm font-bold uppercase tracking-[0.2em]">Consola en Espera</p>
                     <p className="text-xs max-w-xs mx-auto opacity-60 uppercase tracking-widest">El motor GIC está listo para redactar tu post del día.</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tag: React.FC<{ label: string, icon: React.ReactNode }> = ({ label, icon }) => (
  <span className="px-5 py-2.5 bg-white border border-gray-100 text-[10px] font-bold uppercase rounded-2xl text-gray-800 flex items-center gap-2 shadow-sm border-b-2 border-b-gray-200">
    <span className="text-blue-600">{icon}</span>
    {label}
  </span>
);

export default AutoAwesome;
