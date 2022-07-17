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



document.getElementById('addToCart')          //CREATION DE L'ELEMENT DANS LE STORAGE
    .addEventListener('click', function(){          // PLUS TEST CHAMPS QUANTITE ET COULEUR

    let article = {

        name: document.getElementById('title').innerText,
        colors: document.getElementById('colors').value,
        quantity: document.getElementById('quantity').value,
    };
    
    if (quantityIsValid(article.quantity) & colorIsValid(article.colors)){
        let articleLinea = JSON.stringify(article);
        localStorage.setItem(article.name + ' ' + article.colors, articleLinea);
        console.log(article);
    }
    else{
        alert('Certains champs ne respectent pas les consignes.')
    }
})

function quantityIsValid(number){

  if (/^[1-9][0-9]?$|^100$/.test(number)) {
    console.log('nice');
    return true;
  } 
  else {
    console.log('pas nice');
    return false;
    }
    
}

function colorIsValid(color){

    if (couleurs.includes(color)){
        console.log('check')
        return true
    }
    else{
        console.log('pas check')
        return false
    }
}

