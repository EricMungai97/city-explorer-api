'use strict';

console.log('yasss! Our first server!');

// REQUIRES//

const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');

console.log('another one');


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




app.get('/weather', (request, response, next) => {

  try {

    let searchQuery = request.query;
    let lat = request.query.lat;
    let lon = request.query.lon;

    let forecastData = weatherData.find(cityObj => cityObj.city_name.toLowerCase() === searchQuery.toLowerCase());
    let dataToSend = forecastData.data.map(details => new Forecast(details));
    response.status(200).send(dataToSend);

    console.log(dataToSend);
  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
    response.status(500).send(error.message);
  }
});

class Forecast {
  constructor(city) {
    this.name = `Low of ${city.low_temp}, high of ${city.max_temp} with ${city.weather.description}`;
    this.datetime = city.datetime;

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
