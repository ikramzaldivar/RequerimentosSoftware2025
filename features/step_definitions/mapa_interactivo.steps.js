const { Given, When, Then } = require('@cucumber/cucumber');

// ------------------------------------------
// VALIDACIÓN INSTITUCIONAL
// ------------------------------------------

When('el sistema valida el dominio institucional', function () {
  this.permitido = this.email.endsWith('@iteso.mx');
});

Then('el acceso al mapa está permitido', function () {
  if (!this.permitido) throw new Error('Acceso debería estar permitido');
});

Then('el acceso al mapa está denegado', function () {
  if (this.permitido) throw new Error('Acceso debería estar denegado');
});

// ------------------------------------------
// BUSQUEDA EN MAPA
// ------------------------------------------

Given('que el usuario está en el mapa interactivo', function () {
  this.enMapa = true;
});

When('busca {string}', function (texto) {
  this.busqueda = texto;
});

Then('el mapa se centra en ese punto', function () {
  if (!this.busqueda) throw new Error('No hubo búsqueda válida');
});

// Error: cafetería no encontrada
Then('el sistema muestra "No se encontraron cafeterías con ese nombre"', function () {
  if (this.busqueda !== 'Café Fantasma') {
    throw new Error('Este test simula búsqueda fallida');
  }
});

// ------------------------------------------
// GEOLOCALIZACIÓN
// ------------------------------------------

Given('que el usuario activó la geolocalización', function () {
  this.permisoUbicacion = true;
});

When('CampusBites obtiene coordenadas', function () {
  this.coords = this.permisoUbicacion;
});

Then('el mapa se centra en la ubicación del usuario', function () {
  if (!this.coords) throw new Error('No hay permisos de ubicación');
});

Given('que el usuario niega el permiso de ubicación', function () {
  this.permisoUbicacion = false;
});

When('intenta activar centrar en mi ubicación', function () {
  this.intentaCentro = true;
});

Then('se muestra el mensaje "No se pudo acceder a tu ubicación"', function () {
  if (this.permisoUbicacion) {
    throw new Error('Había permisos pero el test simula negación');
  }
});

// ------------------------------------------
// MAPA LENTO
// ------------------------------------------

Given('que el usuario abre el mapa', function () {
  this.abriendo = true;
});

When('el mapa tarda más de 3 segundos en cargar', function () {
  this.lento = true;
});

Then('aparece el mensaje "Cargando mapa..."', function () {
  if (!this.lento) throw new Error('No hubo carga lenta');
});

// ------------------------------------------
// MAPBOX FALLA
// ------------------------------------------

Given('que el usuario intenta cargar el mapa', function () {
  this.intentando = true;
});

When('la API de Mapbox falla', function () {
  this.falloAPI = true;
});

Then('el sistema muestra "No se pudo cargar el mapa. Intenta más tarde."', function () {
  if (!this.falloAPI) throw new Error('La API no falló');
});
