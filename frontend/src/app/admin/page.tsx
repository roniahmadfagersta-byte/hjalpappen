'use client';

import React from 'react';
import Card from '../../components/ui/Card';
import { mockUsers, mockTasks, mockPayments } from '../../lib/mock-data';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboardPage() {
  const totalUsers = mockUsers.length;
  const activeTasks = mockTasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED').length;
  const totalRevenue = mockPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const platformFees = mockPayments.reduce((acc, curr) => acc + curr.platformFee, 0);

  // Simulated chart data
  const revenueHistory = [
    { month: 'Jan', amount: 15000 },
    { month: 'Feb', amount: 22000 },
    { month: 'Mar', amount: 35000 },
    { month: 'Apr', amount: 48000 },
    { month: 'Maj', amount: 65000 },
    { month: 'Jun', amount: 82000 }
  ];

  const maxAmount = Math.max(...revenueHistory.map(h => h.amount));

  return (
    <div className="admin-dashboard-view">
      <h2 className="admin-page-title">📊 Systemöversikt (Dashboard)</h2>
      <p className="admin-page-subtitle">Realtidsstatistik för plattformens aktivitet och intäkter.</p>

      {/* KPI Stats Row */}
      <div className="admin-kpi-grid mt-6">
        <Card className="kpi-card glass">
          <span className="kpi-icon">👥</span>
          <div>
            <h4>Totalt antal användare</h4>
            <p className="kpi-number">{totalUsers * 100}+</p>
          </div>
        </Card>

        <Card className="kpi-card glass">
          <span className="kpi-icon">📋</span>
          <div>
            <h4>Aktiva uppdrag</h4>
            <p className="kpi-number">{activeTasks}</p>
          </div>
        </Card>

        <Card className="kpi-card glass">
          <span className="kpi-icon">💳</span>
          <div>
            <h4>Transaktionsvolym</h4>
            <p className="kpi-number">{formatCurrency(totalRevenue * 10)}</p>
          </div>
        </Card>

        <Card className="kpi-card glass">
          <span className="kpi-icon">💰</span>
          <div>
            <h4>Plattformsintäkter</h4>
            <p className="kpi-number">{formatCurrency(platformFees * 10)}</p>
          </div>
        </Card>
      </div>

      {/* Charts & Activity Layout */}
      <div className="admin-layout-columns mt-8">
        {/* Revenue trend card */}
        <Card className="chart-panel-card glass-heavy" style={{ flex: 2 }}>
          <h3>Intäktstrend (SEK)</h3>
          
          <div className="simulated-chart-container mt-6">
            <div className="chart-bars-axis">
              {revenueHistory.map((history) => {
                const heightPct = (history.amount / maxAmount) * 100;
                return (
                  <div key={history.month} className="chart-bar-col">
                    <div className="bar-hover-val">{formatCurrency(history.amount)}</div>
                    <div className="chart-bar-fill" style={{ height: `${heightPct}%` }}></div>
                    <span className="chart-axis-label">{history.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* System log */}
        <Card className="activity-panel-card glass-heavy" style={{ flex: 1 }}>
          <h3>Systemaktivitet</h3>
          
          <div className="activity-list mt-4">
            <div className="activity-item">
              <span className="ai-dot dot-success"></span>
              <div>
                <p><strong>Hugo B.</strong> slutförde "Gräsklippning"</p>
                <span>5 min sedan</span>
              </div>
            </div>
            <div className="activity-item mt-3">
              <span className="ai-dot dot-primary"></span>
              <div>
                <p><strong>Johan L.</strong> Swishade 400 kr</p>
                <span>8 min sedan</span>
              </div>
            </div>
            <div className="activity-item mt-3">
              <span className="ai-dot dot-warning"></span>
              <div>
                <p>Ny registrering: <strong>Viktor M. (Ungdom)</strong></p>
                <span>30 min sedan</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
