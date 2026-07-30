document.addEventListener('DOMContentLoaded', () => {

    /* ---------- footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- header shadow on scroll ---------- */
    const header = document.getElementById('site-header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- mobile menu toggle ---------- */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    const closeMobileNav = () => {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    /* close mobile nav if resized back to desktop */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 860) closeMobileNav();
    });

    /* ---------- active nav link on scroll (scroll-spy) ---------- */
    const sections = ['services', 'process', 'projects', 'about', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => spyObserver.observe(section));

    /* ---------- reveal-on-scroll for cards ---------- */
    const revealTargets = document.querySelectorAll(
        '.service-card, .project-card, .process-step, .testimonial, .split-card, .split-copy'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));

    /* ---------- contact form (front-end only demo) ---------- */
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !emailOk) {
            note.textContent = 'Please add your name and a valid email before sending.';
            note.style.color = '#C0392B';
            return;
        }

        note.textContent = `Thanks, ${name.split(' ')[0]} — we'll be in touch within one business day.`;
        note.style.color = '#2F7A4D';
        form.reset();
    });

});