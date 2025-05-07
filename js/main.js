import * as bootstrap from "bootstrap";

// Helper function to slugify a string (for IDs)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Function to render goats on the page
function renderGoats(goatsData) {
  if (!goatsData || !Array.isArray(goatsData) || goatsData.length === 0) {
    console.error('No goats data available');
    document.getElementById('goats-container').innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-warning">
          <h4>No goats data available</h4>
          <p>Please check the console for more information.</p>
        </div>
      </div>
    `;
    return;
  }
  
  const goatsContainer = document.getElementById('goats-container');
  const goatModalsContainer = document.getElementById('goat-modals-container');
  
  // Clear existing content
  goatsContainer.innerHTML = '';
  goatModalsContainer.innerHTML = '';
  
  goatsData.forEach(goat => {
    // Create goat card
    const goatCol = document.createElement('div');
    goatCol.className = 'col-md-6 col-lg-4';
    
    const goatId = slugify(goat.name);
    
    goatCol.innerHTML = `
      <a class="goats-item d-block mx-auto" href="#${goatId}">
        <div class="goats-item-caption d-flex position-absolute h-100 w-100">
          <div class="goats-item-caption-content my-auto w-100 text-center text-white">
            <i class="fas fa-search-plus fa-3x"></i>
          </div>
        </div>
        <picture>
          <!-- Removed query parameters for Cloudflare compatibility -->
          <img class="img-fluid cover" src="${goat.image}" alt="${goat.name}" loading="lazy" />
        </picture>
      </a>
    `;
    
    goatsContainer.appendChild(goatCol);
    
    // Create goat modal
    const modal = document.createElement('dialog');
    modal.className = 'goats-modal';
    modal.id = goatId;
    
    modal.innerHTML = `
      <form class="goats-modal-dialog bg-white" method="dialog">
        <button type="submit" class="close-button btn btn-link d-none d-md-block goats-modal-dismiss">
          <i class="fas fa-3x fa-times"></i>
        </button>
        <div class="container text-center">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <h2 class="text-secondary text-uppercase mb-0">${goat.name}</h2>
              <hr class="star-dark mb-5" />
              <picture>
                <!-- Removed query parameters for Cloudflare compatibility -->
                <img class="img-fluid mb-5" src="${goat.image}" alt="${goat.name}" loading="lazy" />
              </picture>
              <p class="mb-5">${goat.description}</p>
              <button type="submit" class="btn btn-primary btn-lg rounded-pill goats-modal-dismiss">
                <i class="fas fa-xmark"></i>
                Bye Goat
              </button>
            </div>
          </div>
        </div>
      </form>
    `;
    
    goatModalsContainer.appendChild(modal);
  });
  
  // Set up modal handlers
  setupModalHandlers();
}

// Set up modal handlers
function setupModalHandlers() {
  // Trigger modal dialogs; preventing background scroll when open
  document.querySelectorAll(".goats-item").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      const dialog = document.querySelector(node.getAttribute("href"));
      if (dialog) {
        dialog.addEventListener(
          "close",
          () => {
            document.body.classList.remove("scroll-lock");
          },
          { once: true },
        );
        dialog.showModal();
        document.body.classList.add("scroll-lock");
      }
    });
  });
  
  // Handle modal closing
  document.querySelectorAll('.close-button, .goats-modal-dismiss').forEach(button => {
    button.addEventListener('click', function() {
      const dialog = this.closest('dialog');
      if (dialog) {
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
}

// Initialize UI elements
function initializeUI() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Set up Bootstrap ScrollSpy
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#mainNav",
    offset: 80,
  });
  
  // Closes responsive menu when a scroll trigger link is clicked
  document.querySelectorAll(".js-scroll-trigger").forEach((node) => {
    node.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
  
  // Scroll to top button appear
  const scrollToTopObserver = new IntersectionObserver((entries) => {
    const [{ isIntersecting, target }] = entries;
    const shouldShow = !isIntersecting;
    target.classList.toggle("enabled", shouldShow);
  });
  
  const scrollToTopButton = document.querySelector(".scroll-to-top");
  if (scrollToTopButton) {
    scrollToTopObserver.observe(scrollToTopButton);
  }

  // Shrink nav when page is not scrolled to top
  const navObserver = new IntersectionObserver(
    (entries) => {
      const [{ intersectionRatio, target }] = entries;
      const shouldShrink = intersectionRatio < 1;
      target.classList.toggle("navbar-shrink", shouldShrink);
    },
    { threshold: 1 }
  );
  
  const mainNav = document.querySelector("#mainNav");
  if (mainNav) {
    navObserver.observe(mainNav);
  }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI elements
  initializeUI();
  
  // Show loading indicator
  document.getElementById('goats-container').innerHTML = `
    <div class="col-12 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading goats...</p>
    </div>
  `;
  
  // Check if goats data is already available
  if (window.goatsData && Array.isArray(window.goatsData)) {
    renderGoats(window.goatsData);
  } else {
    // Listen for the goatsDataLoaded event
    window.addEventListener('goatsDataLoaded', function(event) {
      renderGoats(event.detail.goatsData);
    });
  }
});
