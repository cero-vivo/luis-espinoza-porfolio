"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './custom-cursor.module.css';

interface CursorPosition {
  x: number;
  y: number;
}

interface CustomCursorProps {
  currentSection?: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ currentSection = 0 }) => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<string>('default');
  const [trailPositions, setTrailPositions] = useState<CursorPosition[]>([]);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<CursorPosition[]>([]);

  // Update cursor position
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Update trail
      trailRef.current = [newPosition, ...trailRef.current.slice(0, 5)];
      setTrailPositions([...trailRef.current]);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect cursor type based on element hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, .button, [role="button"]')) {
        setCursorType('button');
      } else if (target.matches('a, .link')) {
        setCursorType('link');
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setCursorType('text');
      } else if (target.matches('.draggable, .drag-handle')) {
        setCursorType('drag');
      } else if (target.matches('.project-card, .interactive-element')) {
        setCursorType('interactive');
      } else {
        setCursorType('default');
      }
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Section-specific cursor styles
  const getSectionClass = () => {
    switch (currentSection) {
      case 0: return styles.landing;
      case 1: return styles.works;
      case 2: return styles.skills;
      case 3: return styles.ethos;
      default: return '';
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        a, button, input, textarea, [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${
          isVisible ? styles.visible : ''
        } ${isClicking ? styles.clicking : ''} ${
          styles[cursorType]
        } ${getSectionClass()}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Main cursor */}
        <div className={styles.cursorInner}>
          {cursorType === 'link' && (
            <div className={styles.linkIcon}>↗</div>
          )}
          {cursorType === 'drag' && (
            <div className={styles.dragIcon}>✋</div>
          )}
          {cursorType === 'interactive' && (
            <div className={styles.interactiveIcon}>✨</div>
          )}
          {cursorType === 'button' && (
            <div className={styles.buttonIcon}>●</div>
          )}
          {cursorType === 'text' && (
            <div className={styles.textIcon}>|</div>
          )}
        </div>

        {/* Cursor ring */}
        <div className={styles.cursorRing}></div>
      </div>

      {/* Cursor trail */}
      {trailPositions.map((trailPos, index) => (
        <div
          key={index}
          className={`${styles.cursorTrail} ${getSectionClass()}`}
          style={{
            left: `${trailPos.x}px`,
            top: `${trailPos.y}px`,
            opacity: (5 - index) / 5,
            transform: `scale(${(5 - index) / 5})`,
          }}
        />
      ))}

      {/* Section-specific particles */}
      {currentSection === 1 && cursorType === 'interactive' && (
        <div
          className={styles.particles}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                '--delay': `${i * 0.1}s`,
                '--angle': `${i * 60}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </>
  );
};