import React, { useState } from 'react';
import { Search, Filter, Edit, ChevronLeft, Phone, MoreVertical, Paperclip, Smile, Send, Check, CheckCheck, Heart } from 'lucide-react';

const mockChats = [
  {
    id: 1,
    name: 'FashionAI Assistant',
    type: 'ai',
    subtitle: 'Your personal AI Stylist',
    lastMessage: "Hey Awais! Based on your style preferences, I've found some new outfits...",
    time: '10:30 AM',
    unread: 2,
    messages: [
      { id: 1, sender: 'ai', text: "Hey Awais! 👋\n\nBased on your style preferences, I've found some new outfits that might suit you. Would you like to see them?", time: '10:30 AM' },
      { id: 2, sender: 'user', text: "Yes, show me some recommendations.", time: '10:32 AM', status: 'read' },
      { id: 3, sender: 'ai', text: "Great! Here are some handpicked looks for you.", time: '10:33 AM', images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop'
      ] },
      { id: 4, sender: 'user', text: "These are awesome! 🔥", time: '10:34 AM', status: 'read' },
      { id: 5, sender: 'ai', text: "I'm glad you like them! 😊\n\nWould you like help finding something specific or matching accessories?", time: '10:36 AM' }
    ]
  },
  {
    id: 2,
    name: 'Sara Khan',
    type: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    subtitle: 'Collaboration Request',
    lastMessage: "Hi Awais, I love your design \"Urban Vibes\". Let's collaborate on a new collection!",
    time: 'Yesterday',
    unread: 1,
    messages: []
  },
  {
    id: 3,
    name: 'Shop Support',
    type: 'system',
    icon: 'bag',
    subtitle: 'Your order has been shipped',
    lastMessage: "Good news! Your order #FA1234 has been shipped and is on its way.",
    time: 'May 18',
    unread: 0,
    messages: []
  },
  {
    id: 4,
    name: 'FashionAI Updates',
    type: 'system',
    icon: 'megaphone',
    subtitle: 'New features are here!',
    lastMessage: "Check out our latest AI tools and create even better designs.",
    time: 'May 15',
    unread: 0,
    messages: []
  },
  {
    id: 5,
    name: 'Team FashionAI',
    type: 'system',
    icon: 'users',
    subtitle: 'Welcome to FashionAI',
    lastMessage: "Thanks for joining us. Let's create something amazing together!",
    time: 'May 10',
    unread: 0,
    messages: []
  }
];

export default function InboxSection({ activeSection }) {
  const [activeChat, setActiveChat] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [inputText, setInputText] = useState('');

  if (activeSection !== 'inbox') return null;

  const currentChat = activeChat ? mockChats.find(c => c.id === activeChat) : null;

  return (
    <section className="section inbox-section active">
      <div className="inbox-container">
        {!activeChat ? (
          <div className="inbox-list-view">
            <div className="inbox-header">
              <div className="inbox-header-title">
                <h2>Inbox</h2>
                <p>Your messages and conversations.</p>
              </div>
              <button className="btn-primary new-message-btn">
                <Edit size={16} />
                New Message
              </button>
            </div>

            <div className="inbox-tabs">
              <div className={`inbox-tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All</div>
              <div className={`inbox-tab ${activeTab === 'Unread' ? 'active' : ''}`} onClick={() => setActiveTab('Unread')}>
                Unread <span className="tab-badge">6</span>
              </div>
              <div className={`inbox-tab ${activeTab === 'Important' ? 'active' : ''}`} onClick={() => setActiveTab('Important')}>Important</div>
              <div className="inbox-tab-spacer"></div>
              <button className="inbox-filter-btn">
                <Filter size={18} />
              </button>
            </div>

            <div className="inbox-chat-list">
              {mockChats.map(chat => (
                <div key={chat.id} className="inbox-chat-item" onClick={() => setActiveChat(chat.id)}>
                  <div className="chat-avatar-wrap">
                    {chat.type === 'ai' && <div className="chat-avatar ai-avatar">AI</div>}
                    {chat.type === 'user' && <img src={chat.avatar} alt={chat.name} className="chat-avatar img-avatar" />}
                    {chat.type === 'system' && (
                      <div className="chat-avatar sys-avatar">
                        {chat.icon === 'bag' && <span className="sys-icon">🛍️</span>}
                        {chat.icon === 'megaphone' && <span className="sys-icon">📢</span>}
                        {chat.icon === 'users' && <span className="sys-icon">👥</span>}
                      </div>
                    )}
                  </div>
                  <div className="chat-item-content">
                    <div className="chat-item-header">
                      <h4>
                        {chat.name}
                        {chat.type === 'ai' && <span className="verified-badge">✓</span>}
                      </h4>
                      <span className="chat-time">{chat.time}</span>
                    </div>
                    <div className="chat-item-subtitle">{chat.subtitle}</div>
                    <div className="chat-item-message">{chat.lastMessage}</div>
                  </div>
                  {chat.unread > 0 && (
                    <div className="chat-unread-badge">{chat.unread}</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="inbox-footer">
              <p>Showing {mockChats.length} of {mockChats.length} conversations</p>
            </div>
          </div>
        ) : (
          <div className="inbox-chat-view">
            <div className="chat-view-header">
              <button className="chat-back-btn" onClick={() => setActiveChat(null)}>
                <ChevronLeft size={20} /> Back
              </button>
              
              <div className="chat-view-profile">
                <div className="chat-avatar ai-avatar small">AI</div>
                <div className="chat-profile-info">
                  <h4>{currentChat.name} {currentChat.type === 'ai' && <span className="verified-badge">✓</span>}</h4>
                  <p>{currentChat.subtitle}</p>
                </div>
              </div>
              
              <div className="chat-view-actions">
                <button className="chat-icon-btn"><Phone size={18} /></button>
                <button className="chat-icon-btn"><MoreVertical size={18} /></button>
              </div>
            </div>
            
            <div className="chat-messages-area">
              <div className="chat-date-divider"><span>Today</span></div>
              
              {currentChat.messages.map(msg => (
                <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'user-message-row' : 'other-message-row'}`}>
                  {msg.sender !== 'user' && (
                    <div className="chat-avatar ai-avatar msg-avatar">AI</div>
                  )}
                  
                  <div className="message-content-wrapper">
                    {msg.text && (
                      <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'other-bubble'}`}>
                        {msg.text}
                      </div>
                    )}
                    
                    {msg.images && msg.images.length > 0 && (
                      <div className="message-images-grid">
                        {msg.images.map((img, idx) => (
                          <div key={idx} className="message-image-card">
                            <img src={img} alt="Recommendation" />
                            <button className="like-img-btn"><Heart size={16} /></button>
                          </div>
                        ))}
                        <button className="view-all-recs-btn">View All Recommendations →</button>
                      </div>
                    )}
                    
                    <div className="message-meta">
                      <span className="message-time">{msg.time}</span>
                      {msg.sender === 'user' && (
                        <span className="message-status">
                          <CheckCheck size={14} color="#7f58ff" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="chat-input-area">
              <button className="chat-input-icon-btn"><Paperclip size={20} /></button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button className="chat-input-icon-btn"><Smile size={20} /></button>
              <button className="chat-send-msg-btn">
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
