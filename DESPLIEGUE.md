# 🚀 Comandos para Desplegar en GitHub Pages

## 📋 Pasos para Desplegar la PWA

### 1️⃣ Añadir todos los archivos al staging

```bash
git add .
```

### 2️⃣ Hacer commit de los cambios

```bash
git commit -m "Configuración completa PWA para GitHub Pages"
```

### 3️⃣ Push a la rama main (esto dispara el despliegue automático)

```bash
git push origin main
```

### 4️⃣ Verificar el despliegue

Después del push, GitHub Actions ejecutará automáticamente el workflow de despliegue.

**Para ver el progreso:**
1. Ve a tu repositorio en GitHub: `https://github.com/BbeatrizSI/Focus-Divergent`
2. Haz clic en la pestaña **"Actions"**
3. Verás el workflow ejecutándose
4. Espera 3-4 minutos a que termine

**URL de tu app desplegada:**
```
https://BbeatrizSI.github.io/Focus-Divergent/
```

## ⚙️ Configuración Inicial (solo la primera vez)

### Habilitar GitHub Pages en el repositorio:

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. En "Source", selecciona **"GitHub Actions"** (no "Deploy from a branch")
4. Guarda los cambios

**Nota:** Con el workflow configurado, esto debería estar automático, pero verifícalo.

## 📱 Instalar la PWA en Móvil

### Después del despliegue:

1. **Abre la app en tu móvil:**
   ```
   https://BbeatrizSI.github.io/Focus-Divergent/
   ```

2. **Espera 3-5 segundos** a que se registre el service worker

3. **Android (Chrome):**
   - Debería aparecer automáticamente un banner "Instalar app"
   - O ve al menú (⋮) → "Instalar app"

4. **iOS (Safari):**
   - Toca el botón de compartir (□↑)
   - Selecciona "Agregar a pantalla de inicio"

## ✅ Checklist de Verificación

- [ ] Repositorio configurado: `origin` apunta a GitHub ✓
- [ ] Workflow configurado: `.github/workflows/deploy.yml` ✓
- [ ] Build funciona: `npm run build` sin errores ✓
- [ ] Archivos PWA generados: `dist/manifest.webmanifest`, `dist/sw.js` ✓
- [ ] Listo para hacer push

## 🔄 Comandos Rápidos (Todo en uno)

```bash
# 1. Añadir archivos
git add .

# 2. Commit
git commit -m "Configuración completa PWA para GitHub Pages"

# 3. Push (despliega automáticamente)
git push origin main
```

¡Eso es todo! 🎉 El workflow se ejecutará automáticamente y tu PWA estará disponible en GitHub Pages.
