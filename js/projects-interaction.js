// Gestion complète des interactions projets - version améliorée pour L'Atelier Paon
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.grid__item');
  const featured = document.querySelectorAll('.grid__featured__item');
  const arrows = document.querySelectorAll('.arrow');
  const circles = document.querySelectorAll('.circle');
  
  let featuredProject = 0;
  let isAnimating = false;
  
  // Initialisation - premier projet visible avec animation d'entrée
  if (featured.length > 0) {
    setTimeout(() => {
      featured[0].classList.add('is-visible');
      if (items.length > 0) {
        items[0].setAttribute('aria-selected', 'true');
        items[0].style.transform = 'scale(1.05)';
      }
    }, 500);
  }
  
  // Fonction d'animation améliorée
  function animateProjectTransition(newIndex, oldIndex) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Animation de sortie de l'ancien projet
    if (oldIndex !== undefined && featured[oldIndex]) {
      featured[oldIndex].style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      featured[oldIndex].style.opacity = '0';
      featured[oldIndex].style.transform = 'translateY(20px)';
    }
    
    // Animation d'entrée du nouveau projet
    setTimeout(() => {
      featured.forEach(f => f.classList.remove('is-visible'));
      if (featured[newIndex]) {
        featured[newIndex].classList.add('is-visible');
        featured[newIndex].style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        featured[newIndex].style.opacity = '0';
        featured[newIndex].style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          featured[newIndex].style.opacity = '1';
          featured[newIndex].style.transform = 'translateY(0)';
        }, 50);
      }
      
      // Mise à jour des items
      items.forEach((item, i) => {
        item.removeAttribute('aria-selected');
        item.style.transform = 'scale(1)';
        item.style.transition = 'transform 0.3s ease-out';
      });
      
      if (items[newIndex]) {
        items[newIndex].setAttribute('aria-selected', 'true');
        items[newIndex].style.transform = 'scale(1.05)';
      }
      
      isAnimating = false;
    }, 300);
  }
  
  // Gestion du hover sur les items avec délai
  let hoverTimeout;
  items.forEach((item, i) => {
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        if (featuredProject !== i) {
          const oldIndex = featuredProject;
          featuredProject = i;
          animateProjectTransition(i, oldIndex);
        }
        
        // Animation de la flèche et du cercle améliorée
        const arrow = item.querySelector('.arrow');
        const circle = item.querySelector('.circle');
        
        if (arrow && circle) {
          // Animation d'apparition de la flèche avec effet de rebond
          arrow.style.opacity = '1';
          arrow.style.visibility = 'visible';
          arrow.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          arrow.style.transform = 'scale(1.1)';
          
          setTimeout(() => {
            arrow.style.transform = 'scale(1)';
          }, 200);
          
          // Animation du cercle avec GSAP si disponible
          if (window.gsap) {
            gsap.timeline({paused: true})
              .fromTo(arrow, {autoAlpha: 0, scale: 0.8}, {autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)"}, 0)
              .fromTo(circle, {drawSVG: "0% 0%"}, {drawSVG: "0% 100%", duration: 1.2, ease: "expo.inOut"}, 0)
              .restart();
          } else {
            // Fallback sans GSAP avec animation CSS
            circle.style.strokeDasharray = '1';
            circle.style.strokeDashoffset = '0';
            circle.style.transition = 'stroke-dashoffset 1.2s ease-in-out';
            
            // Effet de pulsation
            setTimeout(() => {
              circle.style.transform = 'scale(1.1)';
              circle.style.transition = 'transform 0.3s ease-in-out';
            }, 600);
          }
        }
      }, 150); // Délai pour éviter les changements trop rapides
    });
    
    item.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      
      // Animation de disparition de la flèche avec effet de fade
      const arrow = item.querySelector('.arrow');
      const circle = item.querySelector('.circle');
      
      if (arrow) {
        if (window.gsap) {
          gsap.timeline({paused: true})
            .to(arrow, {autoAlpha: 0, scale: 0.8, duration: 0.2, ease: "power2.out"}, 0)
            .restart();
        } else {
          arrow.style.opacity = '0';
          arrow.style.transform = 'scale(0.8)';
          arrow.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        }
      }
      
      if (circle) {
        circle.style.transform = 'scale(1)';
        circle.style.transition = 'transform 0.3s ease-in-out';
      }
    });
  });
  
  // Effet de parallaxe sur les images de fond
  function addParallaxEffect() {
    const featuredItems = document.querySelectorAll('.grid__featured__item-back img');
    
    featuredItems.forEach(img => {
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / centerX * 10;
        const moveY = (y - centerY) / centerY * 10;
        
        img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        img.style.transition = 'transform 0.1s ease-out';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1.1) translate(0, 0)';
        img.style.transition = 'transform 0.3s ease-out';
      });
    });
  }
  
  // Animation d'entrée des projets au scroll
  function animateProjectsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const project = entry.target;
          project.style.opacity = '0';
          project.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            project.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, 100);
          
          observer.unobserve(project);
        }
      });
    }, { threshold: 0.1 });
    
    // Observer les items de la grille
    items.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Gestion du scroll pour l'animation des projets (si GSAP disponible)
  if (window.gsap && window.ScrollTrigger) {
    const grid = document.querySelector('.home-projects__grid');
    const list = document.querySelector('.grid__featured__list');
    
    if (grid && list) {
      const listWidth = list.getBoundingClientRect().width + 25;
      
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
      
      ScrollTrigger.matchMedia({
        "(max-width: 1000px)": () => {
          const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
              trigger: grid,
              endTrigger: grid,
              start: "top top",
              end: "bottom bottom",
              scrub: true
            }
          });
          
          // Animation pour chaque projet avec effet de parallaxe
          const projects = document.querySelectorAll('.grid__featured__item');
          projects.forEach((project, i) => {
            const xStart = i >= 1 ? -listWidth * (i - 1) : 0;
            const xEnd = -listWidth * i;
            
            tl.to({}, {duration: 1})
              .fromTo(list, {x: xStart}, {x: xEnd, duration: 1})
              .fromTo(project.querySelector('img'), {scale: 1.1}, {scale: 1, duration: 0.4}, "-=.6");
          });
          
          tl.progress(1).progress(0);
        }
      });
    }
  }
  
  // Initialisation des effets
  setTimeout(() => {
    addParallaxEffect();
    animateProjectsOnScroll();
  }, 1000);
  
  // Effet de particules supprimé pour éliminer les bulles
  
  // CSS pour l'animation des particules
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
  
  // Démarrer les particules après un délai
  setTimeout(createParticles, 2000);
}); 