document.addEventListener("DOMContentLoaded", () => {
  const favouritesList = document.getElementById("favouritesList");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  function displayFavourites() {
    favouritesList.innerHTML = "";
    if (favourites.length === 0) {
      favouritesList.innerHTML = "<p>No favourite movies added yet.</p>";
    } else {
      favourites.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <div class="movie-card">
              <img src="${movie.Poster}" alt="${movie.Title}">
              <div>
                <h5>${movie.Title}</h5>
                <p>Year: ${movie.Year}</p>
                <button onclick="removeFromFavourites('${movie.imdbID}')">Remove from Favourites</button>
                <a href="movie.html?id=${movie.imdbID}">View Details</a>
              </div>
            </div>
          `;
        favouritesList.appendChild(movieItem);
      });
    }
  }

  displayFavourites();
});

function removeFromFavourites(imdbID) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  location.reload();
}

function showDetails(movie) {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  window.location.href = "movie.html";
}
