import React, { useState, useEffect } from 'react';
import { generateSocialPost } from '../services/geminiService';

const negotiationTopics = {
  "Estrategia y Tácticas": [
    "La importancia del BATNA (Mejor Alternativa)",
    "Cómo establecer un ZOPA efectivo",
    "El poder del silencio en la negociación",
    "Táctica del Policía Bueno / Policía Malo",
    "Anclaje de precios: Cómo hacerlo bien",
    "Negociación integrativa vs distributiva",
    "Cómo detectar mentiras en la mesa",
    "El uso de preguntas abiertas para obtener info",
    "Lenguaje corporal: Lo que no se dice",
    "Preparación previa: La clave del éxito",
    "Manejo de emociones bajo presión",
    "Cuándo levantarse de la mesa",
    "La técnica del 'Espejo' (Mirroring)",
    "Reciprocidad: Dar para recibir",
    "Cómo negociar con alguien más poderoso",
    "Sesgos cognitivos en la toma de decisiones",
    "La importancia del Rapport inicial",
    "Cerrar el trato: Señales de compra",
    "Negociación por principios (Método Harvard)",
    "Reencuadre (Reframing) de situaciones negativas"
  ],
  "Salarios y RRHH": [
    "Cómo pedir un aumento salarial con éxito",
    "Negociación de beneficios no monetarios",
    "La contraoferta: Cuándo y cómo hacerla",
    "Negociar el teletrabajo o flexibilidad",
    "Discusión de bono anual y variables",
    "Entrevistas de salida: Qué decir y qué callar",
    "Resolución de conflictos entre compañeros",
    "Negociación de contrato de alta dirección",
    "Cómo negociar una promoción interna",
    "Cláusulas de no competencia",
    "Negociar presupuesto para capacitación",
    "Manejo de expectativas del jefe",
    "Renegociación de condiciones laborales",
    "Equidad salarial en el equipo",
    "Negociar días de vacaciones extra",
    "Cómo rechazar una oferta laboral educadamente",
    "Negociación sindical: Fundamentos",
    "Feedback negativo: Cómo recibirlo y negociar",
    "Plan de carrera a largo plazo",
    "Indemnizaciones y paquetes de retiro"
  ],
  "Ventas y Clientes": [
    "Manejo de la objeción 'Es muy caro'",
    "Negociar con el departamento de compras",
    "Venta consultiva vs Venta transaccional",
    "Cómo recuperar un cliente insatisfecho",
    "Negociación de términos de pago (Net 30/60/90)",
    "Upselling y Cross-selling estratégico",
    "Cómo evitar descuentos innecesarios",
    "Negociación de contratos a largo plazo",
    "Gestión de alcance (Scope Creep) en proyectos",
    "Fidelización a través de la negociación",
    "Cómo decir 'No' al cliente sin perderlo",
    "Negociación de SLAs (Acuerdos de Nivel de Servicio)",
    "Renovación de contratos anuales",
    "Lidiar con clientes agresivos",
    "Diferenciación de valor vs precio",
    "Estrategias de cierre para B2B",
    "Negociación con proveedores clave",
    "Alianzas estratégicas y partners",
    "Descuentos por volumen: Cuándo aplicarlos",
    "Ciclos de venta largos: Mantener el interés"
  ],
  "Conflictos Sociales": [
    "Mediación en conflictos comunitarios",
    "Desescalada de violencia verbal",
    "Intereses vs Posiciones en conflictos",
    "Creación de consenso en grupos grandes",
    "Negociación intercultural: Respeto y normas",
    "Manejo de crisis de reputación pública",
    "Diálogo con stakeholders difíciles",
    "Justicia restaurativa en la comunidad",
    "Negociación ambiental y sostenibilidad",
    "Facilitación de asambleas vecinales",
    "Liderazgo en tiempos de crisis social",
    "Empatía táctica en situaciones hostiles",
    "Construcción de confianza tras una ruptura",
    "Arbitraje: Cuándo es necesario",
    "Negociación con activistas y ONGs",
    "Gestión de rumores y desinformación",
    "Protocolos de comunicación en crisis",
    "Derechos humanos y negociación corporativa",
    "Responsabilidad Social Corporativa (RSC)",
    "Acuerdos ganar-ganar en el ámbito social"
  ]
};

// Map categories to high-quality Unsplash images
const categoryImages: Record<string, string> = {
  "Estrategia y Tácticas": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop", // Chess/Meeting
  "Salarios y RRHH": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop", // Professional Interview
  "Ventas y Clientes": "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop", // Group Meeting/Handshake
  "Conflictos Sociales": "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop" // People/Community
};

