require("dotenv").config();
let moment = require("moment");
var Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let axios = require("axios");
var fs = require("fs");

var action = process.argv[2];
//Create a variable to handle the full search agrument
let args = "";

switch (action) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doIt();
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
    return args;
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
            for (let i = 0; i < responseLength; i++) {
                //If city is blank 
                let city = response.data[i].venue.city;
                let region = response.data[i].venue.region;
                let country = response.data[i].venue.country;
                let venue = response.data[i].venue.name;
                let date = "";
                date = moment(response.data[i].datetime).format('MM/DD/YYYY');
                console.log('-----------------------------------');
                console.log(i);
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
function spotifyThis() {
    getArgs();
    if (args == "") {
        args = "The Sign";
    }
    spotify
        .search({
            type: 'track',
            query: args
        })
        .then(function (response) {
            console.log(response.tracks.items.length);
            console.log(typeof (response.tracks.items));
            let items = response.tracks.items;
            for (let i = 0; i < items.length; i++) {
                let artists = items[i].artists[0].name;
                let song = items[i].name;
                let preview = "";
                if (items[i].preview_url == null) {
                    preview = "No preview link available";
                } else {
                    preview = items[i].preview_url;
                }
                let album = items[i].album.name;
                console.log('-----------------------------------');
                console.log(i);
                console.log('artist(s): ' + artists);
                console.log('song name: ' + song);
                console.log('preview song: ' + preview);
                console.log('album: ' + album);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

// `movie-this`
function movieThis() {

    getArgs();
    //Create the query url for obmdb
    if (args == "") {
        args = "Mr. Nobody";
    }
    let queryUrl = "https://www.omdbapi.com/?t=" + args + "&apikey=trilogy";

    //Make axios GET request
    axios.get(queryUrl).then(
        function (response) {
            let res = response.data;
            let title = res.Title;
            let year = res.Year;
            let imdbRating = res.imdbRating;
            let rtRating = res.Ratings[1].Value;
            let country = res.Country;
            let language = res.Language;
            let plot = res.Plot;
            let actors = res.Actors;
            console.log('-----------------------------------');
            console.log('Title:' + title);
            console.log('Year: ' + year);
            console.log('IMDB Rating: ' + imdbRating);
            console.log('Rotten Tomatoes Rating: ' + rtRating);
            console.log('Countries Filmed In: ' + country);
            console.log('Lanuage: ' + language);
            console.log('Plot: ' + plot);
            console.log('Actors: ' + actors);


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

// `do-what-it-says`
function doIt() {
    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        let action = dataArr[0];
        let query = dataArr[1];

        spotify
            .search({
                type: 'track',
                query: query
            })
            .then(function (response) {
                console.log(response.tracks.items.length);
                console.log(typeof (response.tracks.items));
                let items = response.tracks.items;
                for (let i = 0; i < items.length; i++) {
                    let artists = items[i].artists[0].name;
                    let song = items[i].name;
                    let preview = "";
                    if (items[i].preview_url == null) {
                        preview = "No preview link available";
                    } else {
                        preview = items[i].preview_url;
                    }
                    let album = items[i].album.name;
                    console.log('-----------------------------------');
                    console.log(i);
                    console.log('artist(s): ' + artists);
                    console.log('song name: ' + song);
                    console.log('preview song: ' + preview);
                    console.log('album: ' + album);
                }
            })
            .catch(function (err) {
                console.log(err);
            });

    });
}