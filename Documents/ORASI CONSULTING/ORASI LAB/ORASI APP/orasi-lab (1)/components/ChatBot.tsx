import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Format history for API
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const responseText = await getChatResponse(history, userMsg.text);
      
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
        console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Error conectando con la IA.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-surface-dark border border-border-dark rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="p-4 bg-[#111722] border-b border-border-dark flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
              <h3 className="font-bold text-white">Asistente IA</h3>
            </div>
            <button onClick={toggleChat} className="text-[#92a4c9] hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-background-dark/50">
            {messages.length === 0 && (
               <div className="text-center text-[#92a4c9] text-sm mt-10">
                  <p>¿En qué puedo ayudarte con tu contenido hoy?</p>
               </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-[#232f48] text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-[#232f48] px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-[#111722] border-t border-border-dark">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregunta sobre contenido..."
                className="w-full bg-[#1a1d24] text-white text-sm rounded-xl border border-border-dark pl-4 pr-10 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 p-1 text-primary hover:text-white disabled:text-gray-600 transition-colors"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="size-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'expand_more' : 'chat_bubble'}
        </span>
      </button>
    </div>
  );
};

export default ChatBot;