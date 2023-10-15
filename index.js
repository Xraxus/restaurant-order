import menuArray from "./data.js";

const menuContainer = document.getElementById("menu-container");
const orderItemsContainer = document.getElementById("order-items-container");
const orderTotalPriceNum = document.getElementById("order-total-price-num");
const completeBtn = document.getElementById("complete-btn");
const paymentModal = document.getElementById("payment-modal");
const thanksNote = document.getElementById("thanks-note");
const paymentForm = document.getElementById("payment-form");

const userOrderArr = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.itemId) {
    addToUserOrder(e.target.dataset.itemId);
  } else if (e.target.dataset.removalOrderPosition) {
    removeFromUserOrder(e.target.dataset.removalOrderPosition);
  } else if (e.target === completeBtn) {
    toggleModal();
    thanksNote.classList.add("hidden");
  }
});

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  toggleModal();
  clearOrder();
  renderThanksNote(document.getElementById("client-name").value);
});

function addToUserOrder(itemId) {
  const selectedItem = menuArray.find((element) => element.id === +itemId);
  if (selectedItem) {
    userOrderArr.push(selectedItem);
    renderOrderItems();
  }
}

function removeFromUserOrder(orderPosition) {
  userOrderArr.splice(orderPosition, 1);
  renderOrderItems();
}

function renderMenuItems() {
  menuArray.forEach((item) => {
    menuContainer.innerHTML += `
      <div class="menu-item">
        <div class="menu-item-emoji">${item.emoji}</div>
        <div class="menu-item-desc">
          <h2>${item.name}</h2>
          <p class="ingredients-text">${item.ingredients.join(", ")}</p>
          <p class="price">$${item.price}</p>
        </div>
        <i class="fa-solid fa-plus add-btn" data-item-id="${item.id}"></i>
      </div>
    `;
  });
}

function renderOrderItems() {
  const orderContainer = document.getElementById("order-container");
  let orderPriceSum = 0;
  orderItemsContainer.innerHTML = "";
  userOrderArr.forEach((item, index) => {
    orderItemsContainer.innerHTML += `
    <div class="order-item">
      <p>${item.name}</p>
      <p data-removal-order-position="${index}">remove</p>
      <p>$${item.price}</p>
    </div>
    `;
    orderPriceSum += item.price;
  });
  if (userOrderArr.length) orderContainer.classList.remove("hidden");
  else orderContainer.classList.add("hidden");
  orderTotalPriceNum.innerText = `$${orderPriceSum}`;
}

function toggleModal() {
  paymentModal.classList.toggle("hidden");
}

function renderThanksNote(name) {
  thanksNote.innerHTML = `
  Thanks, ${name}! Your order is on its way!`;
  thanksNote.classList.remove("hidden");
}

function clearOrder() {
  console.log("Jajo");
  userOrderArr.splice(0, userOrderArr.length);
  renderOrderItems();
}

renderMenuItems();
