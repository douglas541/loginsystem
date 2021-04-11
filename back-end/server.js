const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Iniciando o app
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Iniciando servidor
mongoose.connect('mongodb://localhost:27017/podecastapi', {
   useUnifiedTopology: true,
   useNewUrlParser: true
})
   .then(() => {
      console.log('mongoBD iniciado com sucesso na porta 27017');
   })
   .catch((error) => {
      console.log('Falha ao iniciar o BD erro: ' + error);
   });

// Rota padrão
app.use('/api', require('./src/routes'));

app.listen('3001', () => {
   console.log('Ouvindo porta 3001');
});