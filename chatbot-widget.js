// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
// Floating chatbot widget
const chatbotHTML = `
<div id="chatbot-widget" class="fixed bottom-4 right-4 z-50">
  <button id="chat-toggle" class="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors">
    <span class="material-symbols-outlined">chat</span>
  </button>
  <div id="chat-window" class="hidden absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border">
    <div class="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
      <span class="font-semibold">Steel Cutting Assistant</span>
      <button id="chat-close" class="text-white hover:text-gray-200">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
    <div id="mini-chat-container" class="h-64 overflow-y-auto p-3 bg-gray-50">
      <div class="message bot-message mb-2">
        <div class="bg-blue-500 text-white p-2 rounded-lg text-sm">
          👋 Welcome to Steel Cutting Assistant! Choose an option below.
        </div>
      </div>
    </div>
    <div class="p-3 border-t text-center text-gray-500 text-xs">
      💬 Click buttons above to interact
    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', chatbotHTML);

const quickOptions = [
  { text: '⚙️ Services', action: 'services' },
  { text: '🔩 Materials', action: 'materials' },
  { text: '💰 Get Quote', action: 'quote' },
  { text: '📞 Contact', action: 'contact' },
  { text: '🖼️ Gallery', action: 'gallery' },
  { text: '💬 Full Chat', action: 'fullchat' }
];

const responses = {
  'services': '⚙️ CNC Laser Cutting: 12kW power, 13m×3m bed, ±0.1mm precision. <a href="services.html" style="color: #93c5fd; text-decoration: underline;">View Details →</a>',
  'materials': '🔩 We cut: Mild Steel (25mm), Stainless (20mm), Aluminium (16mm), Brass (10mm), Copper (8mm). <a href="services.html" style="color: #93c5fd; text-decoration: underline;">See All →</a>',
  'contact': '📞 Call: +91-9960290333<br>📧 Email: ststeeltrader@gmail.com<br>📍 Rabale, Navi Mumbai. <a href="contact.html" style="color: #93c5fd; text-decoration: underline;">Contact Page →</a>',
  'quote': '💰 Get instant quote via WhatsApp or contact form. <a href="https://wa.me/919960290333?text=Hi! I need a quote for laser cutting" style="color: #93c5fd; text-decoration: underline;">WhatsApp Quote →</a>',
  'gallery': '🖼️ View our precision work samples and completed projects. <a href="gallery.html" style="color: #93c5fd; text-decoration: underline;">View Gallery →</a>',
  'fullchat': '💬 Opening full chatbot for detailed assistance...',
  'help': '🤖 I can help with Services, Materials, Quotes, Contact info, or Gallery. What interests you?'
};

function findResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('service') || msg.includes('cutting')) return responses.services;
  if (msg.includes('material') || msg.includes('steel')) return responses.materials;
  if (msg.includes('contact') || msg.includes('phone')) return responses.contact;
  if (msg.includes('gallery') || msg.includes('work')) return responses.gallery;
  if (msg.includes('quote') || msg.includes('price')) return responses.quote;
  if (msg.includes('help') || msg.includes('option')) return responses.help;
  return responses.help;
}

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const miniChatContainer = document.getElementById('mini-chat-container');


chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('hidden');
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.add('hidden');
});

function addMiniMessage(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'text-right' : ''} mb-2`;
  messageDiv.innerHTML = `
    <div class="inline-block ${isUser ? 'bg-gray-300' : 'bg-blue-500 text-white'} p-2 rounded-lg text-sm max-w-xs">
      ${message}
    </div>
  `;
  miniChatContainer.appendChild(messageDiv);
  miniChatContainer.scrollTop = miniChatContainer.scrollHeight;
}

function showMiniOptions() {
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'message mb-2';
  optionsDiv.innerHTML = `
    <div style="display: grid; gap: 4px; max-width: 200px;">
      ${quickOptions.map(option => 
        `<button onclick="handleMiniOption('${option.action}', '${option.text}')" style="
          background: white;
          color: #3b82f6;
          border: 1px solid #ddd;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        " onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='white'">
          ${option.text}
        </button>`
      ).join('')}
    </div>
  `;
  miniChatContainer.appendChild(optionsDiv);
  miniChatContainer.scrollTop = miniChatContainer.scrollHeight;
}

function handleMiniOption(action, text) {
  addMiniMessage(text, true);
  
  setTimeout(() => {
    if (action === 'fullchat') {
      addMiniMessage(responses[action]);
      setTimeout(() => {
        window.open('chatbot.html', '_blank');
      }, 1000);
    } else {
      addMiniMessage(responses[action]);
      setTimeout(showMiniOptions, 1500);
    }
  }, 500);
}



// Show initial options
setTimeout(showMiniOptions, 1000);

// Make function global
window.handleMiniOption = handleMiniOption;



}); // End DOMContentLoaded