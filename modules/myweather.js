'use strict';

const axios = require ('axios');

async function getWeather(request, response, next){
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=6`;

    let weatherData = await axios.get(weatherUrl);

    let parsedData = weatherData.data.data.map(day => new Forecast(day));
    response.status(200).send(parsedData);
  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
    response.status(500).send(error.message);
  }
}

class Forecast {
  constructor(dayObj) {
    this.description = dayObj.weather.description;
    this.datetime = dayObj.datetime;
  }
}


module.exports = getWeather;
