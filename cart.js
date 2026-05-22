// ===========================
// CART FUNCTIONS
// ===========================

let cart = JSON.parse(localStorage.getItem('rokeCart')) || [];

function addToCart(button) {
    const name  = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem('rokeCart', JSON.stringify(cart));

    // Button feedback
    const original = button.textContent;
    button.textContent = 'ADDED ✓';
    button.style.backgroundColor = '#2e7d32';
    button.style.borderColor = '#2e7d32';
    setTimeout(() => {
        button.textContent = original;
        button.style.backgroundColor = '';
        button.style.borderColor = '';
    }, 1500);

    updateCartCount();
}

// Keep backward-compatible alias
function addtocart(button) { addToCart(button); }

function updateCartCount() {
    cart = JSON.parse(localStorage.getItem('rokeCart')) || [];
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    });
}

// Run on every page load
updateCartCount();