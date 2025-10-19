/**
 * MICRO-INTERACTIONS AVANCÉES POUR L'ATELIER PAON
 * Améliorations subtiles de l'expérience utilisateur
 */

class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupCursorEffects();
    this.setupHoverMagnification();
    this.setupScrollProgress();
    this.setupParallaxElements();
    this.setupTypingEffect();
    this.setupCounterAnimations();
    this.setupRippleEffects();
  }

  // Effets de curseur personnalisés
  setupCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Effets sur les éléments interactifs
    document.querySelectorAll('a, button, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  // Effet de loupe au survol des images
  setupHoverMagnification() {
    document.querySelectorAll('.hero-avatar, .profile-image').forEach(img => {
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(1.1)';
      });

      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center';
      });
    });
  }

  // Barre de progression du scroll
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
  }

  // Effets parallax subtils
  setupParallaxElements() {
    const parallaxElements = document.querySelectorAll('.floating-circle, .bg-shape-1, .bg-shape-2');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Effet de frappe pour les titres
  setupTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.borderRight = '2px solid var(--primary-color)';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Faire clignoter le curseur
          setInterval(() => {
            el.style.borderRight = el.style.borderRight === 'none' 
              ? '2px solid var(--primary-color)' 
              : 'none';
          }, 500);
        }
      };
      
      // Démarrer l'animation quand l'élément est visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 1000);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(el);
    });
  }

  // Animations de compteur pour les statistiques
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/\D/g, ''));
      const suffix = counter.textContent.replace(/\d/g, '');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = Math.floor(current) + suffix;
            }, 50);
            
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(counter);
    });
  }

  // Effets de ripple sur les boutons
  setupRippleEffects() {
    document.querySelectorAll('.btn, .nav-list a').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
}

// Styles CSS pour les micro-interactions
const microInteractionStyles = `
<style>
/* Curseur personnalisé */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.1s ease;
  opacity: 0.5;
}

.custom-cursor.cursor-hover .cursor-ring {
  width: 60px;
  height: 60px;
  opacity: 0.8;
}

/* Barre de progression du scroll */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: var(--gradient-primary);
  z-index: 1001;
  transition: width 0.1s ease;
}

/* Animation ripple */
@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

/* Améliorations des images au survol */
.hero-avatar, .profile-image {
  transition: transform 0.3s ease;
  cursor: none;
}

/* Effets de parallax */
.floating-circle, .bg-shape-1, .bg-shape-2 {
  will-change: transform;
}

/* Responsive pour les micro-interactions */
@media (max-width: 768px) {
  .custom-cursor {
    display: none;
  }
  
  .hero-avatar, .profile-image {
    cursor: auto;
  }
}

/* Mode sombre pour les micro-interactions */
@media (prefers-color-scheme: dark) {
  .cursor-dot {
    background: var(--primary-color);
  }
  
  .cursor-ring {
    border-color: var(--primary-color);
  }
}
</style>
`;

// Injection des styles
document.head.insertAdjacentHTML('beforeend', microInteractionStyles);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si l'utilisateur préfère les animations réduites
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (!prefersReducedMotion.matches) {
    new MicroInteractions();
  }
});

// Gestion des erreurs pour les micro-interactions
window.addEventListener('error', (e) => {
  if (e.filename && e.filename.includes('micro-interactions')) {
    console.warn('Micro-interaction error:', e.message);
    // Désactiver les micro-interactions en cas d'erreur
    document.querySelector('.custom-cursor')?.remove();
    document.querySelector('.scroll-progress')?.remove();
  }
});
