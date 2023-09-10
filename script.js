const url = "https://api.noroff.dev/api/v1/gamehub";

async function getGames() {
  const response = await fetch(url);
  const result = await response.json();

  printGames(result);
}

getGames();

const gameContainer = document.querySelector(".result-container");

function printGames(info) {
  const resultsContainer = document.querySelector(".result-container");
  resultsContainer.innerHTML = "";
  for (let i = 0; i < info.length; i++) {
    const container = document.createElement("div");
    container.classList.add("container");

    const productLink = document.createElement("a");
    productLink.href = `product.html?id=${info[i].id}`;
    container.appendChild(productLink);

    resultsContainer.appendChild(container);

    // title
    const gameTitle = document.createElement("h1");
    gameTitle.innerText = info[i].title;
    gameTitle.classList.add("txtstyle");
    container.appendChild(gameTitle);

    // image
    const gameImage = document.createElement("img");
    gameImage.src = info[i].image;
    gameImage.classList.add("imgstyle");
    productLink.appendChild(gameImage);

    gameImage.addEventListener("click", () => {});

    // description
    const gameDesc = document.createElement("p");
    gameDesc.innerText = info[i].description;
    gameDesc.classList.add("txtstyle");
    container.appendChild(gameDesc);

    // age rating
    const ageRating = document.createElement("p");
    ageRating.innerText = info[i].ageRating;
    ageRating.classList.add("txtstyle");
    container.appendChild(ageRating);

    // const fav = document.createElement("div");
    // fav.innerText = info[i].favorite;
    // resultsContainer.appendChild(fav);

    // genre
    const gameGenre = document.createElement("p");
    gameGenre.innerText = "Genre: " + info[i].genre;
    gameGenre.classList.add("txtstyle");
    container.appendChild(gameGenre);

    // release date
    const gameRelease = document.createElement("p");
    gameRelease.innerText = "Release date: " + info[i].released;
    gameRelease.classList.add("txtstyle");
    container.appendChild(gameRelease);

    // price container

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("pricing");
    container.appendChild(priceContainer);

    // price
    const gamePrice = document.createElement("p");
    gamePrice.innerText = info[i].price;
    gamePrice.classList.add("txtstyle-discount");
    priceContainer.appendChild(gamePrice);

    // discount
    const gameDiscount = document.createElement("p");
    gameDiscount.innerText = info[i].discountedPrice;
    gameDiscount.classList.add("txtstyle");
    priceContainer.appendChild(gameDiscount);
  }
}
