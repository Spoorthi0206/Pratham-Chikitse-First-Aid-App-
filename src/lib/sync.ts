import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

export interface SyncStatus {
  lastSync: number | null;
  status: 'idle' | 'syncing' | 'error' | 'success';
  message?: string;
}

const STORAGE_KEYS = {
  PROFILE: 'user_emergency_profile',
  HOSPITALS: 'user_hospitals',
  SYNC_STATUS: 'sync_status'
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const getLocalData = () => {
  const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  const hospitals = localStorage.getItem(STORAGE_KEYS.HOSPITALS);
  return {
    profile: profile ? JSON.parse(profile) : null,
    hospitals: hospitals ? JSON.parse(hospitals) : []
  };
};

export const syncToCloud = async () => {
  if (!auth.currentUser) return;

  const uid = auth.currentUser.uid;
  const { profile, hospitals } = getLocalData();

  setSyncStatus({ status: 'syncing' });

  try {
    // 1. Sync Profile
    if (profile) {
      const profilePath = `users/${uid}/profile/medical`;
      try {
        await setDoc(doc(db, profilePath), {
          ...profile,
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, profilePath);
      }
    }

    // 2. Sync Hospitals
    const hospitalsColPath = `users/${uid}/hospitals`;
    // We'll push each hospital. For simplicity, we'll overwite cloud with local for now
    // A better way would be some diffing, but this is a "basic mechanism"
    const cloudDocs = await getDocs(collection(db, hospitalsColPath));
    
    // Delete items in cloud that aren't in local? 
    // Or just push all local items with stable IDs
    for (const h of hospitals) {
      const hId = h.id ? h.id.toString() : Math.random().toString(36).substring(7);
      const hPath = `${hospitalsColPath}/${hId}`;
      try {
        await setDoc(doc(db, hPath), {
          name: h.name,
          phone: h.phone,
          city: h.city || '',
          area: h.area || '',
          lat: typeof h.lat === 'number' ? h.lat : null,
          lng: typeof h.lng === 'number' ? h.lng : null,
          specialties: h.specialties || [],
          rating: typeof h.rating === 'number' ? h.rating : 5,
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, hPath);
      }
    }

    setSyncStatus({ status: 'success', lastSync: Date.now() });
  } catch (error) {
    setSyncStatus({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
};

export const pullFromCloud = async () => {
  if (!auth.currentUser) return;
  const uid = auth.currentUser.uid;
  setSyncStatus({ status: 'syncing' });

  try {
    // 1. Pull Profile
    const profileSnap = await getDoc(doc(db, `users/${uid}/profile/medical`));
    if (profileSnap.exists()) {
      const data = profileSnap.data();
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data));
    }

    // 2. Pull Hospitals
    const hospitalsSnap = await getDocs(collection(db, `users/${uid}/hospitals`));
    const hospitals = hospitalsSnap.docs.map(d => ({ ...d.data(), id: d.id }));
    if (hospitals.length > 0) {
      localStorage.setItem(STORAGE_KEYS.HOSPITALS, JSON.stringify(hospitals));
    }

    setSyncStatus({ status: 'success', lastSync: Date.now() });
    window.dispatchEvent(new Event('local-storage-updated'));
  } catch (error) {
    setSyncStatus({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
};

export const setSyncStatus = (status: Partial<SyncStatus>) => {
  const current = getSyncStatus();
  const updated = { ...current, ...status };
  localStorage.setItem(STORAGE_KEYS.SYNC_STATUS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('sync-status-changed', { detail: updated }));
};

export const getSyncStatus = (): SyncStatus => {
  const status = localStorage.getItem(STORAGE_KEYS.SYNC_STATUS);
  return status ? JSON.parse(status) : { lastSync: null, status: 'idle' };
};

// Initial sync on auth change
onAuthStateChanged(auth, (user) => {
  if (user && navigator.onLine) {
    syncToCloud().catch(console.error);
  }
});

// Sync on online recovery
window.addEventListener('online', () => {
  if (auth.currentUser) {
    syncToCloud().catch(console.error);
  }
});
