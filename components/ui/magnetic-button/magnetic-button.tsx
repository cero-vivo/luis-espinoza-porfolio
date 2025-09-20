"use client"
import React, { useRef, useEffect } from 'react';
import styles from './magnetic-button.module.css';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  intensity = 0.3,
  onClick,
  href,
  target
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (mouseEvent.clientX - centerX) * intensity;
      const deltaY = (mouseEvent.clientY - centerY) * intensity;
      
      button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
    };

    const handleClick = (e: Event) => {
      if (!rippleRef.current) return;
      
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = mouseEvent.clientX - rect.left - size / 2;
      const y = mouseEvent.clientY - rect.top - size / 2;
      
      const ripple = rippleRef.current;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add(styles.rippleActive);
      
      setTimeout(() => {
        ripple.classList.remove(styles.rippleActive);
      }, 500);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, [intensity]);

  const combinedClassName = `${styles.magneticButton} ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        className={combinedClassName}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        <span className={styles.buttonContent}>{children}</span>
        <div ref={rippleRef} className={styles.ripple} />
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={combinedClassName}
    >
      <span className={styles.buttonContent}>{children}</span>
      <div ref={rippleRef} className={styles.ripple} />
    </button>
  );
};