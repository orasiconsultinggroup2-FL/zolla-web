
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_LIBRARY_CASES } from '../mockData';
import { ArrowLeft, BookOpen, MapPin, Tag, ShieldAlert, Play } from 'lucide-react';
import { RiskLevel, LibraryCase } from '../types';

interface LibraryDetailProps {
    onStartSimulation: (libCase: LibraryCase) => void;
}

export const LibraryDetail: React.FC<LibraryDetailProps> = ({ onStartSimulation }) => {
    const { id } = useParams();
    const libCase = MOCK_LIBRARY_CASES.find(c => c.id === id);

    if (!libCase) return <div className="p-10 text-center">Caso de estudio no encontrado</div>;

     const getRiskColor = (risk: RiskLevel) => {
        switch (risk) {
            case RiskLevel.CRITICAL: return 'bg-red-100 text-red-700';
            case RiskLevel.HIGH: return 'bg-orange-100 text-orange-700';
            case RiskLevel.MEDIUM: return 'bg-yellow-100 text-yellow-700';
            case RiskLevel.LOW: return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
             <Link to="/library" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#009BDA]">
                <ArrowLeft className="w-4 h-4" /> Volver a la Biblioteca
            </Link>

            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 h-32 flex items-end p-8">
                     <div className="text-white w-full flex justify-between items-end">
                        <div>
                            <div className="flex items-center gap-2 text-[#009BDA] text-sm font-bold uppercase tracking-wider mb-2">
                                <BookOpen className="w-4 h-4" /> Caso de Estudio
                            </div>
                            <h1 className="text-3xl font-bold">{libCase.title}</h1>
                        </div>
                        <button 
                            onClick={() => onStartSimulation(libCase)}
                            className="bg-[#009BDA] hover:bg-[#007CAE] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-transform transform hover:scale-105"
                        >
                            <Play className="w-5 h-5" /> Iniciar Simulación
                        </button>
                     </div>
                </div>
                
                <div className="p-8">
                    <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-100 pb-8">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                             <MapPin className="w-4 h-4 text-[#7F7F7E]" />
                             <span className="font-semibold">Región:</span> {libCase.countryRegion}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                             <Tag className="w-4 h-4 text-[#7F7F7E]" />
                             <span className="font-semibold">Sector:</span> {libCase.sector}
                        </div>
                         <div className="flex items-center gap-2 text-sm text-slate-600">
                             <ShieldAlert className="w-4 h-4 text-[#7F7F7E]" />
                             <span className="font-semibold">Tipo:</span> {libCase.conflictType}
                        </div>
                         <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${getRiskColor(libCase.risk)}`}>
                             Riesgo {libCase.risk}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                             Dificultad: {libCase.difficulty}
                        </span>
                    </div>

                    <div className="prose max-w-none text-slate-700">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Resumen Ejecutivo</h3>
                        <p className="text-lg leading-relaxed mb-8">{libCase.summary}</p>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Lecciones Clave y Análisis</h3>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-line">
                            {libCase.lessons ? (
                                <p>{libCase.lessons}</p>
                            ) : (
                                <p className="italic text-slate-500">Este caso aún no tiene lecciones detalladas cargadas en la plataforma.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
