const currentOperationDisplay = document.getElementById('current-operation');
const previousOperationDisplay = document.getElementById('previous-operation');
const operatorDisplay = document.getElementById('operator');
const numberButtons = document.querySelectorAll('.number-button');
const signButtons = document.querySelectorAll('.sign-button');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');
const pointButton = document.getElementById('point');
const backspaceButton = document.getElementById('backspace');
const changeSignButton = document.getElementById('change-sign')

let operator = null;
let operatorUsed = false;
let operands = [];
let currentOperandIndex = 0;
let str = "0";

numberButtons.forEach((button) => {
    button.addEventListener('click', () => useNumber(button.textContent))
})

signButtons.forEach((button) => {
    button.addEventListener('click', () => handleOperation(button.textContent))
})

equalButton.addEventListener('click', () => useEqual());
clearButton.addEventListener('click', () => clear());
pointButton.addEventListener('click', () => usePoint());
backspaceButton.addEventListener('click', () => useBackspace());

changeSignButton.addEventListener('click', () => {
    if (str.charAt(0) == '-') {
        str = str.substring(1);
    }
    else {
        str = '-' + str;
    }
    updateDisplay('current', str);
})

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case '+':
            handleOperation('+');
            break;

        case '-':
            handleOperation('-');
            break;

        case '*':
            handleOperation('*');
            break;

        case '/':
            handleOperation('/');
            break;

        case '=':
            useEqual();
            
        case 'Enter':
            e.preventDefault();
            useEqual();
            
            break;

        case 'c':
        case 'C':
            clear();
            break;

        case '.':
            usePoint();
            break;

        case 'Backspace':
            useBackspace();
            break;

        default:
            if(parseInt(e.key) >= 0 && parseInt(e.key) <=9){
                useNumber(e.key);
            }
            break;
    }
})

function useNumber(number) {
    if (str.length < 16) {
        if (str == '0') {
            str = number;
        }
        else {
            str = str + number;
        }
        updateDisplay('current', str);
    }
}

function useEqual() {
    operands[currentOperandIndex] = parseFloat(str);
    if (operands[0] === undefined || operands[1] === undefined || !operatorUsed) {
        return;
    }
    operate(operands[0], operands[1], operator);
    updateDisplay('previous', '\u00A0');
    updateDisplay('operator', '\u00A0');
    operatorUsed = false;
}

function clear() {
    updateDisplay('current', 0);
    updateDisplay('previous', '\u00A0');
    updateDisplay('operator', '\u00A0');
    operands = [];
    operator = null;
    operatorUsed = false;
    currentOperandIndex = 0;
    str = "0";
}

function usePoint() {
    if (parseFloat(str) % 1 == 0 && str.slice(-1) != '.') {
        str = str + '.';
        updateDisplay('current', str);
    }
}

function useBackspace() {
    str = str.slice(0, -1);
    if (str == "") {
        str = "0"
        updateDisplay('current', str)
    }
    else {
        updateDisplay('current', str);
    }
}

function handleOperation(op) {
    if (str == '') {
        str = 0;
    }
    operands[currentOperandIndex] = parseFloat(str);
    if (operatorUsed) {
        operate(operands[0], operands[1], operator);
    }
    else {
        operatorUsed = true;
        currentOperandIndex = 1;
    }
    str = "";
    operator = op;
    updateDisplay('previous', operands[0]);
    updateDisplay('operator', operator);
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            operands[0] = a + b;
            break;
        case '-':
            operands[0] = a - b;
            break;
        case '*':
            operands[0] = Math.round(a * b * 100) / 100;;
            break;
        case '/':
            if (b == 0) {
                operands[0] = 'Error';
                break;
            }
            operands[0] = Math.round(a / b * 100) / 100;
            break;
        default:
            operands[0] = 'Error';
    }
    str = operands[0].toString();
    updateDisplay('current', str);
    currentOperandIndex = 1;
}

function updateDisplay(display, text) {
    switch (display) {
        case 'current':
            currentOperationDisplay.textContent = text;
            if (text.length > 13) {
                currentOperationDisplay.style.fontSize = '30px'
            }
            else {
                currentOperationDisplay.style.fontSize = '40px';
            }
            break;
        case 'previous':
            previousOperationDisplay.textContent = text;
            break;
        case 'operator':
            operatorDisplay.textContent = text;
            break;
    }
}