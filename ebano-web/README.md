# ébano | Sitio web estático

Archivos: `index.html`, `styles.css`, `app.js` y `assets/` (`marca/`, `fotos/`, `texturas/`). Compatible con hosting estático/cPanel.

**Para revisarlo en local usa un servidor** (Live Server, `python3 -m http.server`, etc.). Si abres `index.html` con doble clic (`file://`), el navegador bloquea las texturas SVG (se usan como máscara CSS) y el resto del sitio funciona igual.

## Marca (desde el Manual de identidad visual 2026)

`assets/marca/` contiene los vectores oficiales del manual en Figma:

| Archivo | Uso en el sitio |
|---|---|
| `ebano-logotipo.svg` | Principal a color (Ébano + hoja Arcilla). Header sobre Marfil |
| `ebano-logotipo-negativo.svg` | Marfil + hoja Arcilla. Footer sobre fondo Noche |
| `ebano-logotipo-mono-marfil.svg` | Una tinta clara. Hero sobre foto con velo Ébano 45 % |
| `ebano-logotipo-mono-ebano.svg` | Una tinta oscura (disponible) |
| `ebano-isotipo.svg` / `ebano-isotipo-negativo.svg` | Favicon y firma del cierre |

Reglas del manual que aplica el CSS:
- Logotipo de 160 px de ancho como mínimo. Nunca se reescribe con una fuente.
- Arcilla como texto solo sobre Papel. Sobre Marfil se usa solo como acento gráfico.
- Oliva no se usa en texto pequeño, porque sobre Papel da 4,2 : 1.
- Etiquetas en Inter 600, 10 px, +20 % de tracking y versales. Titulares en Instrument Serif con −1 % de tracking.
- Fotos con tratamiento «saturación −18 %, contraste +4 %, leve calidez», salvo las de José Tomás.
- Grafismos: una familia por superficie, siempre recortada por el borde. Vetas al 7 % en Nosotros y humo al 6–8 % en Cómo trabajamos, Cierre y Footer.

## Fotos pendientes de subir

Mientras no existan, en su lugar se verá el color de fondo.

| Ruta | Contenido |
|---|---|
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

Además de la paleta principal, el sitio usa Noche #1C130D para los fondos más oscuros. Los grafismos se aplican como máscara CSS, así toman cualquier color de la paleta. El patrón de hojas queda reservado para matrimonios y packaging, como indica el manual.
