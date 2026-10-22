# Ébano | versión corregida para publicación

## Qué incluye
- Hero aprobado, fotografías reales de José Tomás y del oficio, y recursos SVG del sitio.
- Estilos responsive con ajustes de recorte, enfoque visible y movimiento reducido.
- Archivos duplicados de macOS y PNG generados no usados fuera de la carpeta de publicación.
- Formulario con ruta PHP opcional y alternativa mailto cuando el servidor no esté listo.

## Formulario — CONFIGURACIÓN NECESARIA
Por defecto **NO se envía automáticamente**. El endpoint `api/cotizacion.php` requiere un hosting PHP con función `mail()` operativa y variable de entorno `EBANO_MAIL_FROM` con un correo real autorizado en el dominio. Debes verificar SPF, DKIM y entregabilidad del hosting, idealmente usar SMTP transaccional en producción y hacer una prueba real. En Live Server local no funcionará la API y se abrirá un borrador por correo.

## Publicación
Sube el contenido de esta carpeta al directorio web. Verifica HTTPS, permisos, logos y formularios. Si prefieres no usar PHP, puedes eliminar `api/` y conservar la alternativa de correo.

## Fotos y permisos
Las fotografías de José Tomás y los eventos reales permanecen sin manipulación de identidad. Confirma autorización para publicar imágenes donde aparezcan terceros.

## Condiciones
Se eliminó el mínimo automático de 15 días porque no está confirmado para todos los servicios. Se mantiene la fecha no anterior al día actual en el navegador.
