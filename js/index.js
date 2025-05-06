import * as bootstrap from "bootstrap";

// Simple function to handle modals
document.addEventListener('DOMContentLoaded', function() {
  // Set up Bootstrap components
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#mainNav",
    offset: 80,
  });

  // Handle modal opening
  document.querySelectorAll('.goats-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href'); // This already includes the #
      console.log('Opening modal:', targetId);
      const targetModal = document.querySelector(targetId);
      
      // Show the modal
      if (targetModal && targetModal.tagName === 'DIALOG') {
        console.log('Dialog found, showing it');
        targetModal.showModal();
        document.body.classList.add('scroll-lock');
      } else {
        console.error('Dialog not found or not a dialog element:', targetId);
      }
    });
  });
  
  // Handle modal closing
  document.querySelectorAll('.close-button, .goats-modal-dismiss').forEach(button => {
    button.addEventListener('click', function() {
      const dialog = this.closest('dialog');
      if (dialog) {
        console.log('Closing dialog:', dialog.id);
        dialog.close();
        document.body.classList.remove('scroll-lock');
      }
    });
  });
  
  // Close modal when clicking on backdrop (outside of dialog content)
  document.querySelectorAll('dialog.goats-modal').forEach(dialog => {
    dialog.addEventListener('click', function(e) {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                        rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
      
      if (!isInDialog || e.target === this) {
        dialog.close();
        document.body.classList.remove('scroll-lock');
      }
    });
  });
  
  // Dialog elements handle ESC key automatically, but we'll add a backup
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const openDialogs = document.querySelectorAll('dialog[open]');
      openDialogs.forEach(dialog => {
        dialog.close();
        document.body.classList.remove('scroll-lock');
      });
    }
  });
  
  // Closes responsive menu when a scroll trigger link is clicked
  document.querySelectorAll(".js-scroll-trigger").forEach((node) => {
    node.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });
  
  // Scroll to top button appear
  new IntersectionObserver((entries) => {
    const [{ isIntersecting, target }] = entries;
    const shouldShow = !isIntersecting;
    target.classList.toggle("enabled", shouldShow);
  }).observe(document.querySelector(".scroll-to-top"));
});

// Shrink nav when page is not scrolled to top. Note that this relies on CSS
// `position: sticky; top: -1px` which will trigger this IntersectionObserver
// as the user scrolls, since it pushes the nav 1px out of the root
// intersection rect.
new IntersectionObserver(
  (entries) => {
    const [{ intersectionRatio, target }] = entries;
    const shouldShrink = intersectionRatio < 1;
    target.classList.toggle("navbar-shrink", shouldShrink);
  },
  {
    threshold: 1,
  },
).observe(document.querySelector("#mainNav"));
