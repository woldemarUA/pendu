'use strict';
// Active le mode strict pour éviter certaines erreurs courantes et sécuriser le code

const alpha = [
  // Tableau contenant toutes les lettres de l'alphabet
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
let frenchAlphabet = [
  // Copie du tableau de l'alphabet pour gérer les lettres utilisées
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const lettersUtulise = (lettre, lettresUtil) => {
  lettresUtil.innerHTML = ''; // Réinitialise l'affichage des lettres utilisées
  const el = document.createElement('div'); // Crée un nouveau div pour contenir les lettres
  el.className = 'row'; // Assignation de la classe 'row' pour le style

  frenchAlphabet = frenchAlphabet.filter((l) => l !== lettre); // Filtre l'alphabet pour exclure la lettre utilisée
  if (lettre === 100) frenchAlphabet = alpha; // Si lettre égale à 100, réinitialise l'alphabet (reset)

  for (const l of frenchAlphabet) {
    // Pour chaque lettre restante dans l'alphabet filtré
    const span = document.createElement('span'); // Crée un élément span pour chaque lettre
    span.className =
      'h3 bg-secondary text-center text-light m-1 p-1 rounded-3 col'; // Assignation des classes pour le style
    span.innerHTML = l; // Définit le contenu du span avec la lettre actuelle
    el.appendChild(span); // Ajoute le span au div conteneur
  }
  lettresUtil.appendChild(el); // Ajoute le conteneur de lettres à l'élément lettresUtil

  return frenchAlphabet; // Retourne l'alphabet mis à jour après l'exclusion de la lettre utilisée
};
