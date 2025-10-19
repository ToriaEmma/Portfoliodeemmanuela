/**
 * INTERACTIONS AMÉLIORÉES POUR L'ATELIER PAON
 * Optimisation des performances et de l'expérience utilisateur
 */

class SiteEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupScrollAnimations();
    this.setupNavigationHighlight();
    this.setupPerformanceOptimizations();
    this.setupAccessibility();
  }

  // Navigation fluide optimisée
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Animations au scroll optimisées avec IntersectionObserver
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Animation staggered pour les éléments enfants
          const children = entry.target.querySelectorAll('.reveal-from-bottom, .reveal-from-left, .reveal-from-right');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.animationDelay = `${index * 0.1}s`;
              child.classList.add('animate');
            }, index * 100);
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Mise en surbrillance de la navigation active
  setupNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]:not([id="projects-old"])');
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

    const highlightObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Retirer la classe active de tous les liens
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Ajouter la classe active au lien correspondant
          const activeLink = document.querySelector(`.nav-list a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => {
      highlightObserver.observe(section);
    });
  }

  // Optimisations de performance
  setupPerformanceOptimizations() {
    // Lazy loading pour les images
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    // Debounce pour les événements de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 16); // 60fps
    }, { passive: true });
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.top-navbar');
    
    if (navbar) {
      if (scrolled > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  // Améliorations d'accessibilité
  setupAccessibility() {
    // Gestion du focus pour la navigation clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Skip link pour l'accessibilité
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // ARIA labels dynamiques
    this.updateAriaLabels();
  }

  updateAriaLabels() {
    // Mise à jour des labels ARIA pour les éléments interactifs
    document.querySelectorAll('.btn').forEach(btn => {
      if (!btn.getAttribute('aria-label') && btn.textContent) {
        btn.setAttribute('aria-label', btn.textContent.trim());
      }
    });

    // Landmarks ARIA
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (!section.getAttribute('role')) {
        section.setAttribute('role', 'region');
      }
      if (!section.getAttribute('aria-labelledby')) {
        const heading = section.querySelector('h1, h2, h3');
        if (heading && !heading.id) {
          heading.id = `section-heading-${index}`;
          section.setAttribute('aria-labelledby', heading.id);
        }
      }
    });
  }

  // Méthode pour nettoyer les animations en cas de préférence réduite
  respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', 'none');
      document.documentElement.style.setProperty('--transition-normal', 'none');
      document.documentElement.style.setProperty('--transition-slow', 'none');
      
      // Désactiver les animations CSS
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialisation optimisée
document.addEventListener('DOMContentLoaded', () => {
  new SiteEnhancer();
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
  console.warn('Erreur capturée:', e.error);
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Temps de chargement:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
    }, 0);
  });
}
