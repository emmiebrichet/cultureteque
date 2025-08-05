//livre
// Fonction unifiée d'affichage
function afficherLivres(livres) {
  const sectionLivres = document.getElementById('Livres');
  if (!sectionLivres) return console.error("Élément #Livres introuvable");

  // Supprimer les anciens résultats
  let liste = document.getElementById('resultatsLivres');
  if (liste) liste.remove();

  // Créer une nouvelle liste
  liste = document.createElement('ul');
  liste.id = 'resultatsLivres';

  if (!livres || livres.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Aucun livre trouvé.';
    sectionLivres.appendChild(p);
    return;
  }

  livres.forEach(livre => {
    const item = document.createElement('li');
    item.style.display = 'flex';
    item.style.alignItems = 'flex-start';
    item.style.marginBottom = '15px';

    // Image du livre
    if (livre.imageUrl) {
      const img = document.createElement('img');
      img.src = livre.imageUrl;
      img.alt = `Couverture de ${livre.titre}`;
      img.style.width = '100px';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '10px';
      item.appendChild(img);
    }

    // Conteneur texte
    const texte = document.createElement('div');

    // Titre
    const titre = document.createElement('h3');
    titre.textContent = livre.titre || 'Titre inconnu';

    // Auteur + genre
    const auteurGenre = document.createElement('p');
    const auteur = livre.auteur || 'Auteur inconnu';
    const genre = livre.genre || 'Genre inconnu';
    auteurGenre.textContent = `${auteur} (${genre})`;

    // Description (optionnelle)
    if (livre.description) {
      const description = document.createElement('p');
      description.textContent = livre.description;
      texte.appendChild(description);
    }

    // Assemblage
    texte.insertBefore(titre, texte.firstChild);
    texte.appendChild(auteurGenre);

    item.appendChild(texte);
    liste.appendChild(item);
  });

  sectionLivres.appendChild(liste);
}

// Recherche 1 (plusieurs API en parallèle)
document.getElementById('btnSearch1').addEventListener('click', () => {
  const recherche = document.getElementById('searchLivre1').value.trim();
  if (!recherche) return alert('Veuillez entrer une recherche');

  const urls = [
    `http://localhost:2424/livres/livreByAuthorName/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/livres/livreByGenre/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/livres/livreByTitle/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/livres/livreByWordInTitle/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/livres/livreByAuthor/${encodeURIComponent(recherche)}`
  ];

  const fetches = urls.map(url =>
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .catch(() => [])
  );

  Promise.all(fetches)
    .then(results => {
      // Fusionner sans doublons avec Map (id)
      const mapLivres = new Map();
      results.flat().forEach(livre => {
        if (livre && livre.id) mapLivres.set(livre.id, livre);
      });
      const livresFusionnes = Array.from(mapLivres.values());

      if (livresFusionnes.length === 0) {
        alert('Aucun résultat trouvé.');
      }

      afficherLivres(livresFusionnes);
    })
    .catch(err => alert('Erreur lors de la recherche : ' + err.message));
});

