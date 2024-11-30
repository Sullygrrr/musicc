import { cn } from '../utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

export function TabButton({ active, className, children, ...props }: TabButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 font-medium rounded-lg transition-colors',
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}