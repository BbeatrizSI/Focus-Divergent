# 🎨 Generación de Iconos PWA

Para que la PWA funcione correctamente, necesitas crear los iconos en formato PNG. He creado un `icon.svg` básico en `public/icon.svg` que puedes usar como fuente.

## 📋 Iconos Necesarios

Necesitas generar estos iconos PNG:

- `pwa-192x192.png` (192x192 píxeles)
- `pwa-512x512.png` (512x512 píxeles)

## 🛠️ Opciones para Generar los Iconos

### Opción 1: Usar una herramienta online (Más fácil)

1. Ve a [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) o [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Sube el archivo `public/icon.svg`
3. Descarga los iconos generados
4. Colócalos en la carpeta `public/` con los nombres:
   - `pwa-192x192.png`
   - `pwa-512x512.png`

### Opción 2: Usar ImageMagick (Línea de comandos)

```bash
# Instalar ImageMagick (si no lo tienes)
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Generar iconos desde SVG
convert public/icon.svg -resize 192x192 public/pwa-192x192.png
convert public/icon.svg -resize 512x512 public/pwa-512x512.png
```

### Opción 3: Usar Inkscape (Gratis, Open Source)

```bash
# Instalar Inkscape
# Ubuntu/Debian: sudo apt-get install inkscape
# macOS: brew install inkscape

# Generar iconos
inkscape public/icon.svg --export-width=192 --export-filename=public/pwa-192x192.png
inkscape public/icon.svg --export-width=512 --export-filename=public/pwa-512x512.png
```

### Opción 4: Usar un editor de imágenes

1. Abre `public/icon.svg` en tu editor favorito (GIMP, Photoshop, Figma, etc.)
2. Exporta como PNG en los tamaños necesarios:
   - 192x192 píxeles → `pwa-192x192.png`
   - 512x512 píxeles → `pwa-512x512.png`
3. Guarda los archivos en `public/`

## ✅ Verificación

Después de generar los iconos, verifica que existan:

```bash
ls -lh public/pwa-*.png
```

Deberías ver:
- `public/pwa-192x192.png`
- `public/pwa-512x512.png`

## 🚀 Después de Generar los Iconos

1. Añade los iconos al repositorio:
   ```bash
   git add public/pwa-*.png
   git commit -m "Add PWA icons"
   git push origin main
   ```

2. Los iconos se incluirán automáticamente en el build de producción.

## 📝 Nota

El archivo `icon.svg` es un diseño básico que representa un temporizador Pomodoro con ondas de sonido. Puedes personalizarlo editando `public/icon.svg` para que refleje mejor tu visión de la aplicación.
