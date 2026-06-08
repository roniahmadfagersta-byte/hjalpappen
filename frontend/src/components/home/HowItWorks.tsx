import React from 'react';
import Card from '../ui/Card';

export const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-section section glass">
      <div className="container">
        <h2 className="section-title">Hur fungerar <span className="gradient-text">Marknadsplatsen</span>?</h2>
        <p className="section-subtitle">
          Plattformen är byggd för att göra det så enkelt och tryggt som möjligt för båda parter.
        </p>

        <div className="how-it-works-grid">
          {/* Customer Journey */}
          <div className="journey-column">
            <h3 className="journey-title title-customer">För dig som vill köpa en tjänst</h3>
            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Skapa uppdrag</h4>
                  <p>Beskriv vad du behöver hjälp med, sätt ett pris och välj adress/område.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Välj utförare</h4>
                  <p>Ta emot ansökningar från ungdomar nära dig. Se deras betyg, recensioner och erfarenheter innan du väljer.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Betala säkert</h4>
                  <p>Betalningen reserveras säkert hos oss och betalas ut till utföraren först när du godkänt att jobbet är slutfört.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Divider for desktop */}
          <div className="journey-divider"></div>

          {/* Youth Journey */}
          <div className="journey-column">
            <h3 className="journey-title title-youth">För dig som vill tjäna pengar</h3>
            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Hitta jobb nära dig</h4>
                  <p>Sök bland lokala uppdrag på kartan eller listan baserat på din position och dina intressen.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Skicka ansökan</h4>
                  <p>Berätta varför du passar för jobbet och föreslå ett pris (du kan godkänna kundens bud eller ge ett motbud).</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Utför jobbet & få betalt</h4>
                  <p>Gör ett bra jobb, markera det som klart i appen och få dina pengar utbetalda direkt till ditt bankkonto minus vår serviceavgift på 10%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Banner */}
        <Card className="safety-banner" variant="glass-heavy" glow="primary">
          <div className="safety-content">
            <span className="safety-badge-icon">🛡️</span>
            <div>
              <h3>Alltid tryggt med vår plattform</h3>
              <p>
                Varje användare är verifierad med BankID/SMS, alla betalningar sker krypterat via Swish/Stripe och vi har ett inbyggt tvistehanteringssystem om något skulle krångla.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
