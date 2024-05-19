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

// const forbidden = /[^a-zA-Z\s\-а-яА-Я]/g;

export function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid || input.validity.patternMismatch;
  });
}

export function checkingInputValidity(form, input, config) {
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
  form.reset();
}
