# Focus Divergent 🎯

> Una aplicación de temporizador combinada con ruido blanco configurable, diseñada especialmente para personas neurodivergentes que necesitan ayuda para mantener la concentración.

> A timer application combined with configurable white noise, designed especially for neurodivergent people who need help maintaining focus.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-enabled-4285f4.svg)](https://web.dev/progressive-web-apps/)

---

## 🌟 Características / Features

- ⏱️ **Temporizador configurable** con tiempos personalizables para trabajo, descanso corto y descanso largo
  - **Configurable timer** with customizable times for work, short break, and long break
- 🔊 **9 tipos de ruido blanco** configurables (blanco, rosa, marrón, azul, violeta, gris, verde, rojo)
  - **9 types of white noise** configurable (white, pink, brown, blue, violet, grey, green, red)
- 🎨 **Interfaz accesible** pensada para personas neurodivergentes
  - **Accessible interface** designed for neurodivergent people
- 🌙 **Modo oscuro/claro** con transiciones suaves
  - **Dark/light mode** with smooth transitions
- ⚙️ **Configuración flexible** para personalizar tiempos y sonidos por fase
  - **Flexible configuration** to customize times and sounds per phase
- 📱 **Diseño responsive** que funciona en diferentes dispositivos
  - **Responsive design** that works on different devices
- 🔧 **Función de prueba** para escuchar los ruidos antes de activarlos
  - **Test function** to listen to sounds before activating them
- 💾 **PWA** - Instalable en dispositivos móviles y escritorio
  - **PWA** - Installable on mobile and desktop devices
- 🔔 **Sonidos de notificación** suaves al cambiar de fase
  - **Soft notification sounds** when changing phases

## 🎵 Tipos de Ruido Blanco / White Noise Types

Focus Divergent incluye 9 tipos diferentes de ruido blanco, cada uno con características únicas:

Focus Divergent includes 9 different types of white noise, each with unique characteristics:

| Tipo / Type | Descripción / Description | Características / Characteristics |
|------|-------------|-----------------|
| **Blanco / White** | Ruido plano y uniforme en todas las frecuencias<br>Flat and uniform noise at all frequencies | Similar a la estática de TV, equilibrado<br>Similar to TV static, balanced |
| **Rosa / Pink** | Más suave y natural, -3dB por octava<br>Softer and more natural, -3dB per octave | Ideal para concentración y sueño<br>Ideal for focus and sleep |
| **Marrón / Brown** | Grave y relajante, -6dB por octava<br>Deep and relaxing, -6dB per octave | Profundo como truenos lejanos<br>Deep like distant thunder |
| **Azul / Blue** | Agudo y energizante, +3dB por octave<br>Sharp and energizing, +3dB per octave | Más brillante, activador<br>Brighter, activating |
| **Violeta / Violet** | Muy agudo, +6dB por octava<br>Very sharp, +6dB per octave | Sonido muy brillante<br>Very bright sound |
| **Gris / Grey** | Ajustado a la percepción humana<br>Adjusted to human perception | Más cómodo que el blanco puro<br>More comfortable than pure white |
| **Verde / Green** | Centrado en frecuencias medias<br>Centered on mid frequencies | Natural, como naturaleza<br>Natural, like nature |
| **Rojo / Red** | Similar al marrón, muy grave<br>Similar to brown, very deep | Profundo y relajante<br>Deep and relaxing |
| **Ninguno / None** | Sin sonido<br>No sound | Silencio<br>Silence |

## 🚀 Inicio Rápido / Quick Start

### Instalación / Installation

```bash
# Clonar el repositorio / Clone the repository
git clone https://github.com/tu-usuario/focus-divergent.git
cd focus-divergent

# Instalar dependencias / Install dependencies
npm install

# Iniciar servidor de desarrollo / Start development server
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`  
The application will be available at `http://localhost:5173`

### Scripts Disponibles / Available Scripts

```bash
npm run dev      # Inicia el servidor de desarrollo / Start development server
npm run build    # Construye la aplicación para producción / Build for production
npm run preview  # Previsualiza la build de producción / Preview production build
npm run lint     # Ejecuta el linter / Run linter
```

## 📖 Uso / Usage

### Español

1. **Configurar tiempos**: Haz clic en el icono de configuración (⚙️) para ajustar los tiempos de trabajo, descanso corto y descanso largo, así como el número de ciclos antes del descanso largo.

2. **Seleccionar ruido blanco**: En la configuración, puedes elegir qué tipo de ruido reproducir durante la concentración y durante el descanso. Usa el icono de altavoz 🔊 para probar cada tipo antes de activarlo.

3. **Iniciar temporizador**: Haz clic en "▶️ Iniciar" para comenzar una sesión de trabajo.

4. **Pausar o reiniciar**: Usa los botones para pausar o reiniciar el temporizador según lo necesites.

5. **Cambiar tema**: Haz clic en el icono de luna/sol en el header para alternar entre modo claro y oscuro.

6. **Seguir el progreso**: La guía visual muestra todas las fases del ciclo y tu progreso actual.

### English

1. **Configure times**: Click the settings icon (⚙️) to adjust work, short break, and long break times, as well as the number of cycles before a long break.

2. **Select white noise**: In settings, you can choose which type of noise to play during focus and during breaks. Use the speaker icon 🔊 to test each type before activating it.

3. **Start timer**: Click "▶️ Start" to begin a work session.

4. **Pause or reset**: Use the buttons to pause or reset the timer as needed.

5. **Change theme**: Click the moon/sun icon in the header to toggle between light and dark mode.

6. **Track progress**: The visual guide shows all phases of the cycle and your current progress.

## 🛠️ Tecnologías / Technologies

- **Frontend**: React 18.3 + TypeScript 5.5
- **Build Tool**: Vite 5.3
- **Estilos / Styles**: Tailwind CSS 3.4
- **Audio**: Web Audio API para generación de ruido blanco en tiempo real / Web Audio API for real-time white noise generation
- **Iconos / Icons**: React Icons (Heroicons)
- **PWA**: Service Worker + Web App Manifest

## 📁 Estructura del Proyecto / Project Structure

```
Focus-Divergent/
├── src/
│   ├── components/
│   │   ├── PomodoroTimer.tsx          # Componente principal del temporizador
│   │   ├── TimerCircle.tsx            # Círculo visual del temporizador
│   │   ├── TimerControls.tsx          # Botones de control
│   │   ├── PomodoroProgressGuide.tsx  # Guía visual de progreso
│   │   ├── WhiteNoisePlayer.tsx       # Generador y reproductor de ruido blanco
│   │   ├── Settings.tsx               # Panel de configuración principal
│   │   ├── ThemeToggle.tsx            # Toggle de tema claro/oscuro
│   │   └── settings/
│   │       ├── TimeSettings.tsx       # Configuración de tiempos
│   │       ├── AutoOptions.tsx        # Opciones automáticas
│   │       └── NoiseSettings.tsx      # Configuración de ruido
│   ├── hooks/
│   │   ├── usePomodoroTimer.ts        # Hook principal del temporizador
│   │   └── useTheme.ts                # Hook para manejo de tema
│   ├── types/
│   │   └── index.ts                   # Tipos e interfaces compartidos
│   ├── utils/
│   │   ├── phaseSounds.ts             # Generador de sonidos de notificación
│   │   └── testNoiseGenerator.ts      # Generador de ruido para pruebas
│   ├── App.tsx                        # Componente principal
│   ├── main.tsx                       # Punto de entrada
│   └── index.css                      # Estilos globales Tailwind
├── public/
│   └── manifest.json                  # Manifest para PWA
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Diseño Accesible / Accessible Design

Focus Divergent está diseñado pensando en la accesibilidad:

Focus Divergent is designed with accessibility in mind:

- **Colores tranquilos**: Paleta de colores suaves y relajantes en modo claro y oscuro
  - **Calm colors**: Soft and relaxing color palette in light and dark mode
- **Interfaz simple**: Diseño minimalista sin distracciones
  - **Simple interface**: Minimalist design without distractions
- **Contraste adecuado**: Cumple con estándares de accesibilidad WCAG
  - **Adequate contrast**: Meets WCAG accessibility standards
- **Transiciones suaves**: Animaciones sutiles para evitar sobreestimulación
  - **Smooth transitions**: Subtle animations to avoid overstimulation
- **Iconos claros**: Iconos outline para mejor comprensión visual
  - **Clear icons**: Outline icons for better visual understanding

## 🧠 Acerca del Ruido Blanco / About White Noise

La aplicación genera ruido blanco en tiempo real usando la Web Audio API. Los diferentes tipos de ruido se crean aplicando filtros de frecuencia específicos:

The application generates white noise in real time using the Web Audio API. Different types of noise are created by applying specific frequency filters:

- **Filtros lowpass**: Para ruidos graves (rosa, marrón, rojo)
  - **Lowpass filters**: For deep noises (pink, brown, red)
- **Filtros highpass**: Para ruidos agudos (azul, violeta)
  - **Highpass filters**: For sharp noises (blue, violet)
- **Filtros bandpass**: Para ruidos centrados (verde)
  - **Bandpass filters**: For centered noises (green)
- **Filtros peaking**: Para ajustes perceptuales (gris)
  - **Peaking filters**: For perceptual adjustments (grey)

## 📱 PWA (Progressive Web App)

Focus Divergent es una PWA instalable:

Focus Divergent is an installable PWA:

- **Instalación en móviles**: Puedes agregarla a la pantalla de inicio desde el navegador
  - **Mobile installation**: You can add it to the home screen from the browser
- **Instalación en escritorio**: Funciona como aplicación nativa
  - **Desktop installation**: Works as a native application
- **Funciona offline**: El temporizador funciona sin conexión
  - **Works offline**: The timer works without connection
- **Actualizaciones automáticas**: Se actualiza cuando hay nueva versión
  - **Automatic updates**: Updates when there's a new version

## 🤝 Contribuciones / Contributions

Las contribuciones son bienvenidas. Si tienes sugerencias para mejorar la accesibilidad o funcionalidad, por favor:

Contributions are welcome. If you have suggestions to improve accessibility or functionality, please:

1. Fork el proyecto / Fork the project
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request / Open a Pull Request

## 📄 Licencia / License

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Agradecimientos / Acknowledgments

- Diseñado especialmente para la comunidad neurodivergente
  - Designed especially for the neurodivergent community
- Construido con React y las mejores prácticas modernas de desarrollo web
  - Built with React and modern web development best practices

## 📧 Contacto / Contact

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio.

If you have questions or suggestions, feel free to open an issue in the repository.

---

Hecho con ❤️ para ayudar a mantener el foco y la concentración  
Made with ❤️ to help maintain focus and concentration
