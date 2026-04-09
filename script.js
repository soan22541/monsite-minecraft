let user = JSON.parse(localStorage.getItem('user')) || null;

window.addEventListener('DOMContentLoaded', () => {
    updateUserData();
    if(user) syncMinecraftData();
});

// SYNCHRONISATION AVEC LE SERVEUR (data.json)
async function syncMinecraftData() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        const data = await response.json();

        // Mise à jour du pseudo et du statut
        document.getElementById('display-username').innerText = data.pseudo;
        
        const statusBadge = document.getElementById('player-status');
        if (statusBadge) {
            statusBadge.style.background = data.online ? "#2ecc71" : "#e74c3c";
            statusBadge.innerText = data.online ? "● EN LIGNE" : "● HORS LIGNE";
        }

        // Mise à jour du Skin
        const skinImg = document.getElementById('player-skin');
        if (skinImg) skinImg.src = `https://mc-heads.net/body/${data.pseudo}`;

    } catch (err) {
        console.warn("Erreur de synchro : data.json introuvable.");
    }
}

function updateUserData() {
    const loginBtn = document.getElementById('login-btn');
    if(user && loginBtn) {
        loginBtn.innerText = user.name.toUpperCase();
        document.getElementById('logout-btn').style.display = "inline-block";
    }
}

// NAVIGATION
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
