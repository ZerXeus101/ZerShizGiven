<template>
  <article 
    ref="cardRef"
    class="p-6 md:p-10 renaissance-border glass-panel mb-8 group relative overflow-hidden"
    :style="{
      transform: cardTransform,
      transition: isOutside ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s linear',
      transformStyle: 'preserve-3d'
    }"
  >
    <!-- Corner Filigrees -->
    <div class="absolute inset-0 pointer-events-none opacity-40 text-gold dark:text-muted-gold" style="transform: translateZ(5px);">
      <!-- Top Left -->
      <svg class="absolute top-2 left-2 w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M10,50 C10,25 25,10 50,10 M20,40 C20,30 30,20 40,20" />
        <circle cx="15" cy="15" r="3" fill="currentColor" stroke="none" />
      </svg>
      <!-- Top Right -->
      <svg class="absolute top-2 right-2 w-12 h-12 rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M10,50 C10,25 25,10 50,10 M20,40 C20,30 30,20 40,20" />
        <circle cx="15" cy="15" r="3" fill="currentColor" stroke="none" />
      </svg>
      <!-- Bottom Right -->
      <svg class="absolute bottom-2 right-2 w-12 h-12 rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M10,50 C10,25 25,10 50,10 M20,40 C20,30 30,20 40,20" />
        <circle cx="15" cy="15" r="3" fill="currentColor" stroke="none" />
      </svg>
      <!-- Bottom Left -->
      <svg class="absolute bottom-2 left-2 w-12 h-12 -rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M10,50 C10,25 25,10 50,10 M20,40 C20,30 30,20 40,20" />
        <circle cx="15" cy="15" r="3" fill="currentColor" stroke="none" />
      </svg>
    </div>

    <!-- Copy Button (appears on hover) -->
    <button 
      @click="copyContent"
      class="absolute top-6 right-6 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 dark:bg-white/5 hover:bg-gold/20 dark:hover:bg-muted-gold/20 text-ink dark:text-offwhite cursor-pointer z-50"
      :title="copied ? 'Copied!' : 'Copy content'"
      style="transform: translateZ(20px);"
    >
      <svg v-if="!copied" xmlns="http://www.w3.org/O/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/O/svg" class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </button>

    <!-- Quote Layout -->
    <div v-if="post.type === 'quote'" class="relative" style="transform: translateZ(10px);">
      <span class="absolute -top-4 -left-4 text-6xl text-gold/20 dark:text-muted-gold/20 font-serif leading-none select-none" style="transform: translateZ(15px);">"</span>
      <blockquote class="italic text-lg md:text-xl pl-6 border-l-2 border-gold/50 dark:border-muted-gold/50 relative z-10 text-ink dark:text-offwhite">
        <div ref="contentNode">
          <ContentRenderer :value="post" class="prose dark:prose-invert max-w-none" />
        </div>
      </blockquote>

      <!-- Ornate Divider -->
      <div class="flex items-center justify-center my-6 opacity-60">
        <div class="flex-grow border-t border-gold/30 dark:border-muted-gold/30 h-px"></div>
        <svg class="w-6 h-6 mx-4 text-gold dark:text-muted-gold" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L15,12 L12,22 L9,12 Z" />
        </svg>
        <div class="flex-grow border-t border-gold/30 dark:border-muted-gold/30 h-px"></div>
      </div>

      <div v-if="post.author" class="text-right font-serif text-sm opacity-80" style="transform: translateZ(15px);">
        — {{ post.author }}
      </div>
      <div v-if="post.date" class="mt-2 text-right text-xs font-serif opacity-60 uppercase tracking-widest" style="transform: translateZ(10px);">
        {{ formatDate(post.date) }}
      </div>
    </div>
    
    <!-- Post Layout -->
    <div v-else class="post-content" style="transform: translateZ(10px);">
      <h2 class="text-3xl mb-2 text-ink dark:text-muted-gold font-decorative tracking-wide" style="transform: translateZ(20px);">{{ post.title }}</h2>
      <div class="text-xs font-serif opacity-60 uppercase tracking-widest">{{ formatDate(post.date) }}</div>
      
      <!-- Ornate Divider -->
      <div class="flex items-center justify-center my-6 opacity-60">
        <div class="flex-grow border-t border-gold/30 dark:border-muted-gold/30 h-px"></div>
        <svg class="w-6 h-6 mx-4 text-gold dark:text-muted-gold" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L15,12 L12,22 L9,12 Z" />
        </svg>
        <div class="flex-grow border-t border-gold/30 dark:border-muted-gold/30 h-px"></div>
      </div>

      <!-- Content styling with elegant drop cap for the first letter -->
      <div ref="contentNode" class="prose dark:prose-invert max-w-none font-sans text-ink dark:text-offwhite drop-cap relative z-10">
        <ContentRenderer :value="post" />
      </div>
    </div>
    
    <!-- Tags (Shared) -->
    <div v-if="post.tags && post.tags.length" class="mt-8 flex flex-wrap gap-2 relative z-10" style="transform: translateZ(15px);">
      <span v-for="tag in post.tags" :key="tag" class="text-xs font-serif px-3 py-1 rounded-full bg-sepia/5 dark:bg-offwhite/5 border border-sepia/10 dark:border-offwhite/10 opacity-70 hover:opacity-100 hover:border-gold/50 transition-colors">
        #{{ tag }}
      </span>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

const cardRef = ref(null)
const contentNode = ref(null)
const copied = ref(false)

const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(cardRef)

const cardTransform = computed(() => {
  if (isOutside.value) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  
  const maxRotation = 8
  const rX = maxRotation / 2 - (elementY.value / elementHeight.value) * maxRotation
  const rY = (elementX.value / elementWidth.value) * maxRotation - maxRotation / 2
  
  return `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-5px)`
})

const copyContent = async () => {
  if (!contentNode.value) return
  
  try {
    const textToCopy = contentNode.value.innerText
    await navigator.clipboard.writeText(textToCopy)
    copied.value = true
    
    // Reset icon after 2 seconds
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date)
}
</script>
