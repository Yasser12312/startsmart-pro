// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Lägg till exempel-frågor som kan klickas på
    const exampleQuestions = document.querySelectorAll('.example-question');
    exampleQuestions.forEach(question => {
        question.addEventListener('click', () => {
            chatInput.value = question.textContent.replace(/['"]/g, '');
            sendMessage();
        });
    });

    // Chat funktionalitet
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            chatInput.value = '';
            
            // Simulera bot-svar med en kort fördröjning
            setTimeout(() => {
                const botResponse = getBotResponse(message.toLowerCase());
                addMessage(botResponse, 'bot-message');
            }, 500);
        }
    }

    function addMessage(text, className) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        
        // Scrolla till senaste meddelandet
        messageElement.scrollIntoView({ behavior: 'smooth' });
    }

    function getBotResponse(message) {
        if (message.includes('aktiebolag')) {
            return 'För att registrera ett aktiebolag behöver du:\n1. Aktiekapital (minst 25 000 kr)\n2. Bolagsordning\n3. Registrera hos Bolagsverket';
        } else if (message.includes('moms')) {
            return 'Vid första momsdeklarationen är det viktigt att:\n1. Ha alla kvitton sparade\n2. Registrera ingående och utgående moms\n3. Skicka in i tid';
        } else if (message.includes('försäkring')) {
            return 'Grundläggande försäkringar för företag:\n1. Ansvarsförsäkring\n2. Egendomsförsäkring\n3. Avbrottsförsäkring';
        }
        return 'Jag kan hjälpa dig med frågor om företagsregistrering, moms och försäkringar. Vad vill du veta mer om?';
    }

    // Theme toggle
    let isDarkMode = true;
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('light-mode');
        themeToggle.querySelector('.theme-icon').textContent = isDarkMode ? '🌙' : '☀️';
    });

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
}); 