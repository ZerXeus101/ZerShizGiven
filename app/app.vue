<template>
  <div class="min-h-screen relative overflow-hidden">
    <ClientOnly>
      <LiquidScrollbar />
    </ClientOnly>
    
    <!-- Dynamic Parallax Background Layer -->
    <div 
      class="fixed inset-0 z-0"
      :style="{
        backgroundImage: `url('/backgrounds/Rebirth.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${scrollProgress * 100}%`
      }"
    ></div>
    
    <!-- Depth Overlay Layer -->
    <div class="fixed inset-0 z-0 bg-parchment/20 dark:bg-black/50 backdrop-blur-sm pointer-events-none"></div>

    <!-- Background 3D Elements -->
    <ClientOnly>
      <Background3D v-if="animationsEnabled" />
    </ClientOnly>

    <!-- Floating 3D Title (Top Left) -->
    <h1 class="absolute top-6 left-6 md:top-10 md:left-10 z-50 text-3xl md:text-5xl text-gold dark:text-muted-gold pointer-events-none select-none flex">
      <span 
        v-for="(letter, i) in 'ZerShizGiven'" 
        :key="i" 
        class="inline-block title-entrance"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        {{ letter }}
      </span>
    </h1>

    <!-- Floating Controls (Top Right) -->
    <div class="fixed top-6 right-6 md:top-10 md:right-10 z-50 flex items-center space-x-2">
      <SettingsMenu />
      <ThemeToggle />
    </div>

    <!-- Main Content Area -->
    <main class="max-w-4xl mx-auto p-6 min-h-[calc(100vh-100px)] pt-24 md:pt-32 relative z-10">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="text-center p-4 text-xs opacity-50 font-serif relative z-10 text-ink dark:text-offwhite pb-6">
      &copy; 2026 ZerXeus
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { animationsEnabled } = useSettings()

const { y } = useWindowScroll()
const { height: windowHeight } = useWindowSize()
const docHeight = ref(0)

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
</script>
