m.sort((a, b) => a.name.localeCompare(b.name, "ru"));

const template = document.querySelector("#foodbl");
const templateContent = template.content;

const soupsContainer = document.querySelector(".soup_container");
const mainContainer = document.querySelector(".main_container");
const drinkContainer = document.querySelector(".drink_container");
const starterContainer = document.querySelector(".starter_container");
const dessertContainer = document.querySelector(".dessert_container");

for (let index = 0; index < m.length; index++) {
  const foodcart = templateContent.cloneNode(true);
  const { keyword, name, price, image, count, category, kind } = m[index];
  foodcart.querySelector("img").src = image;
  foodcart.querySelector(".price").textContent = `${price} ₽`;
  foodcart.querySelector(".name").textContent = name;
  foodcart.querySelector(".weight").textContent = count;
  foodcart.querySelector(".dish").dataset.dish = keyword;
  foodcart.querySelector(".dish").dataset.kind = kind;
  if (category === "soup") {
    soupsContainer.appendChild(foodcart);
  }
  if (category === "main") {
    mainContainer.appendChild(foodcart);
  }
  if (category === "drink") {
    drinkContainer.appendChild(foodcart);
  }
  if (category === "starter") {
    starterContainer.appendChild(foodcart);
  }
  if (category === "dessert") {
    dessertContainer.appendChild(foodcart);
  }
}

const order = {
  soup: null,
  main: null,
  drink: null,
  starter: null,
  dessert: null,
};

const filterButtons = document.querySelectorAll(".filters button");
const buttons = document.querySelectorAll(".dish button");
const orderTotal = document.querySelector(".order-total");
const totalHeading = document.querySelector(".total-heading");
const orderEmpty = document.querySelector(".order-empty");
const orderSoup = document.querySelector(".order-soup");
const soupHeading = document.querySelector(".soup-heading");
const selectedSoup = document.querySelector("#selected-soup");
const orderMain = document.querySelector(".order-main");
const mainHeading = document.querySelector(".main-heading");
const selectedMain = document.querySelector("#selected-main");
const orderDrink = document.querySelector(".order-drink");
const drinkHeading = document.querySelector(".drink-heading");
const selectedDrink = document.querySelector("#selected-drink");
const orderStarter = document.querySelector(".order-starter");
const starterHeading = document.querySelector(".starter-heading");
const selectedStarter = document.querySelector("#selected-starter");
const orderDessert = document.querySelector(".order-dessert");
const dessertHeading = document.querySelector(".dessert-heading");
const selectedDessert = document.querySelector("#selected-dessert");

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const section = button.parentElement;
    const cards = section.nextElementSibling.querySelectorAll(".dish");
    const kind = button.dataset.kind;

    const wasActive = button.classList.contains("active");

    section.querySelectorAll("button").forEach((item) => {
      item.classList.remove("active");
    });

    if (!wasActive) {
      button.classList.add("active");
    }

    cards.forEach((card) => {
      if (wasActive) {
        card.hidden = false;
      } else {
        card.hidden = card.dataset.kind !== kind;
      }
    });

    console.log("Выбран фильтр:", kind);
  });
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    const card = button.closest(".dish");
    const container = card.parentElement;
    const dish = m.find((item) => item.keyword === card.dataset.dish);

    order[dish.category] = dish;
    if (order.soup) {
      selectedSoup.value = order.soup.keyword;
    }
    if (order.main) {
      selectedMain.value = order.main.keyword;
    }
    if (order.drink) {
      selectedDrink.value = order.drink.keyword;
    }
    if (order.starter) {
      selectedStarter.value = order.starter.keyword;
    }
    if (order.dessert) {
      selectedDessert.value = order.dessert.keyword;
    }
    orderEmpty.hidden = true;
    orderSoup.hidden = false;
    soupHeading.hidden = false;
    orderMain.hidden = false;
    mainHeading.hidden = false;
    orderDrink.hidden = false;
    drinkHeading.hidden = false;
    orderTotal.hidden = false;
    totalHeading.hidden = false;
    orderStarter.hidden = false;
    starterHeading.hidden = false;
    orderDessert.hidden = false;
    dessertHeading.hidden = false;
    if (order.soup) {
      orderSoup.textContent = `${order.soup.name} ${order.soup.price} ₽`;
    } else {
      orderSoup.textContent = "Блюдо не выбрано";
    }

    if (order.main) {
      orderMain.textContent = `${order.main.name} ${order.main.price} ₽`;
    } else {
      orderMain.textContent = "Блюдо не выбрано";
    }

    if (order.drink) {
      orderDrink.textContent = `${order.drink.name} ${order.drink.price} ₽`;
    } else {
      orderDrink.textContent = "Напиток не выбран";
    }

    if (order.starter) {
      orderStarter.textContent = `${order.starter.name} ${order.starter.price} ₽`;
    } else {
      orderStarter.textContent = "Салат или стартер не выбран";
    }

    if (order.dessert) {
      orderDessert.textContent = `${order.dessert.name} ${order.dessert.price} ₽`;
    } else {
      orderDessert.textContent = "Десерт не выбран";
    }

    container.querySelectorAll(".selected").forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

    const soupPrice = order.soup ? order.soup.price : 0;
    const mainPrice = order.main ? order.main.price : 0;
    const drinkPrice = order.drink ? order.drink.price : 0;
    const starterPrice = order.starter ? order.starter.price : 0;
    const dessertPrice = order.dessert ? order.dessert.price : 0;

    const totalPrice =
      soupPrice + mainPrice + drinkPrice + starterPrice + dessertPrice;

    orderTotal.textContent = `${totalPrice} ₽`;

    console.log(totalPrice);
  });
}

console.log(buttons.length);

const form = document.querySelector("form");

form.addEventListener("reset", () => {
  order.soup = null;
  order.main = null;
  order.drink = null;
  order.starter = null;
  order.dessert = null;
  setTimeout(() => {
    selectedSoup.value = "";
    selectedMain.value = "";
    selectedDrink.value = "";
    selectedStarter.value = "";
    selectedDessert.value = "";
  }, 0);
  document.querySelectorAll(".selected").forEach((card) => {
    card.classList.remove("selected");
  });

  orderEmpty.hidden = false;
  orderSoup.hidden = true;
  soupHeading.hidden = true;
  orderMain.hidden = true;
  mainHeading.hidden = true;
  orderDrink.hidden = true;
  drinkHeading.hidden = true;
  orderTotal.hidden = true;
  totalHeading.hidden = true;
  orderStarter.hidden = true;
  starterHeading.hidden = true;
  orderDessert.hidden = true;
  dessertHeading.hidden = true;
});
