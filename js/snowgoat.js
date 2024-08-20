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

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function onClick() {
  if (
    window.location.pathname.replace(/^\//, "") ===
      this.pathname.replace(/^\//, "") &&
    window.location.hostname === this.hostname
  ) {
    let target = $(this.hash);
    target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 70,
        },
        1000,
        "easeInOutExpo",
      );
      return false;
    }
  }

  return true;
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

// Floating label headings for the contact form
$(() => {
  $("body")
    .on(
      "input propertychange",
      ".floating-label-form-group",
      function onInput(e) {
        $(this).toggleClass(
          "floating-label-form-group-with-value",
          !!$(e.target).val(),
        );
      },
    )
    .on("focus", ".floating-label-form-group", function onFocus() {
      $(this).addClass("floating-label-form-group-with-focus");
    })
    .on("blur", ".floating-label-form-group", function onBlur() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
});
