/* -------------------------------------------------------------
   TWINAI APPLICATION JAVASCRIPT CONTROLLER
   Manages routing, mock states, customizer sync, and simulated AI
   ------------------------------------------------------------- */

// Global Application State Mock Database
const state = {
  activeView: 'landing',
  activeDashboardTab: 'dashboard-home',
  currentUser: {
    name: 'John Doe',
    email: 'john@acme.com',
    businessName: 'Acme Corp'
  },
  documents: [
    { id: 1, name: 'refund-policy.pdf', type: 'PDF Document', date: '2026-06-26', size: '1.2 MB', status: 'success' },
    { id: 2, name: 'product-catalog.xlsx', type: 'Excel Spreadsheet', date: '2026-06-25', size: '4.8 MB', status: 'success' },
    { id: 3, name: 'faq-list.docx', type: 'Word Document', date: '2026-06-26', size: '512 KB', status: 'success' },
    { id: 4, name: 'company-wiki.txt', type: 'Text File', date: '2026-06-27', size: '240 KB', status: 'success' }
  ],
  conversations: [
    {
      id: 1,
      name: 'Charles Smith',
      snippet: 'I need a laptop under ₹60,000 for development...',
      time: '2:14 PM',
      score: 92,
      sentiment: 'Happy',
      summary: 'Customer requested quote for custom packaging and scheduled calendar event.',
      products: 'TwinBook Pro (₹54,999)',
      confidence: '97.4%',
      appointment: 'Booked (Jul 12, 10 AM)',
      messages: [
        { sender: 'user', text: 'Hello, I am looking for a work laptop under ₹60,000. Do you have anything?' },
        { sender: 'ai', text: 'Hi Charles! I recommend the TwinBook Pro (₹54,999). It features an Intel Core i5 processor, 16GB RAM, and 512GB SSD, making it perfect for development. Would you like me to book a consultation slot to discuss pricing details?' },
        { sender: 'user', text: 'That sounds perfect. Can we schedule a call for July 12 at 10 AM?' },
        { sender: 'ai', text: 'Excellent! I have confirmed your slot for July 12, 2026 at 10:00 AM. I will email a Zoom link shortly.' }
      ]
    },
    {
      id: 2,
      name: 'Priya Patel',
      snippet: 'How does your voice API billing work for call centers?',
      time: '11:42 AM',
      score: 78,
      sentiment: 'Neutral',
      summary: 'Client asked about voice call setup for education model and api credentials.',
      products: 'Consultation Tier (₹12,000)',
      confidence: '92.1%',
      appointment: 'Pending Slot Approval',
      messages: [
        { sender: 'user', text: 'Hi, I need info on your voice call API parameters.' },
        { sender: 'ai', text: 'Hello Priya! Our voice twin system connects via Twilio Webhooks or browser WebRTC. Standard pricing is $0.05 per voice minute, including synthesis.' },
        { sender: 'user', text: 'Great, I will review the API credentials tab in settings.' }
      ]
    },
    {
      id: 3,
      name: 'David Miller',
      snippet: 'Is there a free trial for the Starter subscription?',
      time: 'Yesterday',
      score: 45,
      sentiment: 'Neutral',
      summary: 'User asking about pricing, has small budget.',
      products: 'Starter Plan ($29/mo)',
      confidence: '88.5%',
      appointment: 'None',
      messages: [
        { sender: 'user', text: 'Hello, is there a free trial for the Starter tier?' },
        { sender: 'ai', text: 'Hi David! Yes, we offer a 14-day free trial on our Starter and Professional plans. No credit card is required to sign up.' }
      ]
    },
    {
      id: 4,
      name: 'Alan Wake',
      snippet: 'My CRM webhooks keep failing with status 500 error...',
      time: 'Jun 25',
      score: 12,
      sentiment: 'Angry',
      summary: 'Customer had trouble with CRM sync configurations, requested human agent.',
      products: 'Professional Integration Module',
      confidence: '65.4%',
      appointment: 'None (Escalated to Human)',
      messages: [
        { sender: 'user', text: 'Your CRM webhooks keep giving me 500 errors. This is urgent.' },
        { sender: 'ai', text: 'I apologize for the inconvenience, Alan. A 500 status typically indicates a payload parsing failure on your endpoints. Let me connect you directly to our human developer support team immediately.' }
      ]
    }
  ],
  leads: [
    { name: 'Charles Smith', email: 'charles@gmail.com', phone: '+91 98765 43210', budget: '₹60,000', interest: 'Laptops', priority: 'High', status: 'Follow-up', agent: 'TwinAI' },
    { name: 'Priya Patel', email: 'priya@edu-tech.in', phone: '+91 88888 77777', budget: '₹1,50,000', interest: 'Voice API', priority: 'High', status: 'Negotiation', agent: 'Sarah J.' },
    { name: 'David Miller', email: 'david.m@gmail.com', phone: '+1 415 555 2671', budget: '₹2,500', interest: 'Starter Sub', priority: 'Low', status: 'Closed', agent: 'TwinAI' },
    { name: 'Alan Wake', email: 'alan@brightfalls.com', phone: '+1 206 555 8891', budget: '₹85,000', interest: 'CRM Webhooks', priority: 'Medium', status: 'Follow-up', agent: 'Support Team' },
    { name: 'Alice Vance', email: 'alice.v@vance.com', phone: '+44 7911 123456', budget: '₹5,00,000', interest: 'Enterprise SLA', priority: 'High', status: 'Negotiation', agent: 'John Doe' },
    { name: 'Bob Ross', email: 'bob@happytrees.com', phone: '+1 907 555 1212', budget: '₹12,000', interest: 'AI Twin Customizer', priority: 'Low', status: 'Closed', agent: 'TwinAI' }
  ],
  meetings: {
    '2026-07-12': [
      { id: 1, name: 'Charles Smith', time: '10:00 AM - 10:30 AM', topic: 'Laptop Custom Quotation', method: 'Zoom Meeting' },
      { id: 2, name: 'Priya Patel', time: '02:30 PM - 03:00 PM', topic: 'Voice API Integration support', method: 'Google Meet' }
    ],
    '2026-07-15': [
      { id: 3, name: 'Alice Vance', time: '09:00 AM - 10:00 AM', topic: 'Enterprise SLA onboarding', method: 'Microsoft Teams' }
    ],
    '2026-07-20': [
      { id: 4, name: 'Bob Ross', time: '04:00 PM - 04:30 PM', topic: 'Art class chatbot guidelines', method: 'Phone Call' }
    ]
  },
  activeConversationIndex: 0,
  selectedCalendarDate: '2026-07-12',
  widgetCustomizer: {
    name: 'TwinAI Agent',
    welcomeMsg: "Welcome! I am trained on TwinAI's policies. Ask me anything, or try selecting a query on the left.",
    primaryColor: '#3b82f6',
    position: 'bottom-right',
    theme: 'dark',
    radius: '24px',
    avatar: '🤖',
    enableVoice: true
  }
};

