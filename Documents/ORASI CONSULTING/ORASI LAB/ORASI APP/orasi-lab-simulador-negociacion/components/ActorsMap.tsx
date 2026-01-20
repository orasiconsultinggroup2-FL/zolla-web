import React from 'react';
import { MOCK_CASES } from '../mockData';
import { ActorPosture } from '../types';
import { User, Activity, Zap, MessageCircle, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ActorsMap: React.FC = () => {
  // Flatten all actors from all cases for the demo
  const allActors = MOCK_CASES.flatMap(c => c.actors.map(a => ({...a, caseId: c.id, caseTitle: c.title})));

  const getPostureColor = (posture: ActorPosture) => {
    switch(posture) {
      case ActorPosture.ALLY: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case ActorPosture.OPPONENT: return 'bg-red-100 text-red-800 border-red-200';
      case ActorPosture.CRITIC: return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mapa de Actores & CRM Social</h2>
          <p className="text-slate-500">Gestión de relaciones, influencia y posiciones.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allActors.map((actor, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{actor.name}</h3>
                    <p className="text-sm text-slate-500">{actor.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPostureColor(actor.posture)}`}>
                  {actor.posture}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="text-sm">
                  <span className="text-slate-400 block text-xs uppercase tracking-wide mb-1">Organización</span>
                  <span className="font-medium text-slate-700">{actor.organization}</span>
                </div>
                
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wide mb-1">Nivel de Influencia</span>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-[#009BDA] h-2 rounded-full" style={{ width: `${actor.influence * 10}%` }}></div>
                  </div>
                  <div className="text-right text-xs text-slate-500 mt-1">{actor.influence}/10</div>
                </div>

                <div className="text-sm">
                  <span className="text-slate-400 block text-xs uppercase tracking-wide mb-1">Intereses Principales</span>
                  <div className="flex flex-wrap gap-1">
                    {actor.interests.map((int, i) => (
                      <span key={i} className="bg-slate-50 text-slate-600 px-2 py-1 rounded text-xs border border-slate-200">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-sm">
              <Link to={`/cases/${actor.caseId}`} className="text-[#009BDA] hover:text-[#007CAE] flex items-center gap-1 font-medium truncate max-w-[40%]" title={actor.caseTitle}>
                <LinkIcon className="w-3 h-3" /> {actor.caseTitle}
              </Link>
              <div className="flex gap-2">
                <Link to={`/actors/${actor.id}`} className="text-[#7F7F7E] hover:text-[#009BDA] text-xs font-bold flex items-center gap-1">
                    Ver Perfil <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};