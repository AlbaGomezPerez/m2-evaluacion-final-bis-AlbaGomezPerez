'use strict';
const buttonStart = document.querySelector('.button');
const cardsSpace = document.querySelector('.cards-space');
const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
const defaultImage = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let idFirstCardSelected = null;

function promise(){
  const inputValue = document.querySelector('input[type="radio"]:checked').value;
  fetch(`${url}${inputValue}.json`)
  //fetch(url)
  .then (response => response.json())
  .then (data => {
    cardsSpace.innerHTML='';
    for (let i = 0; i < data.length; i++){
      let cardImage = {
        image: data[i].image,
        id: data[i].pair
      };
      cardsSpace.innerHTML += generateCardsContent(cardImage);
    }
    const pokemonCards = document.querySelectorAll('.card-default');
    for(let card of pokemonCards){
      card.addEventListener('click',showOrHidePokemon);
    }
    localStorage.setItem('numberSelected', inputValue);

    return data;
  });
}


function generateCardsContent(cardImage){
  let card = `<div class="pokemonCharacter"><img pokemonId="${cardImage.id}" class="card-default" src="${defaultImage}" dataImage="${cardImage.image}"/></div>`;
  return card;
}
function showOrHidePokemon(){
  if(this.classList.contains('card-pokemon')){
    this.classList.remove('card-pokemon');
    this.classList.add('card-default');
    this.src = defaultImage;
  }else{
    this.classList.add('card-pokemon');
    this.classList.remove('card-default');
    this.src = this.getAttribute('dataImage');
  }
  checkWin(this);
}

function checkWin(imgPokemonSelected){
  let firstClick = false;
  if(idFirstCardSelected === null){
    idFirstCardSelected = imgPokemonSelected.getAttribute('pokemonId');
    firstClick = true;
  }

  if(imgPokemonSelected.getAttribute('pokemonId') !== idFirstCardSelected){
    const firstCardSelected = document.querySelector(`img[pokemonId="${idFirstCardSelected}"][class="card-pokemon"]`);
    firstCardSelected.classList.remove('card-pokemon');
    firstCardSelected.classList.add('card-default');
    setTimeout(function() {
      firstCardSelected.setAttribute('src', defaultImage);
    }, 3000);

    imgPokemonSelected.classList.remove('card-pokemon');
    imgPokemonSelected.classList.add('card-default');
    setTimeout(function() {
      imgPokemonSelected.setAttribute('src', defaultImage);
    }, 3000);
  }

  if(firstClick === false){
    idFirstCardSelected = null;
  }
}


buttonStart.addEventListener('click',promise);

function renderNumberSelecter(){
  const numberSelected = localStorage.getItem('numberSelected');
  const radioToSelect = document.querySelector(`input[type="radio"][value="${numberSelected}"]`);
  radioToSelect.checked = true;
}
renderNumberSelecter();
