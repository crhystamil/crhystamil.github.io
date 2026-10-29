# Portal El Cerrajero

Proyecto Astro basado en el tema original [Dark Minimal](https://github.com/Gothsec/dark-minimal), con licencia MIT.

## Ejecutar en local

```sh
npm install
npm run dev
```

Abre http://localhost:4321.

## Compilar y previsualizar

```sh
npm run build
npm run preview
```

El sitio estático se genera en `dist/`.

## Personalización

- `src/layouts/Layout.astro`: título, descripción y metadatos SEO.
- `src/components/home.astro`: presentación y enlaces sociales.
- `src/components/nav.astro`: navegación.
- `src/data/site.ts`: cursos, enlaces sociales y URL externa del blog (`blogUrl`).
- `src/data/site.ts` (`services` y `serviceContact`): descripción, alcance y enlace de contacto de los cuatro servicios.
- `src/components/serviceCards.astro`: tarjetas compartidas entre portada y catálogo.
- `src/pages/services/index.astro`: página de servicios profesionales.
- `src/pages/courses/`: catálogo de formación y páginas de cada curso.
- `src/pages/about.md`: presentación profesional.
- `src/components/footer.astro`: redes sociales y copyright.
- `src/styles/global.css`: colores, tipografía, componentes y diseño adaptable.

Se ha adaptado el contenido de https://elcerrajero.online/ al diseño Dark Minimal. Se conservan las páginas `/about/`, `/courses/`, `/courses/android/` y `/courses/linux/`. Los cursos están marcados como «en preparación» porque el portal original no publica fechas ni inscripción. La descripción de Android procede del catálogo original. El blog se publica exclusivamente en Medium y sus enlaces dirigen directamente a `https://crhystamil.medium.com/`.

## Publicación

Este repositorio se publica automáticamente mediante `.github/workflows/deploy.yml` al hacer push a `main`. GitHub Pages utiliza el origen **GitHub Actions** y sirve la compilación de `dist/`. El dominio `elcerrajero.online` también se incluye en `public/CNAME`. Para editar y publicar futuras versiones, trabaja en este repositorio y sube los cambios a `main`.

Publica `dist/` en tu alojamiento estático después de ejecutar `npm run build`. El dominio canónico está configurado como `https://elcerrajero.online` en `astro.config.mjs`, el layout y el sitemap. La adaptación funciona sin servicios externos de formularios o Firebase; las consultas de servicios abren el cliente de correo para escribir a `contacto@elcerrajero.online`. El correo se configura en `contactEmail` dentro de `src/data/site.ts` y también aparece en `src/pages/about.md`.

## Blog externo

El menú «Blog» y el botón de la portada abren Medium directamente. El portal no contiene páginas locales de publicaciones. Para cambiar el destino, edita `blogUrl` en `src/data/site.ts`.

## Wiki

El menú «Wiki», el pie de página y la página de Cursos enlazan a `https://wiki.elcerrajero.online/`, donde se reunirá la información de los cursos y los contenidos en desarrollo. La URL se configura en `wikiUrl` dentro de `src/data/site.ts`.

El logo se ha descargado del portal original y se sirve localmente como `public/elcerrajero.png`. Se conserva `LICENSE` del tema original.

## Identidad Matrix / Keymaker

La estética usa negro y verde fósforo, paneles de terminal y referencias al Cerrajero de Matrix. Los colores se controlan con `--sec`, `--accent-soft`, `--accent-line` y `--background` en `src/styles/global.css`.

La portada utiliza la ilustración vectorial local `public/cybersecurity-hero.svg`, con un escudo, un candado y conexiones a servicios digitales. Se muestra sin ventana de terminal y se adapta a la pantalla sin perder calidad. El efecto Matrix se mantiene en el fondo global mediante `src/React/LetterGlitch.tsx`. El logo original se conserva en la navegación, teñido de verde mediante CSS.

`src/components/topicMarquee.astro` muestra las áreas de conocimiento con iconos SVG y desplazamiento horizontal continuo. Se pausa al pasar el cursor y se presenta como una lista estática si el visitante prefiere movimiento reducido.

### Fondo global y presentación corporativa

`src/components/matrixBackground.astro` se incluye en el layout de todas las páginas. Combina código animado tenue, una retícula y un degradado que atenúa los caracteres en el centro para facilitar la lectura. Su intensidad se ajusta con la opacidad de `.matrix-code`; en móvil es menor.

El fondo reutiliza `LetterGlitch` en modo `ambient`: caracteres más espaciados, movimiento más lento y una frecuencia de dibujo reducida. Se pausa al ocultar la pestaña y se vuelve estático con la preferencia de movimiento reducido. No recibe clics ni se anuncia a lectores de pantalla.

Las tarjetas y los paneles de contenido usan la variable `--surface` para separar visualmente el contenido del fondo. La cabecera, los títulos, los botones y los márgenes mantienen una presentación profesional común a todo el portal.

## Tema claro y oscuro

El botón de sol/luna de la cabecera permite alternar entre los dos temas en cualquier página. La elección se guarda en `localStorage` con la clave `elcerrajero-theme` y se aplica antes de mostrar el contenido para evitar un destello del tema contrario.

Si no hay una elección guardada, se utiliza la preferencia de color del sistema y se siguen sus cambios. El selector funciona con ratón, pantalla táctil y teclado. Los colores de los dos temas, incluidas las tintas y la intensidad del fondo Matrix, se configuran en `src/styles/global.css`. El componente del selector es `src/components/themeToggle.astro`.
