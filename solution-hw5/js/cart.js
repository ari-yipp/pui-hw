// idk why i have to call it here it just doesn't work??
let allRollsPrice = document.querySelector('#total-price');

// SETUP: roll class / contructor + price info
class Roll {
    type;
    glazing;
    size;
    basePrice;
    element;
    
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }
}

// store prices
let packMultiplier ={
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

let glazingAdaption= {
    original: 0,
    sugarMilk: 0,
    vanillaMilk: 0.50,
    doubleChocolate: 1.50
};

// 4 NEW ROLLS slay
// empty
let cartItems = [];

// original
let originalRoll = new Roll(
    "Original", 
    "Sugar Milk", 
    "1", 
    2.49,
);
cartItems.push(originalRoll);

// walnut
let walnutRoll = new Roll(
    "Walnut", 
    "Vanilla Milk", 
    "12", 
    3.49
);
cartItems.push(walnutRoll);

// raisin
let raisinRoll = new Roll(
    "Raisin", 
    "Sugar Milk", 
    "3", 
    2.99
);
cartItems.push(raisinRoll);

// apple
let appleRoll = new Roll(
    "Apple", 
    "Original", 
    "3", 
    3.49
);
cartItems.push(appleRoll);

// SHOW ON PAGE: run elements in loop + delete functionality
// run elements
console.log(cartItems);
for (let i=0; i < 4; i++) {
    createElement(cartItems[i]);
}

// deleting rolls
function deleteRoll(roll) {
    roll.element.remove();
    cartItems.pop(roll); //lab ref used
    let numPrice = rollsTotal.innerText.replace("$ ", "");
    let newTotal = (parseFloat(numPrice) - parseFloat(roll.totalPrice)).toFixed(2);
    rollsTotal.innerText = "$ " + newTotal;
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

    // asked for help on how to do the prices

    // price at roll listing --> use pricing adapters
    let rollPrice = document.querySelector('.cart-itemprice > h1');
        let glazingLetters = roll.glazing.replace(" ", ""); //take out spaces
        let glazingLowerCaseLetters = glazingLetters[0].toLowerCase()+glazingLetters.slice(1); //turn to lowercase
        let glazingCostDiff = glazingAdaption[glazingLowerCaseLetters];

    let rollTotal = totalCost(roll.basePrice, packMultiplier[roll.size], glazingCostDiff);
        roll.totalPrice = parseFloat(rollTotal).toFixed(2);
    
    rollPrice.innerHTML = "$ " + rollTotal;

    //price at checkout
    let numTotal= allRollsPrice.innerText.replace("$ ", "");
        let totalNum = parseFloat(numTotal) + parseFloat(rollTotal);
        let total = totalNum.toFixed(2);

    allRollsPrice.innerText= "$ " + total;

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
}