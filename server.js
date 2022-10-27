'use strict';

console.log('yasss! Our first server!');

// REQUIRES//

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovie = require('./modules/movies');

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

app.get('/weather', getWeather);

app.get('/movies', getMovie);

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


//ERROR HANDLING//
// ERRORS
// Handle any errors



//SERVER START//
app.listen(PORT, () => console.log(`We are up and running on port ${PORT}`));
