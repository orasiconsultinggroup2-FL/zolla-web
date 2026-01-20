import React, { useState } from 'react';
import { MOCK_USERS } from '../mockData';
import { User, UserBelt } from '../types';
import { RefreshCw, Shield, Save, User as UserIcon } from 'lucide-react';

interface SettingsProps {
    currentUser: User;
    onUserChange: (u: User) => void;
}

export const Settings: React.FC<SettingsProps> = ({ currentUser, onUserChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
      name: currentUser.name,
      company: currentUser.company || 'Orasi Corp',
      avatarUrl: currentUser.avatarUrl
  });

  const handleSave = () => {
      // In a real app, update backend. Here just toggle mode.
      setEditMode(false);
      // Simulate update locally for UI
      currentUser.name = formData.name;
      currentUser.company = formData.company;
      alert('Perfil actualizado correctamente.');
  };

  return (
    <div className="space-y-6">
        {/* Branding Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 flex flex-col items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Mi Perfil</h2>
              <p className="text-[#7F7F7E]">Gestión de cuenta y preferencias.</p>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="relative">
                    <img src={`https://ui-avatars.com/api/?name=${formData.name}&size=128&background=random`} alt="User" className="w-32 h-32 rounded-full shadow-md" />
                 </div>
                 
                 <div className="flex-1 w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                            <input 
                                disabled={!editMode}
                                className="w-full p-3 border border-slate-200 rounded-lg disabled:bg-slate-50 disabled:text-slate-500"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
                            <input 
                                disabled
                                className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                                value={currentUser.email}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Empresa / Equipo</label>
                            <input 
                                disabled={!editMode}
                                className="w-full p-3 border border-slate-200 rounded-lg disabled:bg-slate-50 disabled:text-slate-500"
                                value={formData.company}
                                onChange={e => setFormData({...formData, company: e.target.value})}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Rol (Sistema)</label>
                            <input 
                                disabled
                                className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                                value={currentUser.role}
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-slate-50 to-[#E5F5FB] p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="bg-[#009BDA] p-2 rounded-full text-white">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs text-[#009BDA] font-bold uppercase">Cinturón Actual</div>
                                <div className="text-lg font-bold text-slate-900">{currentUser.belt}</div>
                            </div>
                         </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        {!editMode ? (
                            <button onClick={() => setEditMode(true)} className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-50">
                                Editar Perfil
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button onClick={() => setEditMode(false)} className="text-slate-500 hover:text-slate-800 font-medium">Cancelar</button>
                                <button onClick={handleSave} className="bg-[#009BDA] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#007CAE] flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Guardar Cambios
                                </button>
                            </div>
                        )}
                    </div>
                 </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mt-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#009BDA]" /> Simulación de Usuario (Modo Demo)
            </h3>
            <p className="text-sm text-slate-500 mb-6">Cambie de usuario para experimentar la aplicación con diferentes roles y permisos.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_USERS.map(u => (
                    <button 
                        key={u.id}
                        onClick={() => {
                            onUserChange(u);
                            setFormData({ name: u.name, company: u.company || 'Orasi', avatarUrl: '' });
                            setEditMode(false);
                        }}
                        className={`text-left p-4 rounded-lg border transition-all ${
                            currentUser.id === u.id 
                            ? 'border-[#009BDA] bg-[#E5F5FB] ring-1 ring-[#009BDA]' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500 flex justify-between mt-1">
                            <span>{u.role}</span>
                            <span className="font-medium text-[#009BDA]">{u.belt}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};