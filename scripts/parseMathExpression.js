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

const operatorPrecedence = {
  "(": 3,
  ")": 3,
  "*": 2,
  "/": 2,
  "%": 2,
  "+": 1,
  "-": 1,
};

const nonNumberValues = ["+", "-", "*", "/", "(", ")", "!", "%"];

function parseToPostFix(input) {
  input = parseToUnary(input);
  const stack = [];
  const arrResult = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (!nonNumberValues.includes(char)) {
      let numberValue = char;

      let j = i + 1;
      while (!nonNumberValues.includes(input[j]) && j < input.length) {
        numberValue += input[j];
        j++;
      }

      arrResult.push(Number(numberValue));

      i = j - 1;
    } else {
      // Check for unary operator
      if ((i === 0 && char === "!") || (char === "(" && input[i + 1] === "!")) {
        let j = i + 1;

        for (j; j < input.length; j++) {
          if (input[j] !== "!" && nonNumberValues.includes(input[j])) break;
        }

        let number;
        if (char === "(") {
          number = Number("-" + input.slice(i + 2, j));
          i = j;
        } else {
          number = Number("-" + input.slice(i + 1, j));
          i = j - 1;
        }

        arrResult.push(number);
      } else {
        if (stack.length === 0) {
          stack.unshift(char);
        } else {
          if (char === "(") {
            stack.unshift(char);
          } else if (char === ")") {
            let operator = stack.shift();
            while (operator !== "(") {
              arrResult.push(operator);
              operator = stack.shift();
            }
          } else {
            while (
              stack.length &&
              operatorPrecedence[stack[0]] >= operatorPrecedence[char]
            ) {
              arrResult.push(stack.shift());
            }
            stack.unshift(char);
          }
        }
      }
    }
  }

  while (stack.length) {
    arrResult.push(stack.shift());
  }

  return arrResult;
}

function calculatePostfix(postfixArr) {
  const stack = [];

  let a = null;
  let b = null;

  for (const item of postfixArr) {
    if (typeof item === "number") {
      stack.unshift(item);
    } else {
      b = stack.shift();
      a = stack.shift();

      switch (item) {
        case "+":
          stack.unshift(add(a, b));
          break;
        case "-":
          stack.unshift(subtract(a, b));
          break;
        case "*":
          stack.unshift(multiply(a, b));
          break;
        case "/":
          try {
            const result = divide(a, b);
            stack.unshift(result);
          } catch (error) {
            throw error;
          }
          break;
        case "%":
          if (b == 0) throw new Error("Division by 0!");
          stack.unshift(a % b);
          break;
        default:
          throw new Error("Syntax error!");
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid postfix expression");
  }

  let result = stack[0];

  // Round the result to two decimal places if it has a decimal fraction
  if (result % 1 !== 0) {
    result = parseFloat(result.toFixed(2));
  }

  return result;
}

//Replace - to ! while unary operator

function replaceAt(text, index, replacement) {
  return (
    text.substring(0, index) +
    replacement +
    text.substring(index + replacement.length)
  );
}

function parseToUnary(input) {
  let tempStr = input;
  for (let i = 0; i < tempStr.length; i++) {
    const char = tempStr[i];

    if (
      (char === "-" && i === 0 && !nonNumberValues.includes(tempStr[i + 1])) ||
      (char === "(" && tempStr[i + 1] === "-")
    ) {
      const unaryOperatorIndex = tempStr.slice(i).indexOf("-") + i;

      tempStr = replaceAt(tempStr, unaryOperatorIndex, "!");
    }
  }
  return tempStr;
}

export { parseToPostFix, calculatePostfix, parseToUnary };
