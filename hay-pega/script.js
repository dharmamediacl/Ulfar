// ============================================================
// HAY PEGA — datos y lógica del buscador
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Datos maestros ---------- */
const REGIONS = ['Región Metropolitana', 'Los Lagos', 'Maule', 'Ñuble', 'Araucanía', 'Biobío'];

const COMUNAS = {
  'Región Metropolitana': ['Santiago Centro', 'Providencia', 'Ñuñoa', 'Las Condes', 'Maipú', 'Puente Alto'],
  'Los Lagos': ['Puerto Montt', 'Osorno', 'Puerto Varas', 'Castro', 'Ancud'],
  'Maule': ['Talca', 'Curicó', 'Linares', 'San Clemente', 'Constitución'],
  'Ñuble': ['Chillán', 'San Carlos', 'Bulnes', 'Coihueco'],
  'Araucanía': ['Temuco', 'Angol', 'Villarrica', 'Pucón', 'Victoria'],
  'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel', 'Chiguayante']
};

const RUBROS = [
  'Administración y oficina', 'Ventas y retail', 'Atención al cliente y call center', 'Salud',
  'Educación', 'Construcción y obras', 'Logística y bodega', 'Transporte y conducción',
  'Gastronomía y hotelería', 'Aseo y servicios generales', 'Producción e industria',
  'Agrícola y forestal', 'Seguridad y guardias', 'Tecnología e informática',
  'Contabilidad y finanzas', 'Marketing y diseño'
];

const NIVELES = ['Sin estudios requeridos', 'Enseñanza media completa', 'Técnico de nivel medio', 'Técnico de nivel superior', 'Universitaria'];
const JORNADAS = ['Jornada completa', 'Media jornada', 'Part time', 'Turnos rotativos', 'Turno noche', 'Fines de semana', 'Por horas'];
const MODALIDADES = ['Presencial', 'Híbrido', 'Remoto (home office)'];
const CONTRATOS = ['Plazo fijo', 'Indefinido', 'Por obra o faena', 'Honorarios', 'Reemplazo', 'Temporada', 'Práctica profesional'];
const EXPERIENCIAS = ['Sin experiencia', 'Menos de 1 año', '1 a 3 años', 'Más de 3 años'];
const FECHAS = [
  { value: 'hoy', label: 'Hoy' },
  { value: '3dias', label: 'Últimos 3 días' },
  { value: 'semana', label: 'Última semana' },
  { value: 'mes', label: 'Último mes' }
];
const CARRERAS = [
  'Técnico en enfermería', 'Ingeniería comercial', 'Contador auditor', 'Técnico en administración',
  'Pedagogía en educación básica', 'Ingeniería en informática', 'Técnico en logística',
  'Trabajo social', 'Diseño gráfico', 'Técnico agrícola', 'Gastronomía y cocina',
  'Construcción civil', 'Enfermería universitaria', 'Marketing y publicidad'
];

