//light mode to dark mode switch


//dark to light
const lightbutton = document.getElementById("lightbutton");

lightbutton.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = "rgb(228, 228, 228)"; //background
  document.body.style.color = "black"; //basic body copy 

  //background video
  document.getElementById("bgvid").src = "./assets/bg/light_bg.mp4";

  //buttons
  document.getElementById("darkbutton").style.color = "gray";
  document.getElementById("lightbutton").style.color = "rgb(200, 233, 0)";

  document.getElementById("darkbutton").style.backgroundColor = "black";
  document.getElementById("lightbutton").style.backgroundColor = "black";

  //about text
  document.getElementById("about").style.color = "black";

  //details
  document.getElementById("white-text").style.color = "black"; //title alt color
  document.getElementById("hover-underline-animation").style.color = "rgb(0, 125, 13)"; //subtitle color

  //downbtn hover
  document.getElementById("downbtn").style.color = "black";
});




//////////////

//light to dark
const darkbutton = document.getElementById("darkbutton");

darkbutton.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = "rgb(22, 22, 22)"; //background
  document.body.style.color = "rgb(200, 233, 0)"; //basic body copy
  document.getElementById("white-text").style.color = "white";  

  //background video
  document.getElementById("bgvid").src = "./assets/bg/dark_bg.mp4";
  
  //buttons
  document.getElementById("darkbutton").style.color = "rgb(200, 233, 0)";
  document.getElementById("lightbutton").style.color = "gray";

  //about text
  document.getElementById("about").style.color = "gray";

  document.getElementById("darkbutton").style.backgroundColor = "black";
  document.getElementById("lightbutton").style.backgroundColor = "black";
  document.getElementById("downbtn").style.color = "white";
  
  //details
  document.getElementsById("hover-underline-animation").style.color = "rgb(200, 233, 0)"; // subtitle color
});


// sticky nav

window.onscroll = function() {myFunction()};
let navbar = document.getElementById("header");

let sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

