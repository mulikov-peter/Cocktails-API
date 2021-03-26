import View from './View.js';
// import icons from './img/heart.svg'; // Parcel 1
import favorite from 'url:../../img/favorite.png'; // Parcel 2
import favoriteFull from 'url:../../img/favoriteFull.png'; // Parcel 2
import share from 'url:../../img/share.png';

class CocktailView extends View {
  _parentElement = document.querySelector('.cocktail-container');

  _errorMessage = `We could not find that cocktail. Please try another one...`;
  _message = '';

  addHendlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHendlerAddFavorite(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-favorite');
      if (!btn) return;
      handler();
    });
  }

  //^ Generate markup for full cocktail
  _generateMarkup() {
    return `
      <div class="card bg-dark m-2">
      <h4 class="card-header cocktailName d-flex justify-content-between">${
        this._data.title
      } 
        <span>
          <img class='icon share mr-4' src='${share}' alt='share button'  role="button"> 
          <img class='icon btn-favorite favorite pull-right' src="${
            this._data.favorite ? favoriteFull : favorite
          }" alt="heart" role="button">
        </span>
      </h4>
      
      <div class="card-body row">
        <div class="col-md-3 col-ms-1 col-xs-1" >
          <img class="img-fluid rounded mb-2" src="${this._data.img}">
          <div ><b>Category:</b> ${this._data.type}</div>
          <div><b>Glass:</b> ${this._data.glass}</div>
        </div>
        <div class="col-md-9 col-ms-11 col-xs-11">
          <h5 class="list-group-item"><b>Ingredients:</b></h5>
            <ul class="list-group d-inline-block">
              ${this._data.ingredientsFull
                .map(this._generateMarkupIngridient)
                .join('')}
            </ul>
        </div>
        <div class='col p-4'>${this._data.instruction}</div>
      </div>
    </div>
      `;
  }

  //^ Generate markup for ingredients
  _generateMarkupIngridient(ing) {
    if (!ing.ingredient) return;

    return `
      <li class="list-group-item d-inline-block text-center">
        <div class="row">
          <figure class="col-ms-2 ">
            <img class="img-fluid img-fig mb-2" src="https://www.thecocktaildb.com/images/ingredients/${ing.ingredient}-Small.png">
            <figcaption>
              <span class="ing">${ing.ingredient}</span>
              <span class="meas">${ing?.measure}</span>
            </figcaption>
          </figure>
        </div>
      </li>
    `;
  }
}

export default new CocktailView();
