"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUpRight, Hand, Eye, Move } from 'lucide-react';
import styles from './interactive-cursor.module.css';

interface CursorState {
  x: number;
  y: number;
  isPointer: boolean;
  isDragging: boolean;
  isHovering: boolean;
  cursorType: 'default' | 'pointer' | 'grab' | 'grabbing' | 'explore' | 'view';
  scale: number;
}

export const InteractiveCursor: React.FC = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isPointer: false,
    isDragging: false,
    isHovering: false,
    cursorType: 'default',
    scale: 1
  });

  // Actualizar posición del cursor
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    setCursor(prev => ({
      ...prev,
      x: e.clientX,
      y: e.clientY
    }));
  }, []);

  // Detectar elementos interactivos
  const detectInteractiveElement = useCallback((target: Element): CursorState['cursorType'] => {
    if (target.closest('button, a, [role="button"]')) {
      return 'pointer';
    }
    if (target.closest('.projectCard, [data-cursor="view"]')) {
      return 'view';
    }
    if (target.closest('.projectsSpace, [data-cursor="explore"]')) {
      return 'explore';
    }
    if (target.closest('[data-cursor="grab"]')) {
      return 'grab';
    }
    return 'default';
  }, []);

  // Manejar hover sobre elementos
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    const cursorType = detectInteractiveElement(target);
    
    setCursor(prev => ({
      ...prev,
      cursorType,
      isHovering: cursorType !== 'default',
      scale: cursorType === 'view' ? 1.5 : cursorType === 'pointer' ? 1.2 : 1
    }));
  }, [detectInteractiveElement]);

  // Manejar mouse down/up para estados de arrastre
  const handleMouseDown = useCallback(() => {
    setCursor(prev => ({
      ...prev,
      isDragging: true,
      cursorType: prev.cursorType === 'grab' ? 'grabbing' : prev.cursorType,
      scale: 0.9
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursor(prev => ({
      ...prev,
      isDragging: false,
      cursorType: prev.cursorType === 'grabbing' ? 'grab' : prev.cursorType,
      scale: prev.cursorType === 'view' ? 1.5 : prev.cursorType === 'pointer' ? 1.2 : 1
    }));
  }, []);

  // Efectos
  useEffect(() => {
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Ocultar cursor nativo
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [updateCursorPosition, handleMouseOver, handleMouseDown, handleMouseUp]);

  // Renderizar icono del cursor según el tipo
  const renderCursorIcon = () => {
    switch (cursor.cursorType) {
      case 'pointer':
        return <ArrowUpRight size={16} />;
      case 'view':
        return <Eye size={18} />;
      case 'grab':
        return <Hand size={16} />;
      case 'grabbing':
        return <Hand size={16} className={styles.grabbing} />;
      case 'explore':
        return <Move size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${styles.cursor} ${styles[cursor.cursorType]} ${cursor.isDragging ? styles.dragging : ''}`}
      style={{
        left: cursor.x,
        top: cursor.y,
        transform: `translate(-50%, -50%) scale(${cursor.scale})`
      }}
    >
      <div className={styles.cursorDot} />
      <div className={styles.cursorRing} />
      {cursor.isHovering && (
        <div className={styles.cursorIcon}>
          {renderCursorIcon()}
        </div>
      )}
      
      {/* Efecto de trail */}
      <div className={styles.cursorTrail} />
    </div>
  );
};