// Recherche par mot clé
document.getElementById('btnSearchMotCle').addEventListener('click', () => {
  const motCle = document.getElementById('searchLivreMotCle').value.trim();
  if (!motCle) return alert('Veuillez entrer un mot clé');

  fetch(`http://localhost:2424/livres/livreByMotCle/${encodeURIComponent(motCle)}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => { throw new Error(data.message || "Erreur serveur"); });
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) alert('Aucun résultat trouvé.');
      afficherLivres(data);
    })
    .catch(err => alert(err.message));
});


//musique
// Fonction pour afficher les musiques
function afficherMusiques(musiques) {
  const sectionMusiques = document.getElementById('Musiques');
  if (!sectionMusiques) return console.error("Élément #Musiques introuvable");

  // Supprimer les anciens résultats
  let liste = document.getElementById('resultatsMusiques');
  if (liste) liste.remove();

  // Supprimer message précédent
  const ancienMessage = sectionMusiques.querySelector('p');
  if (ancienMessage) ancienMessage.remove();

  // Créer une nouvelle liste
  liste = document.createElement('ul');
  liste.id = 'resultatsMusiques';

  if (!musiques || musiques.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Aucune musique trouvée.';
    sectionMusiques.appendChild(p);
    return;
  }

  musiques.forEach(musique => {
    const item = document.createElement('li');
    item.style.display = 'flex';
    item.style.alignItems = 'flex-start';
    item.style.marginBottom = '15px';

    // Image
    if (musique.imageUrl) {
      const img = document.createElement('img');
      img.src = musique.imageUrl;
      img.alt = `Pochette de ${musique.album || 'l\'album'}`;
      img.style.width = '100px';
      img.style.height = '150px'; // même hauteur que livre
      img.style.objectFit = 'cover';
      img.style.marginRight = '10px';
      item.appendChild(img);
    }

    // Conteneur texte
    const texte = document.createElement('div');

    // Artiste
    const artiste = document.createElement('h3');
    artiste.textContent = musique.artiste || 'Artiste inconnu';

    // Album + Genre
    const album = musique.album || 'Album inconnu';
    const genre = musique.genre || 'Genre inconnu';
    const albumGenre = document.createElement('p');
    albumGenre.textContent = `${album} (${genre})`;

    // Assemblage
    texte.appendChild(artiste);
    texte.appendChild(albumGenre);

    item.appendChild(texte);
    liste.appendChild(item);
  });

  sectionMusiques.appendChild(liste);
}

// Recherche 1 (plusieurs API en parallèle)
document.getElementById('btnSearchMusique1').addEventListener('click', () => {
  const recherche = document.getElementById('searchMusique1').value.trim();
  if (!recherche) return alert('Veuillez entrer une recherche');

  const urls = [
    `http://localhost:2424/musiques/musiqueByArtist/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/musiques/musiqueByArtistName/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/musiques/musiqueByGenre/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/musiques/musiqueByAlbum/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/musiques/musiqueByWordInAlbum/${encodeURIComponent(recherche)}`
  ];

  const fetches = urls.map(url =>
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .catch(() => [])
  );

  Promise.all(fetches)
    .then(results => {
      const mapMusiques = new Map();
      results.flat().forEach(musique => {
        if (musique && musique.id) mapMusiques.set(musique.id, musique);
      });
      const musiquesFusionnees = Array.from(mapMusiques.values());

      if (musiquesFusionnees.length === 0) {
        alert('Aucun résultat trouvé.');
      }

      afficherMusiques(musiquesFusionnees);
    })
    .catch(err => alert('Erreur lors de la recherche : ' + err.message));
});

// Recherche par mot clé
document.getElementById('btnSearchMusiqueMotCle').addEventListener('click', () => {
  const motCle = document.getElementById('searchMusiqueMotCle').value.trim();
  if (!motCle) return alert('Veuillez entrer un mot clé');

  fetch(`http://localhost:2424/musiques/musiqueByMotCle/${encodeURIComponent(motCle)}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => { throw new Error(data.message || "Erreur serveur"); });
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) {
        alert('Aucun résultat trouvé.');
        // Supprimer résultats précédents s'il y en avait
        afficherMusiques([]);
        return;
      }
      afficherMusiques(data);
    })
    .catch(err => alert(err.message));
});

//film
function afficherFilms(films) {
  const sectionFilms = document.getElementById('Films');
  if (!sectionFilms) return console.error("Élément #Films introuvable");

  let liste = document.getElementById('resultatsFilms');
  if (liste) liste.remove();

  liste = document.createElement('ul');
  liste.id = 'resultatsFilms';

  if (!films || films.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Aucun film trouvé.';
    sectionFilms.appendChild(p);
    return;
  }

  films.forEach(film => {
    const item = document.createElement('li');
    item.style.display = 'flex';
    item.style.alignItems = 'flex-start';
    item.style.marginBottom = '15px';

    if (film.imageUrl) {
      const img = document.createElement('img');
      img.src = film.imageUrl;
      img.alt = `Affiche de ${film.titre}`;
      img.style.width = '100px';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '10px';
      item.appendChild(img);
    }

    const texte = document.createElement('div');
    const titre = document.createElement('h3');
    titre.textContent = film.titre || 'Titre inconnu';

    const genre = document.createElement('p');
    genre.textContent = film.genre || 'Genre inconnu';

    texte.appendChild(titre);
    texte.appendChild(genre);

    item.appendChild(texte);
    liste.appendChild(item);
  });

  sectionFilms.appendChild(liste);
}
document.getElementById('btnSearchFilm1').addEventListener('click', () => {
  const recherche = document.getElementById('searchFilm1').value.trim();
  if (!recherche) return alert('Veuillez entrer une recherche');

  const urls = [
    `http://localhost:2424/films/filmByActorName/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/films/filmByGenre/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/films/filmByTitle/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/films/filmByWordInTitle/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/films/filmByActor/${encodeURIComponent(recherche)}`
  ];

  const fetches = urls.map(url =>
    fetch(url).then(res => res.ok ? res.json() : []).catch(() => [])
  );

  Promise.all(fetches)
    .then(results => {
      const mapFilms = new Map();
      results.flat().forEach(film => {
        if (film && film.id) mapFilms.set(film.id, film);
      });
      const filmsFusionnes = Array.from(mapFilms.values());

      if (filmsFusionnes.length === 0) alert('Aucun résultat trouvé.');
      afficherFilms(filmsFusionnes);
    })
    .catch(err => alert('Erreur lors de la recherche : ' + err.message));
});


