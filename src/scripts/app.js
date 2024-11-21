import { parseToPostFix, calculatePostfix } from "./parseMathExpression.js";

let input = "0";

const calcDisplay = document.querySelector(".calculator-display span");

const calcItems = document.querySelectorAll(".calc-item");

const nonNumberValues = [
  "AC",
  "*",
  "/",
  "+",
  "-",
  "+/-",
  "%",
  "=",
  ".",
  "(",
  ")",
  "!",
];
const operators = ["*", "/", "+", "-", "%"];

function findNearestOperator(input) {
  for (let i = input.length - 1; i >= 0; i--) {
    if (operators.includes(input[i]) && input[i - 1] !== "(") {
      return i;
    }
  }
  return -1;
}

function changeSignOfValue() {
  const operatorIndex = findNearestOperator(input);
  const numberValue = input.slice(operatorIndex + 1);

  if (numberValue.startsWith("(")) {
    // Remove the parentheses and the negative sign
    input = input.slice(0, operatorIndex + 1) + numberValue.slice(2, -1);
  } else {
    // Add the negative sign with parentheses
    input = input.slice(0, operatorIndex + 1) + `(-${numberValue})`;
  }
  return input;
}

const ac = document.querySelector("#ac");

calcItems.forEach((item) => {
  let content = item.textContent.trim();

  if (content !== "AC" && content !== "=" && content !== "+/-") {
    item.addEventListener("click", () => {
      // Add 0 if first given input is operator
      if (
        input === "0" &&
        nonNumberValues.includes(content) &&
        content != "-"
      ) {
        input = "0";
      } else if (input === "0") {
        input = "";
      }

      // Add 0 if value before '.' is operator
      if (
        content === "." &&
        operators.includes(input.at(-1) || input.at(-1) === "0")
      ) {
        input += "0";
      }

      // Prevent adding another dot if input already ends with a dot
      if (content === "." && input.endsWith(".")) {
        return;
      }

      //Change operator if previous value is operator
      if (operators.includes(content) && operators.includes(input.at(-1))) {
        input = input.slice(0, -1);
      }

      input += content;

      calcDisplay.textContent = input;
    });
  }
});

const signBtn = document.querySelector("#sign");

signBtn.addEventListener("click", () => {
  input = operators.includes(input.at(-1)) ? input : changeSignOfValue();
  calcDisplay.textContent = input;
});

const equalsBtn = document.querySelector("#equals");
equalsBtn.addEventListener("click", () => {
  if (nonNumberValues.includes(input.at(-1)) && input.at(-1) !== ")") return;
  else {
    let result = 0;
    try {
      const parsedInput = parseToPostFix(input);
      result = calculatePostfix(parsedInput);
      calcDisplay.textContent = result;
      input = "" + result;
    } catch (error) {
      calcDisplay.textContent = "Error";
      input = "0";
      setTimeout(() => {
        calcDisplay.textContent = input;
      }, 2000); // Clear error message after 2 seconds
    }
  }
});

ac.addEventListener("click", () => {
  input = "0";
  calcDisplay.textContent = input;
});
