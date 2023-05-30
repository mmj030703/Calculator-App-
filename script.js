//* Number buttons
const zeroBtn = document.querySelector('.zero_btn');
const oneBtn = document.querySelector('.one_btn');
const twoBtn = document.querySelector('.two_btn');
const threeBtn = document.querySelector('.three_btn');
const fourBtn = document.querySelector('.four_btn');
const fiveBtn = document.querySelector('.five_btn');
const sixBtn = document.querySelector('.six_btn');
const sevenBtn = document.querySelector('.seven_btn');
const eightBtn = document.querySelector('.eight_btn');
const nineBtn = document.querySelector('.nine_btn');
const decimalPointBtn = document.querySelector('.decimal_point_btn'); 
const numberButtons = [zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn, decimalPointBtn];

//* Operation buttons
const percentBtn = document.querySelector('.percent_btn');
const divideBtn = document.querySelector('.divide_btn');
const multiplyBtn = document.querySelector('.multiply_btn');
const minusBtn = document.querySelector('.minus_btn');
const addBtn = document.querySelector('.plus_btn');
const equalsBtn = document.querySelector('.equals_btn');
const operationButtons = [percentBtn, divideBtn, multiplyBtn, minusBtn, addBtn];
const operations = ['%', '/', 'x', '-', '+'];

//* Clear Display Buttons
const clearDisplayBtn = document.querySelector('.clear_display_btn');
const correctBtn = document.querySelector('.correct_btn');

//* Display Button
const calculatorDisplay = document.querySelector('.expression');

let answer = 0;
let expression = '';

const displayExpression = () => {
    if(expression.length > 0) {
        calculatorDisplay.value = expression;
    }
    else {
        calculatorDisplay.value = '0';
    }
};

const displayAnswer = () => {
    calculatorDisplay.value = answer;
};

const addToDisplay = (button) => {
    expression += button.textContent;
    displayExpression();
}

const clearDisplay = () => {
    expression = '';
    answer = '';
    calculatorDisplay.value = 0;
};

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        addToDisplay(button);
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', (eventObj) => {
        //* if there is nothing on display than we avoid putting operators first
        if(expression.length === 0) {
            return;
        }
        const clickedItem = eventObj.target;
        if(clickedItem.matches('.percent_btn')) {
            expression += '%';
        }
        if(clickedItem.matches('.divide_btn')) {
            expression += '/';
        }
        if(clickedItem.matches('.multiply_btn')) {
            expression += 'x';
        }
        if(clickedItem.matches('.minus_btn')) {
            expression += '-';
        }
        if(clickedItem.matches('.plus_btn')) {
            expression += '+';
        }
        //* check that second last value is operator and the last value also then remote second last as we will have the recent operator and to avoid multiple operators on display. 
        if(operations.includes(expression[expression.length-2])) {
            expression = expression.substring(0, expression.length-2) + expression.substring(expression.length-1);
        }
        displayExpression();
    });
});

correctBtn.addEventListener('click', () => {
    if(expression.length > 0) {
        expression = expression.slice(0, expression.length-1);
    }
    displayExpression();
});

clearDisplayBtn.addEventListener('click', clearDisplay);

equalsBtn.addEventListener('click', () => {
    console.log(expression);
    let num1 = '';
    let num2 = '';
    let operator = '';
    let pointCounter = 1;
    let pointIndex = 0;
    let i = 0;
    for(i = 0; i < expression.length; i++) {
        if((expression.charCodeAt(i) < 48 || expression.charCodeAt(i) > 57) && (expression.charCodeAt(i) !== 46)) {
            break;
        }
        if(expression.charCodeAt(i) === 46) {
            pointCounter++;
        }
        num1 += expression[i];
    }
    operator += expression[i];
    pointCounter = 0;
    for(i = i+1; i < expression.length; i++) {
        num2 += expression[i];
        if(pointCounter > 1) {
            break;
        }
        if(expression.charCodeAt(i) === 46) {
            pointCounter++;
        }
    }
    num1 = Number(num1);
    num2 = Number(num2);
    console.log(num1);
    console.log(num2);
    if(operator === '+') {
        answer = Number(num1 + num2).toFixed(3);
    }
    else if(operator === '-') {
        answer = (num1 - num2).toFixed(3);
        console.log('num1 - num2 : ', answer);
    }
    else if(operator === 'x') {
        answer = (num1 * num2).toFixed(3);
    }
    else if(operator === '/') {
        answer = (num1 / num2).toFixed(3);
    }
    else if(operator === '%') {
        answer = num1 % num2;
    }
    displayAnswer();
    //* answer is number and expression is string.
    expression = answer.toString();
    console.log('expression : ', expression);
});
