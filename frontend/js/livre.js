// ============================
// Sélection du formulaire et de l'input
// ============================
const formTitre = document.querySelector('#Livres form.search-group');
const inputTitre = document.querySelector('#searchLivre1');
const sectionLivres = document.querySelector('#Livres');

// ============================
// Liste des routes disponibles pour la recherche
// ============================
const routes = [
  { route: 'livreByTitle', type: 'titre' },
  { route: 'livreByAuthor', type: 'auteur' },
  { route: 'livreByGenre', type: 'genre' },
  { route: 'getLivreByWordInTitle', type: 'motDansTitre' },
  { route: 'getLivreByWordInAuthor', type: 'motDansAuteur' }
];

// ============================
// Fonction de recherche intelligente
// ============================
async function rechercheIntelligente(terme) {
  if (!terme) return afficherLivres([]);

  const resultatTotal = [];

  await Promise.all(
    routes.map(async r => {
      try {
        let url = '';
        switch (r.route) {
          case 'livreByTitle':
            url = `http://localhost:2424/livres/livreByTitle/${encodeURIComponent(terme)}`;
            break;
          case 'livreByAuthor':
            url = `http://localhost:2424/livres/livreByAuthor/${encodeURIComponent(terme)}`;
            break;
          case 'livreByGenre':
            url = `http://localhost:2424/livres/livreByGenre/${encodeURIComponent(terme)}`;
            break;
          case 'getLivreByWordInTitle':
            url = `http://localhost:2424/livres/livreByWordInTitle/${encodeURIComponent(terme)}`;
            break;
          case 'getLivreByWordInAuthor':
            url = `http://localhost:2424/livres/livreByAuthorName/${encodeURIComponent(terme)}`;
            break;
        }

        console.log("→ Tentative route:", url);

        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`Route ${r.route} non trouvée (${res.status})`);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          resultatTotal.push(...data);
        }
      } catch (err) {
        console.error(`Erreur route ${r.route}:`, err);
      }
    })
  );

  const livresUniques = Array.from(new Map(resultatTotal.map(l => [l.id, l])).values());
  afficherLivres(livresUniques);
}

// ============================
// Fonction pour afficher les résultats
// ============================
function afficherLivres(livres) {
  const anciensResultats = sectionLivres.querySelectorAll('.resultat-livre, .resultats-grid');
  anciensResultats.forEach(el => el.remove());

  if (!livres || livres.length === 0) {
    const p = document.createElement('p');
    p.classList.add('resultat-livre');
    p.textContent = 'Aucun livre trouvé.';
    sectionLivres.appendChild(p);
    return;
  }

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('resultats-grid');
  gridContainer.style.display = 'flex';
  gridContainer.style.flexWrap = 'wrap';
  gridContainer.style.gap = '20px';
  sectionLivres.appendChild(gridContainer);

  livres.forEach(livre => {
    const div = document.createElement('div');
    div.classList.add('resultat-livre');

    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.width = '200px';
    div.style.textAlign = 'center';
    div.style.boxSizing = 'border-box';
    div.style.backgroundColor = '#f9f9f9';
    div.style.borderRadius = '8px';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';
    div.style.overflow = 'hidden';

    div.innerHTML = `
      <h5>${livre.titre}</h5>
      <img src="${livre.imageUrl}" alt="${livre.titre}" />
      <p><strong>Auteur:</strong> ${livre.auteur}</p>
      <p><strong>Genre:</strong> ${livre.genre}</p>
      <p><strong>Nombre de tomes:</strong> ${livre.nbTomes}</p>
      <p><strong>Année de publication:</strong> ${livre.anneeSortie}</p>
      <p><strong>Résumé:</strong> ${livre.description || "Non disponible"}</p>
      <p><strong>Mots-clés:</strong> ${
        [livre.motsCle1, livre.motsCle2, livre.motsCle3, livre.motsCle4, livre.motsCle5]
          .filter(Boolean)
          .join(', ')
      }</p>
      <p><strong>Booknode:</strong> 
        <a href="${livre.booknodeUrl}" target="_blank" 
           style="color:#1d3557; text-decoration:none; word-break: break-word; display:block; max-width:100%;">
          ${livre.booknodeUrl}
        </a>
      </p>
    `;

    const img = div.querySelector('img');
    img.style.width = '150px';
    img.style.height = '220px';
    img.style.objectFit = 'cover';
    img.style.marginBottom = '10px';

    div.querySelector('h5').style.fontSize = '16px';
    div.querySelectorAll('p').forEach(p => {
      p.style.fontSize = '14px';
      p.style.margin = '3px 0';
      p.style.textAlign = 'left';
      p.style.width = '100%';
    });

    gridContainer.appendChild(div);
  });
}

// ============================
// Événement sur le formulaire
// ============================
formTitre.addEventListener('submit', e => {
  e.preventDefault();
  const terme = inputTitre.value.trim();
  rechercheIntelligente(terme);
});
