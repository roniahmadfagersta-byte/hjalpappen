import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  outline?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  outline = false,
  className = '',
  ...props
}) => {
  const baseClass = 'badge';
  const variantClass = `badge-${variant}`;
  const outlineClass = outline ? 'badge-outline' : '';

  return (
    <span
      className={`${baseClass} ${variantClass} ${outlineClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
