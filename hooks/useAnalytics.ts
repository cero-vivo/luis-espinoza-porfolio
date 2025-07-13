'use client'

import { useEffect, useCallback } from 'react';
import { logEvent } from 'firebase/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { initFirebase, getFirebaseAnalytics } from '@/lib/firebase';
import { useConsent } from '@/hooks/useConsent';
import { Sections } from '@/types/constant';

export const usePageView = (enabled: boolean = true) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!enabled) return;
		initFirebase();
	}, [enabled]);

	// Dispara page_view cuando cambie la ruta
	useEffect(() => {
		if (!enabled) return;
		const sendPageView = async () => {
			// Nos aseguramos de que Firebase esté listo
			await initFirebase();
			const analytics = getFirebaseAnalytics();
			if (!analytics) return;

			const query = searchParams?.toString();
			const page_path = query ? `${pathname}?${query}` : pathname;

			logEvent(analytics, 'page_view', { page_path });
		};

		sendPageView();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled, pathname, searchParams]);
};

/**
 * Hook para rastrear cambios de sección específicos
 * Emite eventos cuando el usuario cambia de sección
 */
export const useSectionTracking = (currentSection: Sections, enabled: boolean = true) => {
	const { consent } = useConsent();
	let timer: ReturnType<typeof setTimeout> | undefined;

	useEffect(() => {
		if (!enabled || consent !== 'granted') return;

		// Espera 1 segundo antes de enviar el evento (debounce)
		timer = setTimeout(async () => {

			await initFirebase();
			const analytics = getFirebaseAnalytics();
			if (!analytics) return;

			logEvent(analytics, 'section_viewed', {
				section_name: currentSection,
				section_type: 'portfolio_section',
				timestamp: new Date().toISOString()
			});
		}, 1000);

		return () => {
			// Limpia el timeout si el usuario cambia de sección antes de 1s
			if (timer) clearTimeout(timer);
		};
	}, [currentSection, enabled, consent]);
};

/**
 * Devuelve una función para enviar eventos custom.
 * Ejemplo de uso: const track = useTrackEvent(); track('download_cv');
 */
export const useTrackEvent = () => {
	const { consent } = useConsent();
	// aseguramos que Firebase esté inicializado cuando haya consentimiento
	useEffect(() => {
		if (consent !== 'granted') return;
		initFirebase();
	}, [consent]);

	return useCallback((name: string, params?: Record<string, any>) => {
		if (consent !== 'granted') return;
		const analytics = getFirebaseAnalytics();
		if (!analytics) return;
		logEvent(analytics, name, params);
	}, [consent]);
}; 