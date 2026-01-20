import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Panel Principal', path: '/', icon: 'dashboard' },
  { label: 'Crear Contenido', path: '/create', icon: 'auto_awesome', badge: 'IA', badgeColor: 'bg-primary/20 text-primary' },
  { label: 'Laboratorio de Ideas', path: '/frameworks', icon: 'lightbulb' },
  { label: 'Editor de Texto', path: '/editor', icon: 'edit_document' },
  { label: 'Estudio de Imagen', path: '/image-studio', icon: 'image_edit', badge: 'Nuevo', badgeColor: 'bg-purple-500/20 text-purple-400' },
  { label: 'Aprobaciones', path: '/repurpose', icon: 'fact_check', badge: '3', badgeColor: 'bg-orange-500/20 text-orange-400' },
  { label: 'Calendario', path: '/calendar', icon: 'calendar_month' },
  { label: 'Analíticas', path: '/analytics', icon: 'analytics' },
  { label: 'Voz de Marca', path: '/brand-voice', icon: 'settings' },
  { label: 'Manual de Usuario', path: '/manual', icon: 'menu_book' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col border-r border-border-dark bg-[#111722] z-30">
      <div className="p-6 flex items-center gap-3">
        <div 
          className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-lg shadow-primary/20" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSVose2KNMwYZMreqoHzwRFEhPyX78olQ0jEFrZtL8zssPjRVceEGEqBRCkL0BgxSfRwHp9KQY1OFFh8vgAhJcGeyzCWkW8Qoa2Dfh1WxyPcW9wJhMYRFA0Bms4pj2Ajpv-ZbbemXA4YYVdNG8zaBdv1o0gSaQibn7_pJGZI77RouS_2oNIgN3N7VQfdVUufMgOLQ-TQwMJKy8Ba7qyux6vLhwfxLhUdvYOT5bB2Dr7Lrfz147XrWwxc5dMFxf9hkfXdvcM30HJp8V")' }}
        ></div>
        <div className="flex flex-col">
          <h1 className="text-white text-lg font-bold leading-none tracking-tight">ORASI Lab</h1>
          <p className="text-[#92a4c9] text-xs font-medium mt-1">Suite de Contenido</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                isActive 
                  ? 'bg-primary/10 border border-primary/20 text-white' 
                  : 'text-[#92a4c9] hover:bg-[#232f48] hover:text-white border border-transparent'
              }`
            }
          >
            <div className="relative">
              <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'text-primary' : ''}`}>
                {item.icon}
              </span>
              {item.label === 'Aprobaciones' && (
                 <span className="absolute top-0 right-0 size-2 bg-orange-500 rounded-full border border-[#111722]"></span>
              )}
            </div>
            <span className={`text-sm ${location.pathname === item.path ? 'font-semibold' : 'font-medium'}`}>
              {item.label}
            </span>
            {item.badge && (
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#232f48] cursor-pointer transition-colors">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-border-dark" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_1f3QWt26SyqYcSPbVqHeVnsy7TeimQolySEyPjkBYFUE2N77OScSrbbM_c7qsXPRp0yzWFsLR6NhzDBiboIkPWtZ9UJ4L6in3AckEBwYvp5mv4giDi1M6hJw_tdRgydY5YLES0uRB0DfYFbVubQz9spgyXqpG3TEsRGsNtqSHJOfmTu0Wgy0GiVM3VdnFfc1jAv7m7D_Lx6KVTl-nP933yLJWt7cNvOsLpIGywEqJQI9dtUnPL4cxGnrVQVluO527AH8whHIg7Yo")' }}></div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Morgan</p>
            <p className="text-xs text-[#92a4c9] truncate">Editor Senior</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;