import BankAccount from "./bankAccount.js";

//Récuperation des éléments du DOM
const accountBtn = document.querySelector("#form-accompte");
const depositBtn = document.querySelector("#form-depot");
const content = document.querySelector(".content");
let allAccounts = [];

//----------------------------------ACOUNT CREATION-----------------------------------------------

//Au click sur accountBtn afficher le formulaire de creation de compte
accountBtn.addEventListener("click", () => {
    if (content.querySelector(".form").nextElementSibling) {
        content.querySelector(".form").nextElementSibling.remove();
    }
  const creationForm = document.createElement("div");
  creationForm.classList.add("form");
  creationForm.innerHTML = `<H2>Créer un compte</H2>
   <input id="owner" type="text" name="owner" placeholder="propriétaire">
   <input  id="account-nbr" type="text" name="account-nbr" placeholder="Numéro de compte">
   <input type="button" value="Créer un compte" id="create-btn">`;
  content.appendChild(creationForm);
});


//creation d'un compte au click sur le bouton create-btn
content.addEventListener("click", (e) => {
  if (e.target.id === "create-btn") {
    const owner = document.querySelector("#owner").value;
    const accountNumber = document.querySelector("#account-nbr").value;
    if (
      !allAccounts.find((account) => account.accountNumber === accountNumber) &&
      !allAccounts.find((account) => account.owner === owner)
    ) {
      if (owner === "" || accountNumber === "") {
        resultResponse(false, "Veuillez remplir tous les champs");
        return;
      } else if (isNaN(accountNumber)) {
        resultResponse(false, "Veuillez entrer un numéro de compte valide");
        return;
      } else if (!isNaN(owner)) {
        resultResponse(false, "Veuillez entrer un nom valide");
        return;
      }

      allAccounts.push(new BankAccount(owner, accountNumber));
    //   <p>Votre compte bancaire à bien été crée au nom de ${owner} avec le numéro de compte ${accountNumber}</p>`;
        resultResponse(true, `Votre compte bancaire à bien été crée au nom de ${owner} avec le numéro de compte ${accountNumber}`);
    } else {
       resultResponse(false, "Ce compte existe déjà");
    }
  }
});


//Fonction de gestion de reponse 

function resultResponse(succes = false, message) {
    if(content.querySelector(".result-response")){
        content.querySelector(".result-response").remove();
    }
    const resultResponse = document.createElement("div");
    resultResponse.classList.add("result-response");
    resultResponse.style.backgroundColor = succes ? "green" : "red";
    resultResponse.innerHTML = `<H2>${succes ? "Succès" : "Erreur"}</H2>
    <p>${message}</p>`;
    content.appendChild(resultResponse);
}


//------------------------------------ BANK DEPOSIT -----------------------------------------------

//Au click sur depositBtn afficher le formulaire de depot
depositBtn.addEventListener("click", () => {
    if (content.querySelector(".form").nextElementSibling) {
        content.querySelector(".form").nextElementSibling.remove();
    }
  const creationForm = document.createElement("div");
  creationForm.classList.add("form");
  creationForm.innerHTML = `<H2>Faire un dépot</H2>
   <input id="owner" type="text" name="owner" placeholder="propriétaire">
   <input  id="account-nbr" type="text" name="account-nbr" placeholder="Numéro de compte">
   <input  id="deposit-amount" type="number" name="deposit-amount" placeholder="Entrer un montant" value="0">
   <br/>
   <input type="button" value="confirmer" id="deposit-btn">`;
  content.appendChild(creationForm);
});