# WeatherApp

[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/weather-app/ci.yml?branch=main)](https://github.com/yourusername/weather-app/actions) [![npm version](https://img.shields.io/npm/v/weather-app)](https://www.npmjs.com/package/weather-app) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![OpenWeather](https://img.shields.io/badge/API-OpenWeather-2ecc71)](https://openweathermap.org/api) [![Demo](https://img.shields.io/badge/Live%20Demo-View-brightgreen)](https://weather-app-demo.example.com)

A simple, responsive weather application built with Node.js, Express, EJS, and the OpenWeather API. Provides current temperature, feels-like temperature, and weather conditions for any city.

---

## Features
- Search weather by city name  
- Displays current temperature, "feels like" temperature, and textual description  
- Weather icon sourced from OpenWeather  
- Responsive, mobile-friendly dark theme  
- Error handling for invalid locations  

## Prerequisites
- **Node.js** v14 or later  
- **npm** (comes with Node.js)  
- An **OpenWeather** API key (free tier)  

## Installation
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
cp .env.example .env