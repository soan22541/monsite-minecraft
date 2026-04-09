let user = JSON.parse(localStorage.getItem('user')) || null;
let currentPage = 0;

const kits = [
    { title: "Crystal PvP", img: "images/crystal.png", desc: "Combat explosif." },
    { title: "SMP Starter", img: "images/smp.png", desc: "Début de survie." },
    { title: "Mace Kit", img: "https://minecraft.wiki/images/Mace_JE1_BE1.png", desc: "Attaques lourdes." }
];

window.addEventListener('DOMContentLoaded', () => {
    updateUserData();
    if(user) syncMinecraftData(); 
});

// SYNCHRONISATION AVEC DATA.JSON
async function syncMinecraftData() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        const data = await response.json();

        // Stats
        document.getElementById('coord-x').innerText = Math.round(data.x);
        document.getElementById('coord-y').innerText = Math.round(data.y);
        document.getElementById('coord-z').innerText = Math.round(data.z);
        document.getElementById('money-display').innerHTML = `${data.xocoins.toLocaleString()} <small>Xocoins</small>`;

        // Status & Pseudo
        document.getElementById('display-username').innerText = data.pseudo;
        const status = document.getElementById('player-status');
        status.innerText = data.online ? "● EN LIGNE" : "● HORS LIGNE";
        status.style.color = data.online ? "#2ecc71" : "#e74c3c";
        
        // Skin dynamique
        document.getElementById('player-skin').src = `https://mc-heads.net/body/${data.pseudo}`;

    } catch (err) {
        console.warn("Fichier data.json introuvable sur le serveur.");
    }
}

function updateUserData() {
    const loginBtn = document.getElementById('login-btn');
    if(user && loginBtn) {
        loginBtn.innerText = user.name.toUpperCase();
        document.getElementById('logout-btn').style.display = "inline-block";
    }
}

function showSection(id) {
    closeEverything(); 
    const section = document.getElementById(id);
    if(section) {
        section.style.display = "block";
        document.getElementById('main-hub').style.filter = "blur(10px)";
        if(id === 'smp-section') syncMinecraftData();
    }
}

function openModal(id) { document.getElementById(id).style.display = "block"; }

function closeEverything() {
    document.querySelectorAll('.overlay-section, .modal').forEach(el => el.style.display = 'none');
    document.getElementById('main-hub').style.filter = "none";
}

document.addEventListener('keydown', (e) => { if(e.key === "Escape") closeEverything(); });
