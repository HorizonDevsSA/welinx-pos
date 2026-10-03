import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade + rise once when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Counts up when first visible, then tweens between subsequent values. */
export function AnimatedNumber({
  value,
  format = (v) => Math.round(v).toLocaleString(),
  className,
}: {
  value: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const from = useRef(0);
  const [display, setDisplay] = useState(() => format(0));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from.current, value, {
      duration: 0.9,
      ease: EASE,
      onUpdate: (v) => setDisplay(format(v)),
    });
    from.current = value;
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {display}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <Reveal className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl', className)}>
      {eyebrow && (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400/90">{eyebrow}</p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-gradient sm:text-[2.6rem] sm:leading-[1.08]">
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-[15px] leading-relaxed text-zinc-400">{description}</p>}
    </Reveal>
  );
}
