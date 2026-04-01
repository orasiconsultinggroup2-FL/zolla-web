"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUpRight, Zap, Target, BarChart3, Radio, RefreshCcw, Layout, Search, Brain, Activity, LineChart, FileText } from "lucide-react";

export default function HuellaSection() {
  const [activeFase, setActiveFase] = useState(1);
  const [activeMetric, setActiveMetric] = useState(0);

  const fasaData = [
    {
      num: "01",
      name: "Inmersión",
      sub: "Diagnóstico",
      desc: "Análisis profundo de la cultura y el liderazgo actual para identificar brechas críticas.",
      details: [
        "Mapeo de arquetipos dominantes",
        "Detección de puntos de fricción",
        "Diagnóstico semántico asistido por IA"
      ],
      icon: <Search className="w-6 h-6" />
    },
    {
      num: "02",
      name: "Intervención",
      sub: "Capacitación",
      desc: "Talleres de alto impacto y sesiones de coaching enfocadas en la transformación real.",
      details: [
        "Entrenamiento en toma de decisiones",
        "Cohesión de equipos bajo presión",
        "Desarrollo de nuevas narrativas"
      ],
      icon: <Brain className="w-6 h-6" />
    },
    {
      num: "03",
      name: "Sostenibilidad",
      sub: "Monitorización",
      desc: "Acompañamiento continuo para asegurar que los cambios se conviertan en hábito.",
      details: [
        "Dashboards de seguimiento IA",
        "Sesiones de refuerzo trimestral",
        "Medición de impacto en KPI's"
      ],
      icon: <Activity className="w-6 h-6" />
    }
  ];

  const metrics = [
    {
      label: "NIVEL DE ALIENACIÓN",
      value: "85%",
      desc: "Incremento en la claridad de propósitos y metas compartidas.",
      icon: <Target className="w-5 h-5 text-red-600" />
    },
    {
      label: "REDUCCIÓN DE GAP",
      value: "40%",
      desc: "Cierre de brechas entre el líder ideal y el actual.",
      icon: <LineChart className="w-5 h-5 text-red-600" />
    },
    {
      label: "RETENCIÓN DE TALENTO",
      value: "+60%",
      desc: "Mejora directa en el clima y la lealtad del equipo.",
      icon: <BarChart3 className="w-5 h-5 text-red-600" />
    }
  ];

  return (
    <section id="huella" className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative font-sans">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#D92B14_0%,transparent_60%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="text-[10px] uppercase tracking-[0.4em] font-black text-zolla-primary mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-zolla-primary"></span>
              Metodología de Intervención
            </div>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-8">
              Un líder que deja <span className="text-zolla-primary not-italic font-sans font-black">HUELLA</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              No es una capacitación más. Es un proceso de <span className="text-white font-medium">arquitectura humana</span> diseñado para transformar el liderazgo desde su raíz más profunda.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-3xl"
          >
             <div className="text-4xl font-serif italic text-zolla-primary mb-2">30 años</div>
             <div className="text-[10px] uppercase font-black tracking-widest text-zinc-500">De experiencia corporativa</div>
          </motion.div>
        </div>

        {/* Filosofía Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] relative group overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600 mb-6">El patrón detectado</div>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                El líder técnicamente competente que no sabe construir no tiene un problema de habilidades, tiene un problema de quién cree que es cuando lidera. Ve números, no personas. <span className="text-zolla-primary font-medium">La consecuencia es siempre la misma: resultados a corto plazo, rotación permanente y clima destruido.</span>
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 bg-zinc-900 rounded-[2.5rem] border border-red-900/30 shadow-[0_20px_50px_rgba(217,43,20,0.05)]"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zolla-primary mb-6">La propuesta HUELLA</div>
            <p className="text-lg md:text-xl text-white leading-relaxed font-light italic font-serif">
              "En <span className="text-zolla-primary not-italic font-sans font-black">HUELLA</span>, no enseñamos a mandar. Ayudamos a los líderes a descubrir la marca que quieren dejar. Una marca de respeto, de crecimiento y de resultados extraordinarios que perduran."
            </p>
          </motion.div>
        </div>

        {/* Fases Flow */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif italic mb-4 text-white">El Camino de la Transformación</h3>
            <div className="w-16 h-1 bg-zolla-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-zinc-800 z-0"></div>
             
             {fasaData.map((fase, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="relative z-10 flex flex-col items-center text-center group"
               >
                 <div className="w-20 h-20 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:border-zolla-primary group-hover:text-zolla-primary transition-all duration-500 mb-8 bg-zinc-900/80 backdrop-blur-md">
                   {fase.icon}
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zolla-primary mb-2">Fase {fase.num}</div>
                 <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{fase.name}</h4>
                 <p className="text-xs uppercase font-bold text-zinc-500 mb-6 tracking-widest">{fase.sub}</p>
                 <p className="text-zinc-400 text-sm leading-relaxed max-w-[250px]">{fase.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>

        {/* AI Metrics */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full"></div>
            <div className="relative p-1 bg-gradient-to-br from-zinc-800 to-transparent rounded-[2.5rem]">
              <div className="bg-zinc-950 p-10 rounded-[2.4rem] border border-zinc-800/50">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-zolla-primary">
                       <LineChart className="w-5 h-5" />
                     </div>
                     <div className="text-sm font-black uppercase tracking-widest text-zinc-400">Panel de Resultados</div>
                   </div>
                   <div className="px-4 py-1.5 rounded-full bg-red-600/10 text-zolla-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
                     Live Analysis
                   </div>
                </div>

                <div className="space-y-8">
                   {metrics.map((m, i) => (
                     <div key={i} className="group cursor-pointer">
                        <div className="flex justify-between items-end mb-3">
                           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{m.label}</div>
                           <div className="text-2xl font-black text-white">{m.value}</div>
                        </div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: m.value === "85%" ? "85%" : m.value === "40%" ? "40%" : "60%" }}
                             viewport={{ once: true }}
                             className="h-full bg-zolla-primary"
                           ></motion.div>
                        </div>
                        <p className="mt-3 text-[10px] text-zinc-500 italic">{m.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <div>
              <div className="text-zolla-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6">Arquitectura IA</div>
              <h3 className="text-4xl font-serif italic text-white mb-8">Decisiones guiadas por datos, no por suposiciones.</h3>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Nuestra metodología integra <span className="text-white font-medium">Arquitectura de Inteligencia Artificial</span> para medir lo que antes era invisible: la coherencia semántica del líder y la progresión real del cambio.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Diagnóstico Semántico", desc: "Análisis de patrones de lenguaje y comunicación." },
                { title: "Cálculo del GAP", desc: "Medición exacta entre el estado actual e ideal." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-red-900/30 transition-all cursor-default">
                  <h5 className="text-white font-bold mb-2 text-sm">{item.title}</h5>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <a href="#contacto" className="inline-flex items-center gap-4 text-zolla-primary font-black text-xs uppercase tracking-[0.2em] group">
              Explorar el panel de diagnóstico
              <div className="w-10 h-10 rounded-full border border-zolla-primary/30 flex items-center justify-center group-hover:bg-zolla-primary group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA Strip */}
      <div className="mt-32 border-y border-zinc-900 bg-zinc-950/80 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-2xl bg-zolla-primary flex items-center justify-center text-white shadow-[0_0_40px_rgba(217,43,20,0.3)]">
               <Zap className="w-8 h-8 fill-current" />
             </div>
             <div>
               <h4 className="text-2xl font-bold text-white uppercase tracking-tight">Cierra el año con impacto real</h4>
               <p className="text-zinc-500 text-sm">Inicia tu proceso de transformación <span className="text-zolla-primary font-bold uppercase">HUELLA</span> hoy mismo.</p>
             </div>
           </div>
           <a href="#contacto" className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-zolla-primary hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
             AGENDAR DIAGNÓSTICO
           </a>
        </div>
      </div>
    </section>
  );
}
