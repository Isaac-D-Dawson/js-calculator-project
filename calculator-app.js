//Object selectors

const calcMain  = document.querySelector(".calculator__main");
const calcIO    = document.querySelector(".calculator__screen");


//Selector callback functions

const mainCallback = (event) => {
    //test code:
    event.preventDefault()
    console.log(event.target.elements[0].value);    //the submit event barfs out everything it knows:
    // so grab the first element from that list, pray it's the input (We might have to fix it if it's not)...
    //... and call value on it.
}


//Callback execution:

calcMain.addEventListener("submit", mainCallback);