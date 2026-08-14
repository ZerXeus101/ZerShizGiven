<template>
  <div class="fixed top-2 bottom-2 right-1 w-1.5 z-[100] pointer-events-none">
    <!-- Wrapper for INSTANT translation -->
    <div 
      class="absolute top-0 left-0 w-full"
      :style="{
        height: `${thumbHeight}px`,
        transform: `translateY(${scrollProgress * (windowHeight - 16 - thumbHeight)}px)`
      }"
    >
      <!-- Inner for TRANSITIONED scale -->
      <div 
        class="bg-gold dark:bg-muted-gold rounded-full w-full h-full shadow-[0_0_10px_rgba(212,175,55,0.5)] ease-out"
        style="transition: transform 100ms;"
        :style="{
          transform: `scaleY(${stretch})`,
          transformOrigin: stretchOrigin
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { y } = useWindowScroll()
const { height: windowHeight } = useWindowSize()

const docHeight = ref(0)
const thumbHeight = ref(80) // base height
const stretch = ref(1)
const stretchOrigin = ref('center')

let lastY = 0
let timeout = null

const updateHeight = () => {
  docHeight.value = document.documentElement.scrollHeight
}

let observer = null

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
  observer = new MutationObserver(updateHeight)
  observer.observe(document.body, { childList: true, subtree: true, attributes: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  if (observer) observer.disconnect()
})

const scrollProgress = computed(() => {
  const maxScroll = docHeight.value - windowHeight.value
  if (maxScroll <= 0) return 0
  return Math.max(0, Math.min(1, y.value / maxScroll))
})

watch(y, (newY) => {
  const delta = newY - lastY
  lastY = newY
  
  const velocity = Math.abs(delta)
  if (velocity > 1) {
    // Elastic stretch based on speed
    stretch.value = Math.min(3, 1 + velocity * 0.015)
    stretchOrigin.value = delta > 0 ? 'top' : 'bottom'
  } else {
    stretch.value = 1
  }
  
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    stretch.value = 1
  }, 100)
})
</script>
