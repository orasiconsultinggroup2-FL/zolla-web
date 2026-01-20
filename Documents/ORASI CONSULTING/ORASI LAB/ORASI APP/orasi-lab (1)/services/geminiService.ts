import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getChatResponse = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");
  
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: "Eres un consultor experto en Negociación, Persuasión y Resolución de Conflictos para ORASI Lab. Tus respuestas deben ser estratégicas, basadas en metodologías como Harvard o Chris Voss, y siempre en ESPAÑOL."
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "No pude generar una respuesta.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Lo siento, encontré un error al procesar tu solicitud.";
  }
};

export const generateSocialPost = async (platform: string, type: string, category: string, title: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const prompt = `Actúa como un Consultor Senior en Negociación y Estrategia.
    
    Contexto: Necesito crear contenido educativo y de autoridad para redes sociales corporativas.
    Categoría de Negociación: ${category}.
    Título Específico del Tema: ${title}.
    Plataforma de destino: ${platform}.
    Formato del contenido: ${type}.
    
    Instrucciones:
    1. El contenido debe ser altamente profesional, persuasivo y aportar valor inmediato.
    2. Usa terminología de negociación adecuada (ej. BATNA, ZOPA, Anclaje, Rapport) si aplica al título.
    3. Estructura el contenido perfectamente para el formato ${type} en ${platform}.
    4. Incluye un "Call to Action" (Llamada a la acción) claro.
    5. Incluye 5-8 hashtags relevantes al nicho de negociación y negocios.
    6. Idioma: ESPAÑOL.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No se pudo generar el contenido.";
  } catch (error) {
    console.error("Social Gen Error:", error);
    throw error;
  }
};

export const editImage = async (base64Image: string, prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    // Clean base64 string if it contains data URI header
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          },
          {
            text: `${prompt}. (IMPORTANTE: Mantén la alta calidad de la imagen)`
          }
        ]
      }
    });

    // Check for image in response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return "";
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};