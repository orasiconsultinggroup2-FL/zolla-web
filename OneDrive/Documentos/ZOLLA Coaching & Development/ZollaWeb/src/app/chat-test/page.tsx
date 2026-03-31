import React from 'react';
import ZollaChatSystem from '@/components/ZollaChatSystem';

export default function ChatTestPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-3xl text-center space-y-8">
        <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4 uppercase tracking-widest shadow-sm">
          Entorno de Pruebas
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
          ZOLLA <span className="text-indigo-600 italic">Diagnostic</span> Engine
        </h1>
        
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          Este es un entorno controlado para validar la lógica de enrutamiento, clasificación de arquetipos y captura de leads antes de la integración final.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-indigo-300 transition-colors">
            <h3 className="font-bold text-indigo-600 mb-2">HUELLA H</h3>
            <p className="text-sm text-slate-500">Prueba la lógica de clasificación de arquetipos de liderazgo.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-indigo-300 transition-colors">
            <h3 className="font-bold text-indigo-600 mb-2">VOCERÍA</h3>
            <p className="text-sm text-slate-500">Evalúa los niveles de riesgo y preparación mediática.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-indigo-300 transition-colors">
            <h3 className="font-bold text-indigo-600 mb-2">NEGOCIACIÓN</h3>
            <p className="text-sm text-slate-500">Valida los tipos de negociación (Estratégica vs Posicional).</p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-indigo-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/30 transition-colors duration-500" />
          <h2 className="text-2xl font-bold mb-2">¿Cómo probar?</h2>
          <p className="text-indigo-100 opacity-80">
            Haz clic en el icono de chat en la esquina inferior derecha para iniciar el flujo. Sigue los pasos y verifica que la clasificación final coincida con tus respuestas.
          </p>
        </div>
      </div>

      <ZollaChatSystem />
    </main>
  );
}
