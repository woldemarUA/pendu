'use strict';
// Active le mode strict pour éviter certaines erreurs courantes et sécuriser le code

const canvas = document.getElementById('tutorial'); // Récupère l'élément canvas par son ID
const ctx = canvas.getContext('2d'); // Obtient le contexte de dessin en 2D pour le canvas

export const peindre = (step) => {
  ctx.beginPath(step); // Commence un nouveau chemin ou réinitialise le chemin actuel, selon l'étape

  switch (step) {
    case 1:
      // Base du pendu
      ctx.moveTo(170, 280); // Déplace le stylo à la position de départ sans tracer de ligne
      ctx.lineTo(275, 280); // Dessine une ligne jusqu'à cette position
      ctx.stroke(); // Effectue le dessin
      break;
    case 2:
      // Poteau vertical
      ctx.beginPath();
      ctx.moveTo(280, 280);
      ctx.lineTo(280, 130);
      ctx.stroke();
      break;
    case 3:
      // Support supérieur
      ctx.beginPath();
      ctx.moveTo(280, 125);
      ctx.lineTo(280, 24);
      ctx.stroke();
      break;
    case 4:
      // Support incliné
      ctx.beginPath();
      ctx.moveTo(278, 110);
      ctx.lineTo(220, 22);
      ctx.stroke();
      break;
    case 5:
      // Traverse supérieure
      ctx.beginPath();
      ctx.moveTo(280, 20);
      ctx.lineTo(120, 20);
      ctx.stroke();
      break;
    case 6:
      // Corde
      ctx.beginPath();
      ctx.moveTo(140, 20);
      ctx.lineTo(140, 90);
      ctx.stroke();
      break;
    case 7:
      // Tête
      ctx.beginPath();
      ctx.ellipse(125, 90, 15, 20, Math.PI / -3.5, 0, 2 * Math.PI); // Dessine une ellipse pour la tête
      ctx.stroke();
      break;
    case 8:
      // Corps
      ctx.beginPath();
      ctx.moveTo(140, 180);
      ctx.lineTo(140, 99);
      ctx.stroke();
      break;
    case 9:
      // Bras
      // Bras gauche
      ctx.beginPath();
      ctx.moveTo(140, 110);
      ctx.lineTo(120, 140);
      ctx.stroke();
      // Bras droit
      ctx.beginPath();
      ctx.moveTo(142, 110);
      ctx.lineTo(150, 150);
      ctx.stroke();
      break;
    case 10:
      // Jambes
      // Jambe gauche
      ctx.beginPath();
      ctx.moveTo(140, 183);
      ctx.lineTo(110, 210);
      ctx.stroke();
      // Jambe droite
      ctx.beginPath();
      ctx.moveTo(140, 183);
      ctx.lineTo(150, 220);
      ctx.stroke();
      break;
    default:
      // Si l'étape n'est pas reconnue, réinitialise le contexte de dessin
      ctx.reset();
  }
};
