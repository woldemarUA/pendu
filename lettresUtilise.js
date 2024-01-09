'use strict';
let frenchAlphabet = [
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
  lettresUtil.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'row';
  frenchAlphabet = frenchAlphabet.filter((l) => l !== lettre);

  for (const l of frenchAlphabet) {
    const span = document.createElement('span');
    span.className =
      'h3 bg-secondary text-center text-light m-1 p-1 rounded-3 col';
    span.innerHTML = l;
    el.appendChild(span);
  }

  const resp = {
    frenchAlphabet,
    el,
  };
  return resp;
};
