
import React, { useState } from 'react';
import { MOCK_LIBRARY_CASES } from '../mockData';
import { BookOpen, MapPin, Tag, Filter, HardHat, Pickaxe, Wheat, Zap, Briefcase, GraduationCap, Play } from 'lucide-react';
import { RiskLevel, LibraryCase } from '../types';
import { Link } from 'react-router-dom';

interface LibraryProps {
    onStartSimulation: (libCase: LibraryCase) => void;
}

export const Library: React.FC<LibraryProps> = ({ onStartSimulation }) => {
  const [activeSector, setActiveSector] = useState('Todos');

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
        case RiskLevel.CRITICAL: return 'bg-red-100 text-red-700 border-red-200';
        case RiskLevel.HIGH: return 'bg-orange-100 text-orange-700 border-orange-200';
        case RiskLevel.MEDIUM: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case RiskLevel.LOW: return 'bg-green-100 text-green-700 border-green-200';
        default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getSectorIcon = (sector: string) => {
      switch(sector) {
          case 'Minería': return Pickaxe;
          case 'Construcción': return HardHat;
          case 'Agroindustria': return Wheat;
          case 'Energía': return Zap;
          default: return Briefcase;
      }
  };

  const filteredCases = activeSector === 'Todos' 
    ? MOCK_LIBRARY_CASES 
    : MOCK_LIBRARY_CASES.filter(c => c.sector === activeSector);

  const sectors = ['Todos', 'Minería', 'Construcción', 'Agroindustria', 'Energía'];

  const getSectorCount = (sector: string) => {
      if (sector === 'Todos') return MOCK_LIBRARY_CASES.length;
      return MOCK_LIBRARY_CASES.filter(c => c.sector === sector).length;
  };

  return (
    <div className="space-y-6">
        {/* Branding Header */}
        <div className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col items-start gap-4 shadow-sm relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-5">
                <GraduationCap className="w-64 h-64 text-[#009BDA]" />
             </div>
             <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900">Biblioteca de Simulación</h2>
                <p className="text-slate-500 text-lg mt-1">
                    Repositorio centralizado de escenarios prácticos. 
                    <span className="font-semibold text-[#009BDA]"> {MOCK_LIBRARY_CASES.length} casos disponibles</span> para entrenamiento.
                </p>
            </div>
        </div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap gap-2">
            {sectors.map(sector => {
                const Icon = getSectorIcon(sector);
                const count = getSectorCount(sector);
                const isActive = activeSector === sector;

                return (
                    <button
                        key={sector}
                        onClick={() => setActiveSector(sector)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all ${
                            isActive 
                            ? 'bg-[#009BDA] text-white shadow-md transform scale-105' 
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                    >
                        {sector !== 'Todos' && <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                        <span>{sector}</span>
                        <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>

        {/* Grid de Casos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredCases.map(libCase => (
                <div key={libCase.id} className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col relative overflow-hidden group h-full">
                    {/* Sector Watermark */}
                    <div className="absolute -top-6 -right-6 p-3 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        {React.createElement(getSectorIcon(libCase.sector), { className: "w-32 h-32 text-slate-900" })}
                    </div>
                    
                    <div className="p-6 flex-1 relative z-10 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${getRiskColor(libCase.risk)}`}>
                                {libCase.risk}
                            </span>
                             <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                                Dif: {libCase.difficulty}
                            </span>
                        </div>
                        
                        <h3 className="font-bold text-slate-900 mb-2 leading-tight text-lg group-hover:text-[#009BDA] transition-colors">
                            {libCase.title}
                        </h3>
                        
                        <p className="text-sm text-slate-500 mb-6 line-clamp-3 flex-1">
                            {libCase.summary}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-auto">
                             <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                <MapPin className="w-3 h-3 text-[#009BDA]" /> {libCase.countryRegion}
                             </div>
                             <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                <Tag className="w-3 h-3 text-[#009BDA]" /> {libCase.sector}
                             </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center relative z-10 gap-2">
                         <Link 
                            to={`/library/${libCase.id}`}
                            className="text-slate-500 text-xs font-medium hover:text-slate-800 hover:underline"
                         >
                            Ver Detalles
                         </Link>
                         <button 
                            onClick={() => onStartSimulation(libCase)}
                            className="text-white bg-[#009BDA] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#007CAE] flex items-center gap-2 shadow-sm transition-all"
                        >
                            <Play className="w-3 h-3" /> Iniciar
                         </button>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredCases.length === 0 && (
            <div className="text-center py-20 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
                <Filter className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No se encontraron casos</h3>
                <p>Intente seleccionar otro sector o limpiar los filtros.</p>
            </div>
        )}
    </div>
  );
};
