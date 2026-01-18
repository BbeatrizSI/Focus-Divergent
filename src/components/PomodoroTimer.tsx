import { useState, useEffect, useRef, useCallback } from 'react'
import { SettingsConfig, TimerPhase } from '../App'
import { HiPause, HiPlay, HiArrowPath } from 'react-icons/hi2'

export type TimerState = 'idle' | 'running' | 'paused'

interface PomodoroTimerProps {
  settings: SettingsConfig
  onPhaseChange: (phase: TimerPhase) => void
  onStateChange: (state: TimerState) => void
}

export default function PomodoroTimer({ settings, onPhaseChange, onStateChange }: PomodoroTimerProps) {
  const [phase, setPhase] = useState<TimerPhase>('idle')
  const [state, setState] = useState<TimerState>('idle')
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60) // en segundos
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const startTimer = useCallback(() => {
    if (state === 'running') return

    setState('running')
    if (phase === 'idle') {
      setPhase('work')
      setTimeLeft(settings.workDuration * 60)
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer completado
          handleTimerComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [state, phase, settings])

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState('paused')
  }, [])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState('idle')
    setPhase('idle')
    setTimeLeft(settings.workDuration * 60)
  }, [settings])

  const handleTimerComplete = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (phase === 'work') {
      const newCompleted = completedPomodoros + 1
      setCompletedPomodoros(newCompleted)
      
      // Cada 4 pomodoros, descanso largo
      const nextPhase: TimerPhase = newCompleted % 4 === 0 ? 'longBreak' : 'break'
      const nextDuration = nextPhase === 'longBreak' 
        ? settings.longBreakDuration 
        : settings.breakDuration

      setPhase(nextPhase)
      setTimeLeft(nextDuration * 60)
      setState('paused') // Pausado para que el usuario decida cuándo empezar

      if (nextPhase === 'break' && settings.autoStartBreaks) {
        setTimeout(() => startTimer(), 500)
      }
    } else {
      // Descanso completado, volver a trabajo
      setPhase('work')
      setTimeLeft(settings.workDuration * 60)
      setState('paused')

      if (settings.autoStartPomodoros) {
        setTimeout(() => startTimer(), 500)
      }
    }
  }, [phase, completedPomodoros, settings, startTimer])

  // Actualizar tiempo cuando cambian los settings
  useEffect(() => {
    if (state === 'idle') {
      setTimeLeft(settings.workDuration * 60)
    }
  }, [settings.workDuration, state])

  // Notificar cambios de fase al componente padre
  useEffect(() => {
    onPhaseChange(phase)
  }, [phase, onPhaseChange])

  // Notificar cambios de estado al componente padre
  useEffect(() => {
    onStateChange(state)
  }, [state, onStateChange])

  // Limpiar intervalo al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPhaseLabel = (): string => {
    switch (phase) {
      case 'work':
        return 'Concentración'
      case 'break':
        return 'Descanso Corto'
      case 'longBreak':
        return 'Descanso Largo'
      default:
        return 'Listo para empezar'
    }
  }

  const progressPercentage = phase === 'idle' 
    ? 0 
    : ((timeLeft / (phase === 'work' 
        ? settings.workDuration * 60 
        : phase === 'longBreak' 
          ? settings.longBreakDuration * 60 
          : settings.breakDuration * 60)) * 100)

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference * (1 - progressPercentage / 100)

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-peaceful-800 rounded-3xl shadow-lg w-full max-w-lg transition-colors duration-200">
      <div className="text-lg text-calm-600 dark:text-peaceful-300 font-medium uppercase tracking-wide">
        {getPhaseLabel()}
      </div>
      
      <div className="w-full flex justify-center items-center">
        <div className="relative w-64 h-64 md:w-72 md:h-72">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-calm-200 dark:text-peaceful-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-calm-500 dark:text-peaceful-400 transition-all duration-300"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl md:text-5xl font-semibold text-calm-800 dark:text-peaceful-100 tabular-nums tracking-wider">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {state === 'running' ? (
          <button
            className="px-4 py-2 rounded-xl font-medium min-w-[120px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
            onClick={pauseTimer}
          >
            <HiPause className="w-5 h-5" />
            <span>Pausar</span>
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-xl font-medium min-w-[120px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 bg-calm-500 hover:bg-calm-600 dark:bg-peaceful-500 dark:hover:bg-peaceful-600 text-white flex items-center justify-center gap-2"
            onClick={startTimer}
          >
            <HiPlay className="w-5 h-5" />
            <span>Iniciar</span>
          </button>
        )}
        <button
          className="px-4 py-2 rounded-xl font-medium min-w-[120px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 bg-calm-100 dark:bg-peaceful-700 hover:bg-calm-200 dark:hover:bg-peaceful-600 text-calm-800 dark:text-peaceful-200 border-2 border-calm-200 dark:border-peaceful-600 flex items-center justify-center gap-2"
          onClick={resetTimer}
        >
          <HiArrowPath className="w-5 h-5" />
          <span>Reiniciar</span>
        </button>
      </div>

      <div className="px-4 py-2 bg-calm-100 dark:bg-peaceful-700 rounded-lg text-sm text-calm-700 dark:text-peaceful-300">
        Pomodoros completados: {completedPomodoros}
      </div>
    </div>
  )
}
