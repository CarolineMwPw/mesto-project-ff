// Шаблон запроса

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "735be31d-3e27-491e-8366-bba0905d54df",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

// Запрос информации для профиля

export function getInfoProfile() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(checkResponse);
}

// Изменение информации в профиле

export function fillProfileData(name, about) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

// Обновление аватара в профиле

export function changeAvatar(link) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(checkResponse);
}

// Запрос карточек с сервера

export function getCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(checkResponse);
}

// Добавление карточки

export function addCard(name, link) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

// Лайкаем

export function like(id) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(checkResponse);
}

// А все уже, не нравится больше

export function removeLike(id) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkResponse);
}

// Старались, добавляли, теперь удаляем, если наша

export function removeCard(id) {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkResponse);
}
