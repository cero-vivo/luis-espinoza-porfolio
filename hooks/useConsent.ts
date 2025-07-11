'use client'

import { useEffect } from 'react';
import { useConsentStore } from '@/model/consent-store';

export const useConsent = () => {
  const consent = useConsentStore((s) => s.consent);
  const grant = useConsentStore((s) => s.grant);
  const deny = useConsentStore((s) => s.deny);

  // Asegura que al hidratar leamos localStorage si el estado es unknown
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (consent !== 'unknown') return;
    const stored = localStorage.getItem('analytics_consent');
    if (stored === 'granted') grant();
    if (stored === 'denied') deny();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { consent, grant, deny } as const;
}; 