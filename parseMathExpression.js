const operatorPrecedence = {
  "(": 3,
  ")": 3,
  "*": 2,
  "/": 2,
  "+": 1,
  "-": 1,
};

const nonNumberValues = ["+", "-", "*", "/", "(", ")", "!"];

function parseToPostFix(input) {
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
          console.log(input[j]);
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

function evaluatePostfix(postArr) {}

console.log(parseToPostFix("!2+(!2)+45"));
