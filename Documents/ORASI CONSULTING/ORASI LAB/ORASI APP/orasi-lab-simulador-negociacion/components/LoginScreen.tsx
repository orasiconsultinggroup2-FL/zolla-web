import React, { useState } from 'react';
import { User, UserRole, UserBelt } from '../types';
import { ArrowRight, Lock, Briefcase, Users, Search, UserCheck, ArrowLeft } from 'lucide-react';
import { MOCK_USERS } from '../mockData';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [view, setView] = useState<'main' | 'social-selection'>('main');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Colores Corporativos Específicos
  const colorAzulOrasi = "#00A3E0";   // Pantone 2995 U
  const colorMetalicoOrasi = "#8A8D8F"; // Pantone 8401 C

  // Perfil Gerencial (Acceso Directo)
  const handleManagerLogin = () => {
      onLogin({
        id: 'generic-manager',
        name: 'Gerencia',
        email: 'gerencia@orasi.com',
        role: UserRole.MANAGER,
        belt: UserBelt.LEVEL_3,
        company: 'Corporativo'
      });
  };

  // Filtro de Gestores (Solo listamos los roles RELATIONIST generados en mockData)
  const socialManagers = MOCK_USERS.filter(u => u.role === UserRole.RELATIONIST);
  const filteredManagers = socialManagers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        {/* Branding Section */}
        <div className="flex flex-col items-center mb-10 text-center">
           <div className="flex items-center gap-4 mb-3">
             {/* Icono Circular Metálico/Slate */}
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600 shadow-md"></div>
             
             {/* Texto Principal ORASI Lab */}
             <span 
                className="text-6xl font-black tracking-tight leading-none"
                style={{ color: colorMetalicoOrasi }}
             >
                ORASI Lab
             </span>
           </div>
           
           <div className="flex flex-col gap-1 items-center">
             <span 
               className="text-2xl font-black tracking-[0.2em] uppercase"
               style={{ color: colorAzulOrasi }}
             >
               PLATAFORMA ONCM
             </span>
             <span 
               className="text-lg font-bold tracking-[0.1em] uppercase opacity-80"
               style={{ color: colorAzulOrasi }}
             >
               SIMULADOR DE NEGOCIACION
             </span>
           </div>
        </div>

        {view === 'main' ? (
            <>
                <p className="text-slate-400 mb-8 text-lg font-light text-center">Seleccione su perfil de acceso</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {/* Perfil Gerencia */}
                    <button
                    onClick={handleManagerLogin}
                    className="group bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-2xl hover:border-slate-800 transition-all duration-300 text-left relative overflow-hidden"
                    >
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-800 group-hover:w-3 transition-all"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors">
                        <Briefcase className="w-8 h-8 text-slate-600 group-hover:text-white" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-6 h-6 text-slate-800" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 text-2xl mb-2 group-hover:text-slate-800 transition-colors">Gerencia</h3>
                        <p className="text-slate-500 text-sm">Visión estratégica, aprobación de acuerdos críticos y dashboard ejecutivo.</p>
                    </div>
                    </button>

                    {/* Perfil Gestor Social (Abre selección) */}
                    <button
                    onClick={() => setView('social-selection')}
                    className="group bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-2xl hover:border-[#009BDA] transition-all duration-300 text-left relative overflow-hidden"
                    >
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#009BDA] group-hover:w-3 transition-all"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#E5F5FB] flex items-center justify-center group-hover:bg-[#009BDA] group-hover:text-white transition-colors">
                        <Users className="w-8 h-8 text-[#009BDA] group-hover:text-white" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-6 h-6 text-[#009BDA]" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 text-2xl mb-2 group-hover:text-[#009BDA] transition-colors">Gestor Social</h3>
                        <p className="text-slate-500 text-sm">Acceso individual a cuentas operativas (Territorio, CRM, PNRs).</p>
                    </div>
                    </button>
                </div>
            </>
        ) : (
            <div className="max-w-xl mx-auto animate-fade-in">
                <button 
                    onClick={() => setView('main')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-4 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver a selección de perfil
                </button>

                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Seleccione su Cuenta Operativa</h3>
                        <p className="text-sm text-slate-500 mb-4">Busque su nombre o número de gestor asignado.</p>
                        
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input 
                                type="text"
                                autoFocus
                                placeholder="Ej: Gestor 14, Norte, etc..."
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#009BDA] focus:border-transparent outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
                        {filteredManagers.map(user => (
                            <button
                                key={user.id}
                                onClick={() => onLogin(user)}
                                className="w-full text-left p-3 rounded-lg hover:bg-[#E5F5FB] hover:text-[#009BDA] group transition-all flex items-center justify-between border border-transparent hover:border-[#009BDA]/20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold group-hover:bg-white group-hover:text-[#009BDA]">
                                        {user.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 group-hover:text-[#009BDA]">{user.name}</div>
                                        <div className="text-xs text-slate-400 group-hover:text-[#009BDA]/70">{user.email} • {user.company}</div>
                                    </div>
                                </div>
                                <UserCheck className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                        {filteredManagers.length === 0 && (
                            <div className="p-8 text-center text-slate-400">
                                No se encontraron gestores con ese nombre.
                            </div>
                        )}
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
                        Mostrando {filteredManagers.length} de {socialManagers.length} cuentas activas
                    </div>
                </div>
            </div>
        )}

        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100">
                <Lock className="w-3 h-3" />
                <span>Acceso seguro • Sistema de trazabilidad activo</span>
            </div>
            <p className="text-xs text-slate-300 mt-6">
                © {new Date().getFullYear()} ORASI Consulting
            </p>
        </div>
      </div>
    </div>
  );
};