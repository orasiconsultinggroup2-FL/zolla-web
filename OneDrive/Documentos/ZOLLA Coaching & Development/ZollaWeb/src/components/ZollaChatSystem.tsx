'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, X, User, Mail, Building, CheckCircle2,
  ShieldCheck, ArrowRight, RefreshCw
} from 'lucide-react';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz7s_YetSPqHZj3dQs3XjFoMFvMXb13IYEtale_uF3YYUYH17BsdhgKJJkoKXmY-kZSUg/exec';

type FlowType = 'HUELLA' | 'VOCERIA' | 'NEGOCIACION' | null;

interface Message {
  id: string;
  type: 'bot' | 'user' | 'typing';
  text: string;
  options?: string[];
}

interface Step {
  key: string;
  text: string;
  options: string[];
}

const FLOW_DATA: Record<string, Step[]> = {
  huella: [
    {
      key: 'q1',
      text: '¿Qué pasa en tu equipo cuando tú no estás o fallas?',
      options: ['Se paraliza, esperan que yo resuelva', 'Avanzan pero cometen errores', 'Funcionan bien de forma autónoma', 'Depende del problema']
    },
    {
      key: 'q2',
      text: '¿Por qué crees que tus mejores colaboradores se quedan en tu equipo?',
      options: ['Por el salario y beneficios', 'Por el ambiente y liderazgo', 'Porque no han encontrado algo mejor', 'No estoy seguro']
    },
    {
      key: 'q3',
      text: '¿Qué porcentaje de tu tiempo consumes resolviendo lo que tu equipo debería resolver?',
      options: ['0–20%', '20–40%', '40–60%', 'Más del 60%']
    },
    {
      key: 'q4',
      text: '¿Con qué frecuencia das retroalimentación directa a tu equipo?',
      options: ['Regularmente y con método', 'Solo cuando hay problemas', 'Casi nunca, no me siento cómodo', 'Lo delego a otros']
    },
    {
      key: 'q5',
      text: '¿Qué tan seguido sientes que tu equipo te oculta problemas?',
      options: ['Nunca', 'A veces', 'Frecuente', 'Muy frecuente']
    },
    {
      key: 'q6',
      text: '¿Qué tan claro tienes el impacto que generas en el clima de tu equipo?',
      options: ['Muy claro', 'Algo claro', 'Poco claro', 'Nada claro']
    },
  ],
  voceria: [
    {
      key: 'v1',
      text: '¿Cómo reaccionan tus voceros ante preguntas hostiles o inesperadas?',
      options: ['Con calma y mensajes claros', 'Improvisan en el momento', 'Se ponen a la defensiva', 'No hemos tenido esa situación']
    },
    {
      key: 'v2',
      text: '¿Tienen mensajes preparados para escenarios sensibles o regulatorios?',
      options: ['Sí, están documentados', 'Parcialmente', 'No']
    },
    {
      key: 'v3',
      text: '¿Tus voceros improvisan o siguen un marco claro de comunicación?',
      options: ['Siguen un marco claro', 'A veces siguen un marco', 'Improvisan']
    },
    {
      key: 'v4',
      text: '¿Qué tan alineados están los voceros con el área de Asuntos Corporativos?',
      options: ['Muy alineados', 'Algo alineados', 'Poco alineados', 'Nada alineados']
    },
    {
      key: 'v5',
      text: '¿Qué tan preparados están para entrevistas en vivo o situaciones de crisis?',
      options: ['Muy preparados', 'Algo preparados', 'Poco preparados', 'Nada preparados']
    },
  ],
  negociacion: [
    {
      key: 'n1',
      text: '¿Tus negociaciones se basan principalmente en posiciones o en intereses?',
      options: ['En intereses y necesidades reales', 'En posiciones fijas', 'Es mixto según el caso']
    },
    {
      key: 'n2',
      text: '¿Qué tan claro tienes el BATNA (mejor alternativa) de tu contraparte?',
      options: ['Muy claro', 'Algo claro', 'Poco claro', 'Nada claro']
    },
    {
      key: 'n3',
      text: '¿Cuántas negociaciones recientes terminaron en desgaste o conflicto?',
      options: ['Ninguna', 'Algunas', 'Varias', 'Muchas']
    },
    {
      key: 'n4',
      text: '¿Qué tan preparado llega tu equipo a una mesa de negociación compleja?',
      options: ['Muy preparado', 'Algo preparado', 'Poco preparado', 'Nada preparado']
    },
    {
      key: 'n5',
      text: '¿Qué tan multiactor es tu entorno de negociación?',
      options: ['Bajo — generalmente 1 a 1', 'Medio — varios actores', 'Alto — múltiples partes con intereses distintos']
    },
    {
      key: 'n6',
      text: '¿Qué porcentaje de acuerdos se cumplen sin fricción posterior?',
      options: ['80–100%', '60–80%', '40–60%', 'Menos del 40%']
    },
  ],
};

