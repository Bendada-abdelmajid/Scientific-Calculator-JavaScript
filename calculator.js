document.body.classList.add(localStorage.getItem("them") || "simple");
// select elements
const output_operation = document.querySelector(".operation .value");
const resulet_operation = document.querySelector(".resulet .value");
const calculater = document.querySelector(".calculater");
const btnContainer = document.querySelector(".all-btns");
const upBtns = document.querySelector(".all-btns .up");
const centerBtns = document.querySelector(".all-btns .center");
const leftBtns = document.querySelector(".all-btns .left");
const OPERATORES = ["+", "-", "*", "/"];
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";
let data = {
  operation: [],
  formula: [],
};
let ans = 0;
let formula_str;
// CALCULATOR BUTTONS
let calculater_buttons = [
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
    position: "up",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
    position: "up",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
    position: "up",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
    position: "up",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
    position: "up",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
    position: "up",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
    position: "simple",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
    position: "simple",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
    position: "left",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
    position: "up",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
    position: "up",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
    position: "up",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
    position: "simple",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
    position: "simple",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
    position: "simple",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
    position: "simple",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
    position: "simple",
  },

  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
    position: "left",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
    position: "up",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
    position: "up",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
    position: "up",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
    position: "simple",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
    position: "simple",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
    position: "simple",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
    position: "simple",
  },

  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "math_function",
    position: "left",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
    position: "up",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
    position: "up",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
    position: "up",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
    position: "simple",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
    position: "simple",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
    position: "simple",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
    position: "simple",
  },
  {
    name: "power",
    symbol: "<span>x<sup>y</sup></span>",
    formula: POWER,
    type: "math_function",
    position: "left",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
    position: "left",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
    position: "simple",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
    position: "simple",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
    position: "simple",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
    position: "simple",
  },
  {
    name: "change",
    symbol: `<i class="fas fa-expand-alt"></i>`,
    position: "simple",
  },
];
let allBtns;
// create CALCULATOR BUTTONS
function creatCalculaterBtns() {
  calculater_buttons.forEach((btn) => {
    if (btn.position === "up") {
      appendBtn(btn, upBtns);
    } else if (btn.position === "simple") {
      appendBtn(btn, centerBtns);
    } else if (btn.position === "left") {
      appendBtn(btn, leftBtns);
    }
  });
  allBtns = document.querySelectorAll(".btn");
  allBtns.forEach((button) => {
    const parent = button.parentElement.parentElement;
    if (parent.classList.contains("center")) {
      if (button.classList.contains("operator")) {
        button.classList.add("special");
      } else if (button.classList.contains("key")) {
        button.classList.add("special");
      } else if (button.innerHTML === "%") {
        button.classList.add("special");
      }
    }
  });
}
creatCalculaterBtns();
function appendBtn(btn, parentEl) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div id="${btn.name}" class="btn ${btn.type}">${btn.symbol}</div>
    `;
  parentEl.appendChild(div);
}
btnContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id === "change") {
    calculater.classList.toggle("show");
    if (calculater.classList.contains("show")) {
      target.innerHTML = `<i class="fas fa-compress-alt"></i>`;
    } else {
      target.innerHTML = `<i class="fas fa-expand-alt"></i>`;
    }
  }
  calculater_buttons.forEach((btn) => {
    if (target.id === btn.name) {
      calculat(btn);
    }
  });
});
let RADIAN = true;
const rad_Btn = document.getElementById("rad");
const deg_Btn = document.getElementById("deg");
rad_Btn.classList.add("active");
function angelToggler() {
  rad_Btn.classList.toggle("active");
  deg_Btn.classList.toggle("active");
}
function calculat(btn) {
  if (btn.type === "operator") {
    data.operation.push(btn.symbol);
    data.formula.push(btn.formula);
  } else if (btn.type === "number") {
    data.operation.push(btn.symbol);
    data.formula.push(btn.formula);
  } else if (btn.type === "trigo_function") {
    data.operation.push(btn.symbol + "(");
    data.formula.push(btn.formula);
  } else if (btn.type === "math_function") {
    let symbol, formila;
    if (btn.name === "power") {
      symbol = "^(";
      data.operation.push(symbol);
      data.formula.push(btn.formula);
    } else if (btn.name === "square") {
      symbol = "^(";
      data.operation.push(symbol);
      data.formula.push(btn.formula);
      data.operation.push("2)");
      data.formula.push("2)");
    } else if (btn.name === "factorial") {
      symbol = "!";
      data.operation.push(symbol);
      data.formula.push(btn.formula);
    } else {
      symbol = btn.symbol + "(";
      formula = btn.formula + "(";
      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (btn.type === "key") {
    if (btn.name === "clear") {
      data.operation = [];
      data.formula = [];
      updatOuputResulet(0);
    } else if (btn.name === "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (btn.name === "rad") {
      RADIAN = true;
      angelToggler();
    } else if (btn.name === "deg") {
      RADIAN = false;
      angelToggler();
    }
  } else if (btn.type === "calculate") {
    formula_str = data.formula.join("");
    let POWER_Search_Resulet = search(data.formula, POWER);
    let FACTORIAL_Search_Resulet = search(data.formula, FACTORIAL);
    //get powers bases and replace with right formula
    const BASES = PwerBaseGeter(data.formula, POWER_Search_Resulet);
    BASES.forEach((base) => {
      let toReplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";
      formula_str = formula_str.replace(toReplace, replacement);
    });
    //get factorial numbers and replace with right formula
    const numbers = factorialNumGeter(data.formula, FACTORIAL_Search_Resulet);
    numbers.forEach((number) => {
      formula_str = formula_str.replace(number.toReplace, number.replacement);
    });
    let resulet;
    try {
      resulet = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        resulet = "Syntax Error!";
        updatOuputResulet(resulet);
        return;
      }
    }
    // save resulet for later use
    ans = resulet;
    data.operation = [resulet];
    data.formula = [resulet];
    updatOuputResulet(resulet);
  }
  updatOuputOperatin(data.operation.join(""));
}
function updatOuputOperatin(operation) {
  output_operation.innerHTML = operation;
}
function updatOuputResulet(resulet) {
  // data.operation = [];
  resulet_operation.innerHTML = resulet;
}
function search(array, keywored) {
  let searchArray = [];
  array.forEach((el, index) => {
    if (el === keywored) searchArray.push(index);
  });
  return searchArray;
}
//get factorial numbers
function factorialNumGeter(formula, FACTORIAL_Search_Resulet) {
  let factorial_Num = [];
  let factorial_sequence = 0;
  FACTORIAL_Search_Resulet.forEach((index) => {
    let num = [];
    let parentheses_count = 0;
    let next_index = index + 1;
    let next_input = formula[next_index];
    if (next_input == FACTORIAL) {
      factorial_sequence += 1;
      return;
    }
    //if there was a  factorial sequence we need to get the index of the first factorial sequence
    let first_factorial = index - factorial_sequence;
    let previous_factorial = first_factorial - 1;
    while (previous_factorial >= 0) {
      if (formula[previous_factorial] === "(") parentheses_count--;
      if (formula[previous_factorial] === ")") parentheses_count++;
      let is_operation = false;
      OPERATORES.forEach((OPERATORE) => {
        if (formula[previous_factorial] === OPERATORE) is_operation = true;
      });
      // let is_Power = formula[previous_factorial] == POWER;
      if (is_operation && parentheses_count == 0) break;
      num.unshift(formula[previous_factorial]);
      previous_factorial--;
    }
    let number_str = num.join("");
    const factorial = "factorial(",
      close_parentheses = ")";
    let times = factorial_sequence + 1;
    let toReplace = number_str + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + number_str + close_parentheses.repeat(times);
    factorial_Num.push({
      toReplace: toReplace,
      replacement: replacement,
    });
    factorial_sequence = 0;
  });
  return factorial_Num;
}
//get powers bases
function PwerBaseGeter(formula, POWER_Search_Resulet) {
  let power_base = [];
  POWER_Search_Resulet.forEach((index) => {
    let base = [];
    let parentheses_count = 0;
    let previous_index = index - 1;
    while (previous_index >= 0) {
      if (formula[previous_index] === "(") parentheses_count--;
      if (formula[previous_index] === ")") parentheses_count++;
      let is_operation = false;
      OPERATORES.forEach((OPERATORE) => {
        if (formula[previous_index] === OPERATORE) is_operation = true;
      });
      let is_Power = formula[previous_index] == POWER;
      if ((is_operation && parentheses_count == 0) || is_Power) break;
      base.unshift(formula[previous_index]);
      previous_index--;
    }
    power_base.push(base.join(""));
  });
  return power_base;
}
// factorail Function
function factorial(number) {
  if (number % 1 !== 0) return gamma(number + 1);
  if (number == 0 || number == 1) return 1;
  let resulet = 1;
  for (let i = 1; i <= number; i++) {
    resulet *= i;
    if (resulet === Infinity) return Infinity;
  }
  return resulet;
}

// GAMMA FUNCTINON
function gamma(n) {
  // accurate to about 15 decimal places
  //some magic constants
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}
function trigo(callback, angel) {
  if (!RADIAN) {
    angel = angel * (Math.PI / 180);
  }
  return callback(angel);
}
function inv_trigo(callback, value) {
  let angel = callback(value);
  if (!RADIAN) {
    angel = angel * (180 / Math.PI);
  }
  return angel;
}

window.addEventListener("keydown", (e) => {
  allBtns = document.querySelectorAll(".btn");
  if (e.key === "*") {
    clickOn_KeyBored("×");
  } else if (e.key.charCodeAt() === 69) {
    clickOn_KeyBored("=");
  } else if (e.key.charCodeAt() === 68) {
    clickOn_KeyBored("C");
  } else if (e.key.charCodeAt() === 66) {
    clickOn_KeyBored("⌫");
  } else if (e.key === "%") {
    clickOn_KeyBored("%");
  } else if (e.key === "r" || e.key === "R") {
    clickOn_KeyBored("Rad");
  } else if (e.key === "d" || e.key === "D") {
    clickOn_KeyBored("Deg");
  } else if (e.key === "c" || e.key === "C") {
    clickOn_KeyBored("cos");
  } else if (e.key === "s" || e.key === "S") {
    clickOn_KeyBored("sin");
  } else if (e.key === "t" || e.key === "T") {
    clickOn_KeyBored("tan");
  } else if (e.key === "g" || e.key === "G") {
    clickOn_KeyBored("acos");
  } else if (e.key === "h" || e.key === "H") {
    clickOn_KeyBored("asin");
  } else if (e.key === "j" || e.key === "J") {
    clickOn_KeyBored("atan");
  } else if (e.key === "é") {
    clickOn_KeyBored("exp");
  } else if (e.key === "n" || e.key === "N") {
    clickOn_KeyBored("ln");
  } else if (e.key === "l" || e.key === "L") {
    clickOn_KeyBored("log");
  } else if (e.key === "j" || e.key === "J") {
    clickOn_KeyBored("asin");
  } else if (e.key === "v" || e.key === "v") {
    clickOn_KeyBored("√");
  } else if (e.key === "p" || e.key === "P") {
    clickOn_KeyBored("π");
  } else if (e.key === "f" || e.key === "F") {
    clickOn_KeyBored("×!");
  } else if (e.key === "a" || e.key === "A") {
    clickOn_KeyBored("ANS");
  } else if (e.key === "e") {
    clickOn_KeyBored("e");
  } else if (e.key === "x" || e.key === "X") {
    clickOn_KeyBored("x²");
  } else if (e.key === "y" || e.key === "Y") {
    clickOn_KeyBored("<span>x<sup>y</sup></span>");
  } else {
    clickOn_KeyBored(e.key);
  }
});
function clickOn_KeyBored(key) {
  allBtns = document.querySelectorAll(".btn");
  allBtns.forEach((btn) => {
    if (btn.innerHTML === key) {
      btn.click();
    }
  });
}
/// them switch
const themSwitch = document.querySelector(".them-switch");
const changeBtn = document.querySelector(".icon.pram");
const themSwitch_CloseBtn = document.querySelector(".them-switch .icon.close");
const shortcut_Btn = document.querySelector(".icon.book");
const shortcut_CloseBtn = document.querySelector(".shortcuts .icon.close");
const shortcutsContainer = document.querySelector(".shortcuts");
const themsContainer = document.querySelector(".thems-container");
const thems = document.querySelectorAll(".them");
const prev_Btn = document.querySelector(".prev");
const next_Btn = document.querySelector(".next");
let themWidht = 100;
let themIndex = 0;
shortcut_Btn.addEventListener("click", (e) => {
  shortcutsContainer.classList.add("show");
  themSwitch.classList.remove("show");
});
shortcut_CloseBtn.addEventListener("click", (e) => {
  shortcutsContainer.classList.remove("show");
});

changeBtn.addEventListener("click", () => {
  themSwitch.classList.toggle("show");
});
themSwitch_CloseBtn.addEventListener("click", () => {
  themSwitch.classList.remove("show");
});
thems.forEach((item) => {
  item.addEventListener("click", () => {
    document.body.classList.remove("dark", "simple", "white");
    document.body.classList.add(item.classList[0]);
    themSwitch.classList.remove("show");
    localStorage.setItem("them", item.classList[0]);
  });
});
next_Btn.addEventListener("click", () => {
  if (themIndex === thems.length - 1) {
    return false;
  } else {
    themIndex++;
  }
  disableNextBtnPrevBtn();
  themsContainer.style.marginLeft = -(themWidht * themIndex) + "%";
});
//on click on prevBtn
prev_Btn.addEventListener("click", () => {
  if (themIndex === 0) {
    return false;
  } else {
    themIndex--;
  }
  disableNextBtnPrevBtn();
  themsContainer.style.marginLeft = -(themWidht * themIndex) + "%";
});
function disableNextBtnPrevBtn() {
  if (themIndex === thems.length - 1) {
    next_Btn.classList.add("disable");
  } else {
    next_Btn.classList.remove("disable");
  }
  if (themIndex === 0) {
    prev_Btn.classList.add("disable");
  } else {
    prev_Btn.classList.remove("disable");
  }
}
