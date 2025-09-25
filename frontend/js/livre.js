document.addEventListener('DOMContentLoaded', () => {

  const sectionLivres = document.querySelector('#Livres');
  const btnTous = document.querySelector('#btnAfficherTous');

  const formTitre = sectionLivres.querySelector('#searchLivre1').closest('form');
  const inputTitre = document.querySelector('#searchLivre1');

  const formMotCle = sectionLivres.querySelector('#searchLivreMotCle').closest('form');
  const inputMotCle = document.querySelector('#searchLivreMotCle');

  const routes = [
    { route: 'livreByTitle', type: 'titre' },
    { route: 'livreByAuthor', type: 'auteur' },
    { route: 'livreByGenre', type: 'genre' },
    { route: 'getLivreByWordInTitle', type: 'motDansTitre' },
    { route: 'getLivreByWordInAuthor', type: 'motDansAuteur' }
  ];

  // ============================
  // Affichage des livres
  // ============================
  function afficherLivres(livres) {
    const anciens = sectionLivres.querySelectorAll('.resultat-livre, .resultats-grid');
    anciens.forEach(el => el.remove());

    if (!livres || livres.length === 0) {
      const p = document.createElement('p');
      p.classList.add('resultat-livre');
      p.textContent = 'Aucun livre trouvé.';
      sectionLivres.appendChild(p);
      return;
    }

    const grid = document.createElement('div');
    grid.classList.add('resultats-grid');
    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';
    grid.style.gap = '20px';
    sectionLivres.appendChild(grid);

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
        <span style="margin:5px 0;">${livre.auteur}</span>
        <img src="${livre.imageUrl}" alt="${livre.titre}" />
        <p><strong>Genre:</strong> ${livre.genre}</p>
        <p><strong>Nombre de tomes:</strong> ${livre.nbTomes}</p>
        <p><strong>Année de publication:</strong> ${livre.anneeSortie}</p>
        <p><strong>Résumé:</strong> ${livre.description || "Non disponible"}</p>
        <p><strong>Mots-clés:</strong> ${[livre.motsCle1, livre.motsCle2, livre.motsCle3, livre.motsCle4, livre.motsCle5].filter(Boolean).join(', ')}</p>
        <p><strong>Booknode:</strong> <a href="${livre.booknodeUrl}" target="_blank" style="color:#1d3557; text-decoration:none; word-break: break-word; display:block; max-width:100%;">${livre.booknodeUrl}</a></p>
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

      grid.appendChild(div);
    });
  }

  // ============================
  // Afficher le premier livre de chaque genre
  // ============================
  async function afficherParGenre() {
    try {
      const res = await fetch('http://localhost:2424/livres/premierParGenre');
      if (!res.ok) throw new Error('Erreur récupération livres par genre');
      const data = await res.json();
      afficherLivres(data);
    } catch (err) {
      console.error(err);
      afficherLivres([]);
    }
  }

  // ============================
  // Afficher tous les livres
  // ============================
  async function afficherTous() {
    try {
      const res = await fetch('http://localhost:2424/livres/allLivres');
      if (!res.ok) throw new Error('Erreur récupération tous les livres');
      const data = await res.json();
      afficherLivres(data);
    } catch (err) {
      console.error(err);
      afficherLivres([]);
    }
  }

  btnTous.addEventListener('click', afficherTous);

  // ============================
  // Recherche intelligente
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
          const res = await fetch(url);
          if (!res.ok) return;
          const data = await res.json();
          if (Array.isArray(data) && data.length) resultatTotal.push(...data);
        } catch (err) {
          console.error(`Erreur route ${r.route}:`, err);
        }
      })
    );
    const livresUniques = Array.from(new Map(resultatTotal.map(l => [l.id, l])).values());
    afficherLivres(livresUniques);
  }

  // ============================
  // Recherche par mot-clé
  // ============================
  async function rechercheMotCle(terme) {
    if (!terme) return afficherLivres([]);
    try {
      const res = await fetch(`http://localhost:2424/livres/livreByMotCle/${encodeURIComponent(terme)}`);
      if (!res.ok) return;
      const data = await res.json();
      afficherLivres(data);
    } catch (err) {
      console.error('Erreur recherche mot-clé:', err);
    }
  }

  // ============================
  // Événements sur les formulaires
  // ============================
  if (formTitre) {
    formTitre.addEventListener('submit', e => {
      e.preventDefault();
      const terme = inputTitre.value.trim();
      rechercheIntelligente(terme);
    });
  }

  if (formMotCle) {
    formMotCle.addEventListener('submit', e => {
      e.preventDefault();
      const terme = inputMotCle.value.trim();
      rechercheMotCle(terme);
    });
  }

  // ============================
  // Chargement initial
  // ============================
  afficherParGenre();

});