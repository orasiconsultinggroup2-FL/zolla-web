import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between border-b border-border-dark px-8 py-4 bg-[#111722]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-8 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-white hidden md:block">Panel Principal</h2>
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#92a4c9]">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input className="w-full bg-[#232f48] text-white text-sm rounded-lg border-none pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary placeholder-[#92a4c9] transition-all" placeholder="Buscar contenido, ideas o campañas..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-[#111722]"></span>
          </button>
          <Link to="/create" className="bg-primary hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="hidden sm:inline">Nuevo Post</span>
          </Link>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Buenos días, Alex.</h2>
            <p className="text-[#92a4c9] text-base">Aquí tienes el resumen de tu contenido para hoy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1a1d24] border border-border-dark p-6 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-primary">lightbulb</span>
              </div>
              <p className="text-[#92a4c9] text-sm font-medium">Ideas Generadas</p>
              <div className="flex items-baseline gap-2">
                <p className="text-white text-3xl font-bold">124</p>
                <span className="text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 5%
                </span>
              </div>
              <p className="text-xs text-[#5e6e8c] mt-2">vs. mes pasado</p>
            </div>
            <div className="bg-[#1a1d24] border border-orange-500/30 p-6 rounded-xl flex flex-col gap-1 hover:border-orange-500 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-orange-500">fact_check</span>
              </div>
              <p className="text-[#92a4c9] text-sm font-medium">Pendientes de Aprobar</p>
              <div className="flex items-baseline gap-2">
                <p className="text-white text-3xl font-bold">3</p>
                <span className="text-orange-400 text-xs font-medium bg-orange-400/10 px-1.5 py-0.5 rounded">Requiere acción</span>
              </div>
              <p className="text-xs text-[#5e6e8c] mt-2">Revisar hoy</p>
            </div>
            <div className="bg-[#1a1d24] border border-border-dark p-6 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-blue-400">calendar_month</span>
              </div>
              <p className="text-[#92a4c9] text-sm font-medium">Posts Programados</p>
              <div className="flex items-baseline gap-2">
                <p className="text-white text-3xl font-bold">18</p>
                <span className="text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 2%
                </span>
              </div>
              <p className="text-xs text-[#5e6e8c] mt-2">Siguiente: 2:00 PM</p>
            </div>
            <div className="bg-[#1a1d24] border border-border-dark p-6 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-purple-400">monitoring</span>
              </div>
              <p className="text-[#92a4c9] text-sm font-medium">Tasa de Interacción</p>
              <div className="flex items-baseline gap-2">
                <p className="text-white text-3xl font-bold">12.5%</p>
                <span className="text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 1.5%
                </span>
              </div>
              <p className="text-xs text-[#5e6e8c] mt-2">En todos los canales</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#1a1d24] to-[#161b26] border border-border-dark rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <h3 className="text-lg font-bold text-white">Generador Rápido de Ideas</h3>
              </div>
              <p className="text-[#92a4c9] text-sm max-w-lg">¿Bloqueo creativo? Ingresa un tema y deja que nuestra IA inicie tu proceso creativo al instante.</p>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-xl z-10">
              <div className="flex w-full items-stretch rounded-lg h-12 shadow-md">
                <input className="flex-1 bg-[#111722] border border-[#232f48] border-r-0 rounded-l-lg px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#5e6e8c]" placeholder="¿Sobre qué tema quieres escribir hoy?" />
                <button className="bg-primary hover:bg-blue-600 text-white px-6 rounded-r-lg text-sm font-bold tracking-wide transition-colors flex items-center gap-2">
                  <span>Generar</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#1a1d24] border border-border-dark rounded-xl flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border-dark flex justify-between items-center bg-[#1a1d24]">
                <h3 className="font-bold text-white text-lg">Pipeline Reciente</h3>
                <button className="text-xs font-medium text-primary hover:text-blue-400 flex items-center gap-1">
                  Ver Todo <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#111722] text-[#92a4c9] text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Título</th>
                      <th className="px-6 py-4 font-medium">Etapa</th>
                      <th className="px-6 py-4 font-medium">Autor</th>
                      <th className="px-6 py-4 font-medium">Fecha</th>
                      <th className="px-6 py-4 font-medium text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-dark text-sm">
                    <tr className="hover:bg-[#232f48]/50 transition-colors group">
                      <td className="px-6 py-4 text-white font-medium flex items-center gap-3">
                        <div className="bg-[#232f48] p-1.5 rounded text-[#92a4c9]">
                          <span className="material-symbols-outlined text-[18px] block">post</span>
                        </div>
                        Estrategia Producto Q3
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          <span className="size-1.5 rounded-full bg-orange-400"></span>
                          Requiere Aprobación
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#92a4c9]">Alex Morgan</td>
                      <td className="px-6 py-4 text-[#92a4c9]">Hoy, 10:00 AM</td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/editor" className="text-white hover:text-primary p-1 rounded hover:bg-[#232f48] inline-block">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-[#1a1d24] border border-border-dark rounded-xl p-5 flex flex-col h-full">
                <h3 className="font-bold text-white text-lg mb-4">Próximos Eventos</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start group">
                    <div className="flex flex-col items-center min-w-[3rem] bg-[#232f48] rounded-lg p-2 text-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-xs text-[#92a4c9] uppercase font-bold">Oct</span>
                      <span className="text-lg font-bold text-white">28</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-sm font-semibold text-white leading-tight">Boletín Semanal</h4>
                      <p className="text-xs text-[#92a4c9] mt-1">Email Marketing • 9:00 AM</p>
                    </div>
                  </div>
                </div>
                <Link to="/calendar" className="w-full mt-auto pt-4 text-sm text-[#92a4c9] hover:text-white font-medium flex justify-center items-center gap-2 border-t border-border-dark mt-4">
                  Ver Calendario Completo <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;