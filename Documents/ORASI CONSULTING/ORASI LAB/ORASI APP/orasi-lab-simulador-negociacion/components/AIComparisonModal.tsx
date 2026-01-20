
import React, { useState, useEffect } from 'react';
import { PNRData, AIAnalysis } from '../types';
import { Bot, User, X, CheckCircle, BrainCircuit, Sparkles, Scale, Lightbulb, ArrowRight, Loader2 } from 'lucide-react';

interface AIComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
    userPNR: PNRData | undefined;
    aiAnalysis: AIAnalysis;
    isLoading: boolean;
}

export const AIComparisonModal: React.FC<AIComparisonModalProps> = ({ isOpen, onClose, onProceed, userPNR, aiAnalysis, isLoading }) => {
    const [activeTab, setActiveTab] = useState<'comparison' | 'feedback'>('feedback');

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">
                <div className="bg-white rounded-2xl p-10 flex flex-col items-center max-w-md text-center animate-fade-in">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-[#009BDA] blur-xl opacity-20 rounded-full animate-pulse"></div>
                        <Bot className="w-16 h-16 text-[#009BDA] relative z-10 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Consultando al Comité de Expertos</h3>
                    <p className="text-slate-500 mb-6">
                        Analizando tus inputs bajo la metodología del Program on Negotiation (PON) de Harvard & MIT...
                    </p>
                    <div className="flex flex-col gap-2 w-full text-xs text-slate-400 font-mono">
                        <div className="flex justify-between"><span>Analizando Intereses...</span> <CheckCircle className="w-3 h-3 text-emerald-500" /></div>
                        <div className="flex justify-between"><span>Verificando Legitimidad...</span> <Loader2 className="w-3 h-3 animate-spin" /></div>
                        <div className="flex justify-between"><span>Calculando Valor Creado...</span> <span>Pendiente</span></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-slate-900 text-white p-6 flex justify-between items-center border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#009BDA] p-3 rounded-xl">
                            <BrainCircuit className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Expert Benchmark</h2>
                            <p className="text-slate-400 text-sm">Comparativa de Desempeño vs. Modelo Harvard (PON)</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Score MGA</div>
                            <div className="text-3xl font-black text-[#009BDA]">{aiAnalysis.score}/100</div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-4 gap-2">
                     <button 
                        onClick={() => setActiveTab('feedback')}
                        className={`px-6 py-3 rounded-t-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'feedback' ? 'bg-white text-[#009BDA] shadow-sm border-t border-x border-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <Sparkles className="w-4 h-4" /> Análisis de Expertos
                    </button>
                    <button 
                        onClick={() => setActiveTab('comparison')}
                        className={`px-6 py-3 rounded-t-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'comparison' ? 'bg-white text-[#009BDA] shadow-sm border-t border-x border-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <Scale className="w-4 h-4" /> Comparativa Técnica (PNR)
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1 bg-[#F8FAFC]">
                    {activeTab === 'feedback' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Lightbulb className="w-32 h-32 text-orange-500" />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="bg-orange-100 text-orange-700 p-1.5 rounded-lg"><Lightbulb className="w-4 h-4" /></span>
                                        Perspectiva de William Ury
                                    </h3>
                                    <div className="prose text-slate-600 leading-relaxed italic border-l-4 border-orange-400 pl-4">
                                        "{aiAnalysis.uryAdvice}"
                                    </div>
                                    <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">- Autor de "Obtenga el Sí" y "Supere el No"</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Scale className="w-32 h-32 text-indigo-500" />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg"><Scale className="w-4 h-4" /></span>
                                        Crítica de Lawrence Susskind
                                    </h3>
                                    <div className="prose text-slate-600 leading-relaxed italic border-l-4 border-indigo-500 pl-4">
                                        "{aiAnalysis.susskindCritique}"
                                    </div>
                                    <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">- Fundador del Consensus Building Institute (MIT)</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Resumen del Análisis</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {aiAnalysis.summary}
                                </p>
                                
                                <h4 className="font-bold text-slate-800 mb-3">Oportunidades de Mejora Detectadas:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 bg-red-50 p-3 rounded-lg text-sm text-red-800">
                                        <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <span>Diferenciación insuficiente entre posiciones (demandas) e intereses subyacentes.</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg text-sm text-orange-800">
                                        <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                        <span>El MAAN no parece lo suficientemente sólido como para dar poder en la mesa.</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-emerald-50 p-3 rounded-lg text-sm text-emerald-800">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>Buena identificación de criterios de legitimidad externos.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'comparison' && (
                        <div className="grid grid-cols-2 gap-8 min-w-[800px]">
                            {/* User Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-slate-200 p-2 rounded-full"><User className="w-5 h-5 text-slate-600" /></div>
                                    <h3 className="font-bold text-slate-900 text-lg">Tu Estrategia</h3>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Intereses Identificados</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{userPNR?.theirInterests || "No registrado"}</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Opciones Propuestas</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{userPNR?.options || "No registrado"}</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Criterios de Legitimidad</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{userPNR?.legitimacyCriteria || "No registrado"}</p>
                                </div>
                            </div>

                            {/* Expert Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-[#009BDA] p-2 rounded-full"><Bot className="w-5 h-5 text-white" /></div>
                                    <h3 className="font-bold text-[#009BDA] text-lg">Estrategia Óptima (IA)</h3>
                                </div>

                                <div className="bg-[#E5F5FB] p-5 rounded-xl border border-[#009BDA]/20 shadow-sm">
                                    <div className="text-xs font-bold text-[#009BDA] uppercase mb-2">Intereses Profundos (Expert)</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{aiAnalysis.expertInterests}</p>
                                </div>
                                <div className="bg-[#E5F5FB] p-5 rounded-xl border border-[#009BDA]/20 shadow-sm">
                                    <div className="text-xs font-bold text-[#009BDA] uppercase mb-2">Opciones de Valor (Expert)</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{aiAnalysis.expertOptions}</p>
                                </div>
                                <div className="bg-[#E5F5FB] p-5 rounded-xl border border-[#009BDA]/20 shadow-sm">
                                    <div className="text-xs font-bold text-[#009BDA] uppercase mb-2">Fuentes de Legitimidad (Expert)</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{aiAnalysis.expertLegitimacy}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-white border-t border-slate-200 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">
                        Revisar mi PNR
                    </button>
                    <button 
                        onClick={onProceed}
                        className="bg-[#009BDA] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007CAE] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:scale-105"
                    >
                        Entendido, avanzar al Nivel Siguiente <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
