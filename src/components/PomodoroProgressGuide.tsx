import { TimerPhase } from '../types'

interface PomodoroProgressGuideProps {
  completedPomodoros: number
  currentPhase: TimerPhase
  cyclesBeforeLongBreak: number
}

export default function PomodoroProgressGuide({
  completedPomodoros,
  currentPhase,
  cyclesBeforeLongBreak,
}: PomodoroProgressGuideProps) {
  const steps: Array<{ label: string; phase: TimerPhase; cycleNumber: number }> = []
  
  // Crear los pasos: Work 1, Break 1, Work 2, Break 2, ..., Work N, Long Break
  for (let i = 1; i <= cyclesBeforeLongBreak; i++) {
    steps.push({ label: `Trabajo ${i}`, phase: 'work', cycleNumber: i })
    if (i < cyclesBeforeLongBreak) {
      steps.push({ label: `Descanso ${i}`, phase: 'break', cycleNumber: i })
    } else {
      steps.push({ label: 'Descanso Largo', phase: 'longBreak', cycleNumber: i })
    }
  }

  const getCurrentStepIndex = (): number => {
    if (currentPhase === 'idle') return -1
    
    if (currentPhase === 'longBreak') {
      return steps.length - 1
    }
    
    if (currentPhase === 'work') {
      return completedPomodoros * 2
    }
    
    if (currentPhase === 'break') {
      if (completedPomodoros > 0 && completedPomodoros % cyclesBeforeLongBreak === 0) {
        return steps.length - 1
      }
      return completedPomodoros * 2 - 1
    }
    
    return -1
  }

  const currentStepIndex = getCurrentStepIndex()

  const getPhaseIcon = (phase: TimerPhase) => {
    if (phase === 'work') return '●'
    if (phase === 'break') return '○'
    return '◉' // longBreak
  }

  const getPhaseColor = (phase: TimerPhase, isCompleted: boolean, isCurrent: boolean) => {
    if (isCurrent) {
      if (phase === 'work') return 'text-calm-600 dark:text-peaceful-300'
      if (phase === 'break') return 'text-calm-500 dark:text-peaceful-400'
      return 'text-calm-700 dark:text-peaceful-200'
    }
    if (isCompleted) {
      if (phase === 'work') return 'text-calm-400 dark:text-peaceful-500'
      if (phase === 'break') return 'text-calm-300 dark:text-peaceful-600'
      return 'text-calm-500 dark:text-peaceful-500'
    }
    if (phase === 'work') return 'text-calm-200 dark:text-peaceful-700'
    if (phase === 'break') return 'text-calm-100 dark:text-peaceful-800'
    return 'text-calm-200 dark:text-peaceful-700'
  }

  return (
    <div className="w-full mt-3 px-2">
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div key={index} className="flex items-center flex-shrink-0">
              <div 
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 ${
                  isCurrent
                    ? 'bg-calm-100 dark:bg-peaceful-700 ring-2 ring-calm-400 dark:ring-peaceful-400'
                    : isCompleted
                    ? 'bg-calm-50 dark:bg-peaceful-800/50'
                    : 'opacity-60'
                }`}
                title={step.label}
              >
                <span className={`text-xs font-medium ${getPhaseColor(step.phase, isCompleted, isCurrent)}`}>
                  {getPhaseIcon(step.phase)}
                </span>
                <span className={`text-[10px] font-medium ${getPhaseColor(step.phase, isCompleted, isCurrent)}`}>
                  {step.phase === 'work' ? step.cycleNumber : step.phase === 'longBreak' ? 'L' : step.cycleNumber}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-2 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-calm-300 dark:bg-peaceful-600'
                      : 'bg-calm-200 dark:bg-peaceful-700'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-4 text-[10px] text-calm-500 dark:text-peaceful-500">
          <div className="flex items-center gap-1">
            <span className="text-calm-400 dark:text-peaceful-600">●</span>
            <span>Trabajo</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-calm-300 dark:text-peaceful-700">○</span>
            <span>Descanso</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-calm-500 dark:text-peaceful-500">◉</span>
            <span>Largo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
