import { MapPin, Phone, ExternalLink, Search, Globe, Navigation, LocateFixed, Trash2, Map as MapIcon, List, AlertCircle, Loader2 } from 'lucide-react';
import { hospitals as rawHospitals } from '../data/emergencies';
import { useState, useEffect, useMemo, useCallback } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { auth } from '../lib/firebase';
import { syncToCloud } from '../lib/sync';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY.length > 10;

const hospitals = rawHospitals || [];

// Helper component to handle map bounds and interactions
function MapHandler({ hospitals, userLocation, onMapIdle }: { hospitals: any[], userLocation: { lat: number, lng: number } | null, onMapIdle?: (map: google.maps.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!map || hospitals.length === 0 || typeof google === 'undefined') return;

    const bounds = new google.maps.LatLngBounds();
    let hasPoints = false;

    hospitals.forEach(h => {
      if (h.lat && h.lng) {
        bounds.extend({ lat: h.lat, lng: h.lng });
        hasPoints = true;
      }
    });

    if (userLocation) {
      bounds.extend(userLocation);
      hasPoints = true;
    }

    if (hasPoints) {
      map.fitBounds(bounds, 50);
      const listener = google.maps.event.addListenerOnce(map, 'idle', () => {
        if (map.getZoom()! > 15) map.setZoom(15);
      });
    }
  }, [map, hospitals, userLocation]);

  useEffect(() => {
    if (!map || !onMapIdle) return;
    const listener = map.addListener('idle', () => onMapIdle(map));
    return () => google.maps.event.removeListener(listener);
  }, [map, onMapIdle]);

  return null;
}

// Distance calculation using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default function HospitalFinder({ language }: { language: Language }) {
  const translations: Record<Language, any> = {
    en: { keyRequired: 'Google Maps API Key Required' },
    kn: { keyRequired: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಎಪಿಐ ಕೀ ಅಗತ್ಯವಿದೆ' },
    hi: { keyRequired: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಎಪಿಐ कुंजी आवश्यक है' },
    te: { keyRequired: 'Google Maps API కీ అవసరం' },
    ta: { keyRequired: 'கூகிள் மேப்ஸ் ஏபிஐ கீ தேவை' }
  };
  const t = translations[language] || translations.en;

  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-[40px] shadow-xl border border-neutral-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-black text-neutral-800 mb-4">{t.keyRequired}</h2>
          <div className="text-left space-y-4 text-neutral-600 text-sm mb-8">
            <p className="font-bold">To enable accurate maps, please add your Google Maps API Key:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open <strong>Settings</strong> (⚙️ icon, top-right)</li>
              <li>Select <strong>Secrets</strong></li>
              <li>Add <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
              <li>Paste your key and press <strong>Enter</strong></li>
            </ol>
            <p className="text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              Your key starting with <code className="text-red-500">AIza...</code> is ready to use. 
              The app builds automatically once added.
            </p>
          </div>
          <a 
            href="https://console.cloud.google.com/google/maps-apis/start" 
            target="_blank" 
            rel="noopener"
            className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-transform"
          >
            Get API Key
          </a>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <HospitalFinderContent language={language} />
    </APIProvider>
  );
}

