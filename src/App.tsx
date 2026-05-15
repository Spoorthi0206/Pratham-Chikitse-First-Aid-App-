import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, Heart, Info, Home, MapPin, Search, Globe, User, ChevronDown } from 'lucide-react';
import EmergencyGrid from './components/EmergencyGrid';
import StepByStep from './components/StepByStep';
import HospitalFinder from './components/HospitalFinder';
import HelpPage from './components/HelpPage';
import UserProfile from './components/UserProfile';
import { emergencies } from './data/emergencies';
import { Language, languageNames, EmergencyData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'hospitals' | 'help' | 'profile' | 'info'>('home');
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyData | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const filteredEmergencies = useMemo(() => {
    return emergencies.filter(e => {
      const q = searchQuery.toLowerCase();
      const sq = searchQuery;
      return (
        e.titleEn.toLowerCase().includes(q) || 
        e.titleKn.includes(sq) ||
        e.titleHi.includes(sq) ||
        e.titleTe.includes(sq) ||
        e.titleTa.includes(sq)
      );
    });
  }, [searchQuery]);

  const getTitle = () => {
    switch(language) {
      case 'kn': return { brand: 'ಪ್ರಥಮ', sub: 'ಚಿಕಿತ್ಸೆ' };
      case 'hi': return { brand: 'प्रथम', sub: 'चिकित्सा' };
      case 'te': return { brand: 'ప్రథమ', sub: 'చికిత్స' };
      case 'ta': return { brand: 'முதலுதவி', sub: 'கையேடு' };
      default: return { brand: 'Pratham', sub: 'First-Aid' };
    }
  };

  const getHeroText = () => {
    switch(language) {
      case 'kn': return { p1: 'ಏನಾಗಿದೆ?', p2: 'ತುರ್ತು?' };
      case 'hi': return { p1: 'क्या हुआ?', p2: 'आपातकाल?' };
      case 'te': return { p1: 'ఏమైంది?', p2: 'అత్యవసరమా?' };
      case 'ta': return { p1: 'என்ன?', p2: 'அவசரம்?' };
      default: return { p1: "What's the", p2: 'Emergency?' };
    }
  };

  const getSearchPlaceholder = () => {
    switch(language) {
      case 'kn': return 'ಹುಡುಕಿ...';
      case 'hi': return 'खोजें...';
      case 'te': return 'వెతకండి...';
      case 'ta': return 'தேடவும்...';
      default: return 'Search help...';
    }
  };

  const title = getTitle();
  const hero = getHeroText();
  const searchPlaceholder = getSearchPlaceholder();

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden">
      {/* Phone Emulator Frame */}
      <div className="relative w-full max-w-[400px] h-[850px] bg-neutral-800 rounded-[60px] border-[12px] border-neutral-800 shadow-[0_0_0_2px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        {/* Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-neutral-800 rounded-b-3xl z-50 flex items-center justify-center gap-2">
          <div className="w-10 h-1 bg-neutral-700 rounded-full" />
          <div className="w-2 h-2 bg-neutral-700 rounded-full" />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-50" />

        {/* Screen Content Container */}
        <div className="flex-1 bg-neutral-50 overflow-y-auto relative custom-scrollbar pb-32">
          
          {/* Header (Sticky inside the emulator) */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-200 px-6 py-6 pt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-200">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight leading-none uppercase">
                    {title.brand}
                  </h1>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                    {title.sub}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-full font-bold text-[10px] hover:bg-neutral-200 transition-colors uppercase"
                >
                  <Globe size={12} />
                  {languageNames[language]}
                  <ChevronDown size={10} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showLangMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowLangMenu(false)} 
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 overflow-hidden"
                      >
                        {(Object.keys(languageNames) as Language[]).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setLanguage(lang);
                              setShowLangMenu(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-colors ${
                              language === lang ? 'bg-red-50 text-red-600' : 'hover:bg-neutral-50 text-neutral-600'
                            }`}
                          >
                            {languageNames[lang]}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Main Views */}
          <main>
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="px-6 py-8">
                    <h2 className="text-4xl font-black leading-tight text-neutral-800">
                      {hero.p1}
                      <br />
                      <span className="text-red-500">{hero.p2}</span>
                    </h2>
                    <div className="mt-6 relative">
                       <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
                        <Search size={18} />
                      </div>
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full bg-neutral-100 border-none rounded-2xl py-4 pl-12 pr-4 font-medium focus:ring-2 focus:ring-red-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <EmergencyGrid 
                    language={language}
                    items={filteredEmergencies}
                    onSelect={(e) => setSelectedEmergency(e)} 
                  />
                </motion.div>
              )}

              {activeTab === 'hospitals' && (
                <motion.div
                  key="hospitals"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <HospitalFinder language={language} />
                </motion.div>
              )}

              {activeTab === 'help' && (
                <motion.div
                  key="help"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <HelpPage language={language} />
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <UserProfile language={language} />
                </motion.div>
              )}

              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                    <h2 className="text-xl font-bold mb-4">About the App</h2>
                    <p className="text-neutral-600 leading-relaxed mb-6 text-sm">
                      {language === 'en' && 'Pratham-Chikitse is a life-saving manual designed for remote areas and network failures. It provides 20+ first-aid guides in multiple languages.'}
                      {language === 'kn' && 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಒಂದು ಜೀವ ಉಳಿಸುವ ಕೈಪಿಡಿಯಾಗಿದ್ದು, ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳು ಮತ್ತು ನೆಟ್‌ವರ್ಕ್ ವೈಫಲ್ಯಗಳ ಸಮಯಕ್ಕೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.'}
                      {language === 'hi' && 'प्रथम-चिकित्सा एक जीवन रक्षक मैनुअल है जिसे ग्रामीण क्षेत्रों और नेटवर्क विफलता के समय के लिए डिज़ाइन किया गया है।'}
                      {language === 'te' && 'ప్రథమ చికిత్స అనేది ఒక ప్రాణ రక్షణ మాన్యువల్, ఇది గ్రామీణ ప్రాంతాలు మరియు నెట్‌వర్క్ వైఫల్యాల సమయం కోసం రూపొందించబడింది.'}
                      {language === 'ta' && 'முதலுதவி என்பது ஒரு உயிரி காக்கும் கையேடு ஆகும், இது கிராமப்புறங்கள் மற்றும் நெட்வொர்க் தோல்விகளின் போது வடிவமைக்கப்பட்டுள்ளது.'}
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 bg-neutral-50 rounded-2xl">
                        <Globe className="text-blue-500" />
                        <div>
                          <h4 className="font-bold text-sm">Multilingual</h4>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Regional Languages</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-neutral-50 rounded-2xl">
                        <Info className="text-green-500" />
                        <div>
                          <h4 className="font-bold text-sm">Offline First</h4>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">No Internet needed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Fixed elements inside the emulator frame */}
          <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-neutral-900/90 backdrop-blur-2xl rounded-[32px] p-1.5 flex justify-between items-center shadow-2xl z-40 border border-white/10">
            {[
              { id: 'home', icon: Home, labelEn: 'Guide', labelKn: 'ಮಾರ್ಗದರ್ಶಿ', labelHi: 'गाइड', labelTe: 'గైడ్', labelTa: 'வழிகாட்டி' },
              { id: 'hospitals', icon: MapPin, labelEn: 'Map', labelKn: 'ನಕ್ಷೆ', labelHi: 'नक्शा', labelTe: 'మ్యాప్', labelTa: 'வரைபடம்' },
              { id: 'help', icon: Phone, labelEn: 'Help', labelKn: 'ಸಹಾಯ', labelHi: 'सहायता', labelTe: 'సహాయం', labelTa: 'உதவி' },
              { id: 'info', icon: Info, labelEn: 'Info', labelKn: 'ಮಾಹಿತಿ', labelHi: 'जानकारी', labelTe: 'సమాచారం', labelTa: 'தகவல்' },
              { id: 'profile', icon: User, labelEn: 'Profile', labelKn: 'ಪ್ರೊಫೈಲ್', labelHi: 'प्रोफ़ाइल', labelTe: 'ప్రొఫైల్', labelTa: 'சுயவிவரம்' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-3xl transition-all relative overflow-hidden ${
                  activeTab === tab.id ? 'text-white' : 'text-neutral-500'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
                <tab.icon size={18} className="relative z-10" />
                <span className="text-[8px] font-bold mt-1 uppercase tracking-wider relative z-10">
                  {language === 'en' ? tab.labelEn : 
                   language === 'kn' ? tab.labelKn :
                   language === 'hi' ? tab.labelHi :
                   language === 'te' ? tab.labelTe :
                   tab.labelTa}
                </span>
              </button>
            ))}
          </nav>

          <motion.a
            href="tel:108"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-28 right-6 bg-red-600 text-white p-4 rounded-full shadow-xl z-30 shadow-red-500/30 flex items-center gap-2"
          >
            <Phone size={24} />
            <span className="font-black text-sm pr-2">108</span>
          </motion.a>

          {/* Emergency Detail Modal (FullScreen Overlay inside frame) */}
          <AnimatePresence>
            {selectedEmergency && (
              <div className="absolute inset-0 z-[100] bg-white overflow-hidden">
                <StepByStep
                  language={language}
                  emergency={selectedEmergency}
                  onClose={() => setSelectedEmergency(null)}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
