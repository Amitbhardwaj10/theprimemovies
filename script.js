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
const urlParams = new URLSearchParams(window.location.search);
const genreId = urlParams.get('id');
const movieId = urlParams.get('movieId');
const MOVIE_DETAIL_URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
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
const sideBarLogo = document.querySelector("#menuContainer .logo");
const menuContainer = document.getElementById("menuContainer");
const trendingMovies = document.getElementById("trendingMovies");
const trendingTVShows = document.getElementById("trendingTVShows");
const ratedMovies = document.getElementById("ratedTVShows");
const ratedTVShows = document.getElementById("ratedMovies");
const showPassIcon = document.getElementById("pass-show");
const hidePassIcon = document.getElementById("pass-hide");
const inputPassword = document.getElementById("passInp");
const allMovies = document.getElementById("allMovies");
const allTvShows = document.getElementById("allTvShows");
const overlay = document.querySelector(".overlay");
const mediaDetailsSection = document.getElementById("mediaDetailsSection");
const trailerSection = document.getElementById("trailerSection");



// This function is used to fetch the media from the API. And also shows the media.
const fetchAndShowMedia = async (url, container) => {
	const resp = await fetch(url);
	const respData = await resp.json();
	respData.results = respData.results.slice(0, 12);
	if (respData.results == 0) {
		searchResultHeading.innerText = "No Results Found!";
	}
	showMedia(respData.results, container);
};

// Here, calling the fetchAndShowMedia function to fetch all the types of media
// to show on the DOM.
fetchAndShowMedia(getApiUrl("trending/movie/day"), trendingMovies);
fetchAndShowMedia(getApiUrl("movie/top_rated"), ratedMovies);
fetchAndShowMedia(getApiUrl("tv/top_rated"), ratedTVShows);
fetchAndShowMedia(getApiUrl("trending/tv/day"), trendingTVShows);

