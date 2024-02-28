'use strict';
// Active le mode strict pour ce script

import { wordsArray } from './motmot.js'; // Importe le tableau des mots du jeu
import { peindre } from './drawing.js'; // Importe la fonction pour dessiner le pendu
import { lettersUtulise } from './lettresUtilise.js'; // Importe la fonction pour gérer les lettres utilisées

// Sélection aléatoire du mot à deviner
let gameMot;
const random = () => (gameMot = Math.floor(Math.random() * wordsArray.length));
random();

// Variables de jeu
const erreurs_autorisees = 10; // Nombre d'erreurs autorisées
let erreurs_commises = 0; // Compteur d'erreurs commises
let mot_a_trouver = wordsArray[gameMot].toUpperCase(); // Mot à trouver, converti en majuscules
// console.log(mot_a_trouver); // Affiche le mot à deviner dans la console pour le débogage

let currentScore = erreurs_autorisees - erreurs_commises; // Calcul du score actuel
let topScore = 0; // Meilleur score

const longueur = mot_a_trouver.length; // Longueur du mot à trouver

// Création d'un panneau d'information pour afficher différents messages au joueur
const informationPanneau = new Map([
  ['perdu', ' <span class="text-danger">Vous avez Perdu 😪</span>'],
  ['gagne', ` <img src="lien_vers_une_image" alt="image victoire">`], // Exemple d'image pour victoire
  [
    'aucun',
    '<span class="text-danger">Pas cette fois. Essayez encore une fois</span>',
  ],
  ['pasmal', '<span class="text-info">Pas mal, continuez </span>'],
  ['error', `<span class="text-danger">Vous n'avez pas tapé de lettre</span>`],
  [
    'start',
    `<span class="text-success">Allez-y. Vous avez ${erreurs_autorisees} essais</span>`,
  ],
  [
    'deja',
    `<span class="text-warning">Attention. Vous avez déjà tapé cette lettre</span>`,
  ],
  [
    'top',
    `<span class="text-success">Félicitations!!! Nouveau meilleur score</span>`,
  ],
]);

// Éléments de l'interface utilisateur
const userInputEl = document.getElementById('lettre'); // Champ de saisie de la lettre
let lettre = ''; // Lettre saisie par l'utilisateur

const infoEl = document.getElementById('info'); // Élément pour afficher les informations

// Élément pour afficher les lettres utilisées
const lettresUtil = document.getElementById('alphabet');

// Éléments pour afficher les scores
const scoreTable = document.getElementById('scoreTable');
const currentScoreCont = document.getElementById('curr');
const currentScoreEl = document.createElement('span');
setCurrentScore(); // Mise à jour du score actuel
const topScoreCont = document.getElementById('top');
const topScoreEl = document.createElement('span');
topScoreCont.appendChild(topScoreEl);
topScoreEl.innerHTML = `Meilleur score: ${topScore} `;
currentScoreCont.appendChild(currentScoreEl);
scoreTable.appendChild(currentScoreCont);
scoreTable.appendChild(topScoreCont);

// Boutons de l'interface utilisateur
const btnSubmit = document.getElementById('btn-guess'); // Bouton pour soumettre la lettre
const btnStop = document.getElementById('btn-stop'); // Bouton pour arrêter le jeu
const btnRestart = document.getElementById('btn-restart'); // Bouton pour redémarrer le jeu
btnRestart.className = `btn btn-success py-1 px-3 my-1 invisible`;
const tableauEl = document.getElementById('tableau'); // Élément pour afficher le mot caché

let alphaUt = lettersUtulise(100, lettresUtil); // Initialise les lettres utilisées

// Logique du jeu
let mot_trouve = new Map(); // Map pour suivre les lettres trouvées
let tableau = []; // Tableau représentant le mot avec des tirets pour les lettres non découvertes
for (const l in mot_a_trouver) tableau.push('-'); // Initialise le tableau avec des tirets
showTableau(tableau); // Affiche le tableau avec des tirets

// Fonction pour vérifier si la lettre saisie est dans le mot
function veriferLetter(lettre) {
  if (mot_a_trouver.indexOf(lettre) === -1) {
    // Si la lettre n'est pas dans le mot
    infoPannel('aucun'); // Affiche un message indiquant que la lettre n'est pas dans le mot
    erreurs_commises++; // Incrémente le nombre d'erreurs
    currentScore--; // Décrémente le score
    peindre(erreurs_commises); // Dessine une partie du pendu
    setCurrentScore(); // Met à jour le score
    if (erreurs_commises >= erreurs_autorisees) {
      // Si le nombre d'erreurs dépasse le maximum autorisé
      return ifLost(); // Appelle la fonction de défaite
    }
  } else {
    // Si la lettre est dans le mot
    [...mot_a_trouver].forEach((l, i) => {
      // Parcourt chaque lettre du mot
      if (l === lettre) {
        // Si la lettre correspond
        mot_trouve.set(i, l); // Ajoute la lettre trouvée à la map
        tableau[i] = l; // Remplace le tiret par la lettre dans le tableau
      }
    });
    mot_trouve = new Map([...mot_trouve.entries()].sort()); // Trie la map des lettres trouvées
    if (sortStr([...mot_trouve.values()].toString()) === mot_a_trouver) {
      // Si toutes les lettres ont été trouvées
      return ifVictory(); // Appelle la fonction de victoire
    }
    infoPannel('pasmal'); // Affiche un message encourageant
    showTableau(tableau); // Met à jour l'affichage du mot
    setCurrentScore(); // Met à jour le score
  }
}

