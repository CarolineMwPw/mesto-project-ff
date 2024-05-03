// Функция открытия карточки

import { popUpImage, imageOpen } from "..";

export function openModal(window) {
  window.classList.add("popup_is-opened");

  document.addEventListener("keydown", keyPress);
}

// Логика закрытия попапов

export function closeIt() {
  document.querySelector(".popup_is-opened").classList.add("popup_is-animated");

  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");

  document.removeEventListener("keydown", keyPress);
}

// Закрытие попапов при нажатии Esc

export function keyPress(evt) {
  if (evt.key === "Escape") {
    closeIt();
  }
}

// Выбор попапов для функции закрытия при нажатии оверлея либо кнопки закрытия

export const popUps = document.querySelectorAll(".popup");

// Закрытие попапов при нажатии оверлея либо кнопки закрытия

popUps.forEach(function (popUp) {
  popUp.addEventListener("click", function (evt) {
    if (
      evt.target === popUp ||
      evt.target === popUp.querySelector(".popup__close")
      // evt.target.style.hasOwnProperty("backgroundColor") ||
      // evt.contains(".popup__close")
    ) {
      closeIt(popUp);
    }
  });
});
