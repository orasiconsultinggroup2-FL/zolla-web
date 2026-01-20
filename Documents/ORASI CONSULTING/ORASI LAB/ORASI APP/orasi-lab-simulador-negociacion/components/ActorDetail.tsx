import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_CASES } from '../mockData';
import { ArrowLeft, User, Building, MapPin, Activity } from 'lucide-react';
import { ActorPosture } from '../types';

export const ActorDetail: React.FC = () => {
    const { id } = useParams();
    // Helper to find actor across cases since we don't have a central actor DB in mock
    let actor = null;
    let relatedCase = null;

    for (const c of MOCK_CASES) {
        const found = c.actors.find(a => a.id === id);
        if (found) {
            actor = found;
            relatedCase = c;
            break;
        }
    }

    if (!actor) return <div className="p-10 text-center">Actor no encontrado</div>;

    const getPostureColor = (posture: ActorPosture) => {
        switch(posture) {
          case ActorPosture.ALLY: return 'bg-emerald-100 text-emerald-800';
          case ActorPosture.OPPONENT: return 'bg-red-100 text-red-800';
          case ActorPosture.CRITIC: return 'bg-orange-100 text-orange-800';
          default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-6">
            <Link to="/actors" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#009BDA]">
                <ArrowLeft className="w-4 h-4" /> Volver al Mapa
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                         <div className="w-24 h-24 bg-white rounded-full p-2 shadow-lg">
                             <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                 <User className="w-10 h-10" />
                             </div>
                         </div>
                         <div className="flex gap-3">
                             <button className="bg-[#009BDA] text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-[#007CAE]">
                                Registrar Interacción
                             </button>
                         </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{actor.name}</h1>
                        <p className="text-lg text-slate-500">{actor.role} en {actor.organization}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="space-y-6 col-span-2">
                             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-[#009BDA]" /> Perfil de Intereses
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {actor.interests.map((int, i) => (
                                        <span key={i} className="bg-white px-3 py-1 rounded border border-slate-200 text-sm text-slate-700 shadow-sm">
                                            {int}
                                        </span>
                                    ))}
                                </div>
                             </div>

                             <div>
                                <h3 className="font-bold text-slate-900 mb-4">Caso Vinculado</h3>
                                <Link to={`/cases/${relatedCase?.id}`} className="block bg-white p-4 rounded-xl border border-slate-200 hover:border-[#009BDA] transition-colors group">
                                     <div className="font-bold text-[#009BDA] group-hover:underline mb-1">{relatedCase?.title}</div>
                                     <div className="text-sm text-slate-500 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> {relatedCase?.territory}
                                     </div>
                                </Link>
                             </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Métricas</h4>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600">Postura</span>
                                            <span className={`px-2 rounded text-xs font-bold ${getPostureColor(actor.posture)}`}>{actor.posture}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600">Influencia</span>
                                            <span className="font-bold text-slate-900">{actor.influence}/10</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div className="bg-[#009BDA] h-2 rounded-full" style={{ width: `${actor.influence * 10}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};