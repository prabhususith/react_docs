import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  danger: 'bg-red-500/15 text-red-400 border-red-500/30',
  info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  neutral: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
