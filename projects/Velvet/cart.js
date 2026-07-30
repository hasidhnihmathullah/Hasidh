// ── CART FUNCTIONS ──────────────────────────

function getCart() {
    return JSON.parse(localStorage.getItem('vv_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('vv_cart', JSON.stringify(cart));
}

function addToCart(id, name, price, image) {
    let cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, image, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
    showToast(name + ' added to cart!');
}

function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    updateCartCount();
    renderCart();
}

function updateQty(id, qty) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = parseInt(qty);
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    saveCart(cart);
    updateCartCount();
    renderCart();
}

function clearCart() {
    localStorage.removeItem('vv_cart');
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('#cart-count').forEach(function (el) {
        el.textContent = total;
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 3000);
}


// ── NAVBAR SCROLL ────────────────────────────

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


// ── MOBILE MENU ──────────────────────────────

function initMobileMenu() {
    const btn = document.getElementById('nav-mobile');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            links.classList.remove('open');
        });
    });
}


// ── FAQ ACCORDION ────────────────────────────

function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    if (questions.length === 0) return;

    questions.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('open');
            });

            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}


// ── SHOP FILTER ──────────────────────────────

function filterProducts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
    });

    btn.classList.add('active');

    document.querySelectorAll('.card').forEach(function (card) {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// ── FADE IN ON SCROLL ────────────────────────

function initFadeIn() {
    const elements = document.querySelectorAll(
        '.card, .why-card, .section-header'
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(function (el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}


// ── CART PAGE ────────────────────────────────

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const grandEl = document.getElementById('cart-grand-total');
    const emptyEl = document.getElementById('cart-empty');
    const summaryEl = document.getElementById('cart-summary');

    if (!container) return; // Not on cart page

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        if (summaryEl) summaryEl.style.display = 'none';
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (summaryEl) summaryEl.style.display = 'block';

    let html = '';
    let total = 0;

    cart.forEach(function (item) {
        var subtotal = item.price * item.qty;
        total += subtotal;

        html += '<div class="cart-item" id="cart-item-' + item.id + '">'
            + '<div class="cart-item-img">'
            + '<img src="' + item.image + '" alt="' + item.name + '">'
            + '</div>'
            + '<div class="cart-item-info">'
            + '<h3 class="cart-item-name">' + item.name + '</h3>'
            + '<p class="cart-item-price">Rs. ' + item.price.toLocaleString() + '</p>'
            + '</div>'
            + '<div class="cart-item-qty">'
            + '<button class="qty-btn" onclick="updateQty(' + item.id + ',' + (item.qty - 1) + ')">−</button>'
            + '<span class="qty-num">' + item.qty + '</span>'
            + '<button class="qty-btn" onclick="updateQty(' + item.id + ',' + (item.qty + 1) + ')">+</button>'
            + '</div>'
            + '<div class="cart-item-subtotal">Rs. ' + subtotal.toLocaleString() + '</div>'
            + '<button class="cart-remove" onclick="removeFromCart(' + item.id + ')">✕</button>'
            + '</div>';
    });

    container.innerHTML = html;

    if (totalEl) totalEl.textContent = 'Rs. ' + total.toLocaleString();
    if (grandEl) grandEl.textContent = 'Rs. ' + total.toLocaleString();
}


// ── SUPPORT FORM ─────────────────────────────

function initSupportForm() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        showToast('Message sent successfully!');
        form.reset();
    });
}


// ============================================
// RUN EVERYTHING WHEN PAGE LOADS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    initNavbar();
    initMobileMenu();
    initFAQ();
    initFadeIn();
    renderCart();
    initSupportForm();
});

