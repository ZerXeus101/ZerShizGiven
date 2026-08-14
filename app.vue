<template>
  <div class="min-h-screen">
    <!-- Header with Title and Theme Toggle -->
    <header class="renaissance-border border-x-0 border-t-0 p-6 flex justify-between items-center max-w-4xl mx-auto">
      <h1 class="text-3xl md:text-4xl text-gold dark:text-muted-gold">ZerShizGiven</h1>
      <ThemeToggle />
    </header>

    <!-- Main Content Area -->
    <main class="max-w-4xl mx-auto p-6 min-h-[calc(100vh-160px)] pt-12">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="text-center p-6 text-sm opacity-60 font-serif mt-12">
      &copy; {{ new Date().getFullYear() }} ZerShizGiven. A Renaissance of Thought.
    </footer>
  </div>
</template>
