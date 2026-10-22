# ébano | Guía de publicación

## Antes de subir
1. Sube las fotos que faltan en `assets/fotos/` (la lista está en `README.md`). Los logos oficiales ya están incluidos.
2. Revisa el sitio con un servidor local (Live Server). Prueba en móvil y escritorio: menú, preguntas frecuentes y formulario.
3. Completa `og:image` (URL absoluta), `og:url` y la canonical con el dominio final.

## Formulario
Por defecto **NO se envía automáticamente**: abre un borrador de correo que el usuario debe enviar.

Para activar el envío directo:
1. Sube `api/cotizacion.php` a un hosting con PHP.
2. Configura un SMTP transaccional (o `mail()` con la variable `EBANO_MAIL_FROM`, un correo real del dominio). Verifica SPF y DKIM.
3. Haz que el endpoint responda `{"ok":true}` y descarte las solicitudes que traen el campo `website` con contenido.
4. Cambia `data-api="off"` por `data-api="on"` en `#quote-form`.
5. Envía una solicitud de prueba real. Si el servidor falla, el sitio vuelve solo al borrador de correo.

## Publicación
Sube el contenido de esta carpeta al directorio web. Verifica HTTPS, permisos, logos y formulario. Cambia el número de versión `?v=` de `styles.css` y `app.js` en cada publicación para evitar la caché.

## Fotos y permisos
Las fotografías de José Tomás y de los eventos reales se publican sin manipular rostros ni identidad. Confirma la autorización para publicar imágenes donde aparezcan terceros.

## Condiciones
No hay un mínimo automático de días de anticipación, porque no está confirmado para todos los servicios. El navegador solo impide elegir fechas pasadas.
