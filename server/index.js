import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

//configure openai
const configuration = new Configuration({
  organization: "org-EC7Z51MJ9jQ7YDf04drq9rKr",
  apiKey: process.env.API_KEY, // VISIT .env AND MAKE CHANGES
});
const openai = new OpenAIApi(configuration); //our account is connected to our server

//listening
app.listen("3080", () => console.log("listening to port 3080"));

//dummy route
app.get("/", (req, res) => {
  res.send("Hello Gopi");
});

//post route for making requests
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-devinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ message: response.data.choices[0].value });
  } catch (error) {
    console.log(error);
    res.send(error).status(400);
  }
});
