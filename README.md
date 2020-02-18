# Liri
*By: RFinkley*

###Overview
This project creates a command line Node.js application that provides four commands that allows a use to retrieve concert, movie, and song information. The last command runs a command from the *random.txt* file. This assignment required the use of several node packages including:
* axios
* dotenv
* moment
* node-spotify-api

Below is a description of the functionality provided by each of the commands.

## concert-this
The __concert-this__ command takes a band or artist name as an argument and searches the bandsintown api for upcoming concerts for the given band or artist.

__concert-this__ returns:
* Venue name
* Venue location
* Date of event

*code Example:* `node liri.js concert-this Maroon 5`
![concert-this screenshot](/assets/images/concert_this_result.png)

## spotify-this-song
The __spotify-this-song__ command takes a song and returns the artist and album information. If no song is provided the command returns "This Sign" by Ace of Base.

__spotify-this-song__ returns:
* Artist(s)
* Song name
* Preview link (if available)
* Album name

*code Example:* `node liri.js spotify-this-song Hotel California`
![spotify-this-song screenshot](/assets/images/spotify_this_song_result.png)

*Results of spotify-this-song with no user input* `node liri.js spotify-this-song`
![spotify-this-song no input screenshot](/assets/images/spotify_this_song_noinput_result.png)

## movie-this
Thie __movie-this__ command takes a movie title and returns information about the given movie.

__movie-this__ returns:
* Title
* Release Year
* IMDB rating
* Rotten Tomatoes rating
* Country
* Movie language
* Plot
* Actors

*code Example:* `node liri.js movie-this The Matrix`
![movie-this screenshot](/assets/images/movie_this_result.png)

*Results of movie-this with no user input* `node liri.js movie-this`
![movie-this no input screenshot](/assets/images/movie_this_noinput_result.png)

