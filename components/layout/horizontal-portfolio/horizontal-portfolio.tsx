"use client"
import React, { useEffect } from 'react';
import { useHorizontalDrag } from '@/hooks/useHorizontalDrag';
import { ChevronLeft, ChevronRight, Mouse } from 'lucide-react';
import { ParallaxBackground } from '@/components/effects/parallax-background/parallax-background';
import { CustomCursor } from '@/components/effects/custom-cursor/custom-cursor';
import styles from './horizontal-portfolio.module.css';

interface HorizontalPortfolioProps {
  children: React.ReactNode[];
  className?: string;
}

export const HorizontalPortfolio: React.FC<HorizontalPortfolioProps> = ({ 
  children, 
  className = '' 
}) => {
  const totalSections = React.Children.count(children);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  
  const {
    containerRef,
    transform,
    currentSection,
    goToSection,
    dragHandlers,
    dragState
  } = useHorizontalDrag(totalSections);

  // Mark as interacted when user starts dragging
  React.useEffect(() => {
    if (dragState.isDragging && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [dragState.isDragging, hasInteracted]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSection > 0) {
        goToSection(currentSection - 1);
      } else if (e.key === 'ArrowRight' && currentSection < totalSections - 1) {
        goToSection(currentSection + 1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, totalSections, goToSection]);

  // Render navigation dots
  const renderNavigationDots = () => (
    <div className={styles.navigationDots}>
      {Array.from({ length: totalSections }, (_, index) => (
        <button
          key={index}
          className={`${styles.navigationDot} ${
            index === currentSection ? styles.active : ''
          }`}
          onClick={() => goToSection(index)}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );

  // Navigation arrows
  const renderNavigationArrows = () => (
    <>
      {currentSection > 0 && (
        <button
          className={`${styles.navigationArrow} ${styles.leftArrow}`}
          onClick={() => goToSection(currentSection - 1)}
          aria-label="Previous section"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {currentSection < totalSections - 1 && (
        <button
          className={`${styles.navigationArrow} ${styles.rightArrow}`}
          onClick={() => goToSection(currentSection + 1)}
          aria-label="Next section"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </>
  );

  return (
    <div className={`${styles.portfolioWrapper} ${className} ${hasInteracted ? styles.touched : ''}`}>
      {/* Custom cursor */}
      <CustomCursor currentSection={currentSection} />
      
      {/* Parallax background effects */}
      <ParallaxBackground 
        currentSection={currentSection} 
        totalSections={totalSections} 
      />
      
      <div
        ref={containerRef}
        className={`${styles.portfolioContainer} ${
          dragState.isDragging ? styles.dragging : ''
        } draggable`}
        style={{
          transform,
          transition: dragState.isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        {...dragHandlers}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={styles.section}
            style={{
              transform: `translateX(${index * 100}vw)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      
      {renderNavigationDots()}
      {renderNavigationArrows()}
      
      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollHintText}>
          Drag to explore
        </div>
        <div className={styles.scrollHintIcon}>
          <Mouse size={20} />
        </div>
      </div>
    </div>
  );
};