const classify = (flow: FlowType, answers: Record<string, string>) => {
  if (flow === 'HUELLA') {
    const q3 = answers.q3 || '';
    const q5 = answers.q5 || '';
    const q6 = answers.q6 || '';
    if (q3.includes('60') || q5.includes('Muy frecuente')) return { result: 'Ejecutor', message: 'Entregas resultados, pero tu equipo paga el costo. Estás cargando responsabilidades que deberían estar distribuidas.' };
    if (q3.includes('40') || q3.includes('Más')) return { result: 'Experto', message: 'Tu conocimiento es tu fortaleza, pero también tu límite. Convertirte en líder multiplicador es el siguiente paso.' };
    if (q6.includes('Poco') || q6.includes('Nada')) return { result: 'Ausente', message: 'Hay una brecha entre tu presencia formal y tu huella real en el equipo. Eso tiene un costo silencioso.' };
    return { result: 'Administrador', message: 'Gestionas procesos con eficiencia, pero liderar personas requiere una disciplina distinta que aún está por desarrollar.' };
  }
  if (flow === 'VOCERIA') {
    const v2 = answers.v2 || '';
    const v3 = answers.v3 || '';
    if (v3 === 'Improvisan' || v2 === 'No') return { result: 'Riesgo Alto', message: 'Un vocero que improvisa ante la prensa o en una crisis puede comprometer la reputación institucional en segundos.' };
    if (v2 === 'Parcialmente') return { result: 'Riesgo Medio', message: 'Tienen una base, pero la falta de práctica bajo presión real es el eslabón débil de tu estrategia de vocería.' };
    return { result: 'Riesgo Bajo', message: 'Buena base estructural. El siguiente nivel es entrenamiento en escenarios adversos, medios hostiles y crisis simultáneas.' };
  }
  if (flow === 'NEGOCIACION') {
    const n2 = answers.n2 || '';
    const n3 = answers.n3 || '';
    if (n2.includes('Nada') || n3.includes('Muchas')) return { result: 'Posicional', message: 'Mucha presión, poco diseño estratégico. Los acuerdos que se logran bajo esta dinámica son frágiles y tienen costo oculto.' };
    if (n2.includes('Poco') || n3.includes('Varias')) return { result: 'Reactiva', message: 'Tu equipo negocia, pero reacciona más de lo que diseña. La preparación previa es donde se gana o se pierde la mesa.' };
    return { result: 'Estratégica', message: 'Base sólida. El diferencial está en el diseño fino: mapeo de actores, gestión de coaliciones y cierre de acuerdos duraderos.' };
  }
  return { result: 'Indefinido', message: '' };
};

const ZollaChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<FlowType>(null);
  const [stepIndex, setStepIndex] = useState(-1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [classification, setClassification] = useState<{ result: string; message: string } | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', company: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 100);
  };

  useEffect(() => { scrollToBottom(); }, [messages, showLeadForm]);

  const addBotMessage = (text: string, options?: string[], delay = 900) => {
    const typingId = 'typing-' + Date.now() + Math.random();
    setMessages(prev => [...prev, { id: typingId, type: 'typing', text: '' }]);
    setTimeout(() => {
      setMessages(prev =>
        prev.filter(m => m.id !== typingId).concat({
          id: Date.now().toString() + Math.random(),
          type: 'bot',
          text,
          options
        })
      );
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text }]);
  };

  const resetChat = () => {
    setCurrentFlow(null);
    setStepIndex(-1);
    setAnswers({});
    setInputValue('');
    setIsCompleted(false);
    setClassification(null);
    setShowLeadForm(false);
    setUserData({ name: '', email: '', company: '' });
    setFormErrors({ name: '', email: '', company: '' });
    setIsSubmitting(false);
    setIsSubmitted(false);
    setMessages([]);
    setTimeout(() => {
      addBotMessage(
        'Bienvenido a ZOLLA. En menos de 3 minutos obtienes una lectura inicial de tu situación. ¿Qué área deseas diagnosticar?',
        ['HUELLA — Liderazgo', 'VOCERÍA', 'NEGOCIACIÓN']
      );
    }, 200);
  };

  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      if (messages.length === 0) resetChat();
    };
    window.addEventListener('zolla:openChat', handler);
    return () => window.removeEventListener('zolla:openChat', handler);
  }, [messages.length]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) resetChat();
  };

  const handleClose = () => setIsOpen(false);

  const handleAnswer = (answer: string) => {
    addUserMessage(answer);

    if (stepIndex === -1) {
      let nextF: FlowType = null;
      if (answer.includes('HUELLA')) nextF = 'HUELLA';
      else if (answer.includes('VOCERÍA')) nextF = 'VOCERIA';
      else if (answer.includes('NEGOCIACIÓN')) nextF = 'NEGOCIACION';

      if (nextF) {
        setCurrentFlow(nextF);
        setStepIndex(0);
        const firstStep = FLOW_DATA[nextF.toLowerCase()][0];
        addBotMessage(firstStep.text, firstStep.options);
      }
    } else if (currentFlow) {
      const steps = FLOW_DATA[currentFlow.toLowerCase()];
      const currentStep = steps[stepIndex];
      const newAnswers = { ...answers, [currentStep.key]: answer };
      setAnswers(newAnswers);

      const nextIdx = stepIndex + 1;
      if (nextIdx < steps.length) {
        setStepIndex(nextIdx);
        addBotMessage(steps[nextIdx].text, steps[nextIdx].options);
      } else {
        const result = classify(currentFlow, newAnswers);
        setClassification(result);
        setIsCompleted(true);
        addBotMessage('He procesado tus respuestas.', undefined, 800);
        setTimeout(() => {
          addBotMessage(`Tu perfil diagnóstico: ${result.result}.`, undefined, 900);
          setTimeout(() => {
            addBotMessage(result.message, undefined, 900);
            setTimeout(() => {
              setShowLeadForm(true);
              addBotMessage('Para que un consultor ZOLLA revise tu diagnóstico y se contacte contigo, completa estos datos:', undefined, 900);
            }, 1800);
          }, 1800);
        }, 1600);
      }
    }
  };

  const validateForm = () => {
    const errors = { name: '', email: '', company: '' };
    let valid = true;

    if (userData.name.trim().length < 3) {
      errors.name = 'Ingresa tu nombre completo';
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email.trim())) {
      errors.email = 'Ingresa un email válido';
      valid = false;
    }
    if (userData.company.trim().length < 2) {
      errors.company = 'Ingresa tu empresa o cargo';
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: userData.name.trim(),
          email: userData.email.trim(),
          servicio: currentFlow,
          perfil: classification?.result || ''
        })
      });
    } catch (err) {
      console.error('Error enviando lead:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    addBotMessage(
      `Perfecto, ${userData.name.trim().split(' ')[0]}. Un consultor ZOLLA revisará tu diagnóstico y te contactará en menos de 24 horas hábiles en ${userData.email.trim()}.`,
      undefined, 600
    );
  };

  const currentSteps = currentFlow ? FLOW_DATA[currentFlow.toLowerCase()] : null;
  const isWaitingFreeText = false;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={isOpen ? handleClose : handleOpen}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#D92B14] text-white' : 'bg-white text-[#D92B14]'}`}
      >
        {isOpen ? <X size={24} /> : <span className="font-black text-sm tracking-tight">ZO</span>}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[380px] max-w-[90vw] h-[600px] bg-white rounded-[2rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col border border-slate-200"
          >
            {/* Header */}
            <div className="bg-[#D92B14] p-5 text-white relative flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="text-[#D92B14]" size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-[#D92B14] rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-black text-base uppercase tracking-tight">ZOLLA <span className="opacity-50 font-light text-sm">AI</span></h3>
                    <p className="text-[10px] text-red-100 uppercase tracking-widest font-semibold">Diagnóstico activo</p>
                  </div>
                </div>
                <button
                  onClick={resetChat}
                  className="text-red-200 hover:text-white transition-colors p-1"
                  title="Reiniciar diagnóstico"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <ShieldCheck size={72} />
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50"
              style={{ scrollbarWidth: 'none' }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'typing' ? (
                    <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex gap-1 shadow-sm">
                      {[0, 150, 300].map((delay) => (
                        <div key={delay} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.type === 'user'
                          ? 'bg-[#D92B14] text-white rounded-tr-none'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                      }`}
                    >
                      <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                      {msg.options && msg.options.length > 0 && !isSubmitted && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(opt)}
                              className="px-3 py-1.5 bg-slate-50 text-[#D92B14] border border-red-200 rounded-full text-xs font-bold hover:bg-[#D92B14] hover:text-white hover:border-[#D92B14] transition-all"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Lead Form */}
              {showLeadForm && !isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm"
                >
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 text-slate-400" size={15} />
                        <input
                          type="text"
                          placeholder="Nombre completo *"
                          value={userData.name}
                          onChange={e => { setUserData({ ...userData, name: e.target.value }); setFormErrors({ ...formErrors, name: '' }); }}
                          className={`w-full pl-9 pr-3 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-400 transition-all ${formErrors.name ? 'border-red-400' : 'border-slate-200'}`}
                        />
                      </div>
                      {formErrors.name && <p className="text-red-500 text-xs mt-1 pl-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-slate-400" size={15} />
                        <input
                          type="email"
                          placeholder="Email corporativo *"
                          value={userData.email}
                          onChange={e => { setUserData({ ...userData, email: e.target.value }); setFormErrors({ ...formErrors, email: '' }); }}
                          className={`w-full pl-9 pr-3 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-400 transition-all ${formErrors.email ? 'border-red-400' : 'border-slate-200'}`}
                        />
                      </div>
                      {formErrors.email && <p className="text-red-500 text-xs mt-1 pl-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <Building className="absolute left-3 top-3.5 text-slate-400" size={15} />
                        <input
                          type="text"
                          placeholder="Empresa / Cargo *"
                          value={userData.company}
                          onChange={e => { setUserData({ ...userData, company: e.target.value }); setFormErrors({ ...formErrors, company: '' }); }}
                          className={`w-full pl-9 pr-3 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-400 transition-all ${formErrors.company ? 'border-red-400' : 'border-slate-200'}`}
                        />
                      </div>
                      {formErrors.company && <p className="text-red-500 text-xs mt-1 pl-1">{formErrors.company}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#D92B14] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? 'Enviando...' : 'Solicitar consultoría'}
                      <ArrowRight size={14} />
                    </button>
                    <p className="text-[9px] text-slate-400 text-center uppercase tracking-tight">
                      Tus datos son confidenciales y solo serán usados por el equipo ZOLLA.
                    </p>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Input — oculto porque todo es por botones */}
            {isWaitingFreeText && (
              <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Escribe tu respuesta..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && inputValue.trim() && handleAnswer(inputValue.trim()) && setInputValue('')}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    onClick={() => { if (inputValue.trim()) { handleAnswer(inputValue.trim()); setInputValue(''); } }}
                    className="w-10 h-10 bg-[#D92B14] text-white rounded-xl flex items-center justify-center hover:bg-[#1A1A1A] transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="bg-white border-t border-slate-100 p-3 text-[9px] text-slate-400 flex items-center justify-center gap-3 flex-shrink-0">
              <span className="font-bold tracking-widest uppercase">© 2026 ZOLLA Coaching & Development</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZollaChatSystem;
