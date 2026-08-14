<template>
  <div class="relative" ref="el">
    <button 
      @click="isOpen = !isOpen"
      class="p-2 rounded-full renaissance-border glass-panel hover:bg-gold/10 dark:hover:bg-muted-gold/10 transition-colors flex items-center justify-center w-10 h-10 dark:!border-none dark:!shadow-none text-ink dark:text-offwhite"
      aria-label="Settings"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>

    <!-- Dropdown Panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div 
        v-if="isOpen" 
        class="absolute right-0 top-14 w-64 p-4 glass-panel renaissance-border rounded-xl shadow-2xl z-[100] text-ink dark:text-offwhite dark:bg-charcoal/90"
      >
        <h3 class="font-serif text-lg mb-4 border-b border-gold/30 dark:border-muted-gold/30 pb-2">Settings</h3>
        
        <div class="space-y-4">
          <!-- Animations Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-sm font-serif">3D Animations</span>
              <span class="block text-xs opacity-60">WebGl objects & particles</span>
            </div>
            <ClientOnly>
              <button 
                @click="animationsEnabled = !animationsEnabled"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
                :class="animationsEnabled ? 'bg-gold dark:bg-muted-gold' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
                  :class="animationsEnabled ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </ClientOnly>
          </div>

          <!-- Smooth Scroll Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-sm font-serif">Smooth Scroll</span>
              <span class="block text-xs opacity-60">Momentum scrolling</span>
            </div>
            <ClientOnly>
              <button 
                @click="smoothScrollEnabled = !smoothScrollEnabled"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
                :class="smoothScrollEnabled ? 'bg-gold dark:bg-muted-gold' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
                  :class="smoothScrollEnabled ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </ClientOnly>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)

// Use our composable to sync state across the app
const { animationsEnabled, smoothScrollEnabled } = useSettings()

// Close dropdown when clicking outside
const el = ref(null)
onClickOutside(el, () => {
  isOpen.value = false
})
</script>
