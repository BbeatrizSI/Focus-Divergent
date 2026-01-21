/**
 * Genera y reproduce sonidos de notificación para cambios de fase
 */

// Generar un tono suave usando Web Audio API
function generateTone(frequency: number, duration: number, type: 'sine' | 'triangle' = 'sine'): AudioBuffer {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const sampleRate = audioContext.sampleRate
  const length = sampleRate * duration
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  // Aplicar envolvente suave (fade in/out) para que sea agradable
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    // Envolvente: fade in rápido, fade out suave
    const fadeIn = Math.min(1, t * 20) // Fade in en 0.05s
    const fadeOut = Math.max(0, 1 - (t - (duration - 0.1)) * 10) // Fade out en 0.1s
    const envelope = Math.min(fadeIn, fadeOut)
    
    let sample = 0
    if (type === 'sine') {
      sample = Math.sin(2 * Math.PI * frequency * t)
    } else {
      // Triangle wave (más suave que square)
      sample = 2 * Math.abs(2 * ((t * frequency) % 1) - 1) - 1
    }
    
    data[i] = sample * envelope * 0.3 // Volumen suave
  }

  return buffer
}

// Sonido para inicio de trabajo: tono más alto y energético
export function playWorkStartSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Crear dos tonos superpuestos para un sonido más rico
    const tone1 = generateTone(800, 0.15, 'sine') // Tono principal
    const tone2 = generateTone(1000, 0.12, 'sine') // Tono secundario más agudo
    
    const source1 = audioContext.createBufferSource()
    const source2 = audioContext.createBufferSource()
    const gainNode = audioContext.createGain()
    
    source1.buffer = tone1
    source2.buffer = tone2
    
    // Ajustar volumen del segundo tono para que sea más sutil
    const gainNode2 = audioContext.createGain()
    gainNode2.gain.value = 0.5
    source2.connect(gainNode2)
    gainNode2.connect(gainNode)
    
    source1.connect(gainNode)
    gainNode.connect(audioContext.destination)
    gainNode.gain.value = 0.4 // Volumen general suave
    
    source1.start(0)
    source2.start(0.02) // Ligeramente desplazado para efecto más rico
  } catch (error) {
    // Silenciar errores si el audio no está disponible
    console.warn('No se pudo reproducir el sonido de inicio de trabajo:', error)
  }
}

// Sonido para inicio de descanso: tono más bajo y relajante
export function playBreakStartSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Tono más bajo y relajante
    const tone1 = generateTone(600, 0.2, 'sine') // Tono principal más grave
    const tone2 = generateTone(750, 0.18, 'sine') // Tono secundario
    
    const source1 = audioContext.createBufferSource()
    const source2 = audioContext.createBufferSource()
    const gainNode = audioContext.createGain()
    
    source1.buffer = tone1
    source2.buffer = tone2
    
    const gainNode2 = audioContext.createGain()
    gainNode2.gain.value = 0.4
    source2.connect(gainNode2)
    gainNode2.connect(gainNode)
    
    source1.connect(gainNode)
    gainNode.connect(audioContext.destination)
    gainNode.gain.value = 0.35 // Volumen ligeramente más bajo para descanso
    
    source1.start(0)
    source2.start(0.03) // Desplazamiento ligeramente mayor para efecto más suave
  } catch (error) {
    // Silenciar errores si el audio no está disponible
    console.warn('No se pudo reproducir el sonido de inicio de descanso:', error)
  }
}
