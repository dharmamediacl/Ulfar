Balboa ExtraBold es la tipografía principal indicada en el manual de marca
de ULFAR, pero no está disponible como webfont de distribución libre.

Si cuentas con la licencia del archivo de la fuente, colócalo aquí como:

  assets/fonts/Balboa-ExtraBold.woff2

y agrega lo siguiente al inicio de styles.css:

  @font-face {
    font-family: "Balboa";
    src: url("assets/fonts/Balboa-ExtraBold.woff2") format("woff2");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --font-display: "Balboa", "Poppins", "Impact", "Arial Narrow", sans-serif;
  }

Mientras tanto, el manual usa Poppins (800/900) como reemplazo visual
temporal para los títulos, tal como indica la sección 4 del manual.
