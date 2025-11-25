const { Given, When, Then } = require('@cucumber/cucumber');

// ---------------------------------------------
// Inicialización segura del estado
// ---------------------------------------------
function initUserState(world) {
  if (!world.favoritos) world.favoritos = [];
  if (world.notificaciones === undefined) world.notificaciones = true;
}

// ---------------------------------------------
// Autenticación
// ---------------------------------------------
Given('que el usuario está autenticado con {string}', function (email) {
  this.email = email;
  this.autenticado = true;
  this.favoritos = [];
  this.notificaciones = true;
});

// ---------------------------------------------
// Favoritos
// ---------------------------------------------
Given('tiene marcada como favorita {string}', function (cafeteria) {
  initUserState(this);
  this.favoritos.push(cafeteria);
});

// ---------------------------------------------
// Activar / Desactivar notificaciones
// ---------------------------------------------
Given('que el usuario desactiva las notificaciones', function () {
  this.notificaciones = false;
});

Given('que el usuario vuelve a activar las notificaciones', function () {
  this.notificaciones = true;
});

// ---------------------------------------------
// Eventos
// ---------------------------------------------
When('el sistema detecta que {string} abre', function (cafeteria) {
  this.evento = `abre_${cafeteria}`;
});

When('faltan 20 minutos para que {string} cierre', function (cafeteria) {
  this.evento = `cierre_${cafeteria}`;
});

When('una cafetería abre', function () {
  this.evento = 'cafeteria_abre';
});

When('el sistema detecta un horario de apertura', function () {
  this.evento = 'horario_apertura';
});

When('el sistema revisa los horarios', function () {
  this.revisandoHorarios = true;
});

When('el sistema revisa nuevamente', function () {
  this.revisandoHorarios = true;
});

// ---------------------------------------------
// Estados especiales
// ---------------------------------------------
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

// ---------------------------------------------
// Resultados esperados
// ---------------------------------------------
Then('se envía la notificación {string}', function (mensaje) {
  if (!this.notificaciones)
    throw new Error('Las notificaciones están desactivadas.');

  if (!this.favoritos || this.favoritos.length === 0)
    throw new Error('El usuario no tiene cafeterías favoritas.');

  this.notificacion = mensaje;
});

// Un solo step para NO enviar notificación
Then('no se envía ninguna notificación', function () {
  if (this.notificaciones && this.favoritos.length > 0)
    throw new Error('El sistema intentó enviar una notificación.');
});

// Step específico “no debe enviarse ninguna notificación”
Then('no debe enviarse ninguna notificación', function () {
  if (this.notificaciones && this.favoritos.length > 0)
    throw new Error('No debería enviarse notificación.');
});

// Reintento
Then('se reintenta el envío más tarde', function () {
  if (!this.fallaServidor)
    throw new Error('No hay una falla temporal en el servidor.');
});

// Error final
Then('se registra un log de error', function () {
  if (this.reintentos < 3)
    throw new Error('No se han alcanzado los 3 reintentos.');
});

// Horario actualizado
Then('las notificaciones vuelven a activarse', function () {
  if (!this.horarioRegistrado)
    throw new Error('No se actualizó el horario.');
});
