'use strict';

console.log('yasss! Our first server!');

// REQUIRES//

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


//once express is in we need to use it//
//app === server
const app = express();

// middleware to share resources across the internet
app.use(cors());


// define my port for my server to listen on
const PORT = process.env.PORT || 3002;

// ENDPOINTS//

// Base endpoint - proof of life
// .get() is an express method
// it correlates to axios.get
// the first argument is a URL in quotes,
// the 2nd argument is a callback function

app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server');
});



app.get('/weather', async (request, response, next) => {

  let lat = request.query.lat;
  let lon = request.query.lon;

  try {
    let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=6`;

    let weatherData = await axios.get(weatherUrl);

    let parsedData = weatherData.data.data.map(day => new Forecast(day));
    response.status(200).send(parsedData);
  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
    response.status(500).send(error.message);
  }
});

class Forecast {
  constructor(dayObj) {
    this.description = dayObj.weather.description;
    this.datetime = dayObj.datetime;

  }

}

app.get('/movies', async (request, response, next) => {
  let cityName = request.query.query;

  try {
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&include_adult=false`;

    let movieData = await axios.get(movieUrl);

    let parsedData = movieData.data.results.map(movie => new Movie(movie));
    response.status(200).send(parsedData);

  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
    response.status(500).send(error.message);
  }
});

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.releasedate = movieObj.release_date;
    this.popularity = movieObj.popularity;
    this.posterpath = movieObj.poster_path;

  }

}

//catch all and should live at the bottom

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


//ERROR HANDLING//
// ERRORS
// Handle any errors


//SERVER START//
app.listen(PORT, () => console.log(`We are up and running on port ${PORT}`));
