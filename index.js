import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios   from "axios";

const app  = express();
const port = 3000;
const KEY  = process.env.OPENWEATHER_KEY;

if (!KEY) {
  console.error("❌ Missing OPENWEATHER_KEY in .env");
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
  let current, title, error;

  try {
    const url = 
      `https://api.openweathermap.org/data/2.5/weather`
      + `?q=${encodeURIComponent(location)}`
      + `&units=metric`
      + `&appid=${KEY}`;

    const { data } = await axios.get(url);
    current = {
      temp:       data.main.temp,
      feels_like: data.main.feels_like,
      description:data.weather[0].description,
      icon:       data.weather[0].icon
    };
    title = `Weather for ${data.name}, ${data.sys.country}`;
  } catch (err) {
    error = err.response?.data?.message || err.message;
    title = "Error";
  }

  res.render("index", { location, title, current, error });
});

// 4) Start server
app.listen(port, () => 
  console.log(`Listening on http://localhost:${port}`)
);
