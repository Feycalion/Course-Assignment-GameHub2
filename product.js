const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getProductById(productID) {
  const url = "http://flower-power.local/wp-json/wc/store/products/" + id;
  const response = await fetch(url);
  const result = await response.json();

  productDetails(result);
}

function productDetails(info) {
  const gameTitle = document.getElementById("product-title");
  const gameImage = document.getElementById("product-image");
  const gameDesc = document.getElementById("product-description");
  const gameGenre = document.getElementById("product-genre");
  const ageRating = document.getElementById("product-rating");
  const gameRelease = document.getElementById("product-release");
  const gamePrice = document.getElementById("product-price");
  const gameSalePrice = document.getElementById("product-discount");

  const decimalSeparator = info.prices.currency_decimal_separator;

  gameTitle.innerText = info.name;
  gameImage.src = info.images[0].src;
  gameImage.alt = "Cover of " + info.name;
  gameDesc.innerHTML = info.description;
  gameGenre.innerText = "Genre: " + info.categories[0].name;
  ageRating.innerText =
    info.attributes[1].name + ": " + info.attributes[1].terms[0].name;
  gameRelease.innerText =
    info.attributes[0].name + ": " + info.attributes[0].terms[0].name;

  if (info.on_sale === true) {
    gamePrice.innerText = `${
      info.prices.currency_prefix
    }${info.prices.regular_price.slice(
      0,
      -2
    )}${decimalSeparator}${info.prices.price.slice(-2)}`;
    gameSalePrice.innerText = `${
      info.prices.currency_prefix
    }${info.prices.sale_price.slice(
      0,
      -2
    )}${decimalSeparator}${info.prices.sale_price.slice(-2)}`;
  } else {
    gamePrice.innerText = `${
      info.prices.currency_prefix
    }${info.prices.price.slice(
      0,
      -2
    )}${decimalSeparator}${info.prices.price.slice(-2)}`;
    gameSalePrice.style.display = "none";
  }

  gameImage.classList.add("imgstyle");
  gamePrice.classList.add("txtstyle-discount");
  gameSalePrice.classList.add("txtstyle");
}

getProductById(id);

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
