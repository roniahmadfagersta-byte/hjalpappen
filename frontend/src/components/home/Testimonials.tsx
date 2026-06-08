import React from 'react';
import Card from '../ui/Card';
import StarRating from '../ui/StarRating';
import Avatar from '../ui/Avatar';

interface TestimonialItem {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'CUSTOMER' | 'YOUTH';
  roleLabel: string;
  rating: number;
  quote: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 't-1',
      name: 'Birgitta Söderberg',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      role: 'CUSTOMER',
      roleLabel: 'Pensionär & Kund, Sundbyberg',
      rating: 5,
      quote: '”Jag behövde hjälp med att klippa min gräsmatta och fick kontakt med Hugo. Han kom dagen efter, var supertrevlig och klippte allt perfekt. Vilket fantastiskt initiativ för att hjälpa oss äldre!”'
    },
    {
      id: 't-2',
      name: 'Hugo Bergström',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      role: 'YOUTH',
      roleLabel: 'Gymnasieelev & Utförare, 18 år',
      rating: 5,
      quote: '”Genom appen har jag kunnat tjäna extra pengar på helgerna genom att göra saker jag gillar, som att klippa gräs och rasta hundar. Det är lätt att få jobb och betalningen kommer direkt till kontot.”'
    },
    {
      id: 't-3',
      name: 'Johan Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'CUSTOMER',
      roleLabel: 'Småbarnsförälder, Bromma',
      rating: 5,
      quote: '”Med heltidsjobb och två småbarn är det guld värt att få hjälp med att montera garderober och rensa rabatter. Ungdomarna är otroligt drivna och plattformen känns 100% trygg att använda.”'
    }
  ];

  return (
    <section className="testimonials-section section glass">
      <div className="container">
        <h2 className="section-title">Vad säger våra <span className="gradient-text">användare</span>?</h2>
        <p className="section-subtitle">
          Läs berättelser från nöjda kunder som fått vardagshjälp och ungdomar som tagit sina första kliv i arbetslivet.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((test) => (
            <Card key={test.id} className="testimonial-card" variant="glass-heavy" hoverable>
              <div className="test-header">
                <StarRating rating={test.rating} size="sm" />
              </div>
              <p className="test-quote">{test.quote}</p>
              <div className="test-footer">
                <Avatar src={test.avatarUrl} name={test.name} size="sm" verified={test.role === 'YOUTH'} />
                <div className="test-author-info">
                  <h4 className="test-author-name">{test.name}</h4>
                  <span className="test-author-role">{test.roleLabel}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
