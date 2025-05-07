<script setup lang="ts">
import type { TipsItem } from '~/types'

const props = defineProps<{
  items: TipsItem[]
}>()
const showMore = ref(false)
const visibleItems = ref(2)

const tips = ref(props.items)

const displayedItems = computed(() => {
  return tips.value.slice(0, visibleItems.value)
})

function toggleShowMore() {
  if (showMore.value && visibleItems.value === tips.value.length) {
    showMore.value = false
    visibleItems.value = 1
  }
  else {
    showMore.value = true
    visibleItems.value = Math.min(visibleItems.value + 1, tips.value.length)
  }
}
</script>

<template>
  <div>
    <div class="section-title">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
      <span>Tips</span>
    </div>

    <div class="mt-2">
      <TipCard
        v-for="(tip, index) in displayedItems"
        :key="index"
        :chinese="tip.chinese"
        :english="tip.english"
        :examples="tip.examples"
      />
    </div>

    <button
      v-if="tips.length > 1"
      class="flex items-center justify-center w-full py-3 mt-4 primary-button"
      @click="toggleShowMore"
    >
      <span>{{ showMore && visibleItems === tips.length ? 'Show less' : 'See more' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1" :class="{ 'rotate-180': showMore && visibleItems === tips.length }">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </div>
</template>
