//JS support page for POKEMON STORE webpage -> home.html

// Loading all The base and main DOM objects
const pokedex = document.getElementById('pokedex');
const searchBar = document.getElementById('searchBar');
const searchedData = document.getElementById('searchedData');

// Height Weight based Filtering DOM objects
const filterHeightStart = document.getElementById('startHeight');
const filterHeightEnd = document.getElementById('endHeight');
const filterWeightStart = document.getElementById('startWeight');
const filterWeightEnd = document.getElementById('endWeight');

//Adding Event Listeners to all DOM objects for instant search and filtering
searchBar.addEventListener('input',()=>search(searchBar.value));

filterHeightStart.addEventListener('input',()=>search(searchBar.value));
filterWeightStart.addEventListener('input',()=>search(searchBar.value));
filterHeightEnd.addEventListener('input',()=>search(searchBar.value));
filterWeightEnd.addEventListener('input',()=>search(searchBar.value));

// Search Initiation function. -> called from sort related checkbox clicks
function initiateSearch(){
    search(searchBar.value);
}

//The Global data stored for reducing network calls. 
//To access the data on clicking cards
var allPokemonObjects = [];
var allPokemonList = null;
var allPokemonPrePromiseObjects = null;

// Initial fetch function which loads all the data of pokemons from pokeapi
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    allPokemonPrePromiseObjects = promises;
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            // Storing required data in json objects from obtained objects from fetch()
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            abilities: result.abilities.map((ability) => ability.ability.name).join(', '),
            base_experience: result.base_experience,
            forms: result.forms.map((form)=> form.name ).join(", "),
            //game_indices: result.game_indices.map((game)=> game.game_index +", "  )
            height: result.height,
            weight: result.weight,
            items: result.held_items.map((xitem)=> xitem.item.name).join(", "),
            moves: result.moves.map((xmove)=> xmove.move.name).join(", "),
            order: result.order,
            species: result.species.name,
            images: [result.sprites['front_default'],result.sprites['back_default'],result.sprites['front_shiny']],
            
            
            //Add All other things needed to the JSON object for next improvement step

        }));
        displayPokemon(pokemon);
        
    });
};

//To display all the Pokemon objects on home page initially
const displayPokemon = (pokemon) => {
    allPokemonObjects = pokemon;
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onClick="displayPokemonOnPage(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
    // The pokemonHtmlString is stored for further traceback uses
    allPokemonList = pokemonHTMLString;
};

// Displaying all data back on to the Home Page -> To set back to initial stage
const displayAllOnPage = () => {
    pokedex.innerHTML = allPokemonList;
    searchedData.innerHTML = ``;
    searchBar.value="";
}

// To genereate a list from a list of strings compressed as json with ',' as a delimiter
const generateHtmlList = (st) => {
    const HtmlList= st.split(",").map((val) => `<li>${val}</li>`).join('');
    return HtmlList;
}

//To display pokemon object selected. 
//Accepts ID and calls onPage function by sending pokemon object
const displayPokemonOnPage=(id) => {
    pokeman = allPokemonObjects[id-1];
    onPage(pokeman);
}

//Displaying one Pokemon Data on Main Page
const onPage = (pk)=>{
    // Creating custon HTML snippet with the object accepted
    st = `
    <div class="card" >
        <img class="card-image" src="${pk.image}"/>
        <h1 class="card-title"> ${pk.name}</h1>
        <h2>Type</h2>
        <p > ${generateHtmlList(pk.type)}</p>
        <br>
        <p >Species: ${pk.species}</p>
        <p >Base Experience: ${pk.base_experience}</p>
        <h3>Images</h3>
        <div class="container"> 
        <img class="card-image" src="${pk.images[0]}"/>
        <img class="card-image" src="${pk.images[1]}"/>
        <img class="card-image" src="${pk.images[2]}"/>
        </div>
        <h2>Moves </h2>
        <p> ${generateHtmlList(pk.moves)}</p>
        <h2>Abilities : ${ generateHtmlList(pk.abilities) }</h2>
        <h2>Forms : ${pk.forms}</h2>
        <h2>Height : ${pk.height}</h2>
        <h2>Weight : ${pk.weight}</h2>
        <h2>Order : ${pk.order}</h2>
    </div>`;
    pokedex.innerHTML = st;
    searchedData.innerHTML=``;
}

// Search Logic -> called from eventListener in searchBar
const  search = (text)=>{
    if( text.replaceAll(' ','').length ==0  &&
        filterHeightEnd.value.replaceAll(' ','').length ==0 &&
        filterHeightStart.value.replaceAll(' ','').length ==0 &&
        filterWeightEnd.value.replaceAll(' ','').length ==0 &&
        filterWeightStart.value.replaceAll(' ','').length ==0 ){
            generateSearches([]);
            return;
    }
    //Creating height and weight bounds
    var heightSt = 0;
    var heightEn = Number.MAX_VALUE;
    var weightSt = 0;
    var weightEn = Number.MAX_VALUE;
    
    //Upddating the height weight bounds from user inputs
    if(filterHeightEnd.value !='')
        heightEn = parseInt(filterHeightEnd.value);
    if(filterWeightEnd.value !='')
        weightEn = parseInt(filterWeightEnd.value);
    if(filterHeightStart.value !='')
        heightSt = parseInt(filterHeightStart.value);
    if(filterWeightStart.value !='')
        weightSt = parseInt(filterWeightStart.value);    
    
    //Actual filtering based on name, height and weight properties as given by user
    let matchedWords = allPokemonObjects.filter(
        obj => {
            const regex = new RegExp(`^${text}`,'gi'); // regex for matching input data
            return obj.name.match(regex) && 
                (obj.height >= heightSt) && 
                (obj.weight >= weightSt) && 
                (obj.height <= heightEn) && 
                (obj.weight<=weightEn);
        });
    //calling sort Data function to sort according to required sort features by user.
    matchedWords = sortData(matchedWords);

    //calling generate Searches function to add the matched objects to searchbox as results 
    generateSearches(matchedWords);
};

//To add the search retrieved objects on to html page at searchedData
function generateSearches(objs){
    if(objs.length > 0){
        const htmlString = objs.map(obj=>`
            <div class = "card" onClick="displayPokemonOnPage(${obj.id})">
                <img class="card-image" src="${obj.image}"/>
                <div >
                <h3>${obj.name}</h3>
                <h4>Height : ${obj.height}</h4>
                <h4>Weight : ${obj.weight} </h4>
                </div>
            </div>`).join('');
        searchedData.innerHTML=htmlString;
    }
    else{
        searchedData.innerHTML=`<p style="text-align:center;color:black;font-size: 20px; ">No Results</p>`;
    }
}

//Sort Data function to sort according to sorting type needed by the user.
function sortData(searches){
    var sorters = document.getElementsByName("sorter");
    var sorted = 0;
    for(var x=0; x<4;x++){
        if(sorters[x].checked){
            sorted=x; break;
        }
    }
    /*
    sorted : 
    0 -> id
    1 -> Name
    2 -> Height
    3 -> Weight
    */
    searches.sort(function (a,b){
        switch(sorted){
            case 0:
            return a.id - b.id;

            case 1:
            return a.name.localeCompare(b.name);
            
            case 2:
            return a.height-b.height;

            case 3:
            return a.weight - b.weight;
        }
    });
    return searches;
}

// Calling the fetchPokemon function to initiate the page.
fetchPokemon();