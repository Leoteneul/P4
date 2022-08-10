// AJOUTER LA CLÉ PRODUITS AVEC LA VALEUR PARAMÉTRÉ
function store(produits){

   return localStorage.setItem('produits', JSON.stringify(produits))
}

// RÉCUPÉRER LA CLÉ PARAMÉTRÉ DANS LES QUERY STRINGS
function getId(key){
    
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

// AFFICHAGE DU PRIX FORMATÉ
function priceDisplay(amount){

   return new Intl.NumberFormat('FR', { style:'currency', currency: 'EUR' }).format(amount);
}

