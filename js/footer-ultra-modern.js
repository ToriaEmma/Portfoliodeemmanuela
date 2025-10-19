// ======== FOOTER ULTRA-MODERNE JAVASCRIPT ========

document.addEventListener('DOMContentLoaded', function() {
    
    // === ANIMATIONS DES STATISTIQUES === //
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.dataset.count);
                    let currentValue = 0;
                    const increment = finalValue / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(currentValue);
                        }
                    }, stepTime);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    // === GESTION DE LA NEWSLETTER === //
    function initNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form-modern');
        const newsletterInput = document.querySelector('.newsletter-input-modern');
        const newsletterBtn = document.querySelector('.newsletter-btn-modern');
        
        if (newsletterForm && newsletterInput && newsletterBtn) {
            // Animation du label flottant
            newsletterInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            newsletterInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Validation et soumission
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = newsletterInput.value.trim();
                if (validateEmail(email)) {
                    // Animation de succès
                    showNewsletterFeedback('Merci ! Vous êtes maintenant abonné(e) 🎉', 'success');
                    newsletterInput.value = '';
                    
                    // Effet ripple sur le bouton
                    createRippleEffect(newsletterBtn, e);
                } else {
                    showNewsletterFeedback('Veuillez entrer une adresse email valide', 'error');
                }
            });
        }
    }
    
    // === VALIDATION EMAIL === //
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // === FEEDBACK NEWSLETTER === //
    function showNewsletterFeedback(message, type) {
        const existing = document.querySelector('.newsletter-feedback');
        if (existing) existing.remove();
        
        const feedback = document.createElement('div');
        feedback.className = `newsletter-feedback ${type}`;
        feedback.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        `;
        
        const form = document.querySelector('.newsletter-form-modern');
        form.appendChild(feedback);
        
        // Style du feedback
        Object.assign(feedback.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            background: type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: type === 'success' ? '#22c55e' : '#ef4444',
            animation: 'slideInUp 0.3s ease-out'
        });
        
        setTimeout(() => {
            feedback.style.animation = 'slideOutDown 0.3s ease-in forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 4000);
    }
    
    // === EFFET RIPPLE === //
    function createRippleEffect(button, event) {
        const ripple = button.querySelector('.btn-ripple') || button.querySelector('.scroll-ripple');
        if (ripple) {
            ripple.style.width = '0';
            ripple.style.height = '0';
            
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 600);
            }, 10);
        }
    }
    
    // === ANIMATIONS AU SCROLL === //
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observer les sections du footer
        const footerSections = document.querySelectorAll('.footer-section, .newsletter-section-modern, .social-section-modern');
        footerSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });
    }
    
    // === EFFETS HOVER AVANCÉS === //
    function initAdvancedHovers() {
        // Cartes sociales avec effet parallax
        const socialCards = document.querySelectorAll('.social-card');
        socialCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
        
        // Effet magnetic sur les boutons CTA
        const ctaButtons = document.querySelectorAll('.cta-btn');
        ctaButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0px, 0px) translateY(0px)';
            });
        });
    }
    
    // === PARTICULES INTERACTIVES === //
    function initInteractiveParticles() {
        const footer = document.querySelector('.footer-ultra-modern');
        if (!footer) return;
        
        // Animation des particules supprimée
    }
    
    // === SMOOTH SCROLL POUR LES LIENS === //
    function initSmoothScroll() {
        const footerLinks = document.querySelectorAll('.nav-link-modern[href^="#"], .cta-btn[href^="#"]');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // === THÈME ADAPTATIF === //
    function initAdaptiveTheme() {
        const footer = document.querySelector('.footer-ultra-modern');
        if (!footer) return;
        
        // Détection du thème système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (!prefersDark) {
            // Ajustements pour le thème clair si nécessaire
            footer.style.setProperty('--footer-text-muted', '#6b7280');
            footer.style.setProperty('--footer-border', 'rgba(0, 0, 0, 0.1)');
        }
        
        // Écouter les changements de thème
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                // Thème sombre
                footer.style.setProperty('--footer-text-muted', '#a0a9c0');
                footer.style.setProperty('--footer-border', 'rgba(255, 255, 255, 0.1)');
            } else {
                // Thème clair
                footer.style.setProperty('--footer-text-muted', '#6b7280');
                footer.style.setProperty('--footer-border', 'rgba(0, 0, 0, 0.1)');
            }
        });
    }
    
    // === PERFORMANCE OPTIMIZATIONS === //
    function initPerformanceOptimizations() {
        // Lazy loading pour les animations coûteuses
        let ticking = false;
        
        function updateAnimations() {
            // Mettre à jour les animations ici si nécessaire
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }
        
        // Throttle les événements de scroll et mousemove
        window.addEventListener('scroll', requestTick);
        window.addEventListener('mousemove', requestTick);
    }
    
    // === INITIALISATION === //
    function init() {
        // Attendre que tout soit chargé
        setTimeout(() => {
            animateStats();
            initNewsletter();
            initScrollAnimations();
            initAdvancedHovers();
            initInteractiveParticles();
            initSmoothScroll();
            initAdaptiveTheme();
            initPerformanceOptimizations();
            
            console.log('🎨 Footer Ultra-Moderne initialisé avec succès !');
        }, 100);
    }
    
    // Démarrer l'initialisation
    init();
    
    // === ANIMATIONS CSS KEYFRAMES DYNAMIQUES === //
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        
        .newsletter-feedback {
            animation: slideInUp 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
});

// === UTILITAIRES GLOBAUX === //
window.FooterUtils = {
    // Fonction pour déclencher des effets spéciaux
    triggerSpecialEffect: function(type = 'celebration') {
        if (type === 'celebration') {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    const colors = ['#0cd4bd', '#e91e63', '#667eea', '#f093fb'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    this.createCustomParticle(x, y, color);
                }, i * 100);
            }
        }
    }
};

// Style pour les particules personnalisées
const customParticleStyle = document.createElement('style');
customParticleStyle.textContent = `
    @keyframes customParticleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`;
document.head.appendChild(customParticleStyle);
