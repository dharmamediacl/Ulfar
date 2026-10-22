# ébano | Sitio web estático

Archivos: `index.html`, `styles.css`, `app.js` y `assets/` (`marca/`, `fotos/`, `texturas/`). Compatible con hosting estático/cPanel.

**Para revisarlo en local usa un servidor** (Live Server, `python3 -m http.server`, etc.). Si abres `index.html` con doble clic (`file://`), el navegador bloquea las texturas SVG (se usan como máscara CSS) y el resto del sitio funciona igual.

## Archivos pendientes de subir

El sitio ya apunta a estas rutas. Mientras no existan, en su lugar se verá el color de fondo.

| Ruta | Contenido |
|---|---|
| `assets/marca/ebano-oscuro.svg` | Logotipo ébano en color ébano (header al hacer scroll) |
| `assets/marca/ebano-marfil.svg` | Logotipo ébano en marfil (logotipo grande del hero y footer) |
| `assets/marca/isotipo.svg` | Isotipo «é» con hoja arcilla (favicon) |
| `assets/fotos/hero-ebano.webp` | Foto del hero (parrillero con delantal ébano, formato horizontal) |
| `assets/fotos/montaje-detalles.webp` | Mesa con platos, romero y cuencos (sección Nosotros) |
| `assets/fotos/producto-parrilla.webp` | Primer plano de pinzas sobre costillas (galería 02) |
| `assets/fotos/oficio-en-vivo.webp` | Tarjeta Brand Activation |
| `assets/fotos/ebano-fuego.webp` | Tarjeta Private Events (formato horizontal) |
| `assets/fotos/jose-tomas-parrilla-real.webp` | José Tomás frente a la parrilla (sección 04) |
| `assets/fotos/jose-tomas-sazonando-real.webp` | José Tomás sazonando (vertical, galería 03) |
| `assets/fotos/jose-tomas-preparacion-real.webp` | José Tomás en la terraza (horizontal, galería 04) |

Exporta las fotos en WebP, de unos 1600–2000 px en su lado mayor y menos de 400 KB cada una.

## Cotizaciones

`#quote-form` tiene dos modos, controlados por el atributo `data-api`:

- `data-api="off"` (por defecto): valida los campos y abre un **borrador de correo** (`mailto:`) hacia hola@ebano.dharmamedia.cl. El usuario debe enviarlo. El mensaje de estado no afirma que la solicitud se recibió.
- `data-api="on"`: envía por `POST` (multipart) a `api/cotizacion.php`. El endpoint debe responder JSON `{"ok": true}` si el envío funcionó, o `{"ok": false, "error": "…"}` si falló. Ante un error, el sitio abre el borrador de correo como respaldo.

El campo `website` es una trampa anti-spam: si llega con contenido, el servidor debe descartar la solicitud. La fecha no acepta días anteriores al actual.

## Pendientes de aprobación

- Rango mínimo y máximo de invitados, condiciones de abono, plazos de respuesta, y equipamiento y servicios incluidos.
- Confirmar que @ebanocl es el perfil oficial y la cobertura geográfica exacta.
- Verificar que la cuenta de correo existe y recibe mensajes.
- Al publicar: completar `og:image` con la URL absoluta y agregar `og:url` y `<link rel="canonical">` con el dominio final.
- Las fotos de ambientación generadas (evento con guirnaldas, parrillero con delantal «ébano», mesa montada) son **conceptuales**. Se usan en el hero y en las tarjetas de experiencias, nunca en «Nuestro trabajo», que solo lleva fotografías reales.

## Identidad

Colores: #3E2A1E ébano, #9C5A43 arcilla, #EFE6DE marfil, #77755F oliva, #D0B99E arena, #F8F3EC papel. Tipografías: Instrument Serif + Inter.

Las texturas de marca (`vetas`, `humo`, `hojas`) se aplican como máscara CSS, así toman cualquier color de la paleta:

- vetas: sección Nosotros
- hojas: Cómo trabajamos
- humo: Cierre