// Global Charts objects registry
let charts = {};

// -------------------------------------------------------------
// INITIALIZATION ON DOM CONTENT LOAD
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  refreshIcons();
  setupFaqClickHandlers();
  
  // Render lists and components
  renderKnowledgeTable();
  renderConversationsInbox();
  renderLeadsTable();
  setupCalendar();
  renderMeetingsTimeline();
  
  // Pre-load active details in inbox
  loadConversationDetails(0);

  // Initialize Landing chatbot
  updateDemoChatWindowScroll();

  // Initialize Premium Animations
  initPremiumAnimations();
});

// Refresh Lucide dynamic SVG tags
function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -------------------------------------------------------------
// VIEW NAVIGATION (ROUTER)
// -------------------------------------------------------------
function showView(viewName, subParam = '') {
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });

  const activeSec = document.getElementById(`${viewName}-view`);
  if (activeSec) {
    activeSec.classList.add('active');
  }

  state.activeView = viewName;

  if (viewName === 'auth') {
    toggleAuthForm(subParam || 'login');
  } else if (viewName === 'dashboard') {
    // Redraw charts since canvas size computes on visibility
    setTimeout(initializeDashboardCharts, 100);
    // Welcome displays
    document.getElementById('welcome-username').innerText = state.currentUser.name;
    document.getElementById('user-name-display').innerText = state.currentUser.name;
    document.getElementById('user-email-display').innerText = state.currentUser.email;
  }
  
  window.scrollTo(0, 0);
  refreshIcons();
}

function toggleAuthForm(formType) {
  document.getElementById('auth-card-login').style.display = 'none';
  document.getElementById('auth-card-register').style.display = 'none';
  document.getElementById('auth-card-forgot').style.display = 'none';
  document.getElementById('auth-card-verify').style.display = 'none';

  document.getElementById(`auth-card-${formType}`).style.display = 'flex';
  refreshIcons();
}

// -------------------------------------------------------------
// AUTHENTICATION LOGIC MOCKS
// -------------------------------------------------------------
function simulateLogin(event) {
  event.preventDefault();
  showView('dashboard');
}

function handleRegister(event) {
  event.preventDefault();
  const bizName = document.getElementById('reg-biz-name').value || 'Acme Corp';
  const bizEmail = document.getElementById('reg-biz-email').value || 'ceo@acme.com';
  
  state.currentUser.businessName = bizName;
  state.currentUser.email = bizEmail;
  state.currentUser.name = bizName.split(' ')[0] + ' Manager';

  // Toggle to verification codes panel
  document.getElementById('verify-sub-text').innerText = `We sent a 6-digit passcode code to ${bizEmail}.`;
  toggleAuthForm('verify');
}

function handleForgot(event) {
  event.preventDefault();
  alert('Recovery link has been dispatched to your email address!');
  toggleAuthForm('login');
}

function handleVerify(event) {
  event.preventDefault();
  showView('dashboard');
}

function logout() {
  showView('landing');
}

// -------------------------------------------------------------
// DASHBOARD TABS SYSTEM
// -------------------------------------------------------------
function switchDashboardTab(event, tabId) {
  if (event) {
    event.preventDefault();
  }

  document.querySelectorAll('.dashboard-panel-view').forEach(panel => {
    panel.classList.remove('active');
  });

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Sidebar list item highlighting
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Find link associated with this tabId
  const sideLinks = Array.from(document.querySelectorAll('.sidebar-nav-item'));
  const matchingLink = sideLinks.find(link => link.getAttribute('onclick').includes(tabId));
  if (matchingLink) {
    matchingLink.classList.add('active');
  }

  state.activeDashboardTab = tabId;

  // Re-run charts setups if clicking analytics or home
  if (tabId === 'dashboard-home' || tabId === 'analytics') {
    setTimeout(initializeDashboardCharts, 100);
  }

  // Close mobile sidebar menu if open
  document.getElementById('app-sidebar').classList.remove('mobile-open');

  refreshIcons();
}

function toggleMobileSidebar() {
  document.getElementById('app-sidebar').classList.toggle('mobile-open');
}

// -------------------------------------------------------------
// FAQ ACCORDION TRANSITIONS
// -------------------------------------------------------------
function setupFaqClickHandlers() {
  // Configured inline in HTML using onclick="toggleFaq(this)"
}