/* ---------- Vacantes de prueba ---------- */
const JOBS = [
  { id: 1, cargo: 'Vendedor/a de Tienda', empresa: 'Retail Sur Ltda', region: 'Los Lagos', comuna: 'Puerto Montt', rubro: 'Ventas y retail', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Plazo fijo', experiencia: 'Sin experiencia', nivel: 'Enseñanza media completa', sueldo: 650000, diasAgo: 1,
    descripcion: 'Buscamos vendedor/a con buena disposición para atender público en tienda de retail, orientado a cumplir metas de venta.',
    requisitos: ['Enseñanza media completa', 'Disponibilidad inmediata', 'Experiencia en atención de público (deseable)'],
    beneficios: ['Comisiones por venta', 'Colación incluida', 'Capacitación pagada'] },
  { id: 2, cargo: 'Enfermero/a Clínico', empresa: 'Centro Médico Andes', region: 'Región Metropolitana', comuna: 'Providencia', rubro: 'Salud', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Indefinido', experiencia: '1 a 3 años', nivel: 'Universitaria', sueldo: 1200000, diasAgo: 2,
    descripcion: 'Centro médico busca enfermero/a para atención clínica ambulatoria, turnos diurnos de lunes a viernes.',
    requisitos: ['Título de enfermería universitaria', 'Registro Superintendencia de Salud vigente', '1 a 3 años de experiencia clínica'],
    beneficios: ['Seguro complementario', 'Turnos fijos', 'Estacionamiento'] },
  { id: 3, cargo: 'Profesor/a de Enseñanza Básica', empresa: 'Colegio San Rafael', region: 'Maule', comuna: 'Talca', rubro: 'Educación', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Plazo fijo', experiencia: 'Más de 3 años', nivel: 'Universitaria', sueldo: 900000, diasAgo: 3,
    descripcion: 'Colegio particular subvencionado busca profesor/a de enseñanza básica para segundo ciclo, año escolar completo.',
    requisitos: ['Título de pedagogía en educación básica', 'Idoneidad docente al día', 'Experiencia en aula'],
    beneficios: ['Contrato por año escolar', 'Bono de colación', 'Perfeccionamiento docente'] },
  { id: 4, cargo: 'Conductor/a de Reparto', empresa: 'Logística Sur SpA', region: 'Ñuble', comuna: 'Chillán', rubro: 'Transporte y conducción', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Indefinido', experiencia: '1 a 3 años', nivel: 'Enseñanza media completa', sueldo: 750000, diasAgo: 5,
    descripcion: 'Empresa de logística busca conductor/a con licencia clase B para reparto de mercadería en la provincia.',
    requisitos: ['Licencia de conducir clase B vigente', 'Experiencia en reparto o distribución', 'Disponibilidad para viajar dentro de la región'],
    beneficios: ['Vehículo de la empresa', 'Bono de puntualidad', 'Contrato indefinido'] },
  { id: 5, cargo: 'Garzón/a', empresa: 'Restobar La Terraza', region: 'Araucanía', comuna: 'Temuco', rubro: 'Gastronomía y hotelería', jornada: 'Part time', modalidad: 'Presencial', contrato: 'Honorarios', experiencia: 'Sin experiencia', nivel: 'Enseñanza media completa', sueldo: 550000, diasAgo: 1,
    descripcion: 'Restobar busca garzón/a para turnos de tarde-noche, ambiente dinámico y buena propina.',
    requisitos: ['Enseñanza media completa', 'Buena disposición y trabajo en equipo', 'Disponibilidad fines de semana'],
    beneficios: ['Propinas', 'Turnos flexibles', 'Colación incluida'] },
  { id: 6, cargo: 'Maestro Albañil', empresa: 'Constructora Rukan', region: 'Biobío', comuna: 'Concepción', rubro: 'Construcción y obras', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Por obra o faena', experiencia: 'Más de 3 años', nivel: 'Técnico de nivel medio', sueldo: 1100000, diasAgo: 4,
    descripcion: 'Constructora busca maestro albañil con experiencia en obra gruesa para proyecto habitacional.',
    requisitos: ['Experiencia comprobable en obra gruesa', 'Herramientas propias (deseable)', 'Disponibilidad inmediata'],
    beneficios: ['Movilización', 'Pago semanal', 'Contrato por faena'] },
  { id: 7, cargo: 'Asistente Administrativo/a', empresa: 'Comercial Andina Ltda', region: 'Región Metropolitana', comuna: 'Ñuñoa', rubro: 'Administración y oficina', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Plazo fijo', experiencia: 'Menos de 1 año', nivel: 'Técnico de nivel superior', sueldo: 700000, diasAgo: 2,
    descripcion: 'Empresa comercial busca asistente administrativo/a para apoyo en gestión documental y atención de proveedores.',
    requisitos: ['Técnico en administración o afín', 'Manejo de Excel a nivel intermedio', 'Buena redacción'],
    beneficios: ['Horario de lunes a viernes', 'Bono de colación', 'Posibilidad de renovación'] },
  { id: 8, cargo: 'Ejecutivo/a Call Center', empresa: 'Contacto Directo SpA', region: 'Región Metropolitana', comuna: 'Santiago Centro', rubro: 'Atención al cliente y call center', jornada: 'Jornada completa', modalidad: 'Presencial', contrato: 'Indefinido', experiencia: 'Sin experiencia', nivel: 'Enseñanza media completa', sueldo: 620000, diasAgo: 6,
    descripcion: 'Empresa de contact center busca ejecutivos/as para atención de clientes vía telefónica, turnos rotativos.',
    requisitos: ['Enseñanza media completa', 'Buena dicción', 'Disponibilidad para turnos rotativos'],
    beneficios: ['Sueldo base más comisiones', 'Capacitación pagada', 'Línea de carrera'] },
  { id: 9, cargo: 'Desarrollador/a Junior', empresa: 'TechSur Soluciones', region: 'Biobío', comuna: 'Concepción', rubro: 'Tecnología e informática', jornada: 'Jornada completa', modalidad: 'Remoto (home office)', contrato: 'Indefinido', experiencia: 'Menos de 1 año', nivel: 'Técnico de nivel superior', sueldo: 1400000, diasAgo: 3,
    descripcion: 'Empresa de desarrollo de software busca programador/a junior para trabajo remoto, stack JavaScript.',
    requisitos: ['Conocimientos en JavaScript y HTML/CSS', 'Portafolio o proyectos personales', 'Ganas de aprender'],
    beneficios: ['100% remoto', 'Equipo entregado por la empresa', 'Horario flexible'] },
  { id: 10, cargo: 'Operario/a de Producción', empresa: 'Agroindustrial Los Lagos', region: 'Los Lagos', comuna: 'Osorno', rubro: 'Producción e industria', jornada: 'Turnos rotativos', modalidad: 'Presencial', contrato: 'Temporada', experiencia: 'Sin experiencia', nivel: 'Sin estudios requeridos', sueldo: 680000, diasAgo: 1,
    descripcion: 'Planta agroindustrial busca operarios/as de producción para temporada, turnos rotativos día y noche.',
    requisitos: ['Disponibilidad inmediata', 'Disponibilidad para turnos rotativos', 'Sin experiencia previa requerida'],
    beneficios: ['Movilización desde puntos de encuentro', 'Colación incluida', 'Posibilidad de recontratación'] },
  { id: 11, cargo: 'Contador/a Junior', empresa: 'Estudio Contable Maule', region: 'Maule', comuna: 'Curicó', rubro: 'Contabilidad y finanzas', jornada: 'Jornada completa', modalidad: 'Híbrido', contrato: 'Indefinido', experiencia: '1 a 3 años', nivel: 'Universitaria', sueldo: 1000000, diasAgo: 5,
    descripcion: 'Estudio contable busca contador/a junior para manejo de cartera de clientes PYME.',
    requisitos: ['Título de contador auditor', 'Manejo de sistema de contabilidad', '1 a 3 años de experiencia'],
    beneficios: ['Modalidad híbrida', 'Bono de término de año', 'Capacitación continua'] },
  { id: 12, cargo: 'Guardia de Seguridad', empresa: 'Seguridad Total Ltda', region: 'Araucanía', comuna: 'Angol', rubro: 'Seguridad y guardias', jornada: 'Turno noche', modalidad: 'Presencial', contrato: 'Plazo fijo', experiencia: 'Sin experiencia', nivel: 'Enseñanza media completa', sueldo: 600000, diasAgo: 2,
    descripcion: 'Empresa de seguridad busca guardias para turno noche en centro comercial, OS-10 al día.',
    requisitos: ['OS-10 vigente', 'Enseñanza media completa', 'Disponibilidad para turno noche'],
    beneficios: ['Uniforme entregado', 'Turnos fijos', 'Pago puntual'] },
  { id: 13, cargo: 'Temporero/a Agrícola', empresa: 'Agrícola Frutos del Maule', region: 'Maule', comuna: 'San Clemente', rubro: 'Agrícola y forestal', jornada: 'Por horas', modalidad: 'Presencial', contrato: 'Temporada', experiencia: 'Sin experiencia', nivel: 'Sin estudios requeridos', sueldo: 520000, diasAgo: 1,
    descripcion: 'Agrícola busca temporeros/as para labores de cosecha de temporada, pago por trato o por hora.',
    requisitos: ['Disponibilidad inmediata', 'Buena condición física', 'Sin experiencia previa requerida'],
    beneficios: ['Movilización incluida', 'Colación', 'Pago semanal'] },
  { id: 14, cargo: 'Diseñador/a Gráfico Junior', empresa: 'Estudio Creativo Sur', region: 'Los Lagos', comuna: 'Puerto Varas', rubro: 'Marketing y diseño', jornada: 'Part time', modalidad: 'Remoto (home office)', contrato: 'Honorarios', experiencia: 'Menos de 1 año', nivel: 'Técnico de nivel superior', sueldo: 780000, diasAgo: 4,
    descripcion: 'Estudio creativo busca diseñador/a junior para piezas gráficas de redes sociales y branding.',
    requisitos: ['Manejo de Adobe Illustrator y Photoshop', 'Portafolio de diseño', 'Creatividad y puntualidad en entregas'],
    beneficios: ['Trabajo remoto', 'Horario flexible', 'Proyectos variados'] }
];

