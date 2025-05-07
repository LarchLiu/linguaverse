<script setup lang="ts">
import type { VocabularyItem } from '~/types'

const props = defineProps<{
  items: VocabularyItem[]
}>()
const showMore = ref(false)
const visibleItems = ref(4)
const itemsPerPage = 4

const vocabularyItems = ref(props.items)

const displayedItems = computed(() => {
  return vocabularyItems.value.slice(0, visibleItems.value)
})

function toggleShowMore() {
  if (showMore.value && visibleItems.value === vocabularyItems.value.length) {
    showMore.value = false
    visibleItems.value = itemsPerPage
  }
  else {
    showMore.value = true
    visibleItems.value = Math.min(visibleItems.value + itemsPerPage, vocabularyItems.value.length)
  }
}
</script>

<template>
  <div>
    <div class="section-title">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
      <span>Vocabulary</span>
    </div>

    <div class="mt-2 grid grid-cols-2 gap-3">
      <VocabularyCard
        v-for="(item, index) in displayedItems"
        :key="index"
        :chinese="item.chinese"
        :english="item.english"
      />
    </div>

    <button
      v-if="vocabularyItems.length > 4"
      class="flex items-center justify-center w-full py-3 mt-4 primary-button"
      @click="toggleShowMore"
    >
      <span>{{ showMore && visibleItems === vocabularyItems.length ? 'Show less' : 'See more' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1" :class="{ 'rotate-180': showMore && visibleItems === vocabularyItems.length }">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </div>
</template>
