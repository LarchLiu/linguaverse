<script setup lang="ts">
import type { VocabularyItem } from '~/types'

defineProps<VocabularyItem>()
</script>

<template>
  <div class="p-3 bg-white rounded-xl shadow-sm">
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <div class="mb-1 chinese-text">
          {{ chinese }}
        </div>
        <div class="translation-text">
          {{ english }}
        </div>
      </div>
      <AudioButton :audio-source="english" class="ml-2 flex-shrink-0" />
    </div>
  </div>
</template>
