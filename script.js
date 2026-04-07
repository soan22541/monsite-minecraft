// --- VARIABLES ---
let user = JSON.parse(localStorage.getItem('user')) || null;

// --- INITIALISATION ---
window.addEventListener('DOMContentLoaded', () => {
    updateUserData();
    checkCheckoutParams(); // Vérifie si on est sur la page de paiement
});

// Mise à jour de l'interface utilisateur
function updateUserData() {
    const loginBtn = document.getElementById('login-btn');
    const displayUser = document.getElementById('display-username');
    const playerSkin = document.getElementById('player-skin');

    if(user) {
        if(loginBtn) loginBtn.innerText = user.name.toUpperCase();
        if(displayUser) displayUser.innerText = user.name;
        if(playerSkin) playerSkin.src = `https://mc-heads.net/body/${user.name}`;
    }
}

// --- FONCTION DE REDIRECTION BOUTIQUE ---
function handlePurchase(itemName, price) {
    if (!user) { 
        alert("Connectez-vous pour acheter !"); 
        return; 
    }
    
    // Envoie les infos dans l'URL vers checkout.html
    const nameParam = encodeURIComponent(itemName);
    const priceParam = encodeURIComponent(price);
    window.location.href = `checkout.html?item=${nameParam}&price=${priceParam}`;
}

// --- RÉCEPTION SUR LA PAGE PAIEMENT (CHECKOUT) ---
function checkCheckoutParams() {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get('item');
    const itemPrice = params.get('price');

    if (itemName && itemPrice) {
        // Cible les éléments de ton checkout (image 6b6914.png)
        const nameDisplay = document.getElementById('product-name-display');
        const priceDisplay = document.getElementById('product-price-display');

        if(nameDisplay) nameDisplay.innerText = itemName;
        if(priceDisplay) priceDisplay.innerText = itemPrice + "€";
    }
}

// --- NAVIGATION ---
function closeEverything() {
    document.querySelectorAll('.overlay-section, .modal').forEach(el => el.style.display = 'none');
    const hub = document.getElementById('main-hub');
    if(hub) hub.style.filter = "none";
}

document.addEventListener('keydown', (e) => { if(e.key === "Escape") closeEverything(); });
