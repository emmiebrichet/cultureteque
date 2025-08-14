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