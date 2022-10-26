'use strict';

console.log('yasss! Our first server!');

// REQUIRES//

const express = require('express');
require('dotenv').config();
let cityData = require('./data/weather.json');
const cors = require('cors');


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



app.get('/weather', (request, response, next) => {



  let cityName = request.query.cityName;
  let lat = Math.floor(request.query.lat);
  let lon = Math.floor(request.query.lon);

  try {
    let forecastData = cityData.find(city => city.city_name === cityName);

    let dataToSend = forecastData.data.map(day => new Forecast(day));
    response.status(200).send(dataToSend);


  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
    response.status(500).send(error.message);
  }
});

class Forecast {
  constructor(dayObj) {
    this.name = dayObj.weather.description;
    this.datetime = dayObj.datetime;

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
