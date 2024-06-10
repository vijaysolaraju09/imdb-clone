document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetch(`https://www.omdbapi.com/?apikey=7a54ec1a&s=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "True") {
            displayResults(data.Search);
          } else {
            searchResults.innerHTML = "<p>No results found</p>";
          }
        });
    } else {
      searchResults.innerHTML = "";
    }
  });

  function displayResults(movies) {
    searchResults.innerHTML = "";
    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.classList.add("movie-item");
      movieItem.innerHTML = `
          <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div >
              <h5 >${movie.Title}</h5>
              <p >Year: ${movie.Year}</p>
              <button  onclick='addToFavourites(${JSON.stringify(
                movie
              )})'>Add to Favourites</button>
              <a href="movie.html?id=${movie.imdbID}">View Details</a>
            </div>
          </div>
        `;
      searchResults.appendChild(movieItem);
    });
  }
});

function addToFavourites(movie) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  favourites.push(movie);
  console.log(movie.imdbID);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  alert("Movie added to favourites");
}