/* ---------- Estado de filtros ---------- */
const state = {
  query: '',
  region: [],
  comuna: '',
  rubro: [],
  nivel: [],
  carrera: '',
  jornada: [],
  modalidad: [],
  contrato: [],
  experiencia: '',
  fecha: '',
  sueldoMin: 0,
  sueldoMax: 2000000,
  sort: 'recientes'
};

let visibleCount = 6;
let savedJobs = new Set();

/* ---------- Utilidades ---------- */
const fmtCLP = n => '$' + n.toLocaleString('es-CL');

function fechaMatch(diasAgo, filtro) {
  if (!filtro) return true;
  if (filtro === 'hoy') return diasAgo <= 1;
  if (filtro === '3dias') return diasAgo <= 3;
  if (filtro === 'semana') return diasAgo <= 7;
  if (filtro === 'mes') return diasAgo <= 30;
  return true;
}

function filterJobs() {
  return JOBS.filter(j => {
    if (state.query) {
      const q = state.query.toLowerCase();
      if (!j.cargo.toLowerCase().includes(q) && !j.empresa.toLowerCase().includes(q)) return false;
    }
    if (state.region.length && !state.region.includes(j.region)) return false;
    if (state.comuna && j.comuna !== state.comuna) return false;
    if (state.rubro.length && !state.rubro.includes(j.rubro)) return false;
    if (state.nivel.length && !state.nivel.includes(j.nivel)) return false;
    if (state.carrera) {
      // la carrera es informativa; no todos los cargos tienen carrera asociada explícita, filtra por texto en cargo/rubro
      const c = state.carrera.toLowerCase();
      if (!j.cargo.toLowerCase().includes(c) && !j.rubro.toLowerCase().includes(c)) return false;
    }
    if (state.jornada.length && !state.jornada.includes(j.jornada)) return false;
    if (state.modalidad.length && !state.modalidad.includes(j.modalidad)) return false;
    if (state.contrato.length && !state.contrato.includes(j.contrato)) return false;
    if (state.experiencia && j.experiencia !== state.experiencia) return false;
    if (!fechaMatch(j.diasAgo, state.fecha)) return false;
    if (j.sueldo < state.sueldoMin || j.sueldo > state.sueldoMax) return false;
    return true;
  });
}

