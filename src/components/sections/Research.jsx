import React from 'react';
import FaultyTerminal from '../reactbits/FaultyTerminal';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelSprite from '../pixel/PixelSprite';
import PixelChip from '../pixel/PixelChip';

export default function Research() {

  return (
    <section id="research" className="relative py-20 border-b-4 border-[var(--px-line)]">
      <div className="relative z-10">
        <SectionHeader
          level="LEVEL 03"
          title="RESEARCH SPOTLIGHT: IIT MADRAS"
          subtitle="3D SCENE RECONSTRUCTION, VISUAL SLAM & GAUSSIAN SPLATTING"
          sprite="flask"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dedicated Retro CRT Research Terminal Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="pixel-corners border-4 border-[var(--px-line)] bg-[var(--px-panel)] p-3 sm:p-4 pixel-shadow">
              {/* Monitor Top Bezel / Header */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b-2 border-[var(--px-line)] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[var(--px-mint)] inline-block pixel-blink" />
                  <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[var(--px-mint)]">
                    VISION_SLAM_MONITOR.CRT
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-['Silkscreen'] text-[var(--px-gold)]">
                  <span className="hidden sm:inline">AGCL LAB</span>
                  <span className="px-1.5 py-0.5 bg-[var(--px-panel-2)] border border-[var(--px-line)] text-[var(--px-mint)]">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Research Framework Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <PixelChip variant="mint" size="sm">
                  SplaTAM
                </PixelChip>
                <PixelChip variant="accent" size="sm">
                  MonoGS
                </PixelChip>
                <PixelChip variant="gold" size="sm">
                  Visual SLAM
                </PixelChip>
                <PixelChip variant="muted" size="sm">
                  COLMAP / NeRF
                </PixelChip>
              </div>

              {/* Exact FaultyTerminal container with responsive height */}
              <div
                style={{ width: '100%', height: 'min(600px, 75vh)', minHeight: '380px', position: 'relative' }}
                className="overflow-hidden pixel-corners border-2 border-[var(--px-line)] bg-black shadow-inner"
              >
                <FaultyTerminal
                  tint="#A7EF9E"
                  glyphs="blocks"
                  scale={1.5}
                  digitSize={1.2}
                  timeScale={0.5}
                  brightness={0.75}
                  glow={0.5}
                  persistence={0.5}
                  mouseStrength={0.5}
                  mouseGlow={0.6}
                  curvature={0.1}
                  vignette={0.25}
                  clickEffect="glitch"
                />
              </div>

              {/* Monitor Bottom Bezel / Interactive Controls Hint */}
              <div className="flex flex-wrap items-center justify-between pt-3 mt-3 border-t-2 border-[var(--px-line)] text-[9px] font-['Silkscreen'] text-[var(--px-muted)] gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--px-mint)]">● HOVER: MOUSE PHOSPHOR</span>
                  <span className="text-[var(--px-accent)]">⚡ CLICK: GLITCH TEAR</span>
                </div>
                <div className="text-[var(--px-gold)]">
                  GLYPHS: BLOCKS
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AGCL Lab Research Details & Pipeline Link */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <PixelBox
              title="IIT_MADRAS_AGCL_LAB.RESEARCH"
              icon={<PixelSprite name="flask" scale={1.2} />}
              variant="raised"
              goldBorder={true}
              tag="MAY - JUN 2026"
              className="bg-[var(--px-bg)]/92"
            >
              <div className="mb-4">
                <span className="font-['Silkscreen'] text-xs text-[var(--px-gold)] uppercase tracking-wider block font-bold">
                  RESEARCH INTERNSHIP
                </span>
                <h3 className="font-['Press_Start_2P'] text-sm sm:text-base text-[var(--px-ink)] mt-1">
                  Computer Vision &amp; Robotics
                </h3>
                <p className="font-['Silkscreen'] text-xs text-[var(--px-mint)] mt-1">
                  AGCL Lab, Indian Institute of Technology Madras, Chennai
                </p>
              </div>

              <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] leading-relaxed mb-4">
                Worked on computer vision, visual SLAM, and 3D scene reconstruction in a research-driven robotics environment. Explored and implemented research frameworks including SplaTAM and MonoGS for vision-based 3D reconstruction and SLAM.
              </p>

              <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] leading-relaxed mb-6">
                Gained practical experience with visual perception, camera-based localization, and reconstruction pipelines for robotic systems.
              </p>

              {/* Lab Telemetry Status Box */}
              <div className="p-3 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm mb-6">
                <div className="flex items-center justify-between text-[10px] font-['Silkscreen'] text-[var(--px-muted)] mb-2 pb-1 border-b border-[var(--px-line)]">
                  <span className="text-[var(--px-gold)]">ACTIVE TELEMETRY FEED</span>
                  <span className="text-[var(--px-mint)]">ONLINE</span>
                </div>
                <div className="font-['VT323'] text-lg text-[var(--px-ink)] flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">Target Node:</span>
                    <span className="text-[var(--px-gold)]">AGCL_ROBOTICS_L03</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">SLAM Framework:</span>
                    <span className="text-[var(--px-mint)]">SplaTAM + MonoGS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">Depth Map Density:</span>
                    <span className="text-[var(--px-mint)]">Dense Point-Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">Camera Trajectory:</span>
                    <span className="text-[var(--px-ink)]">6-DoF Pose Est.</span>
                  </div>
                </div>
              </div>

              {/* Pipeline Link Callout */}
              <div className="p-4 bg-[var(--px-panel)] border-2 border-[var(--px-accent)] pixel-corners-sm">
                <div className="flex items-center gap-2 mb-2">
                  <PixelSprite name="chip" scale={1.2} color="var(--px-accent)" />
                  <span className="font-['Press_Start_2P'] text-[10px] text-[var(--px-accent)] uppercase">
                    CROSS-PROJECT PIPELINE LINK
                  </span>
                </div>
                <p className="font-['VT323'] text-lg sm:text-xl text-[var(--px-ink)] leading-normal">
                  Directly connects with the <strong className="text-[var(--px-mint)]">Autonomous Warehouse Mapping Robot</strong> project: generating synchronized RGB, depth, point-cloud, and odometry datasets to feed into COLMAP and NeRF/Gaussian Splatting-based 3D reconstruction workflows.
                </p>
              </div>
            </PixelBox>
          </div>
        </div>
      </div>
    </section>
  );
}
