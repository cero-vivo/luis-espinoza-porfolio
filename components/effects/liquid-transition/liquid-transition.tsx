"use client"
import React, { useEffect, useState } from 'react';
import styles from './liquid-transition.module.css';

interface LiquidTransitionProps {
  currentSection: number;
  isTransitioning: boolean;
  direction: 'left' | 'right';
}

export const LiquidTransition: React.FC<LiquidTransitionProps> = ({
  currentSection,
  isTransitioning,
  direction
}) => {
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShowTransition(true);
      const timer = setTimeout(() => {
        setShowTransition(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (!showTransition) return null;

  return (
    <div className={`${styles.liquidContainer} ${styles[direction]}`}>
      {/* Liquid blobs */}
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className={styles.liquidBlob}
          style={{
            '--delay': `${index * 0.1}s`,
            '--size': `${Math.random() * 100 + 50}px`,
            '--duration': `${Math.random() * 0.5 + 0.8}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Main transition wave */}
      <div className={styles.transitionWave}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            className={styles.wavePath}
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            className={styles.wavePath}
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path
            className={styles.wavePath}
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          />
        </svg>
      </div>

      {/* Floating particles during transition */}
      <div className={styles.transitionParticles}>
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className={styles.floatingParticle}
            style={{
              '--delay': `${index * 0.05}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Morphing shape overlay */}
      <div className={styles.morphingOverlay}>
        <svg className={styles.morphSvg} viewBox="0 0 400 400">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            className={styles.morphPath}
            d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z"
            filter="url(#glow)"
          />
        </svg>
      </div>
    </div>
  );
};