import React from 'react';
import type { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './globals.css';
import '../styles/animations.css';
import '../styles/components.css';
import '../styles/pages.css';

export const metadata: Metadata = {
  title: 'Marknadsplatsen – Enkla tjänster mellan ungdomar och kunder',
  description: 'Hitta eller erbjud lokala tjänster enkelt och säkert. Gräsklippning, hundpassning, läxhjälp och mycket mer. Kopplar samman ungdomar med privatpersoner och företag.',
  keywords: 'trädgårdshjälp, gräsklippning, hundvakt, barnpassning, ungdomsjobb, lokal marknadsplats'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <Navbar />
        <main className="main-content-wrapper">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
