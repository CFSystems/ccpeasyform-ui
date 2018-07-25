const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/ccpeasyform-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/ccpeasyform-ui/index.html');
});

app.listen(process.env.PORT || 4200);

console.log('Servidor rodando em http://localhost:4200');