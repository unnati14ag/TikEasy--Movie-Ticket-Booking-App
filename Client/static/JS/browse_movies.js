// Example:
let movieData = [];
const url = "http://127.0.0.1:3000/login/";

async function slot_timing(movie) {
    const response = await fetch(url + "movies/timeslot?function=fetch", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });

    location.assign(url + "movies/timeslot?function=timeslotPage");
}

// Display the movie details by default
document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch(url + "movies?function=fetch", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    movieData = await response.json();
    let user = movieData.user;
    movieData = movieData.movies;

    const movieList = document.querySelector(".movie-list");
    const userDetails = document.getElementById("user_details");

    movieData.forEach((movie) => {
        const movieTile = document.createElement("div");
        movieTile.classList.add("movie-tile");
        movieTile.onclick = function(){
            slot_timing(movie);
        };

        movieTile.innerHTML = `
            <h2>${movie.movieName}</h2>
            <p>Release Date: ${movie.releaseDate}</p>
            <p>Theater: ${movie.theater}</p>
            <p>Location: ${movie.location}</p>
        `;
        movieList.appendChild(movieTile);
    });

    // Loading user details
    userDetails.innerHTML = `
        <h3>User</h3>
        <br>
        <p>${String(user)}</p>
        <br>
    `;
});

// User icon click event to show/hide user popup
const userIcon = document.getElementById("userIcon");
const userPopup = document.getElementById("userPopup");

// Search and logout buttons
const searchButton = document.getElementById("search");
const logoutButton = document.getElementById("logoutButton");

// Display the search query details
searchButton.addEventListener("click", function() {
    const searchText = document.getElementById("searchText").value.toLowerCase();
    const movieList = document.querySelector(".movie-list");
    movieList.innerHTML = "";

    let result = false;
    movieData.forEach((movie) => {
        let name = movie.movieName.toLowerCase();
        let theaterName = movie.theater.toLowerCase();
        let location = movie.location.toLowerCase();
        let releaseDate = movie.releaseDate.toLowerCase();

        if (name.includes(searchText) || theaterName.includes(searchText) ||
            location.includes(searchText) || releaseDate.includes(searchText)) {

            const movieTile = document.createElement("div");
            movieTile.classList.add("movie-tile");
            movieTile.onclick = function(){
                slot_timing(movie);
            };

            movieTile.innerHTML = `
                <h2>${movie.movieName}</h2>
                <p>Release Date: ${movie.releaseDate}</p>
                <p>Theater: ${movie.theater}</p>
                <p>Location: ${movie.location}</p>
            `;
            movieList.appendChild(movieTile);
            result = true;
            return;
        }
    });

    if(result == false) {
        const movieTile = document.createElement("div");
        movieTile.classList.add("movie-tile");
        movieTile.innerHTML = `<p>No matches found for your search...</p>`;
        movieList.appendChild(movieTile);
    }
});

userIcon.addEventListener("click", () => {
    userPopup.style.display = userPopup.style.display === "block" ? "none" : "block";
});

// Close user popup when clicking outside of it
document.addEventListener("click", (event) => {
    if (event.target !== userIcon && event.target !== userPopup) {
        userPopup.style.display = "none";
    }
});

// Close user popup when the logout button is clicked
logoutButton.addEventListener("click", function () {
    userPopup.style.display = "none";
    // Add logout logic here
    location.assign(url.replace("login/", "") + "logout");
});
