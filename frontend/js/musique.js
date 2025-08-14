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