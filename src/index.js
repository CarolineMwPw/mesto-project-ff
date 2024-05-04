import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

import { createCard, deleteCard, toggleLike } from "./components/card.js";

import {
  openModal,
  closeModal,
  keyPress,
  closePopupByOverlay,
} from "./components/modal.js";

// @todo: DOM узлы

// @todo: Темплейт карточки

export const mainContent = document.querySelector(".content");

export const placesContainer = mainContent.querySelector(".places__list");

const addButton = mainContent.querySelector(".profile__add-button");

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
  placesContainer.append(createCard(card, deleteCard, toggleLike, openImage));
});

// Обработчик открытия окна новой карточки

export const popupNewCard = document.querySelector(".popup_type_new-card");

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

// Обработчик добавления новой карточки

popupNewCard.addEventListener("submit", handleCardAdd);

// Функция добавления новой карточки

export function handleCardAdd(evt) {
  evt.preventDefault();
  const cardName = popupNewCard.querySelector(".popup__input_type_card-name");
  const cardLink = popupNewCard.querySelector(".popup__input_type_url");
  const newCard = {
    name: cardName.value,
    link: cardLink.value,
  };

  placesContainer.prepend(
    createCard(newCard, deleteCard, toggleLike, openImage)
  );

  evt.target.reset();

  const openedPopUp = document.querySelector(".popup_is-opened");

  closeModal(openedPopUp);
}

// Профиль

const popupEditProfile = document.querySelector(".popup_type_edit");

const editButton = document.querySelector(".profile__edit-button");

// Функция открытия профиля

editButton.addEventListener("click", function () {
  nameInput.value = document.querySelector(".profile__title").textContent;

  jobInput.value = document.querySelector(".profile__description").textContent;

  openModal(popupEditProfile);
});

// Функция редактирования профиля

const formProfile = popupEditProfile.querySelector(".popup__form");

const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_description");

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__description");

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  const openedPopUp = document.querySelector(".popup_is-opened");

  closeModal(openedPopUp);
}

formProfile.addEventListener("submit", handleFormProfileSubmit);

// Открытие попапа с картинкой

export const popUpImage = document.querySelector(".popup_type_image");

export function openImage(event) {
  // if (event.target.classList.contains("card__image")) {
  openModal(popUpImage);

  popUpImage.querySelector(".popup__image").src = event.target.src;
  popUpImage.querySelector(".popup__caption").textContent = event.target.alt;
  popUpImage.querySelector(".popup__image").alt = event.target.alt;
  // }
}

// Выбор попапов для функции закрытия при нажатии оверлея либо кнопки закрытия

const popUps = document.querySelectorAll(".popup");

popUps.forEach(function (popUp) {
  popUp.addEventListener("click", closePopupByOverlay);
});

//  info for cheking newcard adding
// Neapol
// https://images.unsplash.com/photo-1600602499670-fdd9275255a5?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
