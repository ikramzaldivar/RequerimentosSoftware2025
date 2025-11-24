const { Given } = require('@cucumber/cucumber');

// login ITESO
Given('que el usuario se registra con {string}', function (email) {
  this.email = email;
});

// login con correo no válido
Given('que el usuario intenta registrarse con {string}', function (email) {
  this.email = email;
});
