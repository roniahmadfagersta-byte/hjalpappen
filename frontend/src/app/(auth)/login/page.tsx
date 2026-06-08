'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [useSms, setUseSms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('demo-user-role', 'CUSTOMER');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-page-container">
      <div className="hero-blob blob-primary" style={{ top: '10%', left: '30%' }}></div>
      <div className="hero-blob blob-accent" style={{ bottom: '10%', right: '30%' }}></div>

      <Card className="auth-card glass-heavy" glow="primary">
        <div className="auth-header">
          <span className="auth-spark">⚡</span>
          <h2>Välkommen tillbaka</h2>
          <p>Logga in för att hantera dina uppdrag och meddelanden.</p>
        </div>

        {/* Tab Selection */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${!useSms ? 'active' : ''}`}
            onClick={() => setUseSms(false)}
          >
            E-post
          </button>
          <button
            className={`auth-tab ${useSms ? 'active' : ''}`}
            onClick={() => setUseSms(true)}
          >
            SMS / Mobil
          </button>
        </div>

        {/* Auth Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!useSms ? (
            <>
              <Input
                label="E-postadress"
                type="email"
                placeholder="namn@exempel.se"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Lösenord"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot-password">
                <Link href="/forgot-password">Glömt lösenordet?</Link>
              </div>
            </>
          ) : (
            <Input
              label="Mobilnummer"
              type="tel"
              placeholder="+46 70 123 45 67"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          <Button type="submit" variant="primary" fullWidth loading={loading}>
            {useSms ? 'Skicka verifieringskod' : 'Logga in'}
          </Button>
        </form>

        <div className="auth-divider">
          <span>eller logga in med</span>
        </div>

        {/* Social Buttons */}
        <div className="social-auth-buttons">
          <Button
            variant="glass"
            fullWidth
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                localStorage.setItem('demo-user-role', 'CUSTOMER');
                router.push('/dashboard');
              }, 1000);
            }}
          >
            🌐 Google-konto
          </Button>
        </div>

        <p className="auth-footer-text">
          Har du inget konto än?{' '}
          <Link href="/register" className="gradient-text">
            Registrera dig här
          </Link>
        </p>
      </Card>
    </div>
  );
}
