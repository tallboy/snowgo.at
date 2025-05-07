document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
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

  // Populate goats section
  const goatsContainer = document.getElementById('goats-container');
  const goatModalsContainer = document.getElementById('goat-modals-container');
  
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

  // Trigger modal dialogs; preventing background scroll when open
  document.querySelectorAll(".goats-item").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      const dialog = document.querySelector(node.getAttribute("href"));
      dialog.addEventListener(
        "close",
        () => {
          document.body.classList.remove("scroll-lock");
        },
        { once: true },
      );

      dialog.showModal();
      document.body.classList.add("scroll-lock");
    });
  });

  // Closes responsive menu when a scroll trigger link is clicked
  document.querySelectorAll(".js-scroll-trigger").forEach((node) => {
    node.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Activate scrollspy to add active class to navbar items on scroll
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#mainNav",
    offset: 80,
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
    {
      threshold: 1,
    }
  );
  
  const mainNav = document.querySelector("#mainNav");
  if (mainNav) {
    navObserver.observe(mainNav);
  }
});
