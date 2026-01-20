
import React, { useState } from 'react';
import { BookOpen, Users, Target, Zap, Shield, MessageCircle, Heart, Handshake, ChevronRight, PlayCircle, GraduationCap, X } from 'lucide-react';

export const OrasiAcademy: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'principles' | 'elements' | 'glossary'>('principles');
    const [showVideo, setShowVideo] = useState(false);

    const elements = [
        { id: 1, title: 'Intereses', icon: Heart, desc: 'Lo que realmente motiva a las partes (necesidades, deseos, temores).', tip: 'Pregunta "¿Por qué?" y "¿Por qué no?" para descubrirlos. No negocies posiciones.' },
        { id: 2, title: 'Opciones', icon: Zap, desc: 'Posibilidades creativas para satisfacer los intereses de ambos.', tip: 'Separa la invención de la decisión. Haz lluvia de ideas sin juzgar.' },
        { id: 3, title: 'Legitimidad', icon: Shield, desc: 'Criterios objetivos que hacen que el acuerdo sea justo.', tip: 'Usa leyes, precios de mercado o precedentes para persuadir, no la fuerza.' },
        { id: 4, title: 'Alternativas (MAAN)', icon: Target, desc: 'Lo que harás si NO llegas a un acuerdo.', tip: 'Tu poder de negociación depende de la calidad de tu MAAN. Mejóralo antes de negociar.' },
        { id: 5, title: 'Comunicación', icon: MessageCircle, desc: 'Intercambio efectivo de información y entendimiento.', tip: 'Escucha activamente. Habla sobre ti mismo, no sobre ellos.' },
        { id: 6, title: 'Relación', icon: Users, desc: 'La capacidad de trabajar juntos a futuro.', tip: 'Separa a las personas del problema. Sé suave con la gente, duro con el problema.' },
        { id: 7, title: 'Compromiso', icon: Handshake, desc: 'Planteamientos verbales o escritos sobre lo que se hará.', tip: 'No acuerdes nada hasta que estés de acuerdo en todo. Clarifica quién hace qué.' }
    ];

    const principles = [
        { title: 'Personas', text: 'Separe a las personas del problema.', subtext: 'Los negociadores son personas primero. Reconozca emociones.' },
        { title: 'Intereses', text: 'Concéntrese en los intereses, no en las posiciones.', subtext: 'La posición es lo que dicen querer; el interés es por qué lo quieren.' },
        { title: 'Opciones', text: 'Genere una variedad de posibilidades antes de decidir.', subtext: 'Evite el juicio prematuro y la búsqueda de una "única respuesta".' },
        { title: 'Criterios', text: 'Insista en que el resultado se base en algún criterio objetivo.', subtext: 'El acuerdo debe ser justo independientemente de la voluntad de las partes.' }
    ];

    return (
        <div className="space-y-8 animate-fade-in relative">
            {/* Header */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">ORASI Academy</h2>
                    <p className="text-slate-500 mt-2 max-w-xl text-lg">
                        Domina la metodología Harvard y las herramientas de negociación estratégica para la construcción de consensos.
                    </p>
                </div>
                <div className="relative z-10 bg-slate-900 p-6 rounded-xl text-center min-w-[200px] shadow-xl">
                    <GraduationCap className="w-10 h-10 mx-auto text-[#009BDA] mb-2" />
                    <div className="text-2xl font-bold text-white">Nivel 1</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Certificación Activa</div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#E5F5FB] to-transparent opacity-50 z-0"></div>
            </div>

            {/* Navigation */}
            <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm w-fit">
                <button onClick={() => setActiveTab('principles')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'principles' ? 'bg-[#009BDA] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>Los 4 Principios</button>
                <button onClick={() => setActiveTab('elements')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'elements' ? 'bg-[#009BDA] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>Los 7 Elementos</button>
                <button onClick={() => setActiveTab('glossary')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'glossary' ? 'bg-[#009BDA] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>Conceptos Clave</button>
            </div>

            {/* Content: Principles */}
            {activeTab === 'principles' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((p, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
                            <div className="text-[#009BDA] font-black text-8xl opacity-5 mb-4 absolute -right-4 -bottom-4 group-hover:opacity-10 transition-opacity">
                                {idx + 1}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{p.title}</h3>
                            <p className="text-lg font-medium text-slate-700 mb-3">{p.text}</p>
                            <p className="text-slate-400 text-sm italic">{p.subtext}</p>
                        </div>
                    ))}
                    <div className="md:col-span-2 bg-slate-900 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-b-8 border-[#009BDA]">
                        <div className="max-w-2xl">
                            <h3 className="text-2xl font-bold mb-4">¿Por qué el Método Harvard?</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                El proyecto de negociación de Harvard propone un modelo basado en principios, no en regateo de posiciones. Buscamos acuerdos que sean sensatos, eficientes y que mejoren la relación.
                            </p>
                        </div>
                        <button 
                            onClick={() => setShowVideo(true)}
                            className="bg-[#009BDA] text-white px-8 py-4 rounded-xl font-black hover:bg-[#007CAE] whitespace-nowrap flex items-center gap-3 transition-all hover:scale-105 shadow-2xl uppercase tracking-widest text-sm"
                        >
                            <PlayCircle className="w-6 h-6" /> Ver Masterclass
                        </button>
                    </div>
                </div>
            )}

            {/* Content: 7 Elements */}
            {activeTab === 'elements' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {elements.map((el) => (
                        <div key={el.id} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-[#009BDA] transition-all group flex flex-col shadow-sm">
                            <div className="w-14 h-14 rounded-2xl bg-[#E5F5FB] flex items-center justify-center text-[#009BDA] mb-6 group-hover:bg-[#009BDA] group-hover:text-white transition-all shadow-inner">
                                <el.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-black text-xl text-slate-900 mb-3">{el.id}. {el.title}</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{el.desc}</p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-auto">
                                <div className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Tip Pro</div>
                                <p className="text-xs text-slate-800 font-bold italic leading-tight">"{el.tip}"</p>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gradient-to-br from-[#009BDA] to-[#007CAE] p-8 rounded-2xl text-white flex flex-col justify-center items-center text-center shadow-lg border-b-4 border-slate-900">
                        <Target className="w-12 h-12 mb-4 opacity-50" />
                        <h3 className="font-black text-2xl mb-2 tracking-tight uppercase">Matriz PNR</h3>
                        <p className="text-sm text-blue-100 mb-6">Aplica estos 7 elementos en nuestra herramienta digital de preparación.</p>
                        <button className="bg-white text-[#009BDA] px-6 py-3 rounded-xl text-sm font-black hover:bg-slate-100 w-full uppercase tracking-widest">
                            Ir a PNR Tool
                        </button>
                    </div>
                </div>
            )}

            {/* Content: Glossary */}
            {activeTab === 'glossary' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
                    {[
                        { term: 'MAAN / BATNA', def: 'Mejor Alternativa al Acuerdo Negociado. Es tu "Plan B" fuera de la mesa. Tu poder de negociación real depende de la calidad de tu MAAN.' },
                        { term: 'ZOPA', def: 'Zona de Posible Acuerdo. El rango común donde los intereses de ambas partes se encuentran por encima de sus puntos de reserva.' },
                        { term: 'Punto de Reserva', def: 'El límite absoluto antes de retirarse. Es el punto donde el acuerdo te daría menos valor que tu MAAN.' },
                        { term: 'Anclaje', def: 'Sesgo psicológico donde la primera cifra mencionada influye desproporcionadamente en el resultado final.' },
                        { term: 'Creación de Valor', def: 'Identificar intereses complementarios para "agrandar el pastel" mediante opciones creativas antes de repartirlo.' }
                    ].map((item, i) => (
                        <div key={i} className="p-8 flex flex-col md:flex-row md:items-start gap-6 hover:bg-slate-50 transition-colors">
                            <div className="md:w-1/3">
                                <h4 className="font-black text-[#009BDA] text-xl flex items-center gap-3 uppercase tracking-tighter">
                                    <ChevronRight className="w-5 h-5 text-slate-300" /> {item.term}
                                </h4>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-600 leading-relaxed text-lg">{item.def}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4" onClick={() => setShowVideo(false)}>
                    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl relative animate-scale-up" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowVideo(false)} className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="aspect-video w-full bg-black">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube.com/embed/Hc6yi_FtoNo?autoplay=1&rel=0&modestbranding=1" 
                                title="William Ury: The walk from 'no' to 'yes'" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-8 bg-white border-t border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">El camino del "No" al "Sí"</h3>
                            <p className="text-slate-500 mt-2 text-lg">William Ury explica el tercer lado de la mesa y cómo movernos del conflicto a la colaboración.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
