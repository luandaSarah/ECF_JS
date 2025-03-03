import BankAccount from "./bankAccount.js";

//Récuperation des éléments du DOM
const accountBtn = document.querySelector("#form-accompte");
const depositBtn = document.querySelector("#form-depot");
const content = document.querySelector(".content");
const closeBtn = document.querySelector("#close");
let allAccounts = [];

//----------------------------------ACOUNT CREATION-----------------------------------------------

//Au click sur accountBtn afficher le formulaire de creation de compte
accountBtn.addEventListener("click", () => {
  if (content.querySelector(".form").nextElementSibling) {
    content.querySelector(".form").nextElementSibling.remove();
  }
  if (content.querySelector(".result-response")) {
    content.querySelector(".result-response").remove();
  }

  const creationForm = document.createElement("div");
  creationForm.classList.add("form");
  creationForm.innerHTML = `<H2>Créer un compte</H2>
   <input id="owner" type="text" name="owner" placeholder="propriétaire">
   <input  id="account-nbr" type="text" name="account-nbr" placeholder="Numéro de compte">
   <input class="btn" type="button" value="Créer un compte" id="create-btn">`;
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
      resultResponse(
        true,
        `Votre compte bancaire à bien été créé au nom de ${owner} avec le numéro ${accountNumber}`
      );
    } else {
      resultResponse(
        false,
        "Les identifiants sont déjà utilisés pour un autre compte"
      );
    }
  }
});

//------------------------------------ BANK DEPOSIT -----------------------------------------------

//Au click sur depositBtn afficher le formulaire de depot
depositBtn.addEventListener("click", () => {
  if (content.querySelector(".form").nextElementSibling) {
    content.querySelector(".form").nextElementSibling.remove();
  }
  if (content.querySelector(".result-response")) {
    content.querySelector(".result-response").remove();
  }

  const creationForm = document.createElement("div");
  creationForm.classList.add("form");
  creationForm.innerHTML = `<H2>Faire un dépot</H2>
   <input id="owner" type="text" name="owner" placeholder="propriétaire">
   <input  id="account-nbr" type="text" name="account-nbr" placeholder="Numéro de compte">
   <input  id="deposit-amount" type="number" name="deposit-amount" placeholder="Entrer un montant" value="0">
   <br/>
   <input class="btn" type="button" value="confirmer" id="deposit-btn">`;
  content.appendChild(creationForm);
});

//faire un dépot au clik sur le bouton deposit-btn
content.addEventListener("click", (e) => {
  if (e.target.id === "deposit-btn") {
    const owner = document.querySelector("#owner").value;
    const accountNumber = document.querySelector("#account-nbr").value;
    const amount = parseInt(document.querySelector("#deposit-amount").value);

    if (
      allAccounts.find(
        (account) =>
          account.accountNumber === accountNumber && account.owner === owner
      )
    ) {
      if (isNaN(amount) || amount <= 0) {
        resultResponse(false, "Veuillez entrer un montant valide");
        return;
      }

      const account = allAccounts.find(
        (account) =>
          account.accountNumber === accountNumber && account.owner === owner
      );
      account.setDeposit(amount);
      resultResponse(
        true,
        `Votre transaction est acceptée pour le compte de ${owner} numéro ${accountNumber}`
      );

      console.log(allAccounts);
    } else {
      resultResponse(false, "Vous n'avez pas les bons identifiants");
    }
  }
});

//Fonction de gestion de reponse

function resultResponse(succes = false, message) {
  if (content.querySelector(".result-response")) {
    content.querySelector(".result-response").remove();
  }
  const resultResponse = document.createElement("div");
  resultResponse.classList.add("result-response");
  resultResponse.style.backgroundColor = succes ? "green" : "red";
  resultResponse.innerHTML = `<H2>${succes ? "Succès" : "Erreur"}</H2>
    <p>${message}</p>`;
  content.appendChild(resultResponse);
}

//fermer les formulaires au click sur le bouton close
closeBtn.addEventListener("click", () => {
  if (content.querySelector(".form").nextElementSibling) {
    content.querySelector(".form").nextElementSibling.remove();
  }
  if (content.querySelector(".result-response")) {
    content.querySelector(".result-response").remove();
  }
});
