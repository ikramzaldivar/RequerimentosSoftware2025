const { Given, When, Then } = require('@cucumber/cucumber');

// ------------------------------------------
// RESEÑA E INTENTOS DE SUBIDA
// ------------------------------------------

When('crea una reseña', function () {
  this.creoResena = true;
});

Then('puede subir imágenes', function () {
  if (!this.email.endsWith('@iteso.mx')) {
    throw new Error('Correo no institucional, no puede subir imágenes');
  }
});

// Gmail bloqueado
When('intenta subir imágenes', function () {
  this.intentaSubir = true;
});

Then('el sistema bloquea la acción', function () {
  if (this.email.endsWith('@iteso.mx')) {
    throw new Error('Usuarios ITESO no deben ser bloqueados');
  }
});

// ------------------------------------------
// FORMATOS Y VALIDACIONES
// ------------------------------------------

Given('que el usuario selecciona un archivo JPG de 2MB', function () {
  this.formato = 'jpg';
  this.tamano = 2;
});

When('pulsa subir imagen', function () {
  this.subio = true;
});

Then('el sistema acepta el archivo', function () {
  if (this.formato !== 'jpg' || this.tamano > 5) {
    throw new Error('Archivo inválido, no debería aceptar');
  }
});

// PDF inválido
Given('que el usuario selecciona un archivo PDF', function () {
  this.formato = 'pdf';
});

When('intenta subirlo', function () {
  this.intento = true;
});

Then('el sistema muestra "Formato no permitido"', function () {
  if (this.formato !== 'pdf') throw new Error('Este test debe simular PDF inválido');
});

// Tamaño correcto
Given('que el archivo pesa 3MB', function () {
  this.tamano = 3;
});

// Tamaño excesivo
Given('que el archivo pesa 7MB', function () {
  this.tamano = 7;
});

Then('el archivo es aceptado', function () {
  if (this.tamano > 5) throw new Error('El archivo no debería ser aceptado');
});

Then('el sistema muestra "El archivo supera el tamaño máximo permitido (5MB)."', function () {
  if (this.tamano <= 5) throw new Error('Este test simula archivo excedido');
});

// ------------------------------------------
// SUBIDA EXITOSA
// ------------------------------------------

Given('que la conexión es estable', function () {
  this.conexion = true;
});

When('el usuario sube la foto', function () {
  this.subiendo = true;
});

Then('el sistema asocia la foto a la reseña', function () {
  if (!this.conexion) throw new Error('No hay conexión');
});

// ------------------------------------------
// SUBIDA FALLIDA
// ------------------------------------------

Given('que la conexión falla', function () {
  this.conexion = false;
});

When('el usuario intenta subir la foto', function () {
  this.subirIntento = true;
});

Then('la subida es bloqueada', function () {
  if (this.conexion) throw new Error('La conexión no falló');
});

// ------------------------------------------
// ANÁLISIS DE IMAGEN
// ------------------------------------------

Given('que la foto contiene comida normal', function () {
  this.inapropiado = false;
});

When('el sistema analiza la imagen', function () {
  this.analizada = true;
});

Then('permite subirla', function () {
  if (this.inapropiado) {
    throw new Error('Imagen inapropiada, no debería permitir');
  }
});

Given('que la foto contiene contenido inapropiado', function () {
  this.inapropiado = true;
});

Then('la subida es bloqueada', function () {
  if (!this.inapropiado) {
    throw new Error('Imagen normal, no debería bloquear');
  }
});
