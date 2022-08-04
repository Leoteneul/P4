
// CART DISPLAY
let sectionCart = document.getElementById('cart__items');
let totalArticle = 0;
let totalPrice = 0;

let productsInCart = JSON.parse(localStorage.getItem('produits'));

  fetch("http://localhost:3000/api/products/")
      .then((res) => {return res.json();})

      .then(function(allItems) {

        let items = findAndLinkInformations(allItems, productsInCart);
        
        items.forEach(item => {
          createHTML(item);
          calculTotaux(item);
          
        })

      listenQuantityChange(productsInCart);
      listenAndDeleteProduct(productsInCart);
      })
        
// FORM AND POST REQUEST
document.getElementById('order').addEventListener('click', function(e)
{

  e.preventDefault();
  postAndRecupOrderId();
})


// FUNCTIONS CART DISPLAY
function calculTotaux(item){
  totalArticle += parseInt(item.quantity);
  totalPrice += item.price * item.quantity;
  document 
  .getElementById('totalQuantity').innerText = totalArticle;
  
  document
  .getElementById('totalPrice').innerText = priceDisplay(totalPrice);
}

function createHTML(item){
  
  let html = `<article class="cart__item" data-id="${item._id}" data-color="${item.color}">
  <div class="cart__item__img">
  <img src=${item.imageUrl} alt=${item.altTxt}>
  </div>
  <div class="cart__item__content">
  <div class="cart__item__content__description">
  <h2>${item.name}</h2>
  <p>${item.color}</p>
  <p>${priceDisplay(item.price)}</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté : ${item.quantity}</p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article>`
  
  sectionCart.innerHTML += html;
}

function findAndLinkInformations(allItems, productsInCart){
  const list = [];
  
  productsInCart.forEach( product => {
    
    let found =  JSON.parse(JSON.stringify(allItems.find(item => item._id == product.id)));
    found.color = product.color;
    found.quantity = product.quantity;
    
    list.push(found)
  })

  return list   
}

function listenAndDeleteProduct(products){

  document.querySelectorAll('.deleteItem').forEach(button => 
  {
    button.addEventListener('click', function()
    {
      let parent = button.closest('.cart__item');
      let id = parent.dataset.id;
      let color = parent.dataset.color;

      let filteredProducts = products.filter(product => product.id != id || product.color != color)
      store(filteredProducts)
      location.reload();

    })
  })
}

function listenQuantityChange(products){

  document.querySelectorAll('.itemQuantity').forEach(item => 
  {
    item.addEventListener('change', function(event)
    {

      if (event.target.value < 1 || event.target.value > 100){
        alert('La quantité saisie n\'est pas comprise entre 0 et 100');
        location.reload();
        return
        }

      let button = event.target;
      let quantity = event.target.value;
      let parent = button.closest('.cart__item');
      let id = parent.dataset.id;
      let color = parent.dataset.color;

      let found = products.find(product => product.id == id && product.color == color)
      found.quantity = quantity;

      store(products);
      location.reload();

  })});

}


// FUNCTIONS FORM AND POST REQUEST
function createArrayId(){

  let products = [];

  productsInCart.forEach(product => {
    products.push(product.id)
  })

  return products
}

function createClientObject(){

  let allValues = verifyForm();
  let res = allValues.reduce(
    (obj, item) => Object.assign(obj, { [item.id]: item.value }), {});

  return res
}

function postAndRecupOrderId(){

  if(!verifyForm()){

    return alert('Les champs remplits sont incorrects, Veuillez réessayer')

  }
  if(productsInCart < 1){

    return alert('Votre panier est vide')
  }
  
  let bodyPost = {

    contact: createClientObject(),

    products: createArrayId()
  }

  fetch("http://localhost:3000/api/products/order", {

    method: "POST",

    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'  
    },

    body: JSON.stringify(bodyPost)
    
    
  })
  .then((res) => {if (res.ok) {return res.json();}})

  .then(function(data) {

    window.location.href = "./confirmation.html?orderId=" + data.orderId;     
  
  })
      
    
}

function verifyForm(){

  let allValues = [];
  let formcount = 0;
  
  let regFirstNameAndLastName = /[A-z]{2,36}/;
  let regAdresse = /[A-z-\s\d]{2,60}/;
  let regCity = /^(\d{5})+?$/;
  let regMail = /[A-z-\s\d]+@[A-z]+\.[A-z]{2,6}/;
  
  document.querySelectorAll('.cart__order input:not([type=submit])').forEach(input =>
    { 
      let divErrorMessage = input.nextElementSibling;
      divErrorMessage.style.textAlign = 'center';
      formcount++;

      if(input.id == 'firstName' && !input.value.match(regFirstNameAndLastName)){
        divErrorMessage.textContent = 'Le prénom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
        return
      }

      if(input.id == 'lastName' && !input.value.match(regFirstNameAndLastName)){
        divErrorMessage.textContent = 'Le Nom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
        return
      }

      if(input.id == 'address' && !input.value.match(regAdresse)){
        divErrorMessage.textContent = 'L\'adresse renseignée ne remplit pas les conditions, 2-60 caractères A-z, 0-9, "-".';
        return
      }

      if(input.id == 'city' && !input.value.match(regCity)){
        divErrorMessage.textContent = 'La Ville renseignée ne remplit pas les conditions, code postal 5 chiffres';
        return
      }

      if(input.id == 'email' && !input.value.match(regMail)){
        divErrorMessage.textContent = 'L\'email renseigné ne remplit pas les conditions, il ne s\'agit pas d\'un mail valide "@"';
        return
      }
      
        divErrorMessage.textContent = '';
        allValues.push(input);  
    })
    
    if(allValues.length != formcount){
      return
    }
    return allValues
      
  
}