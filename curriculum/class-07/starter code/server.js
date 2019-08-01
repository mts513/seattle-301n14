'use strict';

// application dependencies
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// configure environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// tell our express server to start listening on port PORT
app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));


// routes
app.get('/location', (req, res) => {
    try {
        const geoData = require('./data/geo.json');
        const location = new Location(geoData, req.query.data);
        console.log(location);
        res.send(location);
    } catch (error) {
        console.log("There was an error in /location get");
        res.status(500).send("Server error", error);
    }

});

//Helper Functions

function Location(data, res) {
    this.search_query = res;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
  }