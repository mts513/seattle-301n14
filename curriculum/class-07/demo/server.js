'use strict';

// application dependencies
const express = require('express');
const superagent = require('superagent');
const app = express();

//add cors and superagent
const cors = require('cors');
app.use(cors());

// configure environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// tell express to start listening on port PORT
app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));

// routes
//this can be refactored.  let's move some of this out to it's own function. and re-write
// app.get('/location', (req, res) => {
//     try {
//         const geoData = require('./data/geo.json');
//         const location = new Location(req.query.data, geoData);
//         res.send(location);
//     } catch (error) {
//         console.log("There was an error in /location get");
//         res.status(500).send("Status:500. Server error in /location");
//     }
// });
app.get('/location', (request, response) => {
    serchToLatLong(request.query.data)
    .then(location => response.send(location));
})

app.get('/weather', (request, response) => {
    try {
      const weatherData = getWeather();
      response.send(weatherData);
    }
    catch(error) {
      console.error(error);
      response.status(500).send('Status: 500. Server error in /weather');
    }
  });

// app.get('/weather', (request, response) => {})

//Helper Functions

//location constructor
function Location(query, data) {
    this.search_query = query;
    this.formatted_query = data.body.results[0].formatted_address;
    this.latitude = data.body.results[0].geometry.location.lat;
    this.longitude = data.body.results[0].geometry.location.lng;
  }
//weather constructor
  function Weather(day) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toString().slice(0, 15);
  }


  function getWeather() {
    const darkskyData = require('./data/darksky.json');
    const weatherSummaries = [];
    darkskyData.daily.data.forEach(day => {
      weatherSummaries.push(new Weather(day));
    });
    return weatherSummaries;
  }
  
  function serchToLatLong(query){
      const url =`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;
      return superagent.get(url)
      .then(res => {
        return new Location(query, res);

      })
     
  }