import { User, Task, Review, Payment, ChatRoom, ChatMessage, CompanyProspect, Advertisement, Notification, TaskApplication } from './types';

export const mockUsers: User[] = [
  {
    id: 'user-youth-1',
    email: 'hugo.b@example.se',
    phone: '+46701112233',
    name: 'Hugo Bergström',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    description: '18 år och pluggar teknik på gymnasiet. Älskar hundar och trädgårdsarbete. Noggrann, snabb och har tillgång till egen gräsklippare!',
    role: 'YOUTH',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    municipality: 'Sundbyberg',
    region: 'Stockholm',
    rating: 4.9,
    completedTasksCount: 24,
    skills: ['Gräsklippning', 'Trädgårdsarbete', 'Snöskottning', 'Hundpassning', 'Montering av möbler'],
    reliabilityIndex: 98,
    completionRate: 100,
    responseTime: '10 min',
    experience: 'Klippt grannars gräsmattor i 3 år. Har haft hund hela livet.',
    createdAt: '2025-09-15T12:00:00Z',
    updatedAt: '2026-05-20T14:30:00Z'
  },
  {
    id: 'user-youth-2',
    email: 'linnea.a@example.se',
    phone: '+46702223344',
    name: 'Linnea Andersson',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    description: 'Hej! Jag är 17 år och läser samhällsvetenskap. Jag hjälper gärna till med läxor (särskilt matte och språk) eller som barnvakt på helger/kvällar.',
    role: 'YOUTH',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    municipality: 'Solna',
    region: 'Stockholm',
    rating: 4.8,
    completedTasksCount: 15,
    skills: ['Läxhjälp', 'Barnpassning', 'IT-hjälp'],
    reliabilityIndex: 95,
    completionRate: 94,
    responseTime: '25 min',
    experience: 'Barnvakt åt kusiner sedan 14 års ålder. Läxhjälp åt grannbarn.',
    createdAt: '2025-10-01T10:00:00Z',
    updatedAt: '2026-06-01T09:15:00Z'
  },
  {
    id: 'user-cust-1',
    email: 'birgitta.s@example.se',
    phone: '+46739998877',
    name: 'Birgitta Söderberg',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    description: 'Pensionär boende i Sundbyberg. Behöver ibland hjälp med trädgården eller enklare IT-saker som mobilen eller datorn.',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    municipality: 'Sundbyberg',
    region: 'Stockholm',
    skills: [],
    createdAt: '2025-11-10T15:30:00Z',
    updatedAt: '2026-04-12T11:20:00Z'
  },
  {
    id: 'user-cust-2',
    email: 'johan.l@example.se',
    phone: '+46765554433',
    name: 'Johan Lindqvist',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    description: 'Småbarnspappa i Bromma. Fullt upp med familjelivet, söker hjälp med fönstertvätt och montering av IKEA-möbler.',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: true,
    municipality: 'Stockholm',
    region: 'Stockholm',
    skills: [],
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-06-05T18:45:00Z'
  },
  {
    id: 'user-business-1',
    email: 'info@lokalabyggare.se',
    phone: '+468123456',
    name: 'Lokala Bygg & Trädgård AB',
    avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
    description: 'Lokalt företag som hjälper till med större renoveringar. Vi annonserar här för att stötta ungdomar och synas lokalt.',
    role: 'BUSINESS',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: true,
    municipality: 'Sundbyberg',
    region: 'Stockholm',
    skills: [],
    createdAt: '2026-02-15T09:00:00Z',
    updatedAt: '2026-06-01T10:00:00Z'
  },
  {
    id: 'user-admin',
    email: 'admin@marknad.se',
    name: 'Sofia Carlsson',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    description: 'Systemadministratör för Marknadsplatsen.',
    role: 'ADMIN',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: true,
    skills: [],
    createdAt: '2025-08-01T00:00:00Z',
    updatedAt: '2026-06-08T00:00:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    customerId: 'user-cust-1',
    customerName: 'Birgitta Söderberg',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    assigneeId: 'user-youth-1',
    assigneeName: 'Hugo Bergström',
    assigneeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    title: 'Gräsklippning av liten villatomt',
    description: 'Behöver hjälp med att klippa min gräsmatta i Sundbyberg. Den är ganska liten, ungefär 150 kvm, och platt. Det vore toppen om du har egen gräsklippare då min gamla krånglar.',
    category: 'GARDEN',
    price: 400,
    platformFee: 40,
    status: 'COMPLETED',
    address: 'Prästgårdsgatan 15, Sundbyberg',
    location: { lat: 59.3633, lng: 17.9688 },
    radiusKm: 5,
    deadline: '2026-06-01T18:00:00Z',
    createdAt: '2026-05-28T10:00:00Z',
    updatedAt: '2026-06-01T19:30:00Z'
  },
  {
    id: 'task-2',
    customerId: 'user-cust-2',
    customerName: 'Johan Lindqvist',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    title: 'Montering av IKEA PAX Garderob',
    description: 'Behöver hjälp med att montera två PAX-garderober (bredd 100 cm, höjd 236 cm) med skjutdörrar. Alla delar och verktyg finns på plats. Kräver noggrannhet och att man är två personer eller väldigt händig. Jag kan hjälpa till att lyfta.',
    category: 'HOME',
    price: 800,
    platformFee: 80,
    status: 'OPEN',
    address: 'Tranebergsbacken 8, Bromma',
    location: { lat: 59.3328, lng: 17.9806 },
    radiusKm: 10,
    deadline: '2026-06-12T16:00:00Z',
    createdAt: '2026-06-07T14:20:00Z',
    updatedAt: '2026-06-07T14:20:00Z'
  },
  {
    id: 'task-3',
    customerId: 'user-cust-1',
    customerName: 'Birgitta Söderberg',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    title: 'Hjälp med att installera ny iPad',
    description: 'Fick en ny iPad av mina barn i födelsedagspresent. Skulle vilja ha hjälp att starta upp den, flytta över bilder från min gamla iPad samt installera BankID och Swish. Vill gärna ha en tålmodig person som kan visa hur det fungerar.',
    category: 'IT',
    price: 300,
    platformFee: 30,
    status: 'ASSIGNED',
    assigneeId: 'user-youth-2',
    assigneeName: 'Linnea Andersson',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    address: 'Prästgårdsgatan 15, Sundbyberg',
    location: { lat: 59.3633, lng: 17.9688 },
    radiusKm: 5,
    deadline: '2026-06-10T14:00:00Z',
    createdAt: '2026-06-05T11:00:00Z',
    updatedAt: '2026-06-06T12:00:00Z'
  },
  {
    id: 'task-4',
    customerId: 'user-cust-2',
    customerName: 'Johan Lindqvist',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    title: 'Hundpassning Golden Retriever (Milo) över helgen',
    description: 'Vi ska åka bort fredag-söndag och söker en trygg hundvakt till vår Milo, en 3-årig glad Golden Retriever. Han älskar långpromenader och att leka med bollar. Han är väldigt snäll och van vid barn, men drar lite i kopplet ibland. Hundmat och koppel medföljer.',
    category: 'ANIMAL',
    price: 1200,
    platformFee: 120,
    status: 'IN_PROGRESS',
    assigneeId: 'user-youth-1',
    assigneeName: 'Hugo Bergström',
    assigneeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    address: 'Tranebergsbacken 8, Bromma',
    location: { lat: 59.3328, lng: 17.9806 },
    radiusKm: 15,
    deadline: '2026-06-09T18:00:00Z',
    createdAt: '2026-06-02T09:00:00Z',
    updatedAt: '2026-06-05T16:00:00Z'
  },
  {
    id: 'task-5',
    customerId: 'user-cust-2',
    customerName: 'Johan Lindqvist',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    title: 'Matematikhjälp inför slutprov (Matte 1b)',
    description: 'Söker läxhjälp till min son Viktor som går första året på gymnasiet. Han behöver intensiv träning inför sitt slutprov i Matematik 1b, särskilt algebra och funktioner. Vi ser gärna att du studerar natur, teknik eller liknande.',
    category: 'STUDY',
    price: 500,
    platformFee: 50,
    status: 'OPEN',
    address: 'Tranebergsbacken 8, Bromma',
    location: { lat: 59.3328, lng: 17.9806 },
    radiusKm: 10,
    deadline: '2026-06-15T19:00:00Z',
    createdAt: '2026-06-08T10:00:00Z',
    updatedAt: '2026-06-08T10:00:00Z'
  }
];

