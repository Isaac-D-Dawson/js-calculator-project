//Regular global variables:

const history = [0, 0];

//Object selectors

const calcMain  = document.querySelector(".calculator__main");
const calcIO    = document.querySelector(".calculator__screen");


//Selector callback functions

const mainCallback = (event) => {
    //test code- we'll igrate functions into their own niches when needed:
    event.preventDefault() //prevent page refresh on submbit.

    const target = event.target.elements[0];
    //the submit event barfs out everything it knows:
    // so grab the first element from that list, pray it's the input (We might have to fix it if it's not)...
    //... and call value on it.
    
    console.log(target.value);

    //Logic:
    //On a submit, we want to write the target value to a history buffer
    //Then perform the right operaton on the two most recent history items:
    ///finally push back to "Screen"

    history.push((target.value) /1) // Div by 1 forces int conv.
    
    console.log(history.slice(-2));
    target.value = multiplication(history.slice(-2));

    //Doesn't work, We'll need to refactor.
    //Thinking making history track args+operation instead.
}


const addition = (range) => {
    return range.reduce((num, total) => total += num);
}

const subtraction = (range) => {
    return range.reduce((num, total) => total -= num);
}

const multiplication = (range) => {
    return range.reduce((num, total) => total = total * num)
}

const clearAll = () => {
    history.push(0);
}

//Callback execution:

calcMain.addEventListener("submit", mainCallback);