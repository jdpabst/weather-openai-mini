import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import OpenAI from 'openai';

const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
});

const router = express.Router();
const prisma = new PrismaClient();

router.get('/health', (_req, res) => {
 return res.status(200).send('ok')
})

router.get('/users', async (req: Request, res: Response) => {
 try {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
 } catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
 }
});

router.get("/weather/:city", async (req, res) => {
 const city = req.params.city;


 try {
  // 1. Get lat/lon
  const geoRes = await fetch(
   `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
  );
  const geoData = await geoRes.json();

  if (!geoData[0]) return res.status(404).json({ error: "City not found" });

  const { lat, lon } = geoData[0];

  // 2. Get weather by lat/lon
  const weatherRes = await fetch(
   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
  );
  const weatherData = await weatherRes.json();
  const temp = weatherData.main.temp;
  const feels_like = weatherData.main.feels_like;
  const description = weatherData.weather[0].description;

  const response = await client.responses.create({
   model: "gpt-4.1-mini",
   input: `The temperature is ${temp}F, the feels like is ${feels_like} and the description is ${description}. Suggest and outfit in 1-2 sentences.`
  });

  res.json({
   outfit: response.output_text
  });

 } catch (err) {
  console.error(err);  // <-- log full error to terminal
  res.status(500).json({ error: err instanceof Error ? err.message : "Something went wrong" });
 }
});


export default router;