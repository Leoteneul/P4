function store(produits){

   return localStorage.setItem('produits', JSON.stringify(produits))

}

function getId(){
    
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function priceDisplay(amount){

   return new Intl.NumberFormat('FR', { style:'currency', currency: 'EUR' }).format(amount);
}