import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import OpenAI from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// listeninng
app.listen("3080", () => console.log("listening on port 3080"));

// dummy route to test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//post route for making requests
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${message}` }],
      model: "gpt-3.5-turbo",
      max_tokens: 200,
    });
    console.log(response.choices[0].message.content);

    res.json({ message: response.choices[0].message.content });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
