"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
// Задача №1
// У localStorage зберігається об’єкт у форматі JSON з ключем «data».
// Проаналізувати значення поля «field2».
// Якщо рядок – то вивести довжину,
// якщо число – то визначити чи є парним.
//! Розв'язання
const obj = {
    field2: Math.random() > 0.5 ? "some string" : 29,
};
localStorage.setItem("data", JSON.stringify(obj));
const objFromStorage = JSON.parse((_a = localStorage.getItem("data")) !== null && _a !== void 0 ? _a : "{}");
const field2 = objFromStorage.field2;
let res;
if (typeof field2 === "string")
    res = field2.length;
else
    res = field2 % 2 === 0 ? "Парне" : "Непарне";
console.log(res);
// =========================================================
// Задача №2
// У localStorage зберігається об’єкт у форматі JSON з ключем «data».
// Вивести на екран усі поля та їх значення.
//! Розв'язання
const obj2 = {
    name: "Anastasiia",
    age: 29,
    isDeveloper: true,
};
localStorage.setItem("data2", JSON.stringify(obj2));
const objFromStorage2 = JSON.parse((_b = localStorage.getItem("data2")) !== null && _b !== void 0 ? _b : "{}");
const renderFieldsFromObj = (obj) => {
    for (const field in obj) {
        console.log(`${field} - ${obj[field]}`);
    }
};
renderFieldsFromObj(objFromStorage2);
// =========================================================
// Задача №3
// Вводиться назва продукту, ціна одиниці та кількість
// для 2-х видів товарів.
// Вивести чек про купівлю.
//! Розв'язання
if (confirm("Запустити задачу?")) {
    const products = [];
    const ITERATION_AMOUNT = 2;
    for (let i = 1; i <= ITERATION_AMOUNT; i++) {
        const productName = (_c = prompt(`Введіть назву товару #${i}:`)) !== null && _c !== void 0 ? _c : "Product";
        const productPrice = parseInt((_d = prompt(`Введіть ціну товару #${i}:`)) !== null && _d !== void 0 ? _d : "1");
        const productAmount = parseInt((_e = prompt(`Введіть кількість товару #${i}:`)) !== null && _e !== void 0 ? _e : "1");
        const product = {
            name: productName,
            price: productPrice,
            amount: productAmount,
            totalPrice: productPrice * productAmount,
        };
        products.push(product);
    }
    const showReceipt = (products, total) => {
        let receipt = "Чек \n----------------\n";
        for (const p of products) {
            receipt += `${p.name} - ${p.amount} x ${p.price}грн = ${p.totalPrice}грн\n`;
        }
        receipt += `----------------\nЗагалом: ${total}грн\n`;
        console.log(receipt);
    };
    const total = products.reduce((accum, product) => accum + product.totalPrice, 0);
    showReceipt(products, total);
}
// =========================================================
// Задача №4
// Вводиться номер дня або назва дня.
// Створити функцію, яка за цим значенням виводить
// на екран чи це робочий день.
//! Розв'язання
if (confirm("Запустити задачу?")) {
    const userAnswer = (_f = prompt("Введіть номер дня або його назву")) !== null && _f !== void 0 ? _f : "1";
    const day = isNaN(parseInt(userAnswer))
        ? userAnswer.toLowerCase().trim()
        : parseInt(userAnswer);
    const workDays = [
        "понеділок",
        "вівторок",
        "середа",
        "четвер",
        "п'ятниця",
    ];
    const isWorkDay = (day, days) => {
        let res = "";
        if (typeof day === "number") {
            res = day >= 1 && day <= 5 ? "Робочий день." : "Вихідний, відпочивайте.";
        }
        else {
            res = days.includes(day) ? "Робочий день." : "Вихідний, відпочивайте.";
        }
        return res;
    };
    console.log(isWorkDay(day, workDays));
}
// =========================================================
// Задача №5
// Випадковим чином 10 разів генерується число або рядок «Ок».
// Пірахувати чого було більше чисел чи рядків
// і вивести останнє значення
//! Розв'язання
let stringCount = 0;
let numberCount = 0;
let value = "";
for (let i = 0; i < 10; i++) {
    value = Math.random() > 0.5 ? 3 : "ok";
    if (typeof value === "string")
        stringCount++;
    else
        numberCount++;
}
console.log(`Кількість рядків: ${stringCount},\n 
Кількість чисел: ${numberCount},\n 
Останнє значення: ${value}`);
// =========================================================
// Задача №6
//  Вводиться сума грошей і позначення валюти.
//  Потрібно перевести у інші валюти("USD", "EUR", "UAH").
//  Тобто якщо вводять гривні, то перевести у долари і євро.
//  А якщо вводять долари, то перевести у гривні  і євро.
//  Курси валют – це константи.
//! Розв'язання
if (confirm("Запустити задачу?")) {
    let currency;
    const userCurrency = (_h = (_g = prompt("Оберіть та введіть одну з цих валют: USD | EUR | UAH")) === null || _g === void 0 ? void 0 : _g.toUpperCase().trim()) !== null && _h !== void 0 ? _h : "";
    const userSum = parseInt((_j = prompt("Тепер введіть суму грошей")) !== null && _j !== void 0 ? _j : "0");
    const USD_RATE = 42;
    const EUR_RATE = 46;
    if (userCurrency === "USD" ||
        userCurrency === "EUR" ||
        userCurrency === "UAH") {
        currency = userCurrency;
        switch (currency) {
            case "EUR":
                console.log(`
Ви ввели - ${userSum}€;\n
В гривні це - ${(userSum * EUR_RATE).toFixed(2)}₴;\n
В долларах це - ${((userSum * EUR_RATE) / USD_RATE).toFixed(2)}$
`);
                break;
            case "USD":
                console.log(`
Ви ввели - ${userSum}$;\n
В гривні це - ${(userSum * USD_RATE).toFixed(2)}₴;\n
В євро це - ${((userSum * USD_RATE) / EUR_RATE).toFixed(2)}€
`);
                break;
            case "UAH":
                console.log(`
Ви ввели - ${userSum}₴;\n
В євро це - ${(userSum / EUR_RATE).toFixed(2)}€;\n
В долларах це - ${(userSum / USD_RATE).toFixed(2)}$
`);
                break;
        }
    }
    else
        console.log("Упс. Некоректно вказана валюта. Спробуйте ще раз.");
}