function toggleFaq(element) {
  const isActive = element.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    item.querySelector('.faq-answer').style.maxHeight = null;
  });

  if (!isActive) {
    element.classList.add('active');
    const answer = element.querySelector('.faq-answer');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Toggle Billing period pricing plans
function toggleBillingPeriod(period) {
  document.getElementById('btn-billing-monthly').classList.remove('active');
  document.getElementById('btn-billing-annual').classList.remove('active');

  const plans = {
    monthly: ['$29', '$99', '$399'],
    annual: ['$23', '$79', '$319']
  };

  const selectedBtn = document.getElementById(`btn-billing-${period}`);
  if (selectedBtn) {
    selectedBtn.classList.add('active');
  }

  const cards = document.querySelectorAll('.pricing-card');
  plans[period].forEach((price, idx) => {
    if (cards[idx]) {
      cards[idx].querySelector('.price-val').innerText = price;
      cards[idx].querySelector('.price-period').innerText = period === 'annual' ? '/mo (billed annually)' : '/mo';
    }
  });
}

// -------------------------------------------------------------
// KNOWLEDGE BASE MANAGER LOGIC
// -------------------------------------------------------------
function renderKnowledgeTable() {
  const tbody = document.getElementById('knowledge-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  state.documents.forEach(doc => {
    const tr = document.createElement('tr');
    tr.id = `doc-row-${doc.id}`;
    tr.innerHTML = `
      <td style="font-weight:600;"><i data-lucide="database" style="width:16px; vertical-align:middle; margin-right:8px; color:var(--primary);"></i> ${doc.name}</td>
      <td>${doc.type}</td>
      <td>${doc.date}</td>
      <td>
        <span class="status-pill ${doc.status}">
          <span class="status-indicator-dot"></span>
          ${doc.status === 'success' ? 'Trained' : doc.status === 'warning' ? 'Indexing' : 'Failed'}
        </span>
      </td>
      <td>${doc.size}</td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary" style="padding: 4px 8px; font-size:12px;" onclick="retrainDocument(${doc.id})"><i data-lucide="bot"></i> Retrain</button>
          <button class="btn btn-secondary" style="padding: 4px 8px; font-size:12px; color:var(--danger); border-color:rgba(239,68,68,0.2);" onclick="deleteDocument(${doc.id})"><i data-lucide="shield"></i> Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  document.getElementById('doc-count-display').innerText = `${state.documents.length} Assets Indexed`;
  refreshIcons();
}

function toggleUploadType(type) {
  document.getElementById('btn-upload-file-tab').classList.remove('active');
  document.getElementById('btn-upload-url-tab').classList.remove('active');
  document.getElementById('upload-form-file').style.display = 'none';
  document.getElementById('upload-form-url').style.display = 'none';

  document.getElementById(`btn-upload-${type}-tab`).classList.add('active');
  document.getElementById(`upload-form-${type}`).style.display = 'block';
}

function triggerFileSelector() {
  document.getElementById('real-file-input').click();
}

function handleFileSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  simulateKnowledgeUpload(file.name, 'Document File', `${(file.size / (1024 * 1024)).toFixed(2)} MB`);
}

function startUrlCrawl() {
  const urlVal = document.getElementById('crawl-url-input').value;
  if (!urlVal) {
    alert('Please enter a valid website URL.');
    return;
  }

  simulateKnowledgeUpload(urlVal, 'Crawl URL', 'N/A');
  document.getElementById('crawl-url-input').value = '';
}

function simulateKnowledgeUpload(name, type, size) {
  // Set progress bar mock
  const pctLabel = document.getElementById('training-progress-pct');
  const bar = document.getElementById('training-progress-bar');
  
  let progress = 0;
  pctLabel.innerText = '0%';
  bar.style.width = '0%';
  
  const tempDocId = state.documents.length + 1;
  const newDoc = {
    id: tempDocId,
    name: name,
    type: type,
    date: new Date().toISOString().split('T')[0],
    size: size,
    status: 'warning'
  };

  state.documents.push(newDoc);
  renderKnowledgeTable();

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      
      // Update state item as trained
      const doc = state.documents.find(d => d.id === tempDocId);
      if (doc) doc.status = 'success';
      
      renderKnowledgeTable();
      alert(`Knowledge index processed successfully: ${name}`);
    }
    
    pctLabel.innerText = `${progress}%`;
    bar.style.width = `${progress}%`;
  }, 300);
}

function retrainDocument(id) {
  const doc = state.documents.find(d => d.id === id);
  if (!doc) return;

  doc.status = 'warning';
  renderKnowledgeTable();
  
  setTimeout(() => {
    doc.status = 'success';
    renderKnowledgeTable();
    alert(`Index refreshed for: ${doc.name}`);
  }, 1500);
}

function deleteDocument(id) {
  if (confirm('Are you sure you want to remove this data source from vector index?')) {
    state.documents = state.documents.filter(d => d.id !== id);
    renderKnowledgeTable();
  }
}

function triggerManualRetrain() {
  const pctLabel = document.getElementById('training-progress-pct');
  const bar = document.getElementById('training-progress-bar');
  
  let progress = 0;
  pctLabel.innerText = '0%';
  bar.style.width = '0%';

  const timer = setInterval(() => {
    progress += 25;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      alert('Entire Vector base retrained successfully!');
    }
    pctLabel.innerText = `${progress}%`;
    bar.style.width = `${progress}%`;
  }, 250);
}

// -------------------------------------------------------------
// AI TWIN IDENTITY CONFIGURATION
// -------------------------------------------------------------
function changeMockAvatar() {
  const avatars = ['🤖', '🧑‍💼', '👩‍💻', '🦊', '🌐', '💬', '👩‍💼', '👨‍💻'];
  const current = document.getElementById('config-avatar-preview').innerText;
  let idx = avatars.indexOf(current);
  idx = (idx + 1) % avatars.length;

  const nextAv = avatars[idx];
  document.getElementById('config-avatar-preview').innerText = nextAv;
  
  // Sync
  state.widgetCustomizer.avatar = nextAv;
  document.getElementById('widget-avatar-indicator').innerText = nextAv;
  refreshIcons();
}

function selectVoiceProvider(element, provider) {
  const parent = element.parentNode;
  parent.querySelectorAll('.selection-card').forEach(c => c.classList.remove('active'));
  element.classList.add('active');
  alert(`Voice synthesis provider set to: ${provider.toUpperCase()}`);
}

function triggerVoicePreview() {
  const accent = document.getElementById('config-voice-accent').value;
  const name = document.getElementById('config-twin-name').value;
  alert(`Voice synthesis mockup active: "Hi! I am ${name}, speaking with a customized ${accent} tone."`);
}

// -------------------------------------------------------------
// WIDGET CUSTOMIZER & PREVIEW SYNC
// -------------------------------------------------------------
function syncCustomizerPreview() {
  const name = document.getElementById('config-twin-name').value || 'TwinAI Agent';
  const msg = document.getElementById('config-welcome-msg').value || 'Hello!';

  state.widgetCustomizer.name = name;
  state.widgetCustomizer.welcomeMsg = msg;

  document.getElementById('widget-display-name').innerText = name;
  document.getElementById('widget-welcome-bubble').innerText = msg;
}

function syncWidgetColors(colorHex) {
  document.getElementById('customizer-color-hex').innerText = colorHex;
  state.widgetCustomizer.primaryColor = colorHex;

  // Apply colors dynamically to preview widget floating button and header background
  document.getElementById('widget-floating-btn').style.backgroundColor = colorHex;
  document.getElementById('widget-floating-btn').style.boxShadow = `0 4px 20px ${colorHex}66`;
  document.getElementById('widget-avatar-indicator').style.backgroundColor = colorHex;
  
  // Custom headers coloring rule
  document.querySelector('#widget-chat-popup .widget-header').style.borderBottom = `2px solid ${colorHex}`;
}

function syncWidgetPosition(pos) {
  state.widgetCustomizer.position = pos;
  const widget = document.getElementById('global-chatbot-widget');
  
  if (pos === 'bottom-left') {
    widget.style.right = 'auto';
    widget.style.left = '30px';
  } else {
    widget.style.left = 'auto';
    widget.style.right = '30px';
  }
}

function syncWidgetTheme(theme) {
  state.widgetCustomizer.theme = theme;
  const popup = document.getElementById('widget-chat-popup');
  const chatBody = document.getElementById('widget-chat-messages-log');
  
  if (theme === 'light') {
    popup.style.backgroundColor = '#ffffff';
    popup.style.color = '#1f2937';
    popup.style.borderColor = '#e5e7eb';
    chatBody.style.backgroundColor = '#f9fafb';
    document.querySelectorAll('.quick-reply-chip').forEach(c => {
      c.style.backgroundColor = '#f3f4f6';
      c.style.borderColor = '#e5e7eb';
      c.style.color = '#374151';
    });
  } else {
    popup.style.backgroundColor = '#1f2937';
    popup.style.color = '#ffffff';
    popup.style.borderColor = '#374151';
    chatBody.style.backgroundColor = 'rgba(3, 7, 18, 0.2)';
    document.querySelectorAll('.quick-reply-chip').forEach(c => {
      c.style.backgroundColor = '#111827';
      c.style.borderColor = '#374151';
      c.style.color = '#ffffff';
    });
  }
}

function syncWidgetRadius(radius) {
  state.widgetCustomizer.radius = `${radius}px`;
  document.getElementById('label-radius').innerText = `${radius}px`;
  
  const popup = document.getElementById('widget-chat-popup');
  popup.style.borderRadius = `${radius}px`;
}

function toggleVoiceButtonVisibility() {
  const isChecked = document.getElementById('customizer-toggle-voice').checked;
  state.widgetCustomizer.enableVoice = isChecked;
  document.getElementById('widget-btn-call').style.display = isChecked ? 'inline-flex' : 'none';
}

function copyEmbedScript() {
  const scriptTag = document.getElementById('embed-script-tag').innerText;
  navigator.clipboard.writeText(scriptTag).then(() => {
    alert('Embed script code copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy. Please copy the code text manually.');
  });
}

// -------------------------------------------------------------
// CONVERSATIONS INBOX VIEW LOGIC
// -------------------------------------------------------------
function renderConversationsInbox() {
  const container = document.getElementById('inbox-chats-list');
  if (!container) return;

  container.innerHTML = '';
  
  state.conversations.forEach((chat, idx) => {
    const card = document.createElement('div');
    card.className = `inbox-chat-card ${idx === state.activeConversationIndex ? 'active' : ''}`;
    card.onclick = () => loadConversationDetails(idx);
    
    // Emotion emoji lookup
    const emojiMap = { Happy: '😊', Neutral: '😐', Angry: '😠' };
    
    card.innerHTML = `
      <div class="chat-card-header">
        <span class="chat-card-name">${chat.name}</span>
        <span class="chat-card-time">${chat.time}</span>
      </div>
      <div class="chat-card-snippet">${chat.snippet}</div>
      <div class="chat-card-badges">
        <span class="badge-score">Score: ${chat.score}</span>
        <span class="caption" style="color:var(--text-secondary); text-transform:none;">${emojiMap[chat.sentiment]} ${chat.sentiment}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function loadConversationDetails(index) {
  state.activeConversationIndex = index;
  const chat = state.conversations[index];
  if (!chat) return;

  // Highlight active
  document.querySelectorAll('.inbox-chat-card').forEach((card, idx) => {
    if (idx === index) card.classList.add('active');
    else card.classList.remove('active');
  });

  // Top header details
  document.getElementById('inbox-active-avatar').innerText = getInitials(chat.name);
  document.getElementById('inbox-active-name').innerText = chat.name;
  
  // Right side stats panel
  document.getElementById('inbox-detail-avatar').innerText = getInitials(chat.name);
  document.getElementById('inbox-detail-name').innerText = chat.name;
  
  const scoreBadge = document.getElementById('inbox-detail-lead-badge');
  scoreBadge.innerHTML = `<span class="status-indicator-dot"></span> Lead Score: ${chat.score}`;
  if (chat.score >= 80) { scoreBadge.className = 'status-pill success'; }
  else if (chat.score >= 40) { scoreBadge.className = 'status-pill warning'; }
  else { scoreBadge.className = 'status-pill danger'; }

  const emojiMap = { Happy: '😊 Happy', Neutral: '😐 Neutral', Angry: '😠 Angry' };
  const sentimentLabel = document.getElementById('inbox-detail-sentiment');
  sentimentLabel.innerText = emojiMap[chat.sentiment];
  if (chat.sentiment === 'Happy') sentimentLabel.className = 'status-pill success';
  else if (chat.sentiment === 'Neutral') sentimentLabel.className = 'status-pill warning';
  else sentimentLabel.className = 'status-pill danger';

  document.getElementById('inbox-detail-summary').innerText = chat.summary;
  document.getElementById('inbox-detail-products').innerText = chat.products;
  document.getElementById('inbox-detail-confidence').innerText = chat.confidence;
  document.getElementById('inbox-detail-appointment').innerText = chat.appointment;

  // Render conversation messages panel
  const msgContainer = document.getElementById('inbox-messages-container');
  msgContainer.innerHTML = '';

  chat.messages.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `mockup-bubble ${msg.sender === 'ai' ? 'ai' : 'user'}`;
    bubble.innerText = msg.text;
    msgContainer.appendChild(bubble);
  });
  
  msgContainer.scrollTop = msgContainer.scrollHeight;
  refreshIcons();
}

function filterConversations() {
  const query = document.getElementById('inbox-search').value.toLowerCase();
  const filterType = document.getElementById('inbox-filter-type').value;
  const filterSent = document.getElementById('inbox-filter-sentiment').value;

  const container = document.getElementById('inbox-chats-list');
  container.innerHTML = '';

  state.conversations.forEach((chat, idx) => {
    // String checks
    const matchesQuery = chat.name.toLowerCase().includes(query) || chat.snippet.toLowerCase().includes(query);
    
    // Channel check (mocking type based on name keywords for this list)
    const isVoice = chat.name.includes('Priya') || chat.name.includes('Charles') && chat.appointment.includes('Booked');
    const matchesType = filterType === 'all' || 
                       (filterType === 'voice' && isVoice) || 
                       (filterType === 'chat' && !isVoice);

    const matchesSentiment = filterSent === 'all' || chat.sentiment === filterSent;

    if (matchesQuery && matchesType && matchesSentiment) {
      const card = document.createElement('div');
      card.className = `inbox-chat-card ${idx === state.activeConversationIndex ? 'active' : ''}`;
      card.onclick = () => loadConversationDetails(idx);
      
      const emojiMap = { Happy: '😊', Neutral: '😐', Angry: '😠' };
      
      card.innerHTML = `
        <div class="chat-card-header">
          <span class="chat-card-name">${chat.name}</span>
          <span class="chat-card-time">${chat.time}</span>
        </div>
        <div class="chat-card-snippet">${chat.snippet}</div>
        <div class="chat-card-badges">
          <span class="badge-score">Score: ${chat.score}</span>
          <span class="caption" style="color:var(--text-secondary); text-transform:none;">${emojiMap[chat.sentiment]} ${chat.sentiment}</span>
        </div>
      `;
      container.appendChild(card);
    }
  });
}

function exportActiveChat() {
  const chat = state.conversations[state.activeConversationIndex];
  if (!chat) return;
  alert(`Dispatched transcript logs file: twinai-chat-export-${chat.name.replace(' ', '_')}.json`);
}

function getInitials(name) {
  const parts = name.split(' ');
  return parts.map(p => p[0]).join('').toUpperCase().substring(0, 2);
}

// -------------------------------------------------------------
// LEADS TABLE ACTIONS
// -------------------------------------------------------------
function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  state.leads.forEach(lead => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:600;">${lead.name}</td>
      <td>${lead.email}</td>
      <td>${lead.phone}</td>
      <td>${lead.budget}</td>
      <td>${lead.interest}</td>
      <td>
        <span class="status-pill ${lead.priority === 'High' ? 'danger' : lead.priority === 'Medium' ? 'warning' : 'success'}">
          ${lead.priority}
        </span>
      </td>
      <td>
        <span class="status-pill ${lead.status === 'Closed' ? 'success' : 'warning'}">
          ${lead.status}
        </span>
      </td>
      <td>${lead.agent}</td>
    `;
    tbody.appendChild(tr);
  });
  refreshIcons();
}

function filterLeadsTable() {
  const query = document.getElementById('leads-search-input').value.toLowerCase();
  const priority = document.getElementById('leads-filter-priority').value;
  const status = document.getElementById('leads-filter-status').value;

  const tbody = document.getElementById('leads-table-body');
  tbody.innerHTML = '';

  state.leads.forEach(lead => {
    const matchesQuery = lead.name.toLowerCase().includes(query) || lead.email.toLowerCase().includes(query);
    const matchesPriority = priority === 'all' || lead.priority === priority;
    const matchesStatus = status === 'all' || lead.status === status;

    if (matchesQuery && matchesPriority && matchesStatus) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:600;">${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.budget}</td>
        <td>${lead.interest}</td>
        <td>
          <span class="status-pill ${lead.priority === 'High' ? 'danger' : lead.priority === 'Medium' ? 'warning' : 'success'}">
            ${lead.priority}
          </span>
        </td>
        <td>
          <span class="status-pill ${lead.status === 'Closed' ? 'success' : 'warning'}">
            ${lead.status}
          </span>
        </td>
        <td>${lead.agent}</td>
      `;
      tbody.appendChild(tr);
    }
  });
}

