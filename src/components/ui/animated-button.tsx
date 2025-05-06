import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  color = '#c8102e',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all duration-500 font-medium text-base border rounded-md px-8 py-3 uppercase',
        className
      )}
      style={{
        '--color': color,
        color: color,
        borderColor: color,
      } as React.CSSProperties}
      {...props}
    >
      {children}
      <style jsx>{`
        button::before,
        button::after {
          content: '';
          display: block;
          width: 50px;
          height: 50px;
          transform: translate(-50%, -50%);
          position: absolute;
          border-radius: 50%;
          z-index: -1;
          background-color: var(--color);
          transition: 1s ease;
        }

        button::before {
          top: -1em;
          left: -1em;
        }

        button::after {
          left: calc(100% + 1em);
          top: calc(100% + 1em);
        }

        button:hover::before,
        button:hover::after {
          height: 410px;
          width: 410px;
        }

        button:hover {
          color: white;
        }

        button:active {
          filter: brightness(0.8);
        }
      `}</style>
    </button>
  );
};

export default AnimatedButton; 