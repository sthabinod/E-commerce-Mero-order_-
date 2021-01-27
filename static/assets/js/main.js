
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    displayCartDetails()

    quantity = function(obj){
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }
    }

    remove = function(obj){
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }
    }

    
    add = function(obj) {
        var count = $(obj).siblings('input').val();
        $(obj).siblings('input').val(parseInt(++count))
    }


    var cartItems = document.getElementsByClassName('addToCart')
    for(var i=0; i<cartItems.length; i++){
        var button = cartItems[i]
        button.addEventListener('click', function(event){
            var buttonClicked = event.target
            var mainDiv = buttonClicked.parentElement.parentElement.parentElement
            var quantity = mainDiv.getElementsByClassName('value')[0].value
            if(quantity > 0){
                var id = mainDiv.getElementsByClassName('card-id')[0].value
                if(window.sessionStorage.length == 0){
                    addSessionStorage(id, quantity, mainDiv);
                }else if(window.sessionStorage.getItem(id)==null){
                    addSessionStorage(id, quantity, mainDiv);
                }else{
                    var title = mainDiv.getElementsByClassName('card-title')[0].innerText;
                    showSnackBar(title+" has been already added to the cart. Please change quantity from the cart")
                }  
            }else{
                showSnackBar("Please specify the quantity of the product")
            }
        })
    }
  

    minus = function(obj) {
        var count = $(obj).siblings('input').val();
    
        if (count > 0) {
        $(obj).siblings('input').val(parseInt(count - 1))              
        }
    }
}


    function showItems(){
        var length = sessionStorage.length
        document.getElementsByClassName('modal-item-display')[0].innerText=length + " items"
    }

    function displayCartDetails(){
        showItems()
        clearCartItem()        
        for( var i=0; i<sessionStorage.length; i++){
            var KeyId  = window.sessionStorage.key(i);
            var name = JSON.parse(window.sessionStorage.getItem(KeyId));
            createCartRow(name, KeyId)
        }
        updateCartTotal()
    }


    function createCartRow(name, KeyId){
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartRowContents = `
            <div class="cart-item cart-column">
                <input type="hidden" class="hidden-product-id" value="${KeyId}">
                <img class="cart-item-image" src="${name.img}" width="100" height="100">
                <span class="cart-item-title">${name.title}</span>
            </div>
            <span class="cart-price cart-column">${name.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" onchange="quantity(this)" value="${parseInt(name.quantity)}" min="1">
                <button class="btn btn-danger" onclick="remove(this)" type="button">REMOVE</button>
            </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
    }
    

    function quantityChanged(event) {
        buttonClicked = event.target
        var mainDiv = buttonClicked.parentElement.parentElement
        var quantity = mainDiv.getElementsByClassName('cart-quantity-input')[0].value
        var id = mainDiv.getElementsByClassName('hidden-product-id')[0].value
        var product = JSON.parse(sessionStorage.getItem(id));
        sessionStorage.removeItem(id)
        product.quantity = quantity
        sessionStorage.setItem(id, JSON.stringify(product))
        updateCartTotal()
    }

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText)
            var quantity = quantityElement.value
            total = total + (price * quantity)
        } 
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs. ' + total
        showItems()
    }

    function removeCartItem(event) {
        var buttonClicked = event.target
        var mainRow = buttonClicked.parentElement.parentElement
        var id = mainRow.getElementsByClassName("hidden-product-id")[0].value
        sessionStorage.removeItem(id)
        mainRow.remove()
        updateCartTotal()
    }

    function clearCartItem() {
        var buttonClicked = document.getElementsByClassName('cart-row')
        for(var i = buttonClicked.length -1; i>=0; --i){
            var removeRow = buttonClicked[i]
            removeRow.remove()
        }
    }

    function addSessionStorage(id, quantity, mainDiv){
        var image = mainDiv.getElementsByClassName('card-image')[0].src
        var price = mainDiv.getElementsByClassName('card-price-each')[0].innerText
        var title = mainDiv.getElementsByClassName('card-title')[0].innerText
        const details = {
          title: title,
          img: image,
          price: price,
          quantity: quantity
        }
        window.sessionStorage.setItem(id, JSON.stringify(details));
        showSnackBar(title+" has been successfully added to the cart.")
        displayCartDetails()
      }

      function showSnackBar(message) {
        var x = document.getElementById("snackbar");
        x.innerText=message
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }


