
import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertOctagon, Target, Database, 
  Award, Sparkles, LayoutGrid, BarChart3, History, BookOpen, Fingerprint,
  Cpu, Zap, ShieldAlert, ShieldX, Sword, FileText, ChevronRight,
  ShieldCheck, Save, Send as SendIcon, Settings as SettingsIcon, Layers,
  RefreshCcw, Globe, MessageSquareWarning, UserCheck, Shield, BookMarked,
  ListChecks, MessageSquare, Bot, X, Loader2, TrendingUp
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Manual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guia' | 'tecnico' | 'auditoria'>('guia');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Lexicon AI Activo. Dime qué término quieres traducir a valor comercial.'}
  ]);
  const [isBotLoading, setIsBotLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isBotLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsBotLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Actúa como un Director Comercial de Élite. Tu misión es definir términos de forma ultra-concisa y comercial.
      
      REGLA DE ORO: Máximo 2 líneas de texto. 
      FORMATO OBLIGATORIO: "[Definición comercial corta], por ejemplo [ejemplo práctico de cómo se ve en el negocio]".
      
      EJEMPLO DE TU RESPUESTA ESPERADA:
      Usuario: KPI
      Tú: Es un indicador de gestión comercial para medir el éxito; por ejemplo, cuántas personas vieron tu publicación y cuántas de ellas te contactaron.
      
      TÉRMINO A DEFINIR: "${userMsg}"
      
      No incluyas saludos, ni introducciones, ni "Entendido". Ve directo al grano.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.5, // Menos variabilidad para ser más preciso y corto
          topP: 0.95,
        },
      });

      setChatMessages(prev => [...prev, {role: 'bot', text: response.text || 'Error en el núcleo comercial.'}]);
    } catch (err) {
      setChatMessages(prev => [...prev, {role: 'bot', text: 'Error de enlace. Reintente.'}]);
    } finally {
      setIsBotLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 pb-32 relative">
      
      {/* Header Estilo White Paper de Consultoría */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-2 border-slate-900 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-14 h-14 bg-slate-900 text-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <ShieldCheck className="w-7 h-7" />
             </div>
             <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">ORASI Consulting Group • Official Asset</span>
                <h2 className="text-5xl font-geometric font-extrabold tracking-tighter text-slate-900 uppercase">MANUAL TÁCTICO <span className="text-blue-600">GIC</span></h2>
             </div>
          </div>
          <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">
            Documentación técnica y protocolos de despliegue para el <span className="text-slate-900 font-bold italic">Mando Central de Campañas</span>. Operado a través de <span className="text-blue-600 font-bold">ORASI Lab</span>.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
           <button 
             onClick={() => setActiveTab('guia')}
             className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'guia' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
           >
              Guía de Usuario
           </button>
           <button 
             onClick={() => setActiveTab('tecnico')}
             className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'tecnico' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
           >
              Especificaciones Técnicas
           </button>
           <button 
             onClick={() => setActiveTab('auditoria')}
             className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'auditoria' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
           >
              Matriz de Auditoría
           </button>
        </div>
      </div>

      {activeTab === 'guia' && (
        <div className="space-y-24 animate-in slide-in-from-bottom-8">
           
           <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 p-8 opacity-10">
                 <Bot className="w-32 h-32" />
              </div>
              <div className="flex-1 space-y-4 relative z-10">
                 <h4 className="text-3xl font-black uppercase tracking-tighter">ORASI Lexicon AI</h4>
                 <p className="text-blue-100 opacity-90 leading-relaxed font-light">
                    Traductor de términos técnicos a valor de negocio. Respuestas directas para decisiones rápidas.
                 </p>
                 <button 
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
                 >
                    Abrir Consultor de Crecimiento
                 </button>
              </div>
              <div className="hidden lg:block w-48 relative z-10">
                 <div className="p-6 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm animate-pulse">
                    <TrendingUp className="w-12 h-12 text-white mb-2" />
                    <div className="h-2 w-full bg-white/20 rounded mb-2"></div>
                    <div className="h-2 w-2/3 bg-white/20 rounded"></div>
                 </div>
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex items-center gap-4 border-l-4 border-blue-600 pl-6">
                 <ListChecks className="w-8 h-8 text-blue-600" />
                 <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Protocolo de Operación <span className="text-blue-600">Paso a Paso</span></h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                 <div className="md:col-span-4 space-y-4">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Cpu className="w-20 h-20" />
                       </div>
                       <h4 className="text-xl font-bold uppercase tracking-tight relative z-10">Inicio de Ciclo</h4>
                       <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                          Cada mañana, el sistema GIC recalcula su posición en la guerra de mercado. Tu misión es asegurar que la arquitectura de datos sea coherente antes de publicar.
                       </p>
                       <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Sistema Operativo v2.6</span>
                       </div>
                    </div>
                 </div>

                 <div className="md:col-span-8 space-y-4">
                    <StepCard number="01" title="Sintonía y Sincronización" desc="Accede a 'Estrategia Core'. Si hay días pasados en rojo, usa el Conciliador de Misiones Perdidas. La IA no se activará si el legado de datos está roto." icon={<RefreshCcw className="w-5 h-5" />} />
                    <StepCard number="02" title="Arquitectura de Mensaje" desc="Entra en 'Misión Diaria'. Pulsa 'Arquitectar Mensaje'. La IA de ORASI Lab generará un copy bajo la regla 80/20 (80% Valor, 20% Venta)." icon={<Sparkles className="w-5 h-5" />} />
                    <StepCard number="03" title="Curación de Assets" desc="Genera o sube el asset visual. Utiliza el 'Laboratorio de Preview' para ver cómo se verá tu post en LinkedIn, Facebook o Instagram antes del lanzamiento." icon={<Globe className="w-5 h-5" />} />
                    <StepCard number="04" title="Despliegue de Campo" desc="Usa los botones de publicación directa. El sistema copiará el texto y abrirá el portal social oficial de ORASI Consulting Group." icon={<SendIcon className="w-5 h-5" />} />
                    <StepCard number="05" title="Sellado de KPIs" desc="Al final del día, registra DMs y Ventas en 'Consola de KPIs' y pulsa 'Sellar Resultados'. Esto es vital para optimizar la IA del día siguiente." icon={<Save className="w-5 h-5" />} />
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CHATBOX FLOTANTE LEXICON AI */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-10 w-96 bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-[100] animate-in slide-in-from-bottom-5 duration-300 h-[500px]">
           <div className="bg-slate-900 p-6 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-600 rounded-xl">
                    <Zap className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black uppercase tracking-widest">Lexicon AI</h4>
                    <span className="text-[9px] text-blue-400 font-bold italic">Traductor de Negocios</span>
                 </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-4 rounded-3xl text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                      {msg.text}
                   </div>
                </div>
              ))}
              {isBotLoading && (
                <div className="flex justify-start">
                   <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resumiendo valor...</span>
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>

           <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="¿Qué término traduzco?"
                className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none text-xs focus:ring-2 focus:ring-blue-500/20"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isBotLoading}
                className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all"
              >
                 <SendIcon className="w-5 h-5" />
              </button>
           </div>
        </div>
      )}

      {activeTab === 'tecnico' && (
        <div className="space-y-20 animate-in slide-in-from-top-8">
           <div className="space-y-12">
              <div className="flex items-center gap-4 border-l-4 border-blue-600 pl-6">
                 <Layers className="w-8 h-8 text-blue-600" />
                 <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Matriz Técnica de <span className="text-blue-600">Fases</span></h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <PhaseSpec 
                   phase="CONCIENCIA"
                   trigger="Ruptura de Status Quo"
                   kpi="Alcance Único / CTR"
                   logic="IA ataca el 'Costo de la Inacción'. Hooks negativos y revelación de errores ocultos en la industria."
                   color="bg-slate-900"
                 />
                 <PhaseSpec 
                   phase="AUTORIDAD"
                   trigger="Validación de Método"
                   kpi="Authority Score / Clicks"
                   logic="Modelado basado en marcos de consultoría (BCG/McKinsey). Demostración técnica del Método ORASI."
                   color="bg-blue-600"
                 />
                 <PhaseSpec 
                   phase="CONVERSACIÓN"
                   trigger="Sesgo de Reciprocidad"
                   kpi="DMs / Comentarios"
                   logic="Incentivo a la respuesta directa. IA genera preguntas abiertas que obligan al usuario a autodiagnosticarse."
                   color="bg-purple-600"
                 />
                 <PhaseSpec 
                   phase="CIERRE"
                   trigger="Urgencia e Imperativo"
                   kpi="Ventas / ROI"
                   logic="Arquitectura de escasez real. Foco absoluto en la transformación final y el cierre de inscripciones."
                   color="bg-red-600"
                 />
              </div>
           </div>
        </div>
      )}

      {activeTab === 'auditoria' && (
        <div className="space-y-16 animate-in slide-in-from-bottom-8">
           <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl space-y-10">
              <div className="flex items-center gap-6 border-b border-slate-50 pb-8">
                 <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <BookMarked className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Matriz de Auditoría de Publicación</h3>
                    <p className="text-sm text-slate-500 font-medium">Lista de control antes de pulsar 'Publicar' en nombre de ORASI Consulting Group.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <AuditItem title="Legibilidad Visual" check="¿El asset visual es coherente con el tono de consultoría de élite?" icon={<EyeIcon className="w-5 h-5" />} />
                 <AuditItem title="Hook de 3 Segundos" check="¿Las primeras 2 líneas detienen el scroll de un CEO o Director?" icon={<Zap className="w-5 h-5" />} />
                 <AuditItem title="Regla 80/20" check="¿El post enseña algo valioso antes de pedir la venta o el DM?" icon={<Database className="w-5 h-5" />} />
                 <AuditItem title="CTA Específico" check="¿El llamado a la acción coincide exactamente con la fase actual?" icon={<Target className="w-5 h-5" />} />
                 <AuditItem title="Integridad de Link" check="¿El link en bio o en el post está activo y optimizado?" icon={<Globe className="w-5 h-5" />} />
                 <AuditItem title="Tono Consultivo" check="¿El mensaje suena directo, sofisticado y autoritario?" icon={<UserCheck className="w-5 h-5" />} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const StepCard = ({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) => (
  <div className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-500 transition-all group shadow-sm">
    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center text-xs font-black group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
       {number}
    </div>
    <div className="flex-1">
       <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
          {icon} {title}
       </h4>
       <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{desc}</p>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-blue-500 transition-all" />
  </div>
);

const PhaseSpec = ({ phase, trigger, kpi, logic, color }: { phase: string, trigger: string, kpi: string, logic: string, color: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-6">
     <div className="flex items-center justify-between">
        <span className={`px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${color}`}>{phase}</span>
        <Target className="w-4 h-4 text-slate-300" />
     </div>
     <div className="space-y-4">
        <div>
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Trigger Psicológico</span>
           <p className="text-md font-black text-slate-900 leading-none">{trigger}</p>
        </div>
        <div>
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Métrica Maestra (KPI)</span>
           <p className="text-md font-bold text-blue-600 leading-none">{kpi}</p>
        </div>
        <div className="pt-4 border-t border-slate-50">
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Lógica del Sistema GIC</span>
           <p className="text-xs text-slate-600 leading-relaxed italic">{logic}</p>
        </div>
     </div>
  </div>
);

const AuditItem = ({ title, check, icon }: { title: string, check: string, icon: React.ReactNode }) => (
  <div className="p-6 bg-slate-50 rounded-3xl space-y-3 border border-transparent hover:border-blue-100 transition-all">
     <div className="flex items-center gap-3 text-blue-600">
        {icon}
        <h5 className="text-[10px] font-black uppercase tracking-widest">{title}</h5>
     </div>
     <p className="text-xs text-slate-700 font-medium leading-relaxed">{check}</p>
  </div>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default Manual;
