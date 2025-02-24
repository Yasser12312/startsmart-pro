require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors({
    origin: 'https://yasser12312.github.io',
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `Du är en expert på företagande i Sverige och arbetar som AI-assistent för StartSmart Sverige. 
Du specialiserar dig på att hjälpa människor starta och driva företag i Sverige.
Du har djup kunskap om:
- Svenska företagsformer (AB, enskild firma, HB, KB)
- Registreringsprocesser hos Bolagsverket
- Skatteregler och momshantering
- Bokföring och redovisning
- Företagsförsäkringar
- Arbetsgivaransvar
- Svenska lagar och regler för företag

Ge alltid konkreta, praktiska råd med referenser till relevanta myndigheter när det är lämpligt.
Svara alltid på svenska och var professionell men vänlig i tonen.`;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ett fel uppstod vid kommunikation med AI' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 