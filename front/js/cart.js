
let sectionCart = document.getElementById('cart__items');
let totalArticle = 0;
let totalPrice = 0;
fetch("http://localhost:3000/api/products")
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function(canapes) {
        for (var i = 0; i < localStorage.length; i++) {
          let articleParse = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
          for (const canape of canapes) {

            if(articleParse.name == canape.name){
              createHTML(articleParse, canape);
              calculTotaux(articleParse, canape);
            }
        
        }

       }
       
      })

function createHTML(localInfo, apiInfo){

  let html = `<article class="cart__item" data-id="${apiInfo._id}" data-color="${localInfo.colors}">
    <div class="cart__item__img">
      <img src=${apiInfo.imageUrl} alt=${apiInfo.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${apiInfo.name}</h2>
        <p>${localInfo.colors}</p>
        <p>${apiInfo.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${localInfo.quantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localInfo.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  sectionCart.innerHTML += html;

}

function calculTotaux(localInfo, apiInfo){
  totalArticle += parseInt(localInfo.quantity);
  totalPrice += apiInfo.price * localInfo.quantity;
  document 
    .getElementById('totalQuantity').innerText = totalArticle;
  
  document
    .getElementById('totalPrice').innerText = totalPrice;
}
