import React from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelChip from '../pixel/PixelChip';
import PixelBadge from '../pixel/PixelBadge';
import LogoLoop from '../reactbits/LogoLoop';
import { SKILLS } from '../../data/site';

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
  // Loop A: Languages & Web Development
  const loopALogos = [
    { node: <SiPython className="w-9 h-9" />, title: 'Python', hoverColor: '#3776ab' },
    { node: <SiCplusplus className="w-9 h-9" />, title: 'C++', hoverColor: '#00599c' },
    { node: <FaJava className="w-9 h-9" />, title: 'Java', hoverColor: '#f89820' },
    { node: <PixelBadge height={40}>C</PixelBadge>, title: 'C', hoverColor: '#a8b9cc' },
    { node: <SiJavascript className="w-9 h-9" />, title: 'JavaScript', hoverColor: '#f7df1e' },
    { node: <SiHtml5 className="w-9 h-9" />, title: 'HTML5', hoverColor: '#e34f26' },
    { node: <SiCss className="w-9 h-9" />, title: 'CSS3', hoverColor: '#1572b6' },
    { node: <SiReact className="w-9 h-9" />, title: 'React', hoverColor: '#61dafb' },
    { node: <SiNextdotjs className="w-9 h-9" />, title: 'Next.js', hoverColor: '#ffffff' },
    { node: <SiNodedotjs className="w-9 h-9" />, title: 'Node.js', hoverColor: '#339933' },
    { node: <SiDjango className="w-9 h-9" />, title: 'Django', hoverColor: '#092e20' },
    { node: <SiPostgresql className="w-9 h-9" />, title: 'PostgreSQL', hoverColor: '#4169e1' },
    { node: <SiMongodb className="w-9 h-9" />, title: 'MongoDB', hoverColor: '#47a248' },
    { node: <SiFirebase className="w-9 h-9" />, title: 'Firebase', hoverColor: '#ffca28' },
  ];

  // Loop B: Robotics, Computer Vision, & Tools
  const loopBLogos = [
    { node: <SiRos className="w-9 h-9" />, title: 'ROS2', hoverColor: '#22314e' },
    { node: <PixelBadge height={40}>Gazebo</PixelBadge>, title: 'Gazebo', hoverColor: '#f39c12' },
    { node: <PixelBadge height={40}>SLAM</PixelBadge>, title: 'SLAM Toolbox', hoverColor: '#5cffc8' },
    { node: <PixelBadge height={40}>PyBullet</PixelBadge>, title: 'PyBullet', hoverColor: '#e74c3c' },
    { node: <SiOpencv className="w-9 h-9" />, title: 'OpenCV', hoverColor: '#5c3ee8' },
    { node: <PixelBadge height={40}>MediaPipe</PixelBadge>, title: 'MediaPipe', hoverColor: '#0097a7' },
    { node: <SiTensorflow className="w-9 h-9" />, title: 'TensorFlow Lite', hoverColor: '#ff6f00' },
    { node: <PixelBadge height={40}>YOLO</PixelBadge>, title: 'YOLO', hoverColor: '#00ffff' },
    { node: <PixelBadge height={40}>ML</PixelBadge>, title: 'Machine Learning', hoverColor: '#a855f7' },
    { node: <SiGit className="w-9 h-9" />, title: 'Git', hoverColor: '#f05032' },
    { node: <SiLinux className="w-9 h-9" />, title: 'Linux', hoverColor: '#fcc624' },
  ];

  return (
    <section id="skills" className="py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="LEVEL 05"
        title="SKILLS & INVENTORY"
        subtitle="LANGUAGES, ROBOTICS FRAMEWORKS, VISION & CLOUD TOOLS"
        sprite="code"
      />

      <div className="space-y-8 mb-12">
        {/* Loop A: INVENTORY_01 */}
        <PixelBox
          title="INVENTORY_01: LANGUAGES & FULL-STACK"
          variant="panel"
          className="overflow-hidden"
          bodyClassName="p-4 py-6"
        >
          <div className="h-16 relative flex items-center overflow-hidden">
            <LogoLoop
              logos={loopALogos}
              direction="left"
              speed={60}
              logoHeight={40}
              gap={40}
              hoverSpeed={0}
              scaleOnHover
              labels="hover"
              muted={0.35}
              fadeOut
              ariaLabel="Languages and Full-Stack Technologies"
            />
          </div>
        </PixelBox>

        {/* Loop B: INVENTORY_02 */}
        <PixelBox
          title="INVENTORY_02: ROBOTICS, VISION & PLATFORMS"
          variant="panel"
          className="overflow-hidden"
          bodyClassName="p-4 py-6"
        >
          <div className="h-16 relative flex items-center overflow-hidden">
            <LogoLoop
              logos={loopBLogos}
              direction="right"
              speed={50}
              logoHeight={40}
              gap={40}
              hoverSpeed={0}
              scaleOnHover
              labels="hover"
              muted={0.35}
              fadeOut
              ariaLabel="Robotics and Vision Frameworks"
            />
          </div>
        </PixelBox>
      </div>

      {/* Categorized Static Chip Groups for Accessibility and Crawlability */}
      <div className="p-6 bg-[var(--px-panel)] border-4 border-[var(--px-line)] pixel-corners pixel-shadow">
        <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm text-[var(--px-gold)] uppercase mb-6 flex items-center gap-2">
          <span>[ ITEM REGISTRY: CATEGORIZED ARSENAL ]</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div
              key={category}
              className="p-4 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm"
            >
              <h4 className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold uppercase tracking-wider mb-3">
                &gt; {category}
              </h4>
              <div className="flex flex-wrap gap-2">
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
