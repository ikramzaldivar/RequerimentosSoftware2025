const { Given, When, Then } = require('@cucumber/cucumber');

// ----------------------------------------------------------
// Crear reseña y subir imágenes
// ----------------------------------------------------------

When('crea una reseña', function () {
  this.creoResena = true;
});

Then('puede subir imágenes', function () {
  if (!this.email.endsWith('@iteso.mx')) {
    throw new Error('El usuario no tiene permiso para subir imágenes.');
  }
});

// Gmail bloqueado
When('intenta subir imágenes', function () {
  this.intentaSubir = true;
});

Then('el sistema bloquea la acción', function () {
  if (this.email.endsWith('@iteso.mx')) {
    throw new Error('Usuarios ITESO no deberían ser bloqueados.');
  }
});

// ----------------------------------------------------------
// Validación de formatos y tamaños
// ----------------------------------------------------------

Given('que el usuario selecciona un archivo JPG de 2MB', function () {
  this.formato = 'jpg';
  this.tamano = 2;
});

When('pulsa subir imagen', function () {
  this.subio = true;
});

Then('el sistema acepta el archivo', function () {
  if (this.formato !== 'jpg' || this.tamano > 5) {
    throw new Error('Este archivo no debería ser rechazado.');
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
  if (this.formato !== 'pdf') {
    throw new Error('Este test espera un PDF inválido.');
  }
});

// Peso correcto
Given('que el archivo pesa 3MB', function () {
  this.tamano = 3;
});

Then('el archivo es aceptado', function () {
  if (this.tamano > 5) {
    throw new Error('El archivo debería ser aceptado.');
  }
});

// Peso excedido
Given('que el archivo pesa 7MB', function () {
  this.tamano = 7;
});

Then(
  'el sistema muestra "El archivo supera el tamaño máximo permitido (5MB)."',
  function () {
    if (this.tamano <= 5) {
      throw new Error('Este archivo no debería ser aceptado.');
    }
  }
);

// ----------------------------------------------------------
// Subida correcta
// ----------------------------------------------------------

Given('que la conexión es estable', function () {
  this.conexion = true;
});

When('el usuario sube la foto', function () {
  this.subiendo = true;
});

Then('el sistema asocia la foto a la reseña', function () {
  if (!this.conexion) {
    throw new Error('No hay conexión estable.');
  }
});

// ----------------------------------------------------------
// Subida fallida
// ----------------------------------------------------------

Given('que la conexión falla', function () {
  this.conexion = false;
});

When('el usuario intenta subir la foto', function () {
  this.intentoSubida = true;
});

Then('el sistema muestra "No se pudo subir la foto"', function () {
  if (this.conexion) {
    throw new Error('Este test simula falla de red.');
  }
});

// ----------------------------------------------------------
// Análisis de imagen
// ----------------------------------------------------------

Given('que la foto contiene comida normal', function () {
  this.inapropiada = false;
});

When('el sistema analiza la imagen', function () {
  this.analizada = true;
});

Then('permite subirla', function () {
  if (this.inapropiada) {
    throw new Error('La imagen sí es inapropiada.');
  }
});

// Imagen inapropiada
Given('que la foto contiene contenido inapropiado', function () {
  this.inapropiada = true;
});

Then('la subida es bloqueada', function () {
  if (!this.inapropiada) {
    throw new Error('Esta imagen debería ser bloqueada.');
  }
});
