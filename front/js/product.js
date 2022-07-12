const params = new URLSearchParams(window.location.search);


document.getElementById('title').innerText = params.get('name');  //PRODUCT NAME

document.getElementById('price').innerText = params.get('price'); //PRODUCT PRICE

const img = document.createElement('img'); //PRODUCT IMG
img.src = params.get('img');
img.alt = params.get('altTxt')
document.querySelector('.item__img').appendChild(img);

document.getElementById('description').innerText = params.get('description') //PRODUCT DESCRIPTION

let couleurs = params.get('colors').split(",")     //PRODUCT COLOR
let colorChoice = document.getElementById('colors')
for (const couleur of couleurs) {
    let option = `<option value=${couleur}>${couleur}</option>`;
    colorChoice.innerHTML += option;
    
}

