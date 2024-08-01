let firstNumber = ""; // first number
let secondNumber = ""; // secont number
let sign = ""; // знак операции
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "*", "/", "√", "±", "^"];

// экран
const out = document.querySelector(".input");

function clearAll() {
  firstNumber = " "; // first number and result
  secondNumber = ""; // second number
  sign = ""; // знак
  finish = false;
  out.textContent = 0;
}

document.querySelector(".clear").onclick = clearAll;

document.querySelector(".gridContainer").onclick = (event) => {
  // нажата не кнопка
  if (!event.target.classList.contains("btn")) return;
  // нажата кнопка clearAll ac
  if (event.target.classList.contains("clear")) return;

  out.textContent = "";
  // получаю нажатую кнопку
  const key = event.target.textContent;

  // если нажата клавиша 0-9 или .
  if (digit.includes(key)) {
    if (secondNumber === "" && sign === "") {
      firstNumber += key;

      out.textContent = firstNumber;
    } else if (firstNumber !== "" && secondNumber !== "" && finish) {
      secondNumber = key;
      finish = false;
      out.textContent = secondNumber;
    } else {
      secondNumber += key;
      out.textContent = secondNumber;
    }
    console.table(firstNumber, secondNumber, sign);
    return;
  }

  // если нажата клавиша + - / *
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.table(firstNumber, secondNumber, sign);
    return;
  }

  // нажата =
  if (key === "=") {
    if (secondNumber === "") secondNumber = firstNumber;
    switch (sign) {
      case "+":
        firstNumber = +firstNumber + +secondNumber;
        break;
      case "-":
        firstNumber = firstNumber - secondNumber;
        break;
      case "*":
        firstNumber = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber === "0") {
          out.textContent = "Ошибка";
          firstNumber = "";
          secondNumber = "";
          sign = "";
          return;
        }
        firstNumber = firstNumber / secondNumber;
        break;
      case "√":
        if (firstNumber < "0") {
          out.textContent = "не извлекается";
          firstNumber = "";
          secondNumber = "";
          return;
        }
        firstNumber = Math.sqrt(firstNumber);

        break;
      case "±":
        firstNumber = firstNumber * -1;
        secondNumber = "";
        break;
      case "^":
        secondNumber = Number(secondNumber);

        if (Number.isInteger(secondNumber) !== true) {
          out.textContent = "вводите целочисленное ";
          firstNumber = "";
          secondNumber = "";
          return;
        }
        firstNumber = Math.pow(firstNumber, secondNumber);
        break;
    }
    finish = true;
    out.textContent = firstNumber;
    console.table(firstNumber, secondNumber, sign);
  }
};
console.log(firstNumber);
console.log(secondNumber);
