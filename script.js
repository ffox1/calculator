const currentOperationDisplay = document.getElementById('current-operation');
const previousOperationDisplay = document.getElementById('previous-operation');
const operatorDisplay = document.getElementById('operator');
const numberButtons = document.querySelectorAll('.number-button');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');
const pointButton = document.getElementById('point');
const backspaceButton = document.getElementById('backspace');
const changeSignButton = document.getElementById('change-sign')

let operator = null;
let operatorUsed = false;
let pointUsed = false;
let operands = [0, 0];
let currentOperandIndex = 0;

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operatorUsed) {
            currentOperandIndex = 1;
        }

        if (pointUsed === true) {
            operands[currentOperandIndex] = null;
        }
        else {
            operands[currentOperandIndex] = operands[currentOperandIndex] * 10 + parseFloat(button.textContent);
        }
        updateDisplay('current', operands[currentOperandIndex]);
    })
})

addButton.addEventListener('click', () => {
    handleOperation('+');
})

subtractButton.addEventListener('click', () => {
    handleOperation('-');
})

multiplyButton.addEventListener('click', () => {
    handleOperation('*');
})

divideButton.addEventListener('click', () => {
    handleOperation('/');
})

equalButton.addEventListener('click', () => {
    if (operands[0] === undefined || operands[1] === undefined) {
        return;
    }
    operate(operands[0], operands[1], operator);
    updateDisplay('previous', 0);
    operatorUsed = false;
    pointUsed = false;
})

clearButton.addEventListener('click', () => {
    updateDisplay('current', 0);
    updateDisplay('previous', 0);
    operands = [0, 0];
    operator = null;
    operatorUsed = false;
    currentOperandIndex = 0;
    pointUsed = false;
})

pointButton.addEventListener('click', () => {
    if (pointUsed === false) {
        pointUsed = true;
    }
})

backspaceButton.addEventListener('click', () => {
    // TO FIX
    operands[currentOperandIndex] = Math.floor(operands[currentOperandIndex] / 10);
    updateDisplay('current', operands[currentOperandIndex]);
})

changeSignButton.addEventListener('click', () => {
    operands[currentOperandIndex] = -operands[currentOperandIndex];
    updateDisplay('current', operands[currentOperandIndex]);
})

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
    updateDisplay('current', operands[0]);
    currentOperandIndex = 0;
}

function updateDisplay(display, text) {
    switch (display) {
        case 'current':
            currentOperationDisplay.textContent = text;
            break;
        case 'previous':
            previousOperationDisplay.textContent = text;
            break;
        case 'operator':
            operatorDisplay.textContent = text;
            break;
    }
}

function handleOperation(op) {
    if (operatorUsed) {
        operate(operands[0], operands[1], operator);
    }
    else {
        operatorUsed = true;
    }
    operator = op;
    updateDisplay('current', 0);
    updateDisplay('previous', operands[0]);
    updateDisplay('operator', operator);
    pointUsed = false;
    operands[1] = 0;
}