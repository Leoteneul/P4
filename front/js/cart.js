
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
      
      
document.getElementById('order').addEventListener('click', function(){

  createClientObject();
});



function createClientObject(){

  if(verifyForm()){
    let allValues = verifyForm();
    let res = allValues.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item.value }), {});
  
    console.log(res)
  }
  
  else{
    alert('Les champs renseignés ne sont pas conformes, veuillez réessayer')
  }


}
     
function calculTotaux(item){
  totalArticle += parseInt(item.quantity);
  totalPrice += item.price * item.quantity;
  document 
  .getElementById('totalQuantity').innerText = totalArticle;
  
  document
  .getElementById('totalPrice').innerText = totalPrice;
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
  <p>${item.price}€</p>
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
      localStorage.setItem('produits', JSON.stringify(filteredProducts))
      location.reload();

      console.log(filteredProducts)
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

      localStorage.setItem('produits', JSON.stringify(products))
      location.reload();

  })});

}

function verifyForm(){

  let allValues = [];
  let formcount = 0;
  
  let regFirstName = /[A-z]{2,36}/;
  
  document.querySelectorAll('.cart__order input:not([type=submit])').forEach(input =>
    { 
      let divErrorMessage = input.nextElementSibling;
      divErrorMessage.style.textAlign = 'center';
      formcount++;
      

        if(input.id == 'firstName' && !input.value.match(regFirstName)){
          divErrorMessage.textContent = 'Le prénom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
          return
        }

        if(input.id == 'lastName' && !input.value.match(regFirstName)){
          divErrorMessage.textContent = 'Le prénom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
          return
        }

        if(input.id == 'address' && !input.value.match(regFirstName)){
          divErrorMessage.textContent = 'Le prénom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
          return
        }

        if(input.id == 'city' && !input.value.match(regFirstName)){
          divErrorMessage.textContent = 'Le prénom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
          return
        }

        if(input.id == 'email' && !input.value.match(regFirstName)){
          divErrorMessage.textContent = 'Le prénom renseigné ne remplit pas les conditions, 2-36 caractères A-z, "-".';
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