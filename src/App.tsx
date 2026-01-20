import { useState, useEffect } from 'react'
import PomodoroTimer, { TimerState } from './components/PomodoroTimer'
import WhiteNoisePlayer from './components/WhiteNoisePlayer'
import Settings from './components/Settings'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

export interface SettingsConfig {
  workDuration: number // en minutos
  breakDuration: number // en minutos
  longBreakDuration: number // en minutos
  cyclesBeforeLongBreak: number // número de ciclos antes del descanso largo
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
}

export type NoiseType = 'white' | 'pink' | 'brown' | 'blue' | 'violet' | 'grey' | 'green' | 'red' | 'none'
export type TimerPhase = 'work' | 'break' | 'longBreak' | 'idle'

function App() {
  useTheme() // Initialize theme system
  const [settings, setSettings] = useState<SettingsConfig>(() => {
    const saved = localStorage.getItem('pomodoroSettings')
    const defaults = {
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      cyclesBeforeLongBreak: 4,
      autoStartBreaks: true,
      autoStartPomodoros: true,
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Asegurar que todos los campos existan (para compatibilidad con versiones antiguas)
        return {
          ...defaults,
          ...parsed,
          cyclesBeforeLongBreak: parsed.cyclesBeforeLongBreak ?? defaults.cyclesBeforeLongBreak,
          // Asegurar que los valores de autoStart existan (para compatibilidad con versiones antiguas)
          autoStartBreaks: parsed.autoStartBreaks ?? defaults.autoStartBreaks,
          autoStartPomodoros: parsed.autoStartPomodoros ?? defaults.autoStartPomodoros,
        }
      } catch {
        // Si hay error, usar defaults
        return defaults
      }
    }
    return defaults
  })

  const [currentPhase, setCurrentPhase] = useState<TimerPhase>('idle')
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [workNoise, setWorkNoise] = useState<NoiseType>(() => {
    const saved = localStorage.getItem('workNoise')
    return (saved as NoiseType) || 'brown'
  })
  const [breakNoise, setBreakNoise] = useState<NoiseType>(() => {
    const saved = localStorage.getItem('breakNoise')
    return (saved as NoiseType) || 'none'
  })
  const [showSettings, setShowSettings] = useState(false)

  const currentNoise = currentPhase === 'idle' 
    ? 'none' 
    : currentPhase === 'work' 
      ? workNoise 
      : breakNoise

  // El ruido blanco solo debe estar activo cuando el temporizador está corriendo
  const isTimerRunning = timerState === 'running'

  // Persistir configuraciones
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem('workNoise', workNoise)
  }, [workNoise])

  useEffect(() => {
    localStorage.setItem('breakNoise', breakNoise)
  }, [breakNoise])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-calm-50 via-calm-100 to-calm-200 dark:from-peaceful-900 dark:via-peaceful-800 dark:to-peaceful-900">
      <header className="px-4 md:px-6 py-4 bg-white dark:bg-peaceful-800 border-b border-calm-200 dark:border-peaceful-700 flex justify-between items-center shadow-sm">
        <h1 className="text-xl md:text-2xl font-semibold text-calm-700 dark:text-peaceful-200 tracking-tight">
          Focus Divergent
        </h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="p-2 rounded-lg bg-calm-100 dark:bg-peaceful-700 hover:bg-calm-200 dark:hover:bg-peaceful-600 transition-all duration-200 hover:scale-110 active:scale-95 w-10 h-10 flex items-center justify-center"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Configuración"
          >
            <HiOutlineCog6Tooth className="w-5 h-5 text-calm-700 dark:text-peaceful-200" />
          </button>
        </div>
      </header>

      {showSettings && (
        <Settings
          settings={settings}
          onSettingsChange={setSettings}
          workNoise={workNoise}
          breakNoise={breakNoise}
          onWorkNoiseChange={setWorkNoise}
          onBreakNoiseChange={setBreakNoise}
          onClose={() => setShowSettings(false)}
        />
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 gap-6 md:gap-8 max-w-4xl mx-auto w-full">
        <PomodoroTimer
          settings={settings}
          onPhaseChange={setCurrentPhase}
          onStateChange={setTimerState}
        />
        <WhiteNoisePlayer
          noiseType={currentNoise}
          isActive={isTimerRunning && currentPhase !== 'idle'}
        />
      </main>
    </div>
  )
}

export default App
