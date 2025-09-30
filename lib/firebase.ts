import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

// Garantiza no re-ejecutar la inicialización cuando Next.js refresca módulos en desarrollo
let analytics: Analytics | undefined;

export const initFirebase = async () => {
  // Solo en navegador; en render del servidor 'window' no existe.
  if (typeof window === "undefined") return;

  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    } as const;

    const requiredKeys: Array<keyof typeof firebaseConfig> = [
      "apiKey",
      "authDomain",
      "projectId",
      "appId",
    ];

    const isConfigValid = requiredKeys.every((key) => Boolean(firebaseConfig[key]));

    if (!isConfigValid) {
      console.warn('Firebase skipped: missing NEXT_PUBLIC firebase configuration.');
      return;
    }

    const app = initializeApp(firebaseConfig);

    // getAnalytics solo está disponible en navegadores compatibles (no en SSR ni en Safari iOS sin cookies)
    if (await isSupported()) {
      analytics = getAnalytics(app);
    }
  }
};

export const getFirebaseAnalytics = () => analytics; 
