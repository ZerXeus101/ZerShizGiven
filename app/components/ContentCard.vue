<template>
  <article 
    ref="cardRef"
    class="p-6 md:p-8 renaissance-border glass-panel mb-8 group relative"
    :style="{
      transform: cardTransform,
      transition: isOutside ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s linear',
      transformStyle: 'preserve-3d'
    }"
  >
    
    <!-- Copy Button (appears on hover) -->
    <button 
      @click="copyContent"
      class="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 dark:bg-white/5 hover:bg-gold/20 dark:hover:bg-muted-gold/20 text-ink dark:text-offwhite cursor-pointer"
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
      <div v-if="post.author" class="mt-4 text-right font-serif text-sm opacity-80" style="transform: translateZ(15px);">
        — {{ post.author }}
      </div>
      <div v-if="post.date" class="mt-2 text-right text-xs font-serif opacity-60 uppercase tracking-widest" style="transform: translateZ(10px);">
        {{ formatDate(post.date) }}
      </div>
    </div>
    
    <!-- Post Layout -->
    <div v-else class="post-content" style="transform: translateZ(10px);">
      <h2 class="text-2xl mb-2 text-ink dark:text-muted-gold font-bold" style="transform: translateZ(20px);">{{ post.title }}</h2>
      <div class="text-xs font-serif opacity-60 mb-6 uppercase tracking-widest">{{ formatDate(post.date) }}</div>
      
      <!-- Content styling with a drop cap for the first letter -->
      <div ref="contentNode" class="prose dark:prose-invert max-w-none font-sans text-ink dark:text-offwhite prose-p:first-of-type:first-letter:text-5xl prose-p:first-of-type:first-letter:font-serif prose-p:first-of-type:first-letter:text-ink dark:prose-p:first-of-type:first-letter:text-muted-gold prose-p:first-of-type:first-letter:mr-2 prose-p:first-of-type:first-letter:float-left">
        <ContentRenderer :value="post" />
      </div>
    </div>
    
    <!-- Tags (Shared) -->
    <div v-if="post.tags && post.tags.length" class="mt-6 flex flex-wrap gap-2" style="transform: translateZ(15px);">
      <span v-for="tag in post.tags" :key="tag" class="text-xs font-serif px-3 py-1 rounded-full bg-sepia/5 dark:bg-offwhite/5 border border-sepia/10 dark:border-offwhite/10 opacity-70">
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
