const translations = {
    ja: {
        title: "真昼の計算機 👱🏻‍♀️",
        footer: "真昼から白熊君へ愛を込めて",
        error: "エラー"
    },
    zh: {
        title: "真昼的计算器 👱🏻‍♀️",
        footer: "真昼从塔卫二发来的问候",
        error: "错误"
    },
    en: {
        title: "Mahiru's Calculator 👱🏻‍♀️",
        footer: "With love from Mahiru to Whitebear",
        error: "Error"
    }
};

let currentLanguage = 'ja';
let currentOperand = '0';
let displayString = '0';

const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
const titleElement = document.getElementById('calc-title');
const footerElement = document.getElementById('footer-text');

function setLanguage(lang) {
    currentLanguage = lang;
    titleElement.innerText = translations[lang].title;
    footerElement.innerText = translations[lang].footer;
    document.documentElement.lang = lang;
}

function updateDisplay() {
    currentOperandTextElement.innerText = displayString;
}

function appendNumber(number) {
    if (displayString === '0' && number !== '.') {
        displayString = number.toString();
    } else {
        displayString += number.toString();
    }
    updateDisplay();
}

function appendFunction(func) {
    if (displayString === '0') {
        displayString = func;
    } else {
        displayString += func;
    }
    updateDisplay();
}

function chooseOperation(op) {
    const lastChar = displayString.slice(-1);
    if (['+', '-', '*', '/', '÷', '×'].includes(lastChar)) {
        displayString = displayString.slice(0, -1);
    }
    
    let opChar = op;
    if (op === '÷') opChar = '/';
    if (op === '×') opChar = '*';
    
    displayString += opChar;
    updateDisplay();
}

function clearDisplay() {
    displayString = '0';
    updateDisplay();
}

function deleteNumber() {
    if (displayString.length > 1) {
        displayString = displayString.slice(0, -1);
    } else {
        displayString = '0';
    }
    updateDisplay();
}

function compute() {
    try {
        // Replace visual symbols with math ones
        let expression = displayString.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Simple safety: only allow math characters
        if (/[^0-9\+\-\*\/\.\(\)Math\.sincoepwrtgl]/.test(expression)) {
            throw new Error("Invalid");
        }

        let result = eval(expression);
        
        // Format result
        if (typeof result === 'number') {
            if (!isFinite(result)) result = translations[currentLanguage].error;
            else result = parseFloat(result.toFixed(8));
        }
        
        displayString = result.toString();
        updateDisplay();
    } catch (e) {
        displayString = translations[currentLanguage].error;
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

// Init default language
setLanguage('ja');
