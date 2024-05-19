// Функция открытия карточки

export function openModal(window) {
  // const form = window.querySelector(validationConfig.formSelector);
  // if (window.querySelector(validationConfig.inputSelector)) {
  //   clearValidation(form, validationConfig);
  // }
  window.classList.add("popup_is-opened");

  document.addEventListener("keydown", keyPress);
}

// Логика закрытия попапов

export function closeModal(window) {
  window.classList.add("popup_is-animated");

  window.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", keyPress);
}

// Закрытие попапов при нажатии Esc

export function keyPress(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closeModal(openedPopUp);
  }
}

// Закрытие попапов при нажатии оверлея либо кнопки закрытия

export function closePopupByOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}
