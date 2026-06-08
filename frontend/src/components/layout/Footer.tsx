import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-grid">
        {/* Footer Brand Info */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span className="logo-spark">⚡</span>
            <span className="logo-text">Marknads<span className="gradient-text">platsen</span></span>
          </Link>
          <p className="footer-desc">
            En trygg och enkel plattform som kopplar ihop lokala behov med drivna ungdomar, privatpersoner och lokala företag.
          </p>
          <div className="footer-socials">
            <span className="social-icon">🔵</span>
            <span className="social-icon">🟣</span>
            <span className="social-icon">⚫</span>
          </div>
        </div>

        {/* Footer Links Column 1 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Tjänster</h4>
          <ul className="footer-col-links">
            <li><Link href="/tasks?category=GARDEN">🌱 Trädgårdshjälp</Link></li>
            <li><Link href="/tasks?category=HOME">🔨 Hem & Fix</Link></li>
            <li><Link href="/tasks?category=ANIMAL">🐾 Djurpassning</Link></li>
            <li><Link href="/tasks?category=IT">💻 IT-hjälp</Link></li>
            <li><Link href="/tasks?category=STUDY">📚 Läxhjälp</Link></li>
          </ul>
        </div>

        {/* Footer Links Column 2 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Säkerhet & Regler</h4>
          <ul className="footer-col-links">
            <li><Link href="/faq">Vanliga frågor</Link></li>
            <li><Link href="/safety">Trygghet på plattformen</Link></li>
            <li><Link href="/terms">Användarvillkor</Link></li>
            <li><Link href="/gdpr">GDPR & Integritet</Link></li>
            <li><Link href="/fees">Provisionsmodell</Link></li>
          </ul>
        </div>

        {/* Footer Links Column 3 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Kontakt</h4>
          <ul className="footer-col-links text-secondary">
            <li>📧 support@marknadsplatsen.se</li>
            <li>📞 08-123 456 78</li>
            <li>📍 Sveavägen 44, Stockholm</li>
            <li>🏢 Org. nr: 556123-4567</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© {new Date().getFullYear()} Marknadsplatsen AB. Alla rättigheter reserverade.</p>
          <div className="footer-bottom-links">
            <Link href="/cookies">Kakinställningar</Link>
            <span className="divider">|</span>
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
