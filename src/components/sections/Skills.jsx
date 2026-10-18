import React, { useState, useEffect } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelChip from '../pixel/PixelChip';
import PixelBadge from '../pixel/PixelBadge';
import LogoLoop from '../reactbits/LogoLoop';
import { SKILLS } from '../../data/site';
import { useQuality } from '../../utils/quality';

import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiRos,
  SiOpencv,
  SiTensorflow,
  SiGit,
  SiLinux,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const quality = useQuality();

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setPrefersReducedMotion(
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const logoHeight = isMobile ? 32 : 40;
  const gap = isMobile ? 28 : 40;

  // Compute speed based on quality and motion preference
  const loopASpeed = prefersReducedMotion ? 0 : quality === 'low' ? 0 : quality === 'medium' ? 30 : 60;
  const loopBSpeed = prefersReducedMotion ? 0 : quality === 'low' ? 0 : quality === 'medium' ? 25 : 50;

  // Loop A: Languages & Web Development
  const loopALogos = [
    { node: <SiPython className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Python', hoverColor: '#3776ab' },
    { node: <SiCplusplus className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'C++', hoverColor: '#00599c' },
    { node: <FaJava className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Java', hoverColor: '#f89820' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>C</PixelBadge>, title: 'C', hoverColor: '#a8b9cc' },
    { node: <SiJavascript className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'JavaScript', hoverColor: '#f7df1e' },
    { node: <SiHtml5 className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'HTML5', hoverColor: '#e34f26' },
    { node: <SiCss className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'CSS3', hoverColor: '#1572b6' },
    { node: <SiReact className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'React', hoverColor: '#61dafb' },
    { node: <SiNextdotjs className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Next.js', hoverColor: '#ffffff' },
    { node: <SiNodedotjs className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Node.js', hoverColor: '#339933' },
    { node: <SiDjango className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Django', hoverColor: '#092e20' },
    { node: <SiPostgresql className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'PostgreSQL', hoverColor: '#4169e1' },
    { node: <SiMongodb className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'MongoDB', hoverColor: '#47a248' },
    { node: <SiFirebase className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Firebase', hoverColor: '#ffca28' },
  ];

  // Loop B: Robotics, Computer Vision, & Tools
  const loopBLogos = [
    { node: <SiRos className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'ROS2', hoverColor: '#22314e' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>Gazebo</PixelBadge>, title: 'Gazebo', hoverColor: '#f39c12' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>SLAM</PixelBadge>, title: 'SLAM', hoverColor: '#5cffc8' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>PyBullet</PixelBadge>, title: 'PyBullet', hoverColor: '#e74c3c' },
    { node: <SiOpencv className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'OpenCV', hoverColor: '#5c3ee8' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>MediaPipe</PixelBadge>, title: 'MediaPipe', hoverColor: '#0097a7' },
    { node: <SiTensorflow className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'TensorFlow', hoverColor: '#ff6f00' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>YOLO</PixelBadge>, title: 'YOLO', hoverColor: '#00ffff' },
    { node: <PixelBadge height={isMobile ? 32 : 40}>ML</PixelBadge>, title: 'ML Models', hoverColor: '#a855f7' },
    { node: <SiGit className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Git', hoverColor: '#f05032' },
    { node: <SiLinux className="w-8 h-8 sm:w-9 sm:h-9" />, title: 'Linux', hoverColor: '#fcc624' },
  ];

  return (
    <section id="skills" className="py-12 xs:py-16 sm:py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="LEVEL 05"
        title="SKILLS & INVENTORY"
        subtitle="LANGUAGES, ROBOTICS FRAMEWORKS, VISION & CLOUD TOOLS"
        sprite="code"
      />

      {/* Dynamic Logo Loops (Stopped when reduced motion or low quality) */}
      {!prefersReducedMotion && quality !== 'low' && (
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          {/* Loop A: INVENTORY_01 */}
          <PixelBox
            title="INVENTORY_01: LANGUAGES & FULL-STACK"
            variant="panel"
            className="overflow-hidden w-full"
            bodyClassName="p-3 xs:p-4 py-4 xs:py-6"
          >
            <div
              className="h-14 sm:h-16 relative flex items-center overflow-hidden w-full"
              style={{ touchAction: 'pan-y' }}
            >
              <LogoLoop
                logos={loopALogos}
                direction="left"
                speed={loopASpeed}
                logoHeight={logoHeight}
                gap={gap}
                hoverSpeed={0}
                scaleOnHover={true}
                draggable={true}
                labels="hover"
                muted={0.35}
                fadeOut={true}
                ariaLabel="Languages and Full-Stack Technologies"
              />
            </div>
          </PixelBox>

          {/* Loop B: INVENTORY_02 */}
          <PixelBox
            title="INVENTORY_02: ROBOTICS, VISION & PLATFORMS"
            variant="panel"
            className="overflow-hidden w-full"
            bodyClassName="p-3 xs:p-4 py-4 xs:py-6"
          >
            <div
              className="h-14 sm:h-16 relative flex items-center overflow-hidden w-full"
              style={{ touchAction: 'pan-y' }}
            >
              <LogoLoop
                logos={loopBLogos}
                direction="right"
                speed={loopBSpeed}
                logoHeight={logoHeight}
                gap={gap}
                hoverSpeed={0}
                scaleOnHover={true}
                draggable={true}
                labels="hover"
                muted={0.35}
                fadeOut={true}
                ariaLabel="Robotics and Vision Frameworks"
              />
            </div>
          </PixelBox>
        </div>
      )}

      {/* Categorized Static Chip Groups: 1-column on mobile, 2-column on tablet, 3-column on desktop */}
      <div className="p-4 xs:p-6 bg-[var(--px-panel)] border-4 border-[var(--px-line)] pixel-corners pixel-shadow w-full">
        <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm text-[var(--px-gold)] uppercase mb-4 sm:mb-6 flex items-center gap-2">
          <span>[ ITEM REGISTRY: CATEGORIZED ARSENAL ]</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div
              key={category}
              className="p-3 xs:p-4 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm"
            >
              <h4 className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold uppercase tracking-wider mb-2.5">
                &gt; {category}
              </h4>
              <div className="flex flex-wrap gap-1.5 xs:gap-2">
                {items.map((skill) => (
                  <PixelChip key={skill} variant="default" size="sm">
                    {skill}
                  </PixelChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
