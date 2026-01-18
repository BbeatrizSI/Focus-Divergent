# Focus Divergent 🎯

> Una aplicación de temporizador Pomodoro combinada con ruido blanco configurable, diseñada especialmente para personas neurodivergentes que necesitan ayuda para mantener la concentración.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-enabled-4285f4.svg)](https://web.dev/progressive-web-apps/)

## 🌟 Características

- ⏱️ **Temporizador Pomodoro configurable** con tiempos personalizables para trabajo, descanso corto y descanso largo
- 🔊 **9 tipos de ruido blanco** configurables (blanco, rosa, marrón, azul, violeta, gris, verde, rojo)
- 🎨 **Interfaz accesible** pensada para personas neurodivergentes
- 🌙 **Modo oscuro/claro** con transiciones suaves
- ⚙️ **Configuración flexible** para personalizar tiempos y sonidos por fase
- 📱 **Diseño responsive** que funciona en diferentes dispositivos
- 🔧 **Función de prueba** para escuchar los ruidos antes de activarlos
- 💾 **PWA** - Instalable en dispositivos móviles y escritorio

## 🎵 Tipos de Ruido Blanco

Focus Divergent incluye 9 tipos diferentes de ruido blanco, cada uno con características únicas:

| Tipo | Descripción | Características |
|------|-------------|-----------------|
| **Blanco** | Ruido plano y uniforme en todas las frecuencias | Similar a la estática de TV, equilibrado |
| **Rosa** | Más suave y natural, -3dB por octava | Ideal para concentración y sueño |
| **Marrón** | Grave y relajante, -6dB por octava | Profundo como truenos lejanos |
| **Azul** | Agudo y energizante, +3dB por octava | Más brillante, activador |
| **Violeta** | Muy agudo, +6dB por octava | Sonido muy brillante |
| **Gris** | Ajustado a la percepción humana | Más cómodo que el blanco puro |
| **Verde** | Centrado en frecuencias medias | Natural, como naturaleza |
| **Rojo** | Similar al marrón, muy grave | Profundo y relajante |
| **Ninguno** | Sin sonido | Silencio |

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/focus-divergent.git
cd focus-divergent

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta el linter
```

## 📖 Uso

1. **Configurar tiempos**: Haz clic en el icono de configuración (⚙️) para ajustar los tiempos de trabajo, descanso corto y descanso largo.

2. **Seleccionar ruido blanco**: En la configuración, puedes elegir qué tipo de ruido reproducir durante la concentración y durante el descanso. Usa el icono de altavoz 🔊 para probar cada tipo antes de activarlo.

3. **Iniciar temporizador**: Haz clic en "▶️ Iniciar" para comenzar una sesión de trabajo.

4. **Pausar o reiniciar**: Usa los botones para pausar o reiniciar el temporizador según lo necesites.

5. **Cambiar tema**: Haz clic en el icono de luna/sol en el header para alternar entre modo claro y oscuro.

## 🛠️ Tecnologías

- **Frontend**: React 18.3 + TypeScript 5.5
- **Build Tool**: Vite 5.3
- **Estilos**: Tailwind CSS 3.4
- **Audio**: Web Audio API para generación de ruido blanco en tiempo real
- **Iconos**: React Icons (Heroicons)
- **PWA**: Service Worker + Web App Manifest

## 📁 Estructura del Proyecto

```
Focus-Divergent/
├── src/
│   ├── components/
│   │   ├── PomodoroTimer.tsx      # Componente principal del temporizador
│   │   ├── WhiteNoisePlayer.tsx   # Generador y reproductor de ruido blanco
│   │   ├── Settings.tsx           # Panel de configuración
│   │   └── ThemeToggle.tsx        # Toggle de tema claro/oscuro
│   ├── hooks/
│   │   └── useTheme.ts            # Hook para manejo de tema
│   ├── App.tsx                    # Componente principal
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales Tailwind
├── public/
│   └── manifest.json              # Manifest para PWA
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Diseño Accesible

Focus Divergent está diseñado pensando en la accesibilidad:

- **Colores tranquilos**: Paleta de colores suaves y relajantes en modo claro y oscuro
- **Interfaz simple**: Diseño minimalista sin distracciones
- **Contraste adecuado**: Cumple con estándares de accesibilidad WCAG
- **Transiciones suaves**: Animaciones sutiles para evitar sobreestimulación
- **Iconos claros**: Iconos outline para mejor comprensión visual

## 🧠 Acerca del Ruido Blanco

La aplicación genera ruido blanco en tiempo real usando la Web Audio API. Los diferentes tipos de ruido se crean aplicando filtros de frecuencia específicos:

- **Filtros lowpass**: Para ruidos graves (rosa, marrón, rojo)
- **Filtros highpass**: Para ruidos agudos (azul, violeta)
- **Filtros bandpass**: Para ruidos centrados (verde)
- **Filtros peaking**: Para ajustes perceptuales (gris)

## 📱 PWA (Progressive Web App)

Focus Divergent es una PWA instalable:

- **Instalación en móviles**: Puedes agregarla a la pantalla de inicio desde el navegador
- **Instalación en escritorio**: Funciona como aplicación nativa
- **Funciona offline**: El temporizador funciona sin conexión
- **Actualizaciones automáticas**: Se actualiza cuando hay nueva versión

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias para mejorar la accesibilidad o funcionalidad, por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 🙏 Agradecimientos

- Diseñado especialmente para la comunidad neurodivergente
- Inspirado en la técnica Pomodoro de Francesco Cirillo
- Construido con React y las mejores prácticas modernas de desarrollo web

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio.

---

Hecho con ❤️ para ayudar a mantener el foco y la concentración
