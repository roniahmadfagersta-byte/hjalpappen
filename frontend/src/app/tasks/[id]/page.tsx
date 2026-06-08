'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import StarRating from '../../../components/ui/StarRating';
import { mockTasks, mockUsers, mockTaskApplications } from '../../../lib/mock-data';
import { Task, TaskApplication, UserRole } from '../../../lib/types';
import { formatCurrency, getCategoryIcon, getCategoryLabel, getStatusColor, getStatusLabel, formatDate } from '../../../lib/utils';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [applications, setApplications] = useState<TaskApplication[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('CUSTOMER');

  // Form states for application
  const [applyMsg, setApplyMsg] = useState('');
  const [applyPrice, setApplyPrice] = useState('');
  const [hasApplied, setHasApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Get demo user role
    const savedRole = localStorage.getItem('demo-user-role') as UserRole;
    if (savedRole) {
      setUserRole(savedRole);
    }

    // Find task
    const foundTask = mockTasks.find((t) => t.id === id);
    if (foundTask) {
      setTask(foundTask);
      
      // Find customer
      const foundCustomer = mockUsers.find((u) => u.id === foundTask.customerId);
      setCustomer(foundCustomer);
    }

    // Get applications
    const filteredApps = mockTaskApplications.filter((app) => app.taskId === id);
    setApplications(filteredApps);
  }, [id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setHasApplied(true);
      
      // Add fake application
      const newApp: TaskApplication = {
        id: `app-new-${Date.now()}`,
        taskId: task.id,
        userId: 'user-youth-1',
        userName: 'Hugo Bergström',
        userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        userRating: 4.9,
        message: applyMsg,
        proposedPrice: Number(applyPrice) || task.price,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      setApplications([newApp, ...applications]);
      setApplyMsg('');
      setApplyPrice('');
    }, 1500);
  };

  const handleAcceptApplication = (appId: string) => {
    if (!task) return;
    
    // Update task assignee
    const updatedTask = {
      ...task,
      status: 'ASSIGNED' as const,
      assigneeId: 'user-youth-1',
      assigneeName: 'Hugo Bergström',
      assigneeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
    };
    setTask(updatedTask);

    // Update application status
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: 'ACCEPTED' as const } : { ...app, status: 'REJECTED' as const }
      )
    );
  };

  if (!task) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h3>Uppdraget kunde inte hittas</h3>
        <Link href="/tasks">
          <Button variant="outline" style={{ marginTop: '1rem' }}>Gå tillbaka till sök</Button>
        </Link>
      </div>
    );
  }

  const statusStyle = getStatusColor(task.status);

  return (
    <div className="task-detail-page">
      <div className="container">
        {/* Back Link */}
        <Link href="/tasks" className="back-link">
          ← Gå tillbaka till sökning
        </Link>

        {/* Layout Column Grid */}
        <div className="task-detail-grid">
          {/* Main Info Area */}
          <main className="task-detail-main">
            <Card className="detail-card glass-heavy" glow="primary">
              <div className="detail-card-header">
                <div className="task-category-badge">
                  <span className="badge-emoji">{getCategoryIcon(task.category)}</span>
                  <span className="badge-text">{getCategoryLabel(task.category)}</span>
                </div>
                <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                  {getStatusLabel(task.status)}
                </Badge>
              </div>

              <h1 className="detail-title">{task.title}</h1>
              
              <div className="detail-meta-horizontal">
                <div className="dm-item">
                  <span className="dm-icon">📍</span>
                  <div>
                    <h5>Plats</h5>
                    <p>{task.address}</p>
                  </div>
                </div>
                <div className="dm-divider"></div>
                <div className="dm-item">
                  <span className="dm-icon">📅</span>
                  <div>
                    <h5>Slutdatum</h5>
                    <p>{formatDate(task.deadline)}</p>
                  </div>
                </div>
                <div className="dm-divider"></div>
                <div className="dm-item">
                  <span className="dm-icon">💰</span>
                  <div>
                    <h5>Pris (Ersättning)</h5>
                    <p className="price-tag">{formatCurrency(task.price)}</p>
                  </div>
                </div>
              </div>

              <div className="detail-description">
                <h3>Beskrivning</h3>
                <p>{task.description}</p>
              </div>
            </Card>

            {/* Applications Section */}
            <section className="applications-section mt-8">
              <h3 className="section-subtitle-left">Ansökningar ({applications.length})</h3>

              {applications.length > 0 ? (
                <div className="applications-list">
                  {applications.map((app) => (
                    <Card key={app.id} className="app-card glass" variant="glass">
                      <div className="app-card-header">
                        <div className="app-user-info">
                          <Avatar src={app.userAvatar} name={app.userName} size="md" verified />
                          <div>
                            <h4>{app.userName}</h4>
                            <div className="app-user-rating">
                              <StarRating rating={app.userRating || 5} size="sm" />
                              <span>({app.userRating})</span>
                            </div>
                          </div>
                        </div>
                        <div className="app-proposed-price">
                          Bud: <strong>{formatCurrency(app.proposedPrice)}</strong>
                        </div>
                      </div>
                      <p className="app-message">{app.message}</p>
                      
                      {/* Accept/Manage action for Customer */}
                      {userRole === 'CUSTOMER' && task.status === 'OPEN' && app.status === 'PENDING' && (
                        <div className="app-actions">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAcceptApplication(app.id)}
                          >
                            Acceptera bud & Tilldela
                          </Button>
                          <Link href="/chat">
                            <Button variant="glass" size="sm">
                              💬 Chatta först
                            </Button>
                          </Link>
                        </div>
                      )}

                      {app.status === 'ACCEPTED' && (
                        <div className="app-badge-accepted">✅ Det här budet har accepterats</div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="no-apps-card glass text-center">
                  <p>Det finns inga ansökningar på detta uppdrag än.</p>
                </Card>
              )}
            </section>
          </main>

          {/* Sidebar Area */}
          <aside className="task-detail-sidebar">
            {/* Customer Info Card */}
            {customer && (
              <Card className="customer-info-card glass-heavy">
                <h3 className="sidebar-card-title">Om beställaren</h3>
                <div className="cust-sidebar-profile">
                  <Avatar src={customer.avatarUrl} name={customer.name} size="lg" />
                  <h4>{customer.name}</h4>
                  <p className="cust-location">📍 {customer.municipality}</p>
                  
                  {customer.rating && (
                    <div className="cust-rating">
                      <StarRating rating={customer.rating} size="sm" />
                      <span>{customer.rating} (5 recensioner)</span>
                    </div>
                  )}
                </div>
                <p className="cust-desc">{customer.description}</p>
              </Card>
            )}

            {/* Application Action Form (For Youth) */}
            {userRole === 'YOUTH' && task.status === 'OPEN' && (
              <Card className="apply-action-card glass-heavy" glow="secondary">
                <h3 className="sidebar-card-title">Sök detta uppdrag</h3>
                
                {hasApplied ? (
                  <div className="apply-success text-center">
                    <span className="success-emoji">🎉</span>
                    <h4>Ansökan skickad!</h4>
                    <p>Beställaren har meddelats. Ni kan nu prata i chatten.</p>
                    <Link href="/chat">
                      <Button variant="primary" fullWidth style={{ marginTop: '1rem' }}>Gå till chatten</Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="apply-form">
                    <Input
                      label="Ditt prisförslag (kr)"
                      type="number"
                      placeholder={task.price.toString()}
                      value={applyPrice}
                      onChange={(e) => setApplyPrice(e.target.value)}
                    />
                    <div className="apply-price-helper">
                      Lämna tomt för att acceptera kundens bud på {formatCurrency(task.price)}.
                    </div>

                    <Input
                      label="Meddelande till kunden"
                      type="text"
                      placeholder="Hej! Jag hjälper gärna till med..."
                      required
                      value={applyMsg}
                      onChange={(e) => setApplyMsg(e.target.value)}
                    />

                    <Button type="submit" variant="secondary" fullWidth loading={submitting}>
                      Skicka ansökan
                    </Button>
                  </form>
                )}
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
