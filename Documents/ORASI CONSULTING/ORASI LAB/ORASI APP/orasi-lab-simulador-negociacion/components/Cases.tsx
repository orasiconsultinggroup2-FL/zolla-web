
import React, { useState } from 'react';
import { MOCK_USERS } from '../mockData';
import { RiskLevel, Case, User, UserRole, HistoryEvent } from '../types';
import { Filter, Plus, Search, MapPin, AlertCircle, ChevronRight, User as UserIcon, Eye, Lock, Pickaxe, HardHat, Wheat, Zap, Briefcase, ArrowUpRight, Signal, Flame, Target, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CasesProps {
  currentUser: User;
  cases: Case[]; 
  history: HistoryEvent[]; 
}

export const Cases: React.FC<CasesProps> = ({ currentUser, cases, history }) => {
  const [filterText, setFilterText] = useState('');
  const [activeSector, setActiveSector] = useState('Todos');
  const navigate = useNavigate();
  
  const isManager = currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.SUPERVISOR;
  
  // LOGICA ESTRICTA: UN SOLO CASO POR GESTOR
  let displayCases: Case[] = [];

  if (isManager) {
      // Manager ve todo
      displayCases = cases.filter(c => 
          c.title.toLowerCase().includes(filterText.toLowerCase()) ||
          c.territory.toLowerCase().includes(filterText.toLowerCase())
      );
      if (activeSector !== 'Todos') {
          displayCases = displayCases.filter(c => c.sector === activeSector);
      }
  } else {
      // GESTOR: Solo ve SU caso activo.
      const myCases = cases.filter(c => c.ownerId === currentUser.id && c.caseStatus === 'Activa');
      
      // Si tiene más de uno (por error), tomamos el más prioritario según la lógica pedagógica (Crítico -> Medio -> Alto)
      // Aunque la lógica de la App asegurará que solo se cree uno a la vez.
      if (myCases.length > 0) {
          // Ordenamos por fecha de creación descendente para mostrar el último asignado (el nivel actual)
          displayCases = [myCases[0]]; 
      }
  }

  const getOwnerName = (id: string) => MOCK_USERS.find(u => u.id === id)?.name || 'Sin asignar';
  
  const sectors = ['Todos', 'Minería', 'Construcción', 'Agroindustria', 'Energía'];

  const getSectorIcon = (sector: string) => {
      switch(sector) {
          case 'Minería': return Pickaxe;
          case 'Construcción': return HardHat;
          case 'Agroindustria': return Wheat;
          case 'Energía': return Zap;
          default: return Briefcase;
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
              {isManager ? 'Casos y Conflictos Activos' : 'Mi Simulación Activa'}
          </h2>
          <p className="text-slate-500">
            {isManager 
              ? `Supervisión Global (${cases.length} casos totales)` 
              : `Desafío actual: Resuelve este caso para avanzar de nivel.`}
          </p>
        </div>
        {isManager && (
            <button 
                onClick={() => navigate('/cases/new')}
                className="flex items-center gap-2 bg-[#009BDA] text-white px-4 py-2 rounded-lg hover:bg-[#007CAE] transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" />
                Nuevo Caso
            </button>
        )}
      </div>

      {isManager && (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex overflow-x-auto pb-1 gap-2 w-full md:w-auto">
                {sectors.map(sector => (
                    <button
                        key={sector}
                        onClick={() => setActiveSector(sector)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors border ${
                            activeSector === sector 
                            ? 'bg-slate-800 text-white border-slate-800' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {sector !== 'Todos' && React.createElement(getSectorIcon(sector), {className: "w-3 h-3"})}
                        {sector}
                    </button>
                ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009BDA]"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>
      )}

      {!isManager && displayCases.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg mb-4 animate-fade-in">
              <div className={`p-3 rounded-full ${
                  displayCases[0].risk === RiskLevel.CRITICAL ? 'bg-red-600 animate-pulse' : 
                  displayCases[0].risk === RiskLevel.HIGH ? 'bg-orange-500' : 'bg-[#009BDA]'
              }`}>
                  {displayCases[0].risk === RiskLevel.CRITICAL ? <Flame className="w-6 h-6" /> : <Target className="w-6 h-6" />}
              </div>
              <div>
                  <h3 className="font-bold text-lg">
                      {displayCases[0].risk === RiskLevel.CRITICAL ? 'NIVEL 1: GESTIÓN DE CRISIS' : 
                       displayCases[0].risk === RiskLevel.HIGH ? 'NIVEL 2: CONFLICTIVIDAD MEDIA' : 'NIVEL 3: ALTA COMPLEJIDAD'}
                  </h3>
                  <p className="text-slate-300 text-sm">
                      {displayCases[0].risk === RiskLevel.CRITICAL 
                       ? 'Objetivo: Contener la crisis, identificar intereses ocultos y desescalar.' 
                       : 'Objetivo: Construir acuerdos sostenibles y generar valor compartido.'}
                  </p>
              </div>
          </div>
      )}

      <div className="grid gap-4">
        {displayCases.length > 0 ? displayCases.map((c: Case) => (
          <div key={c.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-all relative group
            ${!isManager ? 'border-[#009BDA] shadow-md transform scale-[1.01]' : 'border-slate-100 hover:shadow-md'}
          `}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-xl ${
                c.risk === RiskLevel.CRITICAL ? 'bg-red-600' : 
                c.risk === RiskLevel.HIGH ? 'bg-orange-500' : 'bg-green-500'
              }`} />

              <div className="flex-1 space-y-3 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        c.phase === 'Crisis Abierta' ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {c.phase}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border-slate-200">
                          <Signal className="w-3 h-3" /> {c.risk === RiskLevel.CRITICAL ? 'Prioridad Máxima' : c.complexity}
                      </span>
                    </div>
                    <Link to={`/cases/${c.id}`} className="text-xl font-bold text-slate-900 hover:text-[#009BDA] transition-colors block">
                      {c.title}
                    </Link>
                  </div>
                </div>
                
                <p className="text-slate-600 text-base leading-relaxed">
                  {c.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pt-2">
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3" />
                    {c.territory}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                    {React.createElement(getSectorIcon(c.sector), { className: "w-3 h-3" })}
                    {c.sector}
                  </div>
                  {isManager && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                        <UserIcon className="w-3 h-3" />
                        {getOwnerName(c.ownerId)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center items-end border-l border-slate-100 pl-6 gap-3">
                <Link 
                    to={`/cases/${c.id}`} 
                    className={`flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-lg w-full md:w-auto text-center justify-center transition-all shadow-sm
                        ${c.risk === RiskLevel.CRITICAL 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-[#009BDA] text-white hover:bg-[#007CAE]'}
                    `}
                >
                  {isManager ? 'Supervisar' : 'Entrar a Simulación'}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isManager ? <Lock className="w-8 h-8 text-slate-400" /> : <Trophy className="w-8 h-8 text-yellow-400" />}
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">
                    {isManager ? "No hay casos en el portafolio." : "¡Felicitaciones! Has completado tus simulaciones."}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6">
                    {isManager 
                        ? "Esperando asignación de casos." 
                        : "Has superado todos los niveles disponibles en esta versión demo."}
                </p>
                {!isManager && (
                    <button onClick={() => window.location.reload()} className="text-[#009BDA] font-bold hover:underline">Reiniciar Demo</button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
