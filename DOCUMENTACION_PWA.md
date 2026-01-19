# 📚 Documentación: Manifest y Service Worker en PWA

## 🔍 ¿Dónde están los archivos PWA?

### ✅ Archivos generados automáticamente

Los archivos necesarios para PWA **NO existen en el código fuente** porque se generan automáticamente durante el build usando `vite-plugin-pwa`.

Estos archivos se generan en la carpeta `dist/` cuando ejecutas `npm run build`:

```
dist/
├── manifest.webmanifest     ← Manifest PWA (generado)
├── sw.js                    ← Service Worker (generado)
├── registerSW.js            ← Script para registrar SW (generado)
├── workbox-*.js             ← Librería Workbox (generado)
└── index.html               ← HTML con enlaces al manifest y SW
```

### 📝 Configuración (código fuente)

La configuración de PWA está en `vite.config.ts`:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Focus Divergent',
    // ... configuración del manifest
  },
  workbox: {
    // ... configuración del service worker
  }
})
```

## 🔄 Cómo funciona

### 1. **Manifest** (`manifest.webmanifest`)

El manifest se genera automáticamente desde la configuración en `vite.config.ts`:

**Ubicación en código fuente:** `vite.config.ts` (líneas 15-44)
```typescript
manifest: {
  name: 'Focus Divergent',
  short_name: 'Focus Divergent',
  icons: [...],
  // ...
}
```

**Generado automáticamente en:** `dist/manifest.webmanifest`

**Enlazado en:** `dist/index.html` (línea 17)
```html
<link rel="manifest" href="/Focus-Divergent/manifest.webmanifest">
```

### 2. **Service Worker** (`sw.js`)

El service worker se genera automáticamente usando Workbox desde la configuración:

**Ubicación en código fuente:** `vite.config.ts` (líneas 46-64)
```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
  runtimeCaching: [...],
}
```

**Generado automáticamente en:** `dist/sw.js`

**Registrado por:** `dist/registerSW.js` (generado automáticamente)

**Enlazado en:** `dist/index.html` (línea 17)
```html
<script id="vite-plugin-pwa:register-sw" src="/Focus-Divergent/registerSW.js"></script>
```

### 3. **Script de registro** (`registerSW.js`)

Se genera automáticamente y registra el service worker:

**Contenido generado:**
```javascript
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Focus-Divergent/sw.js', { 
      scope: '/Focus-Divergent/' 
    })
  })
}
```

## 📂 Estructura de archivos

### Código fuente (lo que escribes):
```
.
├── vite.config.ts          ← Configuración PWA aquí
├── public/
│   ├── icon.svg           ← Icono SVG
│   └── icons/
│       ├── pwa-192x192.png
│       └── pwa-512x512.png
└── index.html              ← HTML base (sin manifest/SW aún)
```

### Build generado (dist/) (lo que se despliega):
```
dist/
├── manifest.webmanifest    ← Generado automáticamente
├── sw.js                   ← Generado automáticamente (Workbox)
├── registerSW.js           ← Generado automáticamente
├── workbox-*.js            ← Generado automáticamente
├── index.html              ← Modificado automáticamente (añade enlaces)
└── icons/
    ├── pwa-192x192.png     ← Copiado desde public/
    └── pwa-512x512.png     ← Copiado desde public/
```

## 🔧 Flujo de generación

1. **Escribes configuración** en `vite.config.ts`
2. **Ejecutas build:** `npm run build`
3. **vite-plugin-pwa genera:**
   - `manifest.webmanifest` desde la configuración
   - `sw.js` usando Workbox con precaching
   - `registerSW.js` para registrar el SW
   - Modifica `index.html` para incluir enlaces
4. **Archivos listos** en `dist/` para desplegar

## ✅ Verificación

### Ver archivos generados:

```bash
# Ver el manifest
cat dist/manifest.webmanifest

# Ver el service worker
head -50 dist/sw.js

# Ver el script de registro
cat dist/registerSW.js

# Ver el HTML con enlaces
grep -E 'manifest|registerSW' dist/index.html
```

### Verificar en el navegador:

1. **Manifest:**
   - Abre Chrome DevTools (F12)
   - Ve a Application → Manifest
   - Debe mostrar la configuración de `vite.config.ts`

2. **Service Worker:**
   - Chrome DevTools (F12)
   - Ve a Application → Service Workers
   - Debe aparecer como "activated and is running"

## 📌 Resumen

| Archivo | ¿Dónde está en código? | ¿Dónde se genera? | ¿Cuándo? |
|---------|------------------------|-------------------|----------|
| `manifest.webmanifest` | `vite.config.ts` (config) | `dist/manifest.webmanifest` | Al hacer build |
| `sw.js` | `vite.config.ts` (workbox) | `dist/sw.js` | Al hacer build |
| `registerSW.js` | Automático | `dist/registerSW.js` | Al hacer build |
| Enlaces en HTML | Automático | `dist/index.html` | Al hacer build |

**Conclusión:** No necesitas crear estos archivos manualmente. `vite-plugin-pwa` los genera automáticamente desde la configuración en `vite.config.ts`. ✅
