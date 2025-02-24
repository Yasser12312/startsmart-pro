// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Lägg till theme toggle knapp i DOM
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.innerHTML = `
        <button class="theme-button">
            <span class="theme-icon">🌙</span>
        </button>
    `;

    // Chat interface
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.innerHTML = `
        <div class="chat-messages">
            <p class="welcome-message">👋 Välkommen! Några exempel på vad du kan fråga:</p>
            <p class="example-question">"Hur registrerar jag ett aktiebolag?"</p>
            <p class="example-question">"Vad behöver jag tänka på vid första momsdeklarationen?"</p>
            <p class="example-question">"Vilka försäkringar behöver mitt företag?"</p>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Ställ din fråga om företagande här..." />
            <button class="send-button">Skicka</button>
        </div>
    `;

    // Lägg till styling för chat
    const style = document.createElement('style');
    style.textContent = `
        .chat-messages {
            padding: 1rem;
            margin-bottom: 1rem;
        }
        .welcome-message {
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        .example-question {
            color: var(--primary-color);
            cursor: pointer;
            margin: 0.5rem 0;
        }
        .chat-input {
            display: flex;
            gap: 1rem;
            padding: 1rem;
        }
        .chat-input input {
            flex: 1;
            padding: 0.8rem;
            border: none;
            border-radius: 0.3rem;
            background: var(--background-dark);
            color: var(--text-light);
        }
        .send-button {
            padding: 0.8rem 1.5rem;
            background: var(--primary-color);
            border: none;
            border-radius: 0.3rem;
            color: white;
            cursor: pointer;
        }
        .theme-button {
            background: transparent;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    const sendButton = document.querySelector('.send-button');
    const chatInput = document.querySelector('.chat-input input');

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Lägg till användarens meddelande
            addMessage(message, 'user-message');
            
            // Simulera bot-svar
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot-message');
            }, 1000);
            
            chatInput.value = '';
        }
    }

    function addMessage(text, className) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getBotResponse(message) {
        const responses = {
            'aktiebolag': 'För att registrera ett aktiebolag behöver du:\n1. Aktiekapital (minst 25 000 kr)\n2. Bolagsordning\n3. Registrera hos Bolagsverket',
            'moms': 'Vid första momsdeklarationen är det viktigt att:\n1. Ha alla kvitton sparade\n2. Registrera ingående och utgående moms\n3. Skicka in i tid',
            'försäkring': 'Grundläggande försäkringar för företag:\n1. Ansvarsförsäkring\n2. Egendomsförsäkring\n3. Avbrottsförsäkring'
        };

        // Förenkla sökning genom att konvertera till lowercase
        const lowercaseMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowercaseMessage.includes(key)) {
                return response;
            }
        }
        
        return 'Jag kan hjälpa dig med frågor om företagsregistrering, moms och försäkringar. Vad vill du veta mer om?';
    }

    // Theme toggle
    let isDarkMode = true;
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        updateTheme(isDarkMode);
        themeToggle.querySelector('.theme-icon').textContent = 
            isDarkMode ? '🌙' : '☀️';
    });

    function updateTheme(isDark) {
        document.documentElement.style.setProperty('--background-dark', isDark ? '#1a1f2e' : '#ffffff');
        document.documentElement.style.setProperty('--text-light', isDark ? '#ffffff' : '#000000');
        document.documentElement.style.setProperty('--card-background', isDark ? '#1e2536' : '#f3f4f6');
    }
}); 