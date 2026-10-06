# Portfolio de Rafael Miñana Jover

Portfolio en español construido con Angular y TypeScript. El diseño se inspira en la experiencia visual de [gokulsuresh.vercel.app](https://gokulsuresh.vercel.app/): una ventana de editor con explorador, secciones, terminal y barra de estado. El código y los contenidos de este proyecto son propios.

## Desarrollo

```bash
npm ci
npm start
```

`npm run check` comprueba TypeScript y `npm run build` genera la versión de producción en `dist/rafael-portfolio/browser`.

Los datos profesionales están en `src/app/portfolio.data.ts`. La foto principal está en `public/assets/rafael-cutout.png`.

## GitHub Pages

El workflow `.github/workflows/pages.yml` ejecuta instalación, comprobación y build en las pull requests. En `main` publica `dist/rafael-portfolio/browser` con el artefacto oficial de GitHub Pages. La aplicación usa `baseHref: /` porque el repositorio `rafa-minana.github.io` se publica como sitio de usuario en `https://rafa-minana.github.io/`.

En **Settings → Pages**, la fuente debe ser **GitHub Actions**. Si el despliegue falla, el commit anterior de `main` permite revertir la actualización.

Los iconos de Lucide se distribuyen bajo licencia MIT; véase `public/assets/icons/LICENSE`.
