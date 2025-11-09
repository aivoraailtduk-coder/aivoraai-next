import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/", async (req, res) => {
  try {
    const { message, model } = req.body;
    const completion = await client.chat.completions.create({
      model: model || "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are Aivora Clinical Assistant. Respond in Arabic with scientific precision and always include a disclaimer.",
        },
        { role: "user", content: message },
      ],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
