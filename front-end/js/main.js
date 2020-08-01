const buttonCadastreseElement = document.querySelector('#holder-login a');
const buttonVoltarElement = document.querySelector('#holder-register a');
const formLoginElement = document.querySelector('#form-login');
const formRegisterElement = document.querySelector('#form-register');
const fieldsElements = document.querySelectorAll('.field');

buttonCadastreseElement.addEventListener('click', () => {
   registerAnimation();
   fieldsElements.forEach((element) => {
      element.value = '';
   });
});

buttonVoltarElement.addEventListener('click', () => {
   loginAnimation();
   fieldsElements.forEach((element) => {
      element.value = '';
   });
});

function registerAnimation() {
   formRegisterElement.style.display = 'flex';
   formLoginElement.setAttribute('style', 'display: none; animation: transition 250ms reverse;');
}

function loginAnimation() {
   formLoginElement.style.display = 'flex';
   formRegisterElement.setAttribute('style', 'display none; animation: transition 250ms;')
}