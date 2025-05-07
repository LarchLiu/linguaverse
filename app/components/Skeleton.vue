<script setup lang="ts">
defineProps<{
  count?: number
}>()
</script>

<template>
  <div class="animate-pulse">
    <div v-for="i in (count || 3)" :key="i" class="mb-4">
      <div class="h-4 bg-gray-200 rounded w-3/4" />
      <div class="space-y-3 mt-4">
        <div class="h-3 bg-gray-200 rounded" />
        <div class="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  </div>
</template>