function exportLeadsCSV() {
  alert('Preparing and downloading CSV file containing ' + state.leads.length + ' leads entries...');
}

// -------------------------------------------------------------
// APPOINTMENTS CALENDAR CONTROLLER
// -------------------------------------------------------------
function setupCalendar() {
  const container = document.getElementById('calendar-grid-dates');
  if (!container) return;

  container.innerHTML = '';
  
  // Labels for days
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  dayNames.forEach(d => {
    const lbl = document.createElement('div');
    lbl.className = 'calendar-day-label';
    lbl.innerText = d;
    container.appendChild(lbl);
  });

  // July 2026 starts on Wednesday (offset 3)
  const daysOffset = 3;
  const totalDays = 31;

  // Previous month placeholders
  for (let i = 28; i < 28 + daysOffset; i++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-date-cell other-month';
    cell.innerHTML = `<span class="date-number">${i}</span>`;
    container.appendChild(cell);
  }

  // Active days in July
  for (let d = 1; d <= totalDays; d++) {
    const cell = document.createElement('div');
    const dayString = `2026-07-${d.toString().padStart(2, '0')}`;
    
    cell.className = 'calendar-date-cell';
    if (dayString === state.selectedCalendarDate) {
      cell.classList.add('active');
    }
    
    cell.onclick = () => selectCalendarDate(dayString);

    // Indicator badges
    let dots = '';
    if (state.meetings[dayString]) {
      state.meetings[dayString].forEach((m, idx) => {
        const dotColor = idx % 2 === 0 ? 'blue' : 'purple';
        dots += `<span class="date-dot ${dotColor}"></span>`;
      });
    }

    cell.innerHTML = `
      <span class="date-number">${d}</span>
      <div class="date-badge-dots">${dots}</div>
    `;
    container.appendChild(cell);
  }
}

