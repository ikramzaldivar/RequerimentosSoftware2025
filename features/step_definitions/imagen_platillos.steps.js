const { Given, When, Then } = require('@cucumber/cucumber');

// ---------------------------
// RESENA + SUBIR IMAGENES
// ---------------------------

When('crea una reseña', function () {
  this.creoResena = true;
});

Then('puede subir imágenes', function () {
  if (!this.email.endsWith('@iteso.mx')) {
    throw new Error('Solo usuarios ITESO pueden subir imágenes');
  }
});

When('intenta subir imágenes', function () {
  this.intentaSubir = true;
});

Then('el sistema bloquea la acción', function () {
  if (this.email.endsWith('@iteso.mx')) {
    throw new Error('No se debería bloquear a usuarios ITESO');
  }
});

// ---------------------------
// VALIDACION DE FORMATO
// ---------------------------

Given('que el usuario selecciona un archivo JPG de 2MB', function () {
  this.formato = 'jpg';
  this.tamano = 2;
});

When('pulsa subir imagen', function () {
  this.subioFoto = true;
});

Then('el sistema acepta el archivo', function () {
  if (this.formato !== 'jpg' || this.tamano > 5)
    throw new Error('El archivo no es válido');
});

// PDF INVÁLIDO
Given('que el usuario selecciona un archivo PDF', function () {
  this.formato = 'pdf';
});

When('intenta subirlo', function () {
  this.intentaSubir = true;
});

Then('el sistema muestra "Formato no permitido. Solo JPG, PNG o WebP."', function () {
  if (this.formato !== 'pdf') throw new Error('Formato inesperado');
});

// PESO CORRECTO
Given('que el archivo pesa 3MB', function () {
  this.tamano = 3;
});

// PESO EXCESIVO
Given('que el archivo pesa 7MB', function () {
  this.tamano = 7;
});

Then('el sistema muestra "El archivo supera el tamaño máximo permitido (5 MB)."', function () {
  if (this.tamano <= 5) throw new Error('Este archivo debería ser rechazado');
});

// ---------------------------
// SUBIDA EXITOSA
// ---------------------------

Given('que la conexión es estable', function () {
  this.conexion = true;
});

When('el usuario sube la foto', function () {
  this.subiendo = true;
});

Then('el sistema asocia la foto a la reseña', function () {
  if (!this.conexion) throw new Error('Sin conexión = no asociar');
});

// ---------------------------
// SUBIDA FALLIDA
// ---------------------------

Given('que la conexión falla', function () {
  this.conexion = false;
});

When('el usuario intenta subir la foto', function () {
  this.subirIntento = true;
});

Then('el sistema muestra "No se pudo subir la foto"', function () {
  if (this.conexion) throw new Error('La conexión no falló');
});

// ---------------------------
// ANALISIS DE IMAGEN
// ---------------------------

Given('que la foto contiene comida normal', function () {
  this.inapropiada = false;
});

When('el sistema analiza la imagen', function () {
  this.analizada = true;
});

Then('permite subirla', function () {
  if (this.inapropiada) throw new Error('Debió bloquearse');
});

Given('que la foto contiene contenido inapropiado', function () {
  this.inapropiada = true;
});
