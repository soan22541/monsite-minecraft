// --- VARIABLES GLOBALES ---
let user = JSON.parse(localStorage.getItem('user')) || null;
let currentPage = 0;

const kits = [
    { title: "Crystal PvP", img: "images/crystal.png", fallback: "https://minecraft.wiki/images/End_Crystal_JE2_BE2.png", desc: "Combat explosif." },
    { title: "SMP Starter", img: "images/smp.png", fallback: "https://minecraft.wiki/images/Grass_Block_JE4_BE3.png", desc: "Début de survie." },
    { title: "Mace Kit", img: "https://minecraft.wiki/images/Mace_JE1_BE1.png", fallback: "", desc: "Attaques lourdes." },
    { title: "Netherite Sword", img: "https://minecraft.wiki/images/Netherite_Sword_JE2_BE2.png", fallback: "", desc: "Classique." },
    { title: "Netherite Axe", img: "https://minecraft.wiki/images/Netherite_Axe_JE2_BE2.png", fallback: "", desc: "Brise-bouclier." },
    { title: "UHC", img: "https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png", fallback: "", desc: "Pas de regen." },
    { title: "Netherite Pot", img: "https://minecraft.wiki/images/Splash_Potion_of_Healing_JE2_BE2.png", fallback: "", desc: "Potions de soin." },
    { title: "Diamond Pot", img: "https://minecraft.wiki/images/Diamond_Chestplate_JE3_BE2.png", fallback: "", desc: "Vitesse et diamant." }
];

// --- INITIALISATION AU CHARGEMENT ---
window.onload = () => {
    updateUserData();
    prefillLoginForm(); // Se souvient de l'identifiant
};

// Fonction pour pré-remplir le pseudo si déjà connecté auparavant
function prefillLoginForm() {
    const lastUser = localStorage.getItem('last_logged_username');
    const loginUserInput = document.getElementById('login-user');
    if (lastUser && loginUserInput) {
        loginUserInput.value = lastUser;
    }
}

function updateUserData() {
    if(user) {
        const loginBtn = document.getElementById('login-btn');
        const displayUser = document.getElementById('display-username');
        const playerSkin = document.getElementById('player-skin');

        if(loginBtn) loginBtn.innerText = user.name.toUpperCase();
        if(displayUser) displayUser.innerText = user.name;
        // Correction de l'URL du skin pour être plus fiable
        if(playerSkin) playerSkin.src = `https://mc-heads.net/body/${user.name}`;
    }
}

// --- SYSTÈME DE NAVIGATION ---
function openModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "block"; 
}

function showSection(id) {
    const section = document.getElementById(id);
    const hub = document.getElementById('main-hub');
    
    if(section) {
        section.style.display = "block";
        if(hub) hub.style.filter = "blur(10px)";
        if(id === 'kits-section') updateKitPage();
    }
}

function closeEverything() {
    document.querySelectorAll('.overlay-section, .modal').forEach(el => el.style.display = 'none');
    const hub = document.getElementById('main-hub');
    if(hub) hub.style.filter = "none";
}

document.addEventListener('keydown', (e) => { 
    if(e.key === "Escape") closeEverything(); 
});

// --- SYSTÈME BOUTIQUE ---
function handlePurchase(itemName, price) {
    if (!user) {
        alert("❌ Erreur : Vous devez être connecté pour acheter un article !");
        openModal('login-modal'); 
        return;
    }
    window.location.href = `checkout.html?item=${encodeURIComponent(itemName)}&price=${price}&user=${encodeURIComponent(user.name)}`;
}

// --- SYSTÈME AUTHENTICATION (AVEC MÉMOIRE) ---
function showAuthStep(step) {
    document.querySelectorAll('[id^="auth-step-"]').forEach(el => el.style.display = 'none');
    document.getElementById('auth-step-' + step).style.display = 'block';
}

function validateStep2() {
    const pseudo = document.getElementById('reg-user').value;
    if(pseudo.length < 4) { alert("Le pseudo doit contenir plus de 4 caractères"); return; }
    if(!document.getElementById('check-tos').checked) { alert("Veuillez accepter les conditions"); return; }
    showAuthStep(3);
}

function handleRegister() {
    const pseudo = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-pass-confirm').value;

    if(pass !== confirm) { alert("Les mots de passe ne correspondent pas"); return; }
    
    let accounts = JSON.parse(localStorage.getItem('xono_accounts')) || {};
    accounts[pseudo] = pass;
    localStorage.setItem('xono_accounts', JSON.stringify(accounts));
    
    // On connecte direct après inscription
    localStorage.setItem('user', JSON.stringify({name: pseudo}));
    localStorage.setItem('last_logged_username', pseudo); 
    location.reload();
}

function handleLogin() {
    const pseudo = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const accounts = JSON.parse(localStorage.getItem('xono_accounts')) || {};

    if(accounts[pseudo] === pass) {
        localStorage.setItem('user', JSON.stringify({name: pseudo}));
        localStorage.setItem('last_logged_username', pseudo); // Mémorise pour la prochaine fois
        location.reload();
    } else { 
        alert("Identifiants ou mot de passe incorrects"); 
    }
}

// --- SYSTÈME DE KITS ---
function updateKitPage() {
    const kit = kits[currentPage];
    const imgEl = document.getElementById('kit-img');
    if(imgEl) imgEl.src = kit.img;
    document.getElementById('kit-title').innerText = kit.title;
    document.getElementById('kit-desc').innerText = kit.desc;
    document.getElementById('current-p').innerText = currentPage + 1;
}

function changePage(dir) {
    currentPage = (currentPage + dir + kits.length) % kits.length;
    updateKitPage();
}
