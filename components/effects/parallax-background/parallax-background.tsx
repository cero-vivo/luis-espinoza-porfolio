"use client"
import React, { useEffect, useState } from 'react';
import styles from './parallax-background.module.css';

interface ParallaxBackgroundProps {
  currentSection: number;
  totalSections: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  currentSection,
  totalSections
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating particles based on current section
  const generateParticles = () => {
    const particleCount = 20 + currentSection * 5;
    return Array.from({ length: particleCount }, (_, index) => {
      const delay = index * 0.1;
      const size = Math.random() * 4 + 1;
      const speed = Math.random() * 20 + 10;
      
      return (
        <div
          key={`${currentSection}-${index}`}
          className={styles.particle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${speed}s`,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      );
    });
  };

  return (
    <div className={styles.parallaxContainer}>
      {/* Gradient overlay that changes based on section */}
      <div 
        className={styles.gradientOverlay}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(34, 162, 255, 0.1) 0%, 
            rgba(240, 251, 253, 0.05) 50%, 
            transparent 100%)`
        }}
      />
      
      {/* Animated particles */}
      <div className={styles.particlesContainer}>
        {generateParticles()}
      </div>

      {/* Section-specific background elements */}
      <div className={`${styles.sectionBackground} ${styles[`section${currentSection}`]}`}>
        {/* Landing section - Tech icons floating */}
        {currentSection === 0 && (
          <div className={styles.techIconsFloat}>
            {['⚛️', '🔥', '⚡', '🚀', '💻'].map((icon, index) => (
              <div
                key={index}
                className={styles.floatingIcon}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 2) * 40}%`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        )}

        {/* Works section - Grid pattern */}
        {currentSection === 1 && (
          <div className={styles.gridPattern}>
            {Array.from({ length: 100 }, (_, index) => (
              <div
                key={index}
                className={styles.gridDot}
                style={{
                  left: `${(index % 10) * 10}%`,
                  top: `${Math.floor(index / 10) * 10}%`,
                  animationDelay: `${index * 0.01}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Skills section - Code brackets */}
        {currentSection === 2 && (
          <div className={styles.codeElements}>
            {['{ }', '< >', '[ ]', '( )', '/* */'].map((bracket, index) => (
              <div
                key={index}
                className={styles.floatingCode}
                style={{
                  left: `${10 + index * 20}%`,
                  top: `${20 + (index % 3) * 30}%`,
                  animationDelay: `${index * 0.3}s`
                }}
              >
                {bracket}
              </div>
            ))}
          </div>
        )}

        {/* Ethos section - Philosophy symbols */}
        {currentSection === 3 && (
          <div className={styles.philosophyElements}>
            {['💡', '🎯', '🌟', '✨', '🔮'].map((symbol, index) => (
              <div
                key={index}
                className={styles.floatingSymbol}
                style={{
                  left: `${15 + index * 18}%`,
                  top: `${25 + (index % 2) * 35}%`,
                  animationDelay: `${index * 0.4}s`
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};