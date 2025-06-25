import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

dotenv.config();

/* ---------- Load prompt configurations ---------- */
const prompts = JSON.parse(
  fs.readFileSync(path.resolve('prompts/womensHealth.json'), 'utf-8')
);

/* ---------- Init Express ---------- */
const app = express();
app.use(cors());
app.use(express.json());

/* ---------- OpenAI client ---------- */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ---------- Health check ---------- */
app.get('/', (_, res) => res.send({ status: 'online' }));

/* ---------- Chat endpoint ---------- */
app.post('/api/chat', async (req, res) => {
  try {
    let { messages, profile = 'default' } = req.body;

    /* Validate payload */
    if (!Array.isArray(messages)) {
      return res.status(400).send({ error: 'messages must be an array' });
    }

    /* Inject system prompt if missing */
    const systemPrompt = prompts[profile] || prompts.default;
    if (!messages.some(m => m.role === 'system')) {
      messages = [systemPrompt, ...messages];
    }

    /* Call OpenAI */
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages,
      temperature: 0.7
    });

    res.send(completion.choices[0].message);
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).send({ error: 'AI service failed, try again.' });
  }
});

/* ---------- Start server ---------- */
const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`🩺 AI Health API listening at http://localhost:${port}`)
);
