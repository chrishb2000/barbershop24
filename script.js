/**
 * 24 Hour BarberShop - Main JavaScript
 * Handles: Language Toggle, Portfolio Modal, Scroll Functions, Carousel, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Language Toggle
    // ========================================
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-en]');
    
    let currentLang = 'en';
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            if (lang !== currentLang) {
                currentLang = lang;
                
                // Update button states
                langButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update all translatable elements
                translatableElements.forEach(el => {
                    const text = el.getAttribute(`data-${lang}`);
                    if (text) {
                        el.textContent = text;
                    }
                });
                
                // Update HTML lang attribute
                document.documentElement.lang = lang;
                
                // Save preference to localStorage
                localStorage.setItem('preferredLang', lang);
            }
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    if (savedLang === 'es') {
        const esButton = document.querySelector('.lang-btn[data-lang="es"]');
        if (esButton) {
            esButton.click();
        }
    }
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // Navbar Background on Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
        }
    });
    
    // ========================================
    // Portfolio Modal
    // ========================================
    const modal = document.getElementById('portfolioModal');
    const modalImage = document.querySelector('.modal-image');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    let currentImageIndex = 0;
    
    // Convert NodeList to Array for easier handling
    const portfolioImages = Array.from(portfolioItems).map(img => img.src);
    
    portfolioItems.forEach((img, index) => {
        img.parentElement.addEventListener('click', function() {
            currentImageIndex = index;
            openModal(portfolioImages[currentImageIndex]);
        });
    });
    
    function openModal(src) {
        if (modal && modalImage) {
            modalImage.src = src;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModalFunc() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
        modalImage.src = portfolioImages[currentImageIndex];
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
        modalImage.src = portfolioImages[currentImageIndex];
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', showPrevImage);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', showNextImage);
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModalFunc();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // ========================================
    // Testimonials - Hover Effect Pause (Optional)
    // ========================================
    // Carousel removed - all testimonials visible at once
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // Active Navigation Highlight
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary-color)';
                } else {
                    navLink.style.color = 'var(--text-color)';
                }
            }
        });
    });
    
});
