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
    updateKitDisplay();
});

async function syncMinecraftData() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        const data = await response.json();
        document.getElementById('display-username').innerText = data.pseudo;
        const statusBadge = document.getElementById('player-status');
        if (statusBadge) {
            statusBadge.style.background = data.online ? "#2ecc71" : "#e74c3c";
            statusBadge.innerText = data.online ? "● EN LIGNE" : "● HORS LIGNE";
        }
        document.getElementById('player-skin').src = `https://mc-heads.net/body/${data.pseudo}`;
    } catch (err) { console.warn("data.json introuvable."); }
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

// LOGIQUE DES KITS
function changePage(direction) {
    currentPage += direction;
    if (currentPage < 0) currentPage = kits.length - 1;
    if (currentPage >= kits.length) currentPage = 0;
    updateKitDisplay();
}

function updateKitDisplay() {
    const kit = kits[currentPage];
    document.getElementById('kit-img').src = kit.img;
    document.getElementById('kit-title').innerText = kit.title;
    document.getElementById('kit-desc').innerText = kit.desc;
    document.getElementById('current-p').innerText = currentPage + 1;
}

function openModal(id) { document.getElementById(id).style.display = "block"; }
function closeEverything() {
    document.querySelectorAll('.overlay-section, .modal').forEach(el => el.style.display = 'none');
    document.getElementById('main-hub').style.filter = "none";
}
document.addEventListener('keydown', (e) => { if(e.key === "Escape") closeEverything(); });
