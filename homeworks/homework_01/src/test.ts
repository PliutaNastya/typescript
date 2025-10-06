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

const objFromStorage = JSON.parse(localStorage.getItem("data") ?? "{}");
const field2: number | string = objFromStorage.field2;

let res: number | string;

if (typeof field2 === "string") res = field2.length;
else res = field2 % 2 === 0 ? "Парне" : "Непарне";

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

const objFromStorage2 = JSON.parse(localStorage.getItem("data2") ?? "{}");

const renderFieldsFromObj = (obj: any): void => {
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
  type Product = {
    name: string;
    price: number;
    amount: number;
    totalPrice: number;
  };

  const products: Product[] = [];

  const ITERATION_AMOUNT = 2;
  for (let i = 1; i <= ITERATION_AMOUNT; i++) {
    const productName: string =
      prompt(`Введіть назву товару #${i}:`) ?? "Product";
    const productPrice: number = parseInt(
      prompt(`Введіть ціну товару #${i}:`) ?? "1"
    );
    const productAmount: number = parseInt(
      prompt(`Введіть кількість товару #${i}:`) ?? "1"
    );

    const product: Product = {
      name: productName,
      price: productPrice,
      amount: productAmount,
      totalPrice: productPrice * productAmount,
    };

    products.push(product);
  }

  const showReceipt = (products: Product[], total: number): void => {
    let receipt: string = "Чек \n----------------\n";

    for (const p of products) {
      receipt += `${p.name} - ${p.amount} x ${p.price}грн = ${p.totalPrice}грн\n`;
    }

    receipt += `----------------\nЗагалом: ${total}грн\n`;

    console.log(receipt);
  };

  const total = products.reduce(
    (accum, product) => accum + product.totalPrice,
    0
  );

  showReceipt(products, total);
}
// =========================================================
// Задача №4
// Вводиться номер дня або назва дня.
// Створити функцію, яка за цим значенням виводить
// на екран чи це робочий день.
//! Розв'язання
if (confirm("Запустити задачу?")) {
  const userAnswer: string = prompt("Введіть номер дня або його назву") ?? "1";
  const day: string | number = isNaN(parseInt(userAnswer))
    ? userAnswer.toLowerCase().trim()
    : parseInt(userAnswer);
  const workDays: string[] = [
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п'ятниця",
  ];

  const isWorkDay = (day: string | number, days: string[]): string => {
    let res = "";

    if (typeof day === "number") {
      res = day >= 1 && day <= 5 ? "Робочий день." : "Вихідний, відпочивайте.";
    } else {
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
let stringCount: number = 0;
let numberCount: number = 0;
let value: number | string = "";

for (let i = 0; i < 10; i++) {
  value = Math.random() > 0.5 ? 3 : "ok";

  if (typeof value === "string") stringCount++;
  else numberCount++;
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
  let currency: "USD" | "EUR" | "UAH";

  const userCurrency: string =
    prompt("Оберіть та введіть одну з цих валют: USD | EUR | UAH")
      ?.toUpperCase()
      .trim() ?? "";
  const userSum: number = parseInt(prompt("Тепер введіть суму грошей") ?? "0");

  const USD_RATE = 42;
  const EUR_RATE = 46;

  if (
    userCurrency === "USD" ||
    userCurrency === "EUR" ||
    userCurrency === "UAH"
  ) {
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
  } else console.log("Упс. Некоректно вказана валюта. Спробуйте ще раз.");
}
