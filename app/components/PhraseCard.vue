<script setup lang="ts">
import type { PhrasesItem } from '~/types'

defineProps<PhrasesItem>()
</script>

<template>
  <div class="p-4 mb-3 bg-white rounded-xl shadow-sm">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="mb-1 chinese-text">
          {{ chinese }}
        </div>
        <div class="translation-text">
          {{ english }}
        </div>
      </div>
      <AudioButton :audio-source="english" />
    </div>
  </div>
</template>
