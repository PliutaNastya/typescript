// Задача 1. Вводиться перший номер місяця якоїсь пори року(3, 6, 9, 12).
// Визначити пору року.Передбачити перевірку і генерувати помилку якщо некоректний місяць (1-12)
// і генерувати помилку якщо це не перший місяць пори року.Використати never.
//! Розв'язання
if (confirm("Запустити задачу?")) {
  type firstMonthOfSeason = 3 | 6 | 9 | 12;

  const setError = (message: string): never => {
    throw new Error(message);
  };

  const getSeasonByFirstMonth = (month: number): string => {
    if (month < 1 || month > 12)
      setError("Помилка: місяць має бути від 1 до 12.");

    if (month !== 3 && month !== 6 && month !== 9 && month !== 12) {
      setError(
        "Помилка: це не перший місяць пори року (допустимі: 3, 6, 9, 12)."
      );
    }
    const validMonth = month as firstMonthOfSeason;
    let season = "";
    switch (month) {
      case 3:
        season = "Весна";
        break;
      case 6:
        season = "Літо";
        break;
      case 9:
        season = "Осінь";
        break;
      case 12:
        season = "Зима";
        break;
      default:
        const _exhaustiveCheck: never = validMonth;
        setError("Некоректний місяць.");
    }

    return season;
  };

  const userAnswer = prompt("Введіть перший місяць пори року (3, 6, 9, 12):");
  const monthInput = userAnswer ? parseInt(userAnswer) : NaN;
  const userSeason = getSeasonByFirstMonth(monthInput);
  console.log(`Пора року: ${userSeason}`);
}

// =========================================================

// Задача 2. Створити функцію, яка дозволяє знайти або останню цифру числа,
// або останній символ числа.
//! Розв'язання
if (confirm("Запустити задачу?")) {
  // Можливі сигнатури функції
  function getLastElement(input: number): number;
  function getLastElement(input: string): string;

  // Реалізація функції
  function getLastElement(input: number | string): number | string {
    let result: number | string;

    if (typeof input === "number") {
      result = Math.abs(Math.trunc(input)) % 10;
    } else if (typeof input === "string") {
      result = input.charAt(input.length - 1);
    } else throw new Error("Некоректний тип вхідних даних.");

    return result;
  }

  // Використання функції
  const userInputNumber = prompt("Введіть будь-яке число:");
  if (userInputNumber !== null) {
    const numberValue = Number(userInputNumber);
    const lastDigit = getLastElement(numberValue);
    const lastDigitInString = getLastElement(userInputNumber);
    console.log(`Остання цифра числа: ${lastDigit}`);
    console.log(`Останній символ числа: ${lastDigitInString}`);
  }
}

// =========================================================

// Задача 3. Вводиться номер місяця або назва місяця.Створити функцію,
// яка повинна повертати номер пори року(1 - 4) якщо передаємо число,
// або назву пори року, якщо було введено назву місяця.
// Використати перевантаження функцій.
//! Розв'язання
if (confirm("Запустити задачу?")) {
  enum Season {
    Spring = 1,
    Summer,
    Autumn,
    Winter,
  }

  // Можливі сигнатури функції
  function getSeasonByMonth(input: number): number;
  function getSeasonByMonth(input: string): string;

  const setError = (message: string): never => {
    throw new Error(message);
  };

  // Реалізація функції
  function getSeasonByMonth(input: number | string): number | string {
    let season: number | string;

    if (typeof input === "number") {
      if (input < 1 || input > 12) {
        setError("Помилка: номер місяця має бути від 1 до 12.");
      }
      switch (input) {
        case 3:
        case 4:
        case 5:
          season = Season.Spring;
          break;
        case 6:
        case 7:
        case 8:
          season = Season.Summer;
          break;
        case 9:
        case 10:
        case 11:
          season = Season.Autumn;
          break;
        case 12:
        case 1:
        case 2:
          season = Season.Winter;
          break;
        default:
          const _exhaustiveCheck: never = input;
          setError("Некоректний номер місяця.");
      }
    } else if (typeof input === "string") {
      const month = input.trim().toLowerCase();
      if (month.length === 0) setError("Ви ввели порожній рядок.");
      switch (month) {
        case "березень":
        case "квітень":
        case "травень":
          season = Season[Season.Spring];
          break;
        case "червень":
        case "липень":
        case "серпень":
          season = Season[Season.Summer];
          break;

        case "вересень":
        case "жовтень":
        case "листопад":
          season = Season[Season.Autumn];
          break;
        case "грудень":
        case "січень":
        case "лютий":
          season = Season[Season.Winter];
          break;
        default:
          const _exhaustiveCheck: never = input;
          setError("Некоректна назва місяця.");
      }
    }

    return season;
  }

  // Використання функції
  const userInput = prompt(
    "Введіть номер місяця (1-12) або назву місяця (українською):"
  );
  if (userInput !== null) {
    const monthNumber = Number(userInput);

    if (!isNaN(monthNumber)) {
      const seasonNumber = getSeasonByMonth(monthNumber);
      console.log(`Номер пори року: ${seasonNumber}`);
    } else {
      const seasonName = getSeasonByMonth(userInput);
      console.log(`Назва пори року: ${seasonName}`);
    }
  }
}

// =========================================================

// Задача 4. Випадковим чином генерується масив номерів робочих днів,
// або назв вихідних, або назв святкових днів.Підрахувати чого було
// більше: святкових чи вихідних.
//! Розв'язання
enum WorkingDays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

enum WeekendDays {
  Saturday = "Субота",
  Sunday = "Неділя",
}

enum HolidayDays {
  NewYear = "Новий Рік",
  IndependenceDay = "День Незалежності",
  Christmas = "Різдво",
}

