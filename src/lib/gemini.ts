import { GoogleGenAI, Modality } from "@google/genai";
import { Language, languageNames } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || "" 
});

export async function getEmergencyAdvice(situation: string, language: Language) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional first-aid assistant. 
      Provide a concise (max 3 points) first-aid advice for this situation: "${situation}".
      Language: ${languageNames[language]}.
      Return only the instructions in ${languageNames[language]}.
      Always advise to call 108 first.`,
    });
    
    return response.text || "Call 108 immediately for professional medical help.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Call 108 immediately for professional medical help.";
  }
}

// Global Cache to persist audio across component mounts
const GLOBAL_AUDIO_CACHE = new Map<string, string>();

export async function generateSpeech(text: string, language: Language): Promise<string | null> {
  const cacheKey = `${language}-${text}`;
  if (GLOBAL_AUDIO_CACHE.has(cacheKey)) {
    return GLOBAL_AUDIO_CACHE.get(cacheKey)!;
  }

  try {
    const langLabel = languageNames[language] || "English";
    const prompt = `Convert this ${langLabel} text to clear, natural-sounding speech for an emergency first-aid instruction. Use a calm, professional, and helpful tone. Text: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { 
              voiceName: 'Puck' 
            },
          },
        },
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data; 
    
    if (base64Audio && typeof base64Audio === 'string') {
      const rawData = atob(base64Audio);
      const buffer = new ArrayBuffer(44 + rawData.length);
      const view = new DataView(buffer);

      // RIFF header
      view.setUint32(0, 0x52494646, false); 
      view.setUint32(4, 36 + rawData.length, true);
      view.setUint32(8, 0x57415645, false); 

      // fmt chunk
      view.setUint32(12, 0x666d7420, false); 
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true); 
      view.setUint16(22, 1, true); 
      view.setUint32(24, 24000, true); 
      view.setUint32(28, 24000 * 2, true); 
      view.setUint16(32, 2, true); 
      view.setUint16(34, 16, true); 

      // data chunk
      view.setUint32(36, 0x64617461, false); 
      view.setUint32(40, rawData.length, true);

      const uint8View = new Uint8Array(buffer, 44);
      for (let i = 0; i < rawData.length; i++) {
        uint8View[i] = rawData.charCodeAt(i);
      }

      const bytes = new Uint8Array(buffer);
      let binary = "";
      const chunkSize = 16384; 
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
      }
      const finalBase64 = btoa(binary);
      GLOBAL_AUDIO_CACHE.set(cacheKey, finalBase64);
      return finalBase64;
    }
    
    console.warn("No audio data in Gemini response", response);
    return null;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return null;
  }
}
