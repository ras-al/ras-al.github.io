import React from 'react';

// Character grid sprites for authentic pixel-art rendering.
// '.' = transparent
// 'M' = mint highlight
// 'A' = accent purple
// 'G' = gold / yellow
// 'W' = white / ink
// 'D' = dark border / shadow
// 'R' = alert red

const DEFAULT_PALETTE = {
  '.': 'transparent',
  'M': '#5cffc8',
  'A': '#a855f7',
  'G': '#ffd36e',
  'W': '#f4efe6',
  'D': '#3b2f66',
  'B': '#000000',
  'R': '#ff4f6d',
};

export const SPRITES = {
  robot: [
    "..MMMM..",
    "...AA...",
    ".DDDDDD.",
    "DWWWWWWD",
    "DW.WW.WD",
    "DW.WW.WD",
    "DWMWWMMD",
    "DDDDDDDD",
    ".DGGGGGD",
    "..DDDD.."
  ],
  drone: [
    "M...AA...M",
    "MM..AA..MM",
    ".MMDAADM. ",
    "..DDDDDD..",
    "...DMMD...",
    "..DDDDDD..",
    ".MMDAADM. ",
    "MM..AA..MM",
    "M...AA...M"
  ],
  chip: [
    ".D.D.D.D.",
    "DDDDDDDDD",
    "DDMMMMM DD",
    ".DMWWWMMD.",
    "DDMMMMM DD",
    "DDDDDDDDD",
    ".D.D.D.D."
  ],
  user: [
    "...DDDD...",
    "..DMMMMD..",
    "..DMWWMMD..",
    "..DMMMMD..",
    "...DDDD...",
    ".DDDDDDDD.",
    "DDWWWWWDD",
    "DDWWWWWDD",
    "DDWWWWWDD",
    ".DDDDDDDD."
  ],
  briefcase: [
    "....DDDD....",
    "....D..D....",
    ".DDDDDDDDDD.",
    "DDGGGGGGGGDD",
    "DDGGDMMDGGD ",
    "DDGGDDDDGGDD",
    "DDGGGGGGGGDD",
    ".DDDDDDDDDD."
  ],
  flask: [
    "....DD....",
    "....DD....",
    "...DDDD...",
    "..D....D..",
    ".D.M..M.D.",
    "D..MMMM..D",
    "DMMMMMMMMD",
    "DDDDDDDDDD"
  ],
  cartridge: [
    "DDDDDDDDDD",
    "D........D",
    "D.DDDDDD.D",
    "D.DMMMMD.D",
    "D.DMWWMD.D",
    "D.DDDDDD.D",
    "D........D",
    "DDDDDDDDDD",
    ".D.D..D.D."
  ],
  code: [
    "...D...D...",
    "..D.D.D.D..",
    ".D...D...D.",
    "D...D.D...D",
    ".D...D...D.",
    "..D.D.D.D..",
    "...D...D..."
  ],
  mail: [
    "DDDDDDDDDDDD",
    "DD........DD",
    "D.D......D.D",
    "D..D....D..D",
    "D...D..D...D",
    "D....DD....D",
    "DD........DD",
    "DDDDDDDDDDDD"
  ],
  star: [
    "....DD....",
    "....DD....",
    "..DDGGDD..",
    "DDGGGGGGDD",
    "..DDGGDD..",
    "....DD....",
    "....DD...."
  ],
  download: [
    "....DD....",
    "....DD....",
    "....DD....",
    "..DDDDDD..",
    "...DDDD...",
    "....DD....",
    "..........",
    "DDDDDDDDDD"
  ],
  menu: [
    "DDDDDDDDDD",
    "DDDDDDDDDD",
    "..........",
    "DDDDDDDDDD",
    "DDDDDDDDDD",
    "..........",
    "DDDDDDDDDD",
    "DDDDDDDDDD"
  ],
  close: [
    "DD......DD",
    ".DD....DD.",
    "..DD..DD..",
    "...DDDD...",
    "...DDDD...",
    "..DD..DD..",
    ".DD....DD.",
    "DD......DD"
  ],
  heart: [
    ".DD..DD.",
    "DRRDD RRD",
    "DRRRRRRRD",
    "DRRRRRRRD",
    ".DRRRRRD.",
    "..DRRRD..",
    "...DRD...",
    "....D...."
  ],
  trophy: [
    ".DDDDDDDD.",
    "DDGGGGGGDD",
    "DDGDGGGDGD",
    "DDGGGGGGDD",
    ".DDGGGGDD.",
    "..DDDDDD..",
    "....DD....",
    "...DDDD..."
  ],
  check: [
    ".......DD.",
    "......DDM.",
    ".....DDM..",
    "DD..DDM...",
    ".DDDDM....",
    "..DDM....."
  ],
  external: [
    "....DDDDDD",
    "....D....D",
    "....D.DD.D",
    "DD..D..D.D",
    "D.D.DDDD.D",
    "D..D......",
    "DDDD......"
  ],
  'arrow-up': [
    "....DD....",
    "...DDDD...",
    "..DDDDDD..",
    ".DDDDDDDD.",
    "....DD....",
    "....DD....",
    "....DD...."
  ],
  cat: [
    "D...D...",
    "DD.DD...",
    "DWWWDD..",
    "DWGWGDD.",
    "DWWWWWDD",
    ".DDDDD.D",
    "..DDDD..",
    "..D..D.."
  ],
  bug: [
    "..D...D..",
    "...D.D...",
    "..DDDDD..",
    ".DDRRDDD.",
    "DDDRRDDDD",
    "DDDDDDDDD",
    "D.D...D.D",
    "D.......D"
  ],
  wizard: [
    "....AAA....",
    "...AAAAA...",
    "..AAAAAAA..",
    ".AAAAAAAAA.",
    "...DDDDD...",
    "..DWGWGWD..",
    "..DWWWWWD..",
    "..DDDDDDD..",
    ".AAAAMAAAA.",
    "AAAAAMAAAAA",
    ".AAAAMAAAA."
  ],
  speaker: [
    "...D....",
    "..DD.D..",
    "DDDD..D.",
    "DDDD..D.",
    "..DD.D..",
    "...D...."
  ]
};

export default function PixelSprite({
  name,
  grid,
  palette = {},
  scale = 2,
  color,
  className = ''
}) {
  const spriteGrid = grid || (name && SPRITES[name]) || SPRITES.robot;
  const mergedPalette = { ...DEFAULT_PALETTE, ...palette };
  if (color) {
    mergedPalette['D'] = color;
    mergedPalette['W'] = color;
  }

  const height = spriteGrid.length;
  const width = Math.max(...spriteGrid.map(row => row.length));

  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`inline-block select-none ${className}`}
    >
      {spriteGrid.map((row, y) =>
        row.split('').map((char, x) => {
          const fill = mergedPalette[char];
          if (!fill || fill === 'transparent') return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}
