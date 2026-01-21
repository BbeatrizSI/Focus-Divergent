import { useState, useEffect, useRef, useCallback } from 'react'
import { SettingsConfig, TimerPhase, TimerState, SavedTimerState } from '../types'
import { playWorkStartSound, playBreakStartSound } from '../utils/phaseSounds'

interface UsePomodoroTimerReturn {
  phase: TimerPhase
  state: TimerState
  timeLeft: number
  completedPomodoros: number
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  progressPercentage: number
}

const loadPersistedState = (): SavedTimerState | null => {
  const saved = localStorage.getItem('pomodoroTimerState')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      // Verificar que el estado no sea muy antiguo (más de 24 horas)
      if (parsed.startTime && Date.now() - parsed.startTime < 24 * 60 * 60 * 1000) {
        // Validar que completedPomodoros sea un número válido
        if (typeof parsed.completedPomodoros === 'number' && parsed.completedPomodoros >= 0) {
          return parsed
        } else {
          // Si completedPomodoros es inválido, limpiar el estado
          localStorage.removeItem('pomodoroTimerState')
          return null
        }
      }
    } catch {
      // Si hay error, ignorar
    }
  }
  return null
}

export function usePomodoroTimer(
  settings: SettingsConfig,
  onPhaseChange: (phase: TimerPhase) => void,
  onStateChange: (state: TimerState) => void
): UsePomodoroTimerReturn {
  const persistedState = loadPersistedState()
  const [phase, setPhase] = useState<TimerPhase>(persistedState?.phase || 'idle')
  const [state, setState] = useState<TimerState>(persistedState?.state || 'idle')
  const [timeLeft, setTimeLeft] = useState(() => {
    if (persistedState && persistedState.state === 'running' && persistedState.startTime) {
      // Calcular tiempo restante basado en cuando se guardó
      const elapsed = Math.floor((Date.now() - persistedState.startTime) / 1000)
      const remaining = persistedState.timeLeft - elapsed
      return Math.max(0, remaining)
    }
    return persistedState?.timeLeft || settings.workDuration * 60
  })
  const [completedPomodoros, setCompletedPomodoros] = useState(() => {
    // Asegurar que completedPomodoros siempre sea un número válido
    const saved = persistedState?.completedPomodoros
    return (typeof saved === 'number' && saved >= 0) ? saved : 0
  })
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const previousPhaseRef = useRef<TimerPhase>(persistedState?.phase || 'idle')

  const handleTimerComplete = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null

    if (phase === 'work') {
      // Asegurar que completedPomodoros sea un número válido antes de incrementar
      const currentCompleted = typeof completedPomodoros === 'number' && completedPomodoros >= 0 ? completedPomodoros : 0
      const newCompleted = currentCompleted + 1
      setCompletedPomodoros(newCompleted)
      
      // Cada N ciclos (configurable), descanso largo
      const cyclesBeforeLongBreak = settings.cyclesBeforeLongBreak ?? 4
      const nextPhase: TimerPhase = (newCompleted % cyclesBeforeLongBreak === 0) ? 'longBreak' : 'break'
      const nextDuration = nextPhase === 'longBreak' 
        ? settings.longBreakDuration 
        : settings.breakDuration

      setPhase(nextPhase)
      setTimeLeft(nextDuration * 60)
      setState('paused')

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
  }, [phase, completedPomodoros, settings])

  const startTimer = useCallback(() => {
    if (state === 'running') return

    setState('running')
    if (phase === 'idle') {
      setPhase('work')
      setTimeLeft(settings.workDuration * 60)
    }

    const totalDuration = phase === 'work' 
      ? settings.workDuration * 60 
      : phase === 'longBreak' 
        ? settings.longBreakDuration * 60 
        : settings.breakDuration * 60
    
    startTimeRef.current = Date.now() - ((totalDuration - timeLeft) * 1000)

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimerComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [state, phase, settings, timeLeft, handleTimerComplete])

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
    setState('paused')
  }, [])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
    setState('idle')
    setPhase('idle')
    setTimeLeft(settings.workDuration * 60)
    setCompletedPomodoros(0)
    localStorage.removeItem('pomodoroTimerState')
  }, [settings])

  // Actualizar tiempo cuando cambian los settings
  useEffect(() => {
    if (state === 'idle') {
      setTimeLeft(settings.workDuration * 60)
    }
  }, [settings.workDuration, state])

  // Notificar cambios de fase al componente padre y reproducir sonidos
  useEffect(() => {
    onPhaseChange(phase)
    
    // Reproducir sonido solo cuando cambia de una fase a otra (no al inicializar)
    if (previousPhaseRef.current !== phase && previousPhaseRef.current !== 'idle') {
      if (phase === 'work') {
        playWorkStartSound()
      } else if (phase === 'break' || phase === 'longBreak') {
        playBreakStartSound()
      }
    }
    
    previousPhaseRef.current = phase
  }, [phase, onPhaseChange])

  // Notificar cambios de estado al componente padre
  useEffect(() => {
    onStateChange(state)
  }, [state, onStateChange])

  // Persistir estado del timer
  useEffect(() => {
    const timerState: SavedTimerState = {
      phase,
      state,
      timeLeft,
      completedPomodoros,
      startTime: startTimeRef.current || undefined,
    }
    localStorage.setItem('pomodoroTimerState', JSON.stringify(timerState))
  }, [phase, state, timeLeft, completedPomodoros])

  // Si el timer estaba corriendo al cargar, reanudarlo
  useEffect(() => {
    if (persistedState && persistedState.state === 'running' && timeLeft > 0) {
      const totalDuration = persistedState.phase === 'work' 
        ? settings.workDuration * 60 
        : persistedState.phase === 'longBreak' 
          ? settings.longBreakDuration * 60 
          : settings.breakDuration * 60
      
      startTimeRef.current = Date.now() - ((totalDuration - timeLeft) * 1000)
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setState('running')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Solo al montar

  // Limpiar intervalo al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Calcular porcentaje de progreso
  const progressPercentage = phase === 'idle' 
    ? 0 
    : ((timeLeft / (phase === 'work' 
        ? settings.workDuration * 60 
        : phase === 'longBreak' 
          ? settings.longBreakDuration * 60 
          : settings.breakDuration * 60)) * 100)

  return {
    phase,
    state,
    timeLeft,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer,
    progressPercentage,
  }
}
