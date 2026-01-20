import { SettingsConfig, TimerPhase, TimerState } from '../types'
import { usePomodoroTimer } from '../hooks/usePomodoroTimer'
import TimerCircle from './TimerCircle'
import TimerControls from './TimerControls'
import PomodoroProgressGuide from './PomodoroProgressGuide'

export type { TimerState }

interface PomodoroTimerProps {
  settings: SettingsConfig
  onPhaseChange: (phase: TimerPhase) => void
  onStateChange: (state: TimerState) => void
}

const getPhaseLabel = (phase: TimerPhase): string => {
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

export default function PomodoroTimer({ settings, onPhaseChange, onStateChange }: PomodoroTimerProps) {
  const {
    phase,
    state,
    timeLeft,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer,
    progressPercentage,
  } = usePomodoroTimer(settings, onPhaseChange, onStateChange)

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-peaceful-800 rounded-3xl shadow-lg w-full max-w-lg transition-colors duration-200">
      <div className="text-lg text-calm-600 dark:text-peaceful-300 font-medium uppercase tracking-wide">
        {getPhaseLabel(phase)}
      </div>
      
      <TimerCircle timeLeft={timeLeft} progressPercentage={progressPercentage} />

      <TimerControls
        state={state}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />

      <PomodoroProgressGuide
        completedPomodoros={completedPomodoros}
        currentPhase={phase}
        cyclesBeforeLongBreak={settings.cyclesBeforeLongBreak ?? 4}
      />
    </div>
  )
}
