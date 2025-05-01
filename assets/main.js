// main.js - Creative and aesthetic enhancements for Akshara Sharma's portfolio
// Created May 2025

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and effects
    initializeParticles();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeNavEffects();
    initializeImageEffects();
    initializeThemeSwitcher();
    initializePageTransitions();
});

// ======== PARTICLE BACKGROUND EFFECT ========
function initializeParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle properties
    const particlesArray = [];
    const numberOfParticles = 50;
    const colors = ['#FF7E5F', '#FEB47B', '#7FCDCD', '#26C5DE', '#3083DC'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    // Connect nearby particles with lines
    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particlesArray[a].color;
                    ctx.globalAlpha = 0.2;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
    
    init();
    animate();
    
    // Add CSS for the canvas
    const style = document.createElement('style');
    style.textContent = `
        #particles-canvas {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// ======== TYPING EFFECT FOR HEADINGS ========
function initializeTypingEffect() {
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.textContent = '';
        heading.dataset.originalText = text;
        
        // Only apply effect to visible headings
        if (isElementInViewport(heading)) {
            typeText(heading, text);
        }
    });
    
    // Type when scrolled into view
    window.addEventListener('scroll', () => {
        headings.forEach(heading => {
            if (isElementInViewport(heading) && !heading.dataset.typed && heading.textContent === '') {
                typeText(heading, heading.dataset.originalText);
            }
        });
    });
    
    function typeText(element, text) {
        element.dataset.typed = true;
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// ======== SCROLL ANIMATIONS ========
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutContent) {
        const aboutImage = aboutContent.querySelector('.about-image');
        const aboutText = aboutContent.querySelector('.about-text');
        
        // Initial state
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'translateX(-50px)';
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(50px)';
        
        // Add transition styles
        const style = document.createElement('style');
        style.textContent = `
            .about-image, .about-text {
                transition: opacity 1s ease, transform 1s ease;
            }
            .education-item, .about-text ul li {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            section {
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
        `;
        document.head.appendChild(style);
        
        // Animate in
        setTimeout(() => {
            aboutImage.style.opacity = '1';
            aboutImage.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                aboutText.style.opacity = '1';
                aboutText.style.transform = 'translateX(0)';
                
                // Animate education items and list items with delay
                const educationItems = document.querySelectorAll('.education-item');
                const listItems = document.querySelectorAll('.about-text ul li');
                
                educationItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 300 * index);
                });
                
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200 * index);
                });
            }, 300);
        }, 300);
    }
    
    // Scroll effect for sections
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            } else {
                section.style.opacity = '0.5';
                section.style.transform = 'translateY(50px)';
            }
        });
    });
}

// ======== NAVIGATION EFFECTS ========
function initializeNavEffects() {
    const navLinks = document.querySelectorAll('nav a');
    const marker = document.createElement('div');
    marker.className = 'nav-marker';
    
    // Add marker styling
    const style = document.createElement('style');
    style.textContent = `
        nav {
            position: relative;
        }
        .nav-marker {
            position: absolute;
            height: 3px;
            background: linear-gradient(90deg, #FF7E5F, #FEB47B);
            bottom: -3px;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        nav a {
            position: relative;
            transition: color 0.3s ease;
        }
        nav a:hover {
            color: #FF7E5F;
        }
        nav a.active {
            color: #FF7E5F;
        }
    `;
    document.head.appendChild(style);
    
    // Find active link on load
    const activeLink = document.querySelector('nav a.active');
    if (activeLink) {
        document.querySelector('nav').appendChild(marker);
        updateMarker(activeLink);
    }
    
    // Update marker position on hover
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            updateMarker(link);
        });
    });
    
    // Return to active link when leaving navigation
    document.querySelector('nav').addEventListener('mouseleave', () => {
        const activeLink = document.querySelector('nav a.active');
        if (activeLink) {
            updateMarker(activeLink);
        }
    });
    
    function updateMarker(link) {
        marker.style.width = `${link.offsetWidth}px`;
        marker.style.left = `${link.offsetLeft}px`;
    }
}

// ======== IMAGE EFFECTS ========
function initializeImageEffects() {
    const profileImage = document.querySelector('.about-image img');
    
    if (profileImage) {
        // Create container for effect
        const container = document.createElement('div');
        container.className = 'image-effect-container';
        profileImage.parentNode.insertBefore(container, profileImage);
        container.appendChild(profileImage);
        
        // Add hover effect styles
        const style = document.createElement('style');
        style.textContent = `
            .image-effect-container {
                position: relative;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .image-effect-container:hover {
                transform: scale(1.02) translateY(-5px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }
            
            .image-effect-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 50%;
                height: 100%;
                background: linear-gradient(
                    to right, 
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.3) 100%
                );
                transform: skewX(-25deg);
                transition: all 0.75s;
                z-index: 1;
            }
            
            .image-effect-container:hover::before {
                animation: shine 1.5s;
            }
            
            @keyframes shine {
                100% {
                    left: 125%;
                }
            }
            
            .about-image img {
                transition: filter 0.5s ease;
                filter: contrast(110%) saturate(110%);
            }
            
            .about-image:hover img {
                filter: contrast(120%) saturate(130%);
            }
        `;
        document.head.appendChild(style);
    }
}

// ======== THEME SWITCHER ========
function initializeThemeSwitcher() {
    // Create theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<span>☀️</span><span>🌙</span>';
    document.body.appendChild(themeToggle);
    
    // Add theme toggle styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 100;
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .theme-toggle:hover {
            transform: scale(1.05);
        }
        
        .theme-toggle span {
            position: absolute;
            transition: all 0.3s ease;
        }
        
        .theme-toggle span:nth-child(1) {
            opacity: 1;
            transform: translateY(0);
        }
        
        .theme-toggle span:nth-child(2) {
            opacity: 0;
            transform: translateY(20px);
        }
        
        body.dark-theme .theme-toggle span:nth-child(1) {
            opacity: 0;
            transform: translateY(-20px);
        }
        
        body.dark-theme .theme-toggle span:nth-child(2) {
            opacity: 1;
            transform: translateY(0);
        }
        
        body.dark-theme {
            background-color: #121212;
            color: #f0f0f0;
        }
        
        body.dark-theme nav a {
            color: #e0e0e0;
        }
        
        body.dark-theme nav a.active {
            color: #FEB47B;
        }
        
        body.dark-theme nav a:hover {
            color: #FF7E5F;
        }
        
        body.dark-theme .about-section h1, 
        body.dark-theme .about-section h2 {
            color: #FEB47B;
        }
        
        body.dark-theme footer {
            background-color: #1e1e1e;
            color: #e0e0e0;
        }
        
        body.dark-theme .education-item {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        body.dark-theme .image-effect-container {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// ======== PAGE TRANSITIONS ========
function initializePageTransitions() {
    const navLinks = document.querySelectorAll('nav a');
    
    // Add page transition styles
    const style = document.createElement('style');
    style.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #FF7E5F, #FEB47B);
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        }
    `;
    document.head.appendChild(style);
    
    // Create transition element
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== window.location.pathname.split('/').pop()) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Trigger transition animation
                transitionElement.style.transform = 'translateY(0)';
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
    
    // Hide transition on page load
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            transitionElement.style.transform = 'translateY(100%)';
        }
    });
    
    // Animate in content when page loads
    window.addEventListener('load', () => {
        document.body.style.opacity = 0;
        document.body.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            document.body.style.opacity = 1;
        }, 100);
    });
}
