import { Headset, TrendingUp, Workflow, Users } from 'lucide-react';
import AnchorMark from './AnchorMark.jsx';

/**
 * Hero "hub and orbit" illustration per DESIGN_SPEC.md section 7.1.
 * Single inline SVG using a 480x480 viewBox; the outer <svg>'s responsive
 * width/height (280 / 360 / 480px at mobile/tablet/desktop) scales every
 * internal coordinate proportionally, so nodes/hub/icons stay in sync
 * across breakpoints without separate per-breakpoint math.
 */
export default function HeroIllustration() {
  const nodes = [
    { x: 240, y: 79, Icon: Headset, color: '#0F766E', label: 'Support agent' },
    { x: 401, y: 240, Icon: TrendingUp, color: '#B45309', label: 'Sales agent' },
    { x: 240, y: 401, Icon: Workflow, color: '#2F5D9F', label: 'Operations agent' },
    { x: 79, y: 240, Icon: Users, color: '#0F766E', label: 'Team collaboration' },
  ];

  return (
    <svg
      viewBox="0 0 480 480"
      className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[480px] lg:h-[480px] mx-auto"
      role="img"
      aria-label="Illustration of a central hub connected to four orbiting agent icons representing support, sales, operations, and team collaboration."
    >
      <defs>
        <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <filter id="hubShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2F5D9F" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Layer 1: outer ring */}
      <circle
        cx="240"
        cy="240"
        r="238"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="origin-center animate-rotate-slow motion-reduce:animate-none"
        style={{ transformOrigin: '240px 240px' }}
      />

      {/* Layer 2: middle ring */}
      <circle cx="240" cy="240" r="161" fill="none" stroke="#2F5D9F" strokeOpacity="0.3" strokeWidth="2" />

      {/* Layer 3: connecting lines */}
      <path d="M240,103 Q205,170 240,216" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" className="animate-dash-flow motion-reduce:animate-none" />
      <path d="M377,240 Q310,215 288,240" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" className="animate-dash-flow motion-reduce:animate-none" />
      <path d="M240,377 Q275,310 240,264" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" className="animate-dash-flow motion-reduce:animate-none" />
      <path d="M103,240 Q170,265 192,240" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" className="animate-dash-flow motion-reduce:animate-none" />

      {/* Layer 4: orbiting nodes */}
      {nodes.map(({ x, y, Icon, color, label }) => (
        <g key={label}>
          <circle cx={x} cy={y} r="24" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" filter="url(#nodeShadow)" />
          <Icon x={x - 10} y={y - 10} width={20} height={20} color={color} strokeWidth={2} aria-hidden="true" />
        </g>
      ))}

      {/* Layer 5: center hub */}
      <circle cx="240" cy="240" r="48" fill="#2F5D9F" filter="url(#hubShadow)" />
      <AnchorMark color="#FFFFFF" x={224} y={224} width={32} height={32} />
    </svg>
  );
}
