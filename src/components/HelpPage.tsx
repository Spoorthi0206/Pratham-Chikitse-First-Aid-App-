import { Phone, ShieldAlert, HeartPulse, Accessibility, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface HelpNumber {
  label: string;
  number: string;
  description: string;
  icon: any;
  color: string;
}

interface Category {
  titleEn: string;
  titleKn: string;
  titleHi: string;
  titleTe: string;
  titleTa: string;
  items: HelpNumber[];
}

const helpData: Category[] = [
  {
    titleEn: "Primary Emergency Numbers",
    titleKn: "ಪ್ರಾಥಮಿಕ ತುರ್ತು ಸಂಖ್ಯೆಗಳು",
    titleHi: "प्रमुख आपातकालीन नंबर",
    titleTe: "ప్రాథమిక అత్యవసర నంబర్లు",
    titleTa: "முக்கிய அவசர எண்கள்",
    items: [
      { label: "Unified Emergency", number: "112", description: "Police, Fire, and Health emergencies", icon: ShieldAlert, color: "bg-red-500" },
      { label: "Ambulance", number: "108", description: "Integrated medical emergency response", icon: HeartPulse, color: "bg-rose-600" },
      { label: "Maternity/Child", number: "102", description: "National Ambulance Service for NAS", icon: Accessibility, color: "bg-pink-500" },
      { label: "Health Helpline", number: "104", description: "24/7 Medical advice & directory", icon: Activity, color: "bg-blue-500" },
    ]
  },
  {
    titleEn: "Specialized Medical Services",
    titleKn: "ವಿಶೇಷ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
    titleHi: "विशेष चिकित्सा सेवाएं",
    titleTe: "ప్రత్యేక వైద్య సేవలు",
    titleTa: "சிறப்பு மருத்துவ சேவைகள்",
    items: [
      { label: "National Poison Centre", number: "1800116117", description: "AIIMS Poison Information Centre", icon: AlertTriangle, color: "bg-purple-700" },
      { label: "Anti-Poison Control", number: "1066", description: "Emergency poison response", icon: AlertTriangle, color: "bg-purple-600" },
      { label: "Air Ambulance", number: "9540161344", description: "Emergency air transport", icon: HeartPulse, color: "bg-cyan-600" },
      { label: "Bike Ambulance", number: "14430", description: "Fast response for heart attacks", icon: HeartPulse, color: "bg-orange-500" },
      { label: "Road Accident", number: "1033", description: "Highway accident assistance", icon: ShieldAlert, color: "bg-neutral-700" },
    ]
  },
  {
    titleEn: "Specific Needs Helplines",
    titleKn: "ನಿರ್ದಿಷ್ಟ ಅಗತ್ಯಗಳ ಸಹಾಯವಾಣಿಗಳು",
    titleHi: "विशिष्ट आवश्यकता हेल्पलाइन",
    titleTe: "నిర్దిష్ట అవసరాల హెల్ప్‌లైన్లు",
    titleTa: "குறிப்பிட்ட உதவி எண்கள்",
    items: [
      { label: "Mental Health", number: "18005990019", description: "KIRAN mental health helpline", icon: HeartPulse, color: "bg-indigo-600" },
      { label: "COVID-19", number: "1075", description: "National COVID-19 helpline", icon: Activity, color: "bg-teal-600" },
      { label: "Women Helpline", number: "1091", description: "Safety & domestic abuse help", icon: ShieldAlert, color: "bg-rose-400" },
      { label: "Child Helpline", number: "1098", description: "Child protection & support", icon: Accessibility, color: "bg-amber-600" },
      { label: "Senior Citizen", number: "14567", description: "Elderly support services", icon: Accessibility, color: "bg-slate-600" },
    ]
  }
];

export default function HelpPage({ language }: { language: Language }) {
  const getCategoryTitle = (cat: Category) => {
    switch(language) {
      case 'kn': return cat.titleKn;
      case 'hi': return cat.titleHi;
      case 'te': return cat.titleTe;
      case 'ta': return cat.titleTa;
      default: return cat.titleEn;
    }
  };

  const getPageHeader = () => {
    switch(language) {
      case 'kn': return { part1: 'ನೇರ ಸಹಾಯ', part2: 'ತುರ್ತು ಸಹಾಯ ಪಡೆಯಿರಿ' };
      case 'hi': return { part1: 'सीधी', part2: 'आपातकालीन सहायता' };
      case 'te': return { part1: 'నేరుగా', part2: 'అత్యవసర సహాయం' };
      case 'ta': return { part1: 'நேரடி', part2: 'அவசர உதவி' };
      default: return { part1: 'Get Direct', part2: 'Emergency Help' };
    }
  };

  const header = getPageHeader();

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-black leading-tight text-neutral-800 mb-8">
        {header.part1}
        <br />
        <span className="text-red-500">{header.part2}</span>
      </h2>

      <div className="space-y-10">
        {helpData.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400 pl-2">
              {getCategoryTitle(category)}
            </h3>
            
            <div className="grid gap-4">
              {category.items.map((item, i) => (
                <motion.a
                  key={i}
                  href={`tel:${item.number}`}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} p-3 rounded-2xl text-white`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-800">{item.label}</h4>
                      <p className="text-xs text-neutral-500 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 px-4 py-2 rounded-2xl group-hover:bg-red-50 transition-colors">
                    <span className="font-black text-red-600 text-lg tracking-tighter">
                      {item.number}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-red-50 rounded-[32px] border border-red-100 text-center">
        <p className="text-sm font-bold text-red-600 mb-2 italic">
          {language === 'en' ? 'Always call 112 or 108 first for life-threatening situations.' : 
           (language === 'kn' ? 'ಜೀವಕ್ಕೆ ಅಪಾಯವಿದ್ದಾಗ ಮೊದಲು 112 ಅಥವಾ 108 ಗೆ ಕರೆ ಮಾಡಿ.' : 
           (language === 'hi' ? 'जीवन के लिए खतरनाक स्थितियों के लिए हमेशा पहले 112 या 108 पर कॉल करें।' :
           (language === 'te' ? 'ప్రాణాపాయ స్థితిలో ఎల్లప్పుడూ మొదట 112 లేదా 108 కి కాల్ చేయండి.' :
           'உயிருக்கு ஆபத்தான சூழ்நிலைகளில் எப்போதும் முதலில் 112 அல்லது 108 ஐ அழைக்கவும்.')))}
        </p>
      </div>
    </div>
  );
}
