let user = JSON.parse(localStorage.getItem('user')) || null;
let currentPage = 0;

const kits = [
    { title: "Crystal PvP", img: "images/crystal.png", desc: "Combat explosif." },
    { title: "SMP Starter", img: "images/smp.png", desc: "Début de survie." },
    { title: "Mace Kit", img: "https://minecraft.wiki/images/Mace_JE1_BE1.png", desc: "Attaques lourdes." }
];

window.addEventListener('DOMContentLoaded', () => {
    updateUserData();
});

function updateUserData() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const displayUser = document.getElementById('display-username');
    const playerSkin = document.getElementById('player-skin');

    if(user) {
        if(loginBtn) loginBtn.innerText = user.name.toUpperCase();
        if(logoutBtn) logoutBtn.style.display = "inline-block";
        if(displayUser) displayUser.innerText = user.name;
        if(playerSkin) playerSkin.src = `https://mc-heads.net/body/${user.name}`;
    }
}

// NAVIGATION
function openModal(id) { document.getElementById(id).style.display = "block"; }

function showSection(id) {
    closeEverything(); // Ferme les autres avant d'ouvrir
    const section = document.getElementById(id);
    if(section) {
        section.style.display = "block";
        document.getElementById('main-hub').style.filter = "blur(10px)";
    }
}

function closeEverything() {
    document.querySelectorAll('.overlay-section, .modal').forEach(el => el.style.display = 'none');
    document.getElementById('main-hub').style.filter = "none";
}

// REDIRECTION PAIEMENT
function handlePurchase(itemName, price) {
    if (!user) { 
        alert("Connectez-vous pour acheter !"); 
        openModal('login-modal'); 
        return; 
    }
    // Encode pour l'URL et redirige
    const name = encodeURIComponent(itemName);
    window.location.href = `checkout.html?item=${name}&price=${price}`;
}

document.addEventListener('keydown', (e) => { if(e.key === "Escape") closeEverything(); });
