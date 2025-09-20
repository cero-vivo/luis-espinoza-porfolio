import { useState, useRef, useCallback, useEffect } from 'react';

interface DragState {
  isDragging: boolean;
  startX: number;
  currentX: number;
  currentSection: number;
  totalSections: number;
}

interface DragPhysics {
  momentum: number;
  velocity: number;
  lastMoveTime: number;
}

export interface HorizontalDragHook {
  dragState: DragState;
  containerRef: React.RefObject<HTMLDivElement>;
  transform: string;
  currentSection: number;
  goToSection: (section: number) => void;
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export const useHorizontalDrag = (totalSections: number): HorizontalDragHook => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const dragPhysics = useRef<DragPhysics>({
    momentum: 0,
    velocity: 0,
    lastMoveTime: 0
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    currentX: 0,
    currentSection: 0,
    totalSections
  });

  const [transform, setTransform] = useState('translateX(0px)');

  // Detectar si es dispositivo táctil
  const isTouchDevice = useCallback(() => {
    return typeof window !== 'undefined' && 
           ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Calcular la posición de una sección específica
  const getSectionPosition = useCallback((section: number) => {
    if (typeof window === 'undefined') return 0;
    const sectionWidth = window.innerWidth;
    return -section * sectionWidth;
  }, []);

  // Navegar a una sección específica
  const goToSection = useCallback((section: number) => {
    const clampedSection = Math.max(0, Math.min(section, totalSections - 1));
    const position = getSectionPosition(clampedSection);
    
    setDragState(prev => ({ ...prev, currentSection: clampedSection }));
    setTransform(`translateX(${position}px)`);
  }, [totalSections, getSectionPosition]);

  // Calcular la sección más cercana basada en la posición actual
  const getNearestSection = useCallback((currentPosition: number) => {
    if (typeof window === 'undefined') return 0;
    const sectionWidth = window.innerWidth;
    const section = Math.round(-currentPosition / sectionWidth);
    return Math.max(0, Math.min(section, totalSections - 1));
  }, [totalSections]);

  // Aplicar momentum después de soltar
  const applyMomentum = useCallback((initialVelocity: number, startPosition: number) => {
    let velocity = initialVelocity;
    let position = startPosition;
    const friction = isTouchDevice() ? 0.92 : 0.95; // Más fricción en móvil
    const minVelocity = isTouchDevice() ? 0.3 : 0.5;

    const animate = () => {
      velocity *= friction;
      position += velocity;

      // Límites elásticos
      const maxPosition = 0;
      const minPosition = -(totalSections - 1) * window.innerWidth;
      
      if (position > maxPosition) {
        position = maxPosition;
        velocity = 0;
      } else if (position < minPosition) {
        position = minPosition;
        velocity = 0;
      }

      setTransform(`translateX(${position}px)`);

      if (Math.abs(velocity) > minVelocity) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Snap a la sección más cercana
        const nearestSection = getNearestSection(position);
        goToSection(nearestSection);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [totalSections, getNearestSection, goToSection, isTouchDevice]);

  // Handlers para mouse
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setDragState(prev => ({
      ...prev,
      isDragging: true,
      startX: e.clientX,
      currentX: e.clientX
    }));

    dragPhysics.current = {
      momentum: 0,
      velocity: 0,
      lastMoveTime: Date.now()
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.isDragging) return;

    const deltaX = e.clientX - dragState.startX;
    const currentPosition = getSectionPosition(dragState.currentSection) + deltaX;

    // Calcular velocidad para momentum
    const currentTime = Date.now();
    const timeDelta = currentTime - dragPhysics.current.lastMoveTime;
    const positionDelta = e.clientX - dragState.currentX;
    
    if (timeDelta > 0) {
      dragPhysics.current.velocity = positionDelta / timeDelta * 16; // Normalizar a 60fps
    }
    dragPhysics.current.lastMoveTime = currentTime;

    setDragState(prev => ({ ...prev, currentX: e.clientX }));
    setTransform(`translateX(${currentPosition}px)`);
  }, [dragState.isDragging, dragState.startX, dragState.currentSection, dragState.currentX, getSectionPosition]);

  const handleMouseUp = useCallback(() => {
    if (!dragState.isDragging) return;

    const deltaX = dragState.currentX - dragState.startX;
    const currentPosition = getSectionPosition(dragState.currentSection) + deltaX;

    setDragState(prev => ({ ...prev, isDragging: false }));

    // Aplicar momentum si hay velocidad suficiente
    const velocityThreshold = isTouchDevice() ? 1 : 2;
    if (Math.abs(dragPhysics.current.velocity) > velocityThreshold) {
      applyMomentum(dragPhysics.current.velocity, currentPosition);
    } else {
      // Snap a la sección más cercana
      const nearestSection = getNearestSection(currentPosition);
      goToSection(nearestSection);
    }
  }, [dragState.isDragging, dragState.currentX, dragState.startX, dragState.currentSection, getSectionPosition, applyMomentum, getNearestSection, goToSection]);

  // Handlers para touch (móvil)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setDragState(prev => ({
      ...prev,
      isDragging: true,
      startX: touch.clientX,
      currentX: touch.clientX
    }));

    dragPhysics.current = {
      momentum: 0,
      velocity: 0,
      lastMoveTime: Date.now()
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.isDragging) return;
    e.preventDefault(); // Prevenir scroll

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragState.startX;
    const currentPosition = getSectionPosition(dragState.currentSection) + deltaX;

    // Calcular velocidad
    const currentTime = Date.now();
    const timeDelta = currentTime - dragPhysics.current.lastMoveTime;
    const positionDelta = touch.clientX - dragState.currentX;
    
    if (timeDelta > 0) {
      dragPhysics.current.velocity = positionDelta / timeDelta * 16;
    }
    dragPhysics.current.lastMoveTime = currentTime;

    setDragState(prev => ({ ...prev, currentX: touch.clientX }));
    setTransform(`translateX(${currentPosition}px)`);
  }, [dragState.isDragging, dragState.startX, dragState.currentSection, dragState.currentX, getSectionPosition]);

  const handleTouchEnd = useCallback(() => {
    if (!dragState.isDragging) return;

    const deltaX = dragState.currentX - dragState.startX;
    const currentPosition = getSectionPosition(dragState.currentSection) + deltaX;

    setDragState(prev => ({ ...prev, isDragging: false }));

    // Aplicar momentum
    const velocityThreshold = isTouchDevice() ? 0.8 : 1;
    if (Math.abs(dragPhysics.current.velocity) > velocityThreshold) {
      applyMomentum(dragPhysics.current.velocity, currentPosition);
    } else {
      const nearestSection = getNearestSection(currentPosition);
      goToSection(nearestSection);
    }
  }, [dragState.isDragging, dragState.currentX, dragState.startX, dragState.currentSection, getSectionPosition, applyMomentum, getNearestSection, goToSection]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handlers globales para mouse
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging) return;
      
      const deltaX = e.clientX - dragState.startX;
      const currentPosition = getSectionPosition(dragState.currentSection) + deltaX;
      
      const currentTime = Date.now();
      const timeDelta = currentTime - dragPhysics.current.lastMoveTime;
      const positionDelta = e.clientX - dragState.currentX;
      
      if (timeDelta > 0) {
        dragPhysics.current.velocity = positionDelta / timeDelta * 16;
      }
      dragPhysics.current.lastMoveTime = currentTime;

      setDragState(prev => ({ ...prev, currentX: e.clientX }));
      setTransform(`translateX(${currentPosition}px)`);
    };

    const handleGlobalMouseUp = () => {
      if (!dragState.isDragging) return;
      handleMouseUp();
    };

    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragState.isDragging, dragState.startX, dragState.currentSection, dragState.currentX, getSectionPosition, handleMouseUp]);

  return {
    dragState,
    containerRef,
    transform,
    currentSection: dragState.currentSection,
    goToSection,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};