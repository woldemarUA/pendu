'use strict';

// width="300" height="300"

const canvas = document.getElementById('tutorial');
const ctx = canvas.getContext('2d');

export const peindre = (step) => {
  ctx.beginPath(step);

  switch (step) {
    case 1:
      //   1
      ctx.moveTo(170, 280);
      ctx.lineTo(275, 280);
      ctx.stroke();
      break;
    case 2:
      //   2
      ctx.beginPath();
      ctx.moveTo(280, 280);
      ctx.lineTo(280, 130);
      ctx.stroke();
      break;
    case 3:
      //   3
      ctx.beginPath();
      ctx.moveTo(280, 125);
      ctx.lineTo(280, 24);
      ctx.stroke();
      break;
    case 4:
      //   4
      ctx.beginPath();
      ctx.moveTo(278, 110);
      ctx.lineTo(220, 22);
      ctx.stroke();
      break;
    case 5:
      //   5
      ctx.beginPath();
      ctx.moveTo(280, 20);
      ctx.lineTo(120, 20);
      ctx.stroke();
      break;
    case 6:
      //   6
      ctx.beginPath();
      ctx.moveTo(140, 20);
      ctx.lineTo(140, 90);
      ctx.stroke();
      break;
    case 7:
      //   7
      //   Math.PI / -3.5
      //   ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.ellipse(125, 90, 15, 20, -0.3, 0.4, 2 * Math.PI);
      ctx.stroke();
      //   ctx.fill();
      break;
    case 8:
      //   8
      ctx.beginPath();
      ctx.moveTo(140, 180);
      ctx.lineTo(140, 99);
      ctx.stroke();
      break;
    case 9:
      //   9
      //  bras gauche
      ctx.beginPath();
      ctx.moveTo(140, 110);
      ctx.lineTo(120, 140);
      ctx.stroke();
      //   bras droite
      ctx.beginPath();
      ctx.moveTo(142, 110);
      ctx.lineTo(150, 150);
      ctx.stroke();
      break;
    case 10:
      //   10
      //  jambe gauche
      ctx.beginPath();
      ctx.moveTo(140, 183);
      ctx.lineTo(110, 210);
      ctx.stroke();
      //   jambe droite
      ctx.beginPath();
      ctx.moveTo(140, 183);
      ctx.lineTo(150, 220);
      ctx.stroke();
      break;
    default:
      ctx.reset();
  }
};
