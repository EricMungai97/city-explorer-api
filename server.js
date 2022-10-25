'use strict';

console.log('yasss! Our first server!');

// REQUIRES//

const express = require('express');
require('dotenv').config();
const cors = require('cors');

console.log('another one');


//once express is in we need to use it//
//app === server
const app = express();

app.use(cors());


//define my port
const PORT = process.env.PORT || 3002;

// ENDPOINTS//

//Base endpoint

app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}, welcome to my server!`);
});

//catch all and should live at the bottom

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

//ERROR HANDLING//


//SERVER START//
app.listen(PORT, ()=> console.log(`We are up and running on port ${PORT}`));
