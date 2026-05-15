import { User, Phone, Droplet, FileText, Save, Edit3, Trash2, Cloud, CloudOff, RefreshCw, LogIn } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { loginWithGoogle, syncToCloud, pullFromCloud, getSyncStatus, SyncStatus } from '../lib/sync';

interface ProfileData {
  name: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodGroup: string;
  medicalNotes: string;
}

const initialProfile: ProfileData = {
  name: '',
  phone: '',
  emergencyContact: '',
  emergencyPhone: '',
  bloodGroup: '',
  medicalNotes: '',
};

export default function UserProfile({ language }: { language: Language }) {
  const translations: Record<Language, any> = {
    en: { 
      emergency: 'Emergency', 
      medicalProfile: 'Medical Profile', 
      personalDetails: 'Personal Details', 
      name: 'Full Name',
      phone: 'Your Phone Number',
      emergencyContact: 'Emergency Contact',
      contactName: 'Contact Name (e.g. Spouse, Parent)',
      emergencyPhone: 'Emergency Phone Number',
      medicalInfo: 'Medical Info',
      selectBlood: 'Select Blood Group',
      notesPlaceholder: 'Allergies, Medications, Medical Conditions...',
      save: 'Save Profile',
      cancel: 'Cancel',
      delete: 'Delete Profile Data',
      identity: 'Identity',
      notes: 'Important Notes',
      disclaimer: 'This information is stored locally on your device for emergency situations.',
      confirmDelete: 'Are you sure you want to delete your profile?'
    },
    kn: { 
      emergency: 'ತುರ್ತು', 
      medicalProfile: 'ವೈದ್ಯಕೀಯ ಪ್ರೊಫೈಲ್', 
      personalDetails: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳು', 
      name: 'ಪೂರ್ಣ ಹೆಸರು',
      phone: 'ನಿಮ್ಮ ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
      emergencyContact: 'ತುರ್ತು ಸಂಪರ್ಕ',
      contactName: 'ಸಂಪರ್ಕ ಹೆಸರು (ಉದಾಹರಣೆಗೆ ಸಂಗಾತಿ, ಪೋಷಕರು)',
      emergencyPhone: 'ತುರ್ತು ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
      medicalInfo: 'ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ',
      selectBlood: 'ರಕ್ತದ ಗುಂಪನ್ನು ಆರಿಸಿ',
      notesPlaceholder: 'ಅಲರ್ಜಿಗಳು, ಔಷಧಿಗಳು, ವೈದ್ಯಕೀಯ ಪರಿಸ್ಥಿತಿಗಳು...',
      save: 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      delete: 'ಪ್ರೊಫೈಲ್ ಡೇಟಾ ಅಳಿಸಿ',
      identity: 'ಗುರುತು',
      notes: 'ಪ್ರಮುಖ ಟಿಪ್ಪಣಿಗಳು',
      disclaimer: 'ತುರ್ತು ಸಂದರ್ಭಗಳಿಗಾಗಿ ಈ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.',
      confirmDelete: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?'
    },
    hi: {
      emergency: 'आपातकालीन',
      medicalProfile: 'मेडिकल प्रोफाइल',
      personalDetails: 'व्यक्तिगत विवरण',
      name: 'पूरा नाम',
      phone: 'आपका फोन नंबर',
      emergencyContact: 'आपातकालीन संपर्क',
      contactName: 'संपर्क का नाम',
      emergencyPhone: 'आपातकालीन फोन नंबर',
      medicalInfo: 'चिकित्सा जानकारी',
      selectBlood: 'रक्त समूह चुनें',
      notesPlaceholder: 'एलर्जी, दवाएं...',
      save: 'प्रोफ़ाइल सहेजें',
      cancel: 'रद्द करें',
      delete: 'प्रोफ़ाइल हटाएं',
      identity: 'पहचान',
      notes: 'महत्वपूर्ण निर्देश',
      disclaimer: 'यह जानकारी आपके डिवाइस पर स्थानीय रूप से संग्रहीत है।',
      confirmDelete: 'क्या आप वाकई अपनी प्रोफ़ाइल हटाना चाहते हैं?'
    },
    te: {
      emergency: 'అత్యవసర',
      medicalProfile: 'వైద్య ప్రొఫైల్',
      personalDetails: 'వ్యక్తిగత వివరాలు',
      name: 'పూర్తి పేరు',
      phone: 'మీ ఫోన్ నంబర్',
      emergencyContact: 'అత్యవసర సంప్రదింపు',
      contactName: 'సంప్రదించాల్సిన పేరు',
      emergencyPhone: 'అత్యవసర ఫోన్ నంబర్',
      medicalInfo: 'వైద్య సమాచారం',
      selectBlood: 'రక్త రకాన్ని ఎంచుకోండి',
      notesPlaceholder: 'అలెర్జీలు, మందులు...',
      save: 'ప్రొఫైల్ సేవ్ చేయి',
      cancel: 'రద్దు చేయి',
      delete: 'ప్రొఫైల్ తొలగించు',
      identity: 'గుర్తింపు',
      notes: 'ముఖ్యమైన గమనికలు',
      disclaimer: 'ఈ సమాచారం మీ మొబైల్ లో భద్రంగా ఉంటుంది.',
      confirmDelete: 'మీరు ప్రొఫైల్ తొలగించాలనుకుంటున్నారా?'
    },
    ta: {
      emergency: 'அவசரம்',
      medicalProfile: 'மருத்துவ சுயவிவரம்',
      personalDetails: 'தனிப்பட்ட விவரங்கள்',
      name: 'முழு பெயர்',
      phone: 'உங்கள் தொலைபேசி எண்',
      emergencyContact: 'அவசர தொடர்பு',
      contactName: 'தொடர்பு பெயர்',
      emergencyPhone: 'அவசர தொலைபேசி எண்',
      medicalInfo: 'மருத்துவ தகவல்',
      selectBlood: 'இரத்த வகையைத் தேர்ந்தெடுக்கவும்',
      notesPlaceholder: 'ஒவ்வாமை, மருந்துகள்...',
      save: 'சுயவிவரத்தைச் சேமி',
      cancel: 'ரத்து செய்',
      delete: 'சுயவிவரத்தை நீக்கு',
      identity: 'அடையாளம்',
      notes: 'முக்கிய குறிப்புகள்',
      disclaimer: 'இந்தத் தகவல் உங்கள் சாதனத்தில் சேமிக்கப்பட்டுள்ளது.',
      confirmDelete: 'உங்கள் சுயவிவரத்தை நீக்க வேண்டுமா?'
    }
  };

  const t = translations[language] || translations.en;
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(getSyncStatus());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        pullFromCloud().catch(console.error);
      }
    });

    const handleSyncChange = (e: any) => setSyncStatus(e.detail);
    const handleLocalUpdate = () => {
      const saved = localStorage.getItem('user_emergency_profile');
      if (saved) {
        setProfile(JSON.parse(saved));
        setHasProfile(true);
      }
    };

    window.addEventListener('sync-status-changed' as any, handleSyncChange);
    window.addEventListener('local-storage-updated', handleLocalUpdate);

    return () => {
      unsubscribe();
      window.removeEventListener('sync-status-changed' as any, handleSyncChange);
      window.removeEventListener('local-storage-updated', handleLocalUpdate);
    };
  }, []);

  const handleSync = async () => {
    if (!user) {
      try {
        await loginWithGoogle();
      } catch (e) {
        return;
      }
    }
    setIsSyncing(true);
    try {
      await syncToCloud();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_emergency_profile', JSON.stringify(profile));
    setHasProfile(true);
    setIsEditing(false);
    if (user) {
      syncToCloud().catch(console.error);
    }
  };

  const handleClear = () => {
    if (confirm(t.confirmDelete)) {
      localStorage.removeItem('user_emergency_profile');
      setProfile(initialProfile);
      setHasProfile(false);
      setIsEditing(true);
    }
  };

  return (
    <div className="px-6 py-8 pb-32">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-black text-neutral-800 leading-none">
              {t.emergency}
            </h2>
            {user ? (
               <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                 <Cloud size={10} /> Sync On
               </div>
            ) : (
               <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 text-neutral-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                 <CloudOff size={10} /> Offline Only
               </div>
            )}
          </div>
          <p className="text-red-500 font-bold text-lg">
            {t.medicalProfile}
          </p>
        </div>
        <div className="flex gap-2">
          {hasProfile && !isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-3 bg-neutral-100 rounded-2xl text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Edit3 size={20} />
            </button>
          )}
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`p-3 rounded-2xl transition-all flex items-center gap-2 ${
              user 
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                : 'bg-neutral-800 text-white hover:bg-neutral-900'
            }`}
          >
            {isSyncing ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : user ? (
              <RefreshCw size={20} />
            ) : (
              <>
                <LogIn size={20} />
                <span className="text-xs font-black uppercase tracking-widest px-1">Sync</span>
              </>
            )}
          </button>
        </div>
      </div>

      {syncStatus.status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
          Sync Error: {syncStatus.message || 'Check your connection'}
        </div>
      )}
      
      {syncStatus.status === 'success' && syncStatus.lastSync && (
        <div className="mb-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 px-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Last synced: {new Date(syncStatus.lastSync).toLocaleTimeString()}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form 
            key="edit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSave} 
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-red-500 mb-2">
                  <User size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {t.personalDetails}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={t.name}
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-red-500"
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder={t.phone}
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-red-500"
                  value={profile.phone}
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  required
                />
              </div>

              <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-red-500 mb-2">
                  <Phone size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {t.emergencyContact}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={t.contactName}
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-red-500"
                  value={profile.emergencyContact}
                  onChange={e => setProfile({...profile, emergencyContact: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder={t.emergencyPhone}
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-red-500"
                  value={profile.emergencyPhone}
                  onChange={e => setProfile({...profile, emergencyPhone: e.target.value})}
                  required
                />
              </div>

              <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-red-500 mb-2">
                  <Droplet size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {t.medicalInfo}
                  </span>
                </div>
                <select
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-red-500"
                  value={profile.bloodGroup}
                  onChange={e => setProfile({...profile, bloodGroup: e.target.value})}
                  required
                >
                  <option value="">{t.selectBlood}</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                <textarea
                  placeholder={t.notesPlaceholder}
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 font-medium focus:ring-2 focus:ring-red-500 min-h-[120px]"
                  value={profile.medicalNotes}
                  onChange={e => setProfile({...profile, medicalNotes: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-4">
              {hasProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-neutral-100 text-neutral-600 font-black py-4 rounded-2xl active:scale-95 transition-transform"
                >
                  {t.cancel}
                </button>
              )}
              <button
                type="submit"
                className="flex-[2] bg-red-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Save size={18} />
                {t.save}
              </button>
            </div>
            {hasProfile && (
              <button
                type="button"
                onClick={handleClear}
                className="w-full text-neutral-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 pt-4"
              >
                <Trash2 size={14} />
                {t.delete}
              </button>
            )}
          </motion.form>
        ) : (
          <motion.div 
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-red-600 text-white p-8 rounded-[40px] shadow-xl shadow-red-100 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">
                  {t.identity}
                </p>
                <h3 className="text-4xl font-black mb-1">{profile.name}</h3>
                <p className="text-xl font-bold opacity-80">{profile.phone}</p>
                
                <div className="mt-8 flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Blood</p>
                    <p className="text-2xl font-black leading-tight">{profile.bloodGroup}</p>
                  </div>
                </div>
              </div>
              <User size={180} className="absolute -right-12 -bottom-12 opacity-5" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-3 text-red-500 mb-4">
                  <Phone size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {t.emergencyContact}
                  </span>
                </div>
                <h4 className="text-xl font-black text-neutral-800">{profile.emergencyContact}</h4>
                <a 
                  href={`tel:${profile.emergencyPhone}`}
                  className="mt-4 w-full bg-neutral-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  {profile.emergencyPhone}
                </a>
              </div>

              {profile.medicalNotes && (
                <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100">
                  <div className="flex items-center gap-3 text-amber-600 mb-4">
                    <FileText size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">
                      {t.notes}
                    </span>
                  </div>
                  <p className="text-amber-900 font-medium leading-relaxed">
                    {profile.medicalNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 bg-neutral-50 rounded-[32px] border border-neutral-100 text-center">
              <p className="text-xs text-neutral-400 font-medium">
                {t.disclaimer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