export const mockTaskApplications: TaskApplication[] = [
  {
    id: 'app-1',
    taskId: 'task-2',
    userId: 'user-youth-1',
    userName: 'Hugo Bergström',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    userRating: 4.9,
    message: 'Tjena! Jag har monterat flera garderober tidigare och har med mig skruvdragare samt vattenpass för att säkerställa att de står rakt. Jag är stark och kan ta med mig en polare om det skulle underlätta (ingen extra kostnad).',
    proposedPrice: 800,
    status: 'PENDING',
    createdAt: '2026-06-07T16:45:00Z'
  },
  {
    id: 'app-2',
    taskId: 'task-2',
    userId: 'user-youth-2',
    userName: 'Linnea Andersson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    userRating: 4.8,
    message: 'Hej Johan! Jag hjälper gärna till med monteringen. Jag har erfarenhet av IKEAs monteringsanvisningar och är väldigt noggrann. Kan komma på kvällstid.',
    proposedPrice: 750,
    status: 'PENDING',
    createdAt: '2026-06-07T18:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    taskId: 'task-1',
    taskTitle: 'Gräsklippning av liten villatomt',
    reviewerId: 'user-cust-1',
    reviewerName: 'Birgitta Söderberg',
    reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    revieweeId: 'user-youth-1',
    rating: 5,
    comment: 'Hugo gjorde ett fantastiskt jobb med gräsmattan! Han var punktlig, artig och klippte även kanterna väldigt fint. Rekommenderar honom varmt!',
    flaggedAsFake: false,
    createdAt: '2026-06-01T20:00:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    taskId: 'task-1',
    taskTitle: 'Gräsklippning av liten villatomt',
    payerId: 'user-cust-1',
    payerName: 'Birgitta Söderberg',
    payeeId: 'user-youth-1',
    payeeName: 'Hugo Bergström',
    amount: 400,
    platformFee: 40,
    netAmount: 360,
    method: 'SWISH',
    status: 'COMPLETED',
    transactionId: 'swish-9923881273',
    createdAt: '2026-06-01T19:45:00Z'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    paymentId: 'pay-1',
    invoiceNumber: 'INV-2026-001',
    amount: 400,
    dueDate: '2026-06-15T23:59:59Z',
    status: 'PAID',
    remindersSent: 0,
    createdAt: '2026-06-01T19:45:00Z'
  }
];

