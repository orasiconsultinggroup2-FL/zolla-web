
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Cases } from './components/Cases';
import { CaseDetail } from './components/CaseDetail';
import { CaseForm } from './components/CaseForm';
import { PNRTool } from './components/PNRTool';
import { ActorsMap } from './components/ActorsMap';
import { ActorDetail } from './components/ActorDetail';
import { AARList } from './components/AARList';
import { Settings } from './components/Settings';
import { Library } from './components/Library';
import { LibraryDetail } from './components/LibraryDetail';
import { AlertsView } from './components/AlertsView';
import { OwnerView } from './components/OwnerView';
import { OrasiAcademy } from './components/OrasiAcademy'; 
import { LoginScreen } from './components/LoginScreen';
import { AIComparisonModal } from './components/AIComparisonModal';
import { MOCK_USERS, MOCK_CASES, MOCK_PNRS, MOCK_AARS, LEVEL_CASES_DATA, getMockAIAnalysis } from './mockData';
import { User, Case, PNRData, AARData, HistoryEvent, LibraryCase, CasePhase, RiskLevel, AIAnalysis } from './types';

const AppContent: React.FC<{
    currentUser: User | null, 
    onLogin: (u: User) => void, 
    onLogout: () => void 
}> = ({ currentUser, onLogin, onLogout }) => {
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [pnrs, setPnrs] = useState<PNRData[]>(MOCK_PNRS);
  const [aars, setAars] = useState<AARData[]>(MOCK_AARS);
  const navigate = useNavigate();
  
  const initialHistory: HistoryEvent[] = MOCK_CASES.flatMap(c => (c.history || []).map(h => ({...h, caseId: c.id})));
  const [history, setHistory] = useState<HistoryEvent[]>(initialHistory);

  // AI Modal States
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [currentAIAnalysis, setCurrentAIAnalysis] = useState<AIAnalysis>({} as AIAnalysis);
  const [completedCaseId, setCompletedCaseId] = useState<string | null>(null);

  // --- ACTIONS ---

  const handleAddCase = (newCase: Case) => {
      if (!currentUser) return;
      setCases([newCase, ...cases]);
      const event: HistoryEvent = {
          id: `H-${Date.now()}`,
          caseId: newCase.id,
          date: new Date().toISOString().split('T')[0],
          userId: currentUser.id,
          type: 'Creación caso',
          detail: 'Caso creado exitosamente.'
      };
      setHistory([event, ...history]);
  };

  const handleStartSimulation = (libCase: LibraryCase) => {
      if (!currentUser) return;
      alert("En el modo estricto, el siguiente caso se asigna automáticamente al completar el nivel actual.");
  };

  // LOGICA PRINCIPAL DE PROGRESIÓN DE NIVELES
  const handleCompleteCase = (caseId: string) => {
      if (!currentUser) return;
      
      // 1. Iniciar Flujo de IA
      const currentCase = cases.find(c => c.id === caseId);
      if (!currentCase) return;

      setIsAIModalOpen(true);
      setIsAILoading(true);

      // Simular latencia de IA (3 segundos)
      setTimeout(() => {
          const analysis = getMockAIAnalysis(currentCase.risk, currentCase.title);
          analysis.caseId = caseId;
          
          setCurrentAIAnalysis(analysis);
          setIsAILoading(false);
          setCompletedCaseId(caseId);

          // Guardar análisis en el caso
          setCases(prev => prev.map(c => c.id === caseId ? { ...c, aiAnalysis: analysis } : c));
      }, 3000);
  };

  const handleProceedToNextLevel = () => {
      if (!currentUser || !completedCaseId) return;

      const currentCase = cases.find(c => c.id === completedCaseId);
      if (!currentCase) {
          setIsAIModalOpen(false);
          return;
      }

      // 1. Cerrar Caso Actual
      const updatedCases = cases.map(c => c.id === completedCaseId ? { ...c, caseStatus: 'Cerrado - Aprobado' } : c);
      
      // 2. Determinar Siguiente Nivel (Critical -> Medium -> High)
      let nextData = null;
      let nextRisk = RiskLevel.MEDIUM;
      let nextPhase = CasePhase.NEGOTIATION;
      let nextComplexity: 'Baja' | 'Media' | 'Alta' = 'Media';

      if (currentCase.risk === RiskLevel.CRITICAL) {
          // Nivel 1 Completado -> Pasar a Nivel 2
          nextData = LEVEL_CASES_DATA.LEVEL_2;
          nextRisk = RiskLevel.HIGH;
          nextComplexity = 'Media';
          nextPhase = CasePhase.TENSION;
      } else if (currentCase.risk === RiskLevel.HIGH) {
          // Nivel 2 Completado -> Pasar a Nivel 3
          nextData = LEVEL_CASES_DATA.LEVEL_3;
          nextRisk = RiskLevel.MEDIUM;
          nextComplexity = 'Alta';
          nextPhase = CasePhase.PREVENTION;
      } else {
          setIsAIModalOpen(false);
          setCases(updatedCases);
          navigate('/cases');
          alert("¡Has completado toda la ruta de aprendizaje!");
          return;
      }

      // 3. Crear Nuevo Caso Automáticamente
      const newCase: Case = {
          id: `SIM-LVL-${Date.now()}`,
          title: nextData.title,
          description: nextData.description,
          territory: 'Simulación Avanzada',
          countryRegion: 'Latam',
          phase: nextPhase,
          risk: nextRisk,
          startDate: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          financialImpact: 0,
          ownerId: currentUser.id,
          sector: 'Minería',
          caseType: 'Socio-Ambiental',
          complexity: nextComplexity,
          objective: 'Aplicar metodología MGA para transformar las posiciones en intereses y lograr acuerdos.',
          keyRisks: nextData.keyRisks,
          scenarios: nextData.scenarios,
          usage: 'Simulación',
          nextSteps: 'Iniciar PNR inmediatamente.',
          improvementOpportunities: '',
          caseStatus: 'Activa',
          lastReviewDate: new Date().toISOString().split('T')[0],
          actors: nextData.actors.map(a => ({...a, caseId: `SIM-LVL-${Date.now()}`})),
          history: []
      };

      setCases([newCase, ...updatedCases]);
      
      const event: HistoryEvent = {
          id: `H-${Date.now()}`,
          caseId: completedCaseId,
          date: new Date().toISOString().split('T')[0],
          userId: currentUser.id,
          type: 'Nivel Completado',
          detail: 'Caso resuelto. Análisis de IA completado.'
      };
      setHistory([event, ...history]);

      setIsAIModalOpen(false);
      navigate('/cases');
  };

  const handleOpenAnalysis = (caseId: string) => {
     const c = cases.find(c => c.id === caseId);
     if (c && c.aiAnalysis) {
         setCurrentAIAnalysis(c.aiAnalysis);
         setCompletedCaseId(null); // Modo lectura, no permite avanzar nivel
         setIsAIModalOpen(true);
     } else {
         alert("Este caso no tiene un análisis generado aún.");
     }
  };

  const handleAddPNR = (pnr: PNRData) => {
      if (!currentUser) return;
      const others = pnrs.filter(p => p.caseId !== pnr.caseId);
      setPnrs([pnr, ...others]);
  };

  const handleAddAAR = (aar: AARData) => {
      if (!currentUser) return;
      setAars([aar, ...aars]);
  };

  if (!currentUser) {
      return <LoginScreen onLogin={onLogin} />;
  }

  return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar currentUser={currentUser} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alerts" element={<AlertsView />} />
                
                <Route path="/cases" element={<Cases currentUser={currentUser} cases={cases} history={history} />} />
                <Route path="/cases/new" element={<CaseForm currentUser={currentUser} onSave={handleAddCase} />} />
                <Route path="/cases/:id" element={
                    <CaseDetail 
                        currentUser={currentUser}
                        cases={cases} 
                        pnrs={pnrs} 
                        aars={aars} 
                        history={history}
                        onAddPNR={handleAddPNR}
                        onAddAAR={handleAddAAR}
                        onCompleteCase={handleCompleteCase}
                        onOpenAIAnalysis={handleOpenAnalysis}
                    />
                } />
                
                <Route path="/owner-view" element={<OwnerView currentUser={currentUser} cases={cases} pnrs={pnrs} aars={aars} />} />
                
                <Route path="/academy" element={<OrasiAcademy />} />
                <Route path="/actors" element={<ActorsMap />} />
                <Route path="/actors/:id" element={<ActorDetail />} />
                
                <Route path="/aar" element={<AARList />} />
                
                <Route path="/library" element={<Library onStartSimulation={handleStartSimulation} />} />
                <Route path="/library/:id" element={<LibraryDetail onStartSimulation={handleStartSimulation} />} />
                
                <Route path="/settings" element={<Settings currentUser={currentUser} onUserChange={onLogin} />} />
            </Routes>
        </main>

        <AIComparisonModal 
            isOpen={isAIModalOpen} 
            onClose={() => setIsAIModalOpen(false)}
            onProceed={handleProceedToNextLevel}
            userPNR={pnrs.find(p => p.caseId === completedCaseId)}
            aiAnalysis={currentAIAnalysis}
            isLoading={isAILoading}
        />
      </div>
  );
};

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <Router>
            <AppContent 
                currentUser={currentUser} 
                onLogin={setCurrentUser} 
                onLogout={() => setCurrentUser(null)} 
            />
        </Router>
    );
}

export default App;
