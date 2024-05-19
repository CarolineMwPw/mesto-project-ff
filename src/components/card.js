// @todo: Функция создания карточки

import { like, removeLike, removeCard } from "./api";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, deleteCard, toggleLike, openImage, user) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardItem.querySelector(".card__image");

  cardImage.src = card.link;
  cardImage.alt = card.name.toUpperCase();

  cardItem.querySelector(".card__title").textContent = card.name;

  const delButton = cardItem.querySelector(".card__delete-button");

  delButton.addEventListener("click", function () {
    deleteCard(cardItem);
  });

  const userId = user._id;

  if (userId === card.owner._id) {
    delButton.style.display = "block";
  } else {
    delButton.style.display = "none";
  }

  const likeButton = cardItem.querySelector(".card__like-button");

  const likesCounter = cardItem.querySelector(".card__likes-counter");

  likesCounter.textContent = card.likes.length === 0 ? "" : card.likes.length;

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardItem.id = card._id;

  likeButton.addEventListener("click", function (evt) {
    toggleLike(evt, card);
  });

  cardImage.addEventListener("click", function () {
    openImage(card);
  });

  return cardItem;
}

// @todo: Функция удаления карточки

// export function deleteCard(evt) {
//   evt.target.closest("li").remove();
// }

export function deleteCard(card) {
  removeCard(card.id)
    .then((res) => {
      // console.log(card);
      card.remove();
      console.log(res);
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`);
    });
}

// Like Функция

// export function toggleLike(evt) {
//   evt.target.classList.toggle("card__like-button_is-active");
// }

export function toggleLike(evt, card) {
  const likesCounter = evt.target.nextElementSibling;

  if (evt.target.classList.contains("card__like-button_is-active")) {
    removeLike(card._id)
      .then((res) => {
        console.log(res);
        evt.target.classList.remove("card__like-button_is-active");
        likesCounter.textContent =
          res.likes.length === 0 ? "" : res.likes.length;
      })
      .catch((err) => {
        console.log(`Не удалось убрать лайк: ${err}`);
      });
  } else {
    like(card._id)
      .then((res) => {
        console.log(res);
        evt.target.classList.add("card__like-button_is-active");
        likesCounter.textContent =
          res.likes.length === 0 ? "" : res.likes.length;
      })
      .catch((err) => {
        console.log(`Не удалось поставить лайк: ${err}`);
      });
  }
}
