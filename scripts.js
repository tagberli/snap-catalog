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


// All the data was scraped from "myanimelist.net"
// here is the dataset, I selected each gif myself, took me a while :(
const animeList = [
  {
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/1517/100633.jpg",
    gif: "https://media1.tenor.com/m/919Uh3CGwzoAAAAd/aot-hange.gif",
    rating: 9.05,
    popularity: 2431574,
    genre: "Action, Drama, Fantasy",
    total_episodes: 94
  },
  {
    title: "Ping Pong the Animation",
    image: "https://cdn.myanimelist.net/images/anime/1586/146565.jpg",
    gif: "https://media1.tenor.com/m/dvDPhrJqnDQAAAAd/ping-pong-the-animation-op.gif",
    rating: 8.62,
    popularity: 416031,
    genre: "Award Winning, Drama, Sports",
    total_episodes: 11
  },
  {
    title: "Violet Evergarden Movie",
    image: "https://cdn.myanimelist.net/images/anime/1825/110716.jpg",
    gif: "https://media1.tenor.com/m/VwZhH28s2sAAAAAd/violet-evergarden-anime.gif",
    rating: 8.85,
    popularity: 670193,
    genre: "Award Winning, Drama",
    total_episodes: 1
  },
  {
    title: "Your Name",
    image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
    gif: "https://media1.tenor.com/m/7dGpAI5sKzwAAAAd/kimi-no-na-wa-anime.gif",
    rating: 8.83,
    popularity: 2884421,
    genre: "Award Winning, Drama",
    total_episodes: 1
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
  {
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
    gif: "https://media1.tenor.com/m/CiPgIh1Gl8UAAAAd/edward-elric-fma.gif",
    rating: 9.10,
    popularity: 3507574,
    genre: "Action, Adventure, Drama, Fantasy",
    total_episodes: 64
  },
  {
    title: "Steins;Gate",
    image: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
    gif: "https://media1.tenor.com/m/5I0RFT2IH9UAAAAC/steins-gate-anime.gif",
    rating: 9.07,
    popularity: 2686894,
    genre: "Drama, Sci-Fi, Suspense, Psychological, Time Travel",
    total_episodes: 24
  },
  {
    title: "Monster",
    image: "https://cdn.myanimelist.net/images/anime/10/18793.jpg",
    gif: "https://media1.tenor.com/m/P-pq7eBvmd4AAAAd/johan-liebert-monster.gif",
    rating: 8.88,
    popularity: 1223325,
    genre: "Drama, Mystery, Suspense, Adult Cast, Psychological, Seinen",
    total_episodes: 74
  },
  {
    title: "Mob Psycho 100",
    image: "https://cdn.myanimelist.net/images/anime/8/80356.jpg",
    gif: "https://media1.tenor.com/m/R_aP7mMCmfMAAAAC/mobpsycho100-anime.gif",
    rating: 8.49,
    popularity: 2198548,
    genre: "Action, Comedy, Supernatural",
    total_episodes: 12
  },
  {
    title: "Death Note",
    image: "https://cdn.myanimelist.net/images/anime/1079/138100.jpg",
    gif: "https://media1.tenor.com/m/DzfDOzNpRb0AAAAd/death-note-light-yagami.gif",
    rating: 8.62,
    popularity: 4088267,
    genre: "Supernatural, Suspense, Psychological",
    total_episodes: 37
  },
  
  
  // Add more entries as needed
];


// Global variables to track the current display state
let myWatchlist = [];       // User's saved watchlist
let currentList = 'all';    // Tracks whether 'all' or 'watchlist' is being viewed

// SWITCH BETWEEN CATALOG AND WATCHLIST VIEW
function switchList(listType) {
  currentList = listType;

  const header = document.querySelector("header");
  const pageTitle = document.getElementById("page-title");

  // Update UI to reflect selected list
  if (listType === 'all') {
    pageTitle.innerText = "Anime Catalog";
    header.style.backgroundColor = "#FFFFFF";
  } else {
    pageTitle.innerText = "My Watchlist";
    header.style.backgroundColor = "#4A90E2";
  }

  displayList(); // Refresh view with appropriate data
}

// ADD ANIME TO WATCHLIST
function addToWatchlist(animeTitle) {
  const anime = animeList.find(a => a.title === animeTitle);

  // Avoid duplicates
  if (!myWatchlist.some(a => a.title === animeTitle)) {
    myWatchlist.push(anime);
  }

  updateCardUI(animeTitle);
}

// REMOVE ANIME FROM WATCHLIST
function removeFromWatchlist(animeTitle) {
  myWatchlist = myWatchlist.filter(anime => anime.title !== animeTitle);

  // If in 'all' view, just update that card; otherwise, re-display list
  if (currentList === "all") {
    updateCardUI(animeTitle);
    return;
  }
  displayList();
}

// UPDATE UI FOR A SPECIFIC CARD (button label and event)
function updateCardUI(animeTitle) {
  const cards = document.querySelectorAll('.anime-card');
  cards.forEach(card => {
    const title = card.querySelector('h3')?.innerText;
    if (title === animeTitle) {
      const button = card.querySelector('button');
      const inWatchlist = myWatchlist.some(a => a.title === animeTitle);

      // Update button appearance and behavior
      button.innerText = inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist';
      button.className = inWatchlist ? 'remove' : '';
      button.onclick = () => {
        inWatchlist ? removeFromWatchlist(animeTitle) : addToWatchlist(animeTitle);
      };
    }
  });
}

// RETURN CURRENTLY VISIBLE LIST (either full catalog or watchlist)
function getCurrentList() {
  return currentList === 'all' ? [...animeList] : [...myWatchlist];
}

// SORT THE LIST BASED ON RATING OR POPULARITY
function sortList(byRating) {
  if (byRating) {
    // Sort by rating, descending
    (currentList === 'all' ? animeList : myWatchlist).sort((a, b) => b.rating - a.rating);
  } else {
    // Sort by popularity, descending
    (currentList === 'all' ? animeList : myWatchlist).sort((a, b) => b.popularity - a.popularity);
  }
  displayList();
}

// FILTER LIST BY GENRE (case-sensitive includes match)
function filterByGenre(genre) {
  const list = getCurrentList();
  const filtered = genre ? list.filter(anime => anime.genre.includes(genre)) : list;
  displayList(filtered);
}

// SEARCH BAR LISTENER FOR TITLE MATCHES
document.getElementById("searchBar").addEventListener("input", () => {
  const list = getCurrentList();
  const query = document.getElementById("searchBar").value.toLowerCase().trim();

  if (query === "") {
    displayList();
  } else {
    // Allow partial word matching in title
    const filtered = list.filter(anime => {
      const words = anime.title.toLowerCase().split(/\s+/);
      return words.some(word => word.includes(query));
    });

    // Sort results alphabetically by title
    filtered.sort((a, b) => a.title.localeCompare(b.title));
    displayList(filtered);
  }
});

// CREATE A CARD ELEMENT FOR EACH ANIME
function createAnimeCard(anime) {
  const card = document.createElement('div');
  card.className = 'anime-card';

  const inWatchlist = myWatchlist.some(a => a.title === anime.title);
  const button = document.createElement('button');
  button.className = inWatchlist ? 'remove' : '';
  button.innerText = inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist';
  button.onclick = () => inWatchlist ? removeFromWatchlist(anime.title) : addToWatchlist(anime.title);

  // Image with hover effect to show animated gif
  const img = document.createElement('img');
  img.src = anime.image;
  img.alt = anime.title;
  img.className = 'anime-img';
  card.addEventListener('mouseenter', () => { img.src = anime.gif; });
  card.addEventListener('mouseleave', () => { img.src = anime.image; });

  // Append text content and button to card
  card.appendChild(createTextElement('h3', anime.title));
  card.appendChild(img);
  card.appendChild(createTextElement('p', `<strong>Rating:</strong> ${anime.rating}`));
  card.appendChild(createTextElement('p', `<strong>Popularity:</strong> ${anime.popularity}`));
  card.appendChild(createTextElement('p', `<strong>Genre:</strong> ${anime.genre}`));
  card.appendChild(createTextElement('p', `<strong>Episodes:</strong> ${anime.total_episodes}`));
  card.appendChild(button);

  return card;
}

// CREATE TEXT ELEMENT WITH HTML INSIDE
function createTextElement(tag, html) {
  const el = document.createElement(tag);
  el.innerHTML = html;
  return el;
}

// DISPLAY LIST OF ANIME OBJECTS IN THE CONTAINER
function displayList(data = null) {
  const container = document.getElementById('anime-list');
  container.innerHTML = ''; // Clear existing cards

  const list = data || getCurrentList();
  if (list.length === 0) {
    // Show "No results" message when list is empty
    const msg = document.createElement('p');
    msg.innerText = "No results! :(";
    msg.className = "no-results";
    container.appendChild(msg);
    return;
  }

  // Add each anime as a card to the display
  list.forEach(anime => {
    const card = createAnimeCard(anime);
    container.appendChild(card);
    setTimeout(() => card.classList.add('show'), 10); // Animation effect
  });
}

// INITIAL RENDER ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  displayList();
});