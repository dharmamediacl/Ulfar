"use strict";
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const toggle = document.querySelector('.menu-toggle');
const mobile = document.getElementById('mobile-menu');
const logo = document.querySelector('.logo img');
function syncHeader() {
  const scrolled = !!hero && hero.getBoundingClientRect().bottom <= (header?.offsetHeight || 78);
  header?.classList.toggle('is-scrolled', scrolled);
  if (logo) logo.src = scrolled || header?.classList.contains('menu-open')
    ? 'assets/marca/ebano-oscuro.svg' : 'assets/marca/ebano-marfil.svg';
}
function closeMenu() {
  if(mobile) mobile.hidden = true;
  header?.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Abrir menú');
  syncHeader();
}
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  if(!open) return closeMenu();
  if(mobile) mobile.hidden = false;
  header?.classList.add('menu-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Cerrar menú');
  syncHeader();
});
mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
window.addEventListener('scroll', syncHeader, {passive:true});
window.addEventListener('resize', syncHeader);
syncHeader();

const serviceSelect = document.querySelector('#servicio');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    if (!serviceSelect) return;
    const option = Array.from(serviceSelect.options).find(o => o.value === link.dataset.service);
    if (option) {serviceSelect.value=option.value; serviceSelect.dispatchEvent(new Event('change', {bubbles:true}));}
  });
});
const quoteForm = document.querySelector('#quote-form');
quoteForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const data = new FormData(quoteForm);
  const get = key => String(data.get(key) || '').trim() || 'No indicado';
  const subject = 'Cotización ébano — ' + get('servicio');
  const body = [
    'SOLICITUD DE COTIZACIÓN — ÉBANO', '',
    'Nombre: ' + get('nombre'), 'Empresa: ' + get('empresa'),
    'Correo: ' + get('email'), 'WhatsApp: ' + get('telefono'),
    'Experiencia: ' + get('servicio'), 'Fecha: ' + get('fecha'),
    'Ciudad/comuna: ' + get('ubicacion'), 'Asistentes: ' + get('invitados'),
    'Presupuesto: ' + get('presupuesto'), '', 'IDEA DEL EVENTO', get('mensaje')
  ].join('\n');
  const status = document.getElementById('quote-status');
  if (status) status.textContent = 'Se abrirá tu aplicación de correo. Debes enviar el mensaje para completar la solicitud.';
  window.location.href = 'mailto:hola@ebano.dharmamedia.cl?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
