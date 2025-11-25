Feature: Notificaciones de apertura y cierre de cafeterías
  Como estudiante que frecuenta cafeterías
  Quiero recibir notificaciones cuando mis cafeterías favoritas abren o están por cerrar
  Para planear mejor mis tiempos de comida

  # ------------------------
  # HAPPY PATHS
  # ------------------------

  Scenario: The One Where Juan Café Opens
    Given que el usuario está autenticado con "juan.delmuro@iteso.mx"
    And tiene marcada como favorita "Juan Café"
    When el sistema detecta que "Juan Café" abre
    Then se envía la notificación "Juan Café ya abrió."

  Scenario: The One Where El Feo Is About To Close
    Given que el usuario está autenticado con "juan.delmuro@iteso.mx"
    And tiene marcada como favorita "El Feo"
    When faltan 20 minutos para que "El Feo" cierre
    Then se envía la notificación "El Feo cierra pronto."

  # ------------------------
  # ALTERNATIVAS
  # ------------------------

  Scenario: The One Where Notifications Are Muted
    Given que el usuario desactiva las notificaciones
    And tiene marcada como favorita "Juan Café"
    When el sistema detecta que "Juan Café" abre
    Then no se envía ninguna notificación

  Scenario: The One Where Notifications Are Enabled Again
    Given que el usuario vuelve a activar las notificaciones
    When una cafetería abre
    Then las notificaciones se envían normalmente

  # ------------------------
  # EXCEPCIONES
  # ------------------------

  Scenario: The One Where No Favorites Exist
    Given que el usuario no tiene cafeterías favoritas
    When una cafetería abre
    Then no debe enviarse ninguna notificación

  Scenario: The One Where the Notification Server Fails
    Given que el servidor de notificaciones falla temporalmente
    When el sistema detecta un horario de apertura
    Then se reintenta el envío más tarde

  Scenario: The One Where Notifications Keep Failing
    Given que el servidor de notificaciones falla temporalmente
    When después de 3 reintentos sigue fallando
    Then se registra un log de error

  Scenario: The One Where No Schedule Exists
    Given que una cafetería favorita no tiene horario registrado
    When el sistema revisa los horarios
    Then no se envía ninguna notificación

  Scenario: The One Where The Schedule Gets Updated
    Given que se actualiza el horario
    When el sistema revisa nuevamente
    Then las notificaciones vuelven a activarse
