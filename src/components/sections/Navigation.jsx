import React, { useState } from 'react';
import BranchedMenu from '../reactbits/BranchedMenu';
import PixelSprite from '../pixel/PixelSprite';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';

export default function Navigation({ activeSection, onNavigate, onReplayIntro }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      label: 'Start',
      children: [
        {
          value: 'hero',
          label: 'Home',
          icon: <PixelSprite name="robot" scale={1.2} color="var(--px-mint)" />,
        },
        {
          value: 'about',
          label: 'About',
          icon: <PixelSprite name="user" scale={1.2} color="var(--px-ink)" />,
        },
      ],
    },
    {
      label: 'Journey',
      children: [
        {
          value: 'experience',
          label: 'Experience',
          icon: <PixelSprite name="briefcase" scale={1.2} color="var(--px-gold)" />,
        },
        {
          value: 'research',
          label: 'Research',
          icon: <PixelSprite name="flask" scale={1.2} color="var(--px-mint)" />,
        },
      ],
    },
    {
      label: 'Build',
      children: [
        {
          value: 'projects',
          label: 'Projects',
          icon: <PixelSprite name="cartridge" scale={1.2} color="var(--px-accent)" />,
        },
        {
          value: 'skills',
          label: 'Skills',
          icon: <PixelSprite name="code" scale={1.2} color="var(--px-mint)" />,
        },
        {
          value: 'arcade',
          label: 'Arcade',
          icon: <PixelSprite name="cartridge" scale={1.2} color="var(--px-gold)" />,
        },
      ],
    },
    {
      label: 'Records',
      children: [
        {
          value: 'education',
          label: 'Education',
          icon: <PixelSprite name="star" scale={1.2} color="var(--px-gold)" />,
        },
        {
          value: 'certifications',
          label: 'Certifications',
          icon: <PixelSprite name="trophy" scale={1.2} color="var(--px-mint)" />,
        },
      ],
    },
    {
      value: 'contact',
      label: 'Connect',
      icon: <PixelSprite name="mail" scale={1.2} color="var(--px-accent)" />,
    },
  ];

  const handleSelect = (value) => {
    onNavigate(value);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Sticky Top Bar */}
      <header className="lg:hidden sticky top-0 left-0 right-0 z-40 bg-[var(--px-bg)] border-b-4 border-[var(--px-line)] px-4 py-3 flex items-center justify-between pixel-shadow-sm select-none">
        <div className="flex items-center gap-3">
          <PixelSprite name="robot" scale={2} />
          <div>
            <span className="font-['Press_Start_2P'] text-xs text-[var(--px-ink)] block">
              RASAL.DEV
            </span>
            <span className="font-['Silkscreen'] text-[10px] text-[var(--px-mint)] tracking-wider block">
              B.TECH CSE
            </span>
          </div>
        </div>

        <PixelButton
          size="sm"
          variant="secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          ariaLabel={mobileOpen ? 'Close Menu' : 'Open Menu'}
          icon={<PixelSprite name={mobileOpen ? 'close' : 'menu'} scale={1.5} />}
        >
          {mobileOpen ? 'CLOSE' : 'MENU'}
        </PixelButton>
      </header>

      {/* Mobile Sub-Header Directory Bar: Horizontally scrollable, always open & visible */}
      <nav
        aria-label="Mobile Directory Navigation"
        className="lg:hidden sticky top-[57px] z-30 bg-[var(--px-bg)]/95 border-b-2 border-[var(--px-line)] px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar"
      >
        {menuItems
          .flatMap(cat => (cat.children ? cat.children : [cat]))
          .map(item => {
            const isActive = activeSection === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item.value)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-['Press_Start_2P'] border whitespace-nowrap cursor-pointer transition-none ${
                  isActive
                    ? 'bg-[var(--px-mint)] text-black border-[var(--px-mint)] font-bold'
                    : 'bg-[var(--px-panel)] text-[var(--px-muted)] border-[var(--px-line)] hover:text-[var(--px-ink)] hover:border-[var(--px-mint)]'
                } pixel-corners-sm`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 bg-[var(--px-bg)]/98 p-6 flex flex-col justify-between overflow-y-auto"
        >
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b-4 border-[var(--px-line)]">
              <div className="flex items-center gap-3">
                <PixelSprite name="robot" scale={2} />
                <span className="font-['Press_Start_2P'] text-sm text-[var(--px-ink)]">
                  SYSTEM NAV
                </span>
              </div>
              <PixelButton
                size="sm"
                variant="secondary"
                onClick={() => setMobileOpen(false)}
                ariaLabel="Close Menu"
                icon={<PixelSprite name="close" scale={1.5} />}
              >
                CLOSE
              </PixelButton>
            </div>

            <div className="flex justify-center py-2">
              <BranchedMenu
                items={menuItems}
                active={activeSection}
                defaultOpen={[0, 1, 2, 3]}
                alwaysOpen={true}
                onSelect={handleSelect}
                color="#f4efe6"
                accentColor="#5cffc8"
                lineColor="#3b2f66"
                radius={0}
                lineWidth={3}
                rowHeight={38}
                indent={40}
                fontSize={13}
                width={250}
                drawDuration={300}
                foldDuration={240}
                className="font-['Silkscreen']"
              />
            </div>
          </div>

          <div className="pt-4 border-t-4 border-[var(--px-line)] flex items-center justify-between px-2">
            <span className="font-['VT323'] text-lg text-[var(--px-muted)]">
              Rasal Musthafa &copy; 2026
            </span>
            {onReplayIntro && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onReplayIntro();
                }}
                className="font-['Silkscreen'] text-xs text-[var(--px-gold)] hover:text-[var(--px-mint)] underline cursor-pointer"
              >
                [REPLAY INTRO]
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Floating Compact Rail */}
      <aside className="hidden lg:flex fixed top-4 left-4 z-40 w-52 flex-col select-none">
        <PixelBox
          variant="panel"
          title="NAV_SYSTEM.SYS"
          className="w-full max-h-[calc(100vh-2rem)] flex flex-col pixel-shadow-sm"
          bodyClassName="p-2.5 flex flex-col gap-2 overflow-y-auto"
        >
          {/* Header / Identity Card */}
          <div className="p-2 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <PixelSprite name="robot" scale={1.4} />
              <div className="min-w-0">
                <h1 className="font-['Press_Start_2P'] text-[10px] text-[var(--px-ink)] tracking-wider truncate">
                  RASAL M.
                </h1>
                <span className="font-['Silkscreen'] text-[8px] text-[var(--px-mint)] font-bold">
                  PLAYER 01
                </span>
              </div>
            </div>
            <div className="mt-1 text-[10px] font-['VT323'] text-[var(--px-muted)] border-t border-[var(--px-line)] pt-1 flex justify-between">
              <span>LVL: 2024-28</span>
              <span className="text-[var(--px-gold)]">CGPA 9.48</span>
            </div>
          </div>

          {/* Tree Menu */}
          <div className="w-full flex justify-center py-0.5">
            <BranchedMenu
              items={menuItems}
              active={activeSection}
              defaultOpen={[0, 1, 2, 3]}
              alwaysOpen={true}
              onSelect={handleSelect}
              color="#f4efe6"
              accentColor="#5cffc8"
              lineColor="#3b2f66"
              radius={0}
              lineWidth={2}
              rowHeight={30}
              indent={32}
              fontSize={11}
              width={176}
              drawDuration={260}
              foldDuration={200}
              className="font-['Silkscreen']"
            />
          </div>

          {/* Quick Status Badge & Reboot Action */}
          <div className="pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between text-[9px] font-['Silkscreen'] px-0.5">
            <div className="flex items-center gap-1.5 text-[var(--px-mint)]">
              <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
              <span>READY</span>
            </div>
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="text-[var(--px-gold)] hover:text-[var(--px-mint)] hover:border-[var(--px-mint)] transition-colors px-1.5 py-0.5 border border-[var(--px-line)] bg-[var(--px-panel-2)] cursor-pointer select-none active:translate-y-0.5"
                title="Replay intro boot sequence"
              >
                REBOOT
              </button>
            )}
          </div>
        </PixelBox>
      </aside>
    </>
  );
}
