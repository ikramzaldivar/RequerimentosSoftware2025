Feature: Mapa interactivo del campus
  Como usuario universitario
  Quiero visualizar un mapa interactivo con cafeterías
  Para decidir dónde comer más rápidamente

  Scenario: The One Where the ITESO Email Gets Access
    Given que el usuario se registra con "juan.delmuro@iteso.mx"
    When el sistema valida el dominio institucional
    Then el acceso al mapa está permitido

  Scenario: The One Where the Gmail Email Gets Rejected
    Given que el usuario intenta registrarse con "juan.delmuro@gmail.com"
    When el sistema valida el dominio institucional
    Then el acceso al mapa está denegado

  Scenario: The One Where the User Searches for Juan Café
    Given que el usuario está en el mapa interactivo
    When busca "Juan Café"
    Then el mapa se centra en ese punto

  Scenario: The One With the Non-Existent Coffee Shop
    Given que el usuario está en el mapa interactivo
    When busca "Café Fantasma"
    Then el sistema muestra "No se encontraron cafeterías con ese nombre"

  Scenario: The One Where Location Works
    Given que el usuario activó la geolocalización
    When CampusBites obtiene coordenadas
    Then el mapa se centra en la ubicación del usuario

  Scenario: The One Where Location Is Denied
    Given que el usuario niega el permiso de ubicación
    When intenta activar centrar en mi ubicación
    Then se muestra el mensaje "No se pudo acceder a tu ubicación"

  Scenario: The One Where the Map Loads Slowly
    Given que el usuario abre el mapa
    When el mapa tarda más de 3 segundos en cargar
    Then aparece el mensaje "Cargando mapa..."

  Scenario: The One Where Mapbox Fails
    Given que el usuario intenta cargar el mapa
    When la API de Mapbox falla
    Then el sistema muestra "No se pudo cargar el mapa. Intenta más tarde."
