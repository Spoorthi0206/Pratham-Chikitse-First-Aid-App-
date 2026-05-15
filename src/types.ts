export type Language = 'en' | 'kn' | 'hi' | 'te' | 'ta';

export interface EmergencyStep {
  textEn: string;
  textKn: string;
  textHi: string;
  textTe: string;
  textTa: string;
  type: 'do' | 'dont' | 'info';
}

export interface EmergencyData {
  id: string;
  titleEn: string;
  titleKn: string;
  titleHi: string;
  titleTe: string;
  titleTa: string;
  icon: string;
  color: string;
  steps: EmergencyStep[];
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  kn: 'ಕನ್ನಡ',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  ta: 'தமிழ்'
};

export interface Hospital {
  name: string;
  distance: string;
  phone: string;
  city: string;
  area?: string;
  lat: number;
  lng: number;
  specialties?: string[];
  rating?: number;
}
