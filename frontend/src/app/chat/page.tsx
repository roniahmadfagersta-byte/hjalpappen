'use client';

import React, { useState, useEffect, useRef } from 'react';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import { mockChatRooms, mockChatMessages, mockUsers } from '../../lib/mock-data';
import { ChatRoom, ChatMessage, UserRole } from '../../lib/types';
import { formatDateTime } from '../../lib/utils';

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('CUSTOMER');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get current role
    const savedRole = localStorage.getItem('demo-user-role') as UserRole;
    if (savedRole) {
      setUserRole(savedRole);
    }

    setRooms(mockChatRooms);
    if (mockChatRooms.length > 0) {
      setActiveRoomId(mockChatRooms[0].id);
      setMessages(mockChatMessages[mockChatRooms[0].id] || []);
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeUser = mockUsers.find(u => u.role === userRole) || mockUsers[2];

  const handleRoomSelect = (roomId: string) => {
    setActiveRoomId(roomId);
    setMessages(mockChatMessages[roomId] || []);
    
    // Clear unread count locally for demo
    setRooms(
      rooms.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeRoomId) return;

    const newMsg: ChatMessage = {
      id: `msg-new-${Date.now()}`,
      chatRoomId: activeRoomId,
      senderId: activeUser.id,
      content: inputText,
      type: 'TEXT',
      isRead: true,
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputText('');

    // Update rooms last message preview
    setRooms(
      rooms.map((r) =>
        r.id === activeRoomId
          ? {
              ...r,
              lastMessage: inputText,
              lastMessageTime: new Date().toISOString()
            }
          : r
      )
    );

    // Simulate automatic AI / user response after 2 seconds
    setTimeout(() => {
      const activeRoom = rooms.find((r) => r.id === activeRoomId);
      const partner = activeRoom?.participants.find((p) => p.id !== activeUser.id);
      
      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        chatRoomId: activeRoomId,
        senderId: partner?.id || 'bot',
        content: `Tack för ditt meddelande! Detta är ett automatiskt svar i demoversionen. Vi hörs snart! 😊`,
        type: 'TEXT',
        isRead: false,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 2000);
  };

  const activeRoom = rooms.find((r) => r.id === activeRoomId);
  const partner = activeRoom?.participants.find((p) => p.id !== activeUser.id);

  return (
    <div className="chat-page-wrapper">
      <div className="container chat-container-layout">
        <Card className="chat-layout-card glass-heavy">
          {/* Left Panel: Contact Rooms List */}
          <aside className="chat-rooms-list">
            <div className="rooms-list-header">
              <h3>Meddelanden</h3>
            </div>
            <div className="rooms-scrollable-area">
              {rooms.map((room) => {
                const roomPartner = room.participants.find((p) => p.id !== activeUser.id);
                const isSelected = room.id === activeRoomId;

                return (
                  <button
                    key={room.id}
                    className={`room-item-row ${isSelected ? 'active' : ''}`}
                    onClick={() => handleRoomSelect(room.id)}
                  >
                    <Avatar
                      src={roomPartner?.avatarUrl}
                      name={roomPartner?.name || 'Partner'}
                      size="md"
                      verified={roomPartner?.role === 'YOUTH'}
                    />
                    <div className="room-item-content">
                      <div className="ric-header">
                        <h4>{roomPartner?.name}</h4>
                        {room.lastMessageTime && (
                          <span className="ric-time">
                            {new Date(room.lastMessageTime).toLocaleTimeString('sv-SE', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                      <div className="ric-footer">
                        <p className="ric-preview">{room.lastMessage || 'Skicka ett meddelande...'}</p>
                        {room.unreadCount > 0 && (
                          <span className="unread-badge">{room.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Panel: Messages window */}
          <main className="chat-window-area">
            {activeRoom && partner ? (
              <>
                {/* Chat window Header */}
                <div className="chat-window-header">
                  <div className="cwh-user">
                    <Avatar
                      src={partner.avatarUrl}
                      name={partner.name}
                      size="md"
                      verified={partner.role === 'YOUTH'}
                    />
                    <div>
                      <h4>{partner.name}</h4>
                      <p className="cwh-task">Uppdrag: {activeRoom.taskTitle}</p>
                    </div>
                  </div>
                  <div className="cwh-actions">
                    <Link href={`/tasks/${activeRoom.taskId}`}>
                      <Button variant="glass" size="sm">⚙️ Visa Uppdrag</Button>
                    </Link>
                  </div>
                </div>

                {/* Messages scroll area */}
                <div className="chat-messages-scroll">
                  {messages.map((msg) => {
                    const isMe = msg.senderId === activeUser.id;
                    return (
                      <div key={msg.id} className={`message-bubble-row ${isMe ? 'msg-me' : 'msg-them'}`}>
                        {!isMe && (
                          <Avatar
                            src={partner.avatarUrl}
                            name={partner.name}
                            size="sm"
                          />
                        )}
                        <div className="message-bubble">
                          <p className="msg-text">{msg.content}</p>
                          <span className="msg-time">{formatDateTime(msg.createdAt)}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input submission footer */}
                <form className="chat-input-bar" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Skriv ett meddelande..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="chat-text-input"
                  />
                  <Button type="submit" variant="primary" size="md">
                    Skicka
                  </Button>
                </form>
              </>
            ) : (
              <div className="chat-empty-state">
                <span className="empty-chat-emoji">💬</span>
                <h3>Välj en chatttråd</h3>
                <p>Klicka på en konversation i listan till vänster för att börja chatta.</p>
              </div>
            )}
          </main>
        </Card>
      </div>
    </div>
  );
}
