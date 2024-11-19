function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Division by 0!");
  return a / b;
}

function operate(operator, numberOne, numberTwo) {
  switch (operate) {
    case "+":
      return add(numberOne, numberTwo);

    case "-":
      return subtract(numberOne, numberTwo);

    case "*":
      return multiply(numberOne, numberTwo);

    case "/":
      return divide(numberOne, numberTwo);

    default:
      throw new Error("Invalid operation!");
  }
}

let num1 = null;
let num2 = null;
let operator = null;
