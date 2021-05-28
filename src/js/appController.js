import * as model from './model.js';
import cocktailView from './ui-views/cocktailView.js';
import searchByNameView from './ui-views/searchByNameView.js';
import searchByIngredientView from './ui-views/searchByIngredientView.js';
import searchByLetterView from './ui-views/searchByLetterView.js';
import searchResultsView from './ui-views/searchResultsView.js';
import paginationView from './ui-views/paginationView.js';
import favoriteView from './ui-views/favoriteView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

//^ Controller - when click on cocktail
const controlCocktails = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Render spinner
    cocktailView.renderSpinner();

    document
      .querySelector('.cocktail-container')
      .addEventListener('click', async function (e) {
        const shareBtn = e.target.closest('.share');
        if (!shareBtn) return;

        const shareDate = {
          title: window.document.title,
          url: window.document.location.href,
        };
        try {
          await navigator.share(shareDate);
        } catch (error) {
          alert('Probably your browser does not support this functionality');
        }
      });

    // Loading cocktail by id from model
    await model.loadCocktail(id);

    // Rendering cocktail (from cocktailView)
    cocktailView.render(model.state.cocktail);
  } catch (err) {
    console.log(err);
    paginationView.hidePageBtn();
    cocktailView.renderError();
  }
};

//^ Controller - when search
const controlSearchNameResults = async function () {
  try {
    // Render spinner
    searchResultsView.renderSpinner();

    // Get search query
    const query = searchByNameView.getQuery();

    await model.loadSearchNameResult(query);

    // Render results
    searchResultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    paginationView.hidePageBtn();
    searchResultsView.renderError();
  }
};

//^ Search by ingredient
const controlSearchIngredientResults = async function (query) {
  try {
    // Render spinner
    searchResultsView.renderSpinner();

    // Load search results
    await model.loadSearchIngredientResult(query);

    // Render results
    searchResultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    searchResultsView.renderError();
  }
};

//^ Search by letter
const controlSearchLetterResults = async function () {
  try {
    // Render spinner
    searchResultsView.renderSpinner();

    // Get search query
    const query = searchByLetterView._query;

    if (!query) return;

    // Load search results
    await model.loadSearchLetterResult(query);

    // Render results
    searchResultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    paginationView.hidePageBtn();
    searchResultsView.renderError();
  }
};

//^ Controller when click on pagination button
const controlPagination = function (gotoPage) {
  // Render new results
  searchResultsView.render(model.getSearchResultsPage(gotoPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

//^ Controller when click on heart img
const controlAddFavorite = function () {
  // Add/remove favorite
  if (!model.state.cocktail.favorite) model.addFavorite(model.state.cocktail);
  else model.removeFavorite(model.state.cocktail.id);

  // Update cocktail view
  cocktailView.render(model.state.cocktail);

  // Render favorite
  favoriteView.render(model.state.favorites);
};

const controlFavorites = function () {
  favoriteView.render(model.state.favorites);
};

const init = function () {
  favoriteView.addHandlerRender(controlFavorites);
  cocktailView.addHandlerRender(controlCocktails);
  cocktailView.addHandlerAddFavorite(controlAddFavorite);
  searchByNameView.addHandlerSearchByName(controlSearchNameResults);
  searchByIngredientView.addHandlerSearchByIngredient(
    controlSearchIngredientResults
  );
  searchByLetterView.addHandlerSearchByLetter(controlSearchLetterResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
