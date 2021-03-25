import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(
      () =>
        reject(
          new Error(`Request took too long! Time after ${s} seconds. Try again`)
        ),
      s * 1000
    );
  });
};

//^ Get json function
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error('Something went wrong :(');
    return data;
  } catch (err) {
    // throw new Error(`Invalid id`);
    throw err;
  }
};

//^ Create list of ingredient/measure object
export const createIngredientObject = function (data) {
  // Get ingredients & measures from data
  const ingredients = [];
  const measures = [];

  for (const x in data.drinks[0]) {
    if (x.slice(0, 13) === 'strIngredient') ingredients.push(data.drinks[0][x]);
    if (x.slice(0, 10) === 'strMeasure') measures.push(data.drinks[0][x]);
  }

  // Create array of object ingredients & measures
  const ingredientsFull = ingredients.map((el, i) => {
    return { ingredient: el, measure: measures[i] };
  });

  return ingredientsFull;
};

//^ Create alphabet
export const createAlphabet = function () {
  const domEl = document.querySelector('.search-letter');
  return [...Array(26)]
    .map((_, i) => {
      const letter = `${String.fromCharCode(i + 65)}`;
      const btnLetter = `<button  class="btn btn-outline-success m-2 w-10 letter" id=${letter}>${letter}</button>`;
      domEl.insertAdjacentHTML('beforeend', btnLetter);
      return btnLetter;
    })
    .join('');
};
