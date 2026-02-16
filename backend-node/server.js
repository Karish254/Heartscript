import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Set up storage
const adapter = new JSONFile('db.json');
const defaultData = { pages: [] };
const db = new Low(adapter, defaultData);
await db.read();

// Ensure data is initialized
if (!db.data) {
    db.data = defaultData;
    await db.write();
}

const generateRomanticMessage = (page) => {
    const { recipientName, creatorName, occasion, relationship } = page;
    const occ = occasion || "special day";
    const rel = relationship || "someone special";

    const templates = [
        `My dearest ${recipientName}, on this ${occ}, I wanted to tell you how much you mean to me. You are my ${rel} and my everything. With all my love, ${creatorName}.`,
        `To the most beautiful soul, ${recipientName}: Every moment with you feels like a dream. Happy ${occ}! You are the best ${rel} anyone could ask for. Forever yours, ${creatorName}.`,
        `Hey ${recipientName}, just a little surprise to remind you that I love you more than words can say. This ${occ} is just another reason to celebrate us. You're my favorite ${rel}. Love, ${creatorName}.`,
        `To my beloved ${recipientName}, you are the light of my life. This ${occ} is a celebration of the love we share. You are truly the perfect ${rel}. All my love, ${creatorName}.`,
        `${recipientName}, words can't capture how much I adore you. Happy ${occ}! Being your ${rel} is the greatest gift. Forever and always, ${creatorName}.`,
        `Dearest ${recipientName}, you make every day feel like a fairytale. On this ${occ}, I promise to love you more than yesterday but less than tomorrow. You're my one and only ${rel}. Love, ${creatorName}.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
};

app.post('/api/pages', async (req, res) => {
    const { creatorName, recipientName, theme } = req.body;

    // Simple validation
    if (!creatorName || !recipientName) {
        return res.status(400).json({ error: 'Creator name and recipient name are required' });
    }

    const page = {
        ...req.body,
        id: uuidv4(),
        slug: req.body.slug || uuidv4().substring(0, 8),
        createdAt: new Date().toISOString()
    };

    if (!page.message) {
        page.message = generateRomanticMessage(page);
    }

    db.data.pages.push(page);
    await db.write();
    res.status(201).json(page);
});

app.get('/api/pages/:slug', (req, res) => {
    const { slug } = req.params;
    const page = db.data?.pages?.find(p => p.slug === slug);
    if (page) {
        res.json(page);
    } else {
        res.status(404).json({ error: 'Surprise not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Romantic Backend (Node.js) running on http://localhost:${PORT}`);
});
