'use strict';

const axios = require('axios');

let cache = require('./cache.js');

// TODO: need create a key - for data to store
// TODO: if the things exist AND is in a valid timeframe ...send that data
// TODO: if the the things DO NOT exist - call API & cache the returned data

async function getMovie(request, response, next) {
  try {
    let cityName = request.query.query;

    // *** KEY CREATION FOR DATA TO STORE***
    let key = cityName + 'movie';

    // *** IF data exist AND is in a valid timeframe(cache[key].timestamp) ... send that data
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {

      console.log('Cache hit');
      response.status(200).send(cache[key].data);

    } else {
      console.log('Cache miss');
      let cityName = request.query.query;
      let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&include_adult=false`;

      let movieData = await axios.get(movieUrl);

      let parsedData = movieData.data.results.map(movie => new Movie(movie));

      // ** ADD API return to CACHE
      cache[key] = {
        data: parsedData,
        timestamp: Date.now()
      };

      response.status(200).send(parsedData);

    }

  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.releasedate = movieObj.release_date;
    this.popularity = movieObj.popularity;
    this.posterpath = movieObj.poster_path;
  }
}

module.exports = getMovie;
