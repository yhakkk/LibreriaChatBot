class Chatbot extends HTMLElement {
  constructor() {
    super();
    this.token = this.getAttribute('token');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .chatbot-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #4CAF50;
          border: none;
          color: white;
          text-align: center;
          padding: 15px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 1000;
        }

        .chatbot-container {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 300px;
          height: 400px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          display: none;
          z-index: 999;
        }

        .chatbot-header {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .chatbot-content {
          padding: 10px;
          height: 300px;
          overflow-y: auto;
        }

        .chatbot-input {
          width: calc(100% - 20px);
          padding: 10px;
          border: none;
          border-top: 1px solid #ccc;
        }

        .message {
          margin: 10px 0;
          display: flex;
          align-items: center;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.user .message-content {
          background-color: #4CAF50;
          color: white;
        }

        .message.bot .message-content {
          background-color: #f1f1f1;
          color: black;
        }

        .message-content {
          max-width: 70%;
          padding: 10px;
          border-radius: 10px;
        }

        .message img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      </style>
      <button class="chatbot-button">Chat</button>
      <div class="chatbot-container">
        <div class="chatbot-header">Chatbot</div>
        <div class="chatbot-content" id="chat-content"></div>
        <input type="text" class="chatbot-input" id="chat-input" placeholder="Escribe un mensaje...">
      </div>
    `;

    this.button = this.shadowRoot.querySelector('.chatbot-button');
    this.container = this.shadowRoot.querySelector('.chatbot-container');
    this.button.addEventListener('click', () => this.toggleChat());
  }

  toggleChat() {
    this.container.style.display = this.container.style.display === 'none' ? 'block' : 'none';
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#chat-input').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.sendMessage(event);
      }
    });

    // Ejemplo de mensaje inicial del bot
    this.addMessage('bot', 'Hello, how can we help you today?');
  }

  sendMessage(event) {
    const input = this.shadowRoot.querySelector('#chat-input');
    const message = input.value;
    if (message.trim() !== '') {
      this.addMessage('user', message);
      input.value = '';

      // Simular una respuesta del bot después de 1 segundo
      setTimeout(() => {
        this.addMessage('bot', 'Esta es una respuesta automática del bot.');
      }, 1000);
    }
  }

  addMessage(sender, message) {
    const chatContent = this.shadowRoot.querySelector('#chat-content');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    if (sender === 'bot') {
      messageElement.innerHTML = `
        <img src="path/to/bot-avatar.png" alt="Bot">
        <div class="message-content">${message}</div>
      `;
    } else {
      messageElement.innerHTML = `
        <div class="message-content">${message}</div>
      `;
    }

    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
}

customElements.define('chat-bot', Chatbot);