export const mockChatRooms: ChatRoom[] = [
  {
    id: 'chat-room-1',
    taskId: 'task-3',
    taskTitle: 'Hjälp med att installera ny iPad',
    participants: [
      { id: 'user-cust-1', name: 'Birgitta Söderberg', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', role: 'CUSTOMER' },
      { id: 'user-youth-2', name: 'Linnea Andersson', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', role: 'YOUTH' }
    ],
    lastMessage: 'Det låter perfekt, då ses vi på onsdag kl 14.00!',
    lastMessageTime: '2026-06-06T12:00:00Z',
    unreadCount: 0
  },
  {
    id: 'chat-room-2',
    taskId: 'task-4',
    taskTitle: 'Hundpassning Golden Retriever (Milo)',
    participants: [
      { id: 'user-cust-2', name: 'Johan Lindqvist', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', role: 'CUSTOMER' },
      { id: 'user-youth-1', name: 'Hugo Bergström', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', role: 'YOUTH' }
    ],
    lastMessage: 'Ska jag ta med eget hundgodis eller har ni något speciellt?',
    lastMessageTime: '2026-06-08T15:30:00Z',
    unreadCount: 1
  }
];

export const mockChatMessages: Record<string, ChatMessage[]> = {
  'chat-room-1': [
    { id: 'msg-1', chatRoomId: 'chat-room-1', senderId: 'user-cust-1', content: 'Hej Linnea! Tack för att du tog dig an mitt uppdrag. Vilken tid passar bäst för dig på onsdag?', type: 'TEXT', isRead: true, createdAt: '2026-06-06T10:15:00Z' },
    { id: 'msg-2', chatRoomId: 'chat-room-1', senderId: 'user-youth-2', content: 'Hej Birgitta! Kul att få hjälpa till. Jag slutar skolan kl 13, så jag kan vara hos dig runt kl 14. Passar det?', type: 'TEXT', isRead: true, createdAt: '2026-06-06T10:45:00Z' },
    { id: 'msg-3', chatRoomId: 'chat-room-1', senderId: 'user-cust-1', content: 'Det låter perfekt, då ses vi på onsdag kl 14.00!', type: 'TEXT', isRead: true, createdAt: '2026-06-06T12:00:00Z' }
  ],
  'chat-room-2': [
    { id: 'msg-4', chatRoomId: 'chat-room-2', senderId: 'user-cust-2', content: 'Hej Hugo! Skönt att du kan passa Milo i helgen. Vi åker på fredag eftermiddag, går det bra att du kommer hit runt 16.00?', type: 'TEXT', isRead: true, createdAt: '2026-06-08T14:00:00Z' },
    { id: 'msg-5', chatRoomId: 'chat-room-2', senderId: 'user-youth-1', content: 'Hej Johan! Ja, klockan 16.00 passar perfekt på fredag. Då hinner vi gå igenom hans rutiner och matvanor i lugn och ro.', type: 'TEXT', isRead: true, createdAt: '2026-06-08T14:30:00Z' },
    { id: 'msg-6', chatRoomId: 'chat-room-2', senderId: 'user-cust-2', content: 'Super! Jag har köpt hem allt han behöver. Vi går igenom allt när du kommer.', type: 'TEXT', isRead: true, createdAt: '2026-06-08T15:00:00Z' },
    { id: 'msg-7', chatRoomId: 'chat-room-2', senderId: 'user-youth-1', content: 'Ska jag ta med eget hundgodis eller har ni något speciellt?', type: 'TEXT', isRead: false, createdAt: '2026-06-08T15:30:00Z' }
  ]
};

export const mockCompanyProspects: CompanyProspect[] = [
  {
    id: 'pr-1',
    companyName: 'ICA Supermarket Sundbyberg',
    contactPerson: 'Mikael Nilsson',
    email: 'mikael.nilsson@ica.se',
    phone: '08-5551221',
    status: 'ACTIVE',
    notes: 'Kör kampanj om sommarjobb för ungdomar i närområdet. Mycket nöjd med utfallet.',
    lastContacted: '2026-06-01T10:00:00Z',
    createdAt: '2026-05-10T09:00:00Z'
  },
  {
    id: 'pr-2',
    companyName: 'Länsförsäkringar Fastighetsförmedling',
    contactPerson: 'Sarah Sjöberg',
    email: 'sarah.sjoberg@lansfast.se',
    status: 'NEGOTIATING',
    notes: 'Förhandlar om bannerannons för hela Stockholmsregionen. De vill ha 20% rabatt för 6 månaders kontrakt.',
    lastContacted: '2026-06-07T14:00:00Z',
    createdAt: '2026-05-15T10:30:00Z'
  },
  {
    id: 'pr-3',
    companyName: 'Solna Trädgårdsservice',
    contactPerson: 'Anders Ek',
    email: 'anders@solnatradgard.se',
    phone: '070-8889900',
    status: 'INTERESTED',
    notes: 'Intresserade av att sponsra trädgårdsuppdrag på plattformen för att hitta framtida medarbetare.',
    lastContacted: '2026-06-05T11:00:00Z',
    createdAt: '2026-05-20T11:00:00Z'
  },
  {
    id: 'pr-4',
    companyName: 'Clas Ohlson Sundbyberg',
    contactPerson: 'Karin Larsson',
    email: 'karin.larsson@clasohlson.se',
    status: 'CONTACTED',
    notes: 'Skickat information om vårt annonssystem. Inte svarat än, ska följas upp nästa vecka.',
    lastContacted: '2026-06-03T16:00:00Z',
    createdAt: '2026-06-01T14:00:00Z'
  },
  {
    id: 'pr-5',
    companyName: 'Hornbach Sundbyberg',
    contactPerson: 'Peter Berg',
    email: 'p.berg@hornbach.se',
    status: 'NOT_CONTACTED',
    notes: 'Potentiell annonsör. Säljer trädgårdsredskap och färg, perfekt målgrupp för fixare.',
    createdAt: '2026-06-08T09:00:00Z'
  }
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: 'ad-1',
    businessId: 'user-business-1',
    businessName: 'ICA Supermarket Sundbyberg',
    title: 'Handla lokalt – Stötta din stadsdel!',
    content: 'Hos oss hittar du alltid fräscha råvaror och nybakat bröd. Visa upp din Marknadsplats-profil i kassan och få 10% rabatt på valfri sallad från vår salladsbar!',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    type: 'BANNER',
    targetMunicipality: 'Sundbyberg',
    price: 1500,
    startDate: '2026-06-01T00:00:00Z',
    endDate: '2026-06-30T23:59:59Z',
    status: 'ACTIVE',
    createdAt: '2026-05-25T10:00:00Z'
  },
  {
    id: 'ad-2',
    businessId: 'user-business-1',
    businessName: 'Lokala Bygg & Trädgård AB',
    title: 'Behöver du större renoveringar?',
    content: 'Vi utför takbyten, altanbyggen och dränering. Kontakta oss för en kostnadsfri offert. Använd koden MARKNAD26 för 5% rabatt på arbetskostnaden efter ROT!',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    type: 'CAMPAIGN',
    targetRegion: 'Stockholm',
    price: 3000,
    startDate: '2026-06-05T00:00:00Z',
    endDate: '2026-07-05T23:59:59Z',
    status: 'ACTIVE',
    createdAt: '2026-06-01T12:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'not-1',
    userId: 'user-youth-1',
    title: 'Nytt meddelande',
    message: 'Johan Lindqvist skickade ett meddelande i chatten om Hundpassning Milo.',
    type: 'MESSAGE',
    isRead: false,
    actionUrl: '/chat',
    createdAt: '2026-06-08T15:30:00Z'
  },
  {
    id: 'not-2',
    userId: 'user-youth-1',
    title: 'Nytt uppdrag nära dig!',
    message: 'Ett nytt trädgårdsuppdrag har lagts upp i Sundbyberg: "Klippa häckar".',
    type: 'NEW_TASK',
    isRead: true,
    actionUrl: '/tasks/task-2',
    createdAt: '2026-06-07T14:20:00Z'
  },
  {
    id: 'not-3',
    userId: 'user-cust-1',
    title: 'Betalning mottagen',
    message: 'Din Swish-betalning för uppdraget "Gräsklippning" är genomförd.',
    type: 'PAYMENT',
    isRead: true,
    actionUrl: '/dashboard',
    createdAt: '2026-06-01T19:45:00Z'
  }
];
