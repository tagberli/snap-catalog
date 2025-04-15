/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */


// All the data is taken from the popular website named "myanimelist.net"
// here is the dataset I made myself it is pretty long :(
const animeList = [
  {
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/1517/100633.jpg",
    gif: "https://media1.tenor.com/m/CYYG2F1rZxcAAAAd/ao-t-attack-on-titan.gif",
    rating: 9.05,
    popularity: 2431574,
    genre: "Action, Drama, Fantasy",
    total_episodes: 94
  },
  {
    title: "Sousou no Frieren",
    image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
    gif: "https://media1.tenor.com/m/mgN_JjdTDzYAAAAd/anime-spell.gif",
    rating: 9.30,
    popularity: 1089020, // number of members who added it to their watchlist
    genre: "Action, Adventure, Shounen",
    total_episodes: 28
  },
  // Add more entries as needed
];






// START OF CATALOG OPERATIONS
let myWatchlist = [];
let currentList = 'all';

// WATCHLIST OPERATIONS
function switchList(listType) {
  currentList = listType;

  const header = document.querySelector("header");
  const pageTitle = document.getElementById("page-title");

  if (listType === 'all') {
    pageTitle.innerText = "Anime Catalog";
    header.style.backgroundColor = "#1F1F1F"; //
  } else {
    pageTitle.innerText = "My Watchlist";
    header.style.backgroundColor = "#4A90E2";
  }

  displayList();
}

function addToWatchlist(animeTitle) {
  const anime = animeList.find(a => a.title === animeTitle);
  if (!myWatchlist.some(a => a.title === animeTitle)) {
    myWatchlist.push(anime);
  }
  displayList();
}

function removeFromWatchlist(animeTitle) {
  myWatchlist = myWatchlist.filter(anime => anime.title !== animeTitle);
  displayList();
}

function getCurrentList() {
  return currentList === 'all' ? [...animeList] : [...myWatchlist];
}



// SORTING OPERATION
function sortList(byRating) {
  const list = getCurrentList();

  if (byRating == true){
    list.sort((a, b) => b.rating - a.rating);
  } else{
    list.sort((a, b) => b.popularity - a.popularity);
  }
  displayList(list);
}

// FILTERING OPERATION
function filterByGenre(genre) {
  const list = getCurrentList();
  const filtered = genre ? list.filter(anime => anime.genre.includes(genre)) : list;
  displayList(filtered);
}



// DISPLAY HELPER FUNCTION
function displayList(data = null) {
  const container = document.getElementById('anime-list');
  container.innerHTML = '';
  const list = data || getCurrentList();

  list.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';

    const inWatchlist = myWatchlist.some(a => a.title === anime.title);
    const buttonText = inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist';
    const buttonClass = inWatchlist ? 'remove' : '';
    const buttonAction = inWatchlist ? `removeFromWatchlist('${anime.title}')` : `addToWatchlist('${anime.title}')`;

    // Create image element
    const img = document.createElement('img');
    img.src = anime.image; // Default image
    img.alt = anime.title;
    img.className = 'anime-img';

    // Hover effect to switch image to GIF
    img.addEventListener('mouseenter', () => {
      img.src = anime.gif; // Replace with GIF on hover
    });

    img.addEventListener('mouseleave', () => {
      img.src = anime.image; // Revert to original image when hover ends
    });

    // Insert title
    const title = document.createElement('h3');
    title.innerText = anime.title;

    // Add other anime details
    const rating = document.createElement('p');
    rating.innerHTML = `<strong>Rating:</strong> ${anime.rating}`;

    const popularity = document.createElement('p');
    popularity.innerHTML = `<strong>Popularity:</strong> ${anime.popularity}`;

    const genre = document.createElement('p');
    genre.innerHTML = `<strong>Genre:</strong> ${anime.genre}`;

    const episodes = document.createElement('p');
    episodes.innerHTML = `<strong>Number of Episodes:</strong> ${anime.total_episodes}`;

    // Create and append the button
    const button = document.createElement('button');
    button.className = buttonClass;
    button.onclick = () => eval(buttonAction); // Dynamically call the add/remove function
    button.innerText = buttonText;

    // Append everything to the card
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(rating);
    card.appendChild(popularity);
    card.appendChild(genre);
    card.appendChild(episodes);
    card.appendChild(button);

    // Add the card to the container
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayList();
});
