
//~~~~~~~~~~~~~~~~~~~~~Part 1~~~~~~~~~~~~~~~~~~~~~~~~~~//

//1.)
async function numFacts1() {
  let res = await $.getJSON("http://numbersapi.com/7?json");
  $(document).ready(function() {
    $("#demo").html(`${res.text}`);
    });
   
    return res;
  
};
numFacts1();

//2.)
async function numFacts2() {
    let res2 = await $.getJSON("http://numbersapi.com/2?json");
    let res3 = await $.getJSON("http://numbersapi.com/3?json");
    let res4 = await $.getJSON("http://numbersapi.com/4?json");
        $(document).ready(function() {
        $("#demo2").html(`${res2.text}, ${res3.text}, ${res4.text}`);
        
     });

};

numFacts2()

//3.)
async function numFacts3() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON("http://numbersapi.com/7?json"))
    );
    facts.forEach(data => {
      $('#demo3').append(`<p>${data.text}</p>`);
    });
  }
  numFacts3();

// ~~~~~~~~~~~~~~~~~~Part2~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1.
    async function part1() {
      let data = await $.getJSON(`${baseURL}/new/draw/`);
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
 
    part1()
    // 2.
    async function part2() {
      let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
      let deckId = firstCardData.deck_id;
      let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
      [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    }
    part2()
    // 3.
    async function setup() {
      let $btn = $('button');
      let $cardArea = $('#card-area');
  
      let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
      $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let card = cardData.cards[0].image;
        $cardArea.append(
          $('<img>', {
            src: card,
          })
        );
      });
    }
    setup();
  });
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Part 3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  $(function() {
    let baseURL = "https://pokeapi.co/api/v2";
  
    // 1.
    async function getPokemon() {
      let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      console.log(data);
    }
    getPokemon()
    // 2.
    async function getRandomPokemon() {
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      pokemonData.forEach(p => console.log(p));
    }
    getRandomPokemon()
    // 3.
    async function pokemonParallel() {
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      descriptions = speciesData.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
      });
      descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].name}: ${desc}`);
      });
    }
    pokemonParallel()
    });