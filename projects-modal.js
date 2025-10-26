(function() {
  'use strict';

  // Configuration des projets avec URLs d'embed et images
  const projectsConfig = {
    'saconnect': {
      title: 'Saconnect',
      platform: 'figma',
      url: 'https://www.figma.com/design/lUhXoqXxgxtR4uthfUtHs0/module?node-id=0-1&t=qkk8LVeRoJ1PdstB-1',
      embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A//www.figma.com/design/lUhXoqXxgxtR4uthfUtHs0/module%3Fnode-id%3D0-1%26t%3Dqkk8LVeRoJ1PdstB-1',
      image: 'img/projets/saconect.png'
    },
    'design-system': {
      title: 'Design System',
      platform: 'figma',
      url: 'https://www.figma.com/design/5sWs5uxJEu0lxzLVIjvCJu/Untitled?node-id=3-1042&t=UNc6tTdtHErmi0cr-1',
      embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A//www.figma.com/design/5sWs5uxJEu0lxzLVIjvCJu/Untitled%3Fnode-id%3D3-1042%26t%3DUNc6tTdtHErmi0cr-1',
      image: 'img/projets/Capture d\'écran du 2025-08-13 22-42-38.png'
    },
    'identite-visuelle': {
      title: 'Identité Visuelle',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGudULUlEQ/FX_tf2tFhrWPbiuq5DkvCw/edit',
      image: 'img/projets/Green and White Minimalist Natural Skincare Feed Ad (1).png'
    },
    'campagne-marketing': {
      title: 'Campagne Marketing',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGvIs92k4E/o_a_kXZaR35FdEdRpkOK8g/edit',
      image: 'img/projets/Pink Vibrant Gradient Weekend Special Promo Smoothie Instagram Post (42 x 59 cm).png'
    },
    'presentation-corporate': {
      title: 'Présentation Corporate',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGuvMRd0yQ/eCLx5AbuNHxA7UW6wbcntA/edit',
      image: 'img/projets/WhatsApp Image 2025-08-14 at 6.17.53 PM.jpeg'
    },
    'kit-reseaux-sociaux': {
      title: 'Kit Réseaux Sociaux',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGwGVcWHD0/YSOUwHDjgavZ4sf3-LToIw/edit',
      image: 'img/projets/Yellow Green 3D Illustrated Promotional  Summer Cosmetics Facebook Post (1).png'
    }
  };

  // Éléments DOM
  let modal, modalTitle, modalContent, statusMessages;

  // Initialisation
  function init() {
    // Récupération des éléments DOM
    modal = document.getElementById('projectModal-new');
    modalTitle = document.getElementById('modalTitle-new');
    modalContent = document.getElementById('modalContent-new');
    statusMessages = document.getElementById('statusMessages-new');

    // Vérification que les éléments existent
    if (!modal || !modalTitle || !modalContent || !statusMessages) {
      console.error('Éléments DOM manquants pour la section projets');
      return;
    }

    // Initialisation des animations AOS
    initAOSAnimations();

    // Gestion des événements
    setupEventListeners();

    console.log('✅ Section projets moderne initialisée');
  }

  // Initialisation des animations AOS personnalisées
  function initAOSAnimations() {
    const cards = document.querySelectorAll('[data-aos]');
    
    if (!window.IntersectionObserver) {
      // Fallback pour les navigateurs sans IntersectionObserver
      cards.forEach(card => card.classList.add('aos-animate'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.aosDelay) || 0;
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));
  }

  // Configuration des écouteurs d'événements
  function setupEventListeners() {
    // Gestion des clics sur les boutons d'action
    document.addEventListener('click', handleClick);

    // Gestion des touches clavier
    document.addEventListener('keydown', handleKeydown);

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);
  }

  // Gestionnaire de clics
  function handleClick(event) {
    const target = event.target.closest('[data-action]');
    
    if (target) {
      event.preventDefault();
      const action = target.dataset.action;
      const projectId = target.dataset.project;
      
      handleProjectAction(action, projectId, target);
      return;
    }

    // Fermeture de la modal
    if (event.target.matches('.modal-close-new, .modal-backdrop-new')) {
      closeModal();
    }
  }

  // Gestionnaire de touches clavier
  function handleKeydown(event) {
    if (event.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  }

  // Gestionnaire de redimensionnement
  function handleResize() {
    if (modal && modal.getAttribute('aria-hidden') === 'false') {
      adjustModalSize();
    }
  }

  // Gestion des actions de projet
  function handleProjectAction(action, projectId, buttonElement) {
    const project = projectsConfig[projectId];
    
    if (!project) {
      showMessage('Projet non trouvé', 'error');
      return;
    }

    // Animation du bouton
    animateButton(buttonElement);

    switch (action) {
      case 'view':
        openModal(project);
        break;
      case 'open':
        // Afficher l'image du projet dans une modal simple
        openImageModal(project);
        break;
      case 'download':
        handleDownload(project);
        break;
      default:
        console.warn(`Action non reconnue: ${action}`);
    }
  }

  // Animation du bouton lors du clic
  function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  // Ouverture de la modal avec image simple
  function openImageModal(project) {
    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = project.title;
    
    // Contenu simple avec l'image du projet
    modalContent.innerHTML = `
      <div class="image-modal-content" style="text-align: center; padding: 1rem;">
        <div style="position: relative; max-width: 100%; margin: 0 auto;">
          <img 
            src="${project.image}" 
            alt="${project.title}"
            style="width: 100%; height: auto; max-height: 70vh; object-fit: contain; 
                   border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);"
            onerror="handleImageError(this)"
          />
          <div style="display: none; padding: 3rem; color: #64748b;">
            <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
            <p>Image non disponible</p>
          </div>
        </div>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button onclick="window.open('${project.url}', '_blank')" 
                  style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; 
                         background: ${project.platform === 'figma' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #f093fb, #f5576c)'}; 
                         color: white; border: none; border-radius: 8px; font-weight: 500; 
                         cursor: pointer; transition: all 0.3s ease;">
            <i class="fab fa-${project.platform}"></i>
            Ouvrir dans ${project.platform === 'figma' ? 'Figma' : 'Canva'}
          </button>
        </div>
      </div>
    `;

    // Affichage de la modal
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus sur le bouton de fermeture
    const closeBtn = modal.querySelector('.modal-close-new');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }

    showMessage(`Image de "${project.title}" affichée`);
  }

  // Ouverture de la modal avec aperçu
  function openModal(project) {
    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = project.title;
    
    // Contenu de la modal selon la plateforme
    if (project.platform === 'figma' && project.embedUrl) {
      modalContent.innerHTML = `
        <div class="iframe-container" style="position: relative; width: 100%; height: 500px; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <iframe 
            src="${project.embedUrl}" 
            width="100%" 
            height="100%" 
            allowfullscreen
            title="Prévisualisation de ${project.title}"
            loading="lazy"
            style="border: none; border-radius: 12px;"
          ></iframe>
        </div>
        <div style="margin-top: 1rem; text-align: center;">
          <a href="${project.url}" target="_blank" rel="noopener noreferrer" 
             style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; 
                    background: linear-gradient(135deg, #667eea, #764ba2); color: white; 
                    text-decoration: none; border-radius: 8px; font-weight: 500; transition: all 0.3s ease;">
            <i class="fas fa-external-link-alt"></i>
            Ouvrir dans Figma
          </a>
        </div>
      `;
    } else {
      // Pour Canva ou autres plateformes sans embed
      modalContent.innerHTML = `
        <div class="modal-fallback" style="text-align: center; padding: 3rem 2rem;">
          <div style="max-width: 400px; margin: 0 auto;">
            <i class="fas fa-external-link-alt" style="font-size: 4rem; color: #0cd4bd; margin-bottom: 1.5rem; display: block;"></i>
            <h4 style="margin-bottom: 1rem; color: #1e293b; font-size: 1.5rem;">Prévisualisation ${project.platform === 'canva' ? 'Canva' : 'externe'}</h4>
            <p style="color: #64748b; margin-bottom: 2rem; line-height: 1.6;">
              Ce projet ${project.platform === 'canva' ? 'Canva' : 'externe'} s'ouvre dans un nouvel onglet pour une meilleure expérience.
            </p>
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" 
               style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; 
                      background: linear-gradient(135deg, #f093fb, #f5576c); color: white; 
                      text-decoration: none; border-radius: 12px; font-weight: 600; 
                      transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(240, 147, 251, 0.3);">
              <i class="fas fa-external-link-alt"></i>
              Ouvrir ${project.title} dans ${project.platform === 'figma' ? 'Figma' : 'Canva'}
            </a>
          </div>
        </div>
      `;
    }

    // Affichage de la modal
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus sur le bouton de fermeture
    const closeBtn = modal.querySelector('.modal-close-new');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }

    showMessage(`Prévisualisation de "${project.title}" ouverte`);
  }

  // Fermeture de la modal
  function closeModal() {
    if (!modal) return;

    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Nettoyage du contenu après l'animation
    setTimeout(() => {
      if (modalContent) {
        modalContent.innerHTML = '';
      }
    }, 300);

    showMessage('Prévisualisation fermée');
  }

  // Ajustement de la taille de la modal
  function adjustModalSize() {
    if (!modal) return;
    
    const modalContentEl = modal.querySelector('.modal-content-new');
    if (modalContentEl) {
      const maxHeight = window.innerHeight * 0.9;
      modalContentEl.style.maxHeight = `${maxHeight}px`;
    }
  }

  // Gestion du téléchargement
  function handleDownload(project) {
    // Simulation du téléchargement (à personnaliser selon vos besoins)
    showMessage(`Préparation du téléchargement de "${project.title}"...`, 'info');
    
    setTimeout(() => {
      showMessage(`Téléchargement de "${project.title}" non disponible pour le moment`, 'warning');
    }, 1500);

    // Si vous avez des URLs de téléchargement réelles, utilisez ceci :
    /*
    if (project.downloadUrl) {
      const link = document.createElement('a');
      link.href = project.downloadUrl;
      link.download = `${project.title.replace(/\s+/g, '-').toLowerCase()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showMessage(`Téléchargement de "${project.title}" démarré`);
    } else {
      showMessage(`Téléchargement non disponible pour "${project.title}"`, 'warning');
    }
    */
  }

  // Affichage des messages de statut
  function showMessage(message, type = 'success') {
    if (!statusMessages) return;

    // Configuration des couleurs selon le type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    statusMessages.style.background = colors[type] || colors.success;
    statusMessages.textContent = message;

    // Animation d'entrée
    statusMessages.style.transform = 'translateX(0)';

    // Masquage automatique après 3 secondes
    setTimeout(() => {
      statusMessages.style.transform = 'translateX(100%)';
      setTimeout(() => {
        statusMessages.textContent = '';
      }, 300);
    }, 3000);
  }

  // Utilitaires pour le debug
  window.ProjectsDebug = {
    showModal: (projectId) => {
      const project = projectsConfig[projectId];
      if (project) openModal(project);
    },
    closeModal: closeModal,
    showMessage: showMessage,
    config: projectsConfig
  };

  // Initialisation au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
