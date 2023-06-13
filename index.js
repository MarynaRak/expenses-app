const LIMIT = 0;
const CURRENCY = 'грн.';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все Плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'limit_red';

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
// const selectedValue = document.querySelector('.select-area');

const POPUP_OPENED_CLASSNAME = "popup-open";
const BODY_FIXED_CLASSNAME = "body-fixed";

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const popupContentNode = document.querySelector('.js-popup-close-btn');
const popupOpenBtn = document.querySelector('.js-edit-btn');
const popupClosedBtn = document.querySelector('.js-popup-close-btn');

const limitInputNode = document.querySelector('.js-add-limit-input');

const expenses = [];
 
init(expenses);

buttonNode.addEventListener('click', function () {
    
    const expense = getExpencesFromUser();
    if (!expense) {
        return;
    }

    trackExpensses(expense);

    render(expenses);

   });

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpences(expenses);
}

function calculateExpences(expenses) {
    let sum = 0;
    expenses.forEach(element => {
        sum += element;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpences(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
        const elementHTML = `<li>${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(expenses) {
    sumNode.innerText = calculateExpences(expenses);
}

function renderStatus(expenses) {
    const sum = calculateExpences(expenses);

    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    };
}

function trackExpensses(expense) {
    expenses.push(expense);
}

function getExpencesFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const expense = parseInt(inputNode.value);
    clearInput();
    return expense;
}  

function clearInput() {
    inputNode.value = '';

}

// let selectedIndex = selectedValue.selectedIndex;
// let options = selectedValue.options;
// let content = options[selectedIndex].textContent;
