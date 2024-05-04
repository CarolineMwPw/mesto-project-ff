// @todo: Функция создания карточки

import {
  mainContent,
  placesContainer,
  cardTemplate,
  popupNewCard,
  popUpImage,
  openImage,
  handleCardAdd,
} from "..";

import { closeModal } from "./modal";

export function createCard(card, deleteCard, toggleLike, openImage) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  cardItem.querySelector(".card__image").src = card.link;
  cardItem.querySelector(".card__image").alt = card.name.toUpperCase();

  cardItem.querySelector(".card__title").textContent = card.name;

  const delButton = cardItem.querySelector(".card__delete-button");

  delButton.addEventListener("click", deleteCard);

  const likeButton = cardItem.querySelector(".card__like-button");

  likeButton.addEventListener("click", toggleLike);

  const cardImage = cardItem.querySelector(".card__image");

  cardImage.addEventListener("click", openImage);

  return cardItem;
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
  evt.target.closest("li").remove();
}

// Like Функция

export function toggleLike(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
