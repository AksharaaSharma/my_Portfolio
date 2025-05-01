/**
 * main.js - Portfolio Website
 * Enhances the pink-themed portfolio with beautiful animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initializeThemeToggle();
  initializeScrollAnimations();
  initializeParticleBackground();
  initializeProjectsGallery();
  initializeTypingEffect();
  initializeContactForm();
  initializeNavigation();
  initializeCursorEffect();
});

/**
 * Smooth theme toggle with animation
 */
function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle') || createThemeToggle();
  const root = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Set initial theme
  root.setAttribute('data-theme', currentTheme);
  themeToggle.classList.toggle('active', currentTheme === 'dark');
  
  themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    
    // Add transition class for smooth color transitions
    root.classList.add('theme-transition');
    
    // Update theme
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle active class for the button
    themeToggle.classList.toggle('active');
    
    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 800);
  });
}

/**
 * Create theme toggle if it doesn't exist in HTML
 */
function createThemeToggle() {
  const toggle = document.createElement('button');
  toggle.className = 'theme-toggle';
  toggle.innerHTML = `
    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0-2V4m0 16v-3m7-7h-3m-8 0H4m14.66 3.66l-2.12-2.12m-10.42 0l2.12-2.12m10.42 10.42l-2.12-2.12m-10.42 0l2.12-2.12"/>
    </svg>
    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 3a9 9 0 108.9 7.6 4.5 4.5 0 01-5.5-7 9 9 0 00-3.4-.6z"/>
    </svg>
  `;
  document.body.appendChild(toggle);
  return toggle;
}

/**
 * Scroll animations for elements
 */
function initializeScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animateElements.length) {
    addAnimationClasses();
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Add animation classes to elements
 */
function addAnimationClasses() {
  // Add to section titles
  document.querySelectorAll('h2, h3').forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Add to project cards
  document.querySelectorAll('.project-card, .skill-item').forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Add to paragraphs in about section
  document.querySelectorAll('#about p').forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${index * 0.15}s`;
  });
}

/**
 * Create interactive particle background
 */
function initializeParticleBackground() {
  const canvas = document.querySelector('#particles') || createParticleCanvas();
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Create particles
  function createParticles() {
    const particleCount = Math.floor(window.innerWidth / 30);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--accent-color'),
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  createParticles();
  
  // Update and draw particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
      ctx.fill();
    });
    
    // Connect particles with lines if they're close enough
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${hexToRgb(p1.color)}, ${0.1 * (1 - distance / 100)})`;
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Update particle colors when theme changes
  const observer = new MutationObserver(() => {
    const newColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    particles.forEach(p => p.color = newColor);
  });
  
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

/**
 * Create canvas for particles if it doesn't exist
 */
function createParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:-1;';
  document.body.prepend(canvas);
  return canvas;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '').trim();
  
  // Default to a soft pink if hex is invalid
  if (!/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(hex)) {
    hex = 'ff9ebb';
  }
  
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

/**
 * Projects gallery with filtering and animations
 */
function initializeProjectsGallery() {
  const projectsContainer = document.querySelector('.projects-container');
  
  if (!projectsContainer) return;
  
  // Add filter buttons if they don't exist
  if (!document.querySelector('.project-filters')) {
    addProjectFilters(projectsContainer);
  }
  
  // Initialize filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active filter button
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
      });
      
      // Filter projects
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Initialize project modal functionality
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card.querySelector('img').src, card.querySelector('h3').textContent, 
                      card.querySelector('p').textContent);
    });
  });
}

/**
 * Add project filter buttons
 */
function addProjectFilters(container) {
  const categories = ['all'];
  
  // Collect unique categories
  document.querySelectorAll('.project-card').forEach(card => {
    const category = card.getAttribute('data-category');
    if (category && !categories.includes(category)) {
      categories.push(category);
    }
  });
  
  // Create filter buttons
  const filtersDiv = document.createElement('div');
  filtersDiv.className = 'project-filters';
  
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (category === 'all' ? ' active' : '');
    btn.setAttribute('data-filter', category);
    btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    filtersDiv.appendChild(btn);
  });
  
  container.parentNode.insertBefore(filtersDiv, container);
}

