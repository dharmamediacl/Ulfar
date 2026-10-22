"use strict";
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const toggle = document.querySelector('.menu-toggle');
const mobile = document.getElementById('mobile-menu');
const desktopNav = window.matchMedia('(min-width: 861px)');

/* HEADER — sólido en cuanto el hero sale de pantalla */
function setScrolled(scrolled) {
  header?.classList.toggle('is-scrolled', scrolled);
}
if (hero && header && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
    rootMargin: `-${header.offsetHeight}px 0px 0px 0px`
  }).observe(hero);
} else {
  setScrolled(true);
}

/* MENÚ MÓVIL */
function setMenu(open) {
  if (mobile) mobile.hidden = !open;
  header?.classList.toggle('menu-open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
const isMenuOpen = () => toggle?.getAttribute('aria-expanded') === 'true';
toggle?.addEventListener('click', () => setMenu(!isMenuOpen()));
mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isMenuOpen()) { setMenu(false); toggle.focus(); }
});
document.addEventListener('click', e => {
  if (isMenuOpen() && !header.contains(e.target)) setMenu(false);
});
desktopNav.addEventListener('change', e => { if (e.matches) setMenu(false); });

/* SECCIÓN ACTIVA EN LA NAVEGACIÓN */
const navLinks = document.querySelectorAll('.nav-left a, .nav-right a, .mobile-menu a');
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => {
        if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-45% 0px -50% 0px'});
  document.querySelectorAll('main > section[id]').forEach(s => spy.observe(s));
}

/* PRESELECCIÓN DE EXPERIENCIA DESDE TARJETAS Y FOOTER */
const serviceSelect = document.querySelector('#servicio');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    if (!serviceSelect) return;
    const option = Array.from(serviceSelect.options).find(o => o.value === link.dataset.service);
    if (option) {serviceSelect.value = option.value; serviceSelect.dispatchEvent(new Event('change', {bubbles:true}));}
  });
});

/* COTIZACIÓN
   Por defecto (data-api="off") abre un borrador de correo prellenado.
   Con data-api="on" envía primero a form.action y espera JSON {"ok":true};
   si el servidor falla, vuelve al borrador de correo. */
const quoteForm = document.querySelector('#quote-form');
const status = document.getElementById('quote-status');
const dateInput = document.getElementById('quote-date');
const MAIL_TO = 'hola@ebano.dharmamedia.cl';

if (dateInput) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().slice(0, 10);
}
function showStatus(text, isError = false) {
  if (!status) return;
  status.textContent = text;
  status.classList.toggle('is-error', isError);
}
function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}-${m}-${y}` : iso;
}
function openMailDraft(data, prefix = '') {
  const get = key => String(data.get(key) || '').trim() || 'No indicado';
  const fecha = String(data.get('fecha') || '').trim();
  const subject = 'Cotización ÉBANO — ' + get('servicio');
  const body = [
    'SOLICITUD DE COTIZACIÓN — ÉBANO', '',
    'Nombre: ' + get('nombre'), 'Empresa: ' + get('empresa'),
    'Correo: ' + get('email'), 'WhatsApp: ' + get('telefono'),
    'Experiencia: ' + get('servicio'), 'Fecha: ' + (fecha ? formatDate(fecha) : 'No indicado'),
    'Ciudad/comuna: ' + get('ubicacion'), 'Asistentes: ' + get('invitados'),
    'Presupuesto: ' + get('presupuesto'), '', 'IDEA DEL EVENTO', get('mensaje')
  ].join('\n');
  showStatus(prefix + 'Se abrió tu aplicación de correo con la solicitud lista. Envía el mensaje para completarla. Si no se abrió, escríbenos a ' + MAIL_TO + '.');
  window.location.href = 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}
async function sendToApi(form, data) {
  const res = await fetch(form.action, {method: 'POST', body: data, headers: {Accept: 'application/json'}});
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok !== true) throw new Error(json.error || 'HTTP ' + res.status);
}
quoteForm?.addEventListener('submit', async e => {
  e.preventDefault();
  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    quoteForm.querySelector(':invalid')?.focus();
    return;
  }
  const data = new FormData(quoteForm);
  if (String(data.get('website') || '').trim()) return; // campo trampa: bot
  data.delete('website');

  const useApi = quoteForm.dataset.api === 'on' && location.protocol.startsWith('http');
  if (!useApi) return openMailDraft(data);

  const submit = quoteForm.querySelector('[type="submit"]');
  submit?.setAttribute('disabled', '');
  showStatus('Enviando tu solicitud…');
  try {
    await sendToApi(quoteForm, data);
    quoteForm.reset();
    showStatus('¡Gracias! Recibimos tu solicitud y te responderemos a la brevedad.');
  } catch {
    openMailDraft(data, 'No pudimos enviar desde el sitio. ');
    status?.classList.add('is-error');
  } finally {
    submit?.removeAttribute('disabled');
  }
});

/* AÑO DEL FOOTER */
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();
