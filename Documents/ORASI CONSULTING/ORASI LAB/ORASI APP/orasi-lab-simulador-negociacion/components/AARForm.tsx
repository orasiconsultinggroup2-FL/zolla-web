import React, { useState } from 'react';
import { AARData, AARType } from '../types';
import { Save, AlertTriangle, Mic, MicOff } from 'lucide-react';

interface AARFormProps {
    caseId: string;
    currentUser: string;
    onSave: (data: AARData) => void;
    onCancel: () => void;
}

export const AARForm: React.FC<AARFormProps> = ({ caseId, currentUser, onSave, onCancel }) => {
    const [isListening, setIsListening] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<AARData>>({
        type: AARType.NORMAL,
        intent: '',
        reality: '',
        why: '',
        nextTime: '',
        risks: '',
        correctiveActions: '',
        criticalContext: '',
        criticalNotes: ''
    });

    const handleVoiceInput = (field: keyof AARData, currentVal: string) => {
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
        recognition.continuous = false;
        recognition.interimResults = false;

        setIsListening(field);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            const newVal = currentVal ? `${currentVal} ${transcript}` : transcript;
            setFormData(prev => ({ ...prev, [field]: newVal }));
            setIsListening(null);
        };
        
        recognition.onerror = () => setIsListening(null);
        recognition.onend = () => setIsListening(null);

        recognition.start();
    };

    const renderMicButton = (field: keyof AARData, value: string) => (
        <button 
            type="button"
            onClick={() => handleVoiceInput(field, value)}
            className={`absolute right-2 top-2 p-1.5 rounded-full transition-colors ${
                isListening === field 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'text-slate-400 hover:bg-slate-100 hover:text-[#009BDA]'
            }`}
            title="Dictar"
        >
            {isListening === field ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            id: `AAR-${Date.now()}`,
            caseId,
            authorId: currentUser,
            date: new Date().toISOString().split('T')[0],
        } as AARData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b pb-2">Nuevo AAR - After Action Review</h3>
            
            <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de AAR</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-slate-50 has-[:checked]:border-[#009BDA] has-[:checked]:bg-[#E5F5FB]">
                        <input 
                            type="radio" 
                            name="type" 
                            value={AARType.NORMAL}
                            checked={formData.type === AARType.NORMAL}
                            onChange={() => setFormData({...formData, type: AARType.NORMAL})}
                            className="text-[#009BDA] focus:ring-[#009BDA]"
                        />
                        <span className="font-medium text-slate-900">Normal</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-red-50 has-[:checked]:border-red-500 has-[:checked]:bg-red-50">
                        <input 
                            type="radio" 
                            name="type" 
                            value={AARType.CRITICAL}
                            checked={formData.type === AARType.CRITICAL}
                            onChange={() => setFormData({...formData, type: AARType.CRITICAL})}
                            className="text-red-600 focus:ring-red-500"
                        />
                        <span className="font-medium text-red-900">Crítico</span>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-1">¿Qué intentábamos hacer?</label>
                    <textarea required className="w-full p-3 pr-10 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#009BDA]" rows={3}
                        value={formData.intent} onChange={e => setFormData({...formData, intent: e.target.value})} />
                    {renderMicButton("intent", formData.intent || '')}
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-1">¿Qué ocurrió realmente?</label>
                    <textarea required className="w-full p-3 pr-10 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#009BDA]" rows={3}
                        value={formData.reality} onChange={e => setFormData({...formData, reality: e.target.value})} />
                     {renderMicButton("reality", formData.reality || '')}
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-1">¿Por qué ocurrió así?</label>
                    <textarea required className="w-full p-3 pr-10 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#009BDA]" rows={3}
                        value={formData.why} onChange={e => setFormData({...formData, why: e.target.value})} />
                     {renderMicButton("why", formData.why || '')}
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-1">¿Qué haremos diferente la próxima vez?</label>
                    <textarea required className="w-full p-3 pr-10 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#009BDA]" rows={3}
                        value={formData.nextTime} onChange={e => setFormData({...formData, nextTime: e.target.value})} />
                     {renderMicButton("nextTime", formData.nextTime || '')}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="relative">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Precedentes y riesgos</label>
                        <textarea className="w-full p-3 pr-10 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#009BDA]" rows={3}
                            value={formData.risks} onChange={e => setFormData({...formData, risks: e.target.value})} />
                         {renderMicButton("risks", formData.risks || '')}
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Acciones correctivas</label>
                        <textarea className="w-full p-3 pr-10 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#009BDA]" rows={3}
                            value={formData.correctiveActions} onChange={e => setFormData({...formData, correctiveActions: e.target.value})} />
                         {renderMicButton("correctiveActions", formData.correctiveActions || '')}
                    </div>
                </div>

                {formData.type === AARType.CRITICAL && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-6">
                        <h4 className="flex items-center gap-2 font-bold text-red-800 mb-3">
                            <AlertTriangle className="w-5 h-5" /> Campos Críticos
                        </h4>
                        <div className="space-y-4">
                             <div className="relative">
                                <label className="block text-sm font-bold text-red-900 mb-1">Contexto del caso crítico</label>
                                <textarea className="w-full p-3 pr-10 border border-red-200 rounded-lg text-sm" rows={3}
                                    value={formData.criticalContext} onChange={e => setFormData({...formData, criticalContext: e.target.value})} />
                                 {renderMicButton("criticalContext", formData.criticalContext || '')}
                            </div>
                             <div className="relative">
                                <label className="block text-sm font-bold text-red-900 mb-1">Notas adicionales</label>
                                <textarea className="w-full p-3 pr-10 border border-red-200 rounded-lg text-sm" rows={3}
                                    value={formData.criticalNotes} onChange={e => setFormData({...formData, criticalNotes: e.target.value})} />
                                 {renderMicButton("criticalNotes", formData.criticalNotes || '')}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-[#009BDA] text-white rounded-lg hover:bg-[#007CAE] font-medium flex items-center gap-2">
                    <Save className="w-4 h-4" /> Guardar AAR
                </button>
            </div>
        </form>
    );
};