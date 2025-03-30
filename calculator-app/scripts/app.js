document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const history = document.getElementById('history'); // New history element
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.innerText;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.innerText = '0';
                history.innerText = ''; // Clear history
            } else if (value === '=') {
                if (firstOperand !== null && operator) {
                    currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
                    display.innerText = currentInput;
                    history.innerText = ''; // Clear history after showing result
                    operator = '';
                    firstOperand = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    history.innerText = `${currentInput} ${operator}`; // Update history
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function calculate(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }
});