function selectCalendarDate(dayString) {
  state.selectedCalendarDate = dayString;
  setupCalendar();

  // Update visual text heading
  const dateObj = new Date(dayString);
  const formatted = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  document.getElementById('schedule-selected-date').innerText = formatted;

  renderMeetingsTimeline();
}

function renderMeetingsTimeline() {
  const container = document.getElementById('calendar-meetings-timeline');
  if (!container) return;

  container.innerHTML = '';
  const dayMeetings = state.meetings[state.selectedCalendarDate];

  if (!dayMeetings || dayMeetings.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 10px; color:var(--text-secondary);">
        <i data-lucide="calendar" style="width:36px; height:36px; margin-bottom:10px;"></i>
        <p class="small-text">No consultation appointments scheduled for this date.</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  dayMeetings.forEach(meeting => {
    const card = document.createElement('div');
    card.className = 'meeting-item-box';
    card.innerHTML = `
      <div class="meeting-time-row">
        <span>${meeting.time}</span>
        <span class="status-pill success" style="padding:2px 6px; font-size:10px;">Confirmed</span>
      </div>
      <div style="font-weight:600; font-size:14px;">${meeting.topic}</div>
      <div class="small-text" style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
        <span>Client: ${meeting.name}</span>
        <span style="color:var(--primary); font-weight:500;">${meeting.method}</span>
      </div>
    `;
    container.appendChild(card);
  });
  refreshIcons();
}

function prevMonth() {
  alert('Calendar limited to Active launch month: July 2026');
}
function nextMonth() {
  alert('Calendar limited to Active launch month: July 2026');
}

// -------------------------------------------------------------
// SETTINGS VIEWS INTERACTIVE ACTIONS
// -------------------------------------------------------------
function removeTeamMember(element) {
  if (confirm('Are you sure you want to revoke this user\'s dashboard permissions?')) {
    element.closest('div').remove();
  }
}

function inviteTeamMember() {
  const emailInput = document.getElementById('settings-invite-email');
  const email = emailInput.value;
  if (!email) return;

  const container = document.getElementById('settings-team-list');
  const div = document.createElement('div');
  div.style.cssText = 'display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:8px;';
  div.innerHTML = `
    <div>
      <div style="font-weight:600; font-size:14px;">Pending Invite</div>
      <div class="caption">${email}</div>
    </div>
    <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="removeTeamMember(this)">Cancel</button>
  `;
  container.appendChild(div);
  emailInput.value = '';
  alert(`Invitation voucher dispatched to ${email}`);
}

function updateSettingsProfile() {
  const bizName = document.getElementById('settings-biz-name').value;
  const bizEmail = document.getElementById('settings-biz-email').value;

  state.currentUser.businessName = bizName;
  state.currentUser.email = bizEmail;
  state.currentUser.name = bizName.split(' ')[0] + ' Manager';

  // Sync to sidebar
  document.getElementById('user-name-display').innerText = state.currentUser.name;
  document.getElementById('user-email-display').innerText = state.currentUser.email;
  document.getElementById('avatar-display').innerText = getInitials(state.currentUser.name);

  alert('Business credentials updated successfully!');
}

// -------------------------------------------------------------
// STATIC LANDING PAGE DEMO INTERACTION
// -------------------------------------------------------------
function handleDemoChatKey(event) {
  if (event.key === 'Enter') {
    submitDemoChat();
  }
}

function submitDemoChat() {
  const input = document.getElementById('demo-chat-input');
  const query = input.value;
  if (!query.trim()) return;

  appendDemoMessage('user', query);
  input.value = '';

  triggerDemoAiResponse(query);
}

function sendDemoPreset(promptText) {
  appendDemoMessage('user', promptText);
  triggerDemoAiResponse(promptText);
}

function appendDemoMessage(sender, text) {
  const container = document.getElementById('demo-messages-log');
  const bubble = document.createElement('div');
  bubble.className = `mockup-bubble ${sender === 'ai' ? 'ai' : 'user'}`;
  bubble.innerText = text;
  container.appendChild(bubble);
  updateDemoChatWindowScroll();
}

function updateDemoChatWindowScroll() {
  const container = document.getElementById('demo-messages-log');
  container.scrollTop = container.scrollHeight;
}

function triggerDemoAiResponse(query) {
  const container = document.getElementById('demo-messages-log');
  
  // Render typing bubble
  const typing = document.createElement('div');
  typing.className = 'typing-dots';
  typing.id = 'demo-typing-indicator';
  typing.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  container.appendChild(typing);
  updateDemoChatWindowScroll();

  // AI Response lookup logic
  setTimeout(() => {
    const indicator = document.getElementById('demo-typing-indicator');
    if (indicator) indicator.remove();

    let reply = '';
    const q = query.toLowerCase();

    if (q.includes('laptop') || q.includes('₹60,000')) {
      reply = "I suggest looking at the TwinBook Pro (₹54,999). It is configured with an Intel Core i5 processor, 16GB RAM, and 512GB SSD. Would you like me to book a consultation slot to discuss pricing details?";
    } else if (q.includes('schedule') || q.includes('tomorrow') || q.includes('call') || q.includes('book')) {
      reply = "Certainly! I have slots open tomorrow at 10:00 AM, 11:30 AM, and 2:00 PM. Please select your preferred time, or tell me your email to sync the calendar!";
    } else if (q.includes('secure') || q.includes('data')) {
      reply = "Yes, your data is 100% secure. We run isolated multi-tenant secure databases. All documents are stored in vector spaces with strict AES-256 encryption. We never train public base models with your data.";
    } else {
      reply = "That's a great question! Based on my business knowledge training, I can guide you through that. Let me know if you would like me to draft a custom quotation or book a call on our calendar.";
    }

    appendDemoMessage('ai', reply);
  }, 1000);
}

// -------------------------------------------------------------
// CUSTOMER CHAT WIDGET INTERACTION
// -------------------------------------------------------------
function toggleWidgetChatWindow() {
  const widgetPopup = document.getElementById('widget-chat-popup');
  const triggerBtn = document.getElementById('widget-floating-btn');
  const iconMsg = document.getElementById('widget-icon-msg');
  const iconClose = document.getElementById('widget-icon-close');

  const isActive = widgetPopup.classList.contains('active');
  if (isActive) {
    widgetPopup.classList.remove('active');
    iconMsg.style.display = 'block';
    iconClose.style.display = 'none';
  } else {
    widgetPopup.classList.add('active');
    iconMsg.style.display = 'none';
    iconClose.style.display = 'block';
    
    // Sync customized styles to ensure widgets colors/theme/radii match
    syncWidgetColors(state.widgetCustomizer.primaryColor);
    syncWidgetTheme(state.widgetCustomizer.theme);
    syncWidgetRadius(parseInt(state.widgetCustomizer.radius));
  }
}

// Open chatbot window with demo text
function openDemoChat() {
  const widgetPopup = document.getElementById('widget-chat-popup');
  if (!widgetPopup.classList.contains('active')) {
    toggleWidgetChatWindow();
  }
  submitWidgetMessage('I need to book a custom demo');
}

function handleWidgetKey(event) {
  if (event.key === 'Enter') {
    submitWidgetChat();
  }
}

function submitWidgetChat() {
  const input = document.getElementById('widget-chat-input');
  const val = input.value;
  if (!val.trim()) return;

  submitWidgetMessage(val);
  input.value = '';
}

function submitWidgetMessage(msgText) {
  appendWidgetMessage('user', msgText);

  // Trigger simulated response
  const container = document.getElementById('widget-chat-messages-log');
  
  // Render typing bubble
  const typing = document.createElement('div');
  typing.className = 'typing-dots';
  typing.id = 'widget-typing-indicator';
  typing.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    const indicator = document.getElementById('widget-typing-indicator');
    if (indicator) indicator.remove();

    let reply = '';
    const q = msgText.toLowerCase();

    if (q.includes('laptop') || q.includes('₹60,000')) {
      reply = "The TwinBook Pro is ₹54,999. I can schedule a sales callback or book an appointment directly into John's calendar. What's your email?";
    } else if (q.includes('call') || q.includes('schedule') || q.includes('demo') || q.includes('appointment')) {
      reply = "Let's coordinate! I have synced John's Google Calendar. Would tomorrow at 10:00 AM work for a quick Zoom chat?";
    } else if (q.includes('about') || q.includes('twinai') || q.includes('what is')) {
      reply = "TwinAI is a multi-tenant platform where businesses create their own AI digital employee. It answers customers, books calls, gathers leads, and speaks naturally.";
    } else {
      reply = "Got it! Let me check my vector knowledge database... Is there anything specific about pricing plans or setup support you wanted to clarify?";
    }

    appendWidgetMessage('ai', reply);
  }, 1200);
}

