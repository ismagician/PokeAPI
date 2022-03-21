//inicio
const fetchPokemon = () => {
    //const pokeName = document.getElementById("pokeName");
    //let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=4`;
    const arrowRight = document.getElementById("arrowRight");
    const arrowLeft = document.getElementById("arrowLeft");

    fetch(url)
        .then((res) => {
            //console.log(res);
            if (res.status != "200") {
                pokeStatsError();
            } else {
                return res.json();
            }
        })
        .then((data) => {
            //console.log(data)
            let pokeImg = data.results;
            arrowRight.value = data.next;
            arrowLeft.value = data.previous;
            //console.log(pokeImg);
            pokeImage(pokeImg);
        });
};

//buscar pokemon por grupo
const fetchArrowPokemon = (url) => {
    //const pokeName = document.getElementById("pokeName");
    //let pokeInput = pokeName.value.toLowerCase();

    const arrowRight = document.getElementById("arrowRight");
    const arrowLeft = document.getElementById("arrowLeft");

    fetch(url)
        .then((res) => {
            //console.log(res);
            if (res.status != "200") {
                pokeStatsError();
            } else {
                return res.json();
            }
        })
        .then((data) => {
            //console.log(data)
            let pokeImg = data.results;
            arrowRight.value = data.next;
            arrowLeft.value = data.previous;
            pokeImage(pokeImg);
        });
};

//mostrar pokemones en la parte superior
const fetchImage = (pokeName, image) => {
    //const pokeName = document.getElementById("pokeName");
    //let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    //console.log(image);
    fetch(url)
        .then((res) => {
            if (res.status != "200") {
                pokeStatsError();
            } else {
                return res.json();
            }
        })
        .then((data) => {
            //console.log(data)
            let pokeImg = data.sprites.front_default;
            //console.log(pokeImg);
            image.item(0).innerHTML = pokeName;
            image.item(1).src = pokeImg;
            image.item(1).value = pokeName;
            return pokeImg;
        });
};

//llenar datos de los pokemones que se muestran en la parte superior
const pokeImage = (image) => {
    const y = document.getElementsByClassName("previewPokemon");
    for (let i = 0; i < y.length; i++) {
        fetchImage(image[i].name, y.item(i).children);
        // x.item(i).innerHTML = "Pokemón";
    }
};

//pokemones iniciales
function startName() {
    const x = document.getElementsByClassName("pokeName");
    const y = document.getElementsByClassName("previewPokemon");
    for (let i = 0; i < x.length; i++) {
        x.item(i).innerHTML = "Pokemón";
    }
}

//buscar pokemon
const fetchData = (value) => {
    //const pokeName = document.getElementById("pokeName");
    let pokeInput = value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url)
        .then((res) => {
            //console.log(res);
            if (res.status != "200") {
                //console.log(res.status);
                pokeStatsError();
            } else {
                return res.json();
            }
        })
        .then((data) => {
            const pokeImg = data.sprites.front_default;
            let tipo = "";
            //console.log(data.types.length)
            for (let i = 0; i < data.types.length; i++) {
                tipo += data.types[i].type.name + " ";
                // x.item(i).innerHTML = "Pokemón";
            }

            //console.log(tipo);
            const stats = {
                name: data.name,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                sp: data.stats[2].base_stat,
                sd: data.stats[3].base_stat,
                speed: data.stats[5].base_stat,
                type: tipo,
                img: pokeImg,
            };
            //console.log(stats)
            pokeStats(stats);
        });
};

//Llenar datos obtenidos
const pokeStats = (url) => {
    const pokeImg = document.getElementById("pokeReal");
    const stat1 = document.getElementById("stat1");
    const stat2 = document.getElementById("stat2");
    const stat3 = document.getElementById("stat3");
    const stat4 = document.getElementById("stat4");
    const stat5 = document.getElementById("stat5");
    const type = document.getElementById("type");
    const name = document.getElementById("pokeNombre");

    stat1.textContent = url.hp;
    stat2.textContent = url.attack;
    stat3.textContent = url.sp;
    stat4.textContent = url.sd;
    stat5.textContent = url.speed;
    type.textContent = url.type;
    name.textContent = url.name;
    pokeImg.src = url.img;
};

const pokeStatsError = () => {
    const pokeImg = document.getElementById("pokeReal");
    const stat1 = document.getElementById("stat1");
    const stat2 = document.getElementById("stat2");
    const stat3 = document.getElementById("stat3");
    const stat4 = document.getElementById("stat4");
    const stat5 = document.getElementById("stat5");
    const type = document.getElementById("type");
    const name = document.getElementById("pokeNombre");
    const nf = "NF";
    stat1.textContent = nf;
    stat2.textContent = nf;
    stat3.textContent = nf;
    stat4.textContent = nf;
    stat5.textContent = nf;
    type.textContent = nf;
    name.textContent = "Error.";
    pokeImg.src = "./assets/8bit2.png";
};
//escuchador de eventos, se elige la función de acuerdo al input presionadoo
document.addEventListener("click", (e) => {
    let element = e.target;
    //console.log(element.value);
    if (
        typeof element.value !== "undefined" &&
        element.className == "btTxtsubmit"
    ) {
        fetchData(element.value);
        console.log(element.value);
    } else if (
        typeof element.value !== "undefined" &&
        element.className == "arrows"
    ) {
        if (element.value) {
            //console.log(element.value);
            fetchArrowPokemon(element.value);
        }
    } else if (
        typeof element.value !== "undefined" &&
        element.className == "doSearch"
    ) {
        let input = document.getElementById("pokeSearch");
        //console.log(input);
        fetchData(input.value);
        input.placeholder = "Inserte nombre";
        input.value = "";
    }
});

fetchPokemon();
