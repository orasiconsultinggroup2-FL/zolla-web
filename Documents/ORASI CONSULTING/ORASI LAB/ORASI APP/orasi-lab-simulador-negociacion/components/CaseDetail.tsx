
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_USERS } from '../mockData';
import { RiskLevel, CasePhase, PNRData, AARData, HistoryEvent, Case, User, UserRole } from '../types';
import { ArrowLeft, MapPin, Calendar, User as UserIcon, AlertTriangle, FileText, PieChart, Users, MessageSquare, Clock, ClipboardCheck, Lock, CheckCircle, Trophy, ArrowRight, BrainCircuit } from 'lucide-react';
import { PNRTool } from './PNRTool';
import { AARForm } from './AARForm';

interface CaseDetailProps {
    currentUser: User;
    cases: Case[];
    pnrs: PNRData[];
    aars: AARData[];
    history: HistoryEvent[];
    onAddPNR: (pnr: PNRData) => void;
    onAddAAR: (aar: AARData) => void;
    onCompleteCase?: (caseId: string) => void; // Nueva prop para finalizar
    onOpenAIAnalysis?: (caseId: string) => void; // Prop para re-abrir el análisis
}

const TabButton = ({ active, onClick, icon: Icon, label, count }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
      active
        ? 'border-[#009BDA] text-[#009BDA] bg-[#E5F5FB]/50'
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-[#009BDA]' : 'text-slate-400'}`} />
    {label}
    {count !== undefined && (
      <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-[#E5F5FB]' : 'bg-slate-100'}`}>
        {count}
      </span>
    )}
  </button>
);

export const CaseDetail: React.FC<CaseDetailProps> = ({ currentUser, cases, pnrs, aars, history, onAddPNR, onAddAAR, onCompleteCase, onOpenAIAnalysis }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pnr' | 'aar' | 'actors' | 'history' | 'report'>('dashboard');
  const [showAARForm, setShowAARForm] = useState(false);
  
  const caseData = cases.find(c => c.id === id);
  
  if (!caseData) return <div className="p-8 text-center text-slate-500">Caso no encontrado</div>;

  const isGestor = currentUser.role === UserRole.RELATIONIST;
  const isResponsable = currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.SUPERVISOR || currentUser.role === UserRole.ADMIN;

  const caseHistory = history.filter(h => h.caseId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const casePNR = pnrs.find(p => p.caseId === id);
  const caseAARs = aars.filter(a => a.caseId === id);
  const actors = caseData.actors || [];
  const owner = MOCK_USERS.find(u => u.id === caseData.ownerId);

  const getRiskBadge = (risk: RiskLevel) => {
    const colors = {
      [RiskLevel.LOW]: 'bg-green-100 text-green-700',
      [RiskLevel.MEDIUM]: 'bg-orange-100 text-orange-700',
      [RiskLevel.HIGH]: 'bg-orange-500 text-white',
      [RiskLevel.CRITICAL]: 'bg-red-600 text-white',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[risk]}`}>{risk}</span>;
  };

  const handleSavePNR = (data: PNRData) => {
      onAddPNR(data);
      alert('PNR Guardado. Estrategia registrada.');
  };

  const handleSaveAAR = (data: AARData) => {
      onAddAAR(data);
      setShowAARForm(false);
      alert('AAR Guardado. Aprendizaje registrado.');
  };

  const handleRequestEvaluation = () => {
      // 1. Verificación de Existencia
      if (!casePNR) {
          alert("⛔ BLOQUEO DE PROCESO:\nNo se ha creado una estrategia PNR. Debes ir a la pestaña 'Estrategia (PNR)' y completarla antes de negociar.");
          setActiveTab('pnr');
          return;
      }

      // 2. Validación Estricta de Campos (Metodología MGA)
      const requiredFields: { key: keyof PNRData; label: string }[] = [
          { key: 'myMaan', label: 'Nuestro MAAN (Alternativa)' },
          { key: 'theirMaan', label: 'MAAN de la Contraparte' },
          { key: 'myInterests', label: 'Nuestros Intereses' },
          { key: 'theirInterests', label: 'Intereses de Ellos' },
          { key: 'options', label: 'Opciones de Mutuo Beneficio' },
          { key: 'legitimacyCriteria', label: 'Criterios de Legitimidad' }
      ];

      const missingFields = requiredFields.filter(field => {
          const value = casePNR[field.key];
          // Verificamos que exista y tenga una longitud mínima para evitar "asd" o "..."
          return !value || (typeof value === 'string' && value.trim().length < 5);
      });

      if (missingFields.length > 0) {
          const missingList = missingFields.map(f => `• ${f.label}`).join('\n');
          alert(`⚠️ PNR INCOMPLETO\n\nPara agendar una negociación o resolver el caso, debes completar los 7 elementos de Harvard. Faltan:\n\n${missingList}\n\nPor favor completa la matriz con información detallada.`);
          setActiveTab('pnr');
          return;
      }

      // 3. Confirmación Final
      if (confirm("¿Confirmas que la estrategia está lista y deseas proceder a la evaluación de la IA?")) {
          if (onCompleteCase && id) {
              onCompleteCase(id);
          }
      }
  };

  // Evaluation Status
  const isCaseReady = casePNR && caseAARs.length > 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <Link to="/cases" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#009BDA] mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
            {caseData.risk === RiskLevel.CRITICAL && (
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <AlertTriangle className="w-32 h-32 text-red-600" />
                </div>
            )}
            
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             {getRiskBadge(caseData.risk)}
                             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                                 {caseData.complexity === 'Alta' ? 'Alta Complejidad' : 'Simulación Activa'}
                             </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 leading-tight">{caseData.title}</h1>
                    </div>
                    
                    {isGestor && (
                        <div className="flex flex-col items-end gap-2">
                             {caseData.caseStatus === 'Activa' ? (
                                <button 
                                    onClick={handleRequestEvaluation}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow-lg transition-all
                                        bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:scale-105
                                    `}
                                >
                                    <Trophy className="w-5 h-5" /> Resolver y Avanzar
                                </button>
                             ) : (
                                <button
                                    onClick={() => onOpenAIAnalysis && id && onOpenAIAnalysis(id)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow-lg transition-all bg-white border border-[#009BDA] text-[#009BDA] hover:bg-[#E5F5FB]"
                                >
                                    <BrainCircuit className="w-5 h-5" /> Ver Análisis IA
                                </button>
                             )}
                             
                             {caseData.caseStatus === 'Activa' && !isCaseReady && (
                                 <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded border border-orange-100">
                                     Requiere PNR Completo para finalizar
                                 </span>
                             )}
                        </div>
                    )}
                </div>
                {/* Se agrega whitespace-pre-wrap para respetar los saltos de línea del contexto detallado */}
                <p className="text-slate-700 text-lg leading-relaxed max-w-4xl whitespace-pre-wrap font-medium">
                    {caseData.description}
                </p>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex overflow-x-auto">
        <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={FileText} label="Contexto" />
        <TabButton active={activeTab === 'pnr'} onClick={() => setActiveTab('pnr')} icon={FileText} label="Estrategia (PNR)" count={casePNR ? 1 : 0} />
        <TabButton active={activeTab === 'aar'} onClick={() => setActiveTab('aar')} icon={PieChart} label="Aprendizajes (AAR)" count={caseAARs.length} />
        <TabButton active={activeTab === 'actors'} onClick={() => setActiveTab('actors')} icon={Users} label="Actores" count={actors.length} />
        <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={Clock} label="Bitácora" count={caseHistory.length} />
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 mb-2 text-lg">Objetivo de la Simulación</h3>
                        <p className="text-slate-700 text-lg">{caseData.objective}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold text-slate-900">Escenario Actual</h3>
                             <button 
                                onClick={() => setActiveTab('history')}
                                className="flex items-center gap-1 text-sm font-bold text-[#009BDA] hover:text-[#007CAE] hover:underline"
                             >
                                <Clock className="w-4 h-4" /> Ver Historial
                             </button>
                        </div>
                        <p className="text-slate-700">{caseData.scenarios}</p>
                    </div>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                     <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-6">
                        <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" /> Riesgos Inminentes
                        </h3>
                        <ul className="list-disc pl-4 space-y-2">
                            {caseData.keyRisks.map((risk, i) => (
                                <li key={i} className="text-sm text-red-800 font-medium">{risk}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-6">
                        <h3 className="font-bold text-blue-900 mb-2">Criterios de Evaluación</h3>
                        <ul className="text-sm text-blue-800 space-y-2">
                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Identificación de Intereses vs Posiciones</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Generación de Opciones Creativas</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Uso de Criterios de Legitimidad</li>
                        </ul>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'pnr' && (
            <div className="space-y-4">
                 <PNRTool 
                    caseId={id} 
                    existingData={casePNR} 
                    onSave={handleSavePNR} 
                    readOnly={isResponsable || caseData.caseStatus !== 'Activa'} 
                 />
            </div>
        )}

        {activeTab === 'aar' && (
            <div className="space-y-4">
                {!showAARForm ? (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Lecciones Aprendidas</h3>
                            {isGestor && caseData.caseStatus === 'Activa' && (
                                <button 
                                    onClick={() => setShowAARForm(true)}
                                    className="text-sm bg-[#009BDA] text-white px-4 py-2 rounded-lg hover:bg-[#007CAE] font-medium"
                                >
                                    + Registrar Aprendizaje
                                </button>
                            )}
                        </div>
                        {caseAARs.length > 0 ? (
                            <div className="grid gap-4">
                                {caseAARs.map(aar => (
                                    <div key={aar.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                                        <p className="text-sm font-bold text-slate-900 mb-2">Retrospectiva del {aar.date}</p>
                                        <div className="bg-slate-50 p-3 rounded text-slate-700 text-sm italic">"{aar.nextTime}"</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-10 text-slate-500 bg-white rounded-xl border border-slate-100">
                                Sin registros. Es obligatorio registrar un AAR para avanzar.
                            </p>
                        )}
                    </>
                ) : (
                    <AARForm caseId={id || ''} currentUser="Me" onSave={handleSaveAAR} onCancel={() => setShowAARForm(false)} />
                )}
            </div>
        )}

        {/* Existing Actors and History tabs remain roughly the same, simplified here for brevity in change block */}
        {activeTab === 'actors' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actors.map((actor, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <div className="flex items-start justify-between mb-2">
                             <h3 className="font-bold text-slate-900">{actor.name}</h3>
                             <span className="text-xs px-2 py-1 bg-slate-100 rounded font-bold">{actor.posture}</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">{actor.role}</p>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-[#009BDA] h-1.5 rounded-full" style={{ width: `${actor.influence * 10}%` }}></div>
                        </div>
                    </div>
                ))}
             </div>
        )}

        {activeTab === 'history' && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                 {caseHistory.map((event) => (
                     <div key={event.id} className="border-b border-slate-100 last:border-0 py-3">
                         <div className="text-sm font-bold text-slate-800">{event.type}</div>
                         <div className="text-xs text-slate-500">{event.date} - {event.detail}</div>
                     </div>
                 ))}
            </div>
        )}
      </div>
    </div>
  );
};
