fetch("http://localhost:3000/api/products")
  .then((res) => {if (res.ok) {return res.json()}})

  .then(function(canapes) {
    canapes.forEach(canape => {

      createArticle(canape);

    });
  })

function createArticle(canape){   // CREATION D'UN ARTICLE EN FONCTION DE L'API
    let html = `
    <a href="./product.html?id=${canape._id}">
        <article>
            <img src="${canape.imageUrl}" alt="${canape.altTxt}">
            <h3 class="productName">${canape.name}</h3>
            <p class="productDescription">${canape.description}</p>
        </article>
    </a>`     

    document.getElementById('items').innerHTML += html;
}

  

