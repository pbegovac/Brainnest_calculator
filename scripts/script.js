function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Error: Cannot divide by zero";
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return "Error: Invalid operator";
  }
}

let displayValue = "";
let firstNum = null;
let operator = null;
let decimalIncluded = false;

function handleNumberClick(e) {
  const num = e.target.innerText;
  displayValue += num;
  updateDisplay();
}

function handleOperatorClick(e) {
  operator = e.target.innerText;
  firstNum = parseFloat(displayValue);
  displayValue = "";
  updateDisplay();
}

function handleEqualClick() {
  if (!firstNum || !operator || !displayValue) {
    displayValue = "Error: Missing values";
  } else {
    const secondNum = parseFloat(displayValue);
    displayValue = operate(operator, firstNum, secondNum);
    firstNum = null;
    operator = null;
  }
  updateDisplay();
}

function handleClearClick() {
  displayValue = "";
  firstNum = null;
  operator = null;
  decimalIncluded = false;
  updateDisplay();
}

function handleDecimalClick() {
  if (!decimalIncluded) {
    displayValue += ".";
    decimalIncluded = true;
    updateDisplay();
  }
}

function updateDisplay() {
  const display = document.querySelector(".display");
  display.innerText = displayValue;
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", handleEqualClick);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", handleClearClick);

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", handleDecimalClick);
