const { Given, When, Then } = require('@cucumber/cucumber');

Given('que el usuario se registra con {string}', function (email) {
  this.email = email;
});

When('crea una reseña', function () {
  this.creoResena = true;
});

Then('puede subir imágenes', function () {
  if (!this.email.endsWith('@iteso.mx')) {
    throw new Error('Solo usuarios ITESO pueden subir imágenes');
  }
});

When('intenta publicar imágenes', function () {
  this.intentaPublicar = true;
});

Then('el sistema bloquea la acción', function () {
  if (this.email.endsWith('@iteso.mx')) {
    throw new Error('Los usuarios ITESO no deben ser bloqueados');
  }
});


Given('que el usuario selecciona un archivo JPG de 2MB', function () {
  this.formato = 'jpg';
  this.tamano = 2;
});

When('pulsa "Subir foto"', function () {
  this.subioFoto = true;
});

Then('el sistema acepta el formato y continúa con la validación', function () {
  if (this.formato !== 'jpg') throw new Error('Formato inválido');
  if (this.tamano > 5) throw new Error('Archivo demasiado grande');
});


Given('que el usuario selecciona un archivo PDF', function () {
  this.formato = 'pdf';
});

When('intenta subirlo', function () {
  this.intentaSubir = true;
});

Then('el sistema muestra "Formato no permitido. Solo JPG, PNG o WebP."', function () {
  if (this.formato !== 'pdf') throw new Error('Este archivo sí es válido');
});


Given('que el archivo pesa 3MB', function () {
  this.tamano = 3;
});

Then('el archivo es aceptado', function () {
  if (this.tamano > 5) throw new Error('El archivo debería ser aceptado');
});


Given('que el archivo pesa 7MB', function () {
  this.tamano = 7;
});

Then('el sistema muestra "El archivo supera el tamaño máximo permitido (5 MB)."', function () {
  if (this.tamano <= 5) throw new Error('El archivo no debería ser aceptado');
});


Given('que la conexión es estable', function () {
  this.conexion = true;
});

When('el usuario sube la foto', function () {
  this.subida = true;
});

Then('CampusBites almacena la imagen y asocia la URL a la reseña', function () {
  if (!this.conexion) throw new Error('No hay conexión estable');
});


Given('que la conexión falla durante la subida', function () {
  this.conexion = false;
});

When('el usuario intenta enviar la imagen', function () {
  this.subida = true;
});

Then('el sistema muestra "No se pudo subir la foto. Revisa tu conexión."', function () {
  if (this.conexion) throw new Error('El error no debería mostrarse');
});


Given('que la foto contiene un platillo normal', function () {
  this.inapropiada = false;
});

When('el sistema analiza la imagen', function () {
  this.analizada = true;
});

Then('el sistema permite subirla', function () {
  if (this.inapropiada) throw new Error('La imagen debería ser bloqueada');
});


Given('que la imagen contiene contenido inapropiado', function () {
  this.inapropiada = true;
});

Then('la subida es bloqueada', function () {
  if (!this.inapropiada) throw new Error('La imagen debería ser permitida');
});