function appendWidgetMessage(sender, text) {
  const container = document.getElementById('widget-chat-messages-log');
  const bubble = document.createElement('div');
  bubble.className = `mockup-bubble ${sender === 'ai' ? 'ai' : 'user'}`;
  bubble.innerText = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

// -------------------------------------------------------------
// VOICE CALL SIMULATOR (WIDGET INTEGRATION)
// -------------------------------------------------------------
let callInterval;
function simulateWidgetCallScreen() {
  const screen = document.getElementById('widget-call-overlay');
  screen.classList.add('active');

  const statusHeader = document.getElementById('call-status-header');
  const waveforms = document.getElementById('call-speech-waveform');
  const transcripts = document.getElementById('call-voice-transcripts');
  
  statusHeader.innerText = 'Connecting...';
  waveforms.style.opacity = '0';
  transcripts.innerText = 'Attempting connection...';

  // Ringing phase
  setTimeout(() => {
    statusHeader.innerText = 'Voice Active';
    waveforms.style.opacity = '1';
    
    // Simulate conversation loops
    let conversationSteps = [
      "TwinAI Voice: Hello! Thanks for calling Acme Corp. I can answer FAQs or coordinate appointments. How can I help you?",
      "Client: Yes, I need a laptop recommendation under ₹60,000.",
      "TwinAI Voice: Excellent. I recommend the TwinBook Pro (₹54,999). It is packed with an i5 processor and 16GB RAM. Do you want me to book a call for tomorrow at 10 AM?",
      "Client: Yes, please book that slot.",
      "TwinAI Voice: Done! Your Zoom booking is scheduled for July 12 at 10:00 AM. A confirmation email has been dispatched."
    ];
    
    let step = 0;
    transcripts.innerText = conversationSteps[step];
    
    callInterval = setInterval(() => {
      step++;
      if (step < conversationSteps.length) {
        transcripts.innerText = conversationSteps[step];
      } else {
        clearInterval(callInterval);
        transcripts.innerText = "Call ended by agent. Syncing logs...";
        setTimeout(hangupWidgetCall, 2000);
      }
    }, 4000);

  }, 2000);
}

function simulateVoiceCall() {
  toggleWidgetChatWindow();
  simulateWidgetCallScreen();
}

function hangupWidgetCall() {
  clearInterval(callInterval);
  const screen = document.getElementById('widget-call-overlay');
  screen.classList.remove('active');
  alert('Voice call ended. Transcription logs automatically synced with dashboard inbox!');
}

// -------------------------------------------------------------
// NOTIFICATIONS PANEL CONTROLLER
// -------------------------------------------------------------
function toggleNotificationsPanel(event) {
  event.stopPropagation();
  
  const alerts = [
    { title: 'New Lead Generated', text: 'Charles Smith matched lead qualification parameters (Score: 92).', time: '10m ago' },
    { title: 'Appointment Confirmed', text: 'Alice Vance confirmed Zoom calendar consult for July 15.', time: '1h ago' }
  ];

  let alertListHTML = '';
  alerts.forEach(alert => {
    alertListHTML += `
      <div style="padding: 12px; border-bottom:1px solid var(--border); font-size:13px;">
        <div style="font-weight:600; display:flex; justify-content:space-between;">
          <span>${alert.title}</span>
          <span style="color:var(--text-secondary); font-size:11px;">${alert.time}</span>
        </div>
        <p style="color:var(--text-secondary); margin-top:4px; line-height:1.3;">${alert.text}</p>
      </div>
    `;
  });

  const dropdown = document.createElement('div');
  dropdown.id = 'notif-panel';
  dropdown.style.cssText = 'position:absolute; top:50px; right:0; width:300px; background:var(--card-bg); border:1px solid var(--border); border-radius:16px; box-shadow:var(--shadow-lg); z-index:200; overflow:hidden;';
  dropdown.innerHTML = `
    <div style="padding:15px; background:var(--bg-secondary); border-bottom:1px solid var(--border); font-weight:600; display:flex; justify-content:space-between; align-items:center;">
      <span>Alert Center</span>
      <button class="caption" style="color:var(--primary); font-weight:600;" onclick="clearNotifCenter()">Clear</button>
    </div>
    <div style="max-height:250px; overflow-y:auto;">
      ${alertListHTML}
    </div>
  `;

  const existing = document.getElementById('notif-panel');
  if (existing) {
    existing.remove();
  } else {
    event.currentTarget.parentNode.appendChild(dropdown);
  }
}

function clearNotifCenter() {
  const badge = document.querySelector('.notification-badge');
  if (badge) badge.remove();
  const panel = document.getElementById('notif-panel');
  if (panel) panel.remove();
  alert('All notifications cleared!');
}

// Clear notification dropdowns on clicking body
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notif-panel');
  if (panel && !panel.contains(e.target) && !e.target.closest('.notifications-dropdown-container')) {
    panel.remove();
  }
});


