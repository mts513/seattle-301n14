'use strict';

// we need to use the dotenv npm package 
require('dotenv').config();

//as well as express!
const express = require('express');
const app = express();

// get the specified port from our environmental variables
// if there is nothing specified, use port 3000
const PORT = process.env.PORT || 3000;

// tell the server to look in the public folder
// for any routes or static files such as html, images etc...
app.use(express.static('./public'));

// a route when we navigate to localhost:3000/hello.
// we will get a 200 message plus a "Hello" when we
// are done. 
app.get('/hello', (request, response) =>{
    response.status(200).send("Hello");
});

// another route that returns a response of "JosieCat"
app.get('/amandasCat', (request,response) =>{
    response.send("JosieCat");
});

// make a get call to the /josie route and 
// return the data located in the cat.json file
// located in our data folder
app.get('/josie', (request,response) =>{
    try{
        let josieData = require('./data/cat.json');
        //here is where we might want to re-shape the data from cat.json to an object example
        let kitty = new Cat(josieData)
        response.send(kitty);
    } catch(error){
        console.log("There was an error!");
        response.status(500).send("the server broke");
    }

})

//Let's make a Constructor, that shapes our incoming .json into a formatted object
function Cat(query) {
    this.name = query.name;
    this.age = query.age;
    this.whiskers = query.whiskers;
}

//when we connect to the port, tell us what port we are listening too
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
