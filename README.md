# El Cerrajero · Portal de ciberseguridad

Portal profesional de Cristhian L., construido con Astro y basado en el tema Dark Minimal. Publicado en **https://elcerrajero.online/** mediante GitHub Pages.

## Contenido

- Servicios de pentesting web, infraestructura, móvil y capacitaciones.
- Cursos y presentación profesional.
- Blog externo en [Medium](https://crhystamil.medium.com/).
- Documentación y materiales en la [wiki](https://wiki.elcerrajero.online/).
- Contacto: [contacto@elcerrajero.online](mailto:contacto@elcerrajero.online).
- Diseño Matrix corporativo, con temas claro y oscuro.

## Desarrollo local

Requiere Node.js 24 y npm.

```sh
npm ci
npm run dev
```

Abre http://localhost:4321.

```sh
npm run build
npm run preview
```

La compilación estática se genera en `dist/` y no se guarda en Git.

## Publicación

El workflow `.github/workflows/deploy.yml` comprueba y compila el proyecto y publica `dist/` con las acciones oficiales de GitHub Pages en cada push a `main`. También se puede ejecutar manualmente desde Actions.

En **Settings → Pages**, el origen debe estar configurado como **GitHub Actions** y el dominio personalizado como `elcerrajero.online`. `public/CNAME` conserva ese dominio en el artefacto publicado.

## Personalización

- `src/data/site.ts`: servicios, cursos, redes, correo, Medium y wiki.
- `src/pages/`: páginas del portal.
- `src/components/`: componentes compartidos.
- `src/styles/global.css`: colores, contraste y temas.
- `public/`: imágenes, iconos y fuentes locales.

Consulta `INSTALACION.md` para más detalles.

## Créditos

Basado en [Dark Minimal](https://github.com/Gothsec/dark-minimal). Se conserva su licencia MIT en `LICENSE`.
