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

