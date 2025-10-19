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
          ${project.gallery ? project.gallery.map(img => 
            `<img src="${img}" alt="${project.title}" class="lightbox-image">`
          ).join('') : ''}
        </div>
        <div class="lightbox-nav">
          <button class="lightbox-prev">‹</button>
          <button class="lightbox-next">›</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  
  // Gestion navigation et fermeture
  const images = lightbox.querySelectorAll('.lightbox-image');
  let currentIndex = 0;
  
  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }
  
  lightbox.querySelector('.lightbox-close').onclick = () => lightbox.remove();
  lightbox.querySelector('.lightbox-overlay').onclick = (e) => {
    if (e.target === e.currentTarget) lightbox.remove();
  };
  
  if (images.length > 1) {
    lightbox.querySelector('.lightbox-prev').onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    };
    lightbox.querySelector('.lightbox-next').onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    };
  }
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
    showMessage('Lien externe non disponible', 'warning');
  }
}
