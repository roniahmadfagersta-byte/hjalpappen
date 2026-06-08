import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glass-heavy' | 'elevated';
  hoverable?: boolean;
  glow?: 'none' | 'primary' | 'secondary' | 'accent';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  hoverable = false,
  glow = 'none',
  className = '',
  ...props
}) => {
  const baseClass = 'card';
  const variantClass = variant === 'glass' ? 'glass' : variant === 'glass-heavy' ? 'glass-heavy' : variant === 'elevated' ? 'card-elevated' : 'card-default';
  const hoverClass = hoverable ? 'card-hoverable' : '';
  const glowClass = glow !== 'none' ? `card-glow-${glow}` : '';

  return (
    <div
      className={`${baseClass} ${variantClass} ${hoverClass} ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
