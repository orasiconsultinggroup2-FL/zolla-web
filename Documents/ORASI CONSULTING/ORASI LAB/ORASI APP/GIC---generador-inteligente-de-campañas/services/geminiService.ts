
import { GoogleGenAI } from "@google/genai";
import { PhaseType } from "../types";

export const generateCampaignContent = async (
  campaignName: string,
  phase: PhaseType,
  day: number,
  theme: string,
  channel: string,
  postType: string,
  userContext: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Eres el Director Creativo de ORASI Consulting Group operando desde ORASI Lab. 
    Tu lema es: "En ORASI Consulting Group no creemos en la suerte. Creemos en la arquitectura de la decisión."
    
    REGLA DE SALIDA ULTRA-ESTRICTA:
    - Genera ÚNICAMENTE el texto que el usuario va a publicar.
    - NO incluyas introducciones como "Aquí tienes tu post", "Entendido", "Fase: Conciencia" o "Día 1".
    - NO incluyas etiquetas de formato tipo [Imagen aquí] o [CTA aquí].
    - NO incluyas explicaciones de por qué escribiste lo que escribiste.
    - El resultado debe ser 100% texto limpio listo para LinkedIn/Instagram.
    
    ESTRUCTURA DEL POST:
    - Usa un Hook (gancho) potente en las primeras 2 líneas que detenga el scroll.
    - Divide el texto en párrafos cortos (máximo 3 líneas por párrafo).
    - Usa bullet points elegantes (•) para enumerar conceptos.
    - Termina siempre con un CTA directo y profesional.
    
    REGLA DE ORO DEL CONTENIDO (80/20):
    - 80% VALOR TÉCNICO: Enseña una táctica real de negociación técnica. No seas genérico.
    - 20% CONEXIÓN ESTRATÉGICA: Conecta suavemente con el CTA: "${phase === PhaseType.CIERRE ? 'Inscríbete ahora en el link de mi bio' : 'Sígueme para dominar la arquitectura de la decisión'}".
    
    TONO:
    Sofisticado, Directo, Analítico, de Élite y Persuasivo.
    
    CONTEXTO DE LA MISIÓN:
    - Campaña: ${campaignName}
    - Fase: ${phase}
    - Tema: ${theme}
    - Canal: ${channel}
  `;

  const userPrompt = `
    Arquitecta el post definitivo sobre: "${theme}". 
    Instrucción táctica adicional: "${userContext || 'Ejecución estándar de alta precisión'}".
    RECUERDA: Solo devuelve el texto del post, sin nada más.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: userPrompt,
    config: {
      systemInstruction,
      temperature: 0.65, // Ligera reducción para mayor control de formato
      topP: 0.95,
    },
  });

  // Limpieza adicional por si la IA ignora la instrucción de no incluir prefijos
  let cleanText = response.text?.trim() || '';
  
  // Eliminar posibles prefijos comunes que la IA a veces añade a pesar de las instrucciones
  cleanText = cleanText.replace(/^(Aquí tienes el post:|Post para LinkedIn:|Texto del post:)/i, '').trim();

  return cleanText;
};
