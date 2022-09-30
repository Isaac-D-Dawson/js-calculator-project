//Regular global variables:


//Object selectors

const calcMain  = document.querySelector(".calculator__main");
const calcIO    = document.querySelector(".calculator__screen");


//Selector callback functions

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

//History buffer contains the last two used values(in order), the operator invoked on them, and the result of the operation.

const history = [
    {
        values      : [0, 0],
        operator    : addition,
        result      : 0
    }
];


const mainCallback = (event) => {
    //test code- we'll igrate functions into their own niches when needed:
    event.preventDefault() //prevent page refresh on submbit.

    const targetScreen = event.target.elements[0];
    //the submit event barfs out everything it knows:
    // so grab the first element from that list, pray it's the input (We might have to fix it if it's not)...
    //... and call value on it.
    
    console.log(targetScreen.value);


    currentOperator = addition  //Later will be dtermined by form data.

    //Logic:
    //On a submit, we want to write the target value to a history buffer
    //Then perform the right operaton on the two most recent history items:
    ///finally push back to "Screen"

    history.push({
        values      : [history.slice(-1)[0].result, targetScreen.value/1],    //puses current value and last result into history stack (Div by 1 to force to int).
        operator    : currentOperator,
        result      : currentOperator([history.slice(-1)[0].result, targetScreen.value/1])
    })

    console.log(history);

    //Doesn't work, We'll need to refactor.
    //Thinking making history track args+operation instead.

    // IDEAS:
    //-history uses callbackfunctions to determine how it displays.
    //Two input boxes, the second of which gets the output.
}

//Callback execution:

calcMain.addEventListener("submit", mainCallback);