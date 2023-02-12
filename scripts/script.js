const output = document.querySelector("#output");
const buttons = document.querySelectorAll("button");
const calcHistory = document.querySelector("#calcHistory");
let operator = "";
let firstNum = "";
let secondNum = "";

let add = (a, b) => {
  return parseFloat(a) + parseFloat(b);
};

let subtract = (a, b) => {
  return parseFloat(a) - parseFloat(b);
};

let multiply = (a, b) => {
  return parseFloat(a) * parseFloat(b);
};

let divide = (a, b) => {
  if (parseFloat(b) === 0) {
    return "Just don't";
  } else {
    return parseFloat(a) / parseFloat(b);
  }
};

let calculate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
    case "^":
      return Math.pow(parseFloat(num1), parseFloat(num2));
      break;
  }
};

let errorCheck = () => {
  if (
    output.innerHTML.includes("Infinity") ||
    output.innerHTML.includes("nan") ||
    output.innerHTML.includes("undefined")
  ) {
    output.innerHTML = "Ask your mother";
  }
};

let firstNumOperators = (input) => {
  if (input === "." && firstNum.includes(".")) {
    return;
  }
  if (input === "+/-" && output.innerHTML === "") {
    return;
  }
  if (input === "+/-") {
    firstNum = -parseFloat(firstNum);
    output.innerHTML = firstNum;
    return;
  }
  if (input === "%" && output.innerHTML === "") {
    return;
  }
  if (input === "%") {
    firstNum = parseFloat(firstNum) / 100;
    output.innerHTML = firstNum;
    return;
  }
  firstNum += input;
  output.innerHTML += input;
};

let secondNumOperators = (input) => {
  if (secondNum === "" && output.innerHTML !== "") {
    output.innerHTML = "";
  }
  if (input === "." && secondNum.includes(".")) {
    return;
  }
  if (input === "+/-" && output.innerHTML === "") {
    return;
  }
  if (input === "+/-") {
    secondNum = -parseFloat(secondNum);
    output.innerHTML = secondNum;
    return;
  }
  if (input === "%" && output.innerHTML === "") {
    return;
  }
  if (input === "%") {
    secondNum = parseFloat(secondNum) / 100;
    output.innerHTML = secondNum;
    return;
  }
  secondNum += input;
  output.innerHTML += input;
};

let clearAll = () => {
  output.innerHTML = "";
  firstNum = "";
  operator = "";
  secondNum = "";
  calcHistory.innerHTML = "";
};

buttons.forEach((button) => {
  let red = Math.floor(Math.random() * 200 + 56);
  let green = Math.floor(Math.random() * 200 + 56);
  let blue = Math.floor(Math.random() * 200 + 56);
  button.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  button.addEventListener("click", () => {
    if (button.innerHTML === "C") {
      clearAll();
    }
    if (
      Number.isInteger(parseFloat(button.innerHTML)) ||
      button.innerHTML === "." ||
      button.innerHTML === "+/-" ||
      button.innerHTML === "%"
    ) {
      if (operator === "") {
        firstNumOperators(button.innerHTML);
      } else if (firstNum !== "" && operator !== "") {
        secondNumOperators(button.innerHTML);
      }
    } else if (
      !Number.isInteger(parseFloat(button.innerHTML)) &&
      button.innerHTML !== "=" &&
      operator === ""
    ) {
      operator = button.innerHTML;
      output.innerHTML = "";
    }
  });
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  if (secondNum === "") {
    output.innerHTML = firstNum;
    calcHistory.innerHTML = `${firstNum}`;
  } else {
    output.innerHTML = calculate(
      operator,
      parseFloat(firstNum),
      parseFloat(secondNum)
    );
    calcHistory.innerHTML = `${firstNum} ${operator} ${secondNum} =`;
    firstNum = calculate(operator, parseFloat(firstNum), parseFloat(secondNum));
    secondNum = "";
  }
  errorCheck();
});

const operations = document.querySelectorAll(".operator");
operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (firstNum !== "" && secondNum !== "") {
      output.innerHTML = `${calculate(
        operator,
        parseFloat(firstNum),
        parseFloat(secondNum)
      )}`;

      calcHistory.innerHTML = `${firstNum} ${operator} ${secondNum} =`;
      firstNum = calculate(
        operator,
        parseFloat(firstNum),
        parseFloat(secondNum)
      );
      secondNum = "";
      operator = operation.innerHTML;
    }
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  clearAll();
});
