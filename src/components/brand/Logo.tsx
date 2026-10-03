import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LogoMark({
  size = 36,
  animated = false,
  className,
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={cn('relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-xl', className)}
      style={{ width: size, height: size }}
      initial={animated ? { scale: 0.85, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src="/logo.png"
        alt="Welinx POS Logo"
        className="w-full h-full object-contain drop-shadow-md"
        loading="eager"
      />
    </motion.div>
  );
}

export function Logo({
  className,
  animated = false,
  size = 36,
  showText = true,
}: {
  className?: string;
  animated?: boolean;
  size?: number;
  showText?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 group', className)}>
      <LogoMark size={size} animated={animated} />
      {showText && (
        <span className="flex items-center gap-1.5">
          <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Welinx
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            POS
          </span>
        </span>
      )}
    </span>
  );
}

