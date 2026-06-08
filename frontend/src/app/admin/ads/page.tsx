'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { mockAdvertisements } from '../../../lib/mock-data';
import { Advertisement } from '../../../lib/types';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Advertisement[]>(mockAdvertisements);

  const toggleAdStatus = (adId: string) => {
    setAds(
      ads.map((ad) => {
        if (ad.id === adId) {
          const newStatus = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          return { ...ad, status: newStatus };
        }
        return ad;
      })
    );
  };

  return (
    <div className="admin-ads-view">
      <h2 className="admin-page-title">📢 Annonssystem & Kampanjer</h2>
      <p className="admin-page-subtitle">Hantera lokala annonser från företag, prissättning och geografisk målgruppsstyrning.</p>

      <Card className="table-card glass-heavy mt-6">
        <div className="table-scroll-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Företag</th>
                <th>Titel</th>
                <th>Kampanjtyp</th>
                <th>Inriktning (Geo)</th>
                <th>Kostnad</th>
                <th>Slutdatum</th>
                <th>Status</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td><strong>{ad.businessName}</strong></td>
                  <td>{ad.title}</td>
                  <td>
                    <Badge variant="primary">{ad.type}</Badge>
                  </td>
                  <td>📍 {ad.targetMunicipality || ad.targetRegion || 'Hela Sverige'}</td>
                  <td>{formatCurrency(ad.price)}</td>
                  <td>{formatDate(ad.endDate)}</td>
                  <td>
                    <Badge variant={ad.status === 'ACTIVE' ? 'success' : 'warning'}>
                      {ad.status === 'ACTIVE' ? 'Aktiv' : 'Pausad'}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="glass" size="sm" onClick={() => toggleAdStatus(ad.id)}>
                      {ad.status === 'ACTIVE' ? 'Pausa' : 'Aktivera'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
