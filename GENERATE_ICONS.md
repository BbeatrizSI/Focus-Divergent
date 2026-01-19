# 🎨 Generar Iconos PNG para PWA

Para que la PWA sea instalable, necesitas iconos PNG. Sigue estos pasos:

## Opción 1: Herramienta Online (Más Fácil)

1. Ve a [RealFaviconGenerator](https://realfavicongenerator.net/) o [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
2. Sube el archivo `public/icon.svg`
3. Descarga los iconos generados
4. Coloca estos archivos en `public/`:
   - `pwa-192x192.png` (192x192 píxeles)
   - `pwa-512x512.png` (512x512 píxeles)

## Opción 2: Usar Node.js (Si tienes sharp o canvas)

```bash
npm install --save-dev sharp
```

Luego ejecuta:
```bash
node -e "
const sharp = require('sharp');
sharp('public/icon.svg')
  .resize(192, 192)
  .png()
  .toFile('public/pwa-192x192.png');
sharp('public/icon.svg')
  .resize(512, 512)
  .png()
  .toFile('public/pwa-512x512.png');
"
```

## Opción 3: Instalar ImageMagick y generar

```bash
# Ubuntu/Debian
sudo apt-get install imagemagick

# macOS
brew install imagemagick

# Generar iconos
convert -background none public/icon.svg -resize 192x192 public/pwa-192x192.png
convert -background none public/icon.svg -resize 512x512 public/pwa-512x512.png
```

## Después de generar los iconos

Actualiza `vite.config.ts` para usar los PNG en lugar de SVG:

```typescript
icons: [
  {
    src: 'pwa-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: 'pwa-512x512.png',
    sizes: '512x512',
    type: 'image/png'
  },
  {
    src: 'pwa-512x512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any maskable'
  }
]
```

## Verificar que funciona

1. Ejecuta `npm run build`
2. Abre `dist/index.html` en un navegador (o despliega en GitHub Pages)
3. Si estás en HTTPS, deberías ver la opción de "Instalar" en la barra de direcciones
4. En Chrome/Edge: busca el icono de instalación (+) en la barra de direcciones
5. En móviles: opción "Agregar a pantalla de inicio"
