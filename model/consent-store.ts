import { create } from 'zustand';

export type ConsentStatus = 'granted' | 'denied' | 'unknown';

interface ConsentState {
  consent: ConsentStatus;
  grant: () => void;
  deny: () => void;
}

const getInitialConsent = (): ConsentStatus => {
  if (typeof window === 'undefined') return 'unknown';
  const stored = localStorage.getItem('analytics_consent') as ConsentStatus | null;
  return stored === 'granted' || stored === 'denied' ? stored : 'unknown';
};

export const useConsentStore = create<ConsentState>((set) => ({
  consent: getInitialConsent(),
  grant: () => {
    localStorage.setItem('analytics_consent', 'granted');
    set({ consent: 'granted' });
  },
  deny: () => {
    localStorage.setItem('analytics_consent', 'denied');
    set({ consent: 'denied' });
  },
})); 