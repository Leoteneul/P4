

document.getElementById('orderId').textContent = getOrderId();


function getOrderId(){
    
    const params = new URLSearchParams(window.location.search);
    return params.get('orderId');
}
