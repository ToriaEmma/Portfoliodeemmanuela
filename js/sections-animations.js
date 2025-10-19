// Mobile menu toggle
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
          document.getElementById('mobile-menu').classList.add('hidden');
      });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Form submission
  document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      alert('Merci pour votre message ! Je vous répondrai dès que possible.');
      
      // Reset form
      this.reset();
  });
  
  // Animation progressive des barres de compétences
  function animateSkillBars() {
      document.querySelectorAll('.skill-progress').forEach(bar => {
          const target = bar.getAttribute('data-skill');
          setTimeout(() => {
              bar.style.width = target;
          }, 100);
      });
  }
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
      const skillsObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateSkillBars();
                  skillsObs.unobserve(skillsSection);
              }
          });
      }, { threshold: 0.3 });
      skillsObs.observe(skillsSection);
  }
  
  // Simple 3D background with Three.js
  function init3DBackground() {
      const container = document.getElementById('canvas-container');
      
      // Create scene
      const scene = new THREE.Scene();
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      
      // Create geometry and material
      const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      const material = new THREE.MeshBasicMaterial({ 
          color: 0x667eea,
          wireframe: true 
      });
      
      // Create mesh and add to scene
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);
      
      // Add more floating shapes
      const shapes = [];
      const colors = [0x764ba2, 0x667eea, 0x9f7aea, 0xa3bffa];
      
      for (let i = 0; i < 5; i++) {
          const shapeType = Math.random() > 0.5 ? 
              new THREE.BoxGeometry(0.5, 0.5, 0.5) : 
              new THREE.SphereGeometry(0.3, 16, 16);
          
          const shapeMaterial = new THREE.MeshBasicMaterial({
              color: colors[Math.floor(Math.random() * colors.length)],
              wireframe: true,
              transparent: true,
              opacity: 0.7
          });
          
          const shape = new THREE.Mesh(shapeType, shapeMaterial);
          
          // Random position
          shape.position.x = (Math.random() - 0.5) * 10;
          shape.position.y = (Math.random() - 0.5) * 10;
          shape.position.z = (Math.random() - 0.5) * 10;
          
          // Random rotation
          shape.rotation.x = Math.random() * Math.PI;
          shape.rotation.y = Math.random() * Math.PI;
          
          // Random scale
          const scale = 0.5 + Math.random() * 1.5;
          shape.scale.set(scale, scale, scale);
          
          scene.add(shape);
          shapes.push(shape);
      }
      
      // Animation loop
      function animate() {
          requestAnimationFrame(animate);
          
          torus.rotation.x += 0.005;
          torus.rotation.y += 0.01;
          
          shapes.forEach(shape => {
              shape.rotation.x += 0.001;
              shape.rotation.y += 0.002;
              
              // Float up and down
              shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.001;
          });
          
          renderer.render(scene, camera);
      }
      
      // Handle window resize
      function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      }
      
      window.addEventListener('resize', onWindowResize, false);
      
      // Start animation
      animate();
  }
  
  // Initialize 3D background
  if (document.getElementById('canvas-container')) {
      init3DBackground();
  }
  
  // Affichage dynamique des designs
  document.getElementById('show-designs-btn').addEventListener('click', function() {
      const gallery = document.getElementById('designs-gallery');
      gallery.classList.toggle('hidden');
      this.textContent = gallery.classList.contains('hidden') ? 'Voir quelques designs' : 'Masquer les designs';
  });
