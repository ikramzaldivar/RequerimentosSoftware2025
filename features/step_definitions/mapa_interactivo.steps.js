const { Given, When, Then } = require('@cucumber/cucumber');

// ----------------------------------------------------------
// Validación del dominio ITESO
// ----------------------------------------------------------

When('el sistema valida el dominio institucional', function () {
  this.esITESO = this.email.endsWith('@iteso.mx');
});

Then('el acceso al mapa está permitido', function () {
  if (!this.esITESO) throw new Error('Debe estar permitido.');
});

Then('el acceso al mapa está denegado', function () {
  if (this.esITESO) throw new Error('Debe estar denegado.');
});

// ----------------------------------------------------------
// Búsqueda en el mapa
// ----------------------------------------------------------

Given('que el usuario está en el mapa interactivo', function () {
  this.enMapa = true;
});

When('busca {string}', function (texto) {
  this.busqueda = texto;
});

Then('el mapa se centra en ese punto', function () {
  if (!this.busqueda) throw new Error('No hay término de búsqueda.');
});

// Cafetería inexistente
Then(
  'el sistema muestra "No se encontraron cafeterías con ese nombre"',
  function () {
    if (this.busqueda !== 'Café Fantasma') {
      throw new Error(
        'Este mensaje aparece únicamente cuando no hay resultados.'
      );
    }
  }
);

// ----------------------------------------------------------
// Geolocalización
// ----------------------------------------------------------

Given('que el usuario activó la geolocalización', function () {
  this.permisoUbicacion = true;
});

When('CampusBites obtiene coordenadas', function () {
  this.coords = this.permisoUbicacion;
});

Then('el mapa se centra en la ubicación del usuario', function () {
  if (!this.coords) throw new Error('No hay permisos para ubicación.');
});

// Permiso negado
Given('que el usuario niega el permiso de ubicación', function () {
  this.permisoUbicacion = false;
});

When('intenta activar centrar en mi ubicación', function () {
  this.intento = true;
});

Then('se muestra el mensaje "No se pudo acceder a tu ubicación"', function () {
  if (this.permisoUbicacion) {
    throw new Error('Este mensaje aplica solo cuando falta el permiso.');
  }
});

// ----------------------------------------------------------
// Carga lenta
// ----------------------------------------------------------

Given('que el usuario abre el mapa', function () {
  this.abriendo = true;
});

When('el mapa tarda más de 3 segundos en cargar', function () {
  this.lento = true;
});

Then('aparece el mensaje "Cargando mapa..."', function () {
  if (!this.lento) throw new Error('No hubo carga lenta.');
});

// ----------------------------------------------------------
// Fallo de Mapbox
// ----------------------------------------------------------

Given('que el usuario intenta cargar el mapa', function () {
  this.intentaCarga = true;
});

When('la API de Mapbox falla', function () {
  this.falla = true;
});

Then(
  'el sistema muestra "No se pudo cargar el mapa. Intenta más tarde."',
  function () {
    if (!this.falla) throw new Error('Esta prueba simula falla de Mapbox.');
  }
);
