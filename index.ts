import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.get('/', async (req, res) => {
  const prompt = req.query.prompt as string;
  if (!prompt) {
    return res.status(400).send('Prompt is required');
  }

  try {
    const result = await model.generateContent(prompt);
    res.json({
        prompt,
        result: result.response,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
