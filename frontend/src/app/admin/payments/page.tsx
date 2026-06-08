'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { mockPayments } from '../../../lib/mock-data';
import { Payment } from '../../../lib/types';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);

  const handleRefund = (payId: string) => {
    setPayments(
      payments.map((p) => (p.id === payId ? { ...p, status: 'REFUNDED' } : p))
    );
  };

  return (
    <div className="admin-payments-view">
      <h2 className="admin-page-title">💳 Betalningar & Fakturor</h2>
      <p className="admin-page-subtitle">Revision av plattformens transaktioner, utbetalningar till utförare och återbetalningar.</p>

      <Card className="table-card glass-heavy mt-6">
        <div className="table-scroll-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Uppdrag</th>
                <th>Köpare</th>
                <th>Utförare</th>
                <th>Brutto</th>
                <th>Provision (10%)</th>
                <th>Netto utbetalt</th>
                <th>Betalmetod</th>
                <th>Status</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.id}>
                  <td><strong>{pay.taskTitle}</strong></td>
                  <td>{pay.payerName}</td>
                  <td>{pay.payeeName}</td>
                  <td>{formatCurrency(pay.amount)}</td>
                  <td style={{ color: 'var(--color-primary-light)' }}>{formatCurrency(pay.platformFee)}</td>
                  <td style={{ color: 'var(--color-success)' }}>{formatCurrency(pay.netAmount)}</td>
                  <td>
                    <Badge variant="neutral">{pay.method}</Badge>
                  </td>
                  <td>
                    <Badge variant={pay.status === 'COMPLETED' ? 'success' : pay.status === 'REFUNDED' ? 'warning' : 'error'}>
                      {pay.status === 'COMPLETED' ? 'Slutförd' : pay.status === 'REFUNDED' ? 'Återbetald' : 'Misslyckad'}
                    </Badge>
                  </td>
                  <td>
                    {pay.status === 'COMPLETED' && (
                      <Button variant="glass" size="sm" onClick={() => handleRefund(pay.id)}>
                        Refund
                      </Button>
                    )}
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
