'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const links: SidebarLink[] = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Användare', icon: '👥' },
    { href: '/admin/tasks', label: 'Uppdrag', icon: '📋' },
    { href: '/admin/payments', label: 'Fakturor & Betalningar', icon: '💳' },
    { href: '/admin/ads', label: 'Annonsering', icon: '📢' },
    { href: '/admin/crm', label: 'Företagsprospektering (CRM)', icon: '🏢' }
  ];

  return (
    <aside className="admin-sidebar glass">
      <div className="sidebar-header">
        <span className="sidebar-icon">⚙️</span>
        <h3>Adminpanel</h3>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="link-icon">{link.icon}</span>
              <span className="link-text">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