/**
 * Open project details modal
 */
function openProjectModal(imgSrc, title, description) {
  // Create modal if it doesn't exist
  let modal = document.querySelector('.project-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img src="" alt="Project Image">
        <h2></h2>
        <p></p>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    });
    
    // Close on click outside
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // Update modal content
  modal.querySelector('img').src = imgSrc;
  modal.querySelector('h2').textContent = title;
  modal.querySelector('p').textContent = description;
  
  // Show modal with animation
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/**
 * Add typing effect to header title
 */
function initializeTypingEffect() {
  const headerTitle = document.querySelector('header h1') || document.querySelector('h1');
  
  if (!headerTitle) return;
  
  const text = headerTitle.textContent;
  headerTitle.textContent = '';
  headerTitle.classList.add('typing-effect');
  
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      headerTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      headerTitle.classList.add('typing-done');
    }
  }, 100);
}

/**
 * Interactive form with validation and animation
 */
function initializeContactForm() {
  const form = document.querySelector('#contact form');
  
  if (!form) return;
  
  // Add floating label effect if not already present
  if (!form.classList.contains('floating-labels')) {
    form.classList.add('floating-labels');
    
    form.querySelectorAll('input, textarea').forEach(input => {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-field';
      
      const label = document.createElement('label');
      label.setAttribute('for', input.id || `field-${Math.random().toString(36).substr(2, 9)}`);
      label.textContent = input.placeholder || input.name;
      
      if (!input.id) {
        input.id = label.getAttribute('for');
      }
      
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      wrapper.appendChild(label);
      
      // Handle input state
      input.addEventListener('focus', () => wrapper.classList.add('active'));
      input.addEventListener('blur', () => {
        if (!input.value) {
          wrapper.classList.remove('active');
        }
      });
      
      // Set initial state
      if (input.value) {
        wrapper.classList.add('active');
      }
    });
  }
  
  // Form validation
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
      const wrapper = input.closest('.form-field');
      
      if (input.required && !input.value.trim()) {
        wrapper.classList.add('error');
        isValid = false;
      } else {
        wrapper.classList.remove('error');
      }
      
      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          wrapper.classList.add('error');
          isValid = false;
        }
      }
    });
    
    if (isValid) {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.textContent = 'Message sent successfully!';
      
      form.appendChild(successMsg);
      form.reset();
      
      // Reset form fields
      form.querySelectorAll('.form-field').forEach(field => {
        field.classList.remove('active');
      });
      
      // Remove success message after a delay
      setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => {
          form.removeChild(successMsg);
        }, 300);
      }, 3000);
      
      // In a real application, you'd send the form data to a server here
    }
  });
}

/**
 * Smooth navigation and scroll effects
 */
function initializeNavigation() {
  const navbar = document.querySelector('nav');
  
  if (!navbar) return;
  
  // Make navigation sticky on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offset = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active nav link
          document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('active');
          });
          link.classList.add('active');
        }
      }
    });
  });
  
  // Highlight current section in navigation
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 10;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('nav a').forEach(navLink => {
          navLink.classList.remove('active');
          if (navLink.getAttribute('href') === `#${sectionId}`) {
            navLink.classList.add('active');
          }
        });
      }
    });
  });
  
  // Add mobile menu toggle if not already present
  if (!document.querySelector('.mobile-menu-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    navbar.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('mobile-menu-open');
      });
    });
  }
}

/**
 * Custom cursor effect for added aesthetic
 */
function initializeCursorEffect() {
  // Create custom cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  // Move cursor with mouse
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Add a slight delay to the dot for a trailing effect
    setTimeout(() => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 100);
  });
  
  // Add hover effect for clickable elements
  document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      cursorDot.classList.add('hovering');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursorDot.classList.remove('hovering');
    });
  });
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.style.cursor = 'none';
  });
}
