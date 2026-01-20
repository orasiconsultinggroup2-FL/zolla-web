import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-dark">
      <header className="h-16 border-b border-border-dark flex items-center justify-between px-6 bg-[#111722] z-20">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors material-symbols-outlined">search</span>
            <input className="w-full bg-surface-dark border-none rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:bg-[#161d2b] transition-all" placeholder="Buscar posts, campañas o borradores..." type="text"/>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white mb-1">Calendario de Contenido</h1>
            <p className="text-slate-400 text-sm">Gestiona y planifica tus publicaciones en redes sociales.</p>
          </div>
          <div className="flex items-center bg-surface-dark rounded-lg p-1 border border-border-dark">
            <button className="p-1 hover:bg-[#2d3b55] rounded text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="px-4 font-bold text-white min-w-[140px] text-center">Noviembre 2023</span>
            <button className="p-1 hover:bg-[#2d3b55] rounded text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-6 h-full min-h-[800px]">
          <div className="flex-1 bg-surface-dark rounded-xl border border-border-dark flex flex-col overflow-hidden">
            <div className="grid grid-cols-7 border-b border-border-dark bg-[#161d2b]">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 flex-1 auto-rows-fr divide-x divide-border-dark bg-surface-dark/50">
              <div className="min-h-[140px] p-2 bg-[#141a25] opacity-50 border-b border-border-dark flex flex-col gap-1"><span className="text-right text-sm text-slate-600 font-medium p-1">30</span></div>
              <div className="min-h-[140px] p-2 bg-[#141a25] opacity-50 border-b border-border-dark flex flex-col gap-1"><span className="text-right text-sm text-slate-600 font-medium p-1">31</span></div>
              <div className="min-h-[140px] p-2 border-b border-border-dark flex flex-col gap-2 relative group hover:bg-[#232f48] transition-colors">
                <span className="text-right text-sm text-slate-400 font-medium p-1">1</span>
                <div className="bg-primary/20 border border-primary/30 rounded p-2 cursor-pointer hover:bg-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-1"><span className="material-symbols-outlined text-[16px] text-blue-400">business_center</span><span className="text-[10px] text-blue-200">10:00 AM</span></div>
                  <p className="text-xs text-white font-medium line-clamp-2">Lanzamiento Q4</p>
                </div>
              </div>
              {[2, 3, 4, 5].map(d => (
                <div key={d} className="min-h-[140px] p-2 border-b border-border-dark flex flex-col gap-2 relative group hover:bg-[#232f48] transition-colors"><span className="text-right text-sm text-slate-400 font-medium p-1">{d}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;