function sortJobs(list) {
  const arr = [...list];
  if (state.sort === 'recientes') arr.sort((a, b) => a.diasAgo - b.diasAgo);
  else if (state.sort === 'sueldo') arr.sort((a, b) => b.sueldo - a.sueldo);
  else if (state.sort === 'cercanas') {
    arr.sort((a, b) => {
      const aMatch = state.region.includes(a.region) ? 0 : 1;
      const bMatch = state.region.includes(b.region) ? 0 : 1;
      return aMatch - bMatch || a.diasAgo - b.diasAgo;
    });
  }
  return arr;
}

/* ---------- Definición de grupos de filtros ---------- */
function checkboxGroup(name, key, options, showMoreAfter) {
  const limited = showMoreAfter ? options.slice(0, showMoreAfter) : options;
  const rest = showMoreAfter ? options.slice(showMoreAfter) : [];
  let html = `<div class="filter-group__body" data-key="${key}">`;
  limited.forEach(opt => {
    html += optRow(key, opt);
  });
  if (rest.length) {
    html += `<div class="see-more-wrap">`;
    rest.forEach(opt => { html += optRow(key, opt, true); });
    html += `</div><button type="button" class="see-more" data-toggle-more>Ver más</button>`;
  }
  html += `</div>`;
  return html;
}
function optRow(key, opt, hiddenExtra) {
  return `<label class="opt"${hiddenExtra ? ' style="display:none" data-extra' : ''}>
    <input type="checkbox" data-filter="${key}" value="${opt}"> ${opt}
  </label>`;
}
function radioGroup(key, options, valueKey) {
  let html = `<div class="filter-group__body" data-key="${key}">`;
  options.forEach(opt => {
    const val = valueKey ? opt.value : opt;
    const label = valueKey ? opt.label : opt;
    html += `<label class="opt"><input type="radio" name="${key}-${Math.random()}" data-filter-radio="${key}" value="${val}"> ${label}</label>`;
  });
  html += `</div>`;
  return html;
}

function buildFilterGroupsHTML(suffix) {
  const regionBody = checkboxGroup('region', 'region', REGIONS);
  const comunaBody = `<div class="filter-group__body" data-key="comuna">
    <select class="filter-select" data-comuna-select disabled>
      <option value="">Primero elige una región</option>
    </select>
  </div>`;
  const rubroBody = checkboxGroup('rubro', 'rubro', RUBROS, 8);
  const carreraBody = `<div class="filter-group__body" data-key="carrera">
    <input type="text" class="filter-text" placeholder="Escribe tu carrera. Ej: Técnico en enfermería" data-carrera-input list="carreras-list">
    <div class="autocomplete-list" data-carrera-list style="display:none"></div>
    <div style="margin-top:12px; display:flex; flex-direction:column; gap:10px;">
      ${NIVELES.map(n => optRow('nivel', n)).join('')}
    </div>
  </div>`;
  const jornadaBody = checkboxGroup('jornada', 'jornada', JORNADAS);
  const modalidadBody = checkboxGroup('modalidad', 'modalidad', MODALIDADES);
  const contratoBody = checkboxGroup('contrato', 'contrato', CONTRATOS);
  const experienciaBody = radioGroup('experiencia', EXPERIENCIAS);
  const sueldoBody = `<div class="filter-group__body" data-key="sueldo">
    <div class="range-slider">
      <div class="range-track"></div>
      <div class="range-track__fill" data-fill></div>
      <input type="range" min="0" max="2000000" step="50000" value="0" data-range="min">
      <input type="range" min="0" max="2000000" step="50000" value="2000000" data-range="max">
    </div>
    <div class="range-values"><span data-range-label="min">$0</span><span data-range-label="max">$2.000.000+</span></div>
  </div>`;
  const fechaBody = radioGroup('fecha', FECHAS, true);

  const groups = [
    ['Región', regionBody, 'region'],
    ['Comuna', comunaBody, 'comuna'],
    ['Área o rubro', rubroBody, 'rubro'],
    ['Carrera o formación', carreraBody, 'carreraNivel'],
    ['Jornada y horario', jornadaBody, 'jornada'],
    ['Modalidad', modalidadBody, 'modalidad'],
    ['Tipo de contrato', contratoBody, 'contrato'],
    ['Experiencia', experienciaBody, 'experiencia'],
    ['Sueldo líquido', sueldoBody, 'sueldo'],
    ['Fecha de publicación', fechaBody, 'fecha']
  ];

  return groups.map(([title, body, countKey], i) => `
    <div class="filter-group ${i === 0 ? 'open' : ''}" data-group="${countKey}">
      <button type="button" class="filter-group__trigger">
        <span>${title} <span class="filter-group__count hidden" data-count></span></span>
        <span class="filter-group__caret">▾</span>
      </button>
      <div class="filter-group__panel">${body}</div>
    </div>
  `).join('');
}

document.getElementById('filterGroupsDesktop').innerHTML = buildFilterGroupsHTML('desktop');
document.getElementById('filterGroupsMobile').innerHTML = buildFilterGroupsHTML('mobile');

