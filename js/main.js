var httpRequest = new XMLHttpRequest();

$(document).ready(function () {
  $('#searchForm').on('submit', function (event) {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });
});

var getMovies = function (searchText) {
  httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + searchText + '&apikey=f0368a61');
  httpRequest.send(null);
};

httpRequest.onload = function () {
  
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      
      var apiResponse = JSON.parse(httpRequest.responseText).Search;
      var movieSpots = $('#movieSpots');
      var output = '';

      apiResponse.forEach(function(movie) {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}"> 
              <h5><a class="btn btn-primary" href="https://www.imdb.com/title/${movie.imdbID}">${movie.Title}</a></h5>
              <p>Year: ${movie.Year}</p>
              <p>Type: ${movie.Type}</p>
            </div>
          </div>
        `;
      });
      movieSpots.html(output);
    }
  };
}

httpRequest.onerror = function () {
  console.log(httpRequest.statusText);
};