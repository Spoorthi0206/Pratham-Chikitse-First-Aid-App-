import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X, CheckCircle2, AlertTriangle, Info, Sparkles, Loader2 } from 'lucide-react';
import { Language, EmergencyData } from '../types';
import { getEmergencyAdvice, generateSpeech } from '../lib/gemini';
import { useRef } from 'react';

interface StepByStepProps {
  emergency: EmergencyData;
  onClose: () => void;
  language: Language;
}

// Global Audio Cache for Blobs (persists across component mounts)
const GLOBAL_BLOB_CACHE = new Map<string, string>();

export default function StepByStep({ emergency, onClose, language }: StepByStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const steps = emergency.steps;
  const currentStepData = steps[currentStep];

  const getStepText = (step: typeof currentStepData) => {
    if (!step) return '';
    switch (language) {
      case 'kn': return step.textKn || step.textEn;
      case 'hi': return step.textHi || step.textEn;
      case 'te': return step.textTe || step.textEn;
      case 'ta': return step.textTa || step.textEn;
      default: return step.textEn;
    }
  };

  const getTypeStyles = (type: 'do' | 'dont' | 'info') => {
    switch (type) {
      case 'do': return {
        bg: 'bg-green-50/50',
        accent: 'bg-green-500',
        text: 'text-green-700',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        label: { en: 'DO', kn: 'ಮಾಡಿ', hi: 'करें', te: 'చేయండి', ta: 'செய்யவும்' }
      };
      case 'dont': return {
        bg: 'bg-red-50/50',
        accent: 'bg-red-500',
        text: 'text-red-700',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        label: { en: 'DO NOT', kn: 'ಮಾಡಬೇಡಿ', hi: 'न करें', te: 'చేయవద్దు', ta: 'செய்யாதீர்கள்' }
      };
      case 'info': return {
        bg: 'bg-blue-50/50',
        accent: 'bg-blue-500',
        text: 'text-blue-700',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        label: { en: 'INFO', kn: 'ಮಾಹಿತಿ', hi: 'जानकारी', te: 'సమాచారం', ta: 'தகவல்' }
      };
    }
  };

  const typeStyles = getTypeStyles(currentStepData.type);

  const getEmergencyTitle = () => {
    switch (language) {
      case 'kn': return emergency.titleKn || emergency.titleEn;
      case 'hi': return emergency.titleHi || emergency.titleEn;
      case 'te': return emergency.titleTe || emergency.titleEn;
      case 'ta': return emergency.titleTa || emergency.titleEn;
      default: return emergency.titleEn;
    }
  };

  const getLangCode = () => {
    switch (language) {
      case 'kn': return 'kn-IN';
      case 'hi': return 'hi-IN';
      case 'te': return 'te-IN';
      case 'ta': return 'ta-IN';
      default: return 'en-US';
    }
  };

  const translations: Record<Language, any> = {
    en: { backToSteps: 'Back to Steps', back: 'Back', next: 'Next', finish: 'Finish', step: 'Step', of: 'of', critical: 'Critical: STOP. DO NOT DO THIS.', play: 'Play Instruction', voiceWarning: 'Voice not found for this language', loadingVoices: 'Loading voices...' },
    kn: { backToSteps: 'ಹಂತಗಳಿಗೆ ಹಿಂತಿರುಗಿ', back: 'ಹಿಂದೆ', next: 'ಮುಂದೆ', finish: 'ಮುಗಿಸು', step: 'ಹಂತ', of: 'ರಲ್ಲಿ', critical: 'ನಿರ್ಣಾಯಕ: ನಿಲ್ಲಿಸಿ. ಇದನ್ನು ಮಾಡಬೇಡಿ.', play: 'ಸೂಚನೆ ಕೇಳಿ', voiceWarning: 'ಈ ಭಾಷೆಗೆ ಧ್ವನಿ ಕಂಡುಬಂದಿಲ್ಲ', loadingVoices: 'ಧ್ವನಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' },
    hi: { backToSteps: 'चरणों पर वापस जाएं', back: 'पीछे', next: 'अगला', finish: 'समाप्त', step: 'चरण', of: 'का', critical: 'महत्वपूर्ण: रुकें। यह न करें।', play: 'निर्देश सुनें', voiceWarning: 'इस भाषा के लिए आवाज़ नहीं मिली', loadingVoices: 'आवाज़ें लोड हो रही हैं...' },
    te: { backToSteps: 'దశలకు తిరిగి వెళ్ళు', back: 'వెనుకకు', next: 'తరువాత', finish: 'ముగించు', step: 'దశ', of: 'లో', critical: 'కీలకం: ఆగండి. ఇది చేయవద్దు.', play: 'సూచన వినండి', voiceWarning: 'ఈ భాష కోసం వాయిస్ దొరకలేదు', loadingVoices: 'ವಾಯಿಸ್‌ಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...' },
    ta: { backToSteps: 'வழிமுறைகளுக்குத் திரும்பு', back: 'பின்னால்', next: 'அடுத்து', finish: 'முடிக்கவும்', step: 'படி', of: 'இல்', critical: 'முக்கியமானது: நிறுத்துங்கள். இதைச் செய்யாதீர்கள்.', play: 'வழிமுறையை கேட்கவும்', voiceWarning: 'இந்த மொழிக்கான குரல் கிடைக்கவில்லை', loadingVoices: 'குರல்கள் ஏற்றப்படுகின்றன...' }
  };

  const t = translations[language] || translations.en;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlayingGemini, setIsPlayingGemini] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pre-load voices aggressively
  useEffect(() => {
    let loadCount = 0;
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        // Once voices are loaded, we can stop the aggressive polling after a few iterations
        loadCount++;
        if (loadCount > 10) clearInterval(voiceInterval);
      }
    };

    const voiceInterval = setInterval(loadVoices, 300);
    loadVoices();
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      clearInterval(voiceInterval);
    };
  }, []);

  // Pre-cache audio for all steps when emergency or language changes - SEQUENTIALLY to avoid rate limits
  useEffect(() => {
    const isIndianLanguage = ['kn', 'te', 'ta', 'hi'].includes(language);
    if (!isIndianLanguage) return;

    let isMounted = true;
    const preCacheSequentially = async () => {
      // Start caching from current step onwards for better UX
      const startIndex = currentStep;
      const order = Array.from({ length: steps.length }, (_, i) => (startIndex + i) % steps.length);

      for (const i of order) {
        if (!isMounted) break;
        const key = `${language}-${emergency.titleEn}-${i}`;
        if (GLOBAL_BLOB_CACHE.has(key)) continue;

        try {
          const text = getStepText(steps[i]);
          if (!text) continue;
          
          const audioBase64 = await generateSpeech(text, language);
          if (audioBase64 && isMounted) {
            const binaryString = atob(audioBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let j = 0; j < binaryString.length; j++) {
              bytes[j] = binaryString.charCodeAt(j);
            }
            const blob = new Blob([bytes], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            GLOBAL_BLOB_CACHE.set(key, url);
          }
          // Delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.warn("Pre-cache failed for step", i, error);
        }
      }
    };
    preCacheSequentially();
    return () => { isMounted = false; };
  }, [emergency, language, steps, currentStep]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAudioOn) {
      // Rapid response: 50ms is enough for most engines to be ready after state change
      timer = setTimeout(speakCurrentStep, 50);
    } else {
      window.speechSynthesis.cancel();
    }
    return () => {
      if (timer) clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [currentStep, isAudioOn, language, voices.length]);

  const [voiceSupported, setVoiceSupported] = useState(true);

  const speakCurrentStep = async () => {
    const isIndianLanguage = ['kn', 'te', 'ta', 'hi'].includes(language);
    let geminiSuccess = false;
    
    // 1. Prioritize Gemini TTS for All Indian languages to ensure high-quality and consistent experience
    if (isIndianLanguage) {
      const cacheKey = `${language}-${emergency.titleEn}-${currentStep}`;
      
      try {
        setIsPlayingGemini(true);
        window.speechSynthesis.cancel();

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        let url = GLOBAL_BLOB_CACHE.get(cacheKey);

        if (!url) {
          const textToSpeak = getStepText(currentStepData);
          if (!textToSpeak) return;

          const audioBase64 = await generateSpeech(textToSpeak, language);
          if (audioBase64) {
             const binaryString = atob(audioBase64);
             const bytes = new Uint8Array(binaryString.length);
             for (let i = 0; i < binaryString.length; i++) {
               bytes[i] = binaryString.charCodeAt(i);
             }
             const blob = new Blob([bytes], { type: 'audio/wav' });
             url = URL.createObjectURL(blob);
             GLOBAL_BLOB_CACHE.set(cacheKey, url);
          }
        }

        if (url) {
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onended = () => {
            setIsPlayingGemini(false);
          };
          audio.onerror = (e) => {
            console.error("Audio playback error:", e);
            setIsPlayingGemini(false);
          };
          await audio.play();
          geminiSuccess = true;
          return;
        }
      } catch (error) {
        console.error("Gemini TTS playback failed:", error);
      } finally {
        if (geminiSuccess) {
          setIsPlayingGemini(false);
        }
      }
    }

    // 2. Fallback to Browser Synthesis if Gemini didn't play or not an Indian language
    if (geminiSuccess) return;
    setIsPlayingGemini(false);

    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    // Attempt to resume if stuck (common Chrome/Android bug)
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const text = getStepText(currentStepData);
    if (!text) return;

    // GC Prevention: attach to window
    const utterance = new SpeechSynthesisUtterance(text);
    (window as any)._lastUtterance = utterance;
    
    const langCode = getLangCode();
    utterance.lang = langCode;
    const langOnly = language.toLowerCase();

    let currentVoices = voices;
    if (currentVoices.length === 0) {
      currentVoices = window.speechSynthesis.getVoices();
    }

    const findVoice = () => {
      const normalizedTarget = langCode.toLowerCase().replace('_', '-');

      // Priority 1: High-quality Neural/Natural voices for this language
      const premiumMatch = currentVoices.find(v => 
        (v.name.includes('Neural') || v.name.includes('Premium') || v.name.includes('Natural') || v.name.includes('Enhanced') || v.name.includes('Google')) && 
        v.lang.toLowerCase().replace('_', '-').startsWith(langOnly)
      );
      if (premiumMatch) return premiumMatch;

      // Priority 2: Exact locale match (e.g., hi-IN)
      const exactMatch = currentVoices.find(v => v.lang.toLowerCase().replace('_', '-') === normalizedTarget);
      if (exactMatch) return exactMatch;

      // Priority 3: Fuzzy matching for local names
      const nameMatch = currentVoices.find(v => {
        const name = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase().replace('_', '-');
        const isIndia = name.includes('india') || name.includes('in');
        
        if (language === 'hi') return name.includes('hindi') || name.includes('हिन्दी') || name.includes('lekha') || name.includes('kalpana') || name.includes('hemant') || (isIndia && vLang.startsWith('hi'));
        if (language === 'ta') return name.includes('tamil') || name.includes('தமிழ்') || name.includes('muthu') || name.includes('valluvar') || (isIndia && vLang.startsWith('ta'));
        if (language === 'te') return name.includes('telugu') || name.includes('తెలుగు') || name.includes('shruti') || (isIndia && vLang.startsWith('te'));
        if (language === 'kn') return name.includes('kannada') || name.includes('ಕನ್ನಡ') || name.includes('sapna') || (isIndia && vLang.startsWith('kn'));
        
        return false;
      });
      if (nameMatch) return nameMatch;

      // Priority 4: Broad language match
      const prefixMatch = currentVoices.find(v => v.lang.toLowerCase().startsWith(langOnly));
      if (prefixMatch) return prefixMatch;

      return null;
    };

    const voice = findVoice();
    setVoiceSupported(!!voice); 

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang; 
    } else {
      utterance.lang = langCode;
    }
    
    utterance.rate = 0.9; 
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = () => setIsPlayingGemini(true);
    utterance.onend = () => setIsPlayingGemini(false);
    utterance.onerror = (event: any) => {
      console.error('SpeechSynthesisUtterance error:', event);
      setIsPlayingGemini(false);
      
      if (event.error === 'language-unavailable' || event.error === 'voice-unavailable') {
        if (utterance.lang.includes('-')) {
          const baseLang = utterance.lang.split('-')[0];
          const retryUtterance = new SpeechSynthesisUtterance(text);
          (window as any)._lastUtterance = retryUtterance;
          retryUtterance.lang = baseLang;
          retryUtterance.rate = 0.9;
          retryUtterance.onend = () => setIsPlayingGemini(false);
          window.speechSynthesis.speak(retryUtterance);
        } else {
          setVoiceSupported(false);
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const fetchAiAdvice = async () => {
    setIsAiLoading(true);
    const advice = await getEmergencyAdvice(emergency.titleEn, language);
    setAiAdvice(advice);
    setIsAiLoading(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-white z-50 flex flex-col shadow-2xl"
    >
      <div className={`p-6 ${emergency.color} text-white flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold">
            {getEmergencyTitle()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAiAdvice}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all"
            title="AI Advisor"
          >
            {isAiLoading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} className="text-yellow-200" />}
          </button>
          <button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`p-3 rounded-full transition-all ${isAudioOn ? 'bg-white text-black scale-110' : 'bg-white/20 text-white'}`}
          >
            {isAudioOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>
      </div>

      <div className="h-1.5 w-full bg-gray-100">
        <motion.div
          className={`h-full ${emergency.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 relative overflow-y-auto">
        <AnimatePresence mode="wait">
          {aiAdvice ? (
            <motion.div
              key="ai-advice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="min-h-full flex flex-col items-center justify-center p-8 text-center gap-6"
            >
              <div className="bg-yellow-50 p-6 rounded-[2rem] border border-yellow-200 shadow-sm max-w-md w-full">
                <div className="flex justify-center mb-4">
                  <Sparkles size={40} className="text-yellow-600" />
                </div>
                <h3 className="font-black text-yellow-800 uppercase tracking-widest text-sm mb-4">AI Smart Advice</h3>
                <p className="text-xl text-yellow-900 leading-relaxed font-medium">
                  {aiAdvice}
                </p>
                <button 
                  onClick={() => setAiAdvice(null)}
                  className="mt-8 bg-yellow-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                >
                  {t.backToSteps}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className={`w-full min-h-full flex flex-col items-center justify-start p-6 pb-24 gap-8 ${typeStyles.bg}`}
            >
              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-4">
                <div className={`px-4 py-1.5 rounded-full ${typeStyles.accent} text-white text-xs font-black tracking-widest uppercase shadow-sm`}>
                  {typeStyles.label[language] || typeStyles.label.en}
                </div>
                
                <div className={`w-full aspect-video rounded-[2.5rem] overflow-hidden bg-white border-4 border-white shadow-xl flex items-center justify-center relative`}>
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  
                  <div className="flex flex-col items-center gap-4 relative z-10 transition-transform duration-500 hover:scale-105">
                    {currentStepData.type === 'do' && (
                      <div className={`${typeStyles.iconBg} p-8 rounded-full ${typeStyles.iconColor} shadow-inner`}>
                        <CheckCircle2 size={80} strokeWidth={2.5} />
                      </div>
                    )}
                    {currentStepData.type === 'dont' && (
                      <div className={`${typeStyles.iconBg} p-8 rounded-full ${typeStyles.iconColor} shadow-inner`}>
                        <X size={80} strokeWidth={3} />
                      </div>
                    )}
                    {currentStepData.type === 'info' && (
                      <div className={`${typeStyles.iconBg} p-8 rounded-full ${typeStyles.iconColor} shadow-inner`}>
                        <Info size={80} strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center w-full max-w-lg mb-2">
                <span className="text-gray-400 text-xs font-black mb-3 block uppercase tracking-[0.2em] opacity-60">
                  {t.step} {currentStep + 1} {t.of} {steps.length}
                </span>
                <p className={`text-2xl md:text-3xl font-black leading-tight tracking-tight px-4 ${typeStyles.text}`}>
                  {getStepText(currentStepData)}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={speakCurrentStep}
                  disabled={isPlayingGemini}
                  className={`p-4 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-3 font-bold disabled:opacity-50`}
                >
                  {isPlayingGemini ? <Loader2 size={24} className="animate-spin" /> : <Volume2 size={24} />}
                  <span className="text-sm uppercase tracking-wider">{t.play}</span>
                </button>
                
                {!voiceSupported && isAudioOn && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl text-xs font-bold border border-amber-100">
                    <Info size={14} />
                    {t.voiceWarning}
                  </div>
                )}
                {voices.length === 0 && (
                   <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                    <Loader2 size={12} className="animate-spin" />
                    {t.loadingVoices}
                   </div>
                )}
              </div>

              {currentStepData.type === 'dont' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 max-w-md">
                  <AlertTriangle className="text-red-500 shrink-0" size={20} />
                  <p className="text-red-700 text-sm font-bold uppercase tracking-wide">{t.critical}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 border-t flex justify-between items-center bg-gray-50/50">
        <button
          onClick={prevStep}
          disabled={currentStep === 0 || !!aiAdvice}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            (currentStep === 0 || !!aiAdvice) ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={20} />
          {t.back}
        </button>

        <button
          onClick={currentStep === steps.length - 1 ? onClose : nextStep}
          disabled={!!aiAdvice}
          className={`px-10 py-4 rounded-full font-bold shadow-lg ${emergency.color} text-white flex items-center gap-2 disabled:opacity-50`}
        >
          {currentStep === steps.length - 1 ? t.finish : t.next}
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
