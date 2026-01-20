import { useEffect, useRef } from 'react'
import { NoiseType } from '../types'
import { HiSpeakerWave } from 'react-icons/hi2'

interface WhiteNoisePlayerProps {
  noiseType: NoiseType
  isActive: boolean
}

// Generador de ruido blanco usando Web Audio API
class NoiseGenerator {
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
    const duration = 2 // 2 segundos de buffer
    const length = sampleRate * duration
    const buffer = new Float32Array(length)

    // Para ruido rosa y marrón necesitamos mantener estado
    let pinkState = [0, 0, 0, 0, 0]
    let brownPrev = 0

    for (let i = 0; i < length; i++) {
      let noise = Math.random() * 2 - 1

      // Aplicar filtrado según el tipo
      switch (type) {
        case 'pink': {
          // Ruido rosa: filtro Voss-McCartney simplificado
          pinkState[0] = pinkState[0] * 0.997 + noise * 0.03
          pinkState[1] = pinkState[1] * 0.998 + noise * 0.02
          pinkState[2] = pinkState[2] * 0.999 + noise * 0.01
          noise = pinkState[0] + pinkState[1] + pinkState[2] + noise * 0.2
          noise = Math.max(-1, Math.min(1, noise)) // Clipping
          break
        }
        case 'brown': {
          // Ruido marrón: integración de ruido blanco (red noise)
          brownPrev = brownPrev * 0.99 + noise * 0.14
          noise = brownPrev
          noise = Math.max(-1, Math.min(1, noise)) // Clipping
          break
        }
        case 'blue': {
          // Ruido azul: enfatiza frecuencias altas (el filtro se aplicará después)
          // Aquí solo generamos ruido blanco, el filtro highpass se encargará
          break
        }
        case 'violet': {
          // Ruido violeta: enfatiza frecuencias muy altas (el filtro se aplicará después)
          // Aquí solo generamos ruido blanco, el filtro highpass se encargará
          break
        }
        case 'grey': {
          // Ruido gris: similar al blanco pero se ajustará con filtro EQ
          break
        }
        case 'green': {
          // Ruido verde: centrado en frecuencias medias (el filtro se encargará)
          break
        }
        case 'red': {
          // Ruido rojo: muy similar al brown, incluso más grave
          brownPrev = brownPrev * 0.98 + noise * 0.16
          noise = brownPrev
          noise = Math.max(-1, Math.min(1, noise))
          break
        }
        default:
          // Ruido blanco: sin filtrado
          break
      }

      buffer[i] = noise
    }

    return buffer
  }

  async play(type: NoiseType, volume: number = 0.3) {
    if (!this.audioContext) {
      await this.init()
    }

    if (!this.audioContext) return

    // Detener sonido anterior si existe
    this.stop()

    // Crear buffer de audio
    const buffer = this.audioContext.createBuffer(1, 44100 * 2, 44100)
    const noiseData = this.generateNoise(type)

    const channelData = buffer.getChannelData(0)
    channelData.set(noiseData)

    // Crear nodos
    this.source = this.audioContext.createBufferSource()
    this.gainNode = this.audioContext.createGain()
    this.filterNode = this.audioContext.createBiquadFilter()

    // Configurar filtro según tipo (para refinar el sonido)
    if (type === 'pink') {
      this.filterNode.type = 'lowpass'
      this.filterNode.frequency.value = 12000
      this.filterNode.Q.value = 0.5
    } else if (type === 'brown') {
      this.filterNode.type = 'lowpass'
      this.filterNode.frequency.value = 6000
      this.filterNode.Q.value = 0.5
    } else if (type === 'blue') {
      this.filterNode.type = 'highpass'
      this.filterNode.frequency.value = 800
      this.filterNode.Q.value = 1.0
    } else if (type === 'violet') {
      this.filterNode.type = 'highpass'
      this.filterNode.frequency.value = 1500
      this.filterNode.Q.value = 1.5
    } else if (type === 'grey') {
      // Ruido gris: filtro bandpass para centrarlo en frecuencias medias-humanas
      this.filterNode.type = 'peaking'
      this.filterNode.frequency.value = 2000
      this.filterNode.Q.value = 1.0
      this.filterNode.gain.value = 2
    } else if (type === 'green') {
      // Ruido verde: bandpass en frecuencias medias
      this.filterNode.type = 'bandpass'
      this.filterNode.frequency.value = 1500
      this.filterNode.Q.value = 2.0
    } else if (type === 'red') {
      // Ruido rojo: incluso más grave que brown
      this.filterNode.type = 'lowpass'
      this.filterNode.frequency.value = 4000
      this.filterNode.Q.value = 0.5
    } else {
      // Ruido blanco: sin filtro (flat)
      this.filterNode.type = 'allpass'
    }

    // Conectar nodos
    this.source.buffer = buffer
    this.source.loop = true
    this.gainNode.gain.value = volume
    this.source.connect(this.filterNode)
    this.filterNode.connect(this.gainNode)
    this.gainNode.connect(this.audioContext.destination)

    // Iniciar reproducción
    this.source.start(0)
  }

  stop() {
    if (this.source) {
      this.source.stop()
      this.source = null
    }
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = volume
    }
  }
}

const noiseGenerator = new NoiseGenerator()

export default function WhiteNoisePlayer({ noiseType, isActive }: WhiteNoisePlayerProps) {
  const isPlayingRef = useRef(false)
  const currentNoiseRef = useRef<NoiseType>('none')
  const wasActiveRef = useRef(false)

  useEffect(() => {
    if (noiseType === 'none') {
      noiseGenerator.stop()
      isPlayingRef.current = false
      currentNoiseRef.current = 'none'
      wasActiveRef.current = false
      return
    }

    // Si se activa y no estaba activo antes, o si cambia el tipo de ruido
    if (isActive) {
      if (!wasActiveRef.current || noiseType !== currentNoiseRef.current) {
        noiseGenerator.stop()
        noiseGenerator.play(noiseType, 0.2).catch(console.error)
        isPlayingRef.current = true
        currentNoiseRef.current = noiseType
      }
      wasActiveRef.current = true
    } else {
      // Si se desactiva, detener el ruido
      if (wasActiveRef.current) {
        noiseGenerator.stop()
        isPlayingRef.current = false
        wasActiveRef.current = false
      }
    }
  }, [noiseType, isActive])

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      noiseGenerator.stop()
    }
  }, [])

  if (noiseType === 'none' || !isActive) {
    return null
  }

  const getNoiseName = (type: NoiseType): string => {
    switch (type) {
      case 'white':
        return 'Ruido Blanco'
      case 'pink':
        return 'Ruido Rosa'
      case 'brown':
        return 'Ruido Marrón'
      case 'blue':
        return 'Ruido Azul'
      case 'violet':
        return 'Ruido Violeta'
      case 'grey':
        return 'Ruido Gris'
      case 'green':
        return 'Ruido Verde'
      case 'red':
        return 'Ruido Rojo'
      default:
        return ''
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-peaceful-800 rounded-2xl shadow-md w-full max-w-lg transition-colors duration-200">
      <div className="flex items-center justify-center gap-3 p-2">
        <HiSpeakerWave className="w-6 h-6 text-calm-600 dark:text-peaceful-300 animate-pulse" />
        <span className="text-base text-calm-800 dark:text-peaceful-100 font-medium">
          {getNoiseName(noiseType)}
        </span>
      </div>
    </div>
  )
}
