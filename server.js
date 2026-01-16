require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", {
  });
});

app.get('/weather', async (req, res) => {
  try {
    const zip = req.query.zip;  // ?zip=10001
    if (!zip) {
      return res.render('index');
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apiKey}`;

    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === '404') {
      return res.render('index', { error: `Invalid ZIP: ${zip}` });
    }

    res.render('weather/show', { weatherData });
  } catch (error) {
    res.render('index', { error: 'Weather service error' });
  }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
