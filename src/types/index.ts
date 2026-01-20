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
export type TimerState = 'idle' | 'running' | 'paused'

export interface SavedTimerState {
  phase: TimerPhase
  state: TimerState
  timeLeft: number
  completedPomodoros: number
  startTime?: number
}
