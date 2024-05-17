import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

import { createCard, deleteCard, toggleLike } from "./components/card.js";

import {
  openModal,
  closeModal,
  keyPress,
  closePopupByOverlay,
} from "./components/modal.js";

import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation.js";

import {
  apiConfig,
  getInfoProfile,
  fillProfileData,
  getCards,
  addCard,
  like,
  removeLike,
  removeCard,
  changeAvatar,
} from "./components/api.js";

// @todo: DOM узлы

// @todo: Темплейт карточки

export const mainContent = document.querySelector(".content");

export const placesContainer = mainContent.querySelector(".places__list");

const addButton = mainContent.querySelector(".profile__add-button");

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: Вывести карточки на страницу

// initialCards.forEach(function (card) {
//   placesContainer.append(createCard(card, deleteCard, toggleLike, openImage));
// });

// Обработчик открытия окна новой карточки

export const popupNewCard = document.querySelector(".popup_type_new-card");

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

// Функция добавления новой карточки

export function handleCardAdd(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const cardName = popupNewCard.querySelector(".popup__input_type_card-name");
  const cardLink = popupNewCard.querySelector(".popup__input_type_url");
  const newCard = {
    name: cardName.value,
    link: cardLink.value,
  };

  const user = document.querySelector(".profile__title").textContent;
  console.log(user);

  addCard(newCard.name, newCard.link)
    .then((data) => {
      placesContainer.prepend(
        createCard(data, deleteCard, toggleLike, openImage, data.owner)
      );
      // closeModal(openedPopUp);
    })
    .catch((err) => {
      console.log(`Ошибка сохранения карточки: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });

  evt.target.reset();

  const openedPopUp = document.querySelector(".popup_is-opened");

  closeModal(openedPopUp);
}

// Обработчик добавления новой карточки

popupNewCard.addEventListener("submit", handleCardAdd);

// Профиль

const popupEditProfile = document.querySelector(".popup_type_edit");

const editButton = document.querySelector(".profile__edit-button");

const profilePhoto = document.querySelector(".profile__image");

function showingProfileInfo(user) {
  document.querySelector(".profile__title").textContent = user.name;
  document.querySelector(".profile__description").textContent = user.about;

  profilePhoto.style.backgroundImage = `url(${user.avatar})`;
}

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
  evt.submitter.textContent = "Сохранение...";
  // const name = document.querySelector(".profile__title");
  // const job = document.querySelector(".profile__description");
  const name = nameInput.value;
  const job = jobInput.value;
  fillProfileData(name, job)
    .then((data) => {
      showingProfileInfo(data);
      closeModal(openedPopUp);
    })
    .catch((err) => {
      console.log(`Ошибка сохранения изменений профиля: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });

  const openedPopUp = document.querySelector(".popup_is-opened");

  // closeModal(openedPopUp);
}

// Функция обновления аватара пользователя

const popupAvatar = document.querySelector(".popup_type_avatar");

const avatarInput = popupAvatar.querySelector(".popup__input_type_url");

function changeProfileImage(evt, link) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  // avatarInput.value = link;
  changeAvatar(link)
    .then((data) => {
      profilePhoto.style.backgroundImage = `url(${data.avatar})`;
      showingProfileInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

const profileSection = document.querySelector(".profile");

profileSection.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("profile__image_edit") ||
    evt.target.classList.contains("pointer_svg")
  ) {
    openModal(popupAvatar);
  }
});

const closePopupAvatar = popupAvatar.querySelector(".popup__close");

closePopupAvatar.addEventListener("click", closeModal(popupAvatar));

popupAvatar.addEventListener("submit", function (evt) {
  changeProfileImage(evt, avatarInput.value);
});

formProfile.addEventListener("submit", handleFormProfileSubmit);

// Открытие попапа с картинкой

export const popUpImage = document.querySelector(".popup_type_image");

export function openImage(card) {
  // if (event.target.classList.contains("card__image")) {
  openModal(popUpImage);

  popUpImage.querySelector(".popup__image").src = card.link;
  popUpImage.querySelector(".popup__caption").textContent =
    card.name.toUpperCase();
  popUpImage.querySelector(".popup__image").alt = card.name;
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

// for cheking avatar's change

// https://upload.wikimedia.org/wikipedia/en/6/63/Feels_good_man.jpg

// https://www.shutterstock.com/shutterstock/photos/1453164662/display_1500/stock-vector-illustrations-of-killer-cat-action-on-white-background-animals-action-vector-1453164662.jpg

enableValidation(validationConfig);

// Загружаем

Promise.all([getInfoProfile(), getCards()])
  .then(([user, cards]) => {
    showingProfileInfo(user);

    cards.forEach((card) => {
      placesContainer.append(
        createCard(card, deleteCard, toggleLike, openImage, user)
      );
    });
  })
  .catch((err) => {
    console.log(
      `Ошибка получения данных пользователя или загрузки карточек с сервера: ${err}`
    );
  });
