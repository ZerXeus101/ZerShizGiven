<template>
  <div class="flex items-center justify-center space-x-2 py-4" v-if="totalPages > 1">
    <!-- Previous Button -->
    <button 
      @click="prevPage" 
      :disabled="currentPage === 1"
      class="p-2 rounded-full renaissance-border glass-panel transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10 dark:hover:bg-muted-gold/10 text-gold dark:text-muted-gold"
      aria-label="Previous page"
    >
      <svg xmlns="http://www.w3.org/O/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <!-- Page Numbers -->
    <div class="flex items-center space-x-1 font-serif text-sm">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        :class="page === currentPage ? 'bg-gold dark:bg-muted-gold text-parchment dark:text-charcoal shadow-sm' : 'hover:bg-gold/10 dark:hover:bg-muted-gold/10 text-ink dark:text-offwhite opacity-70 hover:opacity-100'"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button 
      @click="nextPage" 
      :disabled="currentPage === totalPages"
      class="p-2 rounded-full renaissance-border glass-panel transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10 dark:hover:bg-muted-gold/10 text-gold dark:text-muted-gold"
      aria-label="Next page"
    >
      <svg xmlns="http://www.w3.org/O/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const visiblePages = computed(() => {
  const pages = []
  // Keep it simple for now, show all pages if few, else show around current
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}
</script>
