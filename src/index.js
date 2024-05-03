import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

import {
  createCard,
  handleCardAdd,
  deleteCard,
  likeCount,
} from "./components/card.js";

import { openModal, closeIt, keyPress, popUps } from "./components/modal.js";

// @todo: DOM узлы

// @todo: Темплейт карточки

export const mainContent = document.querySelector(".content");

export const placesContainer = mainContent.querySelector(".places__list");

const addButton = mainContent.querySelector(".profile__add-button");

export const cardTemplate = document.querySelector("#card-template").content;

const cardImage = document.querySelector(".card__image");
const cardDescription = document.querySelector(".card__description");
const cardName = document.querySelector(".card__title");

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
  placesContainer.append(createCard(card, deleteCard, likeCount, imageOpen));
});

// Обработчик открытия окна новой карточки

export const popupNewCard = document.querySelector(".popup_type_new-card");

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

// addButton.addEventListener("click", function () {
//   popupNewCard.classList.add("popup_is-opened");

//   document.addEventListener("keydown", keyPress);
// });

// Обработчик добавления новой карточки

popupNewCard.addEventListener("submit", handleCardAdd);

// Профиль

const popupEditProfile = document.querySelector(".popup_type_edit");

const editButton = document.querySelector(".profile__edit-button");

// Функция открытия профиля

editButton.addEventListener("click", function () {
  nameInput.value = document.querySelector(".profile__title").textContent;

  jobInput.value = document.querySelector(".profile__description").textContent;

  openModal(popupEditProfile);
  // popupEditProfile.classList.add("popup_is-opened");
  // document.addEventListener("keydown", keyPress);
});

// Функция редактирования профиля

const formElement = popupEditProfile.querySelector(".popup__form");

const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__description");

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closeIt();
}

formElement.addEventListener("submit", handleFormSubmit);

// Открытие попапа с картинкой

export const popUpImage = document.querySelector(".popup_type_image");

// const places = document.querySelector(".places");

// places.addEventListener("click", imageOpen);

export function imageOpen(event) {
  document.addEventListener("keydown", keyPress);

  if (event.target.classList.contains("card__image")) {
    openModal(popUpImage);
    // popUpImage.classList.add("popup_is-opened");

    popUpImage.querySelector(".popup__image").src = event.target.src;
    popUpImage.querySelector(".popup__caption").textContent = event.target.alt;
    popUpImage.querySelector(".popup__image").alt = event.target.alt;
  }
}

//  info for cheking newcard adding
// Neapol
// https://images.unsplash.com/photo-1600602499670-fdd9275255a5?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