/* ---------- Wiring genérico para ambos paneles (desktop + mobile) ---------- */
function wirePanel(root) {
  // Accordion open/close
  root.querySelectorAll('.filter-group__trigger').forEach(trig => {
    trig.addEventListener('click', () => {
      trig.closest('.filter-group').classList.toggle('open');
    });
  });

  // Ver más
  root.querySelectorAll('[data-toggle-more]').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.previousElementSibling;
      const hidden = wrap.querySelectorAll('[data-extra]');
      const isHidden = hidden[0].style.display === 'none';
      hidden.forEach(el => el.style.display = isHidden ? 'flex' : 'none');
      btn.textContent = isHidden ? 'Ver menos' : 'Ver más';
    });
  });

  // Checkboxes multi
  root.querySelectorAll('input[data-filter]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.dataset.filter;
      const val = cb.value;
      const arr = state[key];
      if (cb.checked) { if (!arr.includes(val)) arr.push(val); }
      else { state[key] = arr.filter(v => v !== val); }
      syncCheckState(key, val, cb.checked);
      updateGroupCounts();
      if (key === 'region') updateComunaSelect(root);
    });
  });

  // Radios
  root.querySelectorAll('input[data-filter-radio]').forEach(rb => {
    rb.addEventListener('change', () => {
      const key = rb.dataset.filterRadio;
      state[key] = rb.value;
      syncRadioState(key, rb.value);
      updateGroupCounts();
    });
  });

  // Comuna select
  const comunaSelect = root.querySelector('[data-comuna-select]');
  if (comunaSelect) {
    comunaSelect.addEventListener('change', () => {
      state.comuna = comunaSelect.value;
      syncComunaState(comunaSelect.value);
      updateGroupCounts();
    });
  }

  // Carrera autocomplete
  const carreraInput = root.querySelector('[data-carrera-input]');
  const carreraList = root.querySelector('[data-carrera-list]');
  if (carreraInput) {
    carreraInput.addEventListener('input', () => {
      const q = carreraInput.value.trim().toLowerCase();
      state.carrera = carreraInput.value.trim();
      if (!q) { carreraList.style.display = 'none'; carreraList.innerHTML = ''; updateGroupCounts(); return; }
      const matches = CARRERAS.filter(c => c.toLowerCase().includes(q)).slice(0, 6);
      if (matches.length) {
        carreraList.innerHTML = matches.map(c => `<button type="button">${c}</button>`).join('');
        carreraList.style.display = 'block';
        carreraList.querySelectorAll('button').forEach(b => {
          b.addEventListener('click', () => {
            carreraInput.value = b.textContent;
            state.carrera = b.textContent;
            carreraList.style.display = 'none';
            syncCarreraState(b.textContent);
            updateGroupCounts();
          });
        });
      } else {
        carreraList.style.display = 'none';
      }
      updateGroupCounts();
    });
  }

  // Salary range
  const minR = root.querySelector('input[data-range="min"]');
  const maxR = root.querySelector('input[data-range="max"]');
  const fill = root.querySelector('[data-fill]');
  const minLabel = root.querySelector('[data-range-label="min"]');
  const maxLabel = root.querySelector('[data-range-label="max"]');
  if (minR && maxR) {
    function updateRange() {
      let mn = parseInt(minR.value), mx = parseInt(maxR.value);
      if (mn > mx) { [mn, mx] = [mx, mn]; }
      state.sueldoMin = mn;
      state.sueldoMax = mx;
      const pctMin = (mn / 2000000) * 100;
      const pctMax = (mx / 2000000) * 100;
      fill.style.left = pctMin + '%';
      fill.style.width = (pctMax - pctMin) + '%';
      minLabel.textContent = fmtCLP(mn);
      maxLabel.textContent = mx >= 2000000 ? '$2.000.000+' : fmtCLP(mx);
      updateGroupCounts();
    }
    minR.addEventListener('input', updateRange);
    maxR.addEventListener('input', updateRange);
    updateRange();
  }
}

function syncCheckState(key, val, checked) {
  document.querySelectorAll(`input[data-filter="${key}"][value="${CSS.escape(val)}"]`).forEach(cb => cb.checked = checked);
}
function syncRadioState(key, val) {
  document.querySelectorAll(`input[data-filter-radio="${key}"]`).forEach(rb => rb.checked = (rb.value === val));
}
function syncComunaState(val) {
  document.querySelectorAll('[data-comuna-select]').forEach(sel => { if (sel.value !== val && [...sel.options].some(o=>o.value===val)) sel.value = val; });
}
function syncCarreraState(val) {
  document.querySelectorAll('[data-carrera-input]').forEach(inp => inp.value = val);
}

function updateComunaSelect(sourceRoot) {
  const regions = state.region;
  document.querySelectorAll('[data-comuna-select]').forEach(sel => {
    if (regions.length !== 1) {
      sel.disabled = true;
      sel.innerHTML = `<option value="">${regions.length === 0 ? 'Primero elige una región' : 'Elige una sola región para filtrar comuna'}</option>`;
      state.comuna = '';
    } else {
      sel.disabled = false;
      const list = COMUNAS[regions[0]] || [];
      sel.innerHTML = `<option value="">Todas las comunas</option>` + list.map(c => `<option value="${c}">${c}</option>`).join('');
    }
  });
}

function updateGroupCounts() {
  const counts = {
    region: state.region.length,
    comuna: state.comuna ? 1 : 0,
    rubro: state.rubro.length,
    carreraNivel: state.nivel.length + (state.carrera ? 1 : 0),
    jornada: state.jornada.length,
    modalidad: state.modalidad.length,
    contrato: state.contrato.length,
    experiencia: state.experiencia ? 1 : 0,
    sueldo: (state.sueldoMin > 0 || state.sueldoMax < 2000000) ? 1 : 0,
    fecha: state.fecha ? 1 : 0
  };
  document.querySelectorAll('.filter-group').forEach(group => {
    const key = group.dataset.group;
    const badge = group.querySelector('[data-count]');
    const n = counts[key] || 0;
    if (n > 0) { badge.textContent = n; badge.classList.remove('hidden'); }
    else { badge.classList.add('hidden'); }
  });
  updateFabBadge();
}

function totalActiveFilters() {
  return state.region.length + (state.comuna?1:0) + state.rubro.length + state.nivel.length + (state.carrera?1:0) +
    state.jornada.length + state.modalidad.length + state.contrato.length + (state.experiencia?1:0) +
    (state.fecha?1:0) + ((state.sueldoMin>0||state.sueldoMax<2000000)?1:0);
}

function updateFabBadge() {
  const n = totalActiveFilters();
  const badge = document.getElementById('fabBadge');
  if (n > 0) { badge.textContent = n; badge.classList.remove('hidden'); }
  else { badge.classList.add('hidden'); }
}

wirePanel(document.getElementById('filterGroupsDesktop'));
wirePanel(document.getElementById('filterGroupsMobile'));

/* ---------- Chips de búsqueda rápida ---------- */
const QUICK_MAP = {
  parttime: { jornada: 'Part time' },
  sinexp: { experiencia: 'Sin experiencia' },
  rotativos: { jornada: 'Turnos rotativos' },
  remoto: { modalidad: 'Remoto (home office)' },
  finde: { jornada: 'Fines de semana' },
  practica: { contrato: 'Práctica profesional' }
};
document.querySelectorAll('#quickChips [data-quick]').forEach(btn => {
  btn.addEventListener('click', () => {
    const rule = QUICK_MAP[btn.dataset.quick];
    Object.entries(rule).forEach(([key, val]) => {
      if (key === 'experiencia') { state.experiencia = val; syncRadioState('experiencia', val); }
      else {
        if (!state[key].includes(val)) state[key].push(val);
        syncCheckState(key, val, true);
      }
    });
    updateGroupCounts();
    applyFilters();
  });
});

/* ---------- Buscador ---------- */
document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  state.query = document.getElementById('searchInput').value.trim();
  applyFilters();
});

document.getElementById('sortSelect').addEventListener('change', e => {
  state.sort = e.target.value;
  renderResults(false);
});

/* ---------- Aplicar / limpiar filtros ---------- */
function clearAllFilters() {
  state.query = '';
  state.region = []; state.comuna = ''; state.rubro = []; state.nivel = []; state.carrera = '';
  state.jornada = []; state.modalidad = []; state.contrato = []; state.experiencia = ''; state.fecha = '';
  state.sueldoMin = 0; state.sueldoMax = 2000000;
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('input[data-filter]').forEach(cb => cb.checked = false);
  document.querySelectorAll('input[data-filter-radio]').forEach(rb => rb.checked = false);
  document.querySelectorAll('[data-carrera-input]').forEach(inp => inp.value = '');
  document.querySelectorAll('input[data-range="min"]').forEach(r => r.value = 0);
  document.querySelectorAll('input[data-range="max"]').forEach(r => r.value = 2000000);
  document.querySelectorAll('input[data-range]').forEach(r => r.dispatchEvent(new Event('input')));
  updateComunaSelect();
  updateGroupCounts();
  applyFilters();
}
document.getElementById('clearAllDesktop').addEventListener('click', clearAllFilters);
document.getElementById('clearAllMobile').addEventListener('click', clearAllFilters);
document.getElementById('emptyClearBtn').addEventListener('click', clearAllFilters);

document.getElementById('applyFiltersDesktop').addEventListener('click', () => applyFilters());
document.getElementById('applyFiltersMobile').addEventListener('click', () => { applyFilters(); closeSheet(); });

function applyFilters() {
  visibleCount = 6;
  renderResults(true);
}