const ContentGenerator: React.FC = () => {
  // Steps: 0: Category, 1: Title, 2: Content Type, 3: Platform, 4: Generate/Result
  const [step, setStep] = useState(0);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [contentType, setContentType] = useState('');
  const [platform, setPlatform] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // State to track used titles (Persistence)
  const [usedTitles, setUsedTitles] = useState<string[]>(() => {
    const saved = localStorage.getItem('orasi_used_titles');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orasi_used_titles', JSON.stringify(usedTitles));
  }, [usedTitles]);

  const markTitleAsUsed = (title: string) => {
    if (!usedTitles.includes(title)) {
      setUsedTitles(prev => [...prev, title]);
    }
  };

  const resetCategoryHistory = (category: string) => {
    const categoryTitles = negotiationTopics[category as keyof typeof negotiationTopics];
    const newUsed = usedTitles.filter(t => !categoryTitles.includes(t));
    setUsedTitles(newUsed);
  };

  const platforms = [
    { id: 'LinkedIn', icon: 'business', color: 'text-blue-500', desc: 'Ideal para B2B y carrera' },
    { id: 'Instagram', icon: 'photo_camera', color: 'text-pink-500', desc: 'Visual y marca personal' },
    { id: 'Twitter/X', icon: 'tag', color: 'text-white', desc: 'Opinión y actualidad' },
    { id: 'TikTok', icon: 'music_note', color: 'text-cyan-400', desc: 'Viralidad y consejos rápidos' },
    { id: 'Blog Corp.', icon: 'article', color: 'text-orange-500', desc: 'Artículos de fondo y SEO' },
    { id: 'YouTube', icon: 'play_circle', color: 'text-red-500', desc: 'Educación profunda' }
  ];

  const contentTypes = [
    { id: 'Post de Texto', icon: 'description' },
    { id: 'Historia / Story', icon: 'history' },
    { id: 'Reel / Video Corto', icon: 'movie' },
    { id: 'Guion de Video Largo', icon: 'videocam' },
    { id: 'Artículo Completo', icon: 'article' },
    { id: 'Hilo (Thread)', icon: 'library_books' }
  ];

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setStep(1);
  };

  const handleTitleSelect = (t: string) => {
    setSelectedTitle(t);
    setStep(2);
  };

  const handleTypeSelect = (t: string) => {
    setContentType(t);
    setStep(3);
  };

  const handlePlatformSelect = (p: string) => {
    setPlatform(p);
    setStep(4);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsPublished(false);
    try {
      const result = await generateSocialPost(platform, contentType, selectedCategory, selectedTitle);
      setGeneratedContent(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger generation when entering step 4 if not generated yet
  useEffect(() => {
    if (step === 4 && !generatedContent && !isGenerating) {
      handleGenerate();
    }
  }, [step]);

  const handlePublish = () => {
    setIsPublished(true);
    markTitleAsUsed(selectedTitle); // Mark as used only on publish or successful generation
    // Simulation of API publishing to company accounts
    setTimeout(() => {
      alert(`¡Contenido publicado automáticamente en la cuenta de empresa de ${platform}!`);
    }, 800);
  };

  const reset = () => {
    setStep(0);
    setSelectedCategory('');
    setSelectedTitle('');
    setContentType('');
    setPlatform('');
    setGeneratedContent('');
    setIsPublished(false);
  };

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header with Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#92a4c9] mb-2">
            <button onClick={() => setStep(0)} className={`hover:text-white ${step >= 0 ? 'text-primary' : ''}`}>Categoría</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <button onClick={() => step > 1 && setStep(1)} className={`hover:text-white ${step >= 1 ? 'text-primary' : ''}`}>Título</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <button onClick={() => step > 2 && setStep(2)} className={`hover:text-white ${step >= 2 ? 'text-primary' : ''}`}>Formato</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className={`${step >= 3 ? 'text-primary' : ''}`}>Plataforma</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Generador de Contenido: Negociación</h1>
          <p className="text-text-secondary">Crea contenido experto para las cuentas de la empresa en 4 simples pasos.</p>
        </div>

        {/* STEP 0: CATEGORY SELECTION */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {Object.keys(negotiationTopics).map((cat) => {
                const categoryTitles = negotiationTopics[cat as keyof typeof negotiationTopics];
                const availableCount = categoryTitles.filter(t => !usedTitles.includes(t)).length;
                
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="group bg-surface-dark border border-border-dark hover:border-primary p-8 rounded-xl text-left transition-all hover:shadow-lg hover:shadow-primary/10 flex flex-col gap-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${availableCount === 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {availableCount} / 20 Disp.
                        </span>
                    </div>
                    <div className="size-12 rounded-lg bg-[#111722] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-[#92a4c9]">
                      <span className="material-symbols-outlined text-3xl">
                        {cat.includes('Estrategia') ? 'strategy' : 
                         cat.includes('Salarios') ? 'work' : 
                         cat.includes('Ventas') ? 'sell' : 'handshake'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{cat}</h3>
                      <p className="text-[#92a4c9] text-sm">Contenidos especializados</p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center text-sm font-medium text-[#92a4c9] group-hover:text-white">
                      Seleccionar Categoría <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                    </div>
                  </button>
                );
            })}
          </div>
        )}

        {/* STEP 1: TITLE SELECTION */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">library_books</span>
                  Selecciona un tema de {selectedCategory}
                </h2>
                
                {negotiationTopics[selectedCategory as keyof typeof negotiationTopics].every(t => usedTitles.includes(t)) && (
                    <button 
                        onClick={() => resetCategoryHistory(selectedCategory)}
                        className="text-xs text-primary hover:text-white underline"
                    >
                        Reiniciar historial de categoría
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {negotiationTopics[selectedCategory as keyof typeof negotiationTopics].map((title, index) => {
                const isUsed = usedTitles.includes(title);
                return (
                    <button
                      key={index}
                      onClick={() => !isUsed && handleTitleSelect(title)}
                      disabled={isUsed}
                      className={`
                        p-4 rounded-lg text-left text-sm font-medium transition-all flex items-center justify-between group border
                        ${isUsed 
                            ? 'bg-[#111722] border-transparent text-gray-600 cursor-not-allowed opacity-60' 
                            : 'bg-surface-dark border-border-dark hover:bg-[#232f48] hover:border-primary/50 text-gray-200'}
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`text-xs font-mono ${isUsed ? 'text-gray-700' : 'text-[#586e96]'}`}>{(index + 1).toString().padStart(2, '0')}</span>
                        <span className={isUsed ? 'line-through' : ''}>{title}</span>
                      </span>
                      {isUsed ? (
                         <span className="text-xs text-gray-600 font-bold px-2 py-0.5 rounded bg-gray-800">USADO</span>
                      ) : (
                         <span className="material-symbols-outlined text-[#586e96] opacity-0 group-hover:opacity-100 transition-opacity">check_circle</span>
                      )}
                    </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: CONTENT TYPE SELECTION */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_none</span>
              ¿Qué tipo de contenido será?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="bg-surface-dark border border-border-dark hover:border-primary p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all hover:bg-[#232f48]"
                >
                  <span className="material-symbols-outlined text-3xl text-[#92a4c9]">{type.icon}</span>
                  <span className="text-white font-medium">{type.id}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: PLATFORM SELECTION */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">public</span>
              Selecciona la plataforma de destino
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePlatformSelect(p.id)}
                  className="bg-surface-dark border border-border-dark hover:border-primary hover:bg-[#232f48] p-6 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`material-symbols-outlined text-3xl ${p.color}`}>{p.icon}</span>
                    <span className="size-6 rounded-full border border-border-dark flex items-center justify-center group-hover:border-primary group-hover:bg-primary">
                       <span className="material-symbols-outlined text-white text-sm opacity-0 group-hover:opacity-100">arrow_forward</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{p.id}</h3>
                  <p className="text-xs text-[#92a4c9]">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: GENERATION & PUBLISH */}
        {step === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500 h-full min-h-[600px]">
            {/* Summary Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#92a4c9] uppercase tracking-wider mb-4">Resumen de Campaña</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-[#586e96] block mb-1">Categoría</span>
                    <span className="text-white font-medium">{selectedCategory}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#586e96] block mb-1">Título</span>
                    <span className="text-white font-medium">{selectedTitle}</span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-xs text-[#586e96] block mb-1">Formato</span>
                      <span className="text-white font-medium">{contentType}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#586e96] block mb-1">Destino</span>
                      <span className="text-white font-medium">{platform}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border-dark">
                   <button onClick={reset} className="text-sm text-primary hover:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">restart_alt</span> Comenzar de nuevo
                   </button>
                </div>
              </div>

              {!isPublished && generatedContent && (
                <button
                  onClick={handlePublish}
                  className="w-full bg-primary hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all text-lg"
                >
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Publicar en {platform}
                </button>
              )}
              
              {isPublished && (
                 <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 text-green-400">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                    <div>
                       <p className="font-bold">¡Publicado con éxito!</p>
                       <p className="text-xs opacity-80">El contenido ya está visible en las cuentas de la empresa.</p>
                    </div>
                 </div>
              )}
            </div>

            {/* Content Preview with Background Image */}
            <div className="lg:col-span-2 bg-[#161b22] border border-border-dark rounded-xl flex flex-col overflow-hidden relative shadow-2xl">
              <div className="p-4 bg-[#111722] border-b border-border-dark flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-2">
                   <span className="size-2 bg-red-500 rounded-full"></span>
                   <span className="size-2 bg-yellow-500 rounded-full"></span>
                   <span className="size-2 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-xs text-[#92a4c9] font-mono">gemini-negotiation-expert.ai</span>
              </div>
              
              <div className="flex-1 overflow-y-auto relative bg-[#111722]">
                {/* Background Image Container */}
                {selectedCategory && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000"
                        style={{ 
                            backgroundImage: `url('${categoryImages[selectedCategory]}')`,
                            opacity: isGenerating ? 0.3 : 1
                        }}
                    >
                    </div>
                )}
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/70 z-0"></div>

                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4 relative z-10">
                    <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white animate-pulse font-bold text-lg drop-shadow-md">Analizando estrategias de negociación...</p>
                    <p className="text-sm text-gray-300 drop-shadow">Aplicando tácticas de persuasión para {platform}</p>
                  </div>
                ) : generatedContent ? (
                  <div className="relative z-10 p-8 h-full">
                     <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
                        <div className="prose prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-white leading-relaxed font-body text-lg drop-shadow-sm">
                                {generatedContent}
                            </div>
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 relative z-10">
                    Esperando generación...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContentGenerator;