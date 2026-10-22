"use strict";
/* ÉBANO · versión «vida». Sin dependencias.
   Todo el movimiento respeta prefers-reduced-motion. */
const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const desktop = window.matchMedia('(min-width: 901px)');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

/* INTRO */
const endIntro = () => root.classList.add('intro-done');
if (reduced) endIntro(); else setTimeout(endIntro, 2300);

/* HEADER — sólido tras el hero, se esconde al bajar */
const header = $('.header');
const hero = $('.hero');
let lastY = window.scrollY;
function updateHeader() {
  const y = window.scrollY;
  const pastHero = hero ? y > hero.offsetHeight - header.offsetHeight : true;
  header.classList.toggle('is-solid', pastHero);
  const goingDown = y > lastY + 4, goingUp = y < lastY - 4;
  if (goingDown && y > 160 && !document.body.classList.contains('menu-open')) header.classList.add('is-hidden');
  if (goingUp || y < 160) header.classList.remove('is-hidden');
  lastY = y;
}

/* MENÚ A PANTALLA COMPLETA */
const toggle = $('.menu-toggle');
const menu = $('#menu');
function setMenu(open) {
  if (!menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    header.classList.remove('is-hidden');
  } else {
    menu.classList.remove('is-open');
    setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduced ? 0 : 700);
  }
}
const menuOpen = () => toggle?.getAttribute('aria-expanded') === 'true';
toggle?.addEventListener('click', () => setMenu(!menuOpen()));
$$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen()) { setMenu(false); toggle.focus(); } });
desktop.addEventListener('change', e => { if (e.matches) setMenu(false); });

/* APARICIONES AL SCROLL */
const revealIO = 'IntersectionObserver' in window && !reduced ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    (entry.target._reveal || [entry.target]).forEach(t => t.classList.add('is-in'));
    revealIO.unobserve(entry.target);
  });
}, {rootMargin: '0px 0px -8% 0px', threshold: 0.12}) : null;
$$('[data-reveal]').forEach(el => {
  if (!revealIO) return el.classList.add('is-in');
  // Lo que sube desde una máscara se observa a través de su contenedor visible
  const watch = el.closest('.hero-line') || el;
  (watch._reveal = watch._reveal || []).push(el);
  if (watch._reveal.length === 1) revealIO.observe(watch);
});

/* MANIFIESTO — cada palabra se enciende al leerla */
const fillEl = $('[data-fill]');
let words = [];
if (fillEl && !reduced) {
  const walk = node => {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(part);
          const w = document.createElement('span');
          w.className = 'w'; w.textContent = part;
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) walk(child);
    });
  };
  walk(fillEl);
  words = $$('.w', fillEl);
}
function updateFill() {
  if (!words.length) return;
  const r = fillEl.getBoundingClientRect(), vh = innerHeight;
  const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
  const lit = p * (words.length + 4);
  words.forEach((w, i) => w.style.setProperty('--o', (0.16 + 0.84 * clamp(lit - i)).toFixed(3)));
}

/* ACTOS — scroll horizontal fijado */
const acts = $('.acts');
const track = $('.acts-track');
const actsBar = $('.acts-progress span');
let actsDistance = 0;
function layoutActs() {
  if (!acts || !track) return;
  if (desktop.matches && !reduced) {
    actsDistance = Math.max(0, track.scrollWidth - innerWidth);
    acts.style.height = (innerHeight + actsDistance) + 'px';
  } else {
    actsDistance = 0;
    acts.style.height = '';
    track.style.transform = '';
  }
}
function updateActs() {
  if (!actsDistance) return;
  const p = clamp(-acts.getBoundingClientRect().top / actsDistance);
  track.style.transform = `translate3d(${(-p * actsDistance).toFixed(1)}px,0,0)`;
  actsBar?.style.setProperty('--p', p.toFixed(3));
}

/* PROCESO — la línea se enciende y los pasos se marcan */
const steps = $('.steps');
const stepItems = $$('.step');
function updateSteps() {
  if (!steps) return;
  const r = steps.getBoundingClientRect(), mark = innerHeight * 0.6;
  steps.style.setProperty('--p', clamp((mark - r.top) / r.height).toFixed(3));
  stepItems.forEach(s => s.classList.toggle('is-lit', s.getBoundingClientRect().top < mark));
}

