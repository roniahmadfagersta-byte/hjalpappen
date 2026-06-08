'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { mockUsers } from '../../lib/mock-data';
import { UserRole } from '../../lib/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<UserRole>('CUSTOMER');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  // Sync role to localStorage to share context across pages
  useEffect(() => {
    const savedRole = localStorage.getItem('demo-user-role') as UserRole;
    if (savedRole) {
      setCurrentRole(savedRole);
    } else {
      localStorage.setItem('demo-user-role', 'CUSTOMER');
    }
  }, []);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('demo-user-role', role);
    setShowRoleSelect(false);
    
    // Redirect to home or role-specific home to reset state
    if (role === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  // Find the user matching the active role for display
  const activeUser = mockUsers.find(u => u.role === currentRole) || mockUsers[2]; // Fallback to Birgitta

  const navLinks = [
    { href: '/tasks', label: 'Sök uppdrag', roles: ['YOUTH', 'CUSTOMER', 'BUSINESS', 'ADMIN'] },
    { href: '/dashboard', label: 'Min Panel', roles: ['YOUTH', 'CUSTOMER', 'BUSINESS'] },
    { href: '/chat', label: 'Chatt', roles: ['YOUTH', 'CUSTOMER', 'BUSINESS'] },
    { href: '/admin', label: 'Admin', roles: ['ADMIN'] }
  ];

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link href="/" className="nav-logo">
          <span className="logo-spark">⚡</span>
          <span className="logo-text">Marknads<span className="gradient-text">platsen</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks
            .filter(link => link.roles.includes(currentRole))
            .map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* Right Menu (Profile & Demo Switcher) */}
        <div className="nav-actions">
          {/* Demo Role Switcher */}
          <div className="role-switcher-container">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setShowRoleSelect(!showRoleSelect)}
              className="role-switcher-btn"
            >
              Roll: <Badge variant="primary">{currentRole}</Badge> ▾
            </Button>
            {showRoleSelect && (
              <div className="role-dropdown glass-heavy">
                <div className="dropdown-title">Välj testroll:</div>
                <button onClick={() => handleRoleChange('YOUTH')} className="dropdown-item">
                  ⚡ Ungdom (Utförare)
                </button>
                <button onClick={() => handleRoleChange('CUSTOMER')} className="dropdown-item">
                  👤 Kund (Beställare)
                </button>
                <button onClick={() => handleRoleChange('BUSINESS')} className="dropdown-item">
                  🏢 Företag (Annonsör)
                </button>
                <button onClick={() => handleRoleChange('ADMIN')} className="dropdown-item">
                  ⚙️ Systemadmin
                </button>
              </div>
            )}
          </div>

          {/* User Profile / Login */}
          {currentRole ? (
            <Link href={currentRole === 'ADMIN' ? '/admin' : `/profile/${activeUser.id}`} className="nav-profile-link">
              <Avatar
                src={activeUser.avatarUrl}
                name={activeUser.name}
                size="sm"
                verified={activeUser.role === 'YOUTH'}
                role={activeUser.role}
              />
              <span className="nav-profile-name">{activeUser.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="sm">Logga in</Button>
            </Link>
          )}

          {/* Hamburger Mobile Menu Toggle */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Links Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay glass-heavy">
          <div className="mobile-links">
            <Link href="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Hem
            </Link>
            {navLinks
              .filter(link => link.roles.includes(currentRole))
              .map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <div className="mobile-role-selector">
              <p>Byt Demo-roll:</p>
              <div className="mobile-role-buttons">
                <Button variant={currentRole === 'YOUTH' ? 'primary' : 'glass'} size="sm" onClick={() => { handleRoleChange('YOUTH'); setMobileMenuOpen(false); }}>Ungdom</Button>
                <Button variant={currentRole === 'CUSTOMER' ? 'primary' : 'glass'} size="sm" onClick={() => { handleRoleChange('CUSTOMER'); setMobileMenuOpen(false); }}>Kund</Button>
                <Button variant={currentRole === 'BUSINESS' ? 'primary' : 'glass'} size="sm" onClick={() => { handleRoleChange('BUSINESS'); setMobileMenuOpen(false); }}>Företag</Button>
                <Button variant={currentRole === 'ADMIN' ? 'primary' : 'glass'} size="sm" onClick={() => { handleRoleChange('ADMIN'); setMobileMenuOpen(false); }}>Admin</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