// -------------------------------------------------------------
// CHART.JS INITIALIZER & UPDATE HANDLERS
// -------------------------------------------------------------
function initializeDashboardCharts() {
  const isHome = document.getElementById('dashboard-home').classList.contains('active');
  const isAnalytics = document.getElementById('analytics').classList.contains('active');

  // Chart options setup
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  // 1. Conversation Growth (Dashboard Home)
  const convCtx = document.getElementById('chart-conversation-growth');
  if (convCtx) {
    if (charts.growth) charts.growth.destroy();
    charts.growth = new Chart(convCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [640, 820, 1100, 950, 1200, 1380, 1482],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 2
        }]
      },
      options: baseOptions
    });
  }

  // 2. Lead Conversion Funnel (Dashboard Home)
  const funnelCtx = document.getElementById('chart-lead-funnel');
  if (funnelCtx) {
    if (charts.funnel) charts.funnel.destroy();
    charts.funnel = new Chart(funnelCtx, {
      type: 'bar',
      data: {
        labels: ['Total Visits', 'Widget Opened', 'AI Chat Initiated', 'Form Leads Gathered', 'Calls Placed'],
        datasets: [{
          data: [14200, 9500, 4820, 418, 120],
          backgroundColor: ['#1f2937', '#3b82f6', '#8b5cf6', '#06b6d4', '#22c55e'],
          borderRadius: 8
        }]
      },
      options: {
        ...baseOptions,
        indexAxis: 'y', // Horizontal bars
      }
    });
  }

  // 3. Daily Conversations Trends (Analytics)
  const dailyCtx = document.getElementById('chart-analytics-daily');
  if (dailyCtx) {
    if (charts.daily) charts.daily.destroy();
    charts.daily = new Chart(dailyCtx, {
      type: 'line',
      data: {
        labels: ['Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25', 'Jun 26', 'Jun 27'],
        datasets: [{
          label: 'Conversations Count',
          data: [980, 1050, 1240, 1180, 1320, 1410, 1482],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          fill: true,
          tension: 0.2
        }]
      },
      options: baseOptions
    });
  }

  // 4. Customer Sentiment Assessment (Analytics)
  const sentCtx = document.getElementById('chart-analytics-sentiment');
  if (sentCtx) {
    if (charts.sentiment) charts.sentiment.destroy();
    charts.sentiment = new Chart(sentCtx, {
      type: 'doughnut',
      data: {
        labels: ['Happy 😊', 'Neutral 😐', 'Angry 😠'],
        datasets: [{
          data: [74, 21, 5],
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: { color: '#ffffff' }
          }
        }
      }
    });
  }

  // 5. Peak Conversations Hours (Analytics)
  const peakCtx = document.getElementById('chart-analytics-peak-hours');
  if (peakCtx) {
    if (charts.peak) charts.peak.destroy();
    charts.peak = new Chart(peakCtx, {
      type: 'bar',
      data: {
        labels: ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM', '3 AM', '6 AM'],
        datasets: [{
          data: [280, 410, 480, 520, 390, 180, 60, 110],
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      },
      options: baseOptions
    });
  }

  // 6. Usage Channel Breakdown (Analytics)
  const usageCtx = document.getElementById('chart-analytics-usage');
  if (usageCtx) {
    if (charts.usage) charts.usage.destroy();
    charts.usage = new Chart(usageCtx, {
      type: 'pie',
      data: {
        labels: ['Chat Support Widget', 'Browser Voice Calling'],
        datasets: [{
          data: [82, 18],
          backgroundColor: ['#8b5cf6', '#06b6d4'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { color: '#ffffff' }
          }
        }
      }
    });
  }
}

// Update home line chart query
function updateOverviewChart(period) {
  if (!charts.growth) return;

  const datasetMaps = {
    today: {
      labels: ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      data: [210, 480, 850, 1100, 1482]
    },
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [640, 820, 1100, 950, 1200, 1380, 1482]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [4200, 5800, 8100, 9400]
    }
  };

  charts.growth.data.labels = datasetMaps[period].labels;
  charts.growth.data.datasets[0].data = datasetMaps[period].data;
  charts.growth.update();
}

// -------------------------------------------------------------
// PREMIUM ENHANCED TYPOGRAPHY, TEXT AND SCROLL ANIMATIONS CONTROLLER
// -------------------------------------------------------------
function initPremiumAnimations() {
  // 1. Scroll-Linked Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const scrolled = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = scrolled + '%';
      }
    });
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -40px 0px', // trigger shortly before entering
    threshold: 0.08 // 8% visible is enough to start transition
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    // Group elements triggering together to stagger their fade-ins
    const triggered = entries.filter(entry => entry.isIntersecting);
    
    const groups = {};
    triggered.forEach(entry => {
      const el = entry.target;
      const parent = el.parentElement;
      const groupKey = parent ? (parent.className || 'default') : 'default';
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(el);
      observer.unobserve(el);
    });

    Object.keys(groups).forEach(groupKey => {
      groups[groupKey].forEach((el, index) => {
        // Apply stagger delay to cards and lists
        if (el.classList.contains('step-card') || el.classList.contains('feature-card') || el.classList.contains('pricing-card') || el.classList.contains('faq-item')) {
          el.style.setProperty('--stagger-delay', (index * 0.12) + 's');
        }
        el.classList.add('visible');
      });
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Split-Text Typography Reveal for Headlines
  const splitTextElements = document.querySelectorAll('.split-text');
  splitTextElements.forEach(title => {
    const text = title.textContent.trim();
    title.textContent = ''; // Clear original text content
    
    // Split into words to prevent weird wraps, then split into characters
    const words = text.split(' ');
    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      
      const chars = word.split('');
      chars.forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });
      
      title.appendChild(wordSpan);
      
      if (wordIdx < words.length - 1) {
        title.appendChild(document.createTextNode(' '));
      }
    });
  });

  // Trigger animation for split characters after header split completes
  setTimeout(() => {
    const chars = document.querySelectorAll('.split-char');
    chars.forEach((char, index) => {
      setTimeout(() => {
        char.classList.add('active');
      }, index * 25);
    });
  }, 150);

  // 4. Mouse-Position Card Spotlight Glow & 3D Tilt Tracking
  const spotlightCards = document.querySelectorAll('.step-card, .feature-card, .pricing-card, .benefit-card, .testimonial-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculations
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // 5. Number Counter Roll-Up Animations for Dashboard Metrics
  initCounterRollups();

  // 6. Interactive Live Typewriter Text Rotator
  initTypewriterEffect();
}

