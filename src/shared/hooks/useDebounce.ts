import { useState, useEffect } from 'react';

/**
 * useDebounce — React equivalent of RxJS debounceTime(ms).
 * Angular uses: searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
 * React uses: useState + useEffect with setTimeout cleanup.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timeout if value changes before delay elapses.
    // This is analogous to RxJS switchMap's automatic subscription cancellation.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
