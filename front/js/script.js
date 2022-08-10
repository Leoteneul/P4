fetch("http://localhost:3000/api/products")           // RECUPERATION DES PRODUITS PRESENTS DANS L'API
  .then((res) => {if (res.ok) {return res.json()}})

  .then(function(products) {
    products.forEach(product => {

      createArticle(product);
    });
  })

function createArticle(product){   // CREATION D'UN ARTICLE EN FONCTION DE L'API
    let html = `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`     

    document.getElementById('items').innerHTML += html;
}

  

