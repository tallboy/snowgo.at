import $ from "jquery";
import * as bootstrap from "bootstrap";
import "jquery.easing";

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

// Scroll to top button appear
$(document).scroll(function onScroll() {
  const scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $(".scroll-to-top").fadeIn();
  } else {
    $(".scroll-to-top").fadeOut();
  }
});

// Closes responsive menu when a scroll trigger link is clicked
$(".js-scroll-trigger").click(() => {
  $(".navbar-collapse").collapse("hide");
});

// Activate scrollspy to add active class to navbar items on scroll
new bootstrap.ScrollSpy(document.body, {
  target: "#mainNav",
  offset: 80,
});

// Collapse Navbar
const navbarCollapse = () => {
  if ($("#mainNav").offset().top > 100) {
    $("#mainNav").addClass("navbar-shrink");
  } else {
    $("#mainNav").removeClass("navbar-shrink");
  }
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);
