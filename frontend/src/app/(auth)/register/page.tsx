'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { UserRole } from '../../../lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('YOUTH');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('demo-user-role', role);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-page-container">
      <div className="hero-blob blob-primary" style={{ top: '5%', right: '15%' }}></div>
      <div className="hero-blob blob-secondary" style={{ bottom: '5%', left: '15%' }}></div>

      <Card className="auth-card glass-heavy" glow="primary" style={{ maxWidth: '550px' }}>
        <div className="auth-header">
          <span className="auth-spark">⚡</span>
          <h2>Skapa ditt konto</h2>
          <p>Börja erbjuda eller beställa lokala tjänster idag.</p>
        </div>

        {/* User Type Selection */}
        <div className="role-selector-grid">
          <button
            type="button"
            className={`role-select-box ${role === 'YOUTH' ? 'active' : ''}`}
            onClick={() => setRole('YOUTH')}
          >
            <span className="rs-emoji">⚡</span>
            <h4>Ungdom</h4>
            <p>Vill utföra enklare jobb och tjäna extra pengar.</p>
          </button>

          <button
            type="button"
            className={`role-select-box ${role === 'CUSTOMER' ? 'active' : ''}`}
            onClick={() => setRole('CUSTOMER')}
          >
            <span className="rs-emoji">👤</span>
            <h4>Privatperson</h4>
            <p>Söker lokal hjälp med hushållssysslor.</p>
          </button>

          <button
            type="button"
            className={`role-select-box ${role === 'BUSINESS' ? 'active' : ''}`}
            onClick={() => setRole('BUSINESS')}
          >
            <span className="rs-emoji">🏢</span>
            <h4>Företag</h4>
            <p>Vill marknadsföra tjänster eller köpa lokala annonser.</p>
          </button>
        </div>

        {/* Registration Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {role === 'BUSINESS' ? (
            <>
              <Input
                label="Företagsnamn"
                type="text"
                placeholder="Företaget AB"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Input
                label="Kontaktpersonens namn"
                type="text"
                placeholder="För- och efternamn"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          ) : (
            <Input
              label="Namn"
              type="text"
              placeholder="För- och efternamn"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            label="E-postadress"
            type="email"
            placeholder="namn@exempel.se"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Mobilnummer"
            type="tel"
            placeholder="+46 70 123 45 67"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            label="Lösenord"
            type="password"
            placeholder="Minst 8 tecken"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="terms-check">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              Jag godkänner <Link href="/terms">användarvillkoren</Link> och att min data hanteras i enlighet med <Link href="/gdpr">GDPR</Link>.
            </label>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading}>
            Skapa konto
          </Button>
        </form>

        <p className="auth-footer-text">
          Har du redan ett konto?{' '}
          <Link href="/login" className="gradient-text">
            Logga in här
          </Link>
        </p>
      </Card>
    </div>
  );
}
