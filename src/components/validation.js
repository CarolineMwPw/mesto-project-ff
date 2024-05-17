export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export function showError(form, input, errorMessage, config) {
  const errorEl = form.querySelector(`.${input.id}-error`);

  input.classList.add(config.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(config.errorClass);
}

export const hideError = (form, input, config) => {
  const errorEl = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorEl.classList.remove(config.errorClass);
  errorEl.textContent = "";
};

// formProfileInput.addEventListener("input", function () {
//   checkingInputValidity(formProfile, formProfileInput);
// });

const forbidden = /[^a-zA-Z\s\-а-яА-Я]/g;

// function hasMatchRegex(inputs) {
//   return inputs.some((input) => {
//     if (input.value.match(forbidden)) {
// input.setCustomValidity(
//   "Поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы."
// );
//       return !input.validity.pattern;
//     }
//   });
// }

export function hasInvalidInput(inputs) {
  // return inputs.some((input) => {
  //   if (input.value.match(forbidden)) {

  //     return !input.validity.pattern;
  //   } else {
  //     return !input.validity.valid;
  //   }
  // });

  return inputs.some((input) => {
    return !input.validity.valid || input.validity.patternMismatch;
  });
}

export function checkingInputValidity(form, input, config) {
  // if (!input.validity.pattern) {
  //   input.setCustomValidity(
  //     "Поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы."
  //   );
  //   showError(form, input, input.validationMessage);
  // } else {
  //   input.setCustomValidity("");

  //   hideError(form, input);
  // }

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config);
  } else {
    hideError(form, input, config);
  }
}

function modeButton(inputs, buttonElement, config) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  buttonElement.disabled = false;
  modeButton(inputs, buttonElement, config);
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      checkingInputValidity(form, input, config);
      modeButton(inputs, buttonElement, config);
    });
  });
}

// setEventListeners(formProfile);

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  modeButton(inputs, buttonElement, config);
  inputs.forEach((input) => {
    hideError(form, input, config);
  });
}
