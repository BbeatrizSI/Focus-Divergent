import { SettingsConfig } from '../../types'

interface AutoOptionsProps {
  settings: SettingsConfig
  onSettingsChange: (settings: SettingsConfig) => void
}

export default function AutoOptions({ settings, onSettingsChange }: AutoOptionsProps) {
  const updateSetting = <K extends keyof SettingsConfig>(
    key: K,
    value: SettingsConfig[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-calm-600 dark:text-peaceful-300 mb-1">
        Opciones automáticas
      </h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoStartBreaks}
              onChange={(e) =>
                updateSetting('autoStartBreaks', e.target.checked)
              }
              className="w-5 h-5 cursor-pointer accent-calm-500 dark:accent-peaceful-400"
            />
            <span className="text-base text-[15px] text-calm-800 dark:text-peaceful-100">
              Iniciar descansos automáticamente
            </span>
          </label>
        </div>

        <div className="flex items-center mt-2 gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoStartPomodoros}
              onChange={(e) =>
                updateSetting('autoStartPomodoros', e.target.checked)
              }
              className="w-5 h-5 cursor-pointer accent-calm-500 dark:accent-peaceful-400"
            />
            <span className="text-base text-[15px] text-calm-800 dark:text-peaceful-100">
              Iniciar concentración automáticamente
            </span>
          </label>
        </div>
      </div>
    </section>
  )
}
