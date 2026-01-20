import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';

const ImageStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt) return;
    setIsProcessing(true);
    try {
      const resultImage = await editImage(selectedImage, prompt);
      if (resultImage) {
        setSelectedImage(resultImage);
      } else {
        alert("No se pudo generar la edición de la imagen.");
      }
    } catch (error) {
      console.error(error);
      alert("Error procesando la imagen.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-dark p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">Estudio de Imagen</h1>
           <p className="text-text-secondary">Edita imágenes usando instrucciones en lenguaje natural potenciadas por Gemini.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
           {/* Controls */}
           <div className="lg:col-span-1 bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col gap-6">
              <div>
                 <label className="block text-sm font-medium text-white mb-2">1. Subir Imagen</label>
                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="border-2 border-dashed border-border-dark hover:border-primary rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#111722]"
                 >
                    <span className="material-symbols-outlined text-4xl text-[#92a4c9] mb-2">cloud_upload</span>
                    <span className="text-sm text-[#92a4c9]">Clic para subir</span>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                 </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                 <label className="block text-sm font-medium text-white mb-2">2. Instrucción</label>
                 <textarea 
                   className="w-full flex-1 bg-[#111722] border border-border-dark rounded-lg p-3 text-white text-sm focus:ring-primary focus:border-primary resize-none"
                   placeholder="Ej: 'Haz que parezca un boceto a lápiz', 'Añade una puesta de sol al fondo'..."
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                 ></textarea>
              </div>

              <button 
                onClick={handleEdit}
                disabled={!selectedImage || !prompt || isProcessing}
                className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                   <>
                     <span className="material-symbols-outlined animate-spin">progress_activity</span>
                     Procesando...
                   </>
                ) : (
                   <>
                     <span className="material-symbols-outlined">auto_fix</span>
                     Generar Edición
                   </>
                )}
              </button>
           </div>

           {/* Preview */}
           <div className="lg:col-span-2 bg-[#111722] border border-border-dark rounded-xl flex items-center justify-center relative overflow-hidden group">
              {!selectedImage ? (
                  <div className="text-center">
                     <span className="material-symbols-outlined text-6xl text-[#232f48] mb-4">image</span>
                     <p className="text-[#5e6e8c]">Ninguna imagen seleccionada</p>
                  </div>
              ) : (
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain"
                  />
              )}
              {selectedImage && (
                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setSelectedImage(null)} className="p-2 bg-black/50 text-white rounded-lg hover:bg-red-500/80 backdrop-blur-md">
                       <span className="material-symbols-outlined">delete</span>
                    </button>
                    <a href={selectedImage} download="imagen_editada.png" className="p-2 bg-black/50 text-white rounded-lg hover:bg-primary/80 backdrop-blur-md">
                       <span className="material-symbols-outlined">download</span>
                    </a>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ImageStudio;