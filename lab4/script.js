m.sort((a, b) => a.name.localeCompare(b.name, "ru"));

const template = document.querySelector("#foodbl");
const templateContent = template.content;

const soupsContainer = document.querySelector(".soup_container");
const mainContainer = document.querySelector(".main_container");
const drinkContainer = document.querySelector(".drink_container");

for (let index = 0; index < m.length; index++) {
  const foodcart = templateContent.cloneNode(true);
  const { keyword, name, price, image, count, category } = m[index];
  foodcart.querySelector("img").src = image;
  foodcart.querySelector(".price").textContent = `${price} ₽`;
  foodcart.querySelector(".name").textContent = name;
  foodcart.querySelector(".weight").textContent = count;
  foodcart.querySelector(".dish").dataset.dish = keyword;
  if (category === "soup") {
    soupsContainer.appendChild(foodcart);
  }
  if (category === "main") {
    mainContainer.appendChild(foodcart);
  }
  if (category === "drink") {
    drinkContainer.appendChild(foodcart);
  }
}

const order = {
  soup: null,
  main: null,
  drink: null,
};

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
    orderEmpty.hidden = true;
    orderSoup.hidden = false;
    soupHeading.hidden = false;
    orderMain.hidden = false;
    mainHeading.hidden = false;
    orderDrink.hidden = false;
    drinkHeading.hidden = false;
    orderTotal.hidden = false;
    totalHeading.hidden = false;
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

    container.querySelectorAll(".selected").forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

    const soupPrice = order.soup ? order.soup.price : 0;
    const mainPrice = order.main ? order.main.price : 0;
    const drinkPrice = order.drink ? order.drink.price : 0;

    const totalPrice = soupPrice + mainPrice + drinkPrice;

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
  setTimeout(() => {
    selectedSoup.value = "";
    selectedMain.value = "";
    selectedDrink.value = "";
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
});
