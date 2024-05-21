import "./pages/index.css";

import { createCard, deleteCard, toggleLike } from "./components/card.js";

import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import {
  getInfoProfile,
  fillProfileData,
  getCards,
  addCard,
  changeAvatar,
} from "./components/api.js";

// @todo: DOM узлы

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Попап новой карточки

const popupNewCard = document.querySelector(".popup_type_new-card");

// Инпуты новой карточки

const cardName = popupNewCard.querySelector(".popup__input_type_card-name");
const cardLink = popupNewCard.querySelector(".popup__input_type_url");

// Форма новой карточки

const popUpNewCardForm = popupNewCard.querySelector(".popup__form");

// @todo: Темплейт карточки

const mainContent = document.querySelector(".content");

const placesContainer = mainContent.querySelector(".places__list");

const addButton = mainContent.querySelector(".profile__add-button");

// Профиль

const popupEditProfile = document.querySelector(".popup_type_edit");

const editButton = document.querySelector(".profile__edit-button");

const profilePhoto = document.querySelector(".profile__image");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const formProfile = popupEditProfile.querySelector(".popup__form");

const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_description");

// Аватар пользователя

const popupAvatar = document.querySelector(".popup_type_avatar");

const formPopupAvatar = popupAvatar.querySelector(".popup__form");

const avatarInput = popupAvatar.querySelector(".popup__input_type_url_avatar");

const profileSection = document.querySelector(".profile");

const closePopupAvatar = popupAvatar.querySelector(".popup__close");

// Попап с картинкой

const popUpImage = document.querySelector(".popup_type_image");

// Выбор попапов для функции закрытия при нажатии оверлея либо кнопки закрытия

const popUps = document.querySelectorAll(".popup");

// @todo: Вывести карточки на страницу

// Функция добавления новой карточки

function handleCardAdd(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Сохранение...";

  const newCard = {
    name: cardName.value,
    link: cardLink.value,
  };

  // const user = profileTitle.textContent;

  addCard(newCard.name, newCard.link)
    .then((data) => {
      placesContainer.prepend(
        createCard(data, deleteCard, toggleLike, openImage, data.owner)
      );

      closeModal(popupNewCard);
      // closeModal(openedPopUp);
    })
    .catch((err) => {
      console.log(`Ошибка сохранения карточки: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });

  evt.target.reset();

  // closeModal(popupNewCard);
}

// Функция отражения данных профиля на странице

function showingProfileInfo(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;

  profilePhoto.style.backgroundImage = `url(${user.avatar})`;
}

// Обработчик Функция открытия профиля

editButton.addEventListener("click", function () {
  clearValidation(formProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
});

// Функция редактирования профиля

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const name = nameInput.value;
  const job = jobInput.value;
  fillProfileData(name, job)
    .then((data) => {
      showingProfileInfo(data);

      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Ошибка сохранения изменений профиля: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });

  // const openedPopUp = document.querySelector(".popup_is-opened");
}

// Функция обновления аватара пользователя

function changeProfileImage(evt, link) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  // avatarInput.value = link;
  changeAvatar(link)
    .then((data) => {
      profilePhoto.style.backgroundImage = `url(${data.avatar})`;
      showingProfileInfo(data);
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
  evt.target.reset();
}

// Открытие попапа с картинкой

function openImage(card) {
  openModal(popUpImage);

  popUpImage.querySelector(".popup__image").src = card.link;
  popUpImage.querySelector(".popup__caption").textContent =
    card.name.toUpperCase();
  popUpImage.querySelector(".popup__image").alt = card.name;
}

//  info for cheking newcard adding
// Neapol
// https://images.unsplash.com/photo-1600602499670-fdd9275255a5?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

// for cheking avatar's change

// https://upload.wikimedia.org/wikipedia/en/6/63/Feels_good_man.jpg

// https://www.shutterstock.com/shutterstock/photos/1453164662/display_1500/stock-vector-illustrations-of-killer-cat-action-on-white-background-animals-action-vector-1453164662.jpg

// Обработчик открытия окна новой карточки

addButton.addEventListener("click", function () {
  clearValidation(popUpNewCardForm, validationConfig);
  openModal(popupNewCard);
});

// Обработчик добавления новой карточки

// popupNewCard.addEventListener("submit", handleCardAdd);

popUpNewCardForm.addEventListener("submit", handleCardAdd);

// Обработчик открытия формы аватара

profileSection.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("profile__image_edit") ||
    evt.target.classList.contains("pointer_svg")
  ) {
    clearValidation(formPopupAvatar, validationConfig);
    openModal(popupAvatar);
  }
});

// Обработчик закрытия попапа аватара

closePopupAvatar.addEventListener("click", closeModal(popupAvatar));

// Обработчик сохранения аватара

popupAvatar.addEventListener("submit", function (evt) {
  changeProfileImage(evt, avatarInput.value);
});

// Обработчик сохранения измененных данных профиля

formProfile.addEventListener("submit", handleFormProfileSubmit);

// Добавляем обработчик функции закрытия при нажатии оверлея либо кнопки закрытия каждому попапу

popUps.forEach(function (popUp) {
  popUp.addEventListener("click", closePopupByOverlay);
});

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
