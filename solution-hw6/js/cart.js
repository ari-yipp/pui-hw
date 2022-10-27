// call function
let rollsTotal = document.querySelector('#total-price');

let packMultiplier ={
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

// empty
let cart = [];


function saveToLocalStorage() {
    const cartArrayString = JSON.stringify(cart);
    localStorage.setItem("storedCart", cartArrayString);
    console.log(cartArrayString);
  }
  
  function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem("storedCart");
    const cartArray = JSON.parse(cartArrayString);
    cart = cartArray;
    console.log(cart);
  }
  
  if (localStorage.getItem("storedCart") != null) {
    retrieveFromLocalStorage();
  }


// SHOW ON PAGE: run elements in loop + delete functionality
// run elements
console.log(cart);
for (let i=0; i < cart.length; i++) {
    createElement(cart[i]);
}

// RETRIEVING INFO: retrieving template + costs
// roll template
function createElement(roll){
    const template = document.querySelector('#roll-template');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector('.cart-item');
    const rollListElement = document.querySelector('#cart');
    rollListElement.prepend(roll.element); 

    const btnRemove = roll.element.querySelector('.remove');
    btnRemove.addEventListener('click', () => {
        deleteRoll(roll);
      });
    
    updateRolls(roll);
}

// calculate total for each option
function totalCost(basePrice, packSize, glazing){
    return ((basePrice + glazing) * packSize).toFixed(2);
}

// FUNCTIONALITY: dynamically updating rolls display
// update rolls
function updateRolls(roll) {

    //dynamically populate
    let rollName = document.querySelector('.cart-itemname'); // change name
    rollName.innerText = roll.type + " Cinnamon Roll";

    let rollGlaze = document.querySelector('.cart-itemglaze');
    rollGlaze.innerText = "Glazing: " + roll.glazing;

    let rollSize = document.querySelector('.cart-itemsize');
    rollSize.innerText = "Pack Size: " + roll.size;

    // let newImage = rolls[roll.type]['imageFile'];
    // let rollImage = roll.element.querySelector(".cart-rollimage");
    // rollImage.src = newImage;

    let rollImage = document.querySelector('.cart-rollimage'); // change image
    rollImage.src = './products/' + rolls[roll.type].imageFile;

        // price at roll listing, using pricing adapters
        let glazingAdaption= {
            original: 0,
            sugarMilk: 0,
            vanillaMilk: 0.50,
            doubleChocolate: 1.50
        };
        
        const rollPrice = document.querySelector('.cart-itemprice > h1');
           let glazingLetters = roll.glazing.replace(" ", ""); //take out spaces
            let glazingLowerCaseLetters = glazingLetters[0].toLowerCase()+glazingLetters.slice(1); //turn to lowercase
            let glazingCostDiff = glazingAdaption[glazingLowerCaseLetters]; 
    
        const rollTotal = totalCost(roll.basePrice, packMultiplier[roll.size], glazingCostDiff);
            roll.totalPrice = parseFloat(rollTotal).toFixed(2);
        
        rollPrice.innerHTML = "$ " + rollTotal;
    
        //price at checkout
        let numTotal= rollsTotal.innerText.replace("$ ", "");
            let totalNum = parseFloat(numTotal) + parseFloat(rollTotal);
            let total = totalNum.toFixed(2);
    
        rollsTotal.innerText= "$ " + total;
}


// deleting rolls
function deleteRoll(roll) {
    roll.element.remove();
    cart.pop(roll);
    let numTotal = rollsTotal.innerText.replace("$ ", "");
    let newTotal = (parseFloat(numTotal) - parseFloat(roll.totalPrice)).toFixed(2);
    rollsTotal.innerText = "$ " + newTotal;

    saveToLocalStorage();
      console.log(cart);
}