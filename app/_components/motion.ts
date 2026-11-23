// Shared motion runtime: one lazy GSAP load and one device profile for the whole page.

type DeviceNavigator = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }

export type MotionLevel = 'full' | 'simple' | 'static'

let gsapPromise: Promise<{ gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }> | null = null
let constrainedPromise: Promise<boolean> | null = null

// Dynamic import keeps GSAP out of the initial rendering path.
export function loadGsap() {
  gsapPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger)
    // Mobile URL bars resize the viewport on every scroll direction change; don't recompute for that.
    ScrollTrigger.config({ ignoreMobileResize: true })
    return { gsap, ScrollTrigger }
  })
  return gsapPromise
}

/**
 * Detects devices that should get the lighter choreography: data saver, low memory/cores,
 * or a main thread that can't hold ~35fps while the page settles.
 */
export function isConstrained() {
  constrainedPromise ??= new Promise<boolean>((resolve) => {
    const device = navigator as DeviceNavigator
    if (device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 2) || (device.hardwareConcurrency && device.hardwareConcurrency <= 2)) {
      resolve(true)
      return
    }
    const frames: number[] = []
    let last = performance.now()
    const sample = (now: number) => {
      frames.push(now - last)
      last = now
      if (frames.length < 40) requestAnimationFrame(sample)
      else {
        // Ignore the first frames (hydration / font swap) and use the median of the rest.
        const sorted = frames.slice(8).sort((a, b) => a - b)
        resolve(sorted[Math.floor(sorted.length / 2)] > 28)
      }
    }
    requestAnimationFrame(sample)
    // Background tabs don't paint; don't hold the experience hostage to that.
    setTimeout(() => { if (frames.length < 40) resolve(false) }, 2000)
  })
  return constrainedPromise
}

export const MEDIA = {
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(prefers-reduced-motion: no-preference) and (min-width: 960px) and (min-height: 600px) and (pointer: fine)',
  motion: '(prefers-reduced-motion: no-preference)',
}
