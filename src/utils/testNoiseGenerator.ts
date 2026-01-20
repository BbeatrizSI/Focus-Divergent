import { NoiseType } from '../types'

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
      } else if (type === 'brown') {
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

export const testNoiseGenerator = new TestNoiseGenerator()
