import '../src/index';

describe('Chatbot', () => {
  beforeEach(() => {
    document.body.innerHTML = '<chat-bot token="test-token"></chat-bot>';
  });

  test('el chatbot se inicializa correctamente', () => {
    const chatbot = document.querySelector('chat-bot');
    expect(chatbot).not.toBeNull();
    expect(chatbot.token).toBe('test-token');
  });

  test('el chatbot muestra el token correctamente', () => {
    const chatbot = document.querySelector('chat-bot');
    const shadowRoot = chatbot.shadowRoot;
    const container = shadowRoot.querySelector('.chatbot-container');
    expect(container.textContent).toContain('test-token');
  });
});
