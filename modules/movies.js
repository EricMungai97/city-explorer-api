'use strict';

const axios = require ('axios');


async function getMovie(request, response, next){
  try {
    let cityName = request.query.query;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&include_adult=false`;

    let movieData = await axios.get(movieUrl);

    let parsedData = movieData.data.results.map(movie => new Movie(movie));
    response.status(200).send(parsedData);

  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
    response.status(500).send(error.message);
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
