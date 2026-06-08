'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Card from '../ui/Card';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tasks?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/tasks');
    }
  };

  return (
    <section className="hero-section">
      {/* Background visual blobs */}
      <div className="hero-blob blob-primary"></div>
      <div className="hero-blob blob-secondary"></div>
      <div className="hero-blob blob-accent"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge-wrapper">
            <span className="hero-badge glass">⚡ Nyhet: Swish-betalningar direkt i appen</span>
          </div>
          <h1 className="hero-title">
            Hitta lokal hjälp &<br />
            stöd <span className="gradient-text">unga i din närhet</span>
          </h1>
          <p className="hero-subtitle">
            En trygg och enkel marknadsplats där ungdomar kan erbjuda enklare tjänster som gräsklippning, hundpassning eller läxhjälp till privatpersoner och företag.
          </p>

          {/* Search bar inside glass container */}
          <form className="hero-search-form glass-heavy" onSubmit={handleSearchSubmit}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Vad behöver du hjälp med? T.ex. gräsklippning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <Button type="submit" variant="primary" size="lg">
              Sök uppdrag
            </Button>
          </form>

          {/* Stats indicators */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1 200+</span>
              <span className="stat-label">Aktiva ungdomar</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4 800+</span>
              <span className="stat-label">Utförda uppdrag</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.9 ★</span>
              <span className="stat-label">Snittbetyg</span>
            </div>
          </div>
        </div>

        {/* Floating cards visual right-side */}
        <div className="hero-visual">
          <Card className="floating-card card-1" glow="primary" hoverable>
            <div className="fc-header">
              <span className="fc-emoji">🐾</span>
              <div>
                <h4>Hundpassning</h4>
                <p>Birgitta Söderberg</p>
              </div>
            </div>
            <div className="fc-footer">
              <span className="fc-price">1 200 kr</span>
              <span className="fc-status status-open">Öppen</span>
            </div>
          </Card>

          <Card className="floating-card card-2" glow="secondary" hoverable>
            <div className="fc-header">
              <span className="fc-emoji">🌱</span>
              <div>
                <h4>Gräsklippning</h4>
                <p>Johan Lindqvist</p>
              </div>
            </div>
            <div className="fc-footer">
              <span className="fc-price">400 kr</span>
              <span className="fc-status status-completed">Slutförd</span>
            </div>
          </Card>

          <Card className="floating-card card-3" glow="accent" hoverable>
            <div className="fc-header">
              <span className="fc-emoji">📚</span>
              <div>
                <h4>Läxhjälp Matte 1</h4>
                <p>Viktor, 16 år</p>
              </div>
            </div>
            <div className="fc-footer">
              <span className="fc-price">250 kr/tim</span>
              <span className="fc-status status-assigned">Tilldelad</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
