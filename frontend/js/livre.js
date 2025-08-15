const apiUrl = 'http://localhost:3000/api/livres';


// Get book by author (exact match)
function getLivreByAuthor(author) {
  fetch(`${apiUrl}/author/${encodeURIComponent(author)}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Books by author "${author}":`, data);
    })
    .catch(error => {
      console.error(`Error fetching books by author "${author}":`, error);
    });
}

// Get book by author name (partial match)
function getLivreByAuthorName(authorName) {
  fetch(`${apiUrl}/authorName/${encodeURIComponent(authorName)}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Books by author containing "${authorName}":`, data);
    })
    .catch(error => {
      console.error(`Error fetching books by author containing "${authorName}":`, error);
    });
}

// Get book by exact title
function getLivreByTitle(title) {
  fetch(`${apiUrl}/title/${encodeURIComponent(title)}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Books with title "${title}":`, data);
    })
    .catch(error => {
      console.error(`Error fetching books with title "${title}":`, error);
    });
}

// Get book by a word in title (partial match)
function getLivreByWordInTitle(word) {
  fetch(`${apiUrl}/wordInTitle/${encodeURIComponent(word)}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Books containing "${word}" in title:`, data);
    })
    .catch(error => {
      console.error(`Error fetching books containing "${word}" in title:`, error);
    });
}

// Get book by motCle (keyword) in multiple columns
function getLivreByMotCle(motCle) {
  fetch(`${apiUrl}/motCle/${encodeURIComponent(motCle)}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Books with keyword "${motCle}":`, data);
    })
    .catch(error => {
      console.error(`Error fetching books with keyword "${motCle}":`, error);
    });
}

// Get book by Genre
function getLivreByGenre(genre) {
  fetch(`${apiUrl}/genre/${encodeURIComponent(genre)}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Books in genre "${genre}":`, data);
    })
    .catch(error => {
      console.error(`Error fetching books in genre "${genre}":`, error);
    });
}