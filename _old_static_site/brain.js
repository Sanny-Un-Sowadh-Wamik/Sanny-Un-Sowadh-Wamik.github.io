
    // Particles.js configuration
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#8b5cf6"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.5,
            "opacity_min": 0.05,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "size_min": 0.5,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#8b5cf6",
          "opacity": 0.1,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 100,
            "line_linked": {
              "opacity": 0.3
            }
          },
          "push": {
            "particles_nb": 3
          }
        }
      },
      "retina_detect": true
    });
    
    // Command Palette Toggle
    const cmdPalette = document.getElementById('cmd-palette');
    const cmdToggle = document.getElementById('cmd-toggle');
    
    cmdToggle.addEventListener('click', () => {
      cmdPalette.classList.add('active');
      cmdPalette.querySelector('input').focus();
    });
    
    document.addEventListener('keydown', (e) => {
      // CMD+K or CTRL+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        cmdPalette.classList.add('active');
        cmdPalette.querySelector('input').focus();
      }
      
      // ESC to close
      if (e.key === 'Escape' && cmdPalette.classList.contains('active')) {
        cmdPalette.classList.remove('active');
      }
    });
    
    // Command Palette Navigation
    const cmdItems = document.querySelectorAll('.cmd-palette-item');
    cmdItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = document.querySelector(item.dataset.target);
        if (target) {
          cmdPalette.classList.remove('active');
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Cmd Palette Search
    const cmdInput = document.querySelector('.cmd-palette-input');
    cmdInput.addEventListener('input', () => {
      const query = cmdInput.value.toLowerCase();
      cmdItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
    
    // Mobile Menu Toggle
    const mobileNav = document.getElementById('mobile-nav');
    const menuToggle = document.querySelector('button.md\\:hidden');
    const closeMenu = document.getElementById('close-mobile-nav');
    
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.remove('hidden');
    });
    
    closeMenu.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const htmlElement = document.documentElement;
    
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
      } else {
        htmlElement.classList.add('dark');
      }
    } else {
      // Check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
    
    // Toggle theme function
    function toggleTheme() {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
    
    // Add event listeners to theme toggle buttons
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    // Animate sections on scroll
    function animateSections() {
      const sections = document.querySelectorAll('.section-animate');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      sections.forEach(section => {
        observer.observe(section);
      });
    }
    
    // Initialize animations when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      animateSections();
    });