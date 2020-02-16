require("dotenv").config();
var Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let axios = require("axios");

var action = process.argv[2];

switch (action) {
    case "concert-this":
        concertThis();
        break;
}

//concert-this
function concertThis() {

    let nodeArgs = process.argv;

    let artist = "";

    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "%20" + nodeArgs[i];
        } else {
            artist += nodeArgs[i];
        }
    }

    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log(`Upcoming concerts for ${artist}:`);
            console.log(response.data.length);
            let responseLength = response.data.length;
            // console.log(response.data[1].venue.name.toString());
            for (let i=0;i<responseLength;i++) {
                var concertInfo = `${response.data[i].city}, ${response.data[i].country} at ${response.data[i].name}`; 
                console.log(`${response.data[i].venue.city.toString()}, ${response.data[i].venue.country.toString()} at ${response.data[i].venue.name.toString()} ${response.data[i].datetime}`);      
            }
        }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}



// `spotify-this-song`
// `movie-this`
// `do-what-it-says`