// This function has implemented to show the media. And this function is  calling inside the fetchAndShowMedia() function.
const showMedia = async (data, container) => {
	for (const movie of data) {
		
		const { title, original_name, poster_path, release_date, vote_average, first_air_date, id } = movie;
		const video = document.createElement("a");
		video.setAttribute("id", "videoElem");
		video.href = `./play.html?movieId=${id}`;
		const li = video.appendChild(document.createElement("li"));
		li.classList.add("video");
		li.innerHTML = `
      <i>
        <svg xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 19V5l11 7l-11 7Z"/>
        </svg>
      </i>
      <div class="poster-div">
        <img loading="lazy" id="poster" src="${poster_path ? IMG_URL + poster_path : "assets/Images/image.avif"
			}" alt="" />
      </div>
      <div class="video-details">
        <div>
          <p id="title">${title ? title : original_name}</p>
        </div>
        <div>
          <p id="year">${release_date || first_air_date
				? release_date
					? release_date.slice(0, 4)
					: first_air_date.slice(0, 4)
				: 2017
			}
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
		container?.appendChild(video);
	}
};

// Setting the genres to DOM

const setGenre = () => {
	genres.forEach((genre) => {
		let li = document.createElement("li");
		let a = document.createElement("a");
		li.appendChild(a);
		a.setAttribute("title", `${genre.name}`);
		a.id = genre.id;
		a.innerText = genre.name;
		genreContainer?.append(li);
	});
};

setGenre(); // Calling the setGenre function

// Search Movies
formTag.addEventListener("keyup", () => {
	searchMediaContainer.innerHTML = "";
	const searchTerm = searchInput.value;
	if (searchTerm) {
		fetchAndShowMedia(
			SEARCH_URL + "&query=" + searchTerm,
			searchMediaContainer
		);
	} else {
		searchResultHeading.innerHTML = "Invalid input!";
		searchResultHeading.style.color = "var(--primary-red)";
	}
});

// Search Result Heading
searchInput.addEventListener("keyup", (e) => {
	// console.log(e);
	if (searchInput.value !== "") {
		searchResultHeading.innerText = `Search Result for "${searchInput.value}"`;
		searchResultHeading.style.color = "";
		searchResultHeading.style.opacity = 1;
	} else {
		searchResultHeading.innerText = ``;
	}
});

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
	menuIcon.addEventListener("click", () => {
		menuContainer.style.display = "flex";
		menuContainer.style.transform = "translateX(0%)";
		menuClose.style.display = "block";
		sideBarLogo.style.display = "block";
		overlay.style.right = "0%";
	});
	menuClose.addEventListener("click", () => {
		menuContainer.style.transform = "translateX(-100%)";
		menuClose.style.display = "none";
		sideBarLogo.style.display = "none";
		overlay.style.right = "-100%";
	});
};

BurgerMenu();

// ----------------- All Movies & TV shows page ----------------


const findMediaWithGenre = () => {
	document.querySelectorAll("#genreContainer li a").forEach((genreEl) => {
		genreEl.addEventListener("click", () => {
			localStorage.setItem('genreId', genreEl.id);
			genreEl.setAttribute('href', './movies.html?id='+genreEl.id);
			});
		});
};

findMediaWithGenre();

const fetchAllResults = async (url, container) => {
	const resp = await fetch(url);
	const respData = await resp.json();
	if (respData.results == 0) {
		searchResultHeading.innerText = "No Results Found!";
	}
	showMedia(respData.results, container);
};

if(genreId) {
	getSelectedGenreDetail(genreId, allMovies)
} else {
	fetchAllResults(getApiUrl("/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc"), allMovies);
	fetchAllResults(getApiUrl("/discover/tv?include_adult=false&=false&page=1&sort_by=popularity.desc"), allTvShows);
}

function getSelectedGenreDetail(id, container) {
	selectedGenre = id;
	 if (selectedGenre) {
		 container.innerHTML = "";
		 fetchAllResults(getApiUrl("/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc") + `&with_genres=${selectedGenre}`, container);
		 container.style.height = "unset";
		 document.querySelector('body').style.overflowY = "unset";
		 localStorage.clear();
	 }else {
		 container.innerHTML = ` <h2>No Result found for "${genreEl.innerText}" genre!</h2>`;
		 container.style.color = "white"
		 container.style.height = "100vh";
		 document.querySelector('body').style.overflowY = "hidden";
	 }
}

// Login Page -> Password - Show / Hide

hidePassIcon?.addEventListener('click', () => {
			inputPassword.type = "text";
			hidePassIcon.style.display = "none";
			showPassIcon.style.display = "block";
	})

showPassIcon?.addEventListener('click', () => {
		inputPassword.type = "password";
		hidePassIcon.style.display = "block";
		showPassIcon.style.display = "none";
	
})


// Play.html -> JS


// In this function, getting the full details of media


const getGenres = (genrelist, sep = " ") => {
	const newGenreList = [];
	for(const {name} of genrelist) {
		newGenreList.push(name);
	}
	let spanArray = [];
	newGenreList.forEach(name => {
		const span = document.createElement('li');
		span.innerText = name;
		spanArray.push(span.outerHTML);
	})

		return spanArray.join(sep);
}

const getMovieDetails = (async (url) => {
	const resp = await fetch(url);
	const respData = await resp.json();	

	const {original_title, original_language, overview, runtime, release_date, vote_average, poster_path, backdrop_path, videos, genres} = respData;

	let videoKey = '';
	Array.from(videos.results).forEach((video) => {
		video.type === 'Trailer' ? videoKey = video.key : "error";
	});

	trailerSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)), url( https://image.tmdb.org/t/p/original/${backdrop_path})`;
	trailerSection.style.backgroundSize = "cover";
	trailerSection.style.backgroundPosition = "center";
	// trailerSection.innerHTML = `
	// 	<iframe src="https://www.youtube.com/embed/${videoKey}?&theme=dark&color=white&rel=0" frameborder="0 allowfullscreen="1" loading="lazy"> 
	// 	</iframe>
	// `
	mediaDetailsSection.innerHTML = `
	<div class="movie-info" id="movieInfo">
	<h2>${original_title}</h2>
				<div class="inline-items">
					<span class="rating">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M12 17.3l-3.7 2.825q-.275.225-.6.213t-.575-.188q-.25-.175-.387-.475t-.013-.65L8.15 14.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6q.1-.275.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 4.475q.3 0 .563.188t.387.537L14.4 10h4.475q.35 0 .6.213t.35.487q.1.275.025.6t-.375.525L15.85 14.4l1.425 4.625q.125.35-.012.65t-.388.475q-.25.175-.575.188t-.6-.213L12 17.3Z"
							/>
						</svg>
						<span>${vote_average.toFixed(1)}</span>
					</span>
					<span class="runtime">${runtime} min</span>
					<span class="year">${release_date.slice(0,4)}</span>
				</div>
		
				<div class="genres">${getGenres(genres)}</div>
		
				<p class="overview">${overview}</p>
		
				<div class="details">
					<span>Subtitle </span>
					<span>English[cc]</span>
				</div>
		
				<div class="details">
					<span>Language </span>
					<span>${original_language}</span>
				</div>
		
				<div class="details">
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 16 16"
						>
							<g fill="currentColor">
								<path
									d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
								/>
								<path
									d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"
								/>
							</g>
						</svg>
						Tags:
					</span>
					<div>${getGenres(genres, ", ")}</div>
				</div>
			</div>
			<!-- **************************************************************** -->
				<div class="movie-side-info">
				<figure>
					<img src="${IMG_URL + poster_path}" alt="" />
				</figure>
		
				<ul>
					<li><strong>Initial release: </strong> ${release_date}</li>
					<li><strong>Director:</strong> Carles Torras</li>
					<li><strong>Production:</strong> digiflex</li>
					<li><strong>Screenplay:</strong> Carles Torras</li>
				</ul>
				</div>
		
		`
})(MOVIE_DETAIL_URL);




