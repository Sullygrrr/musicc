import { useEffect, useState, TouchEvent } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: SwipeGestureOptions) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart) return;

      const currentTouch = e.touches[0].clientX;
      const diff = touchStart - currentTouch;

      // Prevent vertical scrolling when swiping horizontally
      if (Math.abs(diff) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;

      const currentTouch = e.changedTouches[0].clientX;
      const diff = touchStart - currentTouch;

      if (Math.abs(diff) >= threshold) {
        if (diff > 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }

      setTouchStart(null);
    };

    document.addEventListener('touchstart', handleTouchStart as any);
    document.addEventListener('touchmove', handleTouchMove as any, { passive: false });
    document.addEventListener('touchend', handleTouchEnd as any);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart as any);
      document.removeEventListener('touchmove', handleTouchMove as any);
      document.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [touchStart, onSwipeLeft, onSwipeRight, threshold]);
}