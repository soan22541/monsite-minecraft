// --- VARIABLES GLOBALES ---
let user = JSON.parse(localStorage.getItem('user')) || null;
let currentPage = 0;

// Base de données des kits
const kits = [
    { title: "Crystal PvP", img: "images/crystal.png", desc: "Combat explosif." },
    { title: "SMP Starter", img: "images/smp.png", desc: "Début de survie." },
    { title: "Mace Kit", img: "https://minecraft.wiki/images/Mace_JE1_BE1.png", desc: "Attaques lourdes." },
    { title: "Netherite Sword", img: "https://minecraft.wiki/images/Netherite_Sword_JE2_BE2.png", desc: "Classique." },
    { title: "Netherite Axe", img: "https://minecraft.wiki/images/Netherite_Axe_JE2_BE2.png", desc: "Brise-bouclier." },
    { title: "UHC", img: "https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png", desc: "Pas de regen." },
    { title: "Netherite Pot", img: "https://minecraft.wiki/images/Splash_Potion_of_Healing_JE2_BE2.png", desc: "Potions de soin." },
    { title: "Diamond Pot", img: "https://minecraft.wiki/images/Diamond_Chestplate_JE3_BE2.png", desc: "Vitesse et diamant." }
];

// --- INITIALISATION AU CHARGEMENT ---
window.addEventListener('DOMContentLoaded', () => {
    updateUserData();     
    prefillLoginForm();   
});

function prefillLoginForm() {
    const lastUser = localStorage.getItem('last_logged_username');
    const loginUserInput = document.getElementById('login-user');
    if (lastUser && loginUserInput) {
        loginUserInput.value = lastUser;
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
        if(playerSkin) playerSkin.src = `https://mc-heads.net/body/${user.name}`;
    } else {
        if(loginBtn) loginBtn.innerText = "MON COMPTE";
        if(logoutBtn) logoutBtn.style.display = "none";
        if(displayUser) displayUser.innerText = "Joueur";
        if(playerSkin) playerSkin.src = `https://mc-heads.net/body/Steve`;
    }
}

// --- NAVIGATION ---
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

// --- SYSTEME D'AUTHENTIFICATION ---
function showAuthStep(step) {
    document.querySelectorAll('[id^="auth-step-"]').forEach(el => el.style.display = 'none');
    document.getElementById('auth-step-' + step).style.display = 'block';
}

function validateStep2() {
    const pseudo = document.getElementById('reg-user').value;
    if(pseudo.length < 3) { alert("Pseudo trop court !"); return; }
    if(!document.getElementById('check-tos').checked) { alert("Acceptez les conditions !"); return; }
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
    
    user = {name: pseudo};
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('last_logged_username', pseudo); 
    
    updateUserData();
    closeEverything();
    alert("Compte créé et connecté !");
}

function handleLogin() {
    const pseudo = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const accounts = JSON.parse(localStorage.getItem('xono_accounts')) || {};

    if(accounts[pseudo] && accounts[pseudo] === pass) {
        user = {name: pseudo};
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('last_logged_username', pseudo);
        location.reload(); 
    } else { 
        alert("Identifiants incorrects"); 
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    user = null;
    alert("Vous avez été déconnecté.");
    location.reload();
}

// --- BOUTIQUE & KITS ---

// FONCTION MISE À JOUR : Redirection vers checkout.html
function handlePurchase(itemName, price) {
    if (!user) { 
        alert("Connectez-vous pour acheter !"); 
        openModal('login-modal'); 
        return; 
    }
    
    // Encode les données pour les passer dans l'URL
    const encodedItem = encodeURIComponent(itemName);
    const encodedPrice = encodeURIComponent(price);
    
    // Redirection vers ta page checkout
    window.location.href = `checkout.html?item=${encodedItem}&price=${encodedPrice}`;
}

function updateKitPage() {
    const kit = kits[currentPage];
    document.getElementById('kit-img').src = kit.img;
    document.getElementById('kit-title').innerText = kit.title;
    document.getElementById('kit-desc').innerText = kit.desc;
    document.getElementById('current-p').innerText = currentPage + 1;
}

function changePage(dir) {
    currentPage = (currentPage + dir + kits.length) % kits.length;
    updateKitPage();
}
