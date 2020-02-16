require("dotenv").config();
let moment = require("moment");
var Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let axios = require("axios");

var action = process.argv[2];
//Create a variable to handle the full search agrument
let args = "";

switch (action) {
    case "concert-this":
        concertThis();
        break;
}

function getArgs() {
        //Grab all the command line arguments
        let nodeArgs = process.argv;
        //Loop through the process.argv arguments starting at the 3rd index
        for (let i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                args = args + "%20" + nodeArgs[i];
            } else {
                args += nodeArgs[i];
            }
        }
}

//concert-this function
function concertThis() {
    getArgs();
    //Create the query url for bandsintown.com
    let queryUrl = "https://rest.bandsintown.com/artists/" + args + "/events?app_id=codingbootcamp";

    //Make axios GET request
    axios.get(queryUrl).then(
        function (response) {
            //Only the first index of the bandsintown JSON response has the artist name so I grab the artist name and log it to the console
            let artistName = response.data[0].artist.name;
            console.log(`Upcoming concerts for ${artistName}:`);
            //Loop through the response data and log city, region, country, venue and date for each result found
            let responseLength = response.data.length;
            for (let i=0;i<responseLength;i++) {
                let city = response.data[i].venue.city;
                let region = response.data[i].venue.region;
                let country = response.data[i].venue.country;
                let venue = response.data[i].venue.name;
                let date = "";
                date = moment(response.data[i].datetime).format('MM/DD/YYYY');
                console.log(`${city}, ${region}, ${country} at ${venue} on ${date}`);    
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