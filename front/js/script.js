
let sectionArticle = document.getElementById('items'); 

    fetch("http://localhost:3000/api/products")
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function(canapes) {
        
        canapes.forEach(canape => {
            
                
            createArticle(canape);
            
        });
      })

    

function createArticle(canape){   
    let html = `
    <a href="./product.html?id=${canape._id}&name=${canape.name}&description=${canape.description}&img=${canape.imageUrl}&colors=${canape.colors}&price=${canape.price}&altTxt=${canape.altTxt}">
        <article>
            <img src="${canape.imageUrl}" alt="${canape.altTxt}">
            <h3 class="productName">${canape.name}</h3>
            <p class="productDescription">${canape.description}</p>
        </article>
    </a>`     
    let a = document.createElement('a');
    a.innerHTML = html;
    sectionArticle.appendChild(a);
}

  

