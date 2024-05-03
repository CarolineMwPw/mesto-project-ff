// @todo: Функция создания карточки

import {
  mainContent,
  placesContainer,
  cardTemplate,
  popupNewCard,
  popUpImage,
  imageOpen,
} from "..";

import { closeIt } from "./modal";

export function createCard(card, deleteCard, likeCount, imageOpen) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  cardItem.querySelector(".card__image").src = card.link;
  cardItem.querySelector(".card__image").alt = card.name.toUpperCase();

  cardItem.querySelector(".card__title").textContent = card.name;

  const delButton = cardItem.querySelector(".card__delete-button");

  delButton.addEventListener("click", deleteCard);

  placesContainer.addEventListener("click", likeCount);

  placesContainer.addEventListener("click", imageOpen);

  return cardItem;
}

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
    createCard(newCard, deleteCard, likeCount, imageOpen)
  );
  cardLink.value = "";
  cardName.value = "";
  closeIt(evt.target);
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
  evt.target.closest("li").remove();
}

// Like Функция

// placesContainer.addEventListener("click", likeCount);

export function likeCount(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
