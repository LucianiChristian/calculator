// Event Listeners
const inputButtons = document.querySelectorAll('.main-buttons button');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');

inputButtons.forEach(function (button) {
    button.addEventListener('click', () => inputButtonPress(button.textContent));
});
clearButton.addEventListener('click', clearCalculation);
deleteButton.addEventListener('click', backspaceCalculation);

// Keeps track of the current state of calculator.
const state = ['empty', 'operand-1', 'operator', 'operand-2'];
let currentState = state[0];
let operand1IsDecimal = false;
let operand2IsDecimal = false;

// Defines the list of possible operators.
let operators = ['+', '-', '*', '%'];

// Holds total calculation string. To be later broken up for calculate(a, b, operation).
let calculation = '';

// Modifys calcuator display.
const display = document.querySelector('.calculator-display');
function updateDisplay() {
    display.textContent = calculation;
}

// Handles any INPUT button press. Doesn't include clear or delete buttons.
function inputButtonPress(buttonInput) {
    // Lock Calculation Length To Prevent Display Overflow 
    if (calculation.length >= 13) {
        // = Input --> Allow Evaluation
        if (buttonInput !== '=') {
            return;
        }
    }

    // EMPTY state  
    if (currentState === state[0]) {
        // 0 Input --> Prevent Input
        if(buttonInput == 0) {
            return;
        }
        // Decimal Input --> Set Decimal Flag
        if (buttonInput === '.') {
            operand1IsDecimal = true;
        }

        // Number or Decimal Input --> Allow Input, Change State
        if (buttonInput.match(/[0-9]/) || buttonInput === '.') {
            currentState = state[1];
            calculation += buttonInput;
            updateDisplay();
        }

        test();
    }
    // OPERAND-1 State
    else if (currentState === state[1]) {
        // Handles A '0' As Operand 1 Arrived At From A Previous Calculation
        if (calculation === '0') {
            calculation = buttonInput;
            updateDisplay();
            return;
        }

        // Decimal Input W/ Decimal Flag On --> Prevent Input
        if (buttonInput === '.' && operand1IsDecimal) {
            return;
        }

        // Decimal Input W/ Decimal Flag Off --> Set Decimal Flag
        if (buttonInput === '.') {
            operand1IsDecimal = true;
        }

        // Number or Decimal Input --> Allow Input
        if (buttonInput.match(/[0-9]/) || buttonInput === '.') {
            calculation += buttonInput;
            updateDisplay();
        }

        // Operator Input --> Allow Input, Change State
        if (operators.includes(buttonInput) && calculation !== '.') {
            currentState = state[2];
            calculation += ' ' + buttonInput + ' ';
            updateDisplay();
        }

        test();
    }
    // OPERATOR State 
    else if (currentState === state[2]) {
        // 0 Input --> Prevent Input
        if(buttonInput == 0) {
            return;
        }
        
        // Decimal Input --> Set Decimal Flag
        if (buttonInput === '.') {
            operand2IsDecimal = true;
        }

        // Number or Decimal Input --> Allow Input, Change State
        if (buttonInput.match(/[0-9]/) || buttonInput === '.') {
            currentState = state[3];
            calculation += buttonInput;
            updateDisplay();
        }

        // Operator Input --> Replace Current Operator
        if (operators.includes(buttonInput)) {
            calculation = calculation.replace(/[+\-*%]/, buttonInput);
            updateDisplay();
        }

        test();
    }
    // OPERAND-2 State
    else if (currentState === state[3]) {
        // Decimal Input W/ Decimal Flag On --> Prevent Input
        if (buttonInput === '.' && operand2IsDecimal) {
            return;
        }

        // Decimal Input W/ Decimal Flag Off --> Set Decimal Flag
        if (buttonInput === '.') {
            operand2IsDecimal = true;
        }

        // Number or Decimal Input --> Allow Input
        if (buttonInput.match(/[0-9]/) || buttonInput === '.') {
            calculation += buttonInput;
            updateDisplay();
        }

        // Equals or Operator --> Evaluate Calculation
        if ((buttonInput === '=' || operators.includes(buttonInput)) && calculation[calculation.length - 1] !== '.') {
            // Break String Into Calculation Inputs
            let calculationInputs = calculation.split(' ');
            // Calculate Using The Previously Split Inputs
            calculation = calculate(calculationInputs[0], calculationInputs[1], calculationInputs[2]);
            // Round The Calculation To Two Decimal Places
            calculation = String(roundToTwo(calculation));

            // Handles Division By 0
            if (calculation == Infinity || calculation == -Infinity || isNaN(calculation)) {
                clearCalculation();
                display.textContent = 'Only at moments of great serenity is it possible to find the pure, the informationless state of signal zero.';
                return;
            }
                 
            // Set/Reset Operand1 Decimal Flag
            if(!Number.isInteger(Number(calculation))) {
                operand1IsDecimal = true;
            }
            else {
                operand1IsDecimal = false;
            }
            
            // Reset Operand2 Decimal Flag
            operand2IsDecimal = false;

            // Equals --> Go To State 1
            if (buttonInput === '=') {
                currentState = state[1];
            }
            // Operator --> Go To State 2, Append Operator
            else if (operators.includes(buttonInput)) {
                currentState = state[2];
                calculation += ' ' + buttonInput + ' ';
            }

            updateDisplay();
        }
        test();
    }

}

// Handles CLEAR and DELETE button presses.
function clearCalculation() {
    // Clears All Data
    calculation = '';
    operand1IsDecimal = false;
    operand2IsDecimal = false;

    currentState = state[0];

    updateDisplay();

    test();
}
function backspaceCalculation() {
    // Performs A Clear Calculation If Only One Character
    if (calculation.length <= 1) {
        clearCalculation();
    }
    // Performs A Normal Backspace If Multiple Characters
    else {
        // Store Last Character Of String For Later Testing
        let removedCharacter = calculation[calculation.length - 1];

        // Remove The Last Character And Store New Calculation
        calculation = calculation.slice(0, calculation.length - 1);

        // Resets Decimal Flag If A Decimal Is Removed
        if (removedCharacter === '.') {
            if (currentState === state[3]) {
                operand2IsDecimal = false;
            }
            else if (currentState === state[1]) {
                operand1IsDecimal = false;
            }
        }

        // Removes 0 To The Left Of A Removed Decimal Point
        if (removedCharacter === '.' && calculation[calculation.length - 1] === '0') {
            calculation = calculation.slice(0, calculation.length - 1);
        }

        // Handles Backwards Transition From OperandB to Operator 
        if (currentState === state[3] && calculation[calculation.length - 1] === ' ') {
            currentState = state[2];
        }

        // Handles Removal Of Space-Enclosed Operator
        if (removedCharacter === ' ') {
            calculation = calculation.slice(0, -2);
            // Handles Backwards Transition From Operator To OperandA
            if (currentState === state[2]) {
                currentState = state[1];
            }
        }

        updateDisplay();
    }
 
    test();
}

// Calculation functions.
function calculate(a, operation, b) {
    a = Number(a);
    b = Number(b);


    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case '*':
            return mul(a, b);
        case '%':
            return div(a, b);
    }
}
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

// Rounding function for decimals.
function roundToTwo(number) {
    return +(Math.round(number + "e+2") + "e-2");
}

// Provides testing information in the console.
function test() {
    console.log('Current State : ' + currentState);
    console.log('Current Calculation : ' + calculation);
    console.log('Operand 1 Decimal? ' + operand1IsDecimal);
    console.log('Operand 2 Decimal? ' + operand2IsDecimal);
}