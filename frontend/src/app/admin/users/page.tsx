'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { mockUsers } from '../../../lib/mock-data';
import { User } from '../../../lib/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  return (
    <div className="admin-users-view">
      <h2 className="admin-page-title">👥 Användarhantering</h2>
      <p className="admin-page-subtitle">Hantera registreringar, verifieringsstatus och blockera konton vid överträdelser.</p>

      <Card className="table-card glass-heavy mt-6">
        <div className="table-scroll-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Användare</th>
                <th>E-post</th>
                <th>Roll</th>
                <th>Status</th>
                <th>Kommun</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="table-user-cell">
                      <Avatar src={user.avatarUrl} name={user.name} size="sm" verified={user.role === 'YOUTH'} />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Badge variant={user.role === 'YOUTH' ? 'primary' : user.role === 'ADMIN' ? 'error' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={user.status === 'ACTIVE' ? 'success' : 'error'}>
                      {user.status === 'ACTIVE' ? 'Aktiv' : 'Avstängd'}
                    </Badge>
                  </td>
                  <td>{user.municipality || 'Ej angivet'}</td>
                  <td>
                    <div className="table-actions">
                      <Button
                        variant={user.status === 'ACTIVE' ? 'danger' : 'success'}
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === 'ACTIVE' ? 'Stäng av' : 'Aktivera'}
                      </Button>
                    </div>
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
