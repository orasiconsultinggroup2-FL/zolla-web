
import React, { useState, useRef } from 'react';
import { Campaign } from '../types';
import { Settings as SettingsIcon, Save, RefreshCcw, Calendar, User, Target, Database, Upload, Download, FileJson } from 'lucide-react';

interface Props {
  campaign: Campaign;
  onUpdateCampaign: (updated: Campaign) => void;
}

const Settings: React.FC<Props> = ({ campaign, onUpdateCampaign }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: campaign.name,
    startDate: campaign.startDate,
    consultantName: campaign.config?.consultantName || '',
    targetMarket: campaign.config?.targetMarket || '',
    globalGoal: campaign.config?.globalGoal || ''
  });

  const handleSave = () => {
    onUpdateCampaign({
      ...campaign,
      name: formData.name,
      startDate: formData.startDate,
      config: {
        consultantName: formData.consultantName,
        targetMarket: formData.targetMarket,
        globalGoal: formData.globalGoal
      }
    });
    alert('Configuración de campaña actualizada con éxito.');
  };

  const handleExportFull = () => {
    const data = JSON.stringify(campaign, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PROYECTO_GIC_${campaign.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.id && imported.days) {
          onUpdateCampaign(imported);
          alert('Proyecto cargado correctamente. El sistema se ha sincronizado.');
        } else {
          alert('Error: El archivo no parece ser un proyecto GIC válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <SettingsIcon className="w-5 h-5" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">Mando de Configuración</span>
          </div>
          <h2 className="text-4xl font-geometric font-bold tracking-tight text-slate-900">Ajustes de Campaña</h2>
        </div>
        
        <div className="flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden" 
          />
          <button 
            onClick={handleImportClick}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-slate-50 shadow-sm transition-all"
          >
            <Upload className="w-3.5 h-3.5" /> Cargar Proyecto
          </button>
          <button 
            onClick={handleExportFull}
            className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-slate-800 shadow-lg transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Respaldar Todo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Database className="w-4 h-4" /> Datos de Identidad
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-bold uppercase text-slate-400 mb-1.5 block">Nombre del Proyecto</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase text-slate-400 mb-1.5 block">Consultor Responsable</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre profesional..."
                  value={formData.consultantName}
                  onChange={(e) => setFormData({...formData, consultantName: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Cronología
            </h3>
            <div>
              <label className="text-[9px] font-bold uppercase text-slate-400 mb-1.5 block">Fecha de Lanzamiento</label>
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-semibold"
              />
              <p className="text-[10px] text-slate-400 mt-3 italic">Esto recalculará las fechas automáticas en tu bitácora.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2">
              <Target className="w-4 h-4" /> Objetivo Estratégico
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-bold uppercase text-slate-500 mb-1.5 block">Mercado Objetivo (Buyer Persona)</label>
                <textarea 
                  placeholder="Ej: Directores comerciales de empresas de software..."
                  value={formData.targetMarket}
                  onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm h-24 resize-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase text-slate-500 mb-1.5 block">Meta Global de Conversión</label>
                <input 
                  type="text" 
                  placeholder="Ej: 5 Ventas High-Ticket"
                  value={formData.globalGoal}
                  onChange={(e) => setFormData({...formData, globalGoal: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Save className="w-4 h-4" /> Guardar y Aplicar Ajustes
            </button>
          </div>

          <div className="p-8 bg-blue-50/30 border border-blue-100 rounded-[2rem] space-y-4">
             <div className="flex items-center gap-3">
                <FileJson className="w-5 h-5 text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900">Transferencia de Poder</span>
             </div>
             <p className="text-xs text-blue-800 leading-relaxed italic">
               Para que otra persona use esta configuración exacta, haz clic en <strong>"Respaldar Todo"</strong> y envíale el archivo generado. Ella podrá cargarlo usando <strong>"Cargar Proyecto"</strong> y continuar la ejecución sin perder ni un solo dato.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
