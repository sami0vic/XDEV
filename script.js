// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzbqVnsYtL3Bmm1jI8psWfK1UCqSgXzwc",
    authDomain: "xdev-xplatform.firebaseapp.com",
    databaseURL: "https://xdev-xplatform-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xdev-xplatform",
    storageBucket: "xdev-xplatform.appspot.com",
    messagingSenderId: "935566646191",
    appId: "1:935566646191:web:84d85e10813f2f3cc36d5a",
    measurementId: "G-FN1G38R5QL"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
      // Hide login link, show user info for desktop
      document.getElementById('login-link').style.display = 'none';
      document.getElementById('user-info').style.display = 'block'; // or 'flex' for flex layout

      // Hide login link, show user info for mobile
      const mobileLoginLink = document.querySelector('#mobile-menu #login-link');
      const mobileUserInfo = document.querySelector('#mobile-menu #user-info');
      if (mobileLoginLink && mobileUserInfo) {
          mobileLoginLink.style.display = 'none';
          mobileUserInfo.style.display = 'block'; // or 'flex' for flex layout
      }
  } else {
      window.location.href = 'login.html';
      // Show login link, hide user info for desktop
      // document.getElementById('login-link').style.display = 'block';
      // document.getElementById('user-info').style.display = 'none';

      // // Show login link, hide user info for mobile
      // const mobileLoginLink = document.querySelector('#mobile-menu #login-link');
      // const mobileUserInfo = document.querySelector('#mobile-menu #user-info');
      // if (mobileLoginLink && mobileUserInfo) {
      //     mobileLoginLink.style.display = 'block';
      //     mobileUserInfo.style.display = 'none';
      // }
  }
});


document.getElementById("profileButton").addEventListener("click", function() {
    var menu = document.getElementById("profileMenu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
});  

// Stats animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-count]');

    const countUp = (el, endValue) => {
      let startValue = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / endValue));
      const step = () => {
        startValue += 1;
        el.textContent = `+${startValue.toLocaleString()}`;
        if (startValue < endValue) {
          setTimeout(step, stepTime);
        }
      };
      step();
    };

    const handleScroll = () => {
      counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          const endValue = parseInt(counter.getAttribute('data-count'));
          countUp(counter, endValue);
          observer.unobserve(counter);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    handleScroll(); // Initial check
});

// Mobile menu handling
const menu = document.getElementById('mobile-menu');
const openMenuButton = document.getElementById('open-menu-button');
const closeMenuButton = document.getElementById('close-menu');
const backdrop = document.getElementById('menu-backdrop');

openMenuButton.addEventListener('click', () => {
    menu.style.display = 'block';
});

closeMenuButton.addEventListener('click', () => {
    menu.style.display = 'none';
});

backdrop.addEventListener('click', () => {
    menu.style.display = 'none';
});

// Global error handler
window.onerror = function(message, source, lineno, colno, error){
    console.error(`Error: ${message} at ${source}:${lineno}:${colno}`);
    window.location.href = '/404.html';
    return true;
};