import React from 'react';

const BrandVoice: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto">
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-border-dark">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-white text-3xl md:text-4xl font-black tracking-tight">Configuración de Voz de Marca</h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">Train ORASI to write exactly like you.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <section className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
              <div className="p-6 border-b border-border-dark">
                <h2 className="text-white text-xl font-bold flex items-center gap-2">Tone Tuning</h2>
              </div>
              <div className="p-6 space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium"><span className="text-text-secondary">Casual</span><span className="text-white">Formality</span><span className="text-text-secondary">Corporate</span></div>
                  <input className="w-full h-2 bg-[#232f48] rounded-lg appearance-none cursor-pointer" type="range" defaultValue="75" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandVoice;