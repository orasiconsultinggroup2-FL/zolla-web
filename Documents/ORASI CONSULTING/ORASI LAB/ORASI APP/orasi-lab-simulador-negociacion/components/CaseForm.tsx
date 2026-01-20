import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Case, RiskLevel, CasePhase, User, UserRole } from '../types';
import { MOCK_USERS } from '../mockData';
import { ArrowLeft, Save, Mic, MicOff, User as UserIcon, Lock } from 'lucide-react';

interface CaseFormProps {
    currentUser: User;
    onSave: (newCase: Case) => void;
}

export const CaseForm: React.FC<CaseFormProps> = ({ currentUser, onSave }) => {
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);
    
    // Solo Gerencia/Admin pueden reasignar casos.
    const isManager = currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.ADMIN;

    const [formData, setFormData] = useState<Partial<Case>>({
        title: '',
        territory: '',
        countryRegion: '',
        caseType: '',
        risk: RiskLevel.LOW,
        phase: CasePhase.PREVENTION,
        financialImpact: 0,
        ownerId: currentUser.id, // Auto-asignación por defecto
        description: '',
        sector: '',
        complexity: 'Media'
    });

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Tu navegador no soporta dictado por voz.');
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = false;
        recognition.interimResults = false;

        setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            const newVal = formData.description ? `${formData.description} ${transcript}` : transcript;
            setFormData(prev => ({ ...prev, description: newVal }));
            setIsListening(false);
        };
        
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newCase: Case = {
            ...formData as Case,
            id: `CAS-${Math.floor(Math.random() * 10000)}`,
            startDate: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            caseStatus: 'Activa',
            lastReviewDate: new Date().toISOString().split('T')[0],
            actors: [],
            keyRisks: [],
            objective: 'Definir objetivo...',
            scenarios: '',
            usage: '',
            nextSteps: '',
            improvementOpportunities: ''
        };

        onSave(newCase);
        navigate(`/cases/${newCase.id}`);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button onClick={() => navigate('/cases')} className="flex items-center gap-2 text-slate-500 hover:text-[#009BDA]">
                <ArrowLeft className="w-4 h-4" /> Cancelar y Volver
            </button>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Nuevo Caso</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Título del Caso</label>
                            <input 
                                required 
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA]" 
                                value={formData.title} 
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                placeholder="Ej: Conflicto Comunitario Proyecto X"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Territorio / Localidad</label>
                            <input 
                                required 
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA]" 
                                value={formData.territory} 
                                onChange={e => setFormData({...formData, territory: e.target.value})}
                            />
                        </div>
                        
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">País / Región</label>
                            <input 
                                required 
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA]" 
                                value={formData.countryRegion} 
                                onChange={e => setFormData({...formData, countryRegion: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de Conflicto</label>
                            <input 
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA]" 
                                value={formData.caseType} 
                                onChange={e => setFormData({...formData, caseType: e.target.value})}
                                placeholder="Ej: Ambiental, Laboral..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Sector</label>
                             <input 
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA]" 
                                value={formData.sector} 
                                onChange={e => setFormData({...formData, sector: e.target.value})}
                                placeholder="Ej: Minería, Energía..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nivel de Riesgo</label>
                            <select 
                                className="w-full p-3 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#009BDA]"
                                value={formData.risk}
                                onChange={e => setFormData({...formData, risk: e.target.value as RiskLevel})}
                            >
                                {Object.values(RiskLevel).map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Fase Actual</label>
                            <select 
                                className="w-full p-3 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#009BDA]"
                                value={formData.phase}
                                onChange={e => setFormData({...formData, phase: e.target.value as CasePhase})}
                            >
                                {Object.values(CasePhase).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Impacto Financiero Estimado (USD)</label>
                            <input 
                                type="number"
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA]" 
                                value={formData.financialImpact} 
                                onChange={e => setFormData({...formData, financialImpact: Number(e.target.value)})}
                            />
                        </div>

                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Responsable (Dueño del Caso)</label>
                            {isManager ? (
                                <select 
                                    className="w-full p-3 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#009BDA]"
                                    value={formData.ownerId}
                                    onChange={e => setFormData({...formData, ownerId: e.target.value})}
                                >
                                    {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                                </select>
                            ) : (
                                <div className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4 text-[#009BDA]" />
                                        <span className="font-medium">{currentUser.name}</span>
                                        <span className="text-xs text-slate-400">(Auto-asignado)</span>
                                    </div>
                                    <Lock className="w-4 h-4 text-slate-400" />
                                </div>
                            )}
                            {!isManager && (
                                <p className="text-xs text-slate-400 mt-1">
                                    Como Gestor, el caso se vincula automáticamente a su perfil para asegurar la trazabilidad.
                                </p>
                            )}
                        </div>
                        
                        <div className="col-span-2 relative">
                             <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700">Descripción Inicial</label>
                                <button 
                                    type="button"
                                    onClick={handleVoiceInput}
                                    className={`text-xs flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                                        isListening 
                                        ? 'bg-red-100 text-red-600 animate-pulse' 
                                        : 'bg-slate-100 text-slate-500 hover:bg-[#E5F5FB] hover:text-[#009BDA]'
                                    }`}
                                >
                                    {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                                    {isListening ? 'Escuchando...' : 'Dictar'}
                                </button>
                             </div>
                             <textarea 
                                className={`w-full p-3 border border-slate-200 rounded-lg transition-all ${
                                    isListening ? 'ring-2 ring-red-400 border-red-400' : 'focus:ring-2 focus:ring-[#009BDA]'
                                }`} 
                                rows={4}
                                value={formData.description} 
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <button type="submit" className="bg-[#009BDA] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007CAE] flex items-center gap-2">
                            <Save className="w-5 h-5" /> Crear Caso
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};