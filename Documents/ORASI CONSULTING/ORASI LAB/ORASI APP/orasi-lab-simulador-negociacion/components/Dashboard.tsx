import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { MOCK_CASES, MOCK_ALERTS } from '../mockData';
import { RiskLevel, CasePhase } from '../types';
import { Link } from 'react-router-dom';

// ORASI_BLUE = #009BDA
// ORASI_METALLIC = #7F7F7E

const COLORS = ['#009BDA', '#7F7F7E', '#FFBB28', '#FF8042']; 
const RISK_COLORS = {
  [RiskLevel.LOW]: '#10B981',
  [RiskLevel.MEDIUM]: '#F59E0B',
  [RiskLevel.HIGH]: '#F97316',
  [RiskLevel.CRITICAL]: '#EF4444',
};

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-[#7F7F7E]">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const riskData = Object.values(RiskLevel).map(level => ({
    name: level,
    value: MOCK_CASES.filter(c => c.risk === level).length
  })).filter(d => d.value > 0);

  const phaseData = Object.values(CasePhase).map(phase => ({
    name: phase,
    count: MOCK_CASES.filter(c => c.phase === phase).length
  })).filter(d => d.count > 0);

  const totalFinancialImpact = MOCK_CASES.reduce((acc, curr) => acc + curr.financialImpact, 0);

  const enrichedAlerts = MOCK_ALERTS.map(alert => {
    const relatedCase = MOCK_CASES.find(c => c.id === alert.caseId);
    return { ...alert, caseTitle: relatedCase?.title || 'Caso Desconocido', territory: relatedCase?.territory };
  });

  return (
    <div className="space-y-6">
      {/* Branding Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-bold text-slate-900">Dashboard Ejecutivo</h2>
            <p className="text-[#7F7F7E]">Torre de Control de Riesgos Socio-Comunitarios</p>
         </div>
         <div className="flex gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-[#E5F5FB] text-[#009BDA] rounded-full border border-[#009BDA]">
                WCNO Index: 7.8/10
            </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Casos Activos" 
          value={MOCK_CASES.length} 
          subtitle="Total portafolio" 
          icon={AlertTriangle} 
          colorClass="bg-[#009BDA]" 
        />
        <StatCard 
          title="Riesgo Crítico" 
          value={MOCK_CASES.filter(c => c.risk === RiskLevel.CRITICAL).length} 
          subtitle="Atención Inmediata" 
          icon={TrendingUp} 
          colorClass="bg-red-500" 
        />
        <StatCard 
          title="Acuerdos Cumplidos" 
          value="85%" 
          subtitle="KPI Trimestral" 
          icon={ShieldCheck} 
          colorClass="bg-emerald-500" 
        />
        <StatCard 
          title="Valor Protegido" 
          value={`$${(totalFinancialImpact / 1000000).toFixed(1)}M`} 
          subtitle="Impacto estimado" 
          icon={DollarSign} 
          colorClass="bg-[#7F7F7E]" 
        />
      </div>

      {/* Main Alert Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-red-50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-red-900">Alertas Tempranas & Movimientos Recientes</h3>
          </div>
          <Link to="/alerts" className="text-sm text-red-700 hover:text-red-900 font-medium hover:underline">Ver todo</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-medium">Caso</th>
                <th className="px-6 py-3 font-medium">Territorio</th>
                <th className="px-6 py-3 font-medium">Riesgo</th>
                <th className="px-6 py-3 font-medium">Alerta</th>
                <th className="px-6 py-3 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrichedAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                     <Link to={`/cases/${alert.caseId}`} className="hover:text-[#009BDA]">
                        {alert.caseTitle}
                     </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{alert.territory}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold text-white
                      ${alert.risk === RiskLevel.CRITICAL ? 'bg-red-500' : 
                        alert.risk === RiskLevel.HIGH ? 'bg-orange-500' : 'bg-green-500'}`}>
                      {alert.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="font-semibold block text-xs uppercase text-slate-400">{alert.type} - {alert.date}</span>
                    {alert.comment}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                        to={`/cases/${alert.caseId}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#009BDA] hover:text-[#007CAE] bg-[#E5F5FB] px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Ver Detalles <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Portafolio por Riesgo</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.name as RiskLevel] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Casos por Fase</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#009BDA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};