import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const KEY = process.env.OPENWEATHER_KEY;
const NEWS_KEY = process.env.NEWSAPI_KEY;

if (!KEY) {
  console.error("❌ Missing OPENWEATHER_KEY in .env");
  process.exit(1);
}
if (!NEWS_KEY) {
  console.error("❌ Missing NEWSAPI_KEY in .env");
  process.exit(1);
}

// 1) Serve static files
app.use(express.static("public"));

// 2) EJS setup
app.set("view engine", "ejs");
app.set("views", "./views");

// 3) Main route
app.get("/", async (req, res) => {
  const location = req.query.location || "Richmond,VA,US";
  let current = null;
  let hourly = [];
  let newsArticles = [];
  let title = "";
  let error = null;

  try {
    // 1a) Current weather
    const weatherUrl =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(location)}` +
      `&units=imperial` +
      `&appid=${KEY}`;
    const { data: w } = await axios.get(weatherUrl);
    current = {
      temp: w.main.temp,
      feels_like: w.main.feels_like,
      description: w.weather[0].description,
      icon: w.weather[0].icon,
    };
    title = `Weather for ${w.name}, ${w.sys.country}`;

    // 1b) 5-day / 3-hour forecast (first 8 slots ≈ next 24h)
    const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(location)}` +
      `&units=imperial` +
      `&appid=${KEY}`;
    const { data: f } = await axios.get(forecastUrl);
    hourly = f.list.slice(0, 8).map(entry => ({
      time: entry.dt * 1000,
      temp: Math.round(entry.main.temp),
      icon: entry.weather[0].icon
    }));

    // 1c) Top 2 US headlines
    const newsUrl =
      `https://newsapi.org/v2/top-headlines` +
      `?country=us` +
      `&pageSize=2` +
      `&apiKey=${NEWS_KEY}`;
    const { data: newsData } = await axios.get(newsUrl);
    newsArticles = newsData.articles;
  } catch (err) {
    error = err.response?.data?.message || err.message;
    title = "Error";
  }

  res.render("index", {
    location,
    title,
    current,
    hourly,
    newsArticles,
    error,
    KEY
  });
});

// 4) Start server
app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`)
);