function HospitalFinderContent({ language }: { language: Language }) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userAddedHospitals, setUserAddedHospitals] = useState<any[]>([]);
  const [apiHospitals, setApiHospitals] = useState<any[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newHospital, setNewHospital] = useState({ name: '', phone: '', city: '', area: '', lat: '', lng: '', specialties: '', rating: '5' });
  const [selectedHospital, setSelectedHospital] = useState<any | null>(null);

  const placesLib = useMapsLibrary('places');

  const translations: Record<Language, any> = {
    en: { nearby: 'Nearby', emergency: 'Emergency Centers', locate: 'Locate Me', located: 'Located', placeholder: 'Search city or hospital...', noResult: 'No centers found', keyRequired: 'Google Maps API Key Required' },
    kn: { nearby: 'ಹತ್ತಿರದ', emergency: 'ತುರ್ತು ಕೇಂದ್ರಗಳು', locate: 'ನನ್ನನ್ನು ಗುರುತಿಸಿ', located: 'ಗುರುತಿಸಲಾಗಿದೆ', placeholder: 'ನಗರ ಅಥವಾ ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ...', noResult: 'ಯಾವುದೇ ಕೇಂದ್ರಗಳು ಕಂಡುಬಂದಿಲ್ಲ', keyRequired: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಎಪಿಐ ಕೀ ಅಗತ್ಯವಿದೆ' },
    hi: { nearby: 'निकटतम', emergency: 'आपातकालीन केंद्र', locate: 'मेरी स्थिति', located: 'स्थित', placeholder: 'शहर या अस्पताल खोजें...', noResult: 'कोई केंद्र नहीं मिला', keyRequired: 'गूगल मैप्स एपीआई कुंजी आवश्यक है' },
    te: { nearby: 'సమీపంలోని', emergency: 'అత్యవసర కేంద్రాలు', locate: 'నన్ను గుర్తించు', located: 'గుర్తించబడింది', placeholder: 'నగరం లేదా ఆస్పత్రి...', noResult: 'ఏమీ దొరకలేదు', keyRequired: 'Google Maps API కీ అవసరం' },
    ta: { nearby: 'அருகிலுள்ள', emergency: 'அவசர மையங்கள்', locate: 'இருப்பிடம்', located: 'கண்டறியப்பட்டது', placeholder: 'தேடவும்...', noResult: 'எதுவும் கிடைக்கவில்லை', keyRequired: 'கூகிள் மேப்ஸ் ஏபிஐ கீ தேவை' }
  };

  const t = translations[language] || translations.en;

  // Load user added hospitals from storage
  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('user_hospitals');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setUserAddedHospitals(parsed);
          }
        } catch (e) {
          console.error("Failed to load saved hospitals");
        }
      }
    };

    handleUpdate();
    window.addEventListener('local-storage-updated', handleUpdate);
    return () => window.removeEventListener('local-storage-updated', handleUpdate);
  }, []);

  const searchHospitals = useCallback(async (query: string, location?: { lat: number, lng: number }) => {
    if (!placesLib || !hasValidKey) return;
    
    setIsLoadingApi(true);
    const container = document.createElement('div');
    const service = new google.maps.places.PlacesService(container);

    const searchQuery = query ? `${query} hospitals government medical center` : 'hospitals government clinics medical centers';
    
    const request: google.maps.places.PlaceSearchRequest = {
      keyword: searchQuery,
      location: location ? new google.maps.LatLng(location.lat, location.lng) : undefined,
      radius: location ? 20000 : undefined, // 20km radius if location provided
      type: 'hospital'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const centers = results.map(place => ({
          name: place.name,
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
          rating: place.rating || 0,
          city: place.vicinity || 'Local Area',
          phone: '', 
          placeId: place.place_id,
          specialties: ['General', 'Medical Center'],
          isApi: true
        }));
        setApiHospitals(centers);
      }
      setIsLoadingApi(false);
    });
  }, [placesLib]);

  // Debounced search for API results
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 3) {
        searchHospitals(search);
      } else if (userLocation) {
        searchHospitals('', userLocation);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, userLocation, searchHospitals]);

  const allSpecialties = useMemo(() => {
    const specs = new Set<string>();
    const allHospitals = [...userAddedHospitals, ...hospitals, ...apiHospitals];
    allHospitals.forEach(h => {
      if (h.specialties) h.specialties.forEach((s: string) => specs.add(s));
    });
    return Array.from(specs).sort();
  }, [userAddedHospitals, apiHospitals]);

  const processedHospitals = useMemo(() => {
    const listHospitals = Array.isArray(hospitals) ? hospitals : [];
    const listUserHospitals = Array.isArray(userAddedHospitals) ? userAddedHospitals : [];
    const listApiHospitals = Array.isArray(apiHospitals) ? apiHospitals : [];
    
    // Merge all and remove duplicates by name
    const rawAll = [...listUserHospitals, ...listHospitals, ...listApiHospitals];
    const uniqueMap = new Map();
    rawAll.forEach(h => {
      const key = h.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, h);
      } else if (h.isApi && !uniqueMap.get(key).isApi) {
        // Keep the local one if it exists
      } else if (h.rating >= (uniqueMap.get(key).rating || 0)) {
        uniqueMap.set(key, h);
      }
    });

    const allHospitals = Array.from(uniqueMap.values());
    
    let list = allHospitals.map((h: any) => {
      let realDist = null;
      if (userLocation && h.lat && h.lng) {
        realDist = calculateDistance(userLocation.lat, userLocation.lng, h.lat, h.lng);
      }
      return { ...h, realDist };
    });

    if (minRating > 0) {
      list = list.filter(h => (h.rating || 0) >= minRating);
    }

    if (selectedSpecialty) {
      list = list.filter(h => h.specialties?.includes(selectedSpecialty));
    }

    if (search) {
      const sLower = search.toLowerCase().trim();
      const aliases: Record<string, string[]> = {
        'bengaluru': ['bangalore', 'blr', 'ಬೆಂಗಳೂರು', 'ಬೆಂಗಳೂರು ನಗರ', 'banagalore', 'banglore'],
        'mysuru': ['mysore', 'mys', 'ಮೈಸೂರು'],
        'mangaluru': ['mangalore', 'mlr', 'ಮಂಗಳೂರು', 'mangalam', 'manglore'],
        'hubballi': ['hubli', 'ಹುಬ್ಬಳ್ಳಿ'],
        'dharwad': ['dharwad', 'ಧಾರವಾಡ'],
        'belagavi': ['belgaum', 'ಬೆಳಗಾವಿ'],
        'kalaburagi': ['gulbarga', 'ಕಲಬುರಗಿ'],
        'davanagere': ['davangere', 'ದಾವಣಗೆರೆ', 'devanagari'],
        'udupi': ['udupi', 'ಉಡುಪಿ'],
        'shivamogga': ['shimoga', 'ಶಿವಮೊಗ್ಗ']
      };

      list = list.filter(h => {
        const name = (h.name || '').toLowerCase();
        const city = (h.city || '').toLowerCase();
        const area = (h.area || '').toLowerCase();
        const specialties = (h.specialties || []).join(' ').toLowerCase();
        
        const checkMatch = (term: string) => {
          if (name.includes(term) || city.includes(term) || area.includes(term) || specialties.includes(term)) return true;
          // Alias check
          for (const [key, aliasList] of Object.entries(aliases)) {
            const matchesAlias = aliasList.some(a => a.toLowerCase().includes(term) || term.includes(a.toLowerCase())) || key.includes(term);
            if (matchesAlias && city.includes(key)) return true;
          }
          return false;
        };

        // Direct match with full search string
        if (checkMatch(sLower)) return true;
        
        // Multi-word search
        const words = sLower.split(/\s+/).filter(w => w.length > 2);
        if (words.length > 1) {
           return words.every(word => checkMatch(word));
        }

        return false;
      });
    } else if (!userLocation) {
      // If no search and no location, return empty list to prompt interaction
      return [];
    }

    if (sortBy === 'distance' && userLocation) {
      list.sort((a, b) => (a.realDist || 9999) - (b.realDist || 9999));
      if (!search) list = list.slice(0, 30);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      if (!search) list = list.slice(0, 30);
    }

    return list;
  }, [search, minRating, selectedSpecialty, sortBy, userLocation, userAddedHospitals, apiHospitals]);

  const pinCurrentLocation = () => {
    if (userLocation) {
      setNewHospital({ ...newHospital, lat: userLocation.lat.toString(), lng: userLocation.lng.toString() });
    } else {
      requestLocation();
    }
  };

  const saveHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospital.name || !newHospital.phone) return;
    
    const updated = [
      ...userAddedHospitals, 
      { 
        ...newHospital, 
        lat: newHospital.lat ? parseFloat(newHospital.lat) : undefined,
        lng: newHospital.lng ? parseFloat(newHospital.lng) : undefined,
        rating: parseFloat(newHospital.rating) || 5,
        specialties: newHospital.specialties.split(',').map(s => s.trim()).filter(Boolean),
        distance: 'Added by you', 
        id: Date.now() 
      }
    ];
    setUserAddedHospitals(updated);
    localStorage.setItem('user_hospitals', JSON.stringify(updated));
    if (auth.currentUser) {
      syncToCloud().catch(console.error);
    }
    setNewHospital({ name: '', phone: '', city: '', area: '', lat: '', lng: '', specialties: '', rating: '5' });
    setIsAdding(false);
  };

  const deleteHospital = (id: number) => {
    const updated = userAddedHospitals.filter(h => h.id !== id);
    setUserAddedHospitals(updated);
    localStorage.setItem('user_hospitals', JSON.stringify(updated));
    if (auth.currentUser) {
      syncToCloud().catch(console.error);
    }
  };

  const requestLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setIsLocating(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const openInMaps = (hospitalName: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospitalName + " emergency hospital")}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-black text-neutral-800 leading-none">{t.nearby}</h2>
            <p className="text-red-500 font-bold text-lg">{t.emergency}</p>
            {processedHospitals.length > 0 && (
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2 bg-neutral-100 inline-block px-2 py-1 rounded-md">
                {processedHospitals.length} {language === 'en' ? 'Centers Found' : 'ಕೇಂದ್ರಗಳು ಕಂಡುಬಂದಿವೆ'}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <div className="bg-neutral-100 p-1 rounded-2xl flex items-center shadow-inner">
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-white text-red-600 shadow-sm' : 'text-neutral-400'}`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'map' ? 'bg-white text-red-600 shadow-sm' : 'text-neutral-400'}`}
              >
                <MapIcon size={20} />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdding(!isAdding)}
              className={`p-4 rounded-3xl flex items-center justify-center transition-colors ${isAdding ? 'bg-neutral-800 text-white' : 'bg-white border border-neutral-100 text-neutral-800 shadow-sm'}`}
            >
              <Phone size={20} className={isAdding ? 'rotate-45' : ''} />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={requestLocation}
              disabled={isLocating}
              className={`p-4 rounded-3xl flex items-center gap-2 transition-colors ${userLocation ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-600 text-white shadow-lg shadow-red-200'}`}
            >
              {isLocating ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Navigation size={20} />
                </motion.div>
              ) : userLocation ? (
                <LocateFixed size={20} />
              ) : (
                <Navigation size={20} />
              )}
              <span className="font-black text-xs uppercase tracking-widest hidden sm:inline">
                {userLocation ? t.located : t.locate}
              </span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
              <form onSubmit={saveHospital} className="bg-neutral-900 p-6 rounded-[32px] space-y-4">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">
                  {language === 'en' ? 'Add Personal Contact' : 'ವೈಯಕ್ತಿಕ ಸಂಪರ್ಕ ಸೇರಿಸಿ'}
                </h3>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? "Hospital or Doctor Name" : "ಆಸ್ಪತ್ರೆ ಅಥವಾ ವೈದ್ಯರ ಹೆಸರು"}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={newHospital.name}
                  onChange={e => setNewHospital({...newHospital, name: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    placeholder={language === 'en' ? "Phone Number" : "ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={newHospital.phone}
                    onChange={e => setNewHospital({...newHospital, phone: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder={language === 'en' ? "City" : "ನಗರ"}
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={newHospital.city}
                    onChange={e => setNewHospital({...newHospital, city: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder={language === 'en' ? "Area" : "ಪ್ರದೇಶ"}
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={newHospital.area}
                    onChange={e => setNewHospital({...newHospital, area: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={language === 'en' ? "Specialties (comma separated)" : "ವಿಶೇಷತೆಗಳು (ವಿರಾಮ ಚಿಹ್ನೆಯೊಂದಿಗೆ)"}
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={newHospital.specialties}
                    onChange={e => setNewHospital({...newHospital, specialties: e.target.value})}
                  />
                  <select
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={newHospital.rating}
                    onChange={e => setNewHospital({...newHospital, rating: e.target.value})}
                  >
                    <option value="5" className="text-black">5 Stars</option>
                    <option value="4" className="text-black">4 Stars</option>
                    <option value="3" className="text-black">3 Stars</option>
                    <option value="2" className="text-black">2 Stars</option>
                    <option value="1" className="text-black">1 Star</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Lat" className="bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none" value={newHospital.lat} onChange={e => setNewHospital({...newHospital, lat: e.target.value})} />
                    <input type="text" placeholder="Lng" className="bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none" value={newHospital.lng} onChange={e => setNewHospital({...newHospital, lng: e.target.value})} />
                  </div>
                  <button type="button" onClick={pinCurrentLocation} className="bg-green-600/20 text-green-400 p-3 rounded-xl border border-green-600/30 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    <LocateFixed size={14} /> {language === 'en' ? 'Pin My Spot' : 'ನನ್ನ ಸ್ಥಳ'}
                  </button>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-2xl active:scale-95 transition-transform">
                  {language === 'en' ? 'Save Locally' : 'ಉಳಿಸಿ'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {locationError && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-xs font-bold">
            {language === 'en' ? 'Location Access Error: ' : 'ಸ್ಥಳ ಪ್ರವೇಶ ದೋಷ: '} {locationError}
            <br />
            <span className="font-normal opacity-70">
              {language === 'en' ? 'Showing offline database results instead.' : 'ಬದಲಿಗೆ ಆಫ್​ಲೈನ್ ಡೇಟಾಬೇಸ್ ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.'}
            </span>
          </div>
        )}

        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={t.placeholder}
              className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-100 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-neutral-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute inset-y-0 right-4 flex items-center text-neutral-400 hover:text-neutral-600">
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 px-1">
            <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="bg-white border border-neutral-100 rounded-2xl px-4 py-2 text-xs font-bold text-neutral-600 focus:outline-none shadow-sm">
              <option value="">{language === 'en' ? 'All Specialties' : 'ಎಲ್ಲಾ ವಿಶೇಷತೆಗಳು'}</option>
              {allSpecialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="bg-white border border-neutral-100 rounded-2xl px-4 py-2 text-xs font-bold text-neutral-600 focus:outline-none shadow-sm">
              <option value="0">{language === 'en' ? 'Any Rating' : 'ಯಾವುದೇ ರೇಟಿಂಗ್'}</option>
              <option value="4">4.0+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')} className="bg-white border border-neutral-100 rounded-2xl px-4 py-2 text-xs font-bold text-neutral-600 focus:outline-none shadow-sm">
              <option value="distance">{language === 'en' ? 'Sort by Distance' : 'ದೂರದ ಆಧಾರದಲ್ಲಿ ವಿಂಗಡಿಸಿ'}</option>
              <option value="rating">{language === 'en' ? 'Sort by Rating' : 'ರೇಟಿಂಗ್ ಆಧಾರದಲ್ಲಿ ವಿಂಗಡಿಸಿ'}</option>
            </select>
          </div>
        </div>

        {viewMode === 'map' ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 relative ">
            <div className="w-full h-[450px] bg-neutral-100 rounded-[40px] border-4 border-white shadow-xl overflow-hidden z-0 relative">
              <GoogleMap
                defaultCenter={userLocation || { lat: 12.9716, lng: 77.5946 }}
                defaultZoom={11}
                mapId="pratham_chikitse_map"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              >
                <MapHandler hospitals={processedHospitals} userLocation={userLocation} />
                {userLocation && (
                  <AdvancedMarker position={userLocation} title="You are here">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-10 h-10 bg-blue-500/20 rounded-full animate-ping" />
                      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10" />
                    </div>
                  </AdvancedMarker>
                )}

                {processedHospitals.map((h, i) => {
                  if (!h.lat || !h.lng) return null;
                  const specialtiesStr = h.specialties?.join(' ') || '';
                  const isEmergency = specialtiesStr.includes('Emergency') || specialtiesStr.includes('Trauma') || specialtiesStr.includes('Casualty');
                  const isHighRated = (h.rating || 0) >= 4.5;
                  return (
                    <AdvancedMarker key={i} position={{ lat: h.lat, lng: h.lng }} onClick={() => setSelectedHospital(h)}>
                      <Pin background={isEmergency ? "#ef4444" : (isHighRated ? "#f59e0b" : "#3b82f6")} borderColor="#fff" glyphColor="#fff" scale={isEmergency ? 1.2 : 1} />
                    </AdvancedMarker>
                  );
                })}

                {selectedHospital && (
                  <InfoWindow position={{ lat: selectedHospital.lat, lng: selectedHospital.lng }} onCloseClick={() => setSelectedHospital(null)}>
                    <div className="p-1 min-w-[200px] font-sans">
                      <h4 className="font-black text-neutral-900 text-sm mb-1 leading-tight">{selectedHospital.name}</h4>
                      <div className="flex items-center gap-1 mb-2">
                         <span className="text-amber-500 text-[10px] font-black">★ {selectedHospital.rating}</span>
                         <span className="text-[10px] text-neutral-400 font-bold uppercase">{selectedHospital.area ? `${selectedHospital.area}, ` : ''}{selectedHospital.city}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {selectedHospital.specialties?.slice(0, 2).map((s: string, idx: number) => (
                          <span key={idx} className="bg-neutral-100 text-[8px] font-bold px-1.5 py-0.5 rounded text-neutral-500">{s}</span>
                        ))}
                      </div>
                      <a href={`tel:${selectedHospital.phone}`} className="block text-center bg-red-600 text-white text-[10px] font-black py-2 rounded-lg shadow-soft no-underline active:scale-95 transition-transform">
                        CALL {selectedHospital.phone}
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>

              {/* Map Legend */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-2xl border border-neutral-100 shadow-xl z-[1000] space-y-2 pointer-events-none sm:pointer-events-auto">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Legend</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-white" />
                  <span className="text-[10px] font-bold text-neutral-700">{language === 'en' ? 'Emergency / Trauma' : 'ತುರ್ತು / ಆಘಾತ'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b] border border-white" />
                  <span className="text-[10px] font-bold text-neutral-700">{language === 'en' ? 'High Rated (4.5+ ★)' : 'ಉನ್ನತ ರೇಟಿಂಗ್'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] border border-white" />
                  <span className="text-[10px] font-bold text-neutral-700">{language === 'en' ? 'Medical Center' : 'ವೈದ್ಯಕೀಯ ಕೇಂದ್ರ'}</span>
                </div>
              </div>

              {processedHospitals.length === 0 && search && (
                <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-[1001]">
                   <div className="bg-white p-8 rounded-[32px] shadow-2xl text-center max-w-xs scale-90">
                      <Search className="mx-auto text-red-500 mb-4" size={32} />
                      <p className="text-neutral-800 font-black mb-2">{t.noResult}</p>
                      <button onClick={() => setSearch('')} className="bg-neutral-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                        {language === 'en' ? 'Reset Search' : 'ಹುಡುಕಾಟ ಅಳಿಸಿ'}
                      </button>
                   </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl border border-neutral-100 shadow-sm z-[1000] pointer-events-none">
               <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">Google Maps High Precision Mode</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4 mb-24">
            {processedHospitals.length > 0 ? (
              processedHospitals.map((hospital, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-white border border-neutral-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter">{hospital.area ? `${hospital.area}, ` : ''}{hospital.city}</span>
                        {hospital.rating && <span className="bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">★ {hospital.rating}</span>}
                        <span className="text-red-500 text-xs font-black flex items-center gap-1">
                          <MapPin size={12} strokeWidth={3} /> {hospital.realDist ? `${hospital.realDist.toFixed(1)} km away` : `${hospital.distance} away`}
                        </span>
                      </div>
                      <h3 className="font-black text-xl text-neutral-900 leading-tight group-hover:text-red-600 transition-colors">{hospital.name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                         {hospital.specialties?.map((spec: string, sIdx: number) => (
                           <span key={sIdx} className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-md">{spec}</span>
                         ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {hospital.id && <button onClick={() => deleteHospital(hospital.id)} className="bg-neutral-50 text-neutral-400 p-4 rounded-3xl hover:bg-neutral-200 hover:text-neutral-800 transition-colors"><Trash2 size={20} /></button>}
                      <button onClick={() => openInMaps(hospital.name)} className="bg-neutral-50 text-neutral-400 p-4 rounded-3xl hover:bg-red-50 hover:text-red-500 transition-colors"><ExternalLink size={20} /></button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={`tel:${hospital.phone}`} className="flex-1 bg-neutral-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                      <Phone size={18} /> {language === 'en' ? 'Emergency' : 'ತುರ್ತು'} <span className="ml-1 opacity-50 font-medium text-xs">{hospital.phone}</span>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : !search && !userLocation ? (
              <div className="text-center py-20 bg-neutral-50 rounded-[40px] border border-dashed border-neutral-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Navigation className="text-red-600 animate-pulse" size={32} />
                </div>
                <h3 className="text-xl font-black text-neutral-800 mb-2">
                  {language === 'en' ? 'Find Emergency Centers' : 'ತುರ್ತು ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ'}
                </h3>
                <p className="text-neutral-500 text-sm max-w-[280px] mx-auto mb-8 font-medium">
                  {language === 'en' ? 'Search for your city or enable location to see the most accurate results near you.' : 'ನಿಮ್ಮ ನಗರಕ್ಕಾಗಿ ಹುಡುಕಿ ಅಥವಾ ನಿಮ್ಮ ಹತ್ತಿರವಿರುವ ಅತ್ಯಂತ ನಿಖರವಾದ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಲು ಸ್ಥಳವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.'}
                </p>
                <div className="flex flex-col gap-3 max-w-[200px] mx-auto">
                   <button 
                    onClick={requestLocation}
                    className="bg-red-600 text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-red-200"
                   >
                     {t.locate}
                   </button>
                   <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">— OR —</p>
                   <div className="text-xs text-neutral-500 font-bold italic">
                     {language === 'en' ? 'Start typing in search box above' : 'ಮೇಲಿನ ಹುಡುಕಾಟ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ಟೈಪ್ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ'}
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-neutral-50 rounded-[40px] border border-dashed border-neutral-200">
                <Search className="mx-auto text-neutral-200 mb-4" size={48} />
                <p className="text-neutral-400 font-black uppercase tracking-widest text-xs mb-4">{t.noResult}</p>
                {search && <button onClick={() => setSearch('')} className="bg-neutral-800 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform">{language === 'en' ? 'Clear Search' : 'ಹುಡುಕಾಟ ಅಳಿಸಿ'}</button>}
              </div>
            )}
          </div>
        )}
        
        <div className="bg-red-600 text-white p-8 rounded-[40px] relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/60 mb-2">Primary Helpline</p>
            <h4 className="text-5xl font-black tracking-tighter">108</h4>
            <p className="text-sm text-white/90 mt-4 font-bold leading-relaxed max-w-[220px]">
              {language === 'en' ? 'The state ambulance service can detect your location automatically during the call.' : 'ಕರೆ ಮಾಡಿದಾಗ ಅಂಬ್ಯುಲೆನ್ಸ್ ಸೇವೆಯು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಹಚ್ಚುತ್ತದೆ.'}
            </p>
          </div>
          <Phone className="absolute -right-8 -bottom-8 text-white/10" size={180} />
        </div>
      </div>
  );
}
