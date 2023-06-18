const CURRENCY = 'грн.';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'limit_red';

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categoryNode = document.querySelector('.select-area');
const clearBtnNode = document.querySelector('.js-close-btn');
// const selectedValue = document.querySelector('.select-area');

let LIMIT;


const POPUP_OPENED_CLASSNAME = "popup-open";
const BODY_FIXED_CLASSNAME = "body-fixed";

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const popupContentNode = document.querySelector('.js-popup-content');
const popupOpenBtnNode = document.querySelector('.js-edit-btn');
// const popupClosedBtnNode = document.querySelector('.js-popup-close-btn');

const limitInputNode = document.querySelector('.js-add-limit-input');
const popupAddLimitBtn = document.querySelector('.js-popup-add-limit-btn');
const emptyLimitOutputMessage = document.querySelector('.empty-limit')

popupOpenBtnNode.addEventListener('click', togglePopup);
// popupClosedBtnNode.addEventListener('click', togglePopup);

const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';


const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString);
let expenses = [];

if (Array.isArray(expensesFromStorage)) {
    expenses = expensesFromStorage;
}
render();


const limitFromStorage = localStorage.getItem(STORAGE_LABEL_LIMIT);

limitNode.innerText = limitFromStorage;



init(expenses);

buttonNode.addEventListener('click', function () {

    const expense = getExpencesFromUser();
    if (!expense) {
        return;
    }

    const currentCategory = getCategoryFromUser();
    if (!currentCategory === "Категория") {
        return;
    }

    const newExpences = { amount: expense, category: currentCategory };
    expenses.push(newExpences);
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);

    render(expenses);

});

function init(expenses) {
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpences(expenses);
}

function calculateExpences() {
    let sum = 0;
    expenses.forEach(expense => {
        sum += expense.amount;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpences(expenses);

    renderHistory();
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory() {
    let expensesListHTML = '';

    expenses.forEach(expense => {
        const elementHTML = `<li>${expense.category} - ${expense.amount} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(expenses) {
    sumNode.innerText = calculateExpences(expenses);
}

function renderStatus(expenses) {
    const sum = calculateExpences(expenses);
    const outOfSum = sum - limitNode.innerText;

    if (sum <= limitNode.innerText) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (- ${outOfSum} ${CURRENCY})`;
        statusNode.classList.toggle(STATUS_OUT_OF_LIMIT_CLASSNAME);
    };
}



function getExpencesFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const expense = parseInt(inputNode.value);
    clearInput();
    return expense;
}

function getCategoryFromUser() {
    return categoryNode.value;
}

function clearInput() {
    inputNode.value = '';
    limitInputNode.value = '';
}

// let selectedIndex = selectedValue.selectedIndex;
// let options = selectedValue.options;
// let content = options[selectedIndex].textContent;


popupNode.addEventListener('click', (event) => {
    const clickOutsideContent = !event.composedPath().includes(popupContentNode)

    if (clickOutsideContent) {
        togglePopup();
    }
})

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}

popupAddLimitBtn.addEventListener('click', getLimitFromUser);

function getLimitFromUser() {
    LIMIT = parseInt(limitInputNode.value);

    if (!limitInputNode.value) {
        emptyLimitOutputMessage.innerText = 'Необходимо ввести значение';
        return;
    }

    localStorage.setItem(STORAGE_LABEL_LIMIT, LIMIT);
    clearInput();
    togglePopup();
    return limitNode.innerText = LIMIT;
}


clearBtnNode.addEventListener('click', claerBTN);

function claerBTN() {
    expenses = [];
    render();
    limitNode.innerText = '';
}