<template>
  <article class="p-6 md:p-8 renaissance-border glass-panel mb-8 group transition-transform duration-300 hover:-translate-y-1">
    
    <!-- Quote Layout -->
    <div v-if="post.meta?.type === 'quote'" class="relative">
      <span class="absolute -top-4 -left-4 text-6xl text-gold/20 dark:text-muted-gold/20 font-serif leading-none select-none">"</span>
      <blockquote class="italic text-lg md:text-xl pl-6 border-l-2 border-gold/50 dark:border-muted-gold/50 relative z-10 text-ink dark:text-offwhite">
        <ContentRenderer :value="post" class="prose dark:prose-invert max-w-none" />
      </blockquote>
      <div v-if="post.meta?.author" class="mt-4 text-right font-serif text-sm opacity-80">
        — {{ post.meta.author }}
      </div>
    </div>
    
    <!-- Post Layout -->
    <div v-else class="post-content">
      <h2 class="text-2xl mb-2 text-gold dark:text-muted-gold">{{ post.title || post.meta?.title }}</h2>
      <div class="text-xs font-serif opacity-60 mb-6 uppercase tracking-widest">{{ formatDate(post.meta?.date) }}</div>
      
      <!-- Content styling with a drop cap for the first letter -->
      <div class="prose dark:prose-invert max-w-none font-sans text-ink dark:text-offwhite prose-p:first-of-type:first-letter:text-5xl prose-p:first-of-type:first-letter:font-serif prose-p:first-of-type:first-letter:text-gold prose-p:first-of-type:first-letter:mr-2 prose-p:first-of-type:first-letter:float-left">
        <ContentRenderer :value="post" />
      </div>
    </div>
    
    <!-- Tags (Shared) -->
    <div v-if="post.meta?.tags && post.meta.tags.length" class="mt-6 flex flex-wrap gap-2">
      <span v-for="tag in post.meta.tags" :key="tag" class="text-xs font-serif px-3 py-1 rounded-full bg-sepia/5 dark:bg-offwhite/5 border border-sepia/10 dark:border-offwhite/10 opacity-70">
        #{{ tag }}
      </span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date)
}
</script>
