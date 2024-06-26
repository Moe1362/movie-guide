let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetc data from API

const getMovie = () => {
  let movieName = movieNameRef.value;
  let apiUrl = `http://www.omdbapi.com/?i=tt3896198&t=${movieName}&apikey=${myApiKey}`;

  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  } else {
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //If movie exists in the database
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src= ${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="./assets/images/star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                </div>
                </div>
                <h3>Plot: </h3>
                <p>${data.Plot}</p>
                <h3>Casts: </h3>
                <p>${data.Actors}</p>

                
                `;
        }
        //If movie does not exist in the database
        else {
          result.innerHTML = `<h3 class='msg'>${data.
            Error}</h3>`;
        }
      }) 
      //If there is an error
      .catch(() => {
        result.innerHTML = `<h3 class='msg'>An error occured. Please try again</h3>`;
      
      })

  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
