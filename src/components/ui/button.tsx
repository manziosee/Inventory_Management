import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            primary:
              'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
            secondary:
              'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
            outline:
              'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
            ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
            destructive:
              'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
          }[variant],
          {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };