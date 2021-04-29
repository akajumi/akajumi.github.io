let consola_modal = document.getElementById('consola-modal')
const notification_modal = document.getElementById('notification-modal')
const boton_cerrar = document.getElementById('boton-cerrar')
const boton_aceptar = document.getElementById('aceptar-notificaciones')
const boton_rechazar = document.getElementById('rechazar-notificaciones')


function modal_on_delay() {
  if (Notification.permission === "granted") {
    mensaje_consola = "<p>Las notificaciones ya han sido aceptadas. NO se mostrará el popup.</p>"
    if (consola_modal) consola_modal.innerHTML = mensaje_consola
    return
  } else if (Notification.permission === "denied") {
    mensaje_consola = "<p>Las notificaciones ya han sido rechazadas. NO se mostrará el popup.</p>"
    if (consola_modal) consola_modal.innerHTML = mensaje_consola
  } else {
    mensaje_consola = "<p>Las notificaciones no han sido aceptadas o rechazadas. Lanzar popup.</p>"
    consola_modal.innerHTML = mensaje_consola

    const timeToShowModal = 3000; // 30000 = 30 segundos
    const timeNow = new Date().getTime()
    const timeToShowAgain = 1000; // 30 * 24 * 60 * 60 * 1000 = 30 días
    const newExpirationDate = new Date().getTime() + timeToShowAgain

    if (!localStorage.modalExpirtationTime || timeNow > localStorage.modalExpirtationTime) {
      setTimeout(function() {
        notification_modal.classList.add('visible')
        localStorage.modalExpirtationTime = newExpirationDate;
      }, timeToShowModal);
    } else {
      mensaje_consola = "<p>Las notificaciones no han sido aceptadas o rechazadas.</p><p>Pero se cerro este modal y no ha pasado el tiempo establecido para mostrar el mensaje de nuevo.</p>"
      if (consola_modal) consola_modal.innerHTML = mensaje_consola
    }
  }
}

function cerrar_modal_notificaciones() {
  notification_modal.classList.remove('visible')
}

function lanzar_solicitud_notificacion_desde_modal() {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'denied') {
      mensaje_consola = "<p>Se ha hecho click en 'Bloquear' las notificaciones.</p>"
      if (consola_modal) consola_modal.innerHTML = mensaje_consola
      cerrar_modal_notificaciones()
      return
    } else if (permission === 'default') {
      mensaje_consola = "<p>La ventana de solicitud de permisos se ha cerrado sin hacer click en 'Permitir' o 'Bloquear'.</p>"
      if (consola_modal) consola_modal.innerHTML = mensaje_consola
      cerrar_modal_notificaciones()
      return
    }
    mensaje_consola = "<p>Lanzada Notificación de prueba.</p>"
    if (consola_modal) consola.innerHTML = mensaje_consola
    const notificacion = new Notification("Lanzada Notificación de prueba.")
    cerrar_modal_notificaciones()
  })
}

if (document.addEventListener){
  window.addEventListener("load", modal_on_delay, false)
  boton_cerrar.addEventListener('click', cerrar_modal_notificaciones, false)
  boton_aceptar.addEventListener('click', lanzar_solicitud_notificacion_desde_modal, false)
  boton_rechazar.addEventListener('click', cerrar_modal_notificaciones, false)
} else {
  window.attachEvent("onload", modal_on_delay)
  boton_cerrar.attachEvent("onclick", cerrar_modal_notificaciones)
  boton_aceptar.attachEvent('onclick', lanzar_solicitud_notificacion_desde_modal)
  boton_rechazar.attachEvent("onclick", cerrar_modal_notificaciones)
}