const generateRandomDaysArray = (length: number): (number | string)[] => {
  const daysArray: (number | string)[] = [];
  const allDays = [
    ...Object.values(WorkingDays).filter((value) => typeof value === "number"),
    ...Object.values(WeekendDays),
    ...Object.values(HolidayDays),
  ];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allDays.length);
    daysArray.push(allDays[randomIndex]);
  }

  return daysArray;
};

const countDays = (daysArray: (number | string)[]) => {
  let weekendCount = 0;
  let holidayCount = 0;

  const weekendVals = Object.values(WeekendDays);
  const holidayVals = Object.values(HolidayDays);

  daysArray.forEach((day) => {
    if (typeof day === "string" && weekendVals.includes(day)) weekendCount++;
    else if (typeof day === "string" && holidayVals.includes(day))
      holidayCount++;
  });

  return { weekendCount, holidayCount };
};

const randomDays = generateRandomDaysArray(20);
console.log("Згенерований масив днів:", randomDays);
const { weekendCount, holidayCount } = countDays(randomDays);
console.log(`Кількість вихідних днів: ${weekendCount}`);
console.log(`Кількість святкових днів: ${holidayCount}`);
console.log(
  `Результат порівняння: ${
    weekendCount === holidayCount
      ? "Порівну вихідних і святкових"
      : weekendCount > holidayCount
      ? "Більше вихідних"
      : "Більше святкових"
  }`
);

// =========================================================

// Задача 5. Дано набір налаштувань(ключ - значення(enabled / disabled)).
// Вивести ті, які є увімкненими
// ! Розв'язання
enum SettingStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

type Settings = {
  [key: string]: SettingStatus;
};

const settings: Settings = {
  notifications: SettingStatus.Enabled,
  darkMode: SettingStatus.Disabled,
  autoUpdate: SettingStatus.Enabled,
  wifi: SettingStatus.Disabled,
  gps: SettingStatus.Enabled,
  nfc: SettingStatus.Disabled,
};

const getEnabledSettings = (settings: Settings): string[] => {
  const enabledSettings: string[] = [];

  for (const key in settings) {
    if (settings[key] === SettingStatus.Enabled) {
      enabledSettings.push(key);
    }
  }

  return enabledSettings;
};

const enabledSettings = getEnabledSettings(settings);
console.log("Увімкнені налаштування такі:", enabledSettings);

// =========================================================

// Задача 6. Дано масив маркерів на карті[lat, long, city].
// Визначити найближче місто до вказаних координат
//! Розв'язання
if (confirm("Запустити задачу?")) {
  type Marker = [number, number, string];

  function getMarkersList(markersNumber: number): Marker[] {
    const markersList: Marker[] = [];
    for (let i = 0; i < markersNumber; i++) {
      const data = prompt("Введіть координати і назву через пробіл")!.split(
        " "
      );
      markersList.push([Number(data[0]), Number(data[1]), data[2]]);
    }
    return markersList;
  }

  function geClosestPlace(
    lat: number,
    long: number,
    markersList: Marker[]
  ): Marker[] {
    let closestDistance = Infinity;

    const closestMarkers: Marker[] = [];
    markersList.forEach((marker) => {
      const distance = Math.sqrt(
        Math.pow(marker[0] - lat, 2) + Math.pow(marker[1] - long, 2)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMarkers.length = 0;
        closestMarkers.push(marker);
      } else if (distance === closestDistance) {
        closestMarkers.push(marker);
      }
    });
    return closestMarkers;
  }

  const markersList: Marker[] = getMarkersList(3);

  const userLat: number = parseFloat(prompt("Введіть широту:", "20") || "0");
  const userLong: number = parseFloat(prompt("Введіть довготу:", "30") || "0");

  if (isNaN(userLat) || isNaN(userLong)) {
    throw new Error("Некоректно введені данні.");
  }

  const closestMarkers: Marker[] = geClosestPlace(
    userLat,
    userLong,
    markersList
  );
  console.log("Найближчe місто до вказаних координат:", closestMarkers);
}

// =========================================================

// Задача 7. Згенерувати масив нагород(золота, срібна, бронзова медалі та грамота).
// Підрахувати кількість кожної з нагород.Використати enum.
// Можете і never якось застосувати
//! Розв'язання
enum Award {
  Gold = "Золота медаль",
  Silver = "Срібна медаль",
  Bronze = "Бронзова медаль",
  Certificate = "Грамота",
}

const getRandomAwardsArray = (length: number): Award[] => {
  const awardsArray: Award[] = [];

  const awardValues = Object.values(Award);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * awardValues.length);
    awardsArray.push(awardValues[randomIndex]);
  }

  return awardsArray;
};

const countAwards = (awardsArray: Award[]) => {
  const awardCount = {
    [Award.Gold]: 0,
    [Award.Silver]: 0,
    [Award.Bronze]: 0,
    [Award.Certificate]: 0,
  };

  awardsArray.forEach((award) => {
    switch (award) {
      case Award.Gold:
        awardCount[Award.Gold]++;
        break;
      case Award.Silver:
        awardCount[Award.Silver]++;
        break;
      case Award.Bronze:
        awardCount[Award.Bronze]++;
        break;
      case Award.Certificate:
        awardCount[Award.Certificate]++;
        break;
      default:
        const _exhaustiveCheck: never = award;
        throw new Error("Некоректна нагорода.");
    }
  });

  return awardCount;
};

const randomAwards = getRandomAwardsArray(15);
console.log("Згенерований список нагород:", randomAwards);
const awardCount = countAwards(randomAwards);
console.table(awardCount);
