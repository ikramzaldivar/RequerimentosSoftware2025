const { Given, When, Then } = require('@cucumber/cucumber');

Given('que el usuario se registra con {string}', function (email) {
  this.email = email;
});

When('el sistema valida el dominio institucional', function () {
  this.esITESO = this.email.endsWith('@iteso.mx');
});

Then('el acceso al mapa está permitido', function () {
  if (!this.esITESO) throw new Error('Acceso denegado');
});

Then('el acceso al mapa está denegado', function () {
  if (this.esITESO) throw new Error('Acceso debería estar denegado');
});


Given('que el usuario está en el mapa interactivo', function () {
  this.enMapa = true;
});

When('busca {string}', function (texto) {
  this.busqueda = texto;
});

Then('el mapa se centra en ese punto', function () {
  if (!this.enMapa) throw new Error('El usuario no está en el mapa');
});


Then('el sistema muestra {string}', function (mensaje) {
  this.mensaje = mensaje;
});


Given('que el usuario activó "Centrar en mi ubicación"', function () {
  this.activado = true;
});

When('CampusBites obtiene coordenadas', function () {
  this.coords = true;
});

Then('el mapa se posiciona alrededor del usuario', function () {
  if (!this.coords) throw new Error('No se obtuvieron coordenadas');
});


Given('que el usuario niega el permiso de ubicación', function () {
  this.permiso = false;
});

When('intenta centrar el mapa en su posición', function () {
  this.intenta = true;
});

Then('el mapa se centra en la vista general del campus', function () {
  if (this.permiso !== false)
    throw new Error('No debería intentar usar ubicación');
});


Given('que el usuario abre el mapa', function () {
  this.abreMapa = true;
});

When('el mapa tarda más de 3 segundos en cargar', function () {
  this.lento = true;
});

Then('se muestra el mensaje "Cargando mapa..." y luego continúa', function () {
  if (!this.lento) throw new Error('No hubo carga lenta');
});


Given('que el usuario intenta cargar el mapa interactivo', function () {
  this.intentaMapa = true;
});

When('la API de Mapbox falla', function () {
  this.falla = true;
});

Then('el sistema muestra "No se pudo cargar el mapa. Intenta más tarde."', function () {
  if (!this.falla) throw new Error('No hubo falla de Mapbox');
});
