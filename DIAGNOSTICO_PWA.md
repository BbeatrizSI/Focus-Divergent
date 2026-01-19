# 🔍 Diagnóstico: PWA no se detecta como instalable

## ⚠️ Problema: El navegador dice "no es una PWA"

Si después del deploy el navegador dice que no es una PWA, verifica estos puntos:

## ✅ Checklist de Verificación

### 1. ¿La app está desplegada en HTTPS?

**Verifica:**
- Abre: `https://BbeatrizSI.github.io/Focus-Divergent/` (debe ser HTTPS, no HTTP)
- GitHub Pages siempre usa HTTPS, así que debería estar bien

**Verifica en Chrome DevTools (F12):**
- Console → No debe haber errores de "Mixed Content"

### 2. ¿El manifest es accesible?

**Abre directamente en el navegador:**
```
https://BbeatrizSI.github.io/Focus-Divergent/manifest.webmanifest
```

**Deberías ver un JSON válido.** Si ves un 404, el manifest no se está sirviendo correctamente.

### 3. ¿Los iconos son accesibles?

**Abre directamente:**
```
https://BbeatrizSI.github.io/Focus-Divergent/icons/pwa-192x192.png
https://BbeatrizSI.github.io/Focus-Divergent/icons/pwa-512x512.png
```

**Deberían mostrar las imágenes.** Si ves 404, los iconos no están en el lugar correcto.

### 4. ¿El service worker está registrado?

**En Chrome DevTools (F12):**
1. Ve a la pestaña **"Application"** (o "Aplicación")
2. En el menú lateral, selecciona **"Service Workers"**
3. Deberías ver:
   - Status: **"activated and is running"**
   - Scope: `/Focus-Divergent/`

**Si no aparece o dice "error", hay un problema con el service worker.**

### 5. ¿El manifest está vinculado correctamente en el HTML?

**En Chrome DevTools (F12):**
1. Ve a la pestaña **"Application"** (o "Aplicación")
2. En el menú lateral, selecciona **"Manifest"**
3. Deberías ver:
   - Name: Focus Divergent
   - Icons: 3 iconos (192x192, 512x512 x2)
   - Display: standalone

**Si dice "No manifest detected", el manifest no está vinculado.**

### 6. ¿Usas Lighthouse para verificar?

**En Chrome DevTools (F12):**
1. Ve a la pestaña **"Lighthouse"**
2. Selecciona **"Progressive Web App"**
3. Haz clic en **"Generate report"**
4. Revisa los errores

## 🔧 Problemas Comunes y Soluciones

### Problema 1: Manifest da 404

**Causa:** El archivo no se está sirviendo correctamente.

**Solución:**
- Verifica que el archivo existe en `dist/manifest.webmanifest`
- Verifica que `.nojekyll` existe en `public/`

### Problema 2: Service Worker da error

**Causa:** El service worker no puede registrarse.

**Posibles soluciones:**
- Verifica que `sw.js` existe en `dist/sw.js`
- Verifica que la ruta en `registerSW.js` es correcta
- Limpia el caché del navegador

### Problema 3: Iconos no cargan

**Causa:** Los iconos no están en la ruta correcta.

**Solución:**
- Verifica que los iconos están en `public/icons/`
- Verifica que se copian a `dist/icons/` durante el build

### Problema 4: Múltiples referencias al manifest

**Causa:** Hay dos `<link rel="manifest">` en el HTML.

**Solución:** 
El plugin de Vite PWA debería manejar esto, pero verifica que solo hay una referencia correcta.

## 🚀 Verificación Rápida (Copia y pega en la consola del navegador)

Abre la consola del navegador (F12 → Console) y ejecuta:

```javascript
// 1. Verificar si el manifest está disponible
fetch('/Focus-Divergent/manifest.webmanifest')
  .then(r => r.json())
  .then(m => console.log('✅ Manifest:', m))
  .catch(e => console.error('❌ Manifest error:', e));

// 2. Verificar si el service worker está registrado
navigator.serviceWorker.getRegistration()
  .then(reg => {
    if (reg) {
      console.log('✅ Service Worker registrado:', reg.scope);
    } else {
      console.log('❌ Service Worker NO registrado');
    }
  });

// 3. Verificar si los iconos cargan
const icon192 = new Image();
icon192.onload = () => console.log('✅ Icono 192x192 carga');
icon192.onerror = () => console.error('❌ Icono 192x192 NO carga');
icon192.src = '/Focus-Divergent/icons/pwa-192x192.png';
```

## 📋 Información para Debugging

Comparte esta información si necesitas ayuda:

1. **URL de la app desplegada:** 
   ```
   https://BbeatrizSI.github.io/Focus-Divergent/
   ```

2. **Errores en la consola del navegador (F12 → Console):**

3. **Estado del Service Worker (F12 → Application → Service Workers):**

4. **Estado del Manifest (F12 → Application → Manifest):**

5. **Resultado de Lighthouse (F12 → Lighthouse → PWA):**

## ✅ Qué deberías ver si todo funciona correctamente

1. **En Chrome Android:**
   - Banner "Instalar app" después de unos segundos
   - O en el menú (⋮) → opción "Instalar app"

2. **En Chrome Desktop:**
   - Icono de instalación en la barra de direcciones (➕)
   - O en el menú (⋮) → opción "Instalar Focus Divergent"

3. **En Safari iOS:**
   - Botón de compartir → opción "Agregar a pantalla de inicio"

## 🔄 Si nada funciona

1. **Limpia todo:**
   - Desregistra service workers antiguos
   - Limpia el caché del navegador (Ctrl+Shift+Delete)
   - Recarga la página (Ctrl+Shift+R)

2. **Verifica el deploy:**
   - Ve a https://github.com/BbeatrizSI/Focus-Divergent/actions
   - Verifica que el último workflow completó exitosamente

3. **Verifica que los archivos están en GitHub Pages:**
   - Los archivos deben estar accesibles en la URL
   - No deben dar 404
