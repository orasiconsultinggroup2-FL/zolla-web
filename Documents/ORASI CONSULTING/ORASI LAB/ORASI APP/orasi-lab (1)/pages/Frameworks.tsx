import React from 'react';

const Frameworks: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-hidden relative h-full">
      <aside className="w-72 flex flex-col bg-background-dark border-r border-border-dark overflow-y-auto hidden md:flex">
        <div className="p-4 flex flex-col gap-1">
          <button className="group flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="text-primary flex items-center justify-center"><span className="material-symbols-outlined fill-current">lightbulb</span></div>
            <div className="flex flex-col items-start"><span className="text-white text-sm font-bold">AIDA Framework</span></div>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0f1115] relative">
        <div className="flex-none px-8 py-6 pb-2">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">AIDA: Attention, Interest, Desire, Action</h1>
        </div>
      </main>
    </div>
  );
};

export default Frameworks;