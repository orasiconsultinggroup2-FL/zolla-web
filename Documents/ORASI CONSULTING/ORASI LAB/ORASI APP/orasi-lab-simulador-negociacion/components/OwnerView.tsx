import React from 'react';
import { User, Case, PNRData, AARData, UserBelt, RiskLevel, UserRole } from '../types';
import { Award, Briefcase, FileText, PieChart, Lock, CheckCircle, ChevronRight, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OwnerViewProps {
    currentUser: User;
    cases: Case[];
    pnrs: PNRData[];
    aars: AARData[];
}

export const OwnerView: React.FC<OwnerViewProps> = ({ currentUser, cases, pnrs, aars }) => {
    // Stats Calculation
    const myCases = cases.filter(c => c.ownerId === currentUser.id && c.caseStatus === 'Activa');
    const myPnrsCount = 12; // Mocking historical count for belt logic visualization
    const myAarsCount = 5;  // Mocking historical count
    
    // Belt Logic
    const getNextBelt = (current: UserBelt) => {
        if (current === UserBelt.LEVEL_1) return UserBelt.LEVEL_2;
        if (current === UserBelt.LEVEL_2) return UserBelt.LEVEL_3;
        return null;
    };

    const requirements = {
        [UserBelt.LEVEL_3]: { pnrs: 15, aars: 8, cases: 1 },
        [UserBelt.LEVEL_2]: { pnrs: 5, aars: 3, cases: 0 },
        [UserBelt.LEVEL_1]: { pnrs: 0, aars: 0, cases: 0 }
    };

    const nextBelt = getNextBelt(currentUser.belt);
    const target = nextBelt ? requirements[nextBelt] : null;

    const ProgressBar = ({ current, target, label }: { current: number, target: number, label: string }) => (
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{label}</span>
                <span className="font-bold text-slate-900">{current} / {target}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                    className={`h-2.5 rounded-full ${current >= target ? 'bg-green-500' : 'bg-[#009BDA]'}`} 
                    style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
             {/* Branding Header */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Vista Propietario</h2>
                    <p className="text-[#7F7F7E]">Mi progreso, cinturones y gestión.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Belt Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Metallic Gray Gradient based on Pantone 8401 C */}
                        <div className="bg-gradient-to-br from-[#7F7F7E] to-slate-700 p-6 text-white text-center">
                            <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
                            <h3 className="text-xl font-bold">{currentUser.belt}</h3>
                            <p className="text-slate-200 text-sm">Nivel de Maestría ORASI</p>
                        </div>
                        <div className="p-6">
                            {target ? (
                                <>
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Circle className="w-3 h-3 fill-[#009BDA] text-[#009BDA]" />
                                        Ruta al Siguiente Nivel
                                    </h4>
                                    <ProgressBar current={myPnrsCount} target={target.pnrs} label="PNRs Realizados (12 meses)" />
                                    <ProgressBar current={myAarsCount} target={target.aars} label="AARs Completados" />
                                    <ProgressBar current={myCases.length} target={target.cases} label="Casos Activos" />
                                    
                                    <div className="mt-6 bg-[#E5F5FB] p-4 rounded text-xs text-[#009BDA] border border-[#009BDA] border-opacity-20">
                                        Completa los requisitos operativos y mantén casos activos para avanzar de cinturón.
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                                    <p className="font-bold text-slate-900">¡Nivel Máximo Alcanzado!</p>
                                    <p className="text-sm text-slate-500">Eres un referente en la organización.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Portfolio Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="bg-[#E5F5FB] p-3 rounded-lg text-[#009BDA]"><Briefcase className="w-6 h-6" /></div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{myCases.length}</div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Casos Activos</div>
                            </div>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="bg-[#E5F5FB] p-3 rounded-lg text-[#009BDA]"><FileText className="w-6 h-6" /></div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{myPnrsCount}</div>
                                <div className="text-xs text-slate-500 uppercase font-bold">PNR Históricos</div>
                            </div>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="bg-[#E5F5FB] p-3 rounded-lg text-[#009BDA]"><PieChart className="w-6 h-6" /></div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{myAarsCount}</div>
                                <div className="text-xs text-slate-500 uppercase font-bold">AAR Históricos</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Mis Casos Activos</h3>
                            <Link to="/cases" className="text-sm text-[#009BDA] hover:underline">Ir a gestión</Link>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {myCases.length > 0 ? myCases.map(c => (
                                <div key={c.id} className="p-4 hover:bg-slate-50 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-slate-900">{c.title}</div>
                                        <div className="text-xs text-slate-500 flex gap-2 mt-1">
                                            <span>{c.territory}</span>
                                            <span className={`font-bold ${
                                                c.risk === RiskLevel.CRITICAL ? 'text-red-600' : 
                                                c.risk === RiskLevel.HIGH ? 'text-orange-600' : 'text-green-600'
                                            }`}>{c.risk}</span>
                                        </div>
                                    </div>
                                    <Link to={`/cases/${c.id}`} className="bg-white border border-slate-200 p-2 rounded hover:bg-slate-100 text-slate-600">
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-slate-500 italic">No tienes casos activos asignados actualmente.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};