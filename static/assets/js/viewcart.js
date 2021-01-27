if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    displayViewDetails()
    var removeCartItemButtons = document.getElementsByClassName('btn-cancel')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeView)
        
    }

    
    
}

function displayViewDetails(){
    clearView()        
    for( var i=0; i<sessionStorage.length; i++){
        var KeyId  = window.sessionStorage.key(i);
        var name = JSON.parse(window.sessionStorage.getItem(KeyId));
        createView(name, KeyId)
    }
    updateViewTotal()
}



function updateViewTotal() {
    var viewItemContainer = document.getElementsByClassName('view-items')[0]
    var viewRows = viewItemContainer.getElementsByClassName('view-row')
    var total = 0
    for (var i = 0; i < viewRows.length; i++) {
        var viewRow = viewRows[i]
        var priceElement = viewRow.getElementsByClassName('view-unit-price')[0]
        total = total + (parseFloat(priceElement.innerText))
    } 
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('view-total-price')[0].innerText = 'Rs. ' + total
}

function removeView(event) {
    var buttonClicked = event.target
    var mainRow = buttonClicked.parentElement.parentElement
    var id = mainRow.getElementsByClassName("hidden-product-id")[0].value
    sessionStorage.removeItem(id)
    mainRow.remove()
    updateViewTotal()
}

function clearView() {
    var buttonClicked = document.getElementsByClassName('view-row')
    for(var i = buttonClicked.length -1; i>=0; --i){
        var removeRow = buttonClicked[i]
        removeRow.remove()
    }
}



function createView(name, KeyId){
    var viewRow = document.createElement('div')
    viewRow.classList.add('view-row')
    var viewItems = document.getElementsByClassName('view-items')[0]
    var viewRowContents = `
        <div class="view-item view-column">
            <input type="hidden" class="hidden-product-id" value="${KeyId}">
            <img class="view-item-image" src="${name.img}" width="100" height="100">
            <span class="view-item-title">${name.title}</span>
        </div>
        <span class="view-price view-column">${name.price}</span>
        <div class="view-quantity view-column">
            <span class="view-quantity">${parseInt(name.quantity)}</span>    
        </div>
        <div class="view-unit-price view-column">
            <span class="view-unit-price">${(parseFloat(name.price)*parseInt(name.quantity))}</span>                
        </div>
        <div class="view-column">
            <button class="btn btn-danger btn-cancel" type="button">CANCEL</button>
        </div>
        `
    viewRow.innerHTML = viewRowContents
    viewItems.append(viewRow)   
}





