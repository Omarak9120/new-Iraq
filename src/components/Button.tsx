
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
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-primary text-foreground bg-transparent hover:bg-primary/10',
      ghost: 'bg-transparent text-foreground hover:bg-primary/10',
      link: 'text-primary underline-offset-4 hover:underline',
      primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg hover:opacity-90',
      secondary: 'bg-secondary text-foreground hover:bg-secondary/90'
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
