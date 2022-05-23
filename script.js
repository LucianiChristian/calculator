// Used to keep track of the current state of calculator
const state = ['empty', 'operand-1', 'operator', 'operand-2'];
let currentState = state[0];
let operand1IsDecimal = false;
let operand2IsDecimal = false;

// Defines the list of possible operators
let operators = ['+', '-', '*', '%'];

// Used for calculation(a, b, operation)
let calculation = '';

// Used to modify calcuator display
const display = document.querySelector('.calculator-display');
function updateDisplay() {
    display.textContent = calculation;
}

// Handles any INPUT button press. Doesn't include clear or delete buttons.
function inputButtonPress(buttonInput) {
    // EMPTY state
    if(currentState === state[0]) {
        if(buttonInput === '.') {
            operand1IsDecimal = true;
        }

		if(typeof buttonInput === 'number' || buttonInput === '.') {
            currentState = state[1];
            calculation += buttonInput;
            updateDisplay();
		}
        
        test();
	}
    // OPERAND-1 State
    else if(currentState === state[1]) {
        // prevents 2 decimals
        if(buttonInput === '.' && operand1IsDecimal) {
            return;
        }
        
        if(buttonInput === '.') {
            operand1IsDecimal = true;
        }

        if(typeof buttonInput === 'number' || buttonInput === '.') {
            calculation += buttonInput;
            updateDisplay();
		}

        if(operators.includes(buttonInput)) {
            currentState = state[2];
            calculation += ' ' + buttonInput + ' ';
            updateDisplay();
        }

        test();
    }
    // OPERATOR State 
    else if(currentState === state[2]) {
        if(buttonInput === '.') {
            operand2IsDecimal = true;
        }

        if(typeof buttonInput === 'number' || buttonInput === '.') {
            currentState = state[3];
            calculation += buttonInput;
            updateDisplay();
		}

        if(operators.includes(buttonInput)) {
            calculation = calculation.replace(/[+\-*%]/, buttonInput);
            updateDisplay();
        }

        test();
    }
    // OPERAND-2 State
    else if(currentState === state[3]) {
        // prevents 2 decimals
        if(buttonInput === '.' && operand2IsDecimal) {
            return;
        }

        if(buttonInput === '.') {
            operand2IsDecimal = true;
        }

        if(typeof buttonInput === 'number' || buttonInput === '.') {
            calculation += buttonInput;
            updateDisplay();
		}

        
        if(buttonInput === '=' || operators.includes(buttonInput)) {
            // break string
            let calculationInputs = calculation.split(' ');
            // calculate
            calculation = String(calculate(calculationInputs[0], calculationInputs[1], calculationInputs[2]));
            
            // Handles division by 0
            if(calculation == Infinity || calculation == -Infinity) {
                clearCalculation();
                display.textContent = 'Only at moments of great serenity is it possible to find the pure, the informationless state of signal zero.';
                return;
            }

            if(buttonInput === '=') {
                // go to state[1]
                currentState = state[1];
                updateDisplay();
            }
            else if(operators.includes(buttonInput)) {
                // go to state[2]
                currentState = state[2];
                // add operator to calculation
                calculation += ' ' + buttonInput + ' ';
                updateDisplay();
            }
            
            operand2IsDecimal = false;

            if(!Number.isInteger(Number(calculation))) {
                operand1IsDecimal = true;
            }
        }

        test();
    } 

}

// Handles CLEAR and DELETE button presses.
function clearCalculation() {
    calculation = '';

    currentState = state[0];

    operand1IsDecimal = false;
    operand2IsDecimal = false;

    updateDisplay();

    test();
}
function backspaceCalculation() {
    if(calculation.length <= 1) {
        calculation = '';
        operand1IsDecimal = false;
        currentState = state[0];
    }
    else {
        // store last character of string
        let removedCharacter = calculation[calculation.length - 1];

        // remove it, returning new string
        calculation = calculation.slice(0, calculation.length - 1);

        if(removedCharacter === '.') {
            if(currentState === state[3]) {
                operand2IsDecimal = false;
            }
            else if(currentState === state[1]) {
                operand1IsDecimal = false;
            }
        }    

        if(removedCharacter === ' ') {
            calculation = calculation.slice(0, -2);

            if(currentState === state[3]) {
                currentState = state[2];
            }
            else if(currentState === state[2]) {
                currentState = state[1];
            }
        }
    }

    updateDisplay();

    test();
}

// Provides testing information in the console.
function test() {
    console.log('Current State : ' + currentState);
    console.log('Current Calculation : ' + calculation);

    if(currentState === state[1]) {
        console.log('Decimal? ' + operand1IsDecimal);
    }
    if(currentState === state[3]) {
        console.log('Decimal? ' + operand2IsDecimal);
    }
}


// Calculation Function
function calculate(a, operation, b) {
    a = Number(a);
    b = Number(b);


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