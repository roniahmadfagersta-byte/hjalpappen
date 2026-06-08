'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { mockTasks } from '../../../lib/mock-data';
import { Task } from '../../../lib/types';
import { formatCurrency, getCategoryLabel, getStatusColor, getStatusLabel } from '../../../lib/utils';

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleCancelTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: 'CANCELLED' } : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="admin-tasks-view">
      <h2 className="admin-page-title">📋 Uppdragshantering</h2>
      <p className="admin-page-subtitle">Övervaka skapade uppdrag, hantera rapporteringar och häv tvister.</p>

      <Card className="table-card glass-heavy mt-6">
        <div className="table-scroll-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Uppdrag</th>
                <th>Kategori</th>
                <th>Kund</th>
                <th>Utförare</th>
                <th>Ersättning</th>
                <th>Status</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const statusStyle = getStatusColor(task.status);
                return (
                  <tr key={task.id}>
                    <td>
                      <div className="table-task-cell">
                        <strong>{task.title}</strong>
                        <span>📍 {task.address.split(',')[0]}</span>
                      </div>
                    </td>
                    <td>{getCategoryLabel(task.category)}</td>
                    <td>{task.customerName}</td>
                    <td>{task.assigneeName || 'Ej tilldelad'}</td>
                    <td>{formatCurrency(task.price)}</td>
                    <td>
                      <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                        {getStatusLabel(task.status)}
                      </Badge>
                    </td>
                    <td>
                      <div className="table-actions">
                        {task.status !== 'CANCELLED' && task.status !== 'COMPLETED' && task.status !== 'PAID' && (
                          <Button variant="danger" size="sm" onClick={() => handleCancelTask(task.id)}>
                            Avbryt
                          </Button>
                        )}
                        <Button variant="glass" size="sm" onClick={() => handleDeleteTask(task.id)} style={{ color: 'var(--color-error)' }}>
                          Ta bort
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
