import React from 'react';
import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
};

export function LoadingSpinner({ size = 'md', className, label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center gap-2', className)} role="status">
      <div
        className={clsx(
          'rounded-full border-slate-600 border-t-indigo-500 animate-spin',
          sizeMap[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
