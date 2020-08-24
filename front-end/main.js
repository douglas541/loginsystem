const buttonCadastreseElement = document.querySelector('#holder-login a');
const buttonVoltarElement = document.querySelector('#holder-register a');
const buttonEntrarElement = document.querySelector('#button-login');
const buttonCadastrarElement = document.querySelector('#button-register');
const buttonLogOutElement = document.querySelector('#logout-button');
const formLoginElement = document.querySelector('#form-login');
const formRegisterElement = document.querySelector('#form-register');
const fieldsElements = document.querySelectorAll('.field');
const mainPageElement = document.querySelector('#main-page');
const loginPageElement = document.querySelector('#login-page');
const mainHeaderTextElement = document.querySelector('.text.content');

//-----------User authentication verify-----------------

const cookie = document.cookie;
const token = cookie.split('=')[1];

axios({
   method: 'get',
   url: 'http://localhost:3001/api/authverify',
   headers: { 'Authorization': 'Baerer ' + token }
})
   .then((res) => {
      console.log(res.data);
      renderPage('main', `${res.data.name}`);
   })
   .catch((error) => {
      renderPage('login');
   });


//------------------------------------------------------

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

buttonCadastrarElement.addEventListener('click', register);

fieldsElements.forEach((element, index) => {
   if (index >= 2) {
      fieldsElements[index].addEventListener('keyup', (event) => {
         if (event.keyCode === 13)
            register();
      });
   }
});

buttonEntrarElement.addEventListener('click', login);

fieldsElements.forEach((element, index) => {
   if (index < 2) {
      fieldsElements[index].addEventListener('keyup', (event) => {
         if (event.keyCode === 13)
            login();
      });
   }
});

buttonLogOutElement.addEventListener('click', logout);

function login() {
   const emailElement = document.querySelector('#email-login');
   const passwordElement = document.querySelector('#password-login');
   const envio = {
      email: emailElement.value,
      password: passwordElement.value
   }

   if (!passwordElement.value || !emailElement.value)
      notificationMessage('Os campos são obrigatórios');
   else {
      axios.post('http://localhost:3001/api/authenticate', envio)
         .then((res) => {
            document.cookie = `token= ${res.data.token}`;

            renderPage('main', `${res.data.user.name}`);
         })
         .catch((error) => {
            console.log(error.response.data);

            (error.response.data.error === 'User not found') ?
               notificationMessage('Usuário não cadastrado!') :
               notificationMessage('Senha errada!');
         });
   }
   //loginAnimation();
   //notificationMessage('Teste de cadastro!');
}

function register() {
   const nameElement = document.querySelector('#name-register');
   const emailElement = document.querySelector('#email-register');
   const passwordElement = document.querySelector('#password-register');
   const rePasswordElement = document.querySelector('#repassword-register');
   const envio = {
      name: nameElement.value,
      email: emailElement.value,
      password: passwordElement.value
   }

   if (!passwordElement.value || !emailElement.value || !nameElement.value || !rePasswordElement.value)
      notificationMessage('Os campos são obrigatórios');
   else if (passwordElement.value !== rePasswordElement.value)
      notificationMessage('As senhas não batem!');
   else {
      axios.post('http://localhost:3001/api/register', envio)
         .then((res) => {
            document.cookie = `token= ${res.data.token}`;

            renderPage('main', `${res.data.user.name}`);
         })
         .catch((error) => {
            console.log(error.response.data);

            (error.response.data.error === 'User alread exists') ?
               notificationMessage('Usuário já existente') :
               notificationMessage('Falha ao cadastrar!');
         });
   }
   //loginAnimation();
   //notificationMessage('Teste de cadastro!');
}

function logout(){
   document.cookie = "token= undefined";
}

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
   });

   setTimeout(() => {
      notificationElement.style.display = 'none';
   }, 3000);
}

function renderPage(page, name) {
   if (page === 'main') {
      mainPageElement.style.display = "initial";
      loginPageElement.style.display = "none";

      mainHeaderTextElement.innerHTML = `<h1>Olá ${name} seja bem vindo!</h1>`;
   }
   if (page === 'login') {
      mainPageElement.style.display = "none";
      loginPageElement.style.display = "flex";
   }
}

// const notificationElement = document.querySelector('#notification');
// const xTagElement = document.querySelector('#ximage');

// xTagElement.addEventListener('click', () => {
//    notificationElement.setAttribute('style', 'display: none');
// })