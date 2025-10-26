/* ======== NOUVELLE SECTION PROJETS - JAVASCRIPT MODERNE ======== */

(function() {
  'use strict';

  // Configuration des projets
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
      embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A//www.figma.com/design/5sWs5uxJEu0lxzLVIjvCJu/Untitled%3Fnode-id%3D3-1042%26t%3DUNc6tTdtHErmi0cr-1'
    },
    'identite-visuelle': {
      title: 'Identité Visuelle',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGudULUlEQ/FX_tf2tFhrWPbiuq5DkvCw/edit'
    },
    'campagne-marketing': {
      title: 'Campagne Marketing',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGvIs92k4E/o_a_kXZaR35FdEdRpkOK8g/edit'
    },
    'presentation-corporate': {
      title: 'Présentation Corporate',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGuvMRd0yQ/eCLx5AbuNHxA7UW6wbcntA/edit'
    },
    'kit-reseaux-sociaux': {
      title: 'Kit Réseaux Sociaux',
      platform: 'canva',
      url: 'https://www.canva.com/design/DAGwGVcWHD0/YSOUwHDjgavZ4sf3-LToIw/edit'
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

  // Ouverture de la modal
  function openModal(project) {
    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = project.title;
    
    // Contenu de la modal selon la plateforme
    if (project.platform === 'figma' && project.embedUrl) {
      modalContent.innerHTML = `
        <div class="iframe-container">
          <iframe 
            src="${project.embedUrl}" 
            width="100%" 
            height="500" 
            allowfullscreen
            title="Prévisualisation de ${project.title}"
            loading="lazy"
            style="border: none; border-radius: 12px;"
          ></iframe>
        </div>
      `;
    } else {
      modalContent.innerHTML = `
        <div class="modal-fallback">
          <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-external-link-alt" style="font-size: 3rem; color: #0cd4bd; margin-bottom: 1rem;"></i>
            <h4 style="margin-bottom: 1rem; color: #1e293b;">Prévisualisation non disponible</h4>
            <p style="color: #64748b; margin-bottom: 1.5rem;">
              Ce projet ${project.platform === 'canva' ? 'Canva' : 'externe'} s'ouvre dans un nouvel onglet.
            </p>
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="modal-link">
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
