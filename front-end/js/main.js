const buttonCadastreseElement = document.querySelector('#holder-login a');
const buttonVoltarElement = document.querySelector('#holder-register a');
const buttonEntrarElement = document.querySelector('#button-login');
const buttonCadastrarElement = document.querySelector('#button-register');
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

buttonEntrarElement.addEventListener('click', () => { });

buttonCadastrarElement.addEventListener('click', () => {
   const nameElement = document.querySelector('#name-register');
   const emailElement = document.querySelector('#email-register');
   const passwordElement = document.querySelector('#password-register');
   const repasswordElement = document.querySelector('#repassword-register');
   const envio = {
      name: nameElement.value,
      email: emailElement.value,
      password: passwordElement.value
   }

   if (passwordElement.value !== repasswordElement.value)
      notificationMessage('As senhas não batem!');
   else {
      axios.post('http://localhost:3000/api/register', envio)
         .then((req, res) => {
            notificationMessage('Cadastro efetuado!');
         })
         .catch((req, res) => {
            notificationMessage('Falha ao cadastrar!')
            console.log(res.body);
         });
   }

   //loginAnimation();
   //notificationMessage('Teste de cadastro!');
});


function registerAnimation() {
   formRegisterElement.style.display = 'flex';
   formLoginElement.setAttribute('style', 'display: none; animation: transition 250ms reverse;');
}

function loginAnimation() {
   formLoginElement.style.display = 'flex';
   formRegisterElement.setAttribute('style', 'display none; animation: transition 250ms;')
}

function notificationMessage(inputText) {
   const notificationElement = document.querySelector('#notification');
   const textElement = document.querySelector('#notificationtext')
   const xTagElement = document.querySelector('#ximage');

   notificationElement.style.display = 'flex';

   textElement.innerText = '' + inputText;


   xTagElement.addEventListener('click', () => {
      notificationElement.style.display = 'none';
   })
}



// const notificationElement = document.querySelector('#notification');
// const xTagElement = document.querySelector('#ximage');

// xTagElement.addEventListener('click', () => {
//    notificationElement.setAttribute('style', 'display: none');
// })