# ✅ Cómo Verificar que la PWA Funciona

## 🔍 Verificación Rápida en el Navegador

### 1. Abre la app desplegada

```
https://BbeatrizSI.github.io/Focus-Divergent/
```

### 2. Abre Chrome DevTools (F12)

### 3. Verifica el Manifest

**Ve a:** Application (o Aplicación) → Manifest

**Deberías ver:**
- ✅ Name: "Focus Divergent"
- ✅ Display: "standalone"
- ✅ Icons: 3 iconos (192x192 y 512x512)

**Si ves "No manifest detected" o errores:**
- El manifest no está siendo servido correctamente
- Verifica que el archivo existe en: `/Focus-Divergent/manifest.webmanifest`

### 4. Verifica el Service Worker

**Ve a:** Application → Service Workers

**Deberías ver:**
- ✅ Status: "activated and is running" (verde)
- ✅ Scope: `/Focus-Divergent/`

**Si no aparece o dice "error":**
- El service worker no se está registrando
- Verifica en Console si hay errores

### 5. Verifica los Iconos

**Abre directamente en el navegador:**
```
https://BbeatrizSI.github.io/Focus-Divergent/icons/pwa-192x192.png
https://BbeatrizSI.github.io/Focus-Divergent/icons/pwa-512x512.png
```

**Deberían cargar las imágenes.** Si ves 404, los iconos no están en el lugar correcto.

### 6. Verifica en la Consola

**Ve a:** Console (en DevTools)

**No deberías ver:**
- ❌ Errores de manifest
- ❌ Errores de service worker
- ❌ Errores 404 de iconos

## 📱 Señales de que Funciona Correctamente

### En Chrome Desktop:
- ✅ Icono de instalación (➕) en la barra de direcciones
- ✅ Menú (⋮) → opción "Instalar Focus Divergent..."

### En Chrome Android:
- ✅ Banner automático "Instalar app" después de 3-5 segundos
- ✅ Menú (⋮) → opción "Instalar app"

### En Safari iOS:
- ✅ Botón de compartir (□↑) → "Agregar a pantalla de inicio"

## 🚨 Problemas Comunes

### Problema: "No manifest detected"

**Posibles causas:**
1. El manifest no se está sirviendo correctamente
2. La ruta del manifest en el HTML es incorrecta

**Solución:**
- Verifica que puedes abrir: `https://BbeatrizSI.github.io/Focus-Divergent/manifest.webmanifest`
- Si da 404, el archivo no se desplegó correctamente
- Haz un nuevo push para re-desplegar

### Problema: Service Worker no se registra

**Posibles causas:**
1. El archivo `sw.js` no existe o no es accesible
2. La ruta en `registerSW.js` es incorrecta
3. Hay un error en el service worker

**Solución:**
- Verifica en Console si hay errores
- Verifica que puedes abrir: `https://BbeatrizSI.github.io/Focus-Divergent/sw.js`
- Limpia el caché y vuelve a cargar

### Problema: Iconos no cargan (404)

**Posibles causas:**
1. Los iconos no están en `public/icons/`
2. No se copian a `dist/icons/` durante el build
3. La ruta en el manifest es incorrecta

**Solución:**
- Verifica que los iconos existen en `public/icons/`
- Haz un build local y verifica que aparecen en `dist/icons/`
- Verifica las rutas en el manifest

## 🔧 Comandos para Re-Desplegar

Si encuentras problemas, re-despliega:

```bash
git add .
git commit -m "Fix PWA configuración"
git push origin main
```

Espera 3-4 minutos y vuelve a verificar.

## 🎯 Checklist Completo

- [ ] App desplegada en HTTPS
- [ ] Manifest accesible y válido
- [ ] Service Worker registrado y activo
- [ ] Iconos accesibles (192x192 y 512x512)
- [ ] No hay errores en la consola
- [ ] Opción de instalar aparece en el navegador

Si todos los puntos están ✅, la PWA debería funcionar correctamente.
