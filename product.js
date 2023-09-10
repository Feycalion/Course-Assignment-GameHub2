const id = new URLSearchParams(window.location.search).get("id");

const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

async function getGames() {
  const response = await fetch(url);
  const result = await response.json();

  productDetails(result);
}

const gameContainer = document.querySelector(".product-container");

function productDetails(info) {
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
