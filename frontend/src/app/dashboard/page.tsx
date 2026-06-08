'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StarRating from '../../components/ui/StarRating';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { mockTasks, mockUsers, mockReviews } from '../../lib/mock-data';
import { Task, UserRole, User } from '../../lib/types';
import { formatCurrency, getCategoryLabel, getStatusColor, getStatusLabel } from '../../lib/utils';

export default function UserDashboard() {
  const [userRole, setUserRole] = useState<UserRole>('CUSTOMER');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [paying, setPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    const savedRole = (localStorage.getItem('demo-user-role') as UserRole) || 'CUSTOMER';
    setUserRole(savedRole);

    const activeUser = mockUsers.find((u) => u.role === savedRole) || mockUsers[2];
    setCurrentUser(activeUser);

    // Filter tasks based on role
    if (savedRole === 'YOUTH') {
      // Tasks where user is assignee
      setMyTasks(mockTasks.filter((t) => t.assigneeId === activeUser.id));
    } else if (savedRole === 'CUSTOMER') {
      // Tasks created by user
      setMyTasks(mockTasks.filter((t) => t.customerId === activeUser.id));
    } else if (savedRole === 'BUSINESS') {
      // Business users have advertisements, not tasks
      setMyTasks([]);
    }
  }, [userRole]);

  const handleMarkCompleted = (taskId: string) => {
    setMyTasks(
      myTasks.map((t) => (t.id === taskId ? { ...t, status: 'COMPLETED' } : t))
    );
  };

  const triggerPaymentFlow = (task: Task) => {
    setSelectedTask(task);
    setPayModalOpen(true);
    setPaymentDone(false);
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaymentDone(true);
      if (selectedTask) {
        setMyTasks(
          myTasks.map((t) => (t.id === selectedTask.id ? { ...t, status: 'PAID' } : t))
        );
      }
    }, 2000);
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard-page-wrapper">
      <div className="container">
        {/* Header Hero card */}
        <Card className="dashboard-welcome-card glass-heavy" glow="primary">
          <div className="welcome-inner">
            <Avatar src={currentUser.avatarUrl} name={currentUser.name} size="lg" role={currentUser.role} />
            <div>
              <h2>Välkommen till din panel, {currentUser.name.split(' ')[0]}!</h2>
              <p>Här kan du hantera dina uppdrag, utbetalningar och annonser.</p>
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        {userRole === 'YOUTH' && (
          <div className="dashboard-stats-grid">
            <Card className="stat-box glass" variant="glass">
              <h4>Intjänat totalt</h4>
              <p className="stat-number-accent">{formatCurrency(currentUser.completedTasksCount ? currentUser.completedTasksCount * 450 : 0)}</p>
              <span>Utbetalas direkt till ditt bankkonto</span>
            </Card>
            <Card className="stat-box glass" variant="glass">
              <h4>Utförda jobb</h4>
              <p className="stat-number-accent">{currentUser.completedTasksCount}</p>
              <span>Starkt jobbat! 🚀</span>
            </Card>
            <Card className="stat-box glass" variant="glass">
              <h4>Pålitlighet</h4>
              <p className="stat-number-accent">{currentUser.reliabilityIndex}%</p>
              <span>Topp 5% i området! ⭐</span>
            </Card>
          </div>
        )}

        {userRole === 'CUSTOMER' && (
          <div className="dashboard-stats-grid">
            <Card className="stat-box glass" variant="glass">
              <h4>Skapade uppdrag</h4>
              <p className="stat-number-accent">{myTasks.length}</p>
              <span>Totalt publicerade</span>
            </Card>
            <Card className="stat-box glass" variant="glass">
              <h4>Utbetalt</h4>
              <p className="stat-number-accent">{formatCurrency(1200)}</p>
              <span>Säkert via Swish/Kort</span>
            </Card>
            <Card className="stat-box glass" variant="glass">
              <h4>Pågående jobb</h4>
              <p className="stat-number-accent">{myTasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED').length}</p>
              <span>Hjälpen är på väg! 🔨</span>
            </Card>
          </div>
        )}

        {userRole === 'BUSINESS' && (
          <div className="dashboard-stats-grid">
            <Card className="stat-box glass" variant="glass">
              <h4>Aktiva kampanjer</h4>
              <p className="stat-number-accent">2 st</p>
              <span>Riktade lokalt</span>
            </Card>
            <Card className="stat-box glass" variant="glass">
              <h4>Visningar (Impressions)</h4>
              <p className="stat-number-accent">14.2 K</p>
              <span>Denna månad</span>
            </Card>
            <Card className="stat-box glass" variant="glass">
              <h4>Klick (CTR)</h4>
              <p className="stat-number-accent">3.4%</p>
              <span>483 unika klick</span>
            </Card>
          </div>
        )}

        {/* Dynamic section layouts */}
        <div className="dashboard-content-layout mt-8">
          {/* Main tasks panel */}
          <main className="dashboard-main-panel">
            {userRole === 'BUSINESS' ? (
              <Card className="business-campaign-card glass-heavy">
                <div className="panel-header-row">
                  <h3>Dina lokala annonser</h3>
                  <Button variant="primary" size="sm">⚙️ Skapa ny kampanj</Button>
                </div>

                <div className="business-campaigns-list mt-4">
                  <div className="bc-item glass">
                    <div className="bc-info">
                      <h4>ICA Supermarket - Handla lokalt</h4>
                      <p>Målgrupp: Sundbyberg • Typ: Banner</p>
                    </div>
                    <Badge variant="success">Aktiv</Badge>
                  </div>
                  <div className="bc-item glass mt-3">
                    <div className="bc-info">
                      <h4>Lokala Bygg AB - Altanbyggen</h4>
                      <p>Målgrupp: Hela Stockholm • Typ: Kampanj</p>
                    </div>
                    <Badge variant="success">Aktiv</Badge>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="tasks-panel-card glass-heavy">
                <div className="panel-header-row">
                  <h3>Dina uppdrag</h3>
                  {userRole === 'CUSTOMER' && (
                    <Link href="/tasks">
                      <Button variant="primary" size="sm">+ Skapa uppdrag</Button>
                    </Link>
                  )}
                </div>

                {myTasks.length > 0 ? (
                  <div className="dashboard-tasks-list mt-4">
                    {myTasks.map((task) => {
                      const statusStyle = getStatusColor(task.status);
                      return (
                        <div key={task.id} className="dt-row glass">
                          <div className="dt-info">
                            <h4>{task.title}</h4>
                            <p>{getCategoryLabel(task.category)} • {task.address.split(',')[0]}</p>
                          </div>
                          
                          <div className="dt-actions">
                            <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, marginRight: '1rem' }}>
                              {getStatusLabel(task.status)}
                            </Badge>

                            {/* Actions for Youth workers */}
                            {userRole === 'YOUTH' && task.status === 'ASSIGNED' && (
                              <Button variant="secondary" size="sm" onClick={() => handleMarkCompleted(task.id)}>
                                Markera som utförd
                              </Button>
                            )}

                            {/* Actions for Customers */}
                            {userRole === 'CUSTOMER' && task.status === 'COMPLETED' && (
                              <Button variant="primary" size="sm" onClick={() => triggerPaymentFlow(task)}>
                                Godkänn & Betala
                              </Button>
                            )}

                            {task.status === 'PAID' && (
                              <span className="dt-paid-check">💸 Utbetald</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="dt-empty text-center" style={{ padding: '3rem 0' }}>
                    <p>Du har inga aktiva uppdrag just nu.</p>
                  </div>
                )}
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* Simulated Payment Modal */}
      {selectedTask && (
        <Modal
          isOpen={payModalOpen}
          onClose={() => setPayModalOpen(false)}
          title={`Godkänn & Betala för ${selectedTask.title}`}
          footerActions={
            !paymentDone ? (
              <>
                <Button variant="glass" onClick={() => setPayModalOpen(false)}>Avbryt</Button>
                <Button variant="primary" onClick={handlePay} loading={paying}>
                  Betala med Swish ({formatCurrency(selectedTask.price)})
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setPayModalOpen(false)}>Klart</Button>
            )
          }
        >
          {!paymentDone ? (
            <div className="payment-modal-body">
              <p>Genom att godkänna bekräftar du att uppdraget har utförts enligt överenskommelse.</p>
              
              {/* Payment Summary */}
              <div className="payment-summary-box glass">
                <div className="ps-row">
                  <span>Arvode till utföraren ({selectedTask.assigneeName}):</span>
                  <span>{formatCurrency(selectedTask.price - selectedTask.platformFee)}</span>
                </div>
                <div className="ps-row">
                  <span>Plattformsavgift (10%):</span>
                  <span>{formatCurrency(selectedTask.platformFee)}</span>
                </div>
                <div className="ps-row ps-total">
                  <span>Totalt att betala:</span>
                  <span>{formatCurrency(selectedTask.price)}</span>
                </div>
              </div>

              {/* Swish Mock Display */}
              <div className="swish-prompt glass mt-4">
                <span className="swish-logo">📲</span>
                <div>
                  <h4>Betala med Swish</h4>
                  <p>Öppna Swish-appen på din telefon för att signera betalningen.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="payment-success text-center">
              <span className="success-emoji">🎉</span>
              <h4>Betalning genomförd!</h4>
              <p>Arvodet på {formatCurrency(selectedTask.price - selectedTask.platformFee)} har förts över till {selectedTask.assigneeName}. Tack för att du använder vår plattform!</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
