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

    // Förbättrad svarsdatabas
    const chatResponses = {
        aktiebolag: {
            keywords: ['aktiebolag', 'ab', 'starta företag', 'registrera företag'],
            response: `För att registrera ett aktiebolag behöver du:
1. Aktiekapital (minst 25 000 kr)
2. Bolagsordning
3. Styrelse och revisor
4. Registrera hos Bolagsverket
5. Ansöka om F-skatt och moms hos Skatteverket

Vill du veta mer om något specifikt steg?`
        },
        moms: {
            keywords: ['moms', 'momsdeklaration', 'momsredovisning', 'skattedeklaration'],
            response: `Vid momshantering är detta viktigt:
1. Registrera dig för moms hos Skatteverket
2. Spara alla kvitton och fakturor
3. Bokför ingående och utgående moms korrekt
4. Lämna momsdeklaration i tid
5. Betala eller få återbetalning av moms

Behöver du mer information om momssatser eller redovisningsperioder?`
        },
        försäkring: {
            keywords: ['försäkring', 'försäkringar', 'försäkra'],
            response: `Viktiga försäkringar för företag:
1. Ansvarsförsäkring
2. Egendomsförsäkring
3. Avbrottsförsäkring
4. Rättsskyddsförsäkring
5. Sjukavbrottsförsäkring

Vill du veta mer om någon specifik försäkring?`
        },
        bokföring: {
            keywords: ['bokföring', 'bokföra', 'redovisning', 'räkenskaper'],
            response: `Grundläggande om bokföring:
1. Löpande bokföring är lagkrav
2. Spara alla verifikationer i 7 år
3. Upprätta årsbokslut/årsredovisning
4. Använd bokföringsprogram eller anlita redovisningskonsult
5. Följ god redovisningssed

Behöver du tips på bokföringsprogram eller mer information?`
        }
    };

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            chatInput.value = '';
            
            // Visa laddningsindikator
            const loadingMessage = addMessage('Tänker...', 'bot-message loading');
            
            try {
                const response = await fetch('http://localhost:3000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message })
                });
                
                const data = await response.json();
                
                // Ta bort laddningsmeddelande och visa svaret
                loadingMessage.remove();
                addMessage(data.response, 'bot-message');
            } catch (error) {
                loadingMessage.remove();
                addMessage('Tyvärr kunde jag inte behandla din fråga just nu. Försök igen senare.', 'bot-message error');
            }
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
        const lowercaseMessage = message.toLowerCase();
        
        // Söker igenom alla kategorier efter matchande nyckelord
        for (const category in chatResponses) {
            if (chatResponses[category].keywords.some(keyword => 
                lowercaseMessage.includes(keyword))) {
                return chatResponses[category].response;
            }
        }

        // Om inget specifikt nyckelord hittas
        if (lowercaseMessage.includes('hej') || lowercaseMessage.includes('hallå')) {
            return `Hej! Jag kan hjälpa dig med information om:
- Företagsregistrering
- Moms och bokföring
- Försäkringar
- Andra företagsfrågor

Vad vill du veta mer om?`;
        }

        // Standardsvar om ingen matchning hittas
        return `Jag förstår inte riktigt din fråga. Jag kan hjälpa dig med:
1. Hur man startar aktiebolag
2. Momshantering och bokföring
3. Företagsförsäkringar

Kan du omformulera din fråga eller välja ett av dessa ämnen?`;
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