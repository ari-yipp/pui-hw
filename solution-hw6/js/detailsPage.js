//js for dynamic price changes
//glazing object

let glazingOptions = [
    {
        name: "Keep Original",
        price: 0,
    },
    {
        name: "Sugar milk",
        price: 0,
    },
    {
        name: "Vanilla milk",
        price: 0.5,
    },
    {
        name: "Double chocolate",
        price: 1.5,
    },
];

//packsize object

let packsizeOptions = [
    {
        size: "1",
        price: 1,
    },
    {
        size: "3",
        price: 3,
    },{
        size: "6",
        price: 5,
    },{
        size: "12",
        price: 10,
    },
];

// js for get roll type from URL: from hw example
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

// js for dynamic details page update
// change product name
const productName = document.querySelector("#rollheader > h1");
    productName.innerHTML = rollType + " Cinnamon Roll";

// debugging bc im in hell
// const productPhoto = document.getElementById("rollimage").src="./products/" + rolls[rollType].imageFile;

// change img
const productImage = document.querySelector("#rollimage");
    productImage.src="./products/" + rolls[rollType].imageFile;

// change price
const productPrice = document.querySelector("#totalPrice > h2");
    productPrice.innerHTML = rolls[rollType].basePrice;


//populate dropdown
//used reference: https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array

//glazing
let glazingOptionsElement = document.querySelector("#glazingOptions");
for (let i = 0; i < glazingOptions.length ; i++ ) { // loops through array to turn all into new elements
    let option = document.createElement("Option"); 
        //define new element
    option.text = glazingOptions[i].name; // uses name to populate text
    option.value = i; // sets value as current iteration of i 
        //add element
    glazingOptionsElement.appendChild(option); 
}

//packsize
let packsizeElement = document.querySelector("#packSize");
for (let i = 0; i < packsizeOptions.length; i++ ) {
    let option = document.createElement("Option");
    option.text = packsizeOptions[i].size;
    option.value = i;
    packsizeElement.appendChild(option);
}

//price function
function updatePrice() {

    let defaultPrice = (document.querySelector("#totalPrice > h2").innerHTML =
    rolls[rollType].basePrice);
    
    let totalPrice  = (defaultPrice + glazingPrice) * packPrice; // adds glaze, multiples by packsize
    let priceElement = document.querySelector("#totalPrice > h2"); // targets totalPrice id HTML
    
    priceElement.innerText = totalPrice.toFixed(2); //update result. round to 2 decimals
    //priceElement.innerHTML = "<h2> hello </h2>";

}

//updates options
let glazingPrice = glazingOptions[0].price; //code is invalid without this? TA helped me out with this but i'm still not sure why ;v;
let glazingPriceText = glazingOptions[0].name;
function glazingChange(element) {

    // get value of selected glazing option
    const glazingChange = element.value; //returns value of what is currently selected in the dropdown
    glazingPrice = glazingOptions[glazingChange].price; //price is being returned based on value returned from element.value
    glazingPriceText = glazingOptions[glazingChange].name;
    updatePrice(); // runs function to update price
}

let packPrice = packsizeOptions[0].price;
let packPriceText = packsizeOptions[0].size;
function packChange(element) {

    const packChange = element.value;
    packPrice = packsizeOptions[packChange].price;
    packPriceText = packsizeOptions[packChange].size;


    updatePrice();
} 

// cart 
let cart = []; //empty array

function retrieveFromLocalStorage() {
  const cartArrayString = localStorage.getItem("storedCart");
  const cartArray = JSON.parse(cartArrayString);
  cart = cartArray;
  console.log(cart);
}

if (localStorage.getItem("storedCart") != null) {
  retrieveFromLocalStorage();
}

// assignment format
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice, totalPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.totalPrice = totalPrice;
    }
}

function saveToLocalStorage() {
    const cartArrayString = JSON.stringify(cart);
    localStorage.setItem("storedCart", cartArrayString);
    console.log(cartArrayString);
  }

//function addtocart 
    
function addtoCart() {
    let defaultPrice = rolls[rollType].basePrice;
    basePrice = parseFloat(defaultPrice);

    let totalPrice = (defaultPrice + glazingPrice) * packPrice;
    totalPrice.innerText = "$ " + totalPrice.toFixed(2);

    const newRoll = new Roll(rollType, glazingPriceText, packPriceText, rolls[rollType].basePrice, totalPrice);
    cart.push(newRoll);
    
    saveToLocalStorage();
    
    console.log(cart);
    }