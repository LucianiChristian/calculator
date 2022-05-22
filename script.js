// Used to keep track of the current state of calculator
const state = ['empty', 'operand-1', 'operator', 'operand-2'];
let currentState = state[0];
let operand1IsDecimal = false;
let operand2IsDecimal = false;
let operators = ['+', '-', '*', '%'];

// Used for calculation(a, b, operation)
let operand1 = '';
let operand2 = '';
let operator = '';

// Handles any INPUT button press. Doesn't include clear or delete buttons.
function inputButtonPress(buttonInput) {
    // EMPTY state
    if(currentState === state[0]) {
        if(buttonInput === '.') {
            operand1IsDecimal = true;
        }

		if(typeof buttonInput === 'number' || buttonInput === '.') {
            currentState = state[1];
            operand1 += buttonInput;
		}

        console.log('Current state : ' + currentState);
        console.log('Decimal Present? ' + operand1IsDecimal);

		return;
	}

    // OPERAND-1 State
    if(currentState === state[1]) {
        // prevents 2 decimals
        if(buttonInput === '.' && operand1IsDecimal) {
            return;
        }
        else if(buttonInput === '.') {
            operand1IsDecimal = true;
        }

        if(typeof buttonInput === 'number' || buttonInput === '.') {
            operand1 += buttonInput;
		}

        if(operators.includes(buttonInput)) {
            currentState = state[2];
            operator = buttonInput;
        }

        console.log("Operand 1 : " + operand1);
        console.log("Operator : " + operator);
    }
}

// Operator Functions
function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}

// Calculation Function
function calculation(a, b, operation) {
    switch (operation) {
        case '+' :
            return add(a, b);
        case '-' :
            return sub(a, b);
        case '*' :
            return mul(a, b);
        case '%' :
            return div(a, b);
    }
}





























































































/*
let display = '';
let calculationDisplay = '';
let operatorCount = 0;
let operandCount = 0;


let currentInputDisplay = document.querySelector('.current-input');
let currentCalculationDisplay = document.querySelector('.calculation');
let operators = [' + ', ' - ', ' * ', ' % ', ' = '];

// Display Function
function updateDisplay(buttonInput) {
    if(display.length == 10) {
        console.log('Maximum input length reached.');
        return;
    }

    // Handles operations and equals/evaluation
    if(operators.includes(buttonInput)) {
        calculationDisplay += display + buttonInput;
        currentCalculationDisplay.textContent = calculationDisplay;

        if(buttonInput === ' = ' || operatorCount === 1) {
            display = calculateResult(calculationDisplay);
            currentInputDisplay.textContent = display;
            clearCalculation();
            operatorCount = 0;
            
            if(buttonInput !== ' = ') {
                calculationDisplay += display + buttonInput;
                currentCalculationDisplay.textContent = calculationDisplay;
                clearInput();
            }
            return;
        }

        operatorCount++;
        clearInput();

        return;
    }

    // Handles operands
    display += buttonInput;
    currentInputDisplay.textContent = display;
}


function clearDisplay() {
    clearInput();
    clearCalculation();
}
function clearInput() {
    display = '';
    currentInputDisplay.textContent = display;
}
function clearCalculation() {
    calculationDisplay = '';
    currentCalculationDisplay.textContent = calculationDisplay;
}

function backspaceDisplay() {
    display = display.slice(0, -1);

    currentInputDisplay.textContent = display;
}

function calculateResult(calculationDisplay) {
    let calculationInputs = calculationDisplay.split(' ');

    calculationInputs[0] = Number(calculationInputs[0]);
    calculationInputs[2] = Number(calculationInputs[2]);

    return calculation(calculationInputs[0], calculationInputs[2], calculationInputs[1]);
}
*/