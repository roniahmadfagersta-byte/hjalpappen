'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '../ui/Card';
import { TaskCategory } from '../../lib/types';
import { getCategoryLabel, getCategoryIcon } from '../../lib/utils';

interface CategoryItem {
  type: TaskCategory;
  description: string;
}

export const Categories: React.FC = () => {
  const router = useRouter();

  const categories: CategoryItem[] = [
    { type: 'GARDEN', description: 'Klippa gräs, kratta löv, skotta snö eller rensa rabatter.' },
    { type: 'HOME', description: 'Montera IKEA-möbler, tvätta fönster eller byta glödlampor.' },
    { type: 'ANIMAL', description: 'Rasta hundar, mata katter eller sitta djurvakt över helgen.' },
    { type: 'IT', description: 'Starta igång ny surfplatta, förklara BankID eller rensa datorn.' },
    { type: 'STUDY', description: 'Läxhjälp i matematik, engelska eller förberedelse inför prov.' },
    { type: 'BABYSITTING', description: 'Hämta från förskolan, passa på kvällen eller leka i parken.' },
    { type: 'MOVING', description: 'Bära kartonger, packa eller städa efter flytt.' },
    { type: 'CRAFT', description: 'Enklare måleri, slipning eller snickeriarbeten.' }
  ];

  const handleCategoryClick = (categoryType: TaskCategory) => {
    router.push(`/tasks?category=${categoryType}`);
  };

  return (
    <section className="categories-section section">
      <div className="container">
        <h2 className="section-title">Populära <span className="gradient-text">kategorier</span></h2>
        <p className="section-subtitle">
          Välj en kategori nedan för att se vilka uppdrag som finns tillgängliga eller för att skapa en förfrågan inom det området.
        </p>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Card
              key={cat.type}
              className="category-card"
              hoverable
              onClick={() => handleCategoryClick(cat.type)}
            >
              <div className="cat-icon-wrapper">
                <span className="cat-icon">{getCategoryIcon(cat.type)}</span>
              </div>
              <h3 className="cat-title">{getCategoryLabel(cat.type)}</h3>
              <p className="cat-desc">{cat.description}</p>
              <span className="cat-arrow">→</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