/* PARALLAX */
const parallax = $$('[data-parallax]');
function updateParallax() {
  if (reduced) return;
  const vh = innerHeight;
  parallax.forEach(el => {
    const f = parseFloat(el.dataset.parallax) || 0;
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    if (el.classList.contains('hero-media')) {
      el.style.transform = `translate3d(0,${(window.scrollY * f).toFixed(1)}px,0)`;
    } else {
      // La imagen mide 120 % de su marco: nunca se mueve más del margen disponible
      const max = r.height * 0.09;
      el.style.setProperty('--py', clamp((r.top + r.height / 2 - vh / 2) * f, -max, max).toFixed(1) + 'px');
    }
  });
}

/* BUCLE DE SCROLL ÚNICO */
let ticking = false;
function onFrame() {
  ticking = false;
  updateHeader(); updateFill(); updateActs(); updateSteps(); updateParallax();
}
const requestTick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } };
addEventListener('scroll', requestTick, {passive: true});
addEventListener('resize', () => { layoutActs(); requestTick(); });
addEventListener('load', () => { layoutActs(); requestTick(); });
layoutActs(); onFrame();

/* CONTADOR */
$$('[data-count]').forEach(el => {
  const to = parseInt(el.dataset.count, 10) || 0;
  if (reduced || !('IntersectionObserver' in window)) { el.textContent = to; return; }
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = clamp((now - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, {threshold: 0.6});
  io.observe(el);
});

/* CURSOR, VISTA PREVIA DE EXPERIENCIAS Y BOTONES MAGNÉTICOS */
if (finePointer && !reduced) {
  const cursor = $('.cursor');
  const preview = $('.exp-preview');
  const previewInner = $('.exp-preview-inner');
  const mouse = {x: innerWidth / 2, y: innerHeight / 2};
  const cur = {...mouse}, prev = {...mouse};
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, {passive: true});
  document.addEventListener('mouseleave', () => cursor?.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => cursor?.classList.remove('is-hidden'));
  document.addEventListener('mouseover', e => {
    cursor?.classList.toggle('is-link', !!e.target.closest('a,button,summary,label,[data-magnetic]'));
  });
  (function loop() {
    cur.x += (mouse.x - cur.x) * 0.35; cur.y += (mouse.y - cur.y) * 0.35;
    prev.x += (mouse.x - prev.x) * 0.12; prev.y += (mouse.y - prev.y) * 0.12;
    if (cursor) cursor.style.transform = `translate3d(${cur.x}px,${cur.y}px,0)`;
    if (preview) preview.style.transform = `translate3d(${prev.x}px,${prev.y}px,0)`;
    requestAnimationFrame(loop);
  })();

  $$('.exp').forEach(item => {
    const img = new Image(); img.src = item.dataset.img; // precarga
    item.addEventListener('mouseenter', () => {
      previewInner.style.backgroundImage = `url("${item.dataset.img}")`;
      preview.style.setProperty('--rot', (Math.random() * 8 - 4).toFixed(1) + 'deg');
      preview.classList.add('is-on');
      cursor?.classList.add('is-hidden');
    });
  });
  $('.exp-list')?.addEventListener('mouseleave', () => {
    preview.classList.remove('is-on');
    cursor?.classList.remove('is-hidden');
  });

  $$('[data-magnetic]').forEach(el => {
    el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.18}px,${dy * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* SECCIÓN ACTIVA EN LA NAVEGACIÓN */
const navLinks = $$('.nav a');
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
  $$('main > section[id]').forEach(s => spy.observe(s));
}

/* PRESELECCIÓN DE EXPERIENCIA */
const chips = $('.chips');
document.addEventListener('click', e => {
  const link = e.target.closest('[data-service]');
  if (!link) return;
  const radio = $$('input[name="servicio"]').find(r => r.value === link.dataset.service);
  if (radio) { radio.checked = true; chips?.classList.remove('is-invalid'); }
});
chips?.addEventListener('change', () => chips.classList.remove('is-invalid'));

/* COTIZACIÓN
   Por defecto (data-api="off") abre un borrador de correo prellenado.
   Con data-api="on" envía primero a form.action y espera JSON {"ok":true};
   si el servidor falla, vuelve al borrador de correo. */
const quoteForm = $('#quote-form');
const status = $('#quote-status');
const dateInput = $('#quote-date');
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
    const firstInvalid = quoteForm.querySelector('input:invalid, select:invalid, textarea:invalid');
    if (firstInvalid?.name === 'servicio') {
      chips?.classList.add('is-invalid');
      showStatus('Elige qué experiencia buscas para continuar.', true);
    }
    quoteForm.reportValidity();
    firstInvalid?.focus();
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
const footerYear = $('#footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();
