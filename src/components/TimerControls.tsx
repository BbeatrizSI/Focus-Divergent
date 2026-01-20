import { HiPause, HiPlay, HiArrowPath } from 'react-icons/hi2'
import { TimerState } from '../types'

interface TimerControlsProps {
  state: TimerState
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export default function TimerControls({ state, onStart, onPause, onReset }: TimerControlsProps) {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {state === 'running' ? (
        <button
          className="px-4 py-2 rounded-xl font-medium min-w-[120px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
          onClick={onPause}
        >
          <HiPause className="w-5 h-5" />
          <span>Pausar</span>
        </button>
      ) : (
        <button
          className="px-4 py-2 rounded-xl font-medium min-w-[120px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 bg-calm-500 hover:bg-calm-600 dark:bg-peaceful-500 dark:hover:bg-peaceful-600 text-white flex items-center justify-center gap-2"
          onClick={onStart}
        >
          <HiPlay className="w-5 h-5" />
          <span>Iniciar</span>
        </button>
      )}
      <button
        className="px-4 py-2 rounded-xl font-medium min-w-[120px] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 bg-calm-100 dark:bg-peaceful-700 hover:bg-calm-200 dark:hover:bg-peaceful-600 text-calm-800 dark:text-peaceful-200 border-2 border-calm-200 dark:border-peaceful-600 flex items-center justify-center gap-2"
        onClick={onReset}
      >
        <HiArrowPath className="w-5 h-5" />
        <span>Reiniciar</span>
      </button>
    </div>
  )
}
