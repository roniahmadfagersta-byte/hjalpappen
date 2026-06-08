export type UserRole = 'YOUTH' | 'CUSTOMER' | 'BUSINESS' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatarUrl?: string;
  description?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  location?: { lat: number; lng: number };
  municipality?: string;
  region?: string;
  rating?: number;
  completedTasksCount?: number;
  skills: string[];
  reliabilityIndex?: number; // 0-100
  completionRate?: number; // 0-100
  responseTime?: string; // e.g., "15 min"
  experience?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskCategory = 
  | 'GARDEN' 
  | 'HOME' 
  | 'ANIMAL' 
  | 'IT' 
  | 'STUDY' 
  | 'CRAFT' 
  | 'MOVING' 
  | 'BABYSITTING';

export type TaskStatus = 
  | 'OPEN' 
  | 'ASSIGNED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'PAID' 
  | 'CANCELLED';

export interface Task {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  title: string;
  description: string;
  category: TaskCategory;
  price: number;
  platformFee: number;
  status: TaskStatus;
  address: string;
  location: { lat: number; lng: number };
  radiusKm?: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskApplication {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRating?: number;
  message: string;
  proposedPrice: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Review {
  id: string;
  taskId: string;
  taskTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  revieweeId: string;
  rating: number; // 1-5
  comment: string;
  flaggedAsFake: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  taskId: string;
  taskTitle: string;
  payerId: string;
  payerName: string;
  payeeId: string;
  payeeName: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  method: 'CARD' | 'SWISH' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'INVOICE' | 'BANK_TRANSFER';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionId?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  remindersSent: number;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  taskId: string;
  taskTitle: string;
  participants: {
    id: string;
    name: string;
    avatarUrl?: string;
    role: UserRole;
  }[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'DOCUMENT';
  fileUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Advertisement {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  content: string;
  imageUrl?: string;
  type: 'BANNER' | 'SPONSORED_TASK' | 'CAMPAIGN';
  targetMunicipality?: string;
  targetRegion?: string;
  price: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PAUSED' | 'EXPIRED';
  createdAt: string;
}

export interface CompanyProspect {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  status: 'NOT_CONTACTED' | 'CONTACTED' | 'INTERESTED' | 'NEGOTIATING' | 'ACTIVE';
  notes?: string;
  lastContacted?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'NEW_TASK' | 'MESSAGE' | 'PAYMENT' | 'REVIEW' | 'REMINDER';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
