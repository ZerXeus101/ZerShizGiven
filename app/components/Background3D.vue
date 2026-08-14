<template>
  <div class="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-color-burn dark:mix-blend-color-dodge">
    <TresCanvas alpha window-size>
      <TresPerspectiveCamera :position="[0, 0, 10]" />
      <TresAmbientLight :intensity="1.5" />
      <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" color="#F4F1EA" />
      
      <Background3DElements />
    </TresCanvas>
  </div>
</template>

<script setup>
</script>
