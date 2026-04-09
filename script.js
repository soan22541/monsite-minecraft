let user = JSON.parse(localStorage.getItem('user')) || null;
let currentPage = 0;

const kits = [
    { title: "Crystal PvP", img: "images/crystal.png", desc: "Combat explosif." },
    { title: "SMP Starter", img: "images/smp.png", desc: "Début de survie." },
    { title: "Mace Kit", img: "https://minecraft.wiki/images/Mace_JE1_BE1.png", desc: "Attaques lourdes." }
];

window.addEventListener('DOMContentLoaded', () => {
    updateUserData();
    syncMinecraftData(); // Lance la synchro au démarrage
});

// SYNCHRONISATION DES DONNÉES MINECRAFT (data.json)
async function syncMinecraftData() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        const data = await response.json();

        // On met à jour les éléments du SMP Section uniquement si on est connecté ou si c'est le profil de base
        if (document.getElementById('coord-x')) {
            document.getElementById('coord-x').innerText = data.x;
            document.getElementById('coord-y').innerText = data.y;
            document.getElementById('coord-z').innerText = data.z;
        }

        // Argent
        const moneyDisplay = document.querySelector('.money-box');
        if (moneyDisplay) {
            moneyDisplay.innerHTML = `${data.xocoins.toLocaleString()} <small>Xocoins</small>`;
        }

        // Statut en ligne
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.style.color = data.online ? "#2ecc71" : "#e74c3c";
            statusBadge.innerText = data.online ? "● EN LIGNE" : "● HORS LIGNE";
        }
        
        console.log("Données synchronisées avec succès");
    } catch (err) {
        console.warn("data.json non trouvé ou erreur de lecture.");
    }
}

function updateUserData() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const displayUser = document.getElementById('display-username');
    const playerSkin = document.getElementById('player-skin');

    if(user) {
        if(loginBtn) loginBtn.innerText = user.name.toUpperCase();
        if(logoutBtn) logoutBtn.style.display = "inline-block";
        if(displayUser) displayUser.innerText = user.name;
        // On récupère le skin du joueur connecté
        if(playerSkin) playerSkin.src = `https://mc-heads.net/body/${user.name}`;
    }
}

// NAVIGATION
function openModal(id) { document.getElementById(id).style.display = "block"; }

function showSection(id) {
    closeEverything(); 
    const section = document.getElementById(id);
    if(section) {
        section.style.display = "block";
        document.getElementById('main-hub').style.filter = "blur(10px)";
        // Si on ouvre le SMP, on rafraîchit les données
        if(id === 'smp-section') syncMinecraftData();
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
    const name = encodeURIComponent(itemName);
    window.location.href = `checkout.html?item=${name}&price=${price}`;
}

document.addEventListener('keydown', (e) => { if(e.key === "Escape") closeEverything(); });
