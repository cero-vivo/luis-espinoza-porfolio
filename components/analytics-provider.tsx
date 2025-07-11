'use client'

import { usePageView } from '@/hooks/useAnalytics';
import { useConsent } from '@/hooks/useConsent';

export default function AnalyticsProvider() {
  const { consent } = useConsent();
  // Registra vistas de página globalmente SOLO si hay consentimiento.
  usePageView(consent === 'granted');
  return null; // no renderiza nada en la UI
} 