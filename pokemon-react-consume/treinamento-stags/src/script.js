loadPokemons().then(loadEvolutions).then(load.bind(this, [0]));

async function loadEvolutions() {
    evolutions = [];
    
    for (let i = 1; i <= 100; i++) {
        chain = [];
        const x = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
        let y = await x.json();
        chain_step = y.chain

        while (chain_step.evolves_to.length > 0) {
            actualPokemon = pokemons.find(item => item.name === chain_step.species.name)
            
            actualPokemon ? chain.push(actualPokemon) : null;
            
            chain_step = chain_step.evolves_to[0]
        }
        actualPokemon = pokemons.find(item => item.name === chain_step.species.name)
        actualPokemon ? chain.push(actualPokemon) : null;

        evolutions.push(chain)
    }
}

function load(index) {
    divPokemons = document.getElementsByClassName('evolutions__item');
    divPokemons = Array.from(divPokemons);
    evolucaoAtual = evolutions[index];

    divPokemons.forEach((div, index) => {
        if(evolucaoAtual[index]) {
            div.style.display = 'flex';
            types = []

            evolucaoAtual[index].types.forEach(type => {
                types.push(type.type.name)
            });

            

            div.children[0].src = evolucaoAtual[index].sprites.front_default;
            div.children[1].children[0].children[1].innerText = `${evolucaoAtual[index].name}`;
            div.children[1].children[1].children[1].innerText = `${types.toString()}`;
        } else {
            div.style.display = 'none';
        }
    });
}



indexAtual = 0;
function nextPokemon() {
    if(indexAtual < 99){
        indexAtual++;
        load(indexAtual);
    }
}

function previousPokemon() {
    if(indexAtual > 0) {
        indexAtual--;
        load(indexAtual);
    }
}

function allPokes() {
    
    if (index == 140){
        img = document.createElement('img')
        span = document.createElement('span')            
        divPokemons=document.getElementsByClassName('')
        
        divPokemons.appendChild(img)
        divPokemons.appendChild(span)
        
        types = []
        evolucaoAtual.types.forEach(type => {
            types.push(type.type.name)
        });
    }
 
}