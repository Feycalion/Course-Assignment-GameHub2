// https://api.noroff.dev/api/v1/gamehub

const url = "http://flower-power.local/wp-json/wc/store/products";

async function getGames() {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  printGames(result);
}

getGames();

const gameContainer = document.querySelector(".result-container");

function printGames(info) {
  const resultsContainer = document.querySelector(".result-container");
  resultsContainer.innerHTML = "";

  for (let i = 0; i < info.length; i++) {
    console.log(info[i]);
    const container = document.createElement("div");
    container.classList.add("container");

    const productLink = document.createElement("a");
    productLink.href = `product.html?id=${info[i].id}`;
    container.appendChild(productLink);

    resultsContainer.appendChild(container);

    // title
    const gameTitle = document.createElement("h1");
    gameTitle.innerText = info[i].name;
    gameTitle.classList.add("txtstyle");
    container.appendChild(gameTitle);

    // image
    const gameImage = document.createElement("img");
    gameImage.src = info[i].images[0].src;
    gameImage.classList.add("imgstyle");
    productLink.appendChild(gameImage);

    gameImage.addEventListener("click", () => {});

    // description
    const gameDesc = document.createElement("p");
    gameDesc.innerHTML = info[i].description;
    gameDesc.classList.add("txtstyle");
    container.appendChild(gameDesc);

    // age rating
    const ageRating = document.createElement("p");
    ageRating.innerText =
      info[i].attributes[1].name + ": " + info[i].attributes[1].terms[0].name;
    ageRating.classList.add("txtstyle");
    container.appendChild(ageRating);

    // genre
    const gameGenre = document.createElement("p");
    gameGenre.innerText = "Genre: " + info[i].categories[0].name;
    gameGenre.classList.add("txtstyle");
    container.appendChild(gameGenre);

    // release date
    const gameRelease = document.createElement("p");
    gameRelease.innerText =
      info[i].attributes[0].name + ": " + info[i].attributes[0].terms[0].name;
    gameRelease.classList.add("txtstyle");
    container.appendChild(gameRelease);

    // price container
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("pricing");
    container.appendChild(priceContainer);

    if (info[i].on_sale === true) {
      // price
      const gamePrice = document.createElement("p");
      const priceString = info[i].prices.regular_price;
      const decimalSeparator = info[i].prices.currency_decimal_separator;
      const wholePart = priceString.slice(0, -2);
      const decimalPart = priceString.slice(-2);
      gamePrice.innerText = `${info[i].prices.currency_prefix}${wholePart}${decimalSeparator}${decimalPart}`;
      gamePrice.classList.add("txtstyle-discount");
      priceContainer.appendChild(gamePrice);

      // sale
      const gameSalePrice = document.createElement("p");
      const salePriceValue = info[i].prices.sale_price;
      const saleWholePart = salePriceValue.slice(0, -2);
      const saleDecimalPart = salePriceValue.slice(-2);
      gameSalePrice.innerText = `${info[i].prices.currency_prefix}${saleWholePart}${decimalSeparator}${saleDecimalPart}`;
      gameSalePrice.classList.add("txtstyle");
      priceContainer.appendChild(gameSalePrice);
    } else {
      // not on sale
      const gamePrice = document.createElement("p");
      const priceString = info[i].prices.regular_price;
      const decimalSeparator = info[i].prices.currency_decimal_separator;
      const wholePart = priceString.slice(0, -2);
      const decimalPart = priceString.slice(-2);
      gamePrice.innerText = `${info[i].prices.currency_prefix}${wholePart}${decimalSeparator}${decimalPart}`;
      gamePrice.classList.add("txtstyle-discount");
      priceContainer.appendChild(gamePrice);
    }
  }
}
