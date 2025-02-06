const DIGITS = "0123456789";
const BINARY = "+-×÷%";
const UNARY = "±";
const CLEAR = "C";
const EQUALS = "=";
const DOT = ".";
const UNARYBINARY = "%";
const BACKSPACE = "⌫";
const KEYBOARD_ACTIONS = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
  Enter: "=",
  Delete: "C",
  "%": "%",
  ".": ".",
  Backspace: BACKSPACE,
};
const inputValue = {
  v1: "",
  v2: "",
  operator: "",
  nextOperator: "",
  isUpdated: true,
};
const displayNode = document.querySelector(".display");
const backSpaceClearNode = document.querySelector("#clear");

function round(num) {
  return +(Math.round(num + "e+4") + "e-4");
}
function updateBackSpaceClearNode() {
  backSpaceClearNode.textContent = inputValue.isUpdated ? CLEAR : BACKSPACE;
}

function updateDisplay() {
  const { v1, v2, operator } = inputValue;
  if (v1 || v1 === 0) {
    displayNode.style.fontSize = "3rem";
    displayNode.textContent = `${v1} ${operator} ${v2}`;
  } else {
    displayNode.style.fontSize = "4rem";
    displayNode.textContent = "Input a value";
  }
}

function updateInputValue(inputSign) {
  if (DIGITS.includes(inputSign)) {
    if (inputValue.operator) {
      if (inputValue.isUpdated) {
        inputValue.v2 = "";
        inputValue.isUpdated = false;
        updateBackSpaceClearNode();
      }
      inputValue.v2 += inputSign;
    } else {
      if (inputValue.isUpdated) {
        inputValue.v1 = "";
        inputValue.isUpdated = false;
        updateBackSpaceClearNode();
      }
      inputValue.v1 += inputSign;
    }
  } else if (DOT.includes(inputSign)) {
    if (inputValue.v2 && !inputValue.v2.includes(inputSign)) {
      inputValue.v2 += inputSign;
    } else if (inputValue.v1 && !inputValue.v1.includes(inputSign)) {
      inputValue.v1 += inputSign;
    }
  } else if (BINARY.includes(inputSign)) {
    if (inputValue.v1 === "") return;
    if (inputValue.operator && inputValue.v2) {
      inputValue.nextOperator = inputSign;
      operate();
    } else {
      inputValue.operator = inputSign;
    }
  } else if (UNARY.includes(inputSign)) {
    if (inputValue.v1 === "") return;
    if (inputValue.operator && inputValue.v2) {
      inputValue.nextOperator = inputSign;
    } else {
      inputValue.operator = inputSign;
    }
    operate();
  } else if (CLEAR.includes(inputSign)) {
    clearInputValue();
  } else if (BACKSPACE.includes(inputSign)) {
    if (inputValue.operator) {
      inputValue.v2 = inputValue.v2.substring(0, inputValue.v2.length - 1);
      if (inputValue.v2.length === 0) {
        inputValue.isUpdated = true;
        updateBackSpaceClearNode();
      }
    } else {
      inputValue.v1 = inputValue.v1.substring(0, inputValue.v1.length - 1);
      if (inputValue.v1.length === 0) {
        inputValue.isUpdated = true;
        updateBackSpaceClearNode();
      }
    }
  } else if (EQUALS.includes(inputSign)) {
    operate();
  }
  updateDisplay();
}

function clearInputValue() {
  inputValue.v1 = "";
  inputValue.v2 = "";
  inputValue.operator = "";
}

function operate() {
  const v1 = Number(inputValue.v1);
  const v2 = Number(inputValue.v2);

  if (v2 || inputValue.v2 === "0") {
    const result = operateBinary(v1, v2, inputValue.operator);
    updateResult(result);
  } else {
    const result = operateUnary(v1, inputValue.operator);
    updateResult(result);
  }
  const { nextOperator } = inputValue;
  if (nextOperator) {
    if (BINARY.includes(nextOperator)) {
      inputValue.operator = nextOperator;
      return;
    } else if (UNARY.includes(nextOperator)) {
      const result = operateUnary(inputValue.v1, nextOperator);
      updateResult(result);
    }
    inputValue.nextOperator = "";
  }
}

function updateResult(result) {
  clearInputValue();
  inputValue.v1 = result;
  inputValue.isUpdated = true;
  updateBackSpaceClearNode();
}
function operateBinary(v1, v2, operator) {
  const operations = {
    "+": (v1, v2) => v1 + v2,
    "-": (v1, v2) => v1 - v2,
    "×": (v1, v2) => v1 * v2,
    "÷": (v1, v2) => v1 / v2,
    "%": (v1, v2) => v1 % v2,
  };
  return round(operations[operator](v1, v2));
}

function operateUnary(v1, operator) {
  const operations = {
    "%": (v1) => v1 / 100,
    "±": (v1) => -v1,
    "": (v1) => v1,
  };
  return round(operations[operator](v1));
}

document.querySelector(".buttons").addEventListener("click", (ev) => {
  if (ev.target.tagName !== "DIV" && !ev.target.textContent) return;
  updateInputValue(ev.target.textContent);
});
window.addEventListener("keydown", (ev) => {
  if (ev.key in KEYBOARD_ACTIONS) {
    updateInputValue(KEYBOARD_ACTIONS[ev.key]);
  } else if (DIGITS.includes(ev.key)) {
    updateInputValue(ev.key);
  }
});
