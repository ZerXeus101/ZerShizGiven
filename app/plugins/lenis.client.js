import Lenis from 'lenis'
import { watch } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  let lenis = null
  let frameId = null

  const startLenis = () => {
    if (lenis) return
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)
  }

  const stopLenis = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
    if (frameId) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
  }

  // We need to wait for app setup to use composables
  nuxtApp.hook('app:mounted', () => {
    const { smoothScrollEnabled } = useSettings()

    if (smoothScrollEnabled.value) {
      startLenis()
    }

    watch(smoothScrollEnabled, (enabled) => {
      if (enabled) {
        startLenis()
      } else {
        stopLenis()
      }
    })
  })

  return {
    provide: {
      getLenis: () => lenis
    }
  }
})
