'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import StarRating from '../../../components/ui/StarRating';
import { mockUsers, mockReviews } from '../../../lib/mock-data';
import { User, Review } from '../../../lib/types';
import { formatDate } from '../../../lib/utils';

export default function ProfileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Find user
    const foundUser = mockUsers.find((u) => u.id === id);
    if (foundUser) {
      setUser(foundUser);
      
      // Find reviews received by this user
      const foundReviews = mockReviews.filter((r) => r.revieweeId === id);
      setReviews(foundReviews);
    }
  }, [id]);

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h3>Användaren kunde inte hittas</h3>
        <Button variant="outline" onClick={() => router.push('/')} style={{ marginTop: '1rem' }}>
          Gå till startsidan
        </Button>
      </div>
    );
  }

  const isYouth = user.role === 'YOUTH';

  return (
    <div className="profile-page-wrapper">
      {/* Profile Header Hero */}
      <section className="profile-hero-section glass">
        <div className="container profile-hero-container">
          <Avatar
            src={user.avatarUrl}
            name={user.name}
            size="xl"
            verified={isYouth}
            role={user.role}
          />
          <div className="profile-hero-info">
            <div className="profile-name-row">
              <h1>{user.name}</h1>
              {isYouth && <Badge variant="success">Verifierad Utförare</Badge>}
            </div>
            <p className="profile-title-text">
              {isYouth ? '⚡ Ungdoms-utförare' : user.role === 'CUSTOMER' ? '👤 Beställare (Kund)' : '🏢 Företagsannonsör'}
            </p>
            <p className="profile-geo-text">📍 {user.municipality}, {user.region}</p>

            {/* Micro rating stats */}
            {user.rating && (
              <div className="profile-rating-row">
                <StarRating rating={user.rating} size="md" />
                <span className="rating-text-value">
                  <strong>{user.rating}</strong> ({reviews.length} recensioner)
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Profile Grid */}
      <div className="container profile-grid-container mt-8">
        {/* Sidebar Info Card */}
        <aside className="profile-sidebar">
          {isYouth && (
            <Card className="profile-stats-card glass-heavy" glow="primary">
              <h3 className="sidebar-card-title">Pålitlighetsindex</h3>
              
              <div className="index-meter-wrapper">
                <div className="index-percentage">{user.reliabilityIndex}%</div>
                <div className="index-bar-bg">
                  <div className="index-bar-fill" style={{ width: `${user.reliabilityIndex}%` }}></div>
                </div>
                <p className="index-helper">Baseras på punktlighet, slutförandegrad och svarstid.</p>
              </div>

              <div className="sidebar-stat-list">
                <div className="ssl-item">
                  <span className="ssl-label">Slutförda jobb</span>
                  <span className="ssl-val">{user.completedTasksCount}</span>
                </div>
                <div className="ssl-item">
                  <span className="ssl-label">Slutförandegrad</span>
                  <span className="ssl-val">{user.completionRate}%</span>
                </div>
                <div className="ssl-item">
                  <span className="ssl-label">Typisk svarstid</span>
                  <span className="ssl-val">{user.responseTime}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Contact action button */}
          <Card className="profile-contact-card glass-heavy text-center">
            <h3 className="sidebar-card-title">Intresserad av att anlita?</h3>
            <p>Diskutera ditt uppdrag och få ett prisförslag.</p>
            <Button
              variant="primary"
              fullWidth
              style={{ marginTop: '1rem' }}
              onClick={() => router.push('/chat')}
            >
              💬 Starta chatttråd
            </Button>
          </Card>
        </aside>

        {/* Main Info Content */}
        <main className="profile-main-content">
          {/* About section */}
          <Card className="profile-section-card glass-heavy">
            <h3 className="profile-section-title">Beskrivning</h3>
            <p className="profile-desc-text">{user.description || 'Ingen beskrivning angiven.'}</p>

            {isYouth && user.experience && (
              <div className="profile-experience-block mt-4">
                <h4>Erfarenhet</h4>
                <p>{user.experience}</p>
              </div>
            )}
          </Card>

          {/* Skills / Competences */}
          {isYouth && user.skills && user.skills.length > 0 && (
            <Card className="profile-section-card glass-heavy mt-6">
              <h3 className="profile-section-title">Kompetenser & Färdigheter</h3>
              <div className="profile-skills-wrap">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="primary" className="skill-pill">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Reviews List */}
          <section className="profile-reviews-section mt-8">
            <h3 className="profile-section-title">Recensioner ({reviews.length})</h3>

            {reviews.length > 0 ? (
              <div className="profile-reviews-list">
                {reviews.map((rev) => (
                  <Card key={rev.id} className="review-card glass" variant="glass">
                    <div className="review-card-header">
                      <div className="reviewer-bio">
                        <Avatar src={rev.reviewerAvatar} name={rev.reviewerName} size="sm" />
                        <div>
                          <h4>{rev.reviewerName}</h4>
                          <span className="review-date">{formatDate(rev.createdAt)}</span>
                        </div>
                      </div>
                      <StarRating rating={rev.rating} size="sm" />
                    </div>
                    <div className="review-task-title">
                      Uppdrag: <strong>{rev.taskTitle}</strong>
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="no-reviews-card glass text-center">
                <p>Denna användare har inte fått några recensioner än.</p>
              </Card>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
