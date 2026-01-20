import React, { useState } from 'react';
import { MOCK_ALERTS, MOCK_CASES } from '../mockData';
import { RiskLevel } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Search } from 'lucide-react';

export const AlertsView: React.FC = () => {
    const [filterRisk, setFilterRisk] = useState<string>('all');
    
    // Enrich alerts
    const alerts = MOCK_ALERTS.map(alert => {
        const c = MOCK_CASES.find(c => c.id === alert.caseId);
        return { ...alert, caseTitle: c?.title, territory: c?.territory };
    }).filter(a => filterRisk === 'all' || a.risk === filterRisk);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Centro de Alertas</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between">
                     <div className="flex items-center gap-2">
                         <Filter className="w-4 h-4 text-slate-400" />
                         <select 
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none"
                            value={filterRisk}
                            onChange={(e) => setFilterRisk(e.target.value)}
                         >
                             <option value="all">Todos los riesgos</option>
                             <option value={RiskLevel.CRITICAL}>Crítico</option>
                             <option value={RiskLevel.HIGH}>Alto</option>
                             <option value={RiskLevel.MEDIUM}>Medio</option>
                         </select>
                     </div>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-6 py-3 font-medium">Fecha</th>
                            <th className="px-6 py-3 font-medium">Caso</th>
                            <th className="px-6 py-3 font-medium">Territorio</th>
                            <th className="px-6 py-3 font-medium">Riesgo</th>
                            <th className="px-6 py-3 font-medium">Detalle</th>
                            <th className="px-6 py-3 font-medium text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {alerts.map(alert => (
                            <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-500">{alert.date}</td>
                                <td className="px-6 py-4 font-medium text-[#009BDA]">{alert.caseTitle}</td>
                                <td className="px-6 py-4 text-slate-600">{alert.territory}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold text-white
                                        ${alert.risk === RiskLevel.CRITICAL ? 'bg-red-500' : 
                                            alert.risk === RiskLevel.HIGH ? 'bg-orange-500' : 
                                            alert.risk === RiskLevel.MEDIUM ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                        {alert.risk}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-700 text-xs uppercase mb-1">{alert.type}</div>
                                    <div className="text-slate-600">{alert.comment}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/cases/${alert.caseId}`} className="inline-flex items-center gap-1 text-[#009BDA] hover:text-[#007CAE] font-medium">
                                        Ver Detalles <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};