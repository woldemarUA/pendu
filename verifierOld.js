// function veriferLetter(lettre) {
//   if (mot_a_trouver.indexOf(lettre) === -1) {
//     infoPannel('aucun');
//     erreurs_commises++;
//     currentScore--;
//     setCurrentScore();

//     if (erreurs_commises >= erreurs_autorisees) {
//       infoPannel('perdu');

//       return;
//     }
//   } else {
//     [...mot_a_trouver].forEach((l, i) => {
//       if (l === lettre) {
//         mot_trouve.set(i, l);
//         tableau[i] = l;
//       }
//       mot_trouve = new Map([...mot_trouve.entries()].sort());
//       infoPannel('pasmal');
//       showTableau(tableau);
//       currentScore--;
//       setCurrentScore();
//       ifVictory(sortStr([...mot_trouve.values()].toString()));
//     });
//     // verifie mot trouve === mot_a_trouve
//     // if (sortStr([...mot_trouve.values()].toString()) === mot_a_trouver) {
//     //   infoPannel('gagne');
//     //   btnRestart.className = `"btn btn-success py-1 px-3 my-1 visible"`;
//     //   relaunchGame();
//     //   setTopScore();
//     // }
//   }
// }