/* ---------- Chips de filtros activos ---------- */
function renderActiveFilters() {
  const wrap = document.getElementById('activeFilters');
  const chips = [];
  const pushChip = (key, val, label) => chips.push({ key, val, label });

  state.region.forEach(v => pushChip('region', v, v));
  if (state.comuna) pushChip('comuna', state.comuna, state.comuna);
  state.rubro.forEach(v => pushChip('rubro', v, v));
  state.nivel.forEach(v => pushChip('nivel', v, v));
  if (state.carrera) pushChip('carrera', state.carrera, state.carrera);
  state.jornada.forEach(v => pushChip('jornada', v, v));
  state.modalidad.forEach(v => pushChip('modalidad', v, v));
  state.contrato.forEach(v => pushChip('contrato', v, v));
  if (state.experiencia) pushChip('experiencia', state.experiencia, state.experiencia);
  if (state.fecha) pushChip('fecha', state.fecha, FECHAS.find(f => f.value === state.fecha)?.label || state.fecha);
  if (state.sueldoMin > 0 || state.sueldoMax < 2000000) {
    pushChip('sueldo', '', `${fmtCLP(state.sueldoMin)} - ${state.sueldoMax>=2000000?'$2.000.000+':fmtCLP(state.sueldoMax)}`);
  }

  if (!chips.length) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = chips.map((c, i) => `
    <span class="chip-active" data-chip-index="${i}">${c.label}<button type="button" aria-label="Quitar filtro">✕</button></span>
  `).join('') + `<button type="button" class="chip-clear" id="chipClearAll">Limpiar todo</button>`;

  wrap.querySelectorAll('[data-chip-index] button').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const c = chips[i];
      removeFilter(c.key, c.val);
    });
  });
  document.getElementById('chipClearAll').addEventListener('click', clearAllFilters);
}

function removeFilter(key, val) {
  if (['region','rubro','nivel','jornada','modalidad','contrato'].includes(key)) {
    state[key] = state[key].filter(v => v !== val);
    syncCheckState(key, val, false);
    if (key === 'region') updateComunaSelect();
  } else if (key === 'comuna') {
    state.comuna = '';
    syncComunaState('');
  } else if (key === 'carrera') {
    state.carrera = '';
    syncCarreraState('');
  } else if (key === 'experiencia') {
    state.experiencia = '';
    document.querySelectorAll('input[data-filter-radio="experiencia"]').forEach(rb => rb.checked = false);
  } else if (key === 'fecha') {
    state.fecha = '';
    document.querySelectorAll('input[data-filter-radio="fecha"]').forEach(rb => rb.checked = false);
  } else if (key === 'sueldo') {
    state.sueldoMin = 0; state.sueldoMax = 2000000;
    document.querySelectorAll('input[data-range="min"]').forEach(r => { r.value = 0; r.dispatchEvent(new Event('input')); });
    document.querySelectorAll('input[data-range="max"]').forEach(r => { r.value = 2000000; r.dispatchEvent(new Event('input')); });
  }
  updateGroupCounts();
  applyFilters();
}

/* ---------- Render de resultados ---------- */
const jobsListEl = document.getElementById('jobsList');
const emptyStateEl = document.getElementById('emptyState');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const resultsCountEl = document.getElementById('resultsCount');

function skeletonHTML(n) {
  let html = '';
  for (let i = 0; i < n; i++) {
    html += `<div class="skeleton-card">
      <div class="sk sk-avatar"></div>
      <div class="sk-lines">
        <div class="sk sk-line" style="width:55%"></div>
        <div class="sk sk-line" style="width:35%"></div>
        <div class="sk sk-line" style="width:70%"></div>
        <div class="sk sk-line" style="width:40%"></div>
      </div>
    </div>`;
  }
  return html;
}

function jobCardHTML(job) {
  const saved = savedJobs.has(job.id);
  return `<article class="job-card" data-job-id="${job.id}">
    <div class="job-card__avatar">${job.empresa.charAt(0)}</div>
    <div class="job-card__body">
      <h3 class="job-card__title">${job.cargo}</h3>
      <p class="job-card__company">${job.empresa}</p>
      <div class="job-card__loc">
        <svg viewBox="0 0 24 24"><path d="M12 21s7-6.7 7-12a7 7 0 1 0-14 0c0 5.3 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
        ${job.comuna}, ${job.region}
      </div>
      <div class="job-card__chips">
        <span class="chip">${job.jornada}</span>
        <span class="chip">${job.modalidad}</span>
        <span class="chip">${job.contrato}</span>
      </div>
      <div class="job-card__meta">
        <span class="job-card__salary">${fmtCLP(job.sueldo)} líquido</span>
        <span class="job-card__date">Hace ${job.diasAgo} día${job.diasAgo === 1 ? '' : 's'}</span>
      </div>
    </div>
    <div class="job-card__side">
      <button class="save-btn ${saved ? 'saved' : ''}" data-save="${job.id}" aria-label="Guardar aviso">
        <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>
      </button>
      <button class="btn btn-mint job-card__cta" data-view="${job.id}">Ver aviso</button>
    </div>
  </article>`;
}

