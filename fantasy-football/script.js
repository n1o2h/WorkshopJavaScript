let joueurs = [];
let containerListJoueur = document.getElementById("containerListJoueur");
let budgetGlobal = 100;
const modalContainer = document.getElementById("modalContainer");
const ajouterBtn = document.getElementById("ajouterBtn");
const EnregistrerBtn = document.getElementById("EnregistrerBtn");
let playerList = [];



async function loadDataJoueur(){
    let dataJoueur = await fetch("joueur.json");
    joueurs = await dataJoueur.json();
    localStorage.setItem("jouersList", joueurs)
    localStorage.getItem("jouersList");
    console.log(localStorage.getItem("jouersList"));
}

getJoueurFromStorage();

ajouterCardJoueur(joueurs);

// loadDataJoueur().then(()=>{
//     ajouterCardJoueur(joueurs);
// })

// fonction qui ajoute un joueur au aside des joueurs

function ajouterCardJoueur(joueurs){
    containerListJoueur.innerHTML = joueurs.map((joueur) =>
        `
        <div class="cardJoueur">
            <div >
                <img  class="imageProfile" src=${joueur.photo} alt="image profile">
            </div>
            <div class="infoJ">
            <h2 class="nomJoueur">${joueur.nomComplet}</h2>
            <div class="infoJoueur">
                <p class="post">${joueur.nationalite}</p>
                <p class="post">${joueur.post}</p>
                <p class="prix">${joueur.prix}$</p>
            </div>
            </div>
            <div>
                <span class="icon">
                    <i class="fa-solid fa-plus"></i>
            </div>
        </div>
        `).join("");
}

//  afficher et annuler le modal 

ajouterBtn.addEventListener("click", ()=>{
    modalContainer.classList.add("afficherModal");
})

EnregistrerBtn.addEventListener("click", ()=>{
    modalContainer.classList.remove("afficherModal");

    validerForm();
})

// form validation 

function validerForm(){

    let form = document.forms["formAjout"];
    
    let player = {
        nomComplet : form.nom.value,
        post : form.poste.value,
        nationalite : form.nationalite.value,
        prix : form.prix.value,
        photo: form.photo.value
    }

    console.log(player);
    
    if (!(checkText(player.nomComplet) &&
        checkFloat(player.prix) &&
        checkText(player.nationalite &&
        checkText(player.photo)))) {

            console.log("error de validation")
            return
        }
    joueurs.push(player);

    //ajouter la liste au localstorage
    // pour que la local storage connue la listes des joueurs nous transformant la liste a une string en utilisant JSON.stringify(listNom)

    storageJoueurs()

    ajouterCardJoueur(joueurs);

    }
    // ============== storage function ============//
    function storageJoueurs(){
        let joueurStirng = JSON.stringify(joueurs);
        localStorage.setItem("joueurs", joueurStirng);
    }
    function getJoueurFromStorage(){
        let listJoueurs = JSON.parse(localStorage.getItem("joueurs"));
        // if(listJoueurs == null)
        //     joueurs = [];
        // else
        //     joueurs = listJoueurs;
        joueurs = listJoueurs ?? [];

    }
    // ============== storage function ============//

    function checkText (texte) {

        if (texte == "") return false;

        if (texte == null) return false;

        let regexTexte = /^[a-z ,.'-]+$/i

        if(!regexTexte.test(texte)) return false; 

        return true;
    }

    function checkFloat(numberFloat) {

        let regexMoney = /^(\$?\d{1,3}(?:,?\d{3})*(?:\.\d{2})?|\.\d{2})?$/

        if (numberFloat <= 0 ) return false;
        if (numberFloat == null) return false;
        if (!regexMoney.test(numberFloat)) return false;

        return true;
    }



