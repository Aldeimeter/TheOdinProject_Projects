import "./styles.css";

import homepage from "./homepage";
import menu from "./menu";

const header = document.querySelector('header');
const sentinel = document.querySelector('#header-sentinel');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      header.classList.remove('scrolled');
    } else {
      header.classList.add('scrolled');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px 0px 0px 0px'
  }
);

observer.observe(sentinel);
// homepage();

// menu();

