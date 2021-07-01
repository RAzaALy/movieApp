AOS.init({
  offset: 125,
  duration: 600,
});

const totalPages = 500;
let start = true;
let page = randomPage();

let API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1995706620a80431488272f6e5dd4fab&page=${page}`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=1995706620a80431488272f6e5dd4fab&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const background = document.querySelector(".backImg");

// /reload to change the page /

window.addEventListener("load", randomPage);
function randomPage() {
  let rPage = Math.floor(Math.random() * 15 + 1);
  return rPage;
}

// Get Initial Movies

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);

  // console.log(data.results);
}
function randomNumber() {
  return Math.floor(Math.random() * 20 + 1);
}

sliderImages = [
  "/3SDoquTjagne0jWzdxEu31KFLmw.jpg",
  "/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg",
  "/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg",
  "/qDQEQbgP3v7B9IYLAUcYexNrVYP.jpg",
  "/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg",
  "/r17jFHAemzcWPPtoO0UxjIX0xas.jpg",
  "/srYya1ZlI97Au4jUYAktDe3avyA.jpg",
  "/9ns9463dwOeo1CK1JU2wirL5Yi1.jpg",
  "/tTlAA0REGPXSZPBfWyTW9ipIv1I.jpg",
  "/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg",
];
let i = 0;
let ref = setInterval(initialSlider, 2500);
function initialSlider() {
  if (i > sliderImages.length - 1) {
    i = 0;
  }
  background.src = IMG_PATH + sliderImages[i];
  i++;
}

function showMovies(movies) {
  if (movies){
    if (start){
      initialSlider();
      start = false;
    } else {
      clearInterval(ref);
      let randomImg = randomNumber();
      if (movies[randomImg].backdrop_path){
        background.src = IMG_PATH + movies[randomImg].backdrop_path;
      } else {
        background.src = `https://image.tmdb.org/t/p/w1280/uhYoytlNaq46dG81wLmHqaSuzWu.jpg`;
      }
    }
    // console.log(IMG_PATH + movies[0].backdrop_path)
    // console.log(movies[0].backdrop_path)

    main.innerHTML = ``;
    movies.forEach((movie) => {
      const { title, poster_path, vote_average, overview,backdrop_path} = movie;
      if (poster_path && backdrop_path){
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.setAttribute("data-aos", "zoom-in");
        movieEl.innerHTML = `
        <p>${backdrop_path}</p>
        <img src=" ${IMG_PATH + poster_path}" alt="poster"
        />
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(
          vote_average
        )}"> <i class="fas fa-star"></i>  ${vote_average}</span>
          </div>
          <div class="overview">
          <h3>Overview</h3>
          ${overview}
          </div>
          `;
        main.appendChild(movieEl);
      }
    });
  }
  //AddEventListenerOn Poster //
  const cards = document.querySelectorAll('.movie');
  cards.forEach((element,idx)=>{
    element.addEventListener('click',()=>{
      clearInterval(ref);
      if(element.children[0].innerText === null){
        background.src =   `https://image.tmdb.org/t/p/w1280/uhYoytlNaq46dG81wLmHqaSuzWu.jpg`;
      }else{
        background.src = IMG_PATH + element.children[0].innerText;
      }
    })
  })
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}





// Search Functionality 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm, true);
    search.value = "";
  } else {
    location.reload();
  }
});









// /Pagination in the movie app /
// For Top Btn and pagination

const rightBtn = document.getElementById("next");
const leftBtn = document.getElementById("prev");

rightBtn.addEventListener("click", (e) => {
  page++;
  if (page > totalPages) {
    page = 1;
  }
  API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1995706620a80431488272f6e5dd4fab&page=${page}`;
  getMovies(API_URL);
});

leftBtn.addEventListener("click", (e) => {
  page--;
  if (page <= 0) {
    page = 500;
  }
  const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1995706620a80431488272f6e5dd4fab&page=${page}`;
  getMovies(API_URL);
});

function removeActive() {
  anchor.forEach((a) => {
    a.classList.remove("active");
  });
}

const anchor = document.querySelectorAll("a");
anchor.forEach((a) => {
  a.addEventListener("click", (e) => {
    removeActive();
    a.classList.add("active");
    // console.log(a.innerText);
    pageNo = +a.innerText;
    console.log(pageNo);
    const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2502288e66a71d6e071668a85fbebfab&page=${pageNo}`;
    getMovies(API_URL);
  });
});


const topBtn = document.getElementById("myBtn");
topBtn.addEventListener("click", (e) => {
  scrollToTop()
});

window.addEventListener('scroll',()=>{
topBtn.classList.toggle('active',window.scrollY > 100)
})

function scrollToTop(){
  window.scrollTo({
    top : 0,
    behavior: 'smooth'
  })
  
}


