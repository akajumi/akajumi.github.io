const boton = document.getElementById('lanzar-notificaciones')
let consola = document.getElementById('consola')
let mensaje_consola = "Mensajes de la consola."

function mostrar_boton_notificacion() {
  // Verificar que el navegador soporta otificaciones
  if (('Notification' in window)) {
    mensaje_consola = "<p>El navegador soporta notificaciones.</p><p>Ahora mismo las notificaciones están en estado: <strong>" + Notification.permission + "</strong></p>"
    consola.innerHTML = mensaje_consola
    document.getElementById("con-notificaciones").classList.add('visible')
  } else {
    mensaje_consola = "<p>El navegador NO soporta notificaciones.</p>"
    consola.innerHTML = mensaje_consola
    document.getElementById("sin-notificaciones").classList.add('visible')
  }
}

function lanzar_notificacion() {
  if (Notification.permission === "granted") {
    mensaje_consola = "<p>LANZAR NOTIFICACIÓN</p>"
    consola.innerHTML = mensaje_consola
    lanzar_notificacion_demo()
  } else if (Notification.permission !== "denied") {
    lanzar_solicitud_notificacion()
  } else {
    mensaje_consola = "<p>Las notificaciones no están permitidas.</p>"
    consola.innerHTML = mensaje_consola
  }
}

function lanzar_solicitud_notificacion() {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'denied') {
      mensaje_consola = "<p>Se ha hecho click en 'Bloquear' las notificaciones.</p>"
      consola.innerHTML = mensaje_consola
      return
    } else if (permission === 'default') {
      mensaje_consola = "<p>La ventana de solicitud de permisos se ha cerrado sin hacer click en 'Permitir' o 'Bloquear'.</p>"
      consola.innerHTML = mensaje_consola
      return
    }
    mensaje_consola = "<p>Lanzada Notificación de prueba.</p>"
    consola.innerHTML = mensaje_consola
    const notificacion = new Notification("Lanzada Notificación de prueba.")
    lanzar_notificacion_demo()
  })
}

function lanzar_notificacion_demo() {
  mensaje_consola = "<p>Lanzada notificación.</p>"
  consola.innerHTML = mensaje_consola
  const notificacion = new Notification("Notificación del servidor")
}

// Inicializamos la aplicación
if (boton) {
  if (document.addEventListener) {
    window.addEventListener("load", mostrar_boton_notificacion, false)
    boton.addEventListener('click', lanzar_notificacion)
  } else {
    window.attachEvent("onload", mostrar_boton_notificacion)
    boton.attachEvent('onclick', lanzar_notificacion)
  }
}