document.getElementById('btnSearchFilmMotCle').addEventListener('click', () => {
  const motCle = document.getElementById('searchFilmMotCle').value.trim();
  if (!motCle) return alert('Veuillez entrer un mot clé');

  fetch(`http://localhost:2424/films/filmByMotCle/${encodeURIComponent(motCle)}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      if (!data || data.length === 0) alert('Aucun résultat trouvé.');
      afficherFilms(data);
    })
    .catch(err => alert("Erreur : " + err.message));
});
// Fonction unifiée d'affichage des séries
function afficherSeries(series) {
  const sectionSeries = document.getElementById('Series');
  if (!sectionSeries) return console.error("Élément #Series introuvable");

  // Supprimer les anciens résultats
  let liste = document.getElementById('resultatsSeries');
  if (liste) liste.remove();

  // Créer une nouvelle liste
  liste = document.createElement('ul');
  liste.id = 'resultatsSeries';
  liste.style.listStyleType = 'none';
  liste.style.padding = '0';

  if (!series || series.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Aucune série trouvée.';
    sectionSeries.appendChild(p);
    return;
  }

  series.forEach(serie => {
    const item = document.createElement('li');
    item.style.display = 'flex';
    item.style.alignItems = 'flex-start';
    item.style.marginBottom = '15px';

    if (serie.imageUrl) {
      const img = document.createElement('img');
      img.src = serie.imageUrl;
      img.alt = `Affiche de ${serie.titre || 'série inconnue'}`;
      img.style.width = '100px';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '10px';
      item.appendChild(img);
    }

    const texte = document.createElement('div');

    const titre = document.createElement('h3');
    titre.textContent = serie.titre || 'Titre inconnu';

    const genre = document.createElement('p');
    genre.textContent = serie.genre || 'Genre inconnu';

    texte.appendChild(titre);
    texte.appendChild(genre);

    item.appendChild(texte);
    liste.appendChild(item);
  });

  sectionSeries.appendChild(liste);
}

// Fonction de recherche multi-endpoints pour séries
function handleRechercheSerie(inputId) {
  const recherche = document.getElementById(inputId).value.trim();
  if (!recherche) {
    alert('Veuillez entrer une recherche');
    return;
  }

  const urls = [
    `http://localhost:2424/series/getSerieByActorName/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/series/getSerieByGenre/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/series/getSerieByTitle/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/series/getSerieByWordInTitle/${encodeURIComponent(recherche)}`,
    `http://localhost:2424/series/getSerieByActor/${encodeURIComponent(recherche)}`
  ];

  const fetches = urls.map(url =>
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .catch(() => [])
  );

  Promise.all(fetches)
    .then(results => {
      const mapSeries = new Map();
      results.flat().forEach(serie => {
        if (serie && serie.id) mapSeries.set(serie.id, serie);
      });
      const seriesFusionnees = Array.from(mapSeries.values());

      if (seriesFusionnees.length === 0) alert('Aucun résultat trouvé.');
      afficherSeries(seriesFusionnees);
    })
    .catch(err => alert('Erreur lors de la recherche : ' + err.message));
}

// Recherche principale (multi-endpoints)
document.getElementById('btnSearchSerie1').addEventListener('click', () => {
  handleRechercheSerie('searchSerie1');
});

// Recherche par mot clé (endpoint spécifique)
document.getElementById('btnSearchSerieMotCle').addEventListener('click', () => {
  const motCle = document.getElementById('searchSerieMotCle').value.trim();
  if (!motCle) {
    alert('Veuillez entrer un mot clé');
    return;
  }

  fetch(`http://localhost:2424/series/getSerieByMotCle/${encodeURIComponent(motCle)}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => { throw new Error(data.message || "Erreur serveur"); });
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) alert('Aucun résultat trouvé.');
      afficherSeries(data);
    })
    .catch(err => alert("Erreur : " + err.message));
});
