var subTotal =0;
function calculateTotal(){
    for( var i=0; i<sessionStorage.length; i++){
        var KeyId  = window.sessionStorage.key(i);
        var name = JSON.parse(window.sessionStorage.getItem(KeyId));
        var total_price = parseInt(name.quantity) * parseFloat(name.price)
        subTotal = subTotal + total_price;
        createHiddenElements(KeyId, name, total_price)
    }
}

function delivery(){
    var subTotal = document.getElementById("subTotal").innerText;
    var total = 0;
    var rad=document.getElementById("deliveryIn")
    var delivery=rad.value;
    if(!rad.checked){
        delivery=document.getElementById("deliveryOut").value;
        document.getElementById("deliveryCharge").textContent=delivery;
    }else{
        document.getElementById("deliveryCharge").textContent=delivery;
    }
    total = parseInt(subTotal) + parseInt(delivery);
    document.getElementById("totalPrice").textContent=total;
}

function load(){
    calculateTotal()
    var delivery = 100;
    var total =  parseInt(subTotal) + parseInt(delivery);
    document.getElementById("deliveryCharge").textContent=delivery;
    document.getElementById("totalPrice").textContent=total;
    document.getElementById("subTotal").textContent=subTotal;    
}



function createHiddenElements(KeyId, name, total_price){
    var viewRow = document.createElement('div')
    var viewItems = document.getElementsByClassName('hidden-items')[0]
    var viewRowContents = `
        <input type="hidden" name="id" value="${KeyId}">
        <input type="hidden" name="quantity" value="${name.quantity}">
        <input type="hidden" name="total_price" value="${total_price}">
        `
    viewRow.innerHTML = viewRowContents
    viewItems.append(viewRow) 
}

function searchText(){  
    var search = document.getElementById("search").value.trim();
    if(!(search === (""))){
        searchUrl = "http://127.0.0.1:8000/products/?search="+search;
        let xhr = new XMLHttpRequest;
        //Call the open function, GET-type of request, url, true-asynchronous
        xhr.open('GET', searchUrl, true)
        //call the onload 
        xhr.onload = function() 
        {
            //check if the status is 200(means everything is okay)
            if (this.status === 200) 
                {
                    //return server response as an object with JSON.parse
                    console.log(JSON.parse(this.responseText));
                    //Object is received in array you can check in console as well
        }
                }
        //call send
        xhr.send();
        }
}