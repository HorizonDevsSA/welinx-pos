import { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const NODES: [number, number][] = [
  [7, 10.5],
  [16, 13.5],
  [25, 10.5],
];

/**
 * Welinx mark — a single continuous "W" stroke joined by three nodes,
 * representing linked registers syncing through one network.
 */
export function LogoMark({
  size = 28,
  animated = false,
  className,
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  const gid = `wl-${useId().replace(/:/g, '')}`;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="5" y1="6" x2="27" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A7F3D0" />
          <stop offset="0.55" stopColor="#34D399" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="#0E1013" stroke="rgba(255,255,255,0.1)" />
      <motion.path
        d="M7 10.5 11.5 21.5 16 13.5 20.5 21.5 25 10.5"
        stroke={`url(#${gid})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />
      {NODES.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.9"
          fill="#0E1013"
          stroke={`url(#${gid})`}
          strokeWidth="1.6"
          initial={animated ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ delay: animated ? 0.55 + i * 0.12 : 0, type: 'spring', stiffness: 420, damping: 18 }}
        />
      ))}
    </svg>
  );
}

export function Logo({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={28} animated={animated} />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">Welinx</span>
    </span>
  );
}
