"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectType } from '../projects-data';
import { ExternalLink, Eye } from 'lucide-react';
import { Heading } from '@/components/basic/heading/heading';
import { MagneticButton } from '@/components/ui/magnetic-button/magnetic-button';
import styles from './free-navigation-projects.module.css';

interface FreeNavigationProjectsProps {
  projects: ProjectType[];
  title: string;
}

interface ProjectPosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
  imageIndex: number;
  projectIndex: number;
}

export const FreeNavigationProjects: React.FC<FreeNavigationProjectsProps> = ({
  projects,
  title
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [projectPositions, setProjectPositions] = useState<ProjectPosition[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generar posiciones para múltiples imágenes por proyecto
  const generateProjectPositions = useCallback(() => {
    const positions: ProjectPosition[] = [];
    const variation = 200; // Aumentado para mayor espacio entre clusters
    const imagesPerProject = 3;

    projects.forEach((project, projectIndex) => {
      const imagesCount = Math.min(project.images.length, imagesPerProject);
      
      for (let imageIndex = 0; imageIndex < imagesCount; imageIndex++) {
        const baseAngle = (projectIndex * 137.5) * (Math.PI / 180);
        const baseRadius = Math.sqrt(projectIndex + 1) * 180; // Aumentado para mayor separación
        
        const clusterX = Math.cos(baseAngle) * baseRadius;
        const clusterY = Math.sin(baseAngle) * baseRadius;
        
        const imageAngle = (imageIndex * 120) * (Math.PI / 180);
        const imageRadius = 120 + Math.random() * 60; // Aumentado el radio para las cards más grandes
        
        const imageOffsetX = Math.cos(imageAngle) * imageRadius;
        const imageOffsetY = Math.sin(imageAngle) * imageRadius;
        
        const randomX = (Math.random() - 0.5) * variation;
        const randomY = (Math.random() - 0.5) * variation;
        
        positions.push({
          x: clusterX + imageOffsetX + randomX,
          y: clusterY + imageOffsetY + randomY,
          scale: 0.8 + Math.random() * 0.4, // Rango de escala ajustado para cards más grandes
          rotation: (Math.random() - 0.5) * 30, // Rotación menos pronunciada
          zIndex: Math.floor(Math.random() * 10),
          imageIndex,
          projectIndex
        });
      }
    });

    return positions;
  }, [projects]);

  useEffect(() => {
    setProjectPositions(generateProjectPositions());
    // Centrar la vista inicial
    setViewportPosition({ x: 200, y: 200 });
  }, [generateProjectPositions]);

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!containerRef.current) return;
    
    // Solo navegar si está arrastrando
    if (!isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Navegación más sutil solo durante drag
    const moveFactorX = (centerX - mouseX) / centerX;
    const moveFactorY = (centerY - mouseY) / centerY;
    const moveSpeed = 0.2; // Reducir velocidad de navegación automática
    
    setViewportPosition(prev => ({
      x: prev.x + (moveFactorX * moveSpeed),
      y: prev.y + (moveFactorY * moveSpeed)
    }));
  }, [isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDrag = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePosition.x;
    const deltaY = e.clientY - lastMousePosition.y;

    setViewportPosition(prev => ({
      x: prev.x + deltaX * 1.0,
      y: prev.y + deltaY * 1.0
    }));

    setLastMousePosition({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseDrag(e);
      }
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    // Controles de teclado para navegación
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cerrar modal con Escape
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        return;
      }

      // Solo permitir navegación si el modal no está abierto
      if (isModalOpen) return;

      const speed = 50;
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setViewportPosition(prev => ({ ...prev, y: prev.y + speed }));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setViewportPosition(prev => ({ ...prev, y: prev.y - speed }));
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setViewportPosition(prev => ({ ...prev, x: prev.x + speed }));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setViewportPosition(prev => ({ ...prev, x: prev.x - speed }));
          break;
        case 'r':
        case 'R':
          // Reset to center
          setViewportPosition({ x: 200, y: 200 });
          break;
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDragging, handleMouseDrag, handleMouseUp, isModalOpen]);

  const handleProjectClick = useCallback((projectIndex: number) => {
    setSelectedProject(projectIndex);
    setIsModalOpen(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading variant="h2" text={title} />
        <p className={styles.subtitle}>
          Explora mis proyectos en un espacio libre. Arrastra con el mouse o usa WASD/flechas para navegar. Click en una tarjeta para ver detalles.
        </p>
      </div>

      <div 
        ref={containerRef}
        className={styles.projectsSpace}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className={styles.projectsContainer}
          style={{
            transform: `translate(${viewportPosition.x}px, ${viewportPosition.y}px)`
          }}
        >
          {projectPositions.map((position, index) => {
            const project = projects[position.projectIndex];
            const currentImage = project.images[position.imageIndex];
            
            return (
              <div
                key={`${position.projectIndex}-${position.imageIndex}-${index}`}
                className={styles.projectCard}
                style={{
                  left: position.x,
                  top: position.y,
                  transform: `scale(${position.scale}) rotate(${position.rotation}deg)`,
                  zIndex: position.zIndex,
                }}
                onMouseEnter={() => setHoveredProject(position.projectIndex)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(position.projectIndex)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={currentImage}
                    alt={`${project.name} - Imagen ${position.imageIndex + 1}`}
                    className={styles.projectImage}
                    draggable={false}
                  />
                  
                  <div className={`${styles.overlay} ${hoveredProject === position.projectIndex ? styles.overlayVisible : ''}`}>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectTitle}>{project.name}</h3>
                      
                      <div className={styles.projectActions}>
                        {project.urls && project.urls.length > 0 && (
                          <MagneticButton
                            className={styles.actionButton}
                          >
                            <Eye size={14} />
                            Ver proyecto
                          </MagneticButton>
                        )}
                        
                        {project.urls && project.urls.length > 1 && (
                          <MagneticButton
                            className={styles.actionButton}
                            onClick={() => {
                              window.open(project.urls[1], '_blank');
                            }}
                          >
                            <ExternalLink size={14} />
                            Más info
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.imageIndicator}>
                  {position.imageIndex + 1}/{Math.min(project.images.length, 3)}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.navigationHint}>
          <div className={styles.hintItem}>
            <div className={styles.dragIcon}></div>
            <span>Click y arrastra para navegar</span>
          </div>
          <div className={styles.hintItem}>
            <div className={styles.keyboardIcon}></div>
            <span>WASD o flechas para mover | R para centrar</span>
          </div>
          <div className={styles.hintItem}>
            <div className={styles.clickIcon}></div>
            <span>Click en tarjeta para detalles | ESC para cerrar</span>
          </div>
          <div className={styles.resetButton}>
            <MagneticButton
              onClick={() => setViewportPosition({ x: 200, y: 200 })}
              className={styles.resetBtn}
            >
              Centrar Vista
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Modal de detalles del proyecto */}
      {isModalOpen && selectedProject !== null && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton} 
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{projects[selectedProject].name}</h2>
                <p className={styles.modalDescription}>{projects[selectedProject].description}</p>
                <div className={styles.modalTechStack}>
                  {projects[selectedProject].icons.map((icon, index) => (
                    <span key={index} className={styles.techIcon}>
                      {icon}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.modalImages}>
                {projects[selectedProject].images.map((image, index) => (
                  <div key={index} className={styles.modalImageContainer}>
                    <img
                      src={image}
                      alt={`${projects[selectedProject].name} - Vista ${index + 1}`}
                      className={styles.modalImage}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.modalActions}>
                {projects[selectedProject].urls.map((url, index) => (
                  <MagneticButton
                    key={index}
                    href={url}
                    target="_blank"
                    className={styles.modalActionBtn}
                  >
                    <ExternalLink size={16} />
                    {index === 0 ? 'Ver Proyecto' : `Link ${index + 1}`}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};