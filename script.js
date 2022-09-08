//------------------Variáveis Globais-------------------------------------------------------------------------------------
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//------------------Início das funções-------------------------------------------------------------------------------------
const fetchPokemon = async (pokemon) => { //Função para coletar as informações da API.
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => { //Função para renderizar o conteúdo na página.

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value ='';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found (?)';
        pokemonNumber.innerHTML ='';
        input.value ='';
    }
}

//------------------Eventos-------------------------------------------------------------------------------------------------
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());    
}); //Evento para realizar pesquisa quando inserido o dado no input de pesquisa

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
}); //Evento para realizar ação quando pressionado o botão previous.

buttonNext.addEventListener('click', () => {
    if(searchPokemon < 649){ //nAdicionei um limite de 649, pois a API não possue Sprites a partir deste valor
    searchPokemon += 1;
    renderPokemon(searchPokemon); 
    }       
}); //Evento para realizar ação quando pressionado o botão previous.

renderPokemon(searchPokemon);