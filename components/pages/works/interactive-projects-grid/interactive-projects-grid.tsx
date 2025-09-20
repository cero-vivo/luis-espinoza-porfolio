"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ProjectType } from '../projects-data';
import { Heading } from '@/components/basic/heading/heading';
import { Paragraph } from '@/components/basic/paragraph/paragraph';
import { ExternalLink, Github, Play, Pause } from 'lucide-react';
import styles from './interactive-projects-grid.module.css';

interface InteractiveProjectsGridProps {
  projects: ProjectType[];
  title: string;
}

export const InteractiveProjectsGrid: React.FC<InteractiveProjectsGridProps> = ({
  projects,
  title
}) => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Auto-rotate through projects
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % projects.length);
      }, 4000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, projects.length]);

  // Mouse movement tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentProject = projects[activeProject];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading text={title} variant='h2' classes={styles.title} />
        <button
          className={styles.playButton}
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <div className={styles.gridContainer}>
        {/* Main featured project */}
        <div className={styles.featuredProject}>
          <div 
            className={styles.projectImage}
            style={{
              backgroundImage: `url(${currentProject.images[0]})`,
              transform: `
                perspective(1000px)
                rotateX(${mousePosition.y * 5}deg)
                rotateY(${mousePosition.x * 5}deg)
                translateZ(0)
              `
            }}
          >
            <div className={styles.projectOverlay}>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{currentProject.name}</h3>
                <div className={styles.techStack}>
                  {currentProject.icons.slice(0, 4).map((tech: string, index: number) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.projectActions}>
                  {currentProject.urls.map((url: string, index: number) => (
                    <a 
                      key={index}
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                    >
                      <ExternalLink size={16} />
                      {index === 0 ? 'Demo' : 'Link'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project grid navigation */}
        <div 
          ref={gridRef}
          className={styles.projectGrid}
          style={{
            transform: `
              perspective(1000px)
              rotateX(${mousePosition.y * -2}deg)
              rotateY(${mousePosition.x * -2}deg)
            `
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`${styles.gridItem} ${
                index === activeProject ? styles.active : ''
              } project-card interactive-element`}
              onClick={() => setActiveProject(index)}
              style={{
                '--delay': `${index * 0.1}s`,
                transform: `
                  translateZ(${index === activeProject ? '20px' : '0px'})
                  scale(${index === activeProject ? '1.05' : '1'})
                `
              } as React.CSSProperties}
            >
              <div 
                className={styles.gridItemImage}
                style={{ backgroundImage: `url(${project.images[0]})` }}
              />
              <div className={styles.gridItemOverlay}>
                <span className={styles.gridItemTitle}>{project.name}</span>
                <div className={styles.gridItemTech}>
                  {project.icons.slice(0, 2).map((tech: string, techIndex: number) => (
                    <span key={techIndex} className={styles.miniTechTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Ripple effect */}
              <div className={styles.ripple}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ 
              width: `${((activeProject + 1) / projects.length) * 100}%` 
            }}
          />
        </div>
        <span className={styles.progressText}>
          {activeProject + 1} / {projects.length}
        </span>
      </div>

      {/* Navigation arrows */}
      <button
        className={`${styles.navArrow} ${styles.prevArrow}`}
        onClick={() => setActiveProject((prev) => 
          prev === 0 ? projects.length - 1 : prev - 1
        )}
        aria-label="Previous project"
      >
        ←
      </button>
      <button
        className={`${styles.navArrow} ${styles.nextArrow}`}
        onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
        aria-label="Next project"
      >
        →
      </button>
    </div>
  );
};