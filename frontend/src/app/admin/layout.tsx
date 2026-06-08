import React from 'react';
import Sidebar from '../../components/layout/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout-wrapper">
      <div className="container admin-container-layout">
        {/* Sidebar Nav */}
        <Sidebar />

        {/* Content area */}
        <main className="admin-content-area">{children}</main>
      </div>
    </div>
  );
}
