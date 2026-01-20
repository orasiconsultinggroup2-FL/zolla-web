
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Cover from './components/Cover';
import CampaignHub from './components/CampaignHub';
import DailyTask from './components/DailyTask';
import AutoAwesome from './components/AutoAwesome';
import DailyAnalytics from './components/DailyAnalytics';
import AnalyticsHistory from './components/AnalyticsHistory';
import Manual from './components/Manual';
import Settings from './components/Settings';
import { Campaign, ViewType, HistoryEntry } from './types';
import { pilotCampaign } from './data/pilotData';
import { ChevronLeft, ChevronRight, Zap, CalendarDays } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('cover');
  
  const calculateRealDay = (startDate: string): number => {
    const start = new Date(startDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1);
  };

  const [campaign, setCampaign] = useState<Campaign>(() => {
    const saved = localStorage.getItem('gic_campaign');
    let baseCampaign = pilotCampaign;
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        baseCampaign = { ...pilotCampaign, ...parsed };
      } catch (e) {
        baseCampaign = pilotCampaign;
      }
    }

    const realDay = calculateRealDay(baseCampaign.startDate);
    return { 
      ...baseCampaign, 
      currentDay: Math.min(realDay, baseCampaign.totalDays),
      realCurrentDay: realDay 
    };
  });

  useEffect(() => {
    const realDay = calculateRealDay(campaign.startDate);
    if (campaign.realCurrentDay !== realDay) {
      setCampaign(prev => ({ ...prev, realCurrentDay: realDay }));
    }
  }, [campaign.startDate]);

  useEffect(() => {
    localStorage.setItem('gic_campaign', JSON.stringify(campaign));
  }, [campaign]);

  const updateCampaign = (updated: Campaign) => {
    const realDay = calculateRealDay(updated.startDate);
    setCampaign({
      ...updated,
      realCurrentDay: realDay,
      currentDay: Math.min(realDay, updated.totalDays)
    });
  };

  const updateDayAI = (day: number, copy?: string, imageUrl?: string) => {
    setCampaign(prev => {
      const newDays = [...prev.days];
      newDays[day - 1] = {
        ...newDays[day - 1],
        ...(copy !== undefined && { generatedCopy: copy }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl })
      };
      return { ...prev, days: newDays };
    });
  };

  const handlePublished = (platform: string, dayNum?: number) => {
    setCampaign(prev => {
        const targetDay = dayNum || prev.currentDay;
        const newDays = [...prev.days];
        const dayIdx = targetDay - 1;
        const dayData = newDays[dayIdx];
        
        let newPublishedPlatforms = [...(dayData.publishedPlatforms || [])];
        if (newPublishedPlatforms.some(p => p.toLowerCase() === platform.toLowerCase())) {
          newPublishedPlatforms = newPublishedPlatforms.filter(p => p.toLowerCase() !== platform.toLowerCase());
        } else {
          newPublishedPlatforms.push(platform);
        }

        const requiredPlatforms = dayData.channel.split(/[/,]/).map(s => s.trim().toLowerCase());
        const allDone = requiredPlatforms.every(p => 
          newPublishedPlatforms.some(np => np.toLowerCase().includes(p))
        );

        newDays[dayIdx] = {
            ...dayData,
            publishedPlatforms: newPublishedPlatforms,
            published: allDone
        };

        return { ...prev, days: newDays };
    });
  };

  const updateMetric = (val: number) => {
    setCampaign(prev => {
        const newDays = [...prev.days];
        newDays[prev.currentDay - 1] = {
            ...newDays[prev.currentDay - 1],
            actualValue: val
        };
        return { ...prev, days: newDays };
    });
  };

  const saveToHistory = (entry: HistoryEntry) => {
    setCampaign(prev => {
        const newHistory = prev.history ? [...prev.history] : [];
        const filteredHistory = newHistory.filter(h => h.day !== entry.day);
        const newDays = [...prev.days];
        
        if (!newDays[entry.day - 1].published) {
          newDays[entry.day - 1].published = true;
        }

        return { 
            ...prev, 
            days: newDays,
            history: [entry, ...filteredHistory].sort((a, b) => b.day - a.day) 
        };
    });
  };

  const nextDay = () => {
    if (campaign.currentDay < campaign.totalDays && campaign.currentDay < (campaign.realCurrentDay || 1)) {
      setCampaign(prev => ({ ...prev, currentDay: prev.currentDay + 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (campaign.currentDay >= (campaign.realCurrentDay || 1)) {
      alert("Acceso denegado: No puedes viajar al futuro. Espera a mañana para la siguiente misión.");
    }
  };

  const prevDay = () => {
    if (campaign.currentDay > 1) {
      setCampaign(prev => ({ ...prev, currentDay: prev.currentDay - 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToDay = (day: number) => {
    if (day > (campaign.realCurrentDay || 1)) {
        alert("Bloqueo de Cronograma: Ese día aún no ha llegado.");
        return;
    }
    setCampaign(prev => ({ ...prev, currentDay: day }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetCampaign = () => {
    if (window.confirm('¿Deseas reiniciar la ejecución? Se perderán todos los datos actuales.')) {
        const realDay = calculateRealDay(pilotCampaign.startDate);
        setCampaign({ 
          ...pilotCampaign, 
          currentDay: Math.min(realDay, pilotCampaign.totalDays), 
          history: [],
          realCurrentDay: realDay
        });
        setView('cover');
        localStorage.removeItem('gic_campaign');
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={view} setView={setView} campaign={campaign} />
      
      <div className="flex-1 ml-64 min-h-screen flex flex-col overflow-hidden">
        <main className={`flex-1 ${view === 'cover' ? '' : 'container mx-auto px-10 py-12 max-w-6xl'}`}>
          {view === 'cover' && <Cover campaign={campaign} setView={setView} />}
          {view === 'hub' && (
            <CampaignHub 
              campaign={campaign} 
              onSelectDay={goToDay} 
              setView={setView} 
              onManualTogglePublish={(day, platform) => handlePublished(platform, day)}
            />
          )}
          {view === 'tasks' && (
            <DailyTask 
              campaign={campaign} 
              onPublished={handlePublished} 
              goToAnalytics={() => setView('analytics')} 
              onUpdateAI={updateDayAI} 
            />
          )}
          {view === 'creative' && <AutoAwesome campaign={campaign} />}
          {view === 'analytics' && <DailyAnalytics campaign={campaign} onUpdateMetric={updateMetric} onSaveHistory={saveToHistory} />}
          {view === 'history' && <AnalyticsHistory campaign={campaign} />}
          {view === 'settings' && <Settings campaign={campaign} onUpdateCampaign={updateCampaign} />}
          {view === 'manual' && <Manual />}
        </main>

        <div className="fixed bottom-6 right-10 flex items-center gap-2 p-1.5 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-40">
          <div className="px-4 py-2 border-r border-white/5 mr-2">
             <div className="flex items-center gap-2 mb-0.5">
                <CalendarDays className="w-3 h-3 text-blue-500" />
                <span className="text-[9px] uppercase text-blue-500 font-bold tracking-widest">Navegación Táctica</span>
             </div>
             <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold text-white">Día {campaign.currentDay}</span>
                {campaign.currentDay !== campaign.realCurrentDay && (
                   <span className="text-[8px] font-bold text-slate-500 uppercase">Hoy es D{campaign.realCurrentDay}</span>
                )}
             </div>
          </div>
          <button 
              onClick={prevDay} 
              disabled={campaign.currentDay === 1} 
              className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all disabled:opacity-20 active:scale-90"
          >
              <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
              onClick={nextDay} 
              disabled={campaign.currentDay >= (campaign.realCurrentDay || 1) || campaign.currentDay === campaign.totalDays} 
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none active:scale-90"
          >
              <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={resetCampaign} 
            className="ml-2 px-4 text-[9px] uppercase font-bold text-slate-500 hover:text-red-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
