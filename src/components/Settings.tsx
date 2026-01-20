import { useState } from 'react'
import { SettingsConfig, NoiseType } from '../types'
import { HiXMark } from 'react-icons/hi2'
import TimeSettings from './settings/TimeSettings'
import AutoOptions from './settings/AutoOptions'
import NoiseSettings from './settings/NoiseSettings'

interface SettingsProps {
  settings: SettingsConfig
  onSettingsChange: (settings: SettingsConfig) => void
  workNoise: NoiseType
  breakNoise: NoiseType
  onWorkNoiseChange: (noise: NoiseType) => void
  onBreakNoiseChange: (noise: NoiseType) => void
  onClose: () => void
}

export default function Settings({
  settings,
  onSettingsChange,
  workNoise,
  breakNoise,
  onWorkNoiseChange,
  onBreakNoiseChange,
  onClose,
}: SettingsProps) {
  const [validationError, setValidationError] = useState<string | null>(null)

  const validateAndClose = () => {
    if (
      settings.workDuration < 1 || settings.workDuration > 120 ||
      settings.breakDuration < 1 || settings.breakDuration > 60 ||
      settings.longBreakDuration < 1 || settings.longBreakDuration > 60 ||
      settings.cyclesBeforeLongBreak < 1 || settings.cyclesBeforeLongBreak > 10
    ) {
      setValidationError('Por favor, verifica que todos los valores sean válidos.')
      return
    }

    setValidationError(null)
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 animate-fadeIn"
      onClick={validateAndClose}
    >
      <div 
        className="bg-white dark:bg-peaceful-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-slideUp transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-calm-200 dark:border-peaceful-700 bg-white dark:bg-peaceful-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-calm-800 dark:text-peaceful-100">
            Configuración
          </h2>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-calm-600 dark:text-peaceful-400 hover:bg-calm-100 dark:hover:bg-peaceful-700 transition-colors duration-200"
            onClick={validateAndClose}
            aria-label="Cerrar"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {validationError && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {validationError}
            </div>
          )}
          
          <TimeSettings
            settings={settings}
            onSettingsChange={onSettingsChange}
          />

          <AutoOptions
            settings={settings}
            onSettingsChange={onSettingsChange}
          />

          <NoiseSettings
            label="Ruido blanco - Concentración"
            noise={workNoise}
            onNoiseChange={onWorkNoiseChange}
          />

          <NoiseSettings
            label="Ruido blanco - Descanso"
            noise={breakNoise}
            onNoiseChange={onBreakNoiseChange}
          />
        </div>
      </div>
    </div>
  )
}
