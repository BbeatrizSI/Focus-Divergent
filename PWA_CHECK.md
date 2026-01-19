# ✅ Verificación de PWA

Para verificar que la PWA está funcionando correctamente:

## 🔍 Checklist de Requisitos PWA

### ✅ Lo que ya está configurado:
- [x] Manifest.webmanifest presente
- [x] Service Worker registrado
- [x] Iconos PNG (192x192 y 512x512) presentes
- [x] display: 'standalone' configurado
- [x] HTTPS (GitHub Pages lo proporciona)

## 📱 Cómo verificar en móvil

### Android (Chrome):

1. **Abre la app en GitHub Pages**: `https://BbeatrizSI.github.io/Focus-Divergent/`

2. **Verifica que cargue correctamente** y espera unos segundos

3. **Banner de instalación automático**: Chrome debería mostrar un banner en la parte inferior que dice "Instalar Focus Divergent" o "Agregar a pantalla de inicio"

4. **Si no aparece el banner automático**:
   - Toca el menú (tres puntos) en Chrome
   - Busca "Instalar app" o "Agregar a pantalla de inicio"
   - O "Add to Home screen"

5. **Verifica que el Service Worker esté activo**:
   - Abre Chrome DevTools (desde un PC conectado al móvil)
   - O en Chrome móvil: chrome://serviceworker-internals/

### iOS (Safari):

1. **Abre la app en Safari**: `https://BbeatrizSI.github.io/Focus-Divergent/`

2. **Toca el botón de compartir** (cuadrado con flecha hacia arriba)

3. **Desplázate y selecciona** "Agregar a pantalla de inicio"

4. **Confirma** y aparecerá en tu pantalla de inicio

## 🔧 Verificación técnica

### Verificar manifest:
Abre en el navegador: `https://BbeatrizSI.github.io/Focus-Divergent/manifest.webmanifest`

Deberías ver un JSON con:
- name, short_name
- icons con rutas correctas
- display: "standalone"

### Verificar Service Worker:
En Chrome DevTools (F12):
1. Ve a la pestaña "Application" o "Aplicación"
2. En el menú lateral, selecciona "Service Workers"
3. Deberías ver el service worker registrado y activo (status: activated and is running)

### Verificar iconos:
Abre directamente:
- `https://BbeatrizSI.github.io/Focus-Divergent/pwa-192x192.png`
- `https://BbeatrizSI.github.io/Focus-Divergent/pwa-512x512.png`

Ambos deberían cargar correctamente.

## ⚠️ Posibles problemas

### 1. No aparece la opción de instalar en móvil

**Causas posibles:**
- La app no está servida sobre HTTPS (verifica que la URL empiece con `https://`)
- El manifest tiene errores (verifica con Lighthouse o DevTools)
- Los iconos no se pueden cargar (verifica las rutas)
- El Service Worker no se registró correctamente

**Solución:**
```bash
# Verifica el build localmente
npm run build
npm run preview

# Abre http://localhost:4173
# En Chrome DevTools (F12) > Application > Manifest
# Verifica que todos los iconos estén disponibles
```

### 2. Error en el manifest

**Verifica con Lighthouse:**
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona "Progressive Web App"
4. Haz clic en "Generate report"
5. Revisa los errores

### 3. Iconos no se cargan

Verifica que los archivos existan:
```bash
ls -lh dist/pwa-*.png
```

Si no existen, necesitas generarlos (ver GENERATE_ICONS.md)

## 📊 Herramientas de verificación

- **Lighthouse** (en Chrome DevTools): Herramienta completa de auditoría PWA
- **Chrome DevTools > Application > Manifest**: Verifica el manifest
- **PWA Builder** (pwabuilder.com): Analiza tu PWA y te dice qué falta

## 🚀 Después de verificar

Si todo está correcto y aún no puedes instalar:

1. **Limpia la caché del navegador**
2. **Desregistra service workers antiguos**: Chrome DevTools > Application > Service Workers > Unregister
3. **Recarga la página** (Ctrl+Shift+R o Cmd+Shift+R)
4. **Espera unos segundos** para que el service worker se registre
