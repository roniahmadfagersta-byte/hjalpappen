'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { mockCompanyProspects } from '../../../lib/mock-data';
import { CompanyProspect } from '../../../lib/types';

type PipelineStatus = CompanyProspect['status'];

export default function AdminCrmPage() {
  const [prospects, setProspects] = useState<CompanyProspect[]>(mockCompanyProspects);

  const columns: { status: PipelineStatus; label: string; color: string }[] = [
    { status: 'NOT_CONTACTED', label: 'Ej kontaktad', color: 'var(--color-text-secondary)' },
    { status: 'CONTACTED', label: 'Kontaktad', color: 'var(--color-info)' },
    { status: 'INTERESTED', label: 'Intresserad', color: 'var(--color-warning)' },
    { status: 'NEGOTIATING', label: 'Förhandlar', color: 'var(--color-primary-light)' },
    { status: 'ACTIVE', label: 'Aktiv annonsör', color: 'var(--color-success)' }
  ];

  const moveProspect = (id: string, currentStatus: PipelineStatus, direction: 'forward' | 'backward') => {
    const statusOrder: PipelineStatus[] = ['NOT_CONTACTED', 'CONTACTED', 'INTERESTED', 'NEGOTIATING', 'ACTIVE'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    let newIndex = currentIndex;
    if (direction === 'forward' && currentIndex < statusOrder.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'backward' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex !== currentIndex) {
      const nextStatus = statusOrder[newIndex];
      setProspects(
        prospects.map((p) =>
          p.id === id ? { ...p, status: nextStatus, lastContacted: new Date().toISOString() } : p
        )
      );
    }
  };

  return (
    <div className="admin-crm-view">
      <h2 className="admin-page-title">🏢 Företagsprospektering (CRM)</h2>
      <p className="admin-page-subtitle">Säljpipeline för att rekrytera lokala företag som sponsorer eller annonsörer.</p>

      {/* Kanban Board Layout */}
      <div className="crm-kanban-board mt-6">
        {columns.map((col) => {
          const colProspects = prospects.filter((p) => p.status === col.status);
          
          return (
            <div key={col.status} className="kanban-column glass">
              <div className="column-header" style={{ borderTop: `3px solid ${col.color}` }}>
                <h4>{col.label}</h4>
                <Badge variant="neutral">{colProspects.length}</Badge>
              </div>

              <div className="column-cards-area">
                {colProspects.map((prospect) => (
                  <Card key={prospect.id} className="kanban-prospect-card" variant="glass-heavy">
                    <h4>{prospect.companyName}</h4>
                    <p className="kpc-contact">👤 {prospect.contactPerson}</p>
                    {prospect.email && <p className="kpc-email">✉️ {prospect.email}</p>}
                    {prospect.notes && <p className="kpc-notes">📝 {prospect.notes}</p>}
                    
                    <div className="kpc-actions mt-3">
                      <button
                        className="kpc-arrow-btn"
                        onClick={() => moveProspect(prospect.id, prospect.status, 'backward')}
                        title="Flytta bakåt"
                      >
                        ◀
                      </button>
                      <button
                        className="kpc-arrow-btn"
                        onClick={() => moveProspect(prospect.id, prospect.status, 'forward')}
                        title="Flytta framåt"
                      >
                        ▶
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
