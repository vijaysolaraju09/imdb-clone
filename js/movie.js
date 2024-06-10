document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (movieId) {
    fetch(`https://www.omdbapi.com/?apikey=7a54ec1a&i=${movieId}`)
      .then((response) => response.json())
      .then((movie) => {
        displayMovieDetails(movie);
      });
  }

  function displayMovieDetails(movie) {
    console.log(movie);
    const movieDetails = document.getElementById("movieDetails");
    movieDetails.innerHTML = `
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}" alt="${movie.Title}" class="img-fluid">
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Released:</strong> ${movie.Released}</p>
            <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        `;
  }
});
