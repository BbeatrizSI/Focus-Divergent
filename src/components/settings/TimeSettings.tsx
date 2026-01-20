import { useState, useEffect } from 'react'
import { SettingsConfig } from '../../types'

interface TimeSettingsProps {
  settings: SettingsConfig
  onSettingsChange: (settings: SettingsConfig) => void
}

export default function TimeSettings({ settings, onSettingsChange }: TimeSettingsProps) {
  const [workDurationInput, setWorkDurationInput] = useState(settings.workDuration.toString())
  const [breakDurationInput, setBreakDurationInput] = useState(settings.breakDuration.toString())
  const [longBreakDurationInput, setLongBreakDurationInput] = useState(settings.longBreakDuration.toString())
  const [cyclesInput, setCyclesInput] = useState((settings.cyclesBeforeLongBreak ?? 4).toString())

  useEffect(() => {
    setWorkDurationInput(settings.workDuration.toString())
  }, [settings.workDuration])

  useEffect(() => {
    setBreakDurationInput(settings.breakDuration.toString())
  }, [settings.breakDuration])

  useEffect(() => {
    setLongBreakDurationInput(settings.longBreakDuration.toString())
  }, [settings.longBreakDuration])

  useEffect(() => {
    setCyclesInput((settings.cyclesBeforeLongBreak ?? 4).toString())
  }, [settings.cyclesBeforeLongBreak])

  const updateSetting = <K extends keyof SettingsConfig>(
    key: K,
    value: SettingsConfig[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const handleWorkDurationChange = (value: string) => {
    setWorkDurationInput(value)
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 120) {
      updateSetting('workDuration', numValue)
    }
  }

  const handleBreakDurationChange = (value: string) => {
    setBreakDurationInput(value)
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 60) {
      updateSetting('breakDuration', numValue)
    }
  }

  const handleLongBreakDurationChange = (value: string) => {
    setLongBreakDurationInput(value)
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 60) {
      updateSetting('longBreakDuration', numValue)
    }
  }

  const handleCyclesChange = (value: string) => {
    setCyclesInput(value)
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      updateSetting('cyclesBeforeLongBreak', numValue)
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-calm-600 dark:text-peaceful-300 mb-1">
        Tiempos
      </h3>
      <div className="flex flex-row justify-between items-center gap-2">
        <label htmlFor="work-duration" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
          Duración de concentración (min.)
        </label>
        <input
          id="work-duration"
          type="number"
          min="1"
          max="120"
          value={workDurationInput}
          onChange={(e) => handleWorkDurationChange(e.target.value)}
          onBlur={(e) => {
            const numValue = parseInt(e.target.value)
            if (isNaN(numValue) || numValue < 1) {
              setWorkDurationInput(settings.workDuration.toString())
            }
          }}
          className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-center text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
        />
      </div>

      <div className="flex flex-row justify-between items-center gap-2">
        <label htmlFor="break-duration" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
          Duración de descanso corto (min.)
        </label>
        <input
          id="break-duration"
          type="number"
          min="1"
          max="60"
          value={breakDurationInput}
          onChange={(e) => handleBreakDurationChange(e.target.value)}
          onBlur={(e) => {
            const numValue = parseInt(e.target.value)
            if (isNaN(numValue) || numValue < 1) {
              setBreakDurationInput(settings.breakDuration.toString())
            }
          }}
          className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-center text-base text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
        />
      </div>

      <div className="flex flex-row justify-between items-center gap-2">
        <label htmlFor="long-break-duration" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
          Duración de descanso largo (min.)
        </label>
        <input
          id="long-break-duration"
          type="number"
          min="1"
          max="60"
          value={longBreakDurationInput}
          onChange={(e) => handleLongBreakDurationChange(e.target.value)}
          onBlur={(e) => {
            const numValue = parseInt(e.target.value)
            if (isNaN(numValue) || numValue < 1) {
              setLongBreakDurationInput(settings.longBreakDuration.toString())
            }
          }}
          className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-calm-800 dark:text-peaceful-100 bg-white text-center dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
        />
      </div>

      <div className="flex flex-row justify-between items-center gap-2">
        <label htmlFor="cycles-before-long-break" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
          Ciclos antes del descanso largo
        </label>
        <input
          id="cycles-before-long-break"
          type="number"
          min="1"
          max="10"
          value={cyclesInput}
          onChange={(e) => handleCyclesChange(e.target.value)}
          onBlur={(e) => {
            const numValue = parseInt(e.target.value)
            if (isNaN(numValue) || numValue < 1) {
              setCyclesInput((settings.cyclesBeforeLongBreak ?? 4).toString())
            }
          }}
          className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-calm-800 dark:text-peaceful-100 bg-white text-center dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
        />
      </div>
    </section>
  )
}
