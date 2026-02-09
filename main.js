/**
 * Deoderm Website Main JavaScript
 * Handles navigation, interactions, and animations.
 */

class DeodermApp {
    constructor() {
        this.header = document.getElementById('main-header');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.nav = document.querySelector('.nav');
        this.headerCTA = document.querySelector('.header__cta');
    }

    init() {
        this.setEventHandlers();
    }

    setEventHandlers() {
        // Mobile Menu Toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Sticky Header effect on scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    toggleMobileMenu() {
        const isExpanded = this.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        this.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);

        // Toggle active class on nav
        this.nav.classList.toggle('nav--active');

        // Change icon
        const icon = this.mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.header.classList.add('header--scrolled');
        } else {
            this.header.classList.remove('header--scrolled');
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (this.nav.classList.contains('nav--active')) {
                this.toggleMobileMenu();
            }

            // Offset for fixed header
            const headerHeight = this.header.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const app = new DeodermApp();
    app.init();
});