function renderResults(withLoading) {
  const filtered = sortJobs(filterJobs());
  resultsCountEl.textContent = `${filtered.length} oferta${filtered.length === 1 ? '' : 's'} encontrada${filtered.length === 1 ? '' : 's'}`;
  renderActiveFilters();

  if (!filtered.length) {
    jobsListEl.innerHTML = '';
    emptyStateEl.classList.remove('hidden');
    loadMoreBtn.classList.add('hidden');
    return;
  }
  emptyStateEl.classList.add('hidden');

  const showFn = () => {
    const slice = filtered.slice(0, visibleCount);
    jobsListEl.innerHTML = slice.map(jobCardHTML).join('');
    wireJobCards();
    loadMoreBtn.classList.toggle('hidden', visibleCount >= filtered.length);
  };

  if (withLoading) {
    jobsListEl.innerHTML = skeletonHTML(Math.min(4, filtered.length));
    loadMoreBtn.classList.add('hidden');
    setTimeout(showFn, 450);
  } else {
    showFn();
  }
}

function wireJobCards() {
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openDrawer(parseInt(btn.dataset.view)); });
  });
  document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', () => openDrawer(parseInt(card.dataset.jobId)));
  });
  document.querySelectorAll('[data-save]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.save);
      if (savedJobs.has(id)) savedJobs.delete(id); else savedJobs.add(id);
      btn.classList.toggle('saved');
    });
  });
}

loadMoreBtn.addEventListener('click', () => {
  visibleCount += 6;
  renderResults(false);
});

/* ---------- Drawer detalle ---------- */
const jobDrawer = document.getElementById('jobDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerContent = document.getElementById('drawerContent');

function openDrawer(id) {
  const job = JOBS.find(j => j.id === id);
  if (!job) return;
  drawerContent.innerHTML = `
    <h2 class="drawer-title">${job.cargo}</h2>
    <p class="drawer-company">${job.empresa} · ${job.comuna}, ${job.region}</p>
    <div class="drawer-chips">
      <span class="chip chip--outline">${job.jornada}</span>
      <span class="chip chip--outline">${job.modalidad}</span>
      <span class="chip chip--outline">${job.contrato}</span>
      <span class="chip chip--outline">${job.experiencia}</span>
    </div>
    <p class="drawer-salary">${fmtCLP(job.sueldo)} líquido</p>
    <div class="drawer-section">
      <h4>Sobre el cargo</h4>
      <p>${job.descripcion}</p>
    </div>
    <div class="drawer-section">
      <h4>Qué necesitas</h4>
      <ul>${job.requisitos.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="drawer-section">
      <h4>Qué ofrecemos</h4>
      <ul>${job.beneficios.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
    <div class="drawer-section">
      <h4>Cómo postular</h4>
      <p>Postula ahora y tu solicitud llegará directo a ${job.empresa}.</p>
    </div>
    <div class="drawer-bar">
      <button class="btn btn-mint" id="postularBtn">Postular ahora</button>
      <button class="btn btn-outline" id="compartirBtn">Compartir</button>
    </div>
  `;
  jobDrawer.classList.add('open');
  jobDrawer.setAttribute('aria-hidden', 'false');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  jobDrawer.classList.remove('open');
  jobDrawer.setAttribute('aria-hidden', 'true');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

/* ---------- Mobile filters sheet ---------- */
const filtersFab = document.getElementById('filtersFab');
const filtersSheet = document.getElementById('filtersSheet');
const sheetOverlay = document.getElementById('sheetOverlay');
function openSheet() {
  filtersSheet.classList.add('open');
  filtersSheet.setAttribute('aria-hidden', 'false');
  sheetOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSheet() {
  filtersSheet.classList.remove('open');
  filtersSheet.setAttribute('aria-hidden', 'true');
  sheetOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
filtersFab.addEventListener('click', openSheet);
document.getElementById('sheetClose').addEventListener('click', closeSheet);
sheetOverlay.addEventListener('click', closeSheet);

/* ---------- Acordeones FAQ ---------- */
document.querySelectorAll('.accordion').forEach(acc => {
  acc.querySelectorAll('.acc-trigger').forEach(trig => {
    trig.addEventListener('click', () => {
      trig.closest('.acc-item').classList.toggle('open');
    });
  });
});

/* ---------- Alerta de empleo ---------- */
document.getElementById('alertForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('alertInput');
  if (!input.value.trim()) { input.focus(); return; }
  document.getElementById('alertSuccess').classList.remove('hidden');
  e.target.reset();
});

/* ---------- Formulario de aviso (empresas) ---------- */
const avisoForm = document.getElementById('avisoForm');
avisoForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  const required = avisoForm.querySelectorAll('[required]');
  required.forEach(inp => {
    const field = inp.closest('.field');
    let ok = inp.value.trim().length > 0;
    if (inp.type === 'email' && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) return;
  avisoForm.classList.add('hidden');
  document.getElementById('avisoSuccess').classList.remove('hidden');
});
avisoForm.querySelectorAll('input, select, textarea').forEach(inp => {
  inp.addEventListener('input', () => inp.closest('.field')?.classList.remove('invalid'));
});

/* ---------- Nav móvil ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.mobile-link, .mobile-cta').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---------- Mostrar FAB de filtros solo dentro de la sección del buscador ---------- */
const buscasSection = document.getElementById('buscas-trabajo');
const fabObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    filtersFab.classList.toggle('fab-hidden', !entry.isIntersecting);
  });
}, { threshold: 0.05 });
fabObserver.observe(buscasSection);

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Init ---------- */
updateComunaSelect();
updateGroupCounts();
renderResults(true);
