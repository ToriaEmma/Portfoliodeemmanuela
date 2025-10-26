// Fonction pour basculer l'affichage du contenu supplémentaire
function toggleProjectDetails(button) {
  const card = button.closest('.project-card-premium');
  const content = card.querySelector('.project-more-content');
  const icon = button.querySelector('i');
  
  // Basculer la classe 'active' sur le bouton
  button.classList.toggle('active');
  
  // Basculer la classe 'show' sur le contenu
  content.classList.toggle('show');
  
  // Changer l'icône et le texte du bouton
  if (button.classList.contains('active')) {
    icon.className = 'fas fa-chevron-up';
    button.innerHTML = 'Voir moins <i class="fas fa-chevron-up"></i>';
  } else {
    icon.className = 'fas fa-chevron-down';
    button.innerHTML = 'Voir plus <i class="fas fa-chevron-down"></i>';
  }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  // Cacher tous les contenus supplémentaires par défaut
  const moreContents = document.querySelectorAll('.project-more-content');
  moreContents.forEach(content => {
    content.style.display = 'none';
  });
  
  // Ajouter des écouteurs d'événements pour tous les boutons "Voir plus"
  const seeMoreButtons = document.querySelectorAll('.see-more-btn');
  seeMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleProjectDetails(this);
    });
  });
});
