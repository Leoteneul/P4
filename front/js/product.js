// RECUPERE LES INFOS API EN FONCTION DE L'ID PRODUIT
fetch("http://localhost:3000/api/products/" + getId('id'))
    .then((res) => {return res.json()})

    .then((data) => {

        displayInfoProduct(data);
        listenAndCreateArticle(data);
        changePageTitle(data.name);
    })

    

//CREATION DE L'ELEMENT DANS LE STORAGE PLUS TEST CHAMPS QUANTITE ET COULEUR
function listenAndCreateArticle(data){
    document.getElementById('addToCart')          
    .addEventListener('click', function(){      
            
        let article = {
            id: getId('id'),
            color: document.getElementById('colors').value,
            quantity: Number(document.getElementById('quantity').value), 
        };

        if (article.quantity < 1 || article.quantity > 100){
            alert('La quantité saisie n\'est pas comprise entre 0 et 100');
            return
        }

        if(!data.colors.includes(article.color)){
            alert('La couleur choisis ne corresponds pas');
            return
        }

        pushArticleAndSetStorage(article);
        alert("L'article a correctement été ajouté à votre panier! ");
        window.history.back();
    })
}

// AFFICHAGE DES INFORMATIONS DU PRODUIT CHOISI
function displayInfoProduct(data){

    document.getElementById('title').textContent = data.name;  //PRODUCT NAME
    document.getElementById('price').textContent = data.price; //PRODUCT PRICE
    document.getElementById('description').textContent = data.description //PRODUCT DESCRIPTION

    const img = document.createElement('img'); //PRODUCT IMG
    img.src = data.imageUrl;
    img.alt = data.altTxt
    document.querySelector('.item__img').appendChild(img);
   
    let colorChoice = document.getElementById('colors');   //PRODUCT COLOR
    for (const color of data.colors) {
        let option = `<option value=${color}>${color}</option>`;
        colorChoice.innerHTML += option;
    }
}

// COMPARE AVEC LES PRODUITS EXISTANT MODIF OU PUSH ARTICLE
function pushArticleAndSetStorage(article){

    let products = JSON.parse(localStorage.getItem('produits'));

    if (products == null || products.length == 0) {
        store([article]); 
        return
    }

    let found = products.find(product => product.id == article.id && product.color == article.color);
    
    if(found){
        Number(found.quantity += article.quantity)
        store(products);
        return;
    }
    
    products.push(article);
    store(products);
}

function changePageTitle(name){

    document.querySelector('title').textContent = name
 }
 


