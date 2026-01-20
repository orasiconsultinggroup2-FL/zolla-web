
import React, { useState } from 'react';
import { PNRData } from '../types';
import { Save, ChevronRight, ChevronLeft, Lock, Mic, MicOff, AlertCircle, Target, ShieldAlert, Users } from 'lucide-react';

interface PNRToolProps {
  caseId?: string;
  existingData?: PNRData;
  onSave?: (data: PNRData) => void;
  readOnly?: boolean;
}

const STEPS = [
    { id: 1, title: 'Partes' },
    { id: 2, title: 'MAAN y Límites' },
    { id: 3, title: 'Intereses' },
    { id: 4, title: 'Opciones' },
    { id: 5, title: 'Legitimidad' },
    { id: 6, title: 'Comunicación' },
    { id: 7, title: 'Relación' },
    { id: 8, title: 'Acuerdo' },
];

export const PNRTool: React.FC<PNRToolProps> = ({ caseId, existingData, onSave, readOnly = false }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isListening, setIsListening] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PNRData>>(existingData || {
    parties: [],
    myAlternatives: '',
    myMaan: '',
    myReservationPoint: '',
    theirAlternatives: '',
    theirMaan: '',
    theirReservationPoint: '',
    myInterests: '',
    theirInterests: '',
    options: '',
    legitimacyCriteria: '',
    legitimacyFairness: '',
    communicationQuestions: '',
    communicationMessage: '',
    relationshipCurrent: '',
    relationshipDesired: '',
    relationshipActions: '',
    agreementTopics: '',
    agreementCommitment: ''
  });

  const handleVoiceInput = (field: keyof PNRData, currentVal: string | string[]) => {
      if (!('webkitSpeechRecognition' in window)) {
          alert('Tu navegador no soporta dictado por voz.');
          return;
      }
      if (isListening === field) {
          setIsListening(null);
          return;
      }
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (field === 'parties') {
               const currentArray = Array.isArray(currentVal) ? currentVal : [];
               setFormData(prev => ({ ...prev, parties: [...currentArray, transcript] }));
          } else {
               const newVal = currentVal ? `${currentVal} ${transcript}` : transcript;
               setFormData(prev => ({ ...prev, [field]: newVal }));
          }
          setIsListening(null);
      };
      recognition.onerror = () => setIsListening(null);
      recognition.onend = () => setIsListening(null);
      setIsListening(field as string);
      recognition.start();
  };

  const renderTextAreaField = (label: string, field: keyof PNRData, placeholder?: string, rows: number = 3, helpText?: string) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</label>
            {!readOnly && (
                <button 
                    onClick={() => handleVoiceInput(field, formData[field] as string || '')}
                    className={`text-[10px] flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                        isListening === field ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-500 hover:text-[#009BDA]'
                    }`}
                >
                    {isListening === field ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    {isListening === field ? '...' : 'Voz'}
                </button>
            )}
        </div>
        <textarea
            className={`w-full p-3 border border-slate-200 rounded-lg text-sm transition-all ${
                readOnly ? 'bg-slate-50 text-slate-600 cursor-not-allowed' : 'focus:ring-2 focus:ring-[#009BDA]'
            }`}
            rows={rows}
            placeholder={placeholder}
            value={formData[field] as string || ''}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            disabled={readOnly}
        />
        {helpText && <p className="mt-1 text-[10px] text-slate-400 italic">{helpText}</p>}
    </div>
  );

  const handleSave = () => {
      if (onSave && !readOnly) {
          onSave({
              ...formData,
              caseId: caseId || 'unknown',
              id: existingData?.id || `PNR-${Date.now()}`,
              updatedAt: new Date().toISOString().split('T')[0],
              completed: true
          } as PNRData);
      }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Nav Pasos */}
        <div className="bg-slate-50 border-b border-slate-200 overflow-x-auto">
            <div className="flex min-w-max">
                {STEPS.map((step) => (
                    <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeStep === step.id ? 'border-[#009BDA] text-[#009BDA] bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        {step.id}. {step.title}
                    </button>
                ))}
            </div>
        </div>

        {readOnly && (
            <div className="bg-orange-50 px-6 py-2 border-b border-orange-100 flex items-center gap-2 text-xs text-orange-700 font-medium">
                <Lock className="w-3 h-3" /> Modo Lectura: Revisión de Estrategia
            </div>
        )}

        <div className="p-8 min-h-[450px]">
            {activeStep === 1 && (
                <div className="max-w-2xl animate-fade-in">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">1. Definición de Partes</h3>
                    <p className="text-sm text-slate-500 mb-6">Identifique a los tomadores de decisión y actores con poder de veto en esta mesa específica.</p>
                    <textarea
                        className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#009BDA]"
                        rows={8}
                        value={(formData.parties as string[])?.join('\n') || ''}
                        onChange={(e) => setFormData({ ...formData, parties: e.target.value.split('\n') })}
                        placeholder="Ej: Gerencia de Sostenibilidad&#10;Presidente de Comunidad Campesina&#10;Prefecto Regional"
                        disabled={readOnly}
                    />
                </div>
            )}

            {activeStep === 2 && (
                <div className="animate-fade-in">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                        <ShieldAlert className="w-6 h-6 text-[#009BDA]" />
                        <h3 className="font-bold text-slate-800 text-lg">Poder de Negociación: MAAN y Límites</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Columna Nosotros */}
                        <div className="space-y-6">
                            <div className="bg-[#E5F5FB] p-4 rounded-xl border border-[#009BDA]/20">
                                <h4 className="font-bold text-[#009BDA] mb-4 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Nuestra Posición de Poder
                                </h4>
                                {renderTextAreaField("Alternativas (Lista)", "myAlternatives", "1. Buscar otro proveedor\n2. Escalar a vía judicial...", 2, "Cualquier cosa que puedas hacer por tu cuenta.")}
                                {renderTextAreaField("NUESTRO MAAN", "myMaan", "La mejor de tus alternativas. Si no hay acuerdo, haré esto.", 2, "Mejor Alternativa al Acuerdo Negociado.")}
                                {renderTextAreaField("PUNTO DE RESERVA", "myReservationPoint", "Lo mínimo que estamos dispuestos a aceptar antes de pararnos de la mesa.", 2)}
                            </div>
                        </div>

                        {/* Columna Ellos */}
                        <div className="space-y-6">
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                                <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                                    <Users className="w-4 h-4" /> Su Posición de Poder (Estimada)
                                </h4>
                                {renderTextAreaField("Sus Alternativas", "theirAlternatives", "1. Bloqueo de vía\n2. Denuncia ante prensa...", 2)}
                                {renderTextAreaField("SU MAAN", "theirMaan", "Lo que ellos harán si no acuerdan con nosotros.", 2)}
                                {renderTextAreaField("SU PUNTO DE RESERVA", "theirReservationPoint", "El límite donde ellos preferirán su MAAN antes que nuestro acuerdo.", 2)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                    <div>
                        <h3 className="font-bold text-[#009BDA] mb-4">Nuestros Intereses</h3>
                        {renderTextAreaField("Intereses Reales", "myInterests", "No posiciones. ¿Por qué queremos lo que pedimos? (Seguridad, Costos, Tiempo...)", 10)}
                    </div>
                    <div>
                        <h3 className="font-bold text-orange-700 mb-4">Sus Intereses</h3>
                        {renderTextAreaField("Sus Intereses Reales", "theirInterests", "¿Qué les quita el sueño? (Reconocimiento, Respeto, Dinero, Empleo...)", 10)}
                    </div>
                </div>
            )}

            {/* Pasos restantes simplificados para el ejemplo */}
            {activeStep >= 4 && (
                <div className="max-w-2xl animate-fade-in">
                    <h3 className="font-bold text-slate-800 text-lg mb-4">{STEPS.find(s => s.id === activeStep)?.title}</h3>
                    {activeStep === 4 && renderTextAreaField("Opciones de Mutuo Beneficio", "options", "Lluvia de ideas sin juzgar. ¿Cómo agrandamos el pastel?", 10)}
                    {activeStep === 5 && (
                        <>
                            {renderTextAreaField("Criterios de Legitimidad", "legitimacyCriteria", "Precios de mercado, leyes, estándares técnicos.")}
                            {renderTextAreaField("Sentido de Equidad", "legitimacyFairness", "¿Por qué es justo para ambos?")}
                        </>
                    )}
                    {activeStep === 6 && (
                        <>
                            {renderTextAreaField("Preguntas de Oro", "communicationQuestions", "Preguntas para descubrir sus intereses.")}
                            {renderTextAreaField("Mensaje Clave", "communicationMessage", "El titular que queremos que recuerden.")}
                        </>
                    )}
                    {activeStep === 7 && renderTextAreaField("Acciones para la Relación", "relationshipActions", "Cómo separar el problema de las personas.")}
                    {activeStep === 8 && renderTextAreaField("Compromisos Finales", "agreementCommitment", "¿Qué documento se firma? ¿Quién hace qué y cuándo?", 10)}
                </div>
            )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
             <button 
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className="flex items-center gap-2 px-6 py-2 text-slate-600 hover:bg-slate-200 rounded-lg disabled:opacity-30 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
            <div className="flex gap-3">
                {activeStep < 8 ? (
                    <button 
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="flex items-center gap-2 bg-[#009BDA] text-white px-8 py-2 rounded-lg hover:bg-[#007CAE] font-bold shadow-sm transition-all"
                    >
                        Siguiente <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    !readOnly && (
                        <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-emerald-600 text-white px-10 py-2 rounded-lg hover:bg-emerald-700 font-bold shadow-lg transition-all"
                        >
                            <Save className="w-4 h-4" /> Finalizar Estrategia
                        </button>
                    )
                )}
            </div>
        </div>
    </div>
  );
};
