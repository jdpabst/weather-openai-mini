import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

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

  res.json({
   temp: weatherData.main.temp,
   feels_like: weatherData.main.feels_like,
   description: weatherData.weather[0].description,
  });
 } catch (err) {
  res.status(500).json({ error: "Something went wrong" });
 }
});


export default router;