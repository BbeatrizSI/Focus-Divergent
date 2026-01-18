# 🚀 Guía de Despliegue a GitHub Pages

Esta guía te ayudará a subir Focus Divergent a GitHub Pages.

## 📋 Prerequisitos

1. Tener una cuenta de GitHub
2. Tener Git instalado en tu máquina
3. Tener Node.js y npm instalados

## 🛠️ Pasos para Desplegar

### 1. Crear el repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha y selecciona **"New repository"**
3. Nombre del repositorio: **`Focus-Divergent`** (o el que prefieras)
4. Descripción: "Temporizador Pomodoro con ruido blanco configurable para personas neurodivergentes"
5. Deja el repositorio como **Público** (necesario para GitHub Pages gratuito)
6. **NO** marques "Add a README file" (ya tenemos uno)
7. Haz clic en **"Create repository"**

### 2. Inicializar Git en tu proyecto local

```bash
# Asegúrate de estar en el directorio del proyecto
cd /home/bbeatrizsi/Escritorio/Repos/Focus-Divergent

# Inicializar Git (si no está inicializado)
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Focus Divergent - Pomodoro timer with white noise"
```

### 3. Conectar con el repositorio remoto

```bash
# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/Focus-Divergent.git

# Cambiar a la rama main (si estás en otra)
git branch -M main

# Subir el código
git push -u origin main
```

### 4. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source**, selecciona **"GitHub Actions"**
5. Guarda los cambios

### 5. Desplegar

El workflow de GitHub Actions se ejecutará automáticamente cada vez que hagas push a la rama `main`. 

Para desplegar manualmente:

```bash
# Hacer cambios y commit
git add .
git commit -m "Tu mensaje de commit"

# Push a GitHub (esto activará el deployment automático)
git push origin main
```

### 6. Ver tu aplicación en vivo

Una vez que GitHub Actions complete el deployment (puedes ver el progreso en la pestaña **Actions** de tu repositorio), tu aplicación estará disponible en:

**`https://TU_USUARIO.github.io/Focus-Divergent/`**

## 🔧 Solución de Problemas

### El workflow no se ejecuta

- Verifica que el archivo `.github/workflows/deploy.yml` existe
- Asegúrate de que estás haciendo push a la rama `main`
- Revisa la pestaña **Actions** en GitHub para ver errores

### La aplicación no carga correctamente

- Verifica que el `base` en `vite.config.ts` sea `/Focus-Divergent/` (o el nombre de tu repositorio)
- Asegúrate de que todos los assets están siendo incluidos en el build
- Revisa la consola del navegador para errores

### Los iconos de PWA no aparecen

Los iconos de PWA son generados automáticamente por `vite-plugin-pwa`, pero si quieres iconos personalizados:

1. Crea iconos de 192x192 y 512x512 píxeles
2. Colócalos en la carpeta `public/` con los nombres `pwa-192x192.png` y `pwa-512x512.png`
3. Rebuild la aplicación

## 📝 Comandos Útiles

```bash
# Ver el estado de Git
git status

# Ver los commits
git log

# Cambiar el remote (si es necesario)
git remote set-url origin https://github.com/TU_USUARIO/NUEVO_REPOSITORIO.git

# Forzar el deployment manualmente
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

## 🎉 ¡Listo!

Una vez completados estos pasos, tu aplicación estará disponible en GitHub Pages y funcionará como una PWA instalable.
