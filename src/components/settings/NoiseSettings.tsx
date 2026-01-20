import { useState, useEffect } from 'react'
import { NoiseType } from '../../types'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { testNoiseGenerator } from '../../utils/testNoiseGenerator'

const noiseTypes: { value: NoiseType; label: string; description: string }[] = [
  { value: 'none', label: 'Ninguno', description: 'Sin sonido' },
  { value: 'white', label: 'Blanco', description: 'Sonido plano y uniforme' },
  { value: 'pink', label: 'Rosa', description: 'Más suave y natural' },
  { value: 'brown', label: 'Marrón', description: 'Grave y relajante' },
  { value: 'blue', label: 'Azul', description: 'Más agudo y energizante' },
  { value: 'violet', label: 'Violeta', description: 'Muy agudo' },
  { value: 'grey', label: 'Gris', description: 'Ajustado a percepción humana' },
  { value: 'green', label: 'Verde', description: 'Frecuencias medias naturales' },
  { value: 'red', label: 'Rojo', description: 'Similar al marrón, muy grave' },
]

interface NoiseSettingsProps {
  label: string
  noise: NoiseType
  onNoiseChange: (noise: NoiseType) => void
}

export default function NoiseSettings({ label, noise, onNoiseChange }: NoiseSettingsProps) {
  const [testing, setTesting] = useState(false)

  const toggleTest = async () => {
    if (testing) {
      testNoiseGenerator.stop()
      setTesting(false)
    } else {
      testNoiseGenerator.stop()
      if (noise !== 'none') {
        await testNoiseGenerator.play(noise, 0.2)
        setTesting(true)
      }
    }
  }

  // Limpiar al cerrar o desmontar
  useEffect(() => {
    return () => {
      testNoiseGenerator.stop()
    }
  }, [])

  useEffect(() => {
    if (!testing && noise === 'none') {
      testNoiseGenerator.stop()
    }
  }, [noise, testing])

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-calm-600 dark:text-peaceful-300 mb-1">
        {label}
      </h3>
      <div className="flex flex-col gap-2">
        <label htmlFor={`noise-${label}`} className="text-base font-medium text-calm-800 dark:text-peaceful-100">
          Tipo de ruido
        </label>
        <div className="flex gap-2 items-center justify-between">
          <select
            id={`noise-${label}`}
            value={noise}
            onChange={(e) => onNoiseChange(e.target.value as NoiseType)}
            className="flex-1 max-w-[85%] px-3 py-2 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
          >
            {noiseTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label} - {type.description}
              </option>
            ))}
          </select>
          <button
            onClick={toggleTest}
            disabled={noise === 'none'}
            className="p-2 rounded-lg border-2 border-calm-200 dark:border-peaceful-600 bg-white dark:bg-peaceful-700 hover:bg-calm-100 dark:hover:bg-peaceful-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            aria-label={testing ? 'Detener prueba de ruido' : 'Probar ruido'}
          >
            {testing ? (
              <HiSpeakerXMark className="w-5 h-5 text-calm-600 dark:text-peaceful-300" />
            ) : (
              <HiSpeakerWave className="w-5 h-5 text-calm-600 dark:text-peaceful-300" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
