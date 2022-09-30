//Regular global variables:



//Object selectors

const calcMain      = document.querySelector(".calculator__main");
const calcIO        = document.querySelector(".calculator__screen");

const calcButtons   = document.querySelectorAll(".calculator__button"); //All calc buttons for quick-disable.
const calcAdd       = document.querySelector(".calculator__button--add");
const calcSub       = document.querySelector(".calculator__button--sub");
const calcMul       = document.querySelector(".calculator__button--mul");
const calcDiv       = document.querySelector(".calculator__button--div");
const calcEql       = document.querySelector(".calculator__button--eql");
const calcClr       = document.querySelector(".calculator__button--clr");

//Selector callback functions

const addition = (range) => {
    return range.reduce((total, num) => total += num);
}

const subtraction = (range) => {
    return range.reduce((total, num) => total -= num);
}

const multiplication = (range) => {
    return range.reduce((total, num) => total = total * num)
}

const division = (range) => {
    return range.reduce((num, divisor) => num = num / divisor)
}

// const equal = () => { 
//     targetScreen = history.slice(-1)[0].result;
// }

const clearCurrent = () => {
    console.log("Clear called:")
    history.push({
                values  : [0, 0],
            operator    : addition,
            result      : 0
        }
    );
    console.log(history);
    currentOperator = addition;
    calcIO.value    = 0;
}


//History buffer contains the last two used values(in order), the operator invoked on them, and the result of the operation.

const history = [
    {
        values      : [0, 0],
        operator    : addition,
        result      : 0
    }
];


let currentOperator = addition //Default setting.


const mainCallback = (event) => {
    //test code- we'll igrate functions into their own niches when needed:
    event.preventDefault() //prevent page refresh on submbit.

    const targetScreen = event.target.elements[0];
    //the submit event barfs out everything it knows:
    // so grab the first element from that list, pray it's the input (We might have to fix it if it's not)...
    //... and call value on it.
    
    console.log(targetScreen.value);  //Later will be dtermined by form data.

    //Logic:
    //On a submit, we want to write the target value to a history buffer
    //Then perform the right operaton on the two most recent history items:
    ///finally push back to "Screen"

    history.push({
        values      : [history.slice(-1)[0].result, targetScreen.value/1],    //pushes current value and last result into history stack (Div by 1 to force to int).
        operator    : currentOperator,
        result      : currentOperator([history.slice(-1)[0].result, targetScreen.value/1])
    })

    console.log(history);

    // IDEAS:
    //-history uses callbackfunctions to determine how it displays.
    //Two input boxes, the second of which gets the output.

    targetScreen.value = history.slice(-1)[0].result ?? 0;   
}

//Create callback that sets all buttons to inactive, and target state to active:
const setButtonActive = (event) => {
    calcButtons.forEach((button) => {
        button.classList.remove("active");
    })
    event.target.classList.add("active");
    //Add in functionality to set operator from this
    // console.log(`current operator is ${currentOperator}`);
    event.target.classList.forEach((itemClass) => {
        const validOperators = {"add" : addition,
                                "sub" : subtraction,
                                "mul" : multiplication,
                                "div" : division
                                // "eql" : equal,   //disabled as it's just a submit.
                                // "clr" : clearCurrent
        }
        currentOperator = (validOperators[itemClass.substring(20)] ?? currentOperator );
    })//console.log(itemClass.substring(20)));
    // console.log(`new operator is ${currentOperator}`);
}


//Callback execution:

calcMain.addEventListener("submit", mainCallback);
calcClr.addEventListener("click", clearCurrent);
calcButtons.forEach((button) => {
    button.addEventListener("click", setButtonActive);
});