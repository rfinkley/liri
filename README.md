# Liri
*By: RFinkley*

###Overview
This project creates a command line Node.js application that provides four commands that allows a use to retrieve concert, movie, and song information. The last command runs a command from the *random.txt* file. This assignment required the use of several node packages including:
* axios
* dotenv
* moment
* node-spotify-api

Below is a description of the functionality provided by each of the commands.

__concert-this__
The 'concert-this' command takes a band or artist name as an argument and searches the bandsintown api for upcoming concerts for the given band or artist.

*code Example:* `node liri.js concert-this Maroon 5`
![concert-this screenshot](/assets/images/concert_this_result.png)



