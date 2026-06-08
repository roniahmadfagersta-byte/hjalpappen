import { TaskCategory, TaskStatus } from './types';

// Format currency to Swedish Kronor (SEK)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0
  }).format(amount);
}

// Format date to readable Swedish format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Format date and time
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('sv-SE', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Format relative time (e.g., "för 5 minuter sedan", "igår")
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just nu';
  if (diffMins < 60) return `För ${diffMins} min sedan`;
  if (diffHours < 24) return `För ${diffHours} tim sedan`;
  if (diffDays === 1) return 'Igår';
  if (diffDays < 7) return `För ${diffDays} dagar sedan`;
  
  return formatDate(dateString);
}

// Map task category to Swedish display name
export function getCategoryLabel(category: TaskCategory): string {
  const labels: Record<TaskCategory, string> = {
    GARDEN: 'Trädgård',
    HOME: 'Hem & Fix',
    ANIMAL: 'Djurpassning',
    IT: 'IT-hjälp',
    STUDY: 'Läxhjälp',
    CRAFT: 'Hantverk',
    MOVING: 'Flytthjälp',
    BABYSITTING: 'Barnpassning'
  };
  return labels[category] || category;
}

// Map task category to emoji icon
export function getCategoryIcon(category: TaskCategory): string {
  const icons: Record<TaskCategory, string> = {
    GARDEN: '🌱',
    HOME: '🔨',
    ANIMAL: '🐾',
    IT: '💻',
    STUDY: '📚',
    CRAFT: '🎨',
    MOVING: '📦',
    BABYSITTING: '👶'
  };
  return icons[category] || '📋';
}

// Map task category to theme color (CSS variable name)
export function getCategoryColor(category: TaskCategory): string {
  const colors: Record<TaskCategory, string> = {
    GARDEN: 'var(--color-success)',
    HOME: 'var(--color-primary-light)',
    ANIMAL: 'var(--color-accent)',
    IT: 'var(--color-secondary)',
    STUDY: 'var(--color-warning)',
    CRAFT: 'var(--color-info)',
    MOVING: 'var(--color-text-secondary)',
    BABYSITTING: 'var(--color-primary)'
  };
  return colors[category] || 'var(--color-primary)';
}

// Map task status to Swedish display name
export function getStatusLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    OPEN: 'Öppen',
    ASSIGNED: 'Tilldelad',
    IN_PROGRESS: 'Pågående',
    COMPLETED: 'Slutförd',
    PAID: 'Betald',
    CANCELLED: 'Avbruten'
  };
  return labels[status] || status;
}

// Map task status to color class/style
export function getStatusColor(status: TaskStatus): { bg: string; text: string } {
  const colors: Record<TaskStatus, { bg: string; text: string }> = {
    OPEN: { bg: 'rgba(0, 206, 201, 0.1)', text: 'var(--color-secondary)' },
    ASSIGNED: { bg: 'rgba(108, 92, 231, 0.1)', text: 'var(--color-primary-light)' },
    IN_PROGRESS: { bg: 'rgba(253, 203, 110, 0.1)', text: 'var(--color-warning)' },
    COMPLETED: { bg: 'rgba(0, 184, 148, 0.1)', text: 'var(--color-success)' },
    PAID: { bg: 'rgba(0, 184, 148, 0.2)', text: 'var(--color-success)' },
    CANCELLED: { bg: 'rgba(225, 112, 85, 0.1)', text: 'var(--color-error)' }
  };
  return colors[status] || { bg: 'rgba(255, 255, 255, 0.1)', text: 'var(--color-text-secondary)' };
}

// Haversine formula to calculate distance in km
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
