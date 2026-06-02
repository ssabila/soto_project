/**
 * useSectionTransition.js
 *
 * Custom hook yang dipasang di dalam section TUJUAN.
 * Secara otomatis mencari section "from" di DOM, lalu membuat
 * ScrollTrigger yang menjalankan animasi transisi yang sesuai
 * tepat saat scroll melewati section sebelumnya.
 *
 * Cara kerja:
 *   1. Ambil TRANSITIONS entry dengan { to: sectionName }
 *   2. Cari elemen [data-section="{from}"] di DOM
 *   3. Buat ScrollTrigger di elemen tersebut
 *   4. Saat onLeave → panggil handler dari HANDLERS map
 *
 * @example
 *   // Di dalam JourneySection:
 *   const transitionRef = useSectionTransition('journey', 600)
 *   // → liquidSplash dijalankan saat scroll melewati section "question"
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HANDLERS, TRANSITIONS } from '../transitions/transitionconfig'

gsap.registerPlugin(ScrollTrigger)

/**
 * @param {string} sectionName  — nilai data-section section INI (tujuan transisi)
 * @param {number} [delay=400]  — delay ms sebelum ScrollTrigger dibuat.
 *                                Naikkan ke 600-800 jika section "from" adalah
 *                                pinned section (pakai ScrollTrigger pin:true).
 * @returns {React.RefObject}   — ref yang bisa disambungkan ke elemen <section>
 */
export function useSectionTransition(sectionName, delay = 400, options = {}) {
  const { autoScroll = true } = options 
  const sectionRef = useRef(null)

  useEffect(() => {
    let trigger     = null
    let isAnimating = false
    let fired       = false
    let selfEl      = null

    const init = (el) => {
      const def = TRANSITIONS.find((t) => t.to === sectionName)
      if (!def) {
        if (el) gsap.set(el, { opacity: 1, visibility: 'visible' })
        return
      }

      const handler = HANDLERS[def.type]
      if (!handler) return

      const fromEl =
        document.querySelector(`[data-section="${def.from}"]`) ||
        document.getElementById(def.from)

      if (!fromEl) {
        if (el) gsap.set(el, { opacity: 1, visibility: 'visible' })
        return
      }

      trigger = ScrollTrigger.create({
        trigger: fromEl,
        start: 'bottom 95%',
        //end: 'bottom top',
        invalidateOnRefresh: true,
        onEnter: () => {
          if (isAnimating || fired) return
          fired       = true
          isAnimating = true

          handler({
            color: def.color,
            done: () => {
              isAnimating = false

              if (el) {
                gsap.to(el, {
                  opacity:    1,
                  visibility: 'visible',
                  duration:   0.4,
                  ease:       'power2.out',
                })
              }

              if (autoScroll && el) {
                el.scrollIntoView({ behavior: 'instant' })
              }

              setTimeout(() => { fired = false }, 1200)
            },
          })
        },
      })
    }

    const timer = setTimeout(() => {
      selfEl =
        sectionRef.current ||
        document.querySelector(`[data-section="${sectionName}"]`)

      if (selfEl) {
        gsap.set(selfEl, { opacity: 0, visibility: 'hidden' })
      }

      init(selfEl)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (selfEl) gsap.set(selfEl, { opacity: 1, visibility: 'visible' })
      if (trigger) {
        try { trigger.kill() } catch (_) {}
      }
    }
  }, [sectionName, delay, autoScroll])

  return sectionRef
}
