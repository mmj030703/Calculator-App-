//* Number buttons
const numberButtons = [
        document.querySelector('.double_zero_btn'), 
        document.querySelector('.zero_btn'), 
        document.querySelector('.one_btn'), 
        document.querySelector('.two_btn'), 
        document.querySelector('.three_btn'), 
        document.querySelector('.four_btn'), 
        document.querySelector('.five_btn'),
        document.querySelector('.six_btn'),
        document.querySelector('.seven_btn'),
        document.querySelector('.eight_btn'),
        document.querySelector('.nine_btn'),
        document.querySelector('.decimal_point_btn')
    ];

//* Operation buttons
const operationButtons = [
        document.querySelector('.percent_btn'), 
        document.querySelector('.divide_btn'), 
        document.querySelector('.multiply_btn'), 
        document.querySelector('.minus_btn'), 
        document.querySelector('.plus_btn'),
        document.querySelector('.equals_btn'),
        document.querySelector('.clear_display_btn'),
        document.querySelector('.correct_btn')
    ];
const operations = [
        operationButtons[0].textContent, 
        operationButtons[1].textContent, 
        operationButtons[2].textContent, 
        operationButtons[3].textContent, 
        operationButtons[4].textContent
    ];

//* Display Button
const calculatorDisplay = document.querySelector('.expression');

let answer = 0;
let expression = '';

const displayExpression = () => {
    if(expression.length > 0) {
        calculatorDisplay.value = expression;
    }
    else {
        calculatorDisplay.value = '';
    }
};

const displayAnswer = () => {
    calculatorDisplay.value = answer;
};

//* Adds the number clicked by the user to display.
const addToDisplay = (button) => {
    expression += button.textContent;
    displayExpression();
}

const clearDisplay = () => {
    expression = '';
    answer = '';
    calculatorDisplay.value = '';
};

//* Clears one character from expression
const correct = () => {
    if(expression.length > 0) {
        expression = expression.slice(0, expression.length-1); //* can use substring also
    }
    displayExpression();
}

//* Called when equals button is clicked.
const equals = () => {
    let num1 = '';
    let num2 = '';
    let operator = '';
    let pointCounter = 0;
    let i;

    //* Evaluating num1 from expression
    for(i = 0; i < expression.length; i++) {
        let charCode = expression.charCodeAt(i);
        if((charCode < 48 || charCode > 57) && (charCode !== 46)) {
            break;
        }
        if(charCode === 46) {
            pointCounter++;
        }
        if(pointCounter > 1) {
            alert('Invalid Syntax.');
            return true;
        }
        num1 += expression[i];
    }

    //* Evaluating operator from expression
    operator += expression[i];
    pointCounter = 0;

    //* Evaluating num2 from expression
    for(i = i+1; i < expression.length; i++) {
        let charCode = expression.charCodeAt(i);
        if(charCode === 46) {
            pointCounter++;
        }
        if(pointCounter > 1) {
            alert('Invalid Syntax.');
            return true;
        }
        num2 += expression[i];
    }

    //* Converting num1 & num2 to Number as they were declared as String
    num1 = Number(num1);
    num2 = Number(num2);

    //* Checking which operation is to be performed
    if(operator === operations[4]) {
        answer = formatAnswer(num1 + num2);
    }
    else if(operator === operations[3]) {
        answer = formatAnswer(num1 - num2);
    }
    else if(operator === operations[2]) {
        answer = formatAnswer(num1 * num2);
    }
    else if(operator === operations[1]) {
        if(num2 === 0) {
            alert('Cannot Divide by 0.');
            return true;
        }
        answer = formatAnswer(num1 / num2);
    }
    else if(operator === operations[0]) {
        answer = formatAnswer(num1 % num2);
    }

    displayAnswer();

    //* answer is number and expression is string.
    expression = answer.toString();
};

//* Called when calculating answer
const formatAnswer = (answer) => {
    const newAnswer = answer.toString();
    const pointIndex = newAnswer.indexOf('.');
    //* length of newAnswer after decimal point eg: newAnswer = "123.4453" then newAnswerLength = 4
    const newAnswerLength = newAnswer.substring(pointIndex+1).length;
    //* pointIndex = -1 when there is no point in newAnswer
    if(newAnswerLength <= 3 || pointIndex === -1) {     
        return Number(newAnswer);
    }
    else if(newAnswerLength > 3) {
        return Number(newAnswer).toFixed(3);
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        //* Corner Case
        //* if there is nothing on display than we avoid putting the following characters first
        if(button.textContent === '00' && expression.length === 0) {
            return
        }
        if(button.textContent === '0' && expression.length === 0) {
            return
        }
        if(button.textContent === '.' && expression.length === 0) {
            return
        }
        addToDisplay(button);
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', (eventObj) => {
        let error = false;
        //* Corner Case
        //* if there is nothing on display than we avoid putting operators first
        if(expression.length === 0) {
            return;
        }

        const clickedItem = eventObj.target;
        //* adding the clicked operator to expression
        if(operations.includes(clickedItem.textContent)) {
            expression += clickedItem.textContent;
        }
        if(clickedItem.matches('.equals_btn')) {
            error = equals();
        }
        if(clickedItem.matches('.clear_display_btn')) {
            clearDisplay();
        }
        if(clickedItem.matches('.correct_btn')) {
            correct();
        }

        //* Corner Case
        //* check that second last value is operator and the last value also then remove second last as we will have the recent operator and to avoid multiple operators on display. 
        if(!error && operations.includes(expression[expression.length-2])) {
            expression = expression.substring(0, expression.length-2) + expression.substring(expression.length-1);
        }

        displayExpression();
    });
});