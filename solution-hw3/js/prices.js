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

    const defaultPrice = 2.49; 
    
    let totalPrice  = (defaultPrice + glazingPrice) * packPrice; // adds glaze, multiples by packsize
    let priceElement = document.querySelector("#totalPrice > h2"); // targets totalPrice id HTML
    
    priceElement.innerText = "$"+ totalPrice.toFixed(2); //update result. round to 2 decimals
    //priceElement.innerHTML = "<h2> hello </h2>";
    //var temp = "$ "+ totalPrice.toFixed(2); 

}

//updates options
let glazingPrice = glazingOptions[0].price; //code is invalid without this? TA helped me out with this but i'm still not sure why ;v;
function glazingChange(element) {

    // get value of selected glazing option
    const glazingChange = element.value; //returns value of what is currently selected in the dropdown
    glazingPrice = glazingOptions[glazingChange].price; //price is being returned based on value returned from element.value
    
    updatePrice(); // runs function to update price
}

let packPrice = packsizeOptions[0].price;
function packChange(element) {

    const packChange = element.value;
    packPrice = packsizeOptions[packChange].price;

    updatePrice();
} 