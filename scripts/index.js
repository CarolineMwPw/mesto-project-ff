// @todo: Темплейт карточки

const mainContent = document.querySelector(".content");

const placesContainer = mainContent.querySelector(".places__list");

const addButton = mainContent.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#card-template").content;

const cardImage = document.querySelector(".card__image");
const cardDescription = document.querySelector(".card__description");
const cardName = document.querySelector(".card__title");

// cloneCards(initialCards);

// function cloneCards(array) {
//   for (let i = 0; i < array.length; i = i + 1) {
//     let cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

// cardItem.querySelector(".card__image").src = array[i].link;
// cardItem.querySelector(".card__title").textContent = array[i].name;
// placesContainer.append(cardItem);
//   }
// }

initialCards.forEach(function (card) {
  let cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = card.link;

  cardItem.querySelector(".card__title").textContent = card.name;
  cardItem
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove(cardItem);
    });

  placesContainer.append(cardItem);
});

const delButton = document.querySelector(".card__delete-button");

const likeButton = document.querySelector(".card__like-button");

// @todo: DOM узлы

// @todo: Функция создания карточки

const popupNewCard = document.querySelector(".popup_type_new-card");

addButton.addEventListener("click", function () {
  popupNewCard.classList.add("popup_is-opened");
});

const saveCardButton = popupNewCard.querySelector(".popup__button");

function add(linkValue, nameValue) {
  const newItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  newItem.querySelector(".card__title").textContent = nameValue;

  newItem.querySelector(".card__image").src = linkValue;

  newItem
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });

  placesContainer.append(newItem);
  initialCards.push({ name: nameValue, link: linkValue });
}

saveCardButton.addEventListener("click", function () {
  const cardName = document.querySelector(".popup__input_type_card-name");
  const cardLink = document.querySelector(".popup__input_type_url");

  add(cardLink.value, cardName.value);

  cardLink.value = "";
  cardName.value = "";
  close();
});

const closeNewCard = popupNewCard.querySelector(".popup__close");

const popupEditProfile = document.querySelector(".popup_type_edit");

const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", function () {
  popupEditProfile.classList.add("popup_is-opened");
});

const closeEditProfile = popupEditProfile.querySelector(".popup__close");

closeEditProfile.addEventListener("click", function () {
  close();
});

closeNewCard.addEventListener("click", function () {
  close();
});

function close() {
  popupNewCard.classList.add("popup_is-animated");
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
}

// closePopup.addEventListener('click', function(evt) {
//   evt.target.classList.toggle('card__like-button');
//   });

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//  info for cheking newcard adding
// Neapol
// https://images.unsplash.com/photo-1600602499670-fdd9275255a5?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
