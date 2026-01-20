import React from 'react';
import { MOCK_AARS, MOCK_CASES, MOCK_USERS } from '../mockData';
import { PieChart, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AARList: React.FC = () => {
  const getCaseName = (id: string) => MOCK_CASES.find(c => c.id === id)?.title || 'Caso desconocido';
  const getAuthorName = (id: string) => MOCK_USERS.find(u => u.id === id)?.name || 'Desconocido';

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Aprendizaje (AAR)</h2>
          <p className="text-slate-500">Base de conocimiento de lecciones aprendidas (After Action Review).</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input type="text" placeholder="Buscar aprendizajes..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filtros
            </button>
        </div>

        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
                <tr>
                    <th className="px-6 py-3 font-medium">Fecha</th>
                    <th className="px-6 py-3 font-medium">Caso</th>
                    <th className="px-6 py-3 font-medium">Aprendizaje Principal</th>
                    <th className="px-6 py-3 font-medium">Autor</th>
                    <th className="px-6 py-3 font-medium text-right">Acción</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {MOCK_AARS.map((aar) => (
                    <tr key={aar.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600">{aar.date}</td>
                        <td className="px-6 py-4 font-medium text-[#009BDA]">
                            <Link to={`/cases/${aar.caseId}`}>{getCaseName(aar.caseId)}</Link>
                        </td>
                        <td className="px-6 py-4 text-slate-800 line-clamp-1 max-w-xs">{aar.nextTime}</td>
                        <td className="px-6 py-4 text-slate-600">{getAuthorName(aar.authorId)}</td>
                        <td className="px-6 py-4 text-right">
                            <Link to={`/cases/${aar.caseId}`} className="text-[#009BDA] hover:underline">Ver Contexto</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};