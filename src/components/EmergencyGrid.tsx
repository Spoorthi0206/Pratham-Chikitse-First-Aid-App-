import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Language, EmergencyData } from '../types';

interface EmergencyGridProps {
  items: EmergencyData[];
  onSelect: (emergency: EmergencyData) => void;
  language: Language;
}

export default function EmergencyGrid({ items, onSelect, language }: EmergencyGridProps) {
  const getTitle = (item: EmergencyData) => {
    switch (language) {
      case 'kn': return item.titleKn;
      case 'hi': return item.titleHi;
      case 'te': return item.titleTe;
      case 'ta': return item.titleTa;
      default: return item.titleEn;
    }
  };
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {items.map((item) => {
        const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
        return (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(item)}
            id={`emergency-btn-${item.id}`}
            className={`${item.color} h-40 rounded-3xl p-6 flex flex-col justify-between items-start text-white shadow-lg overflow-hidden relative`}
          >
            <div className="bg-white/20 p-2 rounded-xl">
              <IconComponent size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight uppercase tracking-wide">
                {getTitle(item)}
              </h3>
            </div>
            
            {/* Visual Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <IconComponent size={120} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
