// --- FONCTION DE PRÉ-REMPLISSAGE ---
function prefillLoginForm() {
    const lastUser = localStorage.getItem('last_logged_username');
    const loginUserInput = document.getElementById('login-user');
    
    console.log("Tentative de pré-remplissage pour :", lastUser); // Debug
    
    if (lastUser && loginUserInput) {
        loginUserInput.value = lastUser;
        console.log("Champ rempli avec succès !");
    } else {
        console.log("Échec : soit pas d'utilisateur stocké, soit l'ID 'login-user' n'existe pas.");
    }
}

// --- FONCTION D'INSCRIPTION ---
function handleRegister() {
    const pseudo = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-pass-confirm').value;

    if(pass !== confirm) { alert("Les mots de passe ne correspondent pas"); return; }
    
    let accounts = JSON.parse(localStorage.getItem('xono_accounts')) || {};
    accounts[pseudo] = pass;
    
    // On enregistre tout
    localStorage.setItem('xono_accounts', JSON.stringify(accounts));
    localStorage.setItem('user', JSON.stringify({name: pseudo}));
    localStorage.setItem('last_logged_username', pseudo); 
    
    console.log("Compte créé et connecté pour :", pseudo);

    // On s'assure que les données sont bien sauvées avant de recharger
    setTimeout(() => {
        location.reload();
    }, 100); 
}
