// SCRIPT D'INTÉGRATION DES ICÔNES INTERACTIVES
// Ajoutez ce script à la fin de votre fichier HTML avant </body>

// Gestion des icônes rapides
document.addEventListener('click', function(e) {
  if (e.target.closest('.quick-action-btn')) {
    const btn = e.target.closest('.quick-action-btn');
    const action = btn.dataset.action;
    const projectId = btn.dataset.projectId;
    const project = projectsData.find(p => p.id === parseInt(projectId));
    
    if (!project) return;
    
    switch(action) {
      case 'gallery':
        openGalleryLightbox(project);
        break;
      case 'quick-download':
        quickDownloadImage(project);
        break;
      case 'external':
        openExternalLink(project);
        break;
    }
  }
});

// Fonction lightbox galerie
function openGalleryLightbox(project) {
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay">
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <div class="lightbox-images">
          <img src="${project.thumbnail}" alt="${project.title}" class="lightbox-image active">
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  
  lightbox.querySelector('.lightbox-close').onclick = () => lightbox.remove();
  lightbox.querySelector('.lightbox-overlay').onclick = (e) => {
    if (e.target === e.currentTarget) lightbox.remove();
  };
}

// Fonction téléchargement rapide
function quickDownloadImage(project) {
  const link = document.createElement('a');
  link.href = project.thumbnail;
  link.download = `${project.title.replace(/\s+/g, '-')}.jpg`;
  link.click();
}

// Fonction lien externe
function openExternalLink(project) {
  if (project.url) {
    window.open(project.url, '_blank');
  } else {
    alert('Lien externe non disponible');
  }
}

// MODIFICATION AUTOMATIQUE DE LA FONCTION createProjectCard
// Ce script modifie automatiquement votre fonction existante
document.addEventListener('DOMContentLoaded', function() {
  // Attendre que projectsData soit disponible
  setTimeout(() => {
    if (typeof createProjectCard === 'function') {
      // Sauvegarder la fonction originale
      const originalCreateProjectCard = createProjectCard;
      
      // Redéfinir la fonction avec les icônes
      window.createProjectCard = function(project) {
        const platformIcon = project.platform === 'figma' ? '📐' : '🎨';
        const platformName = project.platform === 'figma' ? 'Figma' : 'Canva';
        
        return `
          <article class="project-card" data-project-id="${project.id}">
            <div class="project-image-container">
              <img 
                src="${project.thumbnail}" 
                alt="Aperçu du projet ${project.title}"
                class="project-image"
                loading="lazy"
              >
              <!-- Icônes interactives en haut à droite -->
              <div class="project-quick-actions">
                <button 
                  type="button" 
                  class="quick-action-btn gallery-btn" 
                  data-action="gallery" 
                  data-project-id="${project.id}"
                  aria-label="Voir la galerie de ${project.title}"
                >
                  <i class="fas fa-images"></i>
                </button>
                <button 
                  type="button" 
                  class="quick-action-btn download-btn" 
                  data-action="quick-download" 
                  data-project-id="${project.id}"
                  aria-label="Télécharger ${project.title}"
                >
                  <i class="fas fa-download"></i>
                </button>
                <button 
                  type="button" 
                  class="quick-action-btn external-btn" 
                  data-action="external" 
                  data-project-id="${project.id}"
                  aria-label="Ouvrir dans ${platformName}"
                >
                  <i class="fab fa-${project.platform === 'figma' ? 'figma' : 'canva'}"></i>
                </button>
              </div>
              <div class="project-overlay">
                <div class="project-actions">
                  <button 
                    type="button" 
                    class="project-btn project-btn-view" 
                    data-action="view" 
                    data-project-id="${project.id}"
                    aria-label="Prévisualiser ${project.title}"
                  >
                    <span class="btn-icon">📂</span>
                    <span class="btn-text">Voir</span>
                  </button>
                  <button 
                    type="button" 
                    class="project-btn project-btn-open" 
                    data-action="open" 
                    data-project-id="${project.id}"
                    aria-label="Ouvrir ${project.title} dans un nouvel onglet"
                  >
                    <span class="btn-icon">🔗</span>
                    <span class="btn-text">Ouvrir</span>
                  </button>
                  <button 
                    type="button" 
                    class="project-btn project-btn-download" 
                    data-action="download" 
                    data-project-id="${project.id}"
                    aria-label="Télécharger ${project.title}"
                  >
                    <span class="btn-icon">⬇️</span>
                    <span class="btn-text">Télécharger</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-platform" title="Créé avec ${platformName}">
                  <span class="platform-icon">${platformIcon}</span>
                  <span class="platform-name">${platformName}</span>
                </div>
              </div>
              <p class="project-description">${project.description}</p>
            </div>
          </article>
        `;
      };
      
      // Regénérer les projets avec les nouvelles icônes
      if (typeof renderProjects === 'function') {
        renderProjects();
      }
      
      console.log('✅ Icônes interactives intégrées avec succès !');
    }
  }, 1000);
});
