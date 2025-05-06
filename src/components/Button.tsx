import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gradient-to-r from-[#c8102e] to-[#2d2d2d] text-white hover:opacity-90',
      outline: 'border border-[#c8102e] text-foreground bg-transparent hover:bg-[#c8102e]/10',
      ghost: 'bg-transparent text-foreground hover:bg-[#c8102e]/10',
      link: 'text-[#c8102e] underline-offset-4 hover:underline',
      primary: 'bg-gradient-to-r from-[#c8102e] to-[#2d2d2d] text-white shadow-md hover:shadow-lg hover:opacity-90',
      secondary: 'bg-[#2d2d2d] text-white hover:bg-[#2d2d2d]/90'
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 py-2 rounded-md',
      lg: 'h-12 px-6 py-3 rounded-md'
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
