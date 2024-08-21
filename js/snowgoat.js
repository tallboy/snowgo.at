import * as bootstrap from "bootstrap";

// trigger modal dialogs; preventing background scroll when open
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
    const collapsible = new bootstrap.Collapse(
      document.querySelector(".navbar-collapse"),
    );
    collapsible.collapse();
  });
});

// Activate scrollspy to add active class to navbar items on scroll
new bootstrap.ScrollSpy(document.body, {
  target: "#mainNav",
  offset: 80,
});

// Scroll to top button appear. Note that this relies on CSS
// `position: absolute; top: $distance`, where $distance is the length
// the page needs to scroll before the button should be visible
new IntersectionObserver((entries) => {
  const [{ isIntersecting, target }] = entries;
  const shouldShow = !isIntersecting;
  target.classList.toggle("enabled", shouldShow);
}).observe(document.querySelector(".scroll-to-top"));

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
