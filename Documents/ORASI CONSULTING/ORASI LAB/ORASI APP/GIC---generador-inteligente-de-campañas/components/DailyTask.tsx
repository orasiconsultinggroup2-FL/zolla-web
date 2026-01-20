
import React, { useState, useMemo } from 'react';
import { Campaign, CampaignDay } from '../types';
import { 
  CheckCircle2, Copy, Image as ImageIcon, Loader2, 
  Eye, EyeOff, ExternalLink, Sparkles, BarChart3, 
  MessageSquareText, BrainCircuit, Wand2, 
  ChevronDown, ChevronUp, ChevronLeft, Target, CalendarDays,
  Linkedin, Instagram, Heart, MessageCircle, Share2, Send, Bookmark, MoreHorizontal,
  Lock, AlertTriangle, ShieldCheck, RefreshCcw, AlertOctagon, Zap, ShieldAlert,
  ThumbsUp, MessageSquare, Repeat, Send as SendIcon, Plus, Globe, Trophy,
  Phone, Check, Search, Camera, Mic, Paperclip, Smile, ShieldX, Sword, Facebook
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { generateCampaignContent } from '../services/geminiService';

interface Props {
  campaign: Campaign;
  onPublished: (platform: string) => void;
  goToAnalytics: () => void;
  onUpdateAI: (day: number, copy?: string, imageUrl?: string) => void;
}

const DailyTask: React.FC<Props> = ({ campaign, onPublished, goToAnalytics, onUpdateAI }) => {
  const currentDayData: CampaignDay = campaign.days[campaign.currentDay - 1];
  const [copied, setCopied] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [userContext, setUserContext] = useState('');
  
  const platforms = useMemo(() => {
    return currentDayData.channel.split(/[/,]/).map(s => s.trim());
  }, [currentDayData.channel]);

  const [previewPlatform, setPreviewPlatform] = useState<string>(platforms[0]?.toLowerCase() || 'linkedin');
  
  const isFutureDay = campaign.currentDay > (campaign.realCurrentDay || 1);
  const isPublished = currentDayData.published || false;

  const pendingDays = useMemo(() => {
    return campaign.days
      .filter(d => d.day < campaign.currentDay && !d.published)
      .map(d => d.day);
  }, [campaign.days, campaign.currentDay]);

  const hasPendingMissions = pendingDays.length > 0;

  const getDisplayDate = () => {
    const start = new Date(campaign.startDate + 'T00:00:00');
    start.setDate(start.getDate() + (campaign.currentDay - 1));
    return start.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const handleGenerateCopy = async () => {
    if (isFutureDay || hasPendingMissions) return;
    setAiLoading(true);
    try {
      const content = await generateCampaignContent(
        campaign.name,
        currentDayData.phase,
        campaign.currentDay,
        currentDayData.theme,
        currentDayData.channel,
        currentDayData.postType,
        userContext
      );
      onUpdateAI(campaign.currentDay, content, undefined);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const generateImage = async () => {
    if (isFutureDay || hasPendingMissions) return;
    setLoadingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Elite professional consulting editorial photography for Facebook/LinkedIn. Theme: ${currentDayData.theme}. Corporate dark theme, professional lighting, 8k resolution.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } },
      });
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const b64 = `data:image/png;base64,${part.inlineData.data}`;
          onUpdateAI(campaign.currentDay, undefined, b64);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleCopy = () => {
    if (currentDayData.generatedCopy) {
      navigator.clipboard.writeText(currentDayData.generatedCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePublishPlatform = (platform: string) => {
    if (isFutureDay || hasPendingMissions) return;
    const pLower = platform.toLowerCase();
    const encodedCopy = encodeURIComponent(currentDayData.generatedCopy || '');
    let url = pLower.includes('linkedin') 
      ? `https://www.linkedin.com/feed/?shareActive=true&text=${encodedCopy}` 
      : pLower.includes('instagram')
        ? `https://www.instagram.com/`
        : pLower.includes('facebook')
          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedCopy}`
          : `https://wa.me/?text=${encodedCopy}`;

    window.open(url, '_blank');
    onPublished(platform);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {hasPendingMissions && !isFutureDay && (
        <div className="bg-red-600 p-1.5 rounded-[4rem] shadow-2xl animate-in zoom-in-95 duration-500">
           <div className="bg-white p-12 rounded-[3.8rem] flex flex-col md:flex-row items-center gap-12 border-4 border-red-600">
              <div className="p-7 bg-red-600 text-white rounded-[2.5rem] shadow-xl shrink-0">
                 <ShieldX className="w-16 h-16 animate-pulse" />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                 <h4 className="font-black text-red-600 uppercase tracking-tighter text-5xl">PROTOCOLO BLOQUEADO</h4>
                 <p className="text-slate-900 text-2xl font-bold leading-tight">
                    Brechas críticas detectadas en los días: <span className="text-red-600 underline decoration-4">{pendingDays.join(', ')}</span>.
                 </p>
                 <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Sword className="w-4 h-4 text-red-400" />
                    <p className="text-slate-500 text-sm font-semibold italic">
                      Debes marcar como "Publicados" estos días en la 'Estrategia Core' para rehabilitar la IA hoy.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className={`p-10 rounded-[3rem] border shadow-sm relative overflow-hidden transition-all duration-700 ${isFutureDay || hasPendingMissions ? 'bg-slate-50 opacity-40 pointer-events-none grayscale' : isPublished ? 'bg-green-600 text-white border-green-500 shadow-green-600/20' : 'bg-white border-gray-100'}`}>
        {isPublished && (
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
             <Trophy className="w-40 h-40" />
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm ${isPublished ? 'bg-white text-green-600' : 'bg-blue-600 text-white animate-pulse'}`}>
                   {isPublished ? 'Sincronizado' : `Objetivo Día ${campaign.currentDay}`}
                 </span>
                 <span className={`text-[10px] font-bold uppercase tracking-widest border-l pl-3 ${isPublished ? 'text-white/60 border-white/20' : 'text-gray-400 border-gray-100'}`}>{getDisplayDate()}</span>
              </div>
              <h1 className="text-5xl font-geometric font-extrabold tracking-tight leading-tight">{currentDayData.theme}</h1>
              <div className="flex items-center gap-6">
                 <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${isPublished ? 'text-white/80' : 'text-slate-500'}`}>
                   <Target className={`w-3 h-3 ${isPublished ? 'text-white' : 'text-blue-500'}`} /> {currentDayData.phase}
                 </div>
                 <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${isPublished ? 'text-white/80' : 'text-slate-500'}`}>
                   <MessageSquareText className={`w-3 h-3 ${isPublished ? 'text-white' : 'text-purple-500'}`} /> {currentDayData.channel}
                 </div>
              </div>
           </div>
           
           {!isFutureDay && !isPublished && !hasPendingMissions && (
             <div className="flex flex-col gap-3 min-w-[250px]">
                <button 
                  onClick={generateImage} 
                  disabled={loadingImage}
                  className="px-6 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                  {loadingImage ? <Loader2 className="w-5 h-5 animate-spin text-blue-500" /> : <ImageIcon className="w-5 h-5 text-slate-400" />}
                  Generar Asset Visual
                </button>
                <button 
                  onClick={handleGenerateCopy} 
                  disabled={aiLoading}
                  className="px-6 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                >
                  {aiLoading ? <Loader2 className="w-5 h-5 animate-spin text-blue-500" /> : <Sparkles className="w-5 h-5 text-blue-500 fill-current" />}
                  Ejecutar IA de Texto
                </button>
             </div>
           )}
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 transition-all duration-700 ${isFutureDay || hasPendingMissions ? 'opacity-20 pointer-events-none' : ''}`}>
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-950 rounded-[3rem] overflow-hidden aspect-square shadow-2xl border border-white/5 relative group">
              {currentDayData.imageUrl ? (
                <img src={currentDayData.imageUrl} alt="Asset" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white/20">
                   <ImageIcon className="w-16 h-16 mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.3em]">IA Visual Ready</p>
                </div>
              )}
           </div>

           <div className={`p-10 rounded-[3rem] border transition-all duration-500 space-y-8 ${!isPublished ? 'bg-white border-slate-100 shadow-sm' : 'bg-green-600 text-white border-green-500 shadow-2xl'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <ShieldCheck className={`w-6 h-6 ${isPublished ? 'text-white' : 'text-blue-500'}`} />
                   <span className={`text-[12px] font-black uppercase tracking-widest ${isPublished ? 'text-white' : 'text-slate-900'}`}>Protocolo Lanzamiento</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {platforms.map(p => {
                  const isDone = currentDayData.publishedPlatforms?.some(pp => pp.toLowerCase().includes(p.toLowerCase()));
                  const showAlarm = !isDone && !isFutureDay && currentDayData.generatedCopy;

                  return (
                    <button 
                      key={p}
                      onClick={() => handlePublishPlatform(p)}
                      disabled={!currentDayData.generatedCopy || isDone}
                      className={`w-full p-6 rounded-3xl font-black uppercase tracking-widest text-[11px] flex items-center justify-between transition-all border-2 relative overflow-hidden active:scale-95 ${
                        isDone 
                          ? 'bg-white text-green-600 border-white cursor-default shadow-lg' 
                          : showAlarm
                            ? 'bg-blue-600 text-white border-blue-400 hover:bg-blue-700 shadow-2xl animate-pulse'
                            : 'bg-white text-slate-900 border-slate-100 hover:border-blue-500 shadow-sm disabled:opacity-20'
                      }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                         <div className={`p-2.5 rounded-xl ${isDone ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                            {p.toLowerCase().includes('linkedin') ? <Linkedin className="w-4 h-4" /> : p.toLowerCase().includes('instagram') ? <Instagram className="w-4 h-4" /> : p.toLowerCase().includes('facebook') ? <Facebook className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                         </div>
                         <div className="flex flex-col items-start">
                            <span className="text-[8px] opacity-60 uppercase mb-0.5">{isDone ? 'Misión Sincronizada' : 'Publicar en'}</span>
                            <span className="text-sm font-black">{p.toUpperCase()}</span>
                         </div>
                      </div>
                      {isDone ? <CheckCircle2 className="w-6 h-6" /> : <ExternalLink className="w-6 h-6 text-slate-300" />}
                    </button>
                  );
                })}
              </div>

              {isPublished && (
                <div className="pt-6 border-t border-white/10">
                   <button 
                     onClick={goToAnalytics}
                     className="w-full py-6 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 hover:bg-slate-50 shadow-2xl active:scale-95 transition-all"
                   >
                     <BarChart3 className="w-5 h-5" /> Registrar KPIs Diarios
                   </button>
                </div>
              )}
           </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between border-b border-slate-100 pb-8">
              <div className="flex items-center gap-5">
                 <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-2xl">
                    <Eye className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Laboratorio de Preview</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Detección de impacto multi-canal</p>
                 </div>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner overflow-hidden">
                 {platforms.map(p => (
                   <button 
                     key={p}
                     onClick={() => setPreviewPlatform(p.toLowerCase())}
                     className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewPlatform === p.toLowerCase() ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                      {p.toLowerCase().includes('linkedin') ? <Linkedin className="w-3 h-3" /> : p.toLowerCase().includes('instagram') ? <Instagram className="w-3 h-3" /> : p.toLowerCase().includes('facebook') ? <Facebook className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                      {p}
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex flex-col items-center py-4 min-h-[600px]">
              {previewPlatform.includes('linkedin') ? (
                <div className="bg-white border border-[#EBEBEB] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] rounded-lg w-full max-w-[555px] overflow-hidden font-sans">
                   <div className="p-3 px-4 flex items-start justify-between">
                      <div className="flex gap-2">
                         <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-blue-400 to-blue-700 shrink-0">
                            <div className="w-full h-full rounded-full bg-white p-[1px]">
                               <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">OL</div>
                            </div>
                         </div>
                         <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                               <span className="text-sm font-semibold text-[rgba(0,0,0,0.9)] hover:text-blue-700 hover:underline cursor-pointer">ORASI Lab • Consulting Group</span>
                               <span className="text-[11px] text-[rgba(0,0,0,0.6)] font-normal">• 1.º</span>
                            </div>
                            <span className="text-[11px] text-[rgba(0,0,0,0.6)] font-normal leading-tight">Arquitectura de Decisión para CEOs y Líderes de Mercado</span>
                            <div className="flex items-center gap-1 text-[11px] text-[rgba(0,0,0,0.6)] font-normal mt-0.5">
                               <span>Justo ahora</span>
                               <span>•</span>
                               <Globe className="w-3 h-3" />
                            </div>
                         </div>
                      </div>
                      <button className="flex items-center gap-1 text-[#0a66c2] hover:bg-[#0a66c214] px-2.5 py-1 rounded transition-colors font-semibold">
                         <Plus className="w-4 h-4" />
                         <span className="text-sm">Seguir</span>
                      </button>
                   </div>
                   <div className="px-4 pb-3 text-sm text-[rgba(0,0,0,0.9)] whitespace-pre-wrap leading-normal font-normal">
                      {currentDayData.generatedCopy || "En espera de arquitectura de copy..."}
                   </div>
                   {currentDayData.imageUrl && (
                     <div className="w-full bg-[#f3f6f8] relative overflow-hidden border-y border-[#EBEBEB]">
                        <img src={currentDayData.imageUrl} alt="LinkedIn Asset" className="w-full h-auto block" />
                     </div>
                   )}
                   <div className="px-4 py-2 border-b border-[#EBEBEB] flex items-center justify-between">
                      <div className="flex items-center gap-1">
                         <div className="flex -space-x-1">
                            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white shadow-sm"><ThumbsUp className="w-2.5 h-2.5 text-white" /></div>
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border border-white shadow-sm"><Repeat className="w-2.5 h-2.5 text-white" /></div>
                            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white shadow-sm"><Heart className="w-2.5 h-2.5 text-white" /></div>
                         </div>
                         <span className="text-[11px] text-[rgba(0,0,0,0.6)] ml-1">Tú y 84 personas más</span>
                      </div>
                      <div className="text-[11px] text-[rgba(0,0,0,0.6)]">
                         <span>12 comentarios</span>
                         <span className="mx-1">•</span>
                         <span>4 veces compartido</span>
                      </div>
                   </div>
                   <div className="px-2 py-1 flex justify-between">
                      <LinkedInAction icon={<ThumbsUp className="w-5 h-5" />} label="Recomendar" />
                      <LinkedInAction icon={<MessageSquare className="w-5 h-5" />} label="Comentar" />
                      <LinkedInAction icon={<Repeat className="w-5 h-5" />} label="Compartir" />
                      <LinkedInAction icon={<SendIcon className="w-5 h-5" />} label="Enviar" />
                   </div>
                   <div className="p-4 bg-blue-50/40 border-t border-blue-100 flex justify-center">
                      <button onClick={handleCopy} className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest flex items-center gap-3 bg-white px-8 py-3 rounded-full border border-blue-200 shadow-sm transition-all hover:scale-105 active:scale-95">
                        {copied ? 'PIEZA COPIADA' : 'COPIAR ARQUITECTURA'} <Copy className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ) : previewPlatform.includes('facebook') ? (
                /* FACEBOOK FEED IMITATION */
                <div className="bg-white border border-[#dddfe2] shadow-xl rounded-xl w-full max-w-[500px] overflow-hidden font-sans">
                   <div className="p-3 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">OL</div>
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-[#1c1e21] hover:underline cursor-pointer">ORASI Consulting Group</span>
                         <div className="flex items-center gap-1 text-[12px] text-[#606770] font-normal">
                            <span>Publicidad</span>
                            <span>•</span>
                            <Globe className="w-3 h-3" />
                         </div>
                      </div>
                   </div>
                   <div className="px-4 pb-3 text-[14px] text-[#1c1e21] leading-normal font-normal">
                      {currentDayData.generatedCopy || "Preparando despliegue en Facebook..."}
                   </div>
                   {currentDayData.imageUrl && (
                     <div className="w-full bg-[#f0f2f5] border-y border-[#dddfe2]">
                        <img src={currentDayData.imageUrl} alt="FB Asset" className="w-full h-auto" />
                     </div>
                   )}
                   <div className="px-4 py-3 border-b border-[#ebedf0] flex items-center justify-between text-[#606770] text-[13px]">
                      <div className="flex items-center gap-1">
                         <div className="w-4 h-4 rounded-full bg-[#1877f2] flex items-center justify-center shadow-sm">
                            <ThumbsUp className="w-2.5 h-2.5 text-white" />
                         </div>
                         <span>125</span>
                      </div>
                      <div className="flex gap-2">
                         <span>18 comentarios</span>
                         <span>5 veces compartido</span>
                      </div>
                   </div>
                   <div className="px-2 py-1 flex justify-between">
                      <FacebookAction icon={<ThumbsUp className="w-4 h-4" />} label="Me gusta" />
                      <FacebookAction icon={<MessageSquare className="w-4 h-4" />} label="Comentar" />
                      <FacebookAction icon={<Share2 className="w-4 h-4" />} label="Compartir" />
                   </div>
                   <div className="p-4 bg-blue-50/20 border-t border-slate-100 flex justify-center">
                      <button onClick={handleCopy} className="w-full py-4 bg-[#1877f2] text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#166fe5] transition-all">
                        {copied ? '¡PIEZA COPIADA!' : 'COPIAR PARA FACEBOOK'}
                      </button>
                   </div>
                </div>
              ) : previewPlatform.includes('instagram') ? (
                <div className="bg-white border border-slate-200 shadow-2xl rounded-[3rem] w-full max-w-[450px] overflow-hidden font-sans">
                   <div className="p-4 px-6 flex items-center justify-between border-b border-slate-50">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                            <div className="w-full h-full rounded-full bg-white p-[1px]">
                               <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">OL</div>
                            </div>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">orasi.lab</span>
                            <span className="text-[10px] text-slate-500">Publicidad</span>
                         </div>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-slate-900" />
                   </div>
                   <div className="w-full aspect-square bg-slate-950 relative">
                      {currentDayData.imageUrl ? (
                        <img src={currentDayData.imageUrl} alt="Asset" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                           <ImageIcon className="w-10 h-10 mb-2" />
                        </div>
                      )}
                   </div>
                   <div className="p-5 px-6 space-y-4">
                      <div className="flex justify-between items-center">
                         <div className="flex gap-5 text-slate-900">
                           <Heart className="w-7 h-7 hover:text-red-500 transition-colors cursor-pointer" />
                           <MessageCircle className="w-7 h-7 cursor-pointer" />
                           <Send className="w-7 h-7 cursor-pointer" />
                         </div>
                         <Bookmark className="w-7 h-7 cursor-pointer" />
                      </div>
                      <div className="text-sm text-slate-800 leading-snug">
                         <p className="font-bold text-slate-900 mb-1">94 likes</p>
                         <span className="font-bold mr-2 text-slate-900">orasi.lab</span>
                         {currentDayData.generatedCopy || "..."}
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Hace 2 horas</p>
                   </div>
                   <div className="p-4 px-8 border-t border-slate-100 flex justify-center">
                      <button onClick={handleCopy} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all">
                        {copied ? '¡LISTO!' : 'COPIAR CAPTION'}
                      </button>
                   </div>
                </div>
              ) : (
                <div className="bg-[#E5DDD5] border-8 border-slate-900 shadow-2xl rounded-[3.5rem] w-full max-w-[380px] h-[650px] overflow-hidden flex flex-col font-sans">
                   <div className="bg-[#075E54] p-4 pt-10 text-white flex items-center justify-between shadow-md shrink-0">
                      <div className="flex items-center gap-3">
                         <ChevronLeft className="w-6 h-6" />
                         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-xs">OL</div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm">ORASI • Mando</span>
                            <span className="text-[10px] text-white/70 italic">en línea</span>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <Phone className="w-5 h-5" />
                         <MoreHorizontal className="w-5 h-5 rotate-90" />
                      </div>
                   </div>
                   <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar relative" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'contain' }}>
                      <div className="flex justify-center mb-4">
                         <span className="bg-[#D1E9FF] text-[#1E2E3E] text-[10px] px-3 py-1 rounded-md font-medium uppercase shadow-sm">Hoy</span>
                      </div>
                      
                      <div className="flex justify-start max-w-[85%]">
                         <div className="bg-white p-2.5 rounded-2xl rounded-tl-none shadow-sm relative group">
                            {currentDayData.imageUrl && (
                              <img src={currentDayData.imageUrl} className="w-full rounded-lg mb-2" alt="WA" />
                            )}
                            <p className="text-sm text-[#303030] leading-normal whitespace-pre-wrap px-1">
                               {currentDayData.generatedCopy || "Esperando mensaje táctico..."}
                            </p>
                            <div className="flex justify-end items-center gap-1 mt-1">
                               <span className="text-[10px] text-[#00000073]">11:42</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="bg-[#F0F0F0] p-3 flex items-center gap-3 shrink-0">
                      <Smile className="w-6 h-6 text-[#919191]" />
                      <Paperclip className="w-6 h-6 text-[#919191]" />
                      <div className="flex-1 bg-white p-2 px-4 rounded-full text-sm text-[#919191] border border-white">
                         Escribe un mensaje
                      </div>
                      <Mic className="w-6 h-6 text-[#919191]" />
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

const LinkedInAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex flex-1 items-center justify-center gap-1.5 py-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors">
     <span className="text-[rgba(0,0,0,0.6)]">{icon}</span>
     <span className="text-[13px] font-semibold text-[rgba(0,0,0,0.6)]">{label}</span>
  </button>
);

const FacebookAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex flex-1 items-center justify-center gap-1.5 py-2 rounded-md hover:bg-slate-100 transition-colors">
     <span className="text-[#606770]">{icon}</span>
     <span className="text-[13px] font-semibold text-[#606770]">{label}</span>
  </button>
);

export default DailyTask;
