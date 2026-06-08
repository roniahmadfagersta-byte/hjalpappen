import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  verified?: boolean;
  role?: 'YOUTH' | 'CUSTOMER' | 'BUSINESS' | 'ADMIN';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  verified = false,
  role
}) => {
  const getInitials = (userName: string) => {
    return userName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleIcon = (userRole?: string) => {
    switch (userRole) {
      case 'YOUTH': return '⚡';
      case 'BUSINESS': return '🏢';
      case 'ADMIN': return '⚙️';
      default: return null;
    }
  };

  return (
    <div className={`avatar-container avatar-${size}`}>
      <div className="avatar-circle">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="avatar-img" />
        ) : (
          <div className="avatar-fallback">{getInitials(name)}</div>
        )}
      </div>
      {verified && (
        <span className="avatar-badge avatar-verified" title="Verifierad användare">
          ✓
        </span>
      )}
      {role && getRoleIcon(role) && (
        <span className="avatar-badge avatar-role" title={role}>
          {getRoleIcon(role)}
        </span>
      )}
    </div>
  );
};

export default Avatar;
