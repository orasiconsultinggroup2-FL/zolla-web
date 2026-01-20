import React from 'react';
import { LayoutDashboard, Users, Briefcase, FileText, BookOpen, Settings, PieChart, Circle, Award, UserCheck, LogOut, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { User, UserBelt, UserRole } from '../types';

const colorAzulOrasi = "#00A3E0";   // Pantone 2995 U
const colorMetalicoOrasi = "#8A8D8F"; // Pantone 8401 C

const NavItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      active
        ? 'bg-[#E5F5FB] text-[#009BDA]' 
        : 'text-[#7F7F7E] hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-[#009BDA]' : 'text-[#7F7F7E]'}`} />
    {label}
  </Link>
);

const BeltBadge = ({ belt }: { belt: UserBelt }) => {
  const getBeltColor = (b: UserBelt) => {
    switch (b) {
      case UserBelt.LEVEL_1: return 'bg-white border-[#7F7F7E]';
      case UserBelt.LEVEL_2: return 'bg-yellow-400 border-yellow-500';
      case UserBelt.LEVEL_3: return 'bg-[#7F7F7E] border-black';
      default: return 'bg-slate-100';
    }
  };

  return (
    <span className={`w-3 h-3 rounded-full border-2 ${getBeltColor(belt)} inline-block`} title={belt}></span>
  );
};

export const Sidebar = ({ currentUser, onLogout }: { currentUser: User, onLogout: () => void }) => {
  const location = useLocation();

  const canViewDashboard = currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.ADMIN;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-10">
      <div className="border-b border-slate-100 pl-6 pr-4 py-5">
        <div className="flex flex-col">
          {/* Logo Text Structure */}
          <div className="flex items-center gap-2 mb-1">
             <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600"></div>
             <span 
                className="text-xl font-bold tracking-tight leading-none"
                style={{ color: colorMetalicoOrasi }}
             >
                ORASI Lab
             </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span 
              style={{ 
                  color: colorAzulOrasi,
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
              }}
            >
              PLATAFORMA ONCM
            </span>
            <span 
              style={{ 
                  color: colorAzulOrasi,
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
              }}
            >
              SIMULADOR DE NEGOCIACION
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-semibold text-[#7F7F7E] uppercase tracking-wider">Gestión</div>
        
        {canViewDashboard && (
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard Ejecutivo" active={location.pathname === '/'} />
        )}
        
        <NavItem to="/cases" icon={Briefcase} label="Casos y Conflictos" active={location.pathname.startsWith('/cases')} />
        <NavItem to="/owner-view" icon={UserCheck} label="Vista Propietario" active={location.pathname === '/owner-view'} />
        <NavItem to="/actors" icon={Users} label="Mapa de Actores & CRM" active={location.pathname === '/actors'} />
        
        <div className="mt-8 px-4 py-2 text-xs font-semibold text-[#7F7F7E] uppercase tracking-wider">Metodología</div>
        <NavItem to="/academy" icon={GraduationCap} label="ORASI Academy" active={location.pathname === '/academy'} />
        <NavItem to="/aar" icon={PieChart} label="AAR (Aprendizaje)" active={location.pathname === '/aar'} />
        
        <div className="mt-8 px-4 py-2 text-xs font-semibold text-[#7F7F7E] uppercase tracking-wider">Soporte</div>
        <NavItem to="/library" icon={BookOpen} label="Biblioteca & Casos" active={location.pathname.startsWith('/library')} />
        <NavItem to="/settings" icon={Settings} label="Mi Perfil" active={location.pathname === '/settings'} />
      </nav>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-100 shadow-sm mb-3">
          <img src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=random`} alt="User" className="w-10 h-10 rounded-full" />
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
              <BeltBadge belt={currentUser.belt} />
            </div>
            <p className="text-xs text-[#7F7F7E] truncate">{currentUser.role}</p>
          </div>
        </div>
        
        <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
        >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};