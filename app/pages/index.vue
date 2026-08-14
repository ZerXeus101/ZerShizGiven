<template>
  <div class="relative">
    <!-- Filter Bar -->
    <div ref="filterBarRef" class="flex justify-center mb-10 z-20 relative">
      <div class="glass-panel renaissance-border rounded-full px-2 py-1 flex space-x-2 relative dark:!border-none dark:!shadow-none">
        <!-- Sliding Bubble Background -->
        <div 
          class="absolute top-1 bottom-1 rounded-full bg-gold/20 dark:bg-muted-gold/20 transition-all duration-300 ease-out z-0"
          :style="bubbleStyle"
        ></div>
        
        <button 
          v-for="(filter, i) in ['all', 'posts', 'quotes']" 
          :key="filter"
          :ref="el => { if (el) buttonRefs[i] = el }"
          @click="setFilter(filter, i)"
          class="px-6 py-2 rounded-full font-serif text-sm uppercase tracking-widest transition-colors duration-300 relative z-10"
          :class="activeFilter === filter ? 'text-gold dark:text-muted-gold text-shadow-sm' : 'text-ink dark:text-offwhite opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    
    <!-- Feed -->
    <div v-if="pending" class="text-center py-10 opacity-50 font-serif italic">
      Unearthing manuscripts...
    </div>
    <div v-else-if="filteredPosts.length === 0" class="text-center py-10 opacity-50 font-serif italic">
      No writings found.
    </div>
    <div v-else class="space-y-4">
      <!-- Top Pagination -->
      <UiPagination 
        v-model="currentPage" 
        :total="filteredPosts.length" 
        :pageSize="pageSize" 
      />

      <div class="mt-4 mb-4">
        <ContentCard v-for="post in paginatedPosts" :key="post.path" :post="post" />
      </div>

      <!-- Bottom Pagination -->
      <UiPagination 
        v-model="currentPage" 
        :total="filteredPosts.length" 
        :pageSize="pageSize" 
      />
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
const activeFilterIndex = ref(0)
const filterBarRef = ref(null)
const showBackToTop = ref(false)

const buttonRefs = ref([])
const bubbleStyle = ref({ width: '0px', transform: 'translateX(0px)' })

const currentPage = ref(1)
const pageSize = 10

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

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPosts.value.slice(start, end)
})

const updateBubble = () => {
  const btn = buttonRefs.value[activeFilterIndex.value]
  if (btn) {
    bubbleStyle.value = {
      width: `${btn.offsetWidth}px`,
      transform: `translateX(${btn.offsetLeft - 8}px)` // -8px accounts for the px-2 on the parent container
    }
  }
}

const setFilter = (filter, index = 0) => {
  activeFilter.value = filter
  activeFilterIndex.value = index
  currentPage.value = 1 // Reset to first page when filtering
  updateBubble()
}

// Watch for page changes to auto-scroll to the top
watch(currentPage, () => {
  scrollToTop()
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  setTimeout(updateBubble, 50)
  window.addEventListener('resize', updateBubble)
  
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
    window.removeEventListener('resize', updateBubble)
  })
})
</script>
