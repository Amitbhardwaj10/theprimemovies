// Variables Declaration
const API_KEY = "7d044af280f94d734e7af2003908f26f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const searchDiv = document.getElementById("searchDiv");
let searchMediaContainer = document.getElementById("searchMedia");
const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");
const searchCloseIcon = document.getElementById("searchCloseIcon");
const formTag = document.getElementById("formTag");
const searchResultHeading = document.getElementById("searchResultHeading");
const genreContainer = document.getElementById("genreContainer");
const SEARCH_URL = `${BASE_URL}/search/multi?api_key=${API_KEY}`;
const getApiUrl = (category) =>
  `${BASE_URL}/${category}?language=en-US&api_key=${API_KEY}`;
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const menuIcon = document.getElementById("menuIcon");
const menuClose = document.getElementById("menuClose");
const menuContainer = document.getElementById("menuContainer");

const trendingMovies =  document.getElementById("trendingMovies");
const trendingTVShows =  document.getElementById("trendingTVShows");
const ratedMovies =  document.getElementById("ratedTVShows");
const ratedTVShows =  document.getElementById("ratedMovies");
console.log(document.getElementById("trendingMovies"));

// This function is used to fetch the media from the API. And also shows the media.
const fetchAndShowMedia = async (url, container) => {
  const resp = await fetch(url);
  const respData = await resp.json();
  respData.results = respData.results.slice(0,12);
  if(respData.results == 0){
    searchResultHeading.innerText = "No Results Found!";
  }
  showMedia(respData.results, container);
};

// Here, calling the fetchAndShowMedia function to fetch all the types of media 
// to show on the DOM.
fetchAndShowMedia(getApiUrl("/trending/all/day"), trendingMovies);
fetchAndShowMedia(getApiUrl("/trending/tv/day"), trendingTVShows);
fetchAndShowMedia(getApiUrl("/movie/top_rated"), ratedMovies);
fetchAndShowMedia(getApiUrl("/tv/top_rated"), ratedTVShows);

// This function has implemented to show the media. And this function is  calling inside the fetchAndShowMedia() function. 
const showMedia = async (data, container) => {
  for (const movie of data) {
    const {
      title,
      original_name,
      poster_path,
      release_date,
      vote_average,
      first_air_date,
    } = movie;
    const video = document.createElement("a");
    video.href = "./play.html";
    const li = video.appendChild(document.createElement("li"));
    li.classList.add("video");
    li.innerHTML = `
      <i>
        <svg xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 19V5l11 7l-11 7Z"/>
        </svg>
      </i>
      <div class="poster-div">
        <img id="poster" src="${poster_path ? (IMG_URL + poster_path) : "assets/Images/image.avif"}" alt="" />
      </div>
      <div class="video-details">
        <div>
          <p id="title">${title ? title : original_name}</p>
        </div>
        <div>
          <p id="year">${ (release_date || first_air_date) ? (release_date ? release_date.slice(0, 4) : first_air_date.slice(0,4)): 2017}
          </p>
          <span id="rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 17.3l-3.7 2.825q-.275.225-.6.213t-.575-.188q-.25-.175-.387-.475t-.013-.65L8.15 14.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6q.1-.275.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 4.475q.3 0 .563.188t.387.537L14.4 10h4.475q.35 0 .6.213t.35.487q.1.275.025.6t-.375.525L15.85 14.4l1.425 4.625q.125.35-.012.65t-.388.475q-.25.175-.575.188t-.6-.213L12 17.3Z"/>
            </svg>
            ${vote_average ? vote_average.toFixed(1) : 5.6}
          </span>
        </div>
      </div>
    `;
    container.appendChild(video);
  }
};


// Setting the genres to DOM
const setGenre = () => {
  genres.forEach((genre) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    li.appendChild(a);
    a.setAttribute("title", "${genre.name}");
    a.id = genre.id;
    a.innerText = genre.name;
    genreContainer.append(li);
  });
};

setGenre(); // Calling the setGenre function

const findMediaWithGenre = (data) => {
  for(const media of data) {
    const {genre_ids} = media;
    document.querySelectorAll("#genreContainer li a").forEach(genreEl => {
      genreEl.addEventListener('click', () => {
        const clickedGenreId = genreEl.id;
        const filteredMedia = data.filter(media => {
          // return media.genre_ids.includes(parseInt(clickedGenreId, 10))
          console.log(media);
        }); 
            console.log(filteredMedia);
            fetchAndShowMedia(getApiUrl(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`), allMovies);
            fetchAndShowMedia(getApiUrl(`discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`), allTvShows);
      })
    })
  }
}


// Search Movies
formTag.addEventListener('submit',(e) => {
  e.preventDefault();
  searchMediaContainer.innerHTML = "";
  const searchTerm = searchInput.value;
  if (searchTerm) {
    fetchAndShowMedia(SEARCH_URL + "&query=" + searchTerm, searchMediaContainer);
  } else {
    searchResultHeading.innerHTML = "Invalid input!";
    searchResultHeading.style.color = "var(--primary-red)";
  }
});

// Search Result Heading
searchInput.addEventListener('input', (e) => {
  // console.log(e);
    if(searchInput.value !== ""){
      searchResultHeading.innerText = `Search Result for "${searchInput.value}"`;
      searchResultHeading.style.color = "";
      searchResultHeading.style.opacity = 1;
    }else {
      searchResultHeading.innerText = ``;
    }

})

// SEARCH BUTTON
searchIcon.addEventListener("click", () => {
  searchDiv.style.opacity = 1;
  searchDiv.style.pointerEvents = "all";
  document.body.style.overflowY = "hidden";
});

// CLOSE BUTTON 
searchCloseIcon.addEventListener("click", () => {
  searchDiv.style.opacity = 0;
  searchDiv.style.pointerEvents = "none";
  document.body.style.overflowY = "";
  searchMediaContainer.innerText = "";
  searchInput.value = "";
  searchResultHeading.innerText = "";
});


// Burger menu
const BurgerMenu = () => {
  menuIcon.addEventListener('click', () => {
      menuContainer.style.display = "flex";
      menuContainer.style.transform = "translateX(0%)";
      menuClose.style.display = "block";
      menuIcon.style.display = "none";
    })
  menuClose.addEventListener('click', () => {
    menuClose.style.display = "none";
    menuIcon.style.display = "block";
    menuContainer.style.transform = "translateX(-100%)";
})
}

BurgerMenu();


// ----------------- All Movies ----------------

const allMovies = document.getElementById("allMovies");
const allTvShows = document.getElementById("allTvShows");


const fetchAllResults = async (url, container) => {
  const resp = await fetch(url);
  const respData = await resp.json();
  if(respData.results == 0){
    searchResultHeading.innerText = "No Results Found!";
  }
  showMedia(respData.results, container);
  findMediaWithGenre(respData.results);
};

fetchAllResults(getApiUrl("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"), allMovies);
fetchAllResults(getApiUrl("/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"), allTvShows);