const CHARLIMIT = 12;
let a = 0;
let b = 0;
let operator = "";
let nextNum = false;
let firstOperandSet = false;
let hasDecimal = false;
let sigFigs = 0;
let display = document.querySelector("#display");

function add() {
    return a + b;
}

function subtract() {
    return a - b;
}

function multiply() {
    return a * b;
}

function divide() {
    return a / b;
}

function calculate() {
    b = Number(display.textContent);
    a = operate(operator);
    display.textContent = a;
    nextNum = true;
    hasDecimal = false;
}

function operate(operator) {
    result = 0;
    switch(operator) {
        case "add":
            result = add(a, b);
            break;
        case "subtract":
            result = subtract(a, b);
            break;
        case "multiply":
            result = multiply(a, b);
            break;
        case "divide":
            if (b === 0) return "Error";
            result = divide(a, b);
            break;
        default:
            console.error("Error: Invalid operator");
    }

    // get position of decimal
    let decimal = result.toString().indexOf(".");
    result = parseFloat(result.toFixed(CHARLIMIT - decimal))
    if (result > parseInt("9".repeat(CHARLIMIT))) result = "ERROR";
    return result;
}

function digitOverflow() {
    if (display.textContent.length < CHARLIMIT)
        return false;
    else return true;
}

let buttons = document.querySelector("#buttons");
buttons.addEventListener("click", (e) => {
    // enter new number if value = 0 or operator was just selected, otherwise add digit
    if (e.target.classList.contains("number")) {
        if (display.textContent == 0 && !hasDecimal || nextNum === true || display.textContent === "ERROR") {
            display.textContent = e.target.id;
            nextNum = false;
        }
        else if (!digitOverflow()) display.textContent += e.target.id;
    }
    else if (e.target.id === "decimal" && hasDecimal === false && !digitOverflow()) {
        if (display.textContent == 0 || nextNum === true) {
            display.textContent = 0;
            nextNum = false;
        }
        display.textContent += ".";
        hasDecimal = true;
    }
    else if (e.target.classList.contains("operator")) {

        if (e.target.id === "equals") {
            if (firstOperandSet && !nextNum) {
                calculate();
                firstOperandSet = false;
            }
        }
        else {
            if (!firstOperandSet) {
                a = Number(display.textContent);
                firstOperandSet = true;
                operator = e.target.id;
                nextNum = true;
                hasDecimal = false;
            }
            else if (firstOperandSet) {
                if (!nextNum) { // a value has already been entered for the second operand
                    b = Number(display.textContent);
                    a = operate(operator);
                    display.textContent = a;
                    nextNum = true;
                    hasDecimal = false;
                }
                operator = e.target.id;
            }
        }
    }
    // delete last digit
    else if (e.target.id === "del") {
        delNum = display.textContent.at(-1);
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "") display.textContent = 0;
        // if a has already been set (operator was just selected), delete last digit from a
        if (nextNum === true) a = display.textContent;
        if (delNum === ".") hasDecimal = false;
    }
    // clear all
    else if (e.target.id === "ac") {
        display.textContent = 0;
        a = b = 0;
        operator = "";
        nextNum = false;
        hasDecimal = false;
        firstOperandSet = false;
    }
    // mod buttons (plusMinus or percent)
    else if (e.target.classList.contains("mod")) {
        if (e.target.id === "plusMinus") {
            if (display.textContent.startsWith("-")) {
                display.textContent = display.textContent.slice(1);
            }
            else display.textContent = "-" + display.textContent;
        }
        else if (e.target.id === "percent") {
            // Should calculate b percent of a
            console.log("To be implemented");
        }
    }
})