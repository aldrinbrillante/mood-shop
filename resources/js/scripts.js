// import from tutorial 
import data from './data.js'

// lsit all references from tutorial + needed
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

const addForm = document.getElementById('add-form')
const itemName = document.getElementById('item-name')
const itemPrice = document.getElementById('item-price')


// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    itemsContainer.appendChild(newDiv)

    // create a paragraph element for a description
    let desc = document.createElement('p')
    // give the paragraph text from the data
    desc.innerText =data[i].desc
    // append the paragraph to the div
    newDiv.appendChild(desc)

    // do the same thing for price
    let price = document.createElement('p')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name

    // creates a custom attribute called data-price.
    // That will hold the price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
}

const all_items_button = Array.from(document.querySelectorAll("#items button"))
all_items_button.forEach(elt => 
    elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems();
    })
  );


//Manuvering the Cart 
const cart = []



// handle the Change Events on Update Input
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}


// Handle clicks 
itemList.onclick = function(e){
    //console.log("Clicked List!!!!")
    if(e.target && e.target.classList.contains('remove')){
        const name = e.target.dataset.name 
        removeItem(name)
    }

    else if(e.target && e.target.classList.contains('add-one')){
        const name = e.target.dataset.name
        addItem(name)
    }

    else if(e.target && e.target.classList.contains('remove-one')){
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}


// handle add form submit
    addForm.onsubmit = function(e){
         e.preventDefault()
        const name = itemName.value
        const price = itemPrice.value
        console.log(name, price)
        addItem(name, price)
     }


// Add Item function
function addItem(name, price){
    for(let i =0; i < cart.length; i++){
        if(cart[i].name === name) {
            cart[i].qty += 1
            // stop here!
            showItems()
            return
        }
    }
    const item = { name, price, qty: 1 }
    cart.push(item)
    showItems()
}

//  Show Items
function showItems(){
    const qty = getQty()
    //console.log( `You have ${qty} items in your cart` )
    cartQty.innerHTML = `You have ${qty} items in your cart` 

     let itemStr = ''
     for(let i = 0; i < cart.length; i += 1){
        //console.log(`-${cart[i].name } ${ cart[i].price } x ${ cart[i].qty}`)  
        // {name : 'Apple', price : 0.99, qty : 1}
        const {name, price, qty} = cart[i]

        itemStr += `<li> ${name } $${price } x ${qty} = $${qty * price} 
        <button class = "remove" data-name="${name}">Remove</button> 
        <button class = "add-one" data-name="${name}"> + </button> 
        <button class = "remove-one" data-name="${name}"> - </button> 
        <input class = "update" type="number" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    //console.log(`Total in cart: ${getTotal()}`)
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

// Get qantity
function getQty(){
    let qty = 0;
    for(let i = 0; i < cart.length; i++){
        qty += cart[i].qty
    }
    return qty
}

// return total
function getTotal(){
    let total = 0
    for(let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

// Remove Item functions x2
function removeItem(name, qty = 0){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            if(qty > 0){
                cart[i].qty -= qty
            }

            if(cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            showItems()
            return
        }
    }
}

function updateCart(name, qty){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            if(qty < 1){
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}