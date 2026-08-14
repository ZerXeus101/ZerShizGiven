<template>
  <div>
    <!-- Filter Bar -->
    <div class="flex justify-center mb-10 space-x-4">
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
      <ContentCard v-for="post in filteredPosts" :key="post._path" :post="post" />
    </div>
  </div>
</template>

<script setup>
const activeFilter = ref('all')

const { data: posts, pending } = await useAsyncData('content', () => 
  queryContent('/').sort({ date: -1 }).find()
)

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
</script>
