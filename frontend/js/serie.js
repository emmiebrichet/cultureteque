
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
