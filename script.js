let display = '';

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
        case '/' :
            return div(a, b);
    }
}


let currentInputDisplay = document.querySelector('.current-input');

// Display Function
function updateDisplay(buttonInput) {
    if(display.length == 10) {
        console.log('Maximum input length reached.');
        return;
    }

    display += buttonInput;

    currentInputDisplay.textContent = display;
}

// Clear Display Function
function clearDisplay() {
    display = '';

    currentInputDisplay.textContent = display;
}

// Delete-Backspace Function
function backspaceDisplay() {
    display = display.slice(0, -1);

    currentInputDisplay.textContent = display;
}