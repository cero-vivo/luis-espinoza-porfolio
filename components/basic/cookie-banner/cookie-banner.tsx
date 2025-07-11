'use client'

import { useConsent } from '@/hooks/useConsent';
import { useState, useEffect } from 'react';
import styles from './cookie-banner.module.css';

export const CookieBanner = () => {
  const { consent, grant, deny } = useConsent();
  const [closed, setClosed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Solo renderizar después de montar para evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleAccept = () => {
    console.log("🚀 ~ handleAccept clicked")
    setClosed(true);
    grant();
  };

  const handleReject = () => {
    console.log("🚀 ~ handleReject clicked")
    setClosed(true);
    deny();
  };
  
  // No renderizar hasta que esté montado
  if (!mounted) return null;
  
  // Primero check si está cerrado, luego si ya hay consentimiento
  if(closed) return null;
  if(consent === 'granted' || consent === 'denied') return null;
  
  return (
    <div className={styles.container}>
      <span className={styles.message}>
        Este sitio utiliza cookies analíticas para medir el tráfico y mejorar tu experiencia. ¿Aceptas?
      </span>
      <div className={styles.buttons}>
        <button type="button" className={styles.acceptButton} onClick={handleAccept}>
          Aceptar
        </button>
        <button type="button" className={styles.rejectButton} onClick={handleReject}>
          Rechazar
        </button>
      </div>
    </div>
  );
} 