// Fonction appelée en cas de défaite
function ifLost() {
  infoPannel('perdu'); // Affiche un message de défaite
  btnSubmit.disabled = true; // Désactive le bouton de soumission
  btnStop.disabled = true; // Désactive le bouton d'arrêt
  btnRestart.className = `"btn btn-success py-1 px-3 my-1 visible"`; // Rend le bouton de redémarrage visible
  erreurs_commises = 0; // Réinitialise le compteur d'erreurs
}

// Fonction appelée en cas de victoire
function ifVictory() {
  showTableau(tableau); // Affiche le mot complet
  setTopScore(currentScore); // Met à jour le meilleur score si nécessaire
  infoPannel('gagne'); // Affiche un message de victoire
  currentScore = erreurs_autorisees; // Réinitialise le score
  btnRestart.className = `"btn btn-success py-1 px-3 my-1 visible"`; // Rend le bouton de redémarrage visible
  setTopScore(); // Met à jour le meilleur score
  btnSubmit.disabled = true; // Désactive le bouton de soumission
  btnStop.disabled = true; // Désactive le bouton d'arrêt
}

// Fonction pour trier une chaîne de caractères (supprime les virgules)
function sortStr(str) {
  return str.replace(/,/g, '');
}

// Fonction pour afficher le tableau des lettres du mot à deviner
function showTableau(arr) {
  tableauEl.innerHTML = ''; // Réinitialise l'affichage
  for (const sign of arr) {
    // Pour chaque lettre ou tiret dans le tableau
    const el = document.createElement('span'); // Crée un nouvel élément span
    el.innerHTML = `<span class='h3 bg-dark text-light m-1 p-1 rounded-3'>${sign}</span>`; // Définit le contenu de l'élément
    tableauEl.appendChild(el); // Ajoute l'élément à l'élément tableauEl
  }
}

// Fonction pour afficher un message dans le panneau d'information
function infoPannel(mot) {
  infoEl.innerHTML = informationPanneau.get(mot); // Récupère le message correspondant au mot clé et l'affiche
}

// Fonction pour redémarrer le jeu
function relaunchGame() {
  random(); // Sélectionne un nouveau mot aléatoirement
  btnSubmit.disabled = false; // Réactive le bouton de soumission
  btnStop.disabled = false; // Réactive le bouton d'arrêt
  mot_a_trouver = wordsArray[gameMot].toUpperCase(); // Met à jour le mot à trouver
  // console.log(mot_a_trouver); // Affiche le nouveau mot à deviner dans la console pour le débogage
  infoPannel('start'); // Affiche un message de début de jeu
  tableau = []; // Réinitialise le tableau des lettres
  for (const l in mot_a_trouver) tableau.push('-'); // Remplit le tableau avec des tirets
  currentScore = erreurs_autorisees; // Réinitialise le score
  setCurrentScore(); // Met à jour l'affichage du score
  showTableau(tableau); // Affiche le tableau des lettres
  mot_trouve.clear(); // Vide la map des lettres trouvées
  erreurs_commises = 0; // Réinitialise le compteur d'erreurs
  btnRestart.className = `btn btn-success py-1 px-3 my-1 invisible`; // Cache le bouton de redémarrage
  lettersUtulise(100, lettresUtil); // Réinitialise les lettres utilisées
}

// Événements pour les boutons de l'interface utilisateur
btnRestart.onclick = () => {
  relaunchGame(); // Appelle la fonction pour redémarrer le jeu
  peindre(100); // Efface le dessin du pendu
  setCurrentScore(); // Met à jour l'affichage du score
  currentScoreEl.className = 'text-success'; // Applique la classe de style pour le score
};
btnStop.onclick = () => {
  relaunchGame(); // Appelle la fonction pour redémarrer le jeu
  peindre(100); // Efface le dessin du pendu
  setCurrentScore(); // Met à jour l'affichage du score
};

btnSubmit.onclick = () => {
  infoEl.innerHTML = ''; // Efface les messages précédents
  lettre = userInputEl.value; // Récupère la lettre saisie par l'utilisateur
  lettre = lettre.toUpperCase(); // Convertit la lettre en majuscule

  if (!lettre || lettre.length > 1) {
    // Si aucune lettre n'est saisie ou si plus d'une lettre est saisie
    infoPannel('error'); // Affiche un message d'erreur
    return; // Interrompt la fonction
  }

  alphaUt = lettersUtulise(lettre, lettresUtil); // Met à jour les lettres utilisées
  // console.log(alphaUt); // Affiche les lettres utilisées pour le débogage
  if (tableau.includes(lettre)) {
    // Si la lettre a déjà été utilisée
    infoPannel('deja'); // Affiche un message d'avertissement
    return; // Interrompt la fonction
  }
  veriferLetter(lettre); // Appelle la fonction pour vérifier la lettre
  userInputEl.value = ''; // Réinitialise le champ de saisie
};

// Fonction pour mettre à jour le score actuel
function setCurrentScore() {
  currentScore > 3 && currentScoreEl.classList.add('text-success'); // Applique la classe de succès si le score est suffisamment élevé
  currentScore <= 3 && currentScoreEl.classList.add('text-danger'); // Applique la classe de danger si le score est faible
  currentScoreEl.innerHTML = `Score actuel (tentatives restantes): ${currentScore}`; // Met à jour l'affichage du score
}

// Fonction pour mettre à jour le meilleur score
function setTopScore(currentScore) {
  if (currentScore > topScore) {
    // Si le score actuel est supérieur au meilleur score
    topScore = currentScore; // Met à jour le meilleur score
    topScoreEl.innerHTML = `Meilleur score: ${topScore} `; // Met à jour l'affichage du meilleur score
    infoPannel('top'); // Affiche un message de félicitations
  }
}
