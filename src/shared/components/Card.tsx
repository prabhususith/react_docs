import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  noPadding?: boolean;
}

export function Card({ children, className, title, description, noPadding = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm',
        !noPadding && 'p-5',
        className
      )}
    >
      {(title || description) && (
        <div className={clsx('mb-4', noPadding && 'px-5 pt-5')}>
          {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
          {description && <p className="text-sm text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
