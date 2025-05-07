<script setup lang="ts">
import type { PhrasesItem } from '~/types'

const props = defineProps<{
  items: PhrasesItem[]
}>()
const showMore = ref(false)
const visibleItems = ref(4)
const itemsPerPage = 4

const phraseItems = ref(props.items)

const displayedItems = computed(() => {
  return phraseItems.value.slice(0, visibleItems.value)
})

function toggleShowMore() {
  if (showMore.value && visibleItems.value === phraseItems.value.length) {
    showMore.value = false
    visibleItems.value = itemsPerPage
  }
  else {
    showMore.value = true
    visibleItems.value = Math.min(visibleItems.value + itemsPerPage, phraseItems.value.length)
  }
}
</script>

<template>
  <div>
    <div class="section-title">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Phrases</span>
    </div>

    <div class="mt-2 space-y-3">
      <PhraseCard
        v-for="(item, index) in displayedItems"
        :key="index"
        :chinese="item.chinese"
        :english="item.english"
      />
    </div>

    <button
      v-if="phraseItems.length > 4"
      class="flex items-center justify-center w-full py-3 mt-4 primary-button"
      @click="toggleShowMore"
    >
      <span>{{ showMore && visibleItems === phraseItems.length ? 'Show less' : 'See more' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1" :class="{ 'rotate-180': showMore && visibleItems === phraseItems.length }">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </div>
</template>
