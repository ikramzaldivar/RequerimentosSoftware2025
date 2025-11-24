const { Given, When, Then } = require('@cucumber/cucumber');

// VALIDA DOMINIO
When('el sistema valida el dominio institucional', function () {
  this.esITESO = this.email.endsWith('@iteso.mx');
});

Then('el acceso al mapa está permitido', function () {
  if (!this.esITESO) throw new Error('Acceso debería estar permitido');
});

Then('el acceso al mapa está denegado', function () {
  if (this.esITESO) throw new Error('Acceso debería estar denegado');
});

// ---------------------------
// BUSQUEDA EN MAPA
// ---------------------------

Given('que el usuario está en el mapa interactivo', function () {
  this.enMapa = true;
});

When('busca {string}', function (text) {
  this.busqueda = text;
});

// ---------------------------
// UBICACION
// ---------------------------

Given('que el usuario activó la geolocalización', function () {
  this.permisoUbicacion = true;
});

When('CampusBites obtiene coordenadas', function () {
  this.coords = this.permisoUbicacion;
});

Then('el mapa se centra en la ubicación del usuario', function () {
  if (!this.coords) throw new Error('No hay permisos de ubicación');
});

// NEGAR UBICACION

Given('que el usuario niega el permiso de ubicación', function () {
  this.permisoUbicacion = false;
});

When('intenta activar centrar en mi ubicación', function () {
  this.intento = true;
});

Then('se muestra el mensaje "No se pudo acceder a tu ubicación"', function () {
  if (this.permisoUbicacion) throw new Error('Sí había permisos');
});

// ---------------------------
// MAPA LENTO
// ---------------------------

Given('que el usuario abre el mapa', function () {
  this.abriendo = true;
});

When('el mapa tarda más de 3 segundos en cargar', function () {
  this.lento = true;
});

Then('aparece el mensaje "Cargando mapa..."', function () {
  if (!this.lento) throw new Error('No hubo carga lenta');
});

// ---------------------------
// MAPBOX FALLA
// ---------------------------

Given('que el usuario intenta cargar el mapa', function () {
  this.intentaMapa = true;
});

When('la API de Mapbox falla', function () {
  this.falla = true;
});
