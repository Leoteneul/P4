
let sectionArticle = document.getElementById('items'); 
let item = document.querySelector("#items a");
function recupElement(){
    fetch("http://localhost:3000/api/products")
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function(canapes) {
        
        canapes.forEach(canape => {
            
                
            createArticle(canape);
            lienElement(canape);
            
        });
      })

      .catch(function(err) {
        // Une erreur est survenue
      });
    }

function createArticle(canape){      
        let newElement = item.cloneNode(true);
        newElement.querySelector('h3').innerText = canape.name;
        newElement.querySelector('p').innerText = canape.description;
        newElement.querySelector('img').setAttribute("src", canape.imageUrl);
        newElement.querySelector('img').setAttribute("alt", canape.altTxt);
        sectionArticle.appendChild(newElement);            
}
item.remove();
recupElement();

