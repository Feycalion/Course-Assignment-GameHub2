const id = new URLSearchParams(window.location.search).get("id");

async function getGames() {
  const url = "https://api.noroff.dev/api/v1/gamehub/" + id;
  const response = await fetch(url);
  const result = await response.json();

  productDetails(result);
}

function productDetails(info) {
  const gameContainer = document.querySelector(".product-container");

  const gameTitle = document.getElementById("product-title");
  const gameImage = document.getElementById("product-image");
  const gameDesc = document.getElementById("product-description");
  const gamePrice = document.getElementById("product-price");
  const gameDiscount = document.getElementById("product-discount");

  gameTitle.innerText = info.title;
  gameImage.src = info.image;
  gameImage.alt = "Cover of " + info.title;
  gameDesc.innerText = info.description;
  gamePrice.innerText = info.price;
  gameDiscount.innerText = info.discountedPrice;

  gameImage.classList.add("imgstyle");
  gamePrice.classList.add("txtstyle-discount");
  gameDiscount.classList.add("txtstyle");
}

getGames();

// Cart indicator

let cartItemCount = localStorage.getItem("cartItemCount")
  ? parseInt(localStorage.getItem("cartItemCount"))
  : 0;
const cartIndicator = document.getElementById("cart-indicator");
const boxBackground = document.querySelector("rect");

function addToCart() {
  cartItemCount++;
  updateCartIndicator();
}

function updateCartIndicator() {
  const indicator = document.getElementById("cart-indicator");
  indicator.textContent = cartItemCount > 0 ? cartItemCount.toString() : "";
  cartIndicator.style.opacity = cartItemCount > 0 ? 1 : 0;
  boxBackground.style.opacity = cartItemCount > 0 ? 1 : 0;

  localStorage.setItem("cartItemCount", cartItemCount.toString());
}

window.onload = () => {
  updateCartIndicator();
};

const addToCartButton = document.querySelector(".atcbutton");
addToCartButton.addEventListener("click", addToCart);

// Toggle favorite games

let heartFilled = localStorage.getItem("heartFilled") === "true";

const fillPath = document.getElementById("heart-fill");
if (heartFilled) {
  fillPath.setAttribute("fill", "white");
} else {
  fillPath.setAttribute("fill", "none");
}

function toggleHeartFill() {
  if (!heartFilled) {
    fillPath.setAttribute("fill", "white");
    heartFilled = true;
  } else {
    fillPath.setAttribute("fill", "none");
    heartFilled = false;
  }

  localStorage.setItem("heartFilled", heartFilled);
}

/*let heartFilled = false;


function toggleHeartFill() {
  const fillPath = document.getElementById("heart-fill");
  const outlinePath = document.getElementById("heart-outline");

  if (!heartFilled) {
    fillPath.setAttribute("fill", "white");
    heartFilled = true;
  } else {
    fillPath.setAttribute("fill", "none");
    heartFilled = false;
  }
}
*/
