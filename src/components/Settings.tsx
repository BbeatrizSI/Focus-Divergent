import { useState, useEffect } from 'react'
import { SettingsConfig, NoiseType } from '../App'
import { HiXMark, HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'

interface SettingsProps {
  settings: SettingsConfig
  onSettingsChange: (settings: SettingsConfig) => void
  workNoise: NoiseType
  breakNoise: NoiseType
  onWorkNoiseChange: (noise: NoiseType) => void
  onBreakNoiseChange: (noise: NoiseType) => void
  onClose: () => void
}

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

// Generador de ruido simplificado para pruebas en Settings
class TestNoiseGenerator {
  private audioContext: AudioContext | null = null
  private source: AudioBufferSourceNode | null = null
  private gainNode: GainNode | null = null
  private filterNode: BiquadFilterNode | null = null

  async init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  generateNoise(type: NoiseType): Float32Array {
    const sampleRate = 44100
    const duration = 2
    const length = sampleRate * duration
    const buffer = new Float32Array(length)
    let pinkState = [0, 0, 0, 0, 0]
    let brownPrev = 0

    for (let i = 0; i < length; i++) {
      let noise = Math.random() * 2 - 1
      if (type === 'pink') {
        pinkState[0] = pinkState[0] * 0.997 + noise * 0.03
        pinkState[1] = pinkState[1] * 0.998 + noise * 0.02
        pinkState[2] = pinkState[2] * 0.999 + noise * 0.01
        noise = pinkState[0] + pinkState[1] + pinkState[2] + noise * 0.2
        noise = Math.max(-1, Math.min(1, noise))
      } else       if (type === 'brown') {
        brownPrev = brownPrev * 0.99 + noise * 0.14
        noise = brownPrev
        noise = Math.max(-1, Math.min(1, noise))
      } else if (type === 'red') {
        brownPrev = brownPrev * 0.98 + noise * 0.16
        noise = brownPrev
        noise = Math.max(-1, Math.min(1, noise))
      }
      buffer[i] = noise
    }
    return buffer
  }

  async play(type: NoiseType, volume: number = 0.2) {
    if (type === 'none') {
      this.stop()
      return
    }
    if (!this.audioContext) await this.init()
    if (!this.audioContext) return

    this.stop()
    const buffer = this.audioContext.createBuffer(1, 44100 * 2, 44100)
    const noiseData = this.generateNoise(type)
    if (type === 'brown' || type === 'red') {
      let prev = 0
      const factor = type === 'red' ? 0.98 : 0.99
      for (let i = 0; i < noiseData.length; i++) {
        const white = Math.random() * 2 - 1
        prev = prev * factor + white * (type === 'red' ? 0.12 : 0.1)
        noiseData[i] = prev
      }
    }
    const channelData = buffer.getChannelData(0)
    channelData.set(noiseData)

    this.source = this.audioContext.createBufferSource()
    this.gainNode = this.audioContext.createGain()
    this.filterNode = this.audioContext.createBiquadFilter()

    if (type === 'pink') {
      this.filterNode.type = 'lowpass'
      this.filterNode.frequency.value = 12000
    } else if (type === 'brown') {
      this.filterNode.type = 'lowpass'
      this.filterNode.frequency.value = 6000
    } else if (type === 'blue') {
      this.filterNode.type = 'highpass'
      this.filterNode.frequency.value = 800
    } else if (type === 'violet') {
      this.filterNode.type = 'highpass'
      this.filterNode.frequency.value = 1500
    } else if (type === 'grey') {
      this.filterNode.type = 'peaking'
      this.filterNode.frequency.value = 2000
      this.filterNode.Q.value = 1.0
      this.filterNode.gain.value = 2
    } else if (type === 'green') {
      this.filterNode.type = 'bandpass'
      this.filterNode.frequency.value = 1500
      this.filterNode.Q.value = 2.0
    } else if (type === 'red') {
      this.filterNode.type = 'lowpass'
      this.filterNode.frequency.value = 4000
      this.filterNode.Q.value = 0.5
    }

    this.source.buffer = buffer
    this.source.loop = true
    this.gainNode.gain.value = volume
    this.source.connect(this.filterNode)
    this.filterNode.connect(this.gainNode)
    this.gainNode.connect(this.audioContext.destination)
    this.source.start(0)
  }

  stop() {
    if (this.source) {
      this.source.stop()
      this.source = null
    }
  }
}

const testNoiseGenerator = new TestNoiseGenerator()

export default function Settings({
  settings,
  onSettingsChange,
  workNoise,
  breakNoise,
  onWorkNoiseChange,
  onBreakNoiseChange,
  onClose,
}: SettingsProps) {
  const [testingWorkNoise, setTestingWorkNoise] = useState(false)
  const [testingBreakNoise, setTestingBreakNoise] = useState(false)

  const updateSetting = <K extends keyof SettingsConfig>(
    key: K,
    value: SettingsConfig[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const toggleWorkNoiseTest = async () => {
    if (testingWorkNoise) {
      testNoiseGenerator.stop()
      setTestingWorkNoise(false)
    } else {
      testNoiseGenerator.stop() // Detener cualquier otro ruido
      setTestingBreakNoise(false)
      if (workNoise !== 'none') {
        await testNoiseGenerator.play(workNoise, 0.2)
        setTestingWorkNoise(true)
      }
    }
  }

  const toggleBreakNoiseTest = async () => {
    if (testingBreakNoise) {
      testNoiseGenerator.stop()
      setTestingBreakNoise(false)
    } else {
      testNoiseGenerator.stop() // Detener cualquier otro ruido
      setTestingWorkNoise(false)
      if (breakNoise !== 'none') {
        await testNoiseGenerator.play(breakNoise, 0.2)
        setTestingBreakNoise(true)
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
    if (!testingWorkNoise && workNoise === 'none') {
      testNoiseGenerator.stop()
    }
  }, [workNoise, testingWorkNoise])

  useEffect(() => {
    if (!testingBreakNoise && breakNoise === 'none') {
      testNoiseGenerator.stop()
    }
  }, [breakNoise, testingBreakNoise])

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 animate-fadeIn"
      onClick={onClose}
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
            onClick={onClose}
            aria-label="Cerrar"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-calm-600 dark:text-peaceful-300 mb-1">
              Tiempos
            </h3>
            <div className="flex flex-row gap-2">
              <label htmlFor="work-duration" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
                Duración de concentración (min.)
              </label>
              <input
                id="work-duration"
                type="number"
                min="1"
                max="120"
                value={settings.workDuration}
                onChange={(e) =>
                  updateSetting('workDuration', parseInt(e.target.value) || 25)
                }
                className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-center text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
              />
            </div>

            <div className="flex flex-row gap-2">
              <label htmlFor="break-duration" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
                Duración de descanso corto (min.)
              </label>
              <input
                id="break-duration"
                type="number"
                min="1"
                max="60"
                value={settings.breakDuration}
                onChange={(e) =>
                  updateSetting('breakDuration', parseInt(e.target.value) || 5)
                }
                className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-center text-base text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
              />
            </div>

            <div className="flex flex-row gap-2">
              <label htmlFor="long-break-duration" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
                Duración de descanso largo (min.)
              </label>
              <input
                id="long-break-duration"
                type="number"
                min="1"
                max="60"
                value={settings.longBreakDuration}
                onChange={(e) =>
                  updateSetting(
                    'longBreakDuration',
                    parseInt(e.target.value) || 15
                  )
                }
                className="px-3 py-2 w-16 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-calm-800 dark:text-peaceful-100 bg-white text-center dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
              />
            </div>
          </section>

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
                    Iniciar pomodoros automáticamente
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-calm-600 dark:text-peaceful-300 mb-1">
              Ruido blanco - Concentración
            </h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="work-noise" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
                Tipo de ruido en la concentración
              </label>
              <div className="flex gap-2 items-center w-full">
                <select
                  id="work-noise"
                  value={workNoise}
                  onChange={(e) => onWorkNoiseChange(e.target.value as NoiseType)}
                  className="flex-0 px-0 py-2 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
                >
                  {noiseTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
                <button
                  onClick={toggleWorkNoiseTest}
                  disabled={workNoise === 'none'}
                  className="p-2 rounded-lg border-2 border-calm-200 dark:border-peaceful-600 bg-white dark:bg-peaceful-700 hover:bg-calm-100 dark:hover:bg-peaceful-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                  aria-label={testingWorkNoise ? 'Detener prueba de ruido' : 'Probar ruido'}
                >
                  {testingWorkNoise ? (
                    <HiSpeakerXMark className="w-5 h-5 text-calm-600 dark:text-peaceful-300" />
                  ) : (
                    <HiSpeakerWave className="w-5 h-5 text-calm-600 dark:text-peaceful-300" />
                  )}
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-calm-600 dark:text-peaceful-300 mb-1">
              Ruido blanco - Descanso
            </h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="break-noise" className="text-base font-medium text-calm-800 dark:text-peaceful-100">
                Tipo de ruido en el descanso
              </label>
              <div className="flex gap-2 items-center">
                <select
                  id="break-noise"
                  value={breakNoise}
                  onChange={(e) => onBreakNoiseChange(e.target.value as NoiseType)}
                  className="flex-1 px-0 py-2 border-2 border-calm-200 dark:border-peaceful-600 rounded-lg text-base text-calm-800 dark:text-peaceful-100 bg-white dark:bg-peaceful-700 focus:outline-none focus:border-calm-500 dark:focus:border-peaceful-400 focus:ring-4 focus:ring-calm-500/10 dark:focus:ring-peaceful-400/10 transition-colors duration-200"
                >
                  {noiseTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
                <button
                  onClick={toggleBreakNoiseTest}
                  disabled={breakNoise === 'none'}
                  className="p-2 rounded-lg border-2 border-calm-200 dark:border-peaceful-600 bg-white dark:bg-peaceful-700 hover:bg-calm-100 dark:hover:bg-peaceful-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                  aria-label={testingBreakNoise ? 'Detener prueba de ruido' : 'Probar ruido'}
                >
                  {testingBreakNoise ? (
                    <HiSpeakerXMark className="w-5 h-5 text-calm-600 dark:text-peaceful-300" />
                  ) : (
                    <HiSpeakerWave className="w-5 h-5 text-calm-600 dark:text-peaceful-300" />
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
