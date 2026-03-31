'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, ChevronRight, User, Mail, Building, FileText, CheckCircle2 } from 'lucide-react';

type FlowType = 'HUELLA' | 'VOCERIA' | 'NEGOCIACION' | 'TRANSVERSAL' | null;

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  isInput?: boolean;
}

const ZollaChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flow, setFlow] = useState<FlowType>(null);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hola, soy tu asistente de diagnóstico de ZOLLA. ¿En qué área podemos trabajar hoy?',
      options: ['Liderazgo (HUELLA)', 'Vocería y Medios', 'Negociación', 'No estoy seguro']
    }
  ]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [userData, setUserData] = useState({ name: '', email: '', company: '' });
  const [isCompleted, setIsCompleted] = useState(false);
  const [classification, setClassification] = useState<string | null>(null);
  const [isSubmitDone, setIsSubmitDone] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text,
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    if (flow === null) {
      // Initial routing logic
      if (option.includes('Liderazgo') || option === 'HUELLA') {
        const nextFlow = 'HUELLA';
        setFlow(nextFlow);
        startHuellaFlow();
      } else if (option.includes('Vocería') || option === 'VOCERIA') {
        const nextFlow = 'VOCERIA';
        setFlow(nextFlow);
        startVoceriaFlow();
      } else if (option.includes('Negociación') || option === 'NEGOCIACION') {
        const nextFlow = 'NEGOCIACION';
        setFlow(nextFlow);
        startNegociacionFlow();
      } else {
        const nextFlow = 'TRANSVERSAL';
        setFlow(nextFlow);
        startTransversalFlow();
      }
    } else {
      // Handle flow-specific steps
      processAnswer(option);
    }
  };

  // Flow specific starts
  const startHuellaFlow = () => {
    const nextStep = 1;
    setStep(nextStep);
    setTimeout(() => {
      addBotMessage('Genial, analicemos tu liderazgo. ¿En qué centras más tu atención habitualmente?', 
        ['En los resultados y KPIs', 'En el desarrollo de las personas', 'En ambos por igual']);
    }, 500);
  };

  const startVoceriaFlow = () => {
    const nextStep = 1;
    setStep(nextStep);
    setTimeout(() => {
      addBotMessage('Perfecto, evaluemos tu impacto en medios. ¿Cómo sueles prepararte para una entrevista de prensa?', 
        ['Improviso, conozco bien mi tema', 'Tengo algunos mensajes clave', 'Tengo mensajes clave y simulacros previos']);
    }, 500);
  };

  const startNegociacionFlow = () => {
    const nextStep = 1;
    setStep(nextStep);
    setTimeout(() => {
      addBotMessage('Estrategia de negociación. ¿Qué tan claro tienes tu BATNA (Alternativa fuera del acuerdo) antes de entrar?', 
        ['Muy claro, sé mi límite', 'Más o menos, lo calculo en el camino', 'No tengo un BATNA definido']);
    }, 500);
  };

  const startTransversalFlow = () => {
    const nextStep = 1;
    setStep(nextStep);
    setTimeout(() => {
      addBotMessage('No te preocupes. Cuéntame, ¿qué es lo que más te preocupa hoy en tu rol profesional?', 
        ['La gestión de mi equipo', 'Mi exposición ante medios/público', 'Cerrar acuerdos difíciles']);
    }, 500);
  };

  const processAnswer = (answer: string) => {
    const currentStep = step;
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);
    const nextStep = currentStep + 1;
    setStep(nextStep);

    // Simplified flow logic for mockup
    if (flow === 'HUELLA') {
      if (currentStep === 1) {
        addBotMessage('¿Qué tan seguido sientes que debes intervenir directamente en las tareas operativas de tu equipo?', 
          ['Muy seguido, debo asegurar la calidad', 'A veces, solo en temas críticos', 'Casi nunca, mi equipo es autónomo']);
      } else if (currentStep === 2) {
        addBotMessage('Por último, ¿qué tan consciente eres del pulso emocional actual de tus colaboradores?', 
          ['Estoy muy conectado', 'Tengo una idea general', 'Estoy enfocado en la ejecución, no tanto en lo emocional']);
      } else {
        finishFlow(newAnswers);
      }
    } else if (flow === 'VOCERIA') {
      if (currentStep === 1) {
        addBotMessage('¿Qué tan alineados están tus mensajes con los estándares de Asuntos Corporativos?', 
          ['Totalmente alineados', 'Parcialmente', 'Soy independiente en mis declaraciones']);
      } else if (currentStep === 2) {
        addBotMessage('¿Cuentas con un manual de crisis o protocolo de respuesta rápida?', 
          ['Sí, bien estructurado', 'Existe pero no lo uso mucho', 'No contamos con uno']);
      } else {
        finishFlow(newAnswers);
      }
    } else if (flow === 'NEGOCIACION') {
      if (currentStep === 1) {
        addBotMessage('En una mesa de negociación, ¿te enfocas más en defender tu posición o en buscar los intereses subyacentes?', 
          ['Defiendo mi posición firmemente', 'Busco equilibrio entre ambos', 'Me enfoco 100% en intereses mutuos']);
      } else if (currentStep === 2) {
        addBotMessage('¿Cómo calificarías el nivel de conflicto en tus negociaciones habituales?', 
          ['Alto, suele haber tensión', 'Moderado', 'Bajo, busco colaboración']);
      } else {
        finishFlow(newAnswers);
      }
    } else if (flow === 'TRANSVERSAL') {
      // Re-route based on the transversal answer
      if (answer.includes('equipo')) {
        setFlow('HUELLA');
        startHuellaFlow();
      } else if (answer.includes('medios')) {
        setFlow('VOCERIA');
        startVoceriaFlow();
      } else {
        setFlow('NEGOCIACION');
        startNegociacionFlow();
      }
    }
  };

  const finishFlow = (finalAnswers: any) => {
    // Classification Logic Implementation
    let result = '';
    
    if (flow === 'HUELLA') {
      const a = finalAnswers;
      if (a[1]?.includes('resultados') && a[3]?.includes('ejecución')) {
        result = 'Ejecutor';
      } else if (a[2]?.includes('Muy seguido') || a[2]?.includes('calidad')) {
        result = 'Experto';
      } else if (a[1]?.includes('desarrollo') && a[3]?.includes('conectado')) {
        result = 'Administrador / Líder Consciente';
      } else {
        result = 'Ausente / Pasivo';
      }
    } else if (flow === 'VOCERIA') {
      const a = finalAnswers;
      if (a[1]?.includes('Improviso') || a[3]?.includes('No contamos')) {
        result = 'Riesgo Alto';
      } else if (a[2]?.includes('Parcialmente')) {
        result = 'Riesgo Medio';
      } else {
        result = 'Riesgo Bajo';
      }
    } else if (flow === 'NEGOCIACION') {
      const a = finalAnswers;
      if (a[1]?.includes('No tengo') || a[1]?.includes('posición')) {
        result = 'Negociación Posicional';
      } else if (a[1]?.includes('claro') && a[2]?.includes('intereses')) {
        result = 'Negociación Estratégica';
      } else {
        result = 'Negociación Reactiva';
      }
    }

    setClassification(result);
    addBotMessage(`¡Diagnóstico completado! Hemos identificado que tu perfil tiende hacia: **${result}**.`);
    addBotMessage('Para enviarte el informe detallado en PDF y algunas recomendaciones personalizadas, por favor completa tus datos:');
    setIsCompleted(true);
  };

  const handleUserDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitDone(true);
    addUserMessage(`${userData.name} - ${userData.email} - ${userData.company}`);
    setTimeout(() => {
      addBotMessage(`¡Gracias ${userData.name}! Estamos procesando tu informe. En unos minutos lo recibirás en tu correo con el asunto: "Diagnóstico ZOLLA - ${classification}".`);
      addBotMessage('Fernando ha sido notificado de tus resultados para darte un seguimiento personalizado.');
    }, 800);
    
    // Simulate API call
    console.log('Storing data:', {
      user: userData,
      flow,
      answers,
      classification,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center border border-white/20"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[90vw] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-indigo-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-6 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-lg">
                  <CheckCircle2 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight uppercase tracking-wider">Coach Zolla</h3>
                  <p className="text-indigo-100 text-sm opacity-80">Diagnóstico Inteligente</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl ${
                    msg.type === 'bot' 
                    ? 'bg-indigo-50 text-indigo-900 rounded-tl-none border border-indigo-100' 
                    : 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  }`}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-line">{msg.text}</p>
                    
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleOptionClick(opt)}
                            className="w-full text-left p-3 text-sm bg-white hover:bg-indigo-600 hover:text-white transition-all duration-200 rounded-xl border border-indigo-200 group flex items-center justify-between shadow-sm"
                          >
                            <span className="flex-1">{opt}</span>
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isCompleted && !isSubmitDone && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mt-4 mx-2"
                >
                  <form onSubmit={handleUserDataSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-indigo-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Nombre completo"
                        required
                        value={userData.name}
                        onChange={e => setUserData({...userData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-indigo-400" size={18} />
                      <input 
                        type="email" 
                        placeholder="Email corporativo"
                        required
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 text-indigo-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Empresa"
                        required
                        value={userData.company}
                        onChange={e => setUserData({...userData, company: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                    >
                      Generar mi informe <ChevronRight size={18} />
                    </button>
                  </form>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Footer Status bar */}
            {classification && (
              <div className="p-2 bg-indigo-600 text-[10px] text-white text-center uppercase tracking-widest font-bold">
                ZOLLA Performance Analysis Engine Active
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZollaChatSystem;
