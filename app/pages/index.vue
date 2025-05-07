<script setup>
const sceneDescription = ref('')
</script>

<template>
  <div class="min-h-screen bg-background-light">
    <Header />
    <div class="container px-4 py-4 mx-auto max-w-md">
      <LessonHeader v-model:subtitle="sceneDescription" title="Mandarin Chinese" />
      <ClientOnly>
        <SceneView :description="sceneDescription" />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
/* Global styles are imported from assets/css/main.css */
</style>
