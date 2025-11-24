Feature: Subida de fotos en reseñas
  Como usuario universitario
  Quiero subir fotos reales de mis platillos
  Para ayudar a otros a decidir qué pedir

  Scenario: The One Where the ITESO User Uploads Images
    Given que el usuario se registra con "juan.delmuro@iteso.mx"
    When crea una reseña
    Then puede subir imágenes

  Scenario: The One Where Gmail User Gets Blocked
    Given que el usuario se registra con "juan.delmuro@gmail.com"
    When intenta subir imágenes
    Then el sistema bloquea la acción

  Scenario: The One With the Valid JPG
    Given que el usuario selecciona un archivo JPG de 2MB
    When pulsa subir imagen
    Then el sistema acepta el archivo

  Scenario: The One With the Invalid PDF
    Given que el usuario selecciona un archivo PDF
    When intenta subirlo
    Then el sistema muestra "Formato no permitido"

  Scenario: The One With the Right File Size
    Given que el archivo pesa 3MB
    When intenta subirlo
    Then el archivo es aceptado

  Scenario: The One With the Oversized File
    Given que el archivo pesa 7MB
    When intenta subirlo
    Then el sistema muestra "El archivo supera el tamaño máximo permitido (5MB)."

  Scenario: The One Where Upload Works Smoothly
    Given que la conexión es estable
    When el usuario sube la foto
    Then el sistema asocia la foto a la reseña

  Scenario: The One Where Upload Fails
    Given que la conexión falla
    When el usuario intenta subir la foto
    Then el sistema muestra "No se pudo subir la foto"

  Scenario: The One With Normal Food
    Given que la foto contiene comida normal
    When el sistema analiza la imagen
    Then permite subirla

  Scenario: The One With Inappropriate Content
    Given que la foto contiene contenido inapropiado
    When el sistema analiza la imagen
    Then la subida es bloqueada
