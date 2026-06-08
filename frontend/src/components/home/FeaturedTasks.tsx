'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { mockTasks } from '../../lib/mock-data';
import { formatCurrency, getCategoryLabel, getCategoryIcon, getStatusColor, getStatusLabel } from '../../lib/utils';

export const FeaturedTasks: React.FC = () => {
  // Take open or in-progress tasks to feature
  const featured = mockTasks.slice(1, 4); // Montering, iPad, Hundpassning

  return (
    <section className="featured-tasks-section section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title text-left">Senaste <span className="gradient-text">uppdragen</span></h2>
            <p className="section-subtitle text-left">Se vad folk i ditt närområde behöver hjälp med just nu.</p>
          </div>
          <Link href="/tasks">
            <Button variant="outline">Visa alla uppdrag</Button>
          </Link>
        </div>

        <div className="tasks-grid">
          {featured.map((task) => {
            const statusStyle = getStatusColor(task.status);
            return (
              <Card key={task.id} className="task-card" hoverable>
                <div className="task-card-header">
                  <div className="task-category-badge">
                    <span className="badge-emoji">{getCategoryIcon(task.category)}</span>
                    <span className="badge-text">{getCategoryLabel(task.category)}</span>
                  </div>
                  <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                    {getStatusLabel(task.status)}
                  </Badge>
                </div>

                <h3 className="task-card-title">{task.title}</h3>
                <p className="task-card-desc">{task.description.slice(0, 100)}...</p>

                <div className="task-card-meta">
                  <div className="task-location">
                    <span>📍</span> {task.address.split(',')[0]}
                  </div>
                  <div className="task-price">{formatCurrency(task.price)}</div>
                </div>

                <div className="task-card-footer">
                  <div className="task-customer">
                    <Avatar src={task.customerAvatar} name={task.customerName} size="sm" />
                    <span>{task.customerName}</span>
                  </div>
                  <Link href={`/tasks/${task.id}`}>
                    <Button size="sm" variant="glass">
                      Visa detaljer
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
