"use strict";

const smallImages = document.querySelectorAll(".small-image img");
const mainImages = document.querySelectorAll(".main-image");
const increaseButton = document.querySelector(".increase");
const decreaseButton = document.querySelector(".decrease");
const productsNumber = document.querySelector(".number-of-products");
const cartMenu = document.querySelector(".cart-menu");
const cartIcon = document.querySelector(".cart-icon");
const addButton = document.querySelector(".add");
const numberOfProductsInIcon = document.querySelector(
  ".number-of-products-in-icon"
);
const bigImages = document.querySelectorAll(".main-image");
const backdrop = document.querySelector(".backdrop");
const imageSlider = document.querySelector(".image-slider");
const body = document.querySelector(".body");
const closeButton = document.querySelector(".close");
const bigImageInSlider = Array.from(
  document.querySelectorAll(".main-image-in-slider")
);
const smallImageInSlider = Array.from(
  document.querySelectorAll(".small-image-in-slider img")
);
const sliderLeft = document.querySelector(".slider-left");
const sliderRight = document.querySelector(".slider-right");
const cartEmpty = document.querySelector(".cart-empty");
const cartHaveItems = document.querySelector(".cart-have-items");
const quantityOfItems = document.querySelector(".quantity-of-items");
const totalPrice = document.querySelector(".total-price");
const iconDelete = document.querySelector(".icon-for-delete");

let numberOfProducts = 0;
let theRealNumberOfProducts = 0;
let currentSlide = 1;

init();

smallImages.forEach((image) => {
  image.addEventListener("click", showBigImage);
});

function showBigImage(event) {
  smallImages.forEach((image) => {
    image.classList.remove("active");
  });

  mainImages.forEach((image) => {
    image.classList.remove("activeImage");
  });

  event.target.classList.add("active");

  mainImages.forEach((image) => {
    if (image.dataset.id === event.target.dataset.id) {
      image.classList.add("activeImage");
    }
  });
}

increaseButton.addEventListener("click", () => {
  numberOfProducts++;
  productsNumber.innerHTML = numberOfProducts;
});

decreaseButton.addEventListener("click", () => {
  if (numberOfProducts != 0) {
    numberOfProducts--;
    productsNumber.innerHTML = numberOfProducts;
  }
});

cartIcon.addEventListener("click", () => {
  cartMenu.classList.toggle("active");

  if (theRealNumberOfProducts > 0) {
    cartEmpty.classList.remove("activeee");
    cartHaveItems.classList.add("activeee");
  } else {
    cartEmpty.classList.add("activeee");
    cartHaveItems.classList.remove("activeee");
  }
});

addButton.addEventListener("click", () => {
  countNumberOfProducts();
  numberOfProductsInIcon.innerHTML = theRealNumberOfProducts;
  numberOfProducts = 0;
  productsNumber.innerHTML = 0;

  quantityOfItems.innerHTML = theRealNumberOfProducts;
  totalPrice.innerHTML = `$${theRealNumberOfProducts * 125}`;
  cartMenu.classList.remove("active");
  setItemsToLocalStorage();
});

function countNumberOfProducts() {
  theRealNumberOfProducts += numberOfProducts;
}

bigImages.forEach((image) => {
  image.addEventListener("click", () => {
    backdrop.classList.add("activee");
    imageSlider.classList.add("activee");
    body.classList.add("onSlider");
  });
});

closeButton.addEventListener("click", () => {
  backdrop.classList.remove("activee");
  imageSlider.classList.remove("activee");
  body.classList.remove("onSlider");
});

sliderLeft.addEventListener("click", () => {
  if (currentSlide === 1) {
    return;
  }

  currentSlide--;
  bigImageInSlider.forEach((image) => {
    image.classList.remove("activeImageInSlider");
  });

  smallImageInSlider.forEach((image) => {
    image.classList.remove("active-in-slider");
  });

  bigImageInSlider[currentSlide - 1].classList.add("activeImageInSlider");
  smallImageInSlider[currentSlide - 1].classList.add("active-in-slider");
});

sliderRight.addEventListener("click", () => {
  if (currentSlide === bigImageInSlider.length) {
    return;
  }

  currentSlide++;
  bigImageInSlider.forEach((image) => {
    image.classList.remove("activeImageInSlider");
  });

  smallImageInSlider.forEach((image) => {
    image.classList.remove("active-in-slider");
  });

  bigImageInSlider[currentSlide - 1].classList.add("activeImageInSlider");
  smallImageInSlider[currentSlide - 1].classList.add("active-in-slider");
});

function setItemsToLocalStorage() {
  localStorage.setItem("numberOfItems", theRealNumberOfProducts);
}

function init() {
  let ourItems = +localStorage.getItem("numberOfItems");
  console.log(ourItems);
  theRealNumberOfProducts = ourItems;
  numberOfProductsInIcon.innerHTML = theRealNumberOfProducts;
  quantityOfItems.innerHTML = theRealNumberOfProducts;
  totalPrice.innerHTML = `$${theRealNumberOfProducts * 125}`;
}

iconDelete.addEventListener("click", () => {
  theRealNumberOfProducts = 0;
  localStorage.setItem("numberOfItems", theRealNumberOfProducts);
  numberOfProductsInIcon.innerHTML = 0;
  cartEmpty.classList.add("activeee");
  cartHaveItems.classList.remove("activeee");
});
