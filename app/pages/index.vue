<template>
  <div class="relative">
    <!-- Filter Bar -->
    <div ref="filterBarRef" class="flex justify-center mb-10 space-x-4">
      <button 
        v-for="filter in ['all', 'posts', 'quotes']" 
        :key="filter"
        @click="activeFilter = filter"
        class="px-4 py-2 font-serif text-sm uppercase tracking-widest transition-all duration-300"
        :class="activeFilter === filter ? 'border-b-2 border-gold dark:border-muted-gold text-gold dark:text-muted-gold' : 'opacity-60 hover:opacity-100'"
      >
        {{ filter }}
      </button>
    </div>
    
    <!-- Feed -->
    <div v-if="pending" class="text-center py-10 opacity-50 font-serif italic">
      Unearthing manuscripts...
    </div>
    <div v-else-if="filteredPosts.length === 0" class="text-center py-10 opacity-50 font-serif italic">
      No writings found.
    </div>
    <div v-else class="space-y-4">
      <ContentCard v-for="post in filteredPosts" :key="post.path" :post="post" />
    </div>

    <!-- Scroll to Top Button -->
    <Transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="opacity-0 translate-y-4" 
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="opacity-100 translate-y-0" 
      leave-to-class="opacity-0 translate-y-4"
    >
      <button 
        v-if="showBackToTop" 
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-3 rounded-full renaissance-border glass-panel hover:bg-gold/10 dark:hover:bg-muted-gold/10 transition-colors z-50 text-gold dark:text-muted-gold shadow-lg cursor-pointer"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/O/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
const activeFilter = ref('all')
const filterBarRef = ref(null)
const showBackToTop = ref(false)

const { data: posts, pending } = await useAsyncData('content', async () => {
  const allPosts = await queryCollection('content').all()
  return allPosts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (activeFilter.value === 'all') return posts.value
  
  return posts.value.filter(post => {
    // If we're looking for posts, exclude quotes
    if (activeFilter.value === 'posts') return post.type !== 'quote'
    // If we're looking for quotes, only include quotes
    if (activeFilter.value === 'quotes') return post.type === 'quote'
    return true
  })
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (!filterBarRef.value) return
  
  const observer = new IntersectionObserver((entries) => {
    // When the filter bar is NOT intersecting (not visible), show the button
    showBackToTop.value = !entries[0].isIntersecting
  }, {
    root: null,
    threshold: 0 // Trigger as soon as it leaves the viewport
  })
  
  observer.observe(filterBarRef.value)
  
  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>
