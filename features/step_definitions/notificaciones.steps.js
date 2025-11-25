const { Given, When, Then } = require('@cucumber/cucumber');

// -----------------------------
// Estado inicial
// -----------------------------
Given('que el usuario está autenticado con {string}', function (email) {
  this.email = email;
  this.autenticado = true;
  this.notificaciones = true;
  this.favoritos = [];
});

Given('tiene marcada como favorita {string}', function (cafeteria) {
  this.favoritos.push(cafeteria);
});

// -----------------------------
// Activación / desactivación
// -----------------------------
Given('que el usuario desactiva las notificaciones', function () {
  this.notificaciones = false;
});

Given('que el usuario vuelve a activar las notificaciones', function () {
  this.notificaciones = true;
});

// -----------------------------
// Detección de eventos
// -----------------------------
When('el sistema detecta que {string} abre', function (cafeteria) {
  this.evento = `abre_${cafeteria}`;
});

When('faltan 20 minutos para que {string} cierre', function (cafeteria) {
  this.evento = `cierre_${cafeteria}`;
});

When('una cafetería abre', function () {
  this.evento = 'cafeteria_abre';
});

When('el sistema revisa los horarios', function () {
  this.revisandoHorarios = true;
});

// -----------------------------
// Excepciones
// -----------------------------
Given('que el usuario no tiene cafeterías favoritas', function () {
  this.favoritos = [];
});

Given('que el servidor de notificaciones falla temporalmente', function () {
  this.fallaServidor = true;
  this.reintentos = 0;
});

When('después de 3 reintentos sigue fallando', function () {
  this.reintentos = 3;
});

Given('que una cafetería favorita no tiene horario registrado', function () {
  this.horarioRegistrado = false;
});

Given('se actualiza el horario', function () {
  this.horarioRegistrado = true;
});

// -----------------------------
// Resultados esperados
// -----------------------------
Then('se envía la notificación {string}', function (mensaje) {
  if (!this.notificaciones) throw new Error('Notificaciones desactivadas.');
  if (!this.favoritos.length) throw new Error('No hay cafeterías favoritas.');
  // Validación mínima
  this.notificacion = mensaje;
});

Then('no se envía ninguna notificación', function () {
  if (this.notificaciones && this.favoritos.length > 0) {
    throw new Error('Debería haberse bloqueado la notificación.');
  }
});

Then('las notificaciones se envían normalmente', function () {
  if (!this.notificaciones) {
    throw new Error('No deberían estar silenciadas.');
  }
});

Then('se reintenta el envío más tarde', function () {
  if (!this.fallaServidor) {
    throw new Error('No hay falla en el servidor.');
  }
});

Then('se registra un log de error', function () {
  if (this.reintentos < 3) {
    throw new Error('Aún no se cumplen los 3 reintentos.');
  }
});

Then('no se envía ninguna notificación', function () {
  return true;
});

Then('las notificaciones vuelven a activarse', function () {
  if (!this.horarioRegistrado) {
    throw new Error('No se ha actualizado el horario.');
  }
});
