const numBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operation');
const btnAC = document.querySelector('.all-clear');
const btnDelete = document.querySelector('.delete');
const btnEqual = document.querySelector('.equal');
const display = document.querySelector('.display');

let currentOperand = "";
let previouseOperand = "";
let result = null;
let operator = "";

const allClear = () => {
    currentOperand = "";
    previouseOperand = "";
    operator = "";
    result = null;
}

const del = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
}

const appendNumber = (num) => {
    if (num === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + num.toString();
    if (result) {
        currentOperand = num;
        return result = ''
    }
}

const calculation = (curr, prev, oper) => {
    const current = parseFloat(curr);
    const previous = parseFloat(prev);

    if (isNaN(previous) || isNaN(current)) return;

    switch (oper) {
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "×":
            result = previous * current;
            break;
        case "÷":
            if (current === 0) {
                result = "Not allowed";
                break
            } else {
                result = previous / current;
                break;
            }
        default:
            return;
    }
    currentOperand = result;
    operator = '';
    previousOperand = '';
}

const operation = (op) => {
    if (currentOperand === '') return;
    if (previouseOperand !== '') {
        calculation(currentOperand, previouseOperand, operator)
    }
    operator = op;
    previouseOperand = currentOperand;
    currentOperand = '';
}

const updateDisplay = () => {
    if(operator != '') {
        display.innerText = previouseOperand + operator + currentOperand;
    } else {
        display.innerText = currentOperand;
    }
    
}

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        appendNumber(btn.innerText);
        updateDisplay();
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        operation(btn.innerText);
        updateDisplay();
    });
});

btnEqual.addEventListener('click', () => {
    calculation(currentOperand, previouseOperand, operator);
    updateDisplay();
});

btnDelete.addEventListener('click', () => {
    del();
    updateDisplay();
});

btnAC.addEventListener('click', () => {
    allClear();
    updateDisplay();
})