// Roll-up animated counter for metric numbers
function initCounterRollups() {
  const metricElements = document.querySelectorAll('.metric-value');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawText = el.innerText.replace(/[^0-9.]/g, '');
        const targetNum = parseFloat(rawText);
        if (!isNaN(targetNum) && targetNum > 0) {
          animateSingleCounter(el, targetNum, el.innerText);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  metricElements.forEach(el => counterObserver.observe(el));
}

function animateSingleCounter(element, targetNum, originalFormat) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();
  const hasComma = originalFormat.includes(',');
  const prefix = originalFormat.match(/^\D+/) ? originalFormat.match(/^\D+/)[0] : '';
  const suffix = originalFormat.match(/\D+$/) ? originalFormat.match(/\D+$/)[0] : '';

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out expo curve for smooth deceleration
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = Math.floor(easeProgress * targetNum);
    
    let formatted = currentVal.toString();
    if (hasComma) {
      formatted = currentVal.toLocaleString();
    }
    
    element.innerText = `${prefix}${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.innerText = originalFormat; // Ensure exact final string match
    }
  }

  requestAnimationFrame(updateCounter);
}

// Continuous Live Typewriter Text Rotator for Hero Subtitle
function initTypewriterEffect() {
  const typewriterEl = document.getElementById('hero-typewriter');
  if (!typewriterEl) return;

  const phrases = [
    "answers customer queries 24/7",
    "books instant appointments",
    "generates qualified leads",
    "prepares accurate proposals",
    "scales call centers infinitely"
  ];

  let phraseIdx = 0;
  let charIdx = phrases[0].length;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriterEl.innerText = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40; // Speed up erasing
    } else {
      typewriterEl.innerText = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 80; // Standard typing speed
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2200; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typeLoop, typeSpeed);
  }

  // Start loop after initial delay
  setTimeout(typeLoop, 2000);
}

