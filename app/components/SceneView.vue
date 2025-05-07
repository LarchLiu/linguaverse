<script setup lang="ts">
const props = defineProps<{
  description: string
}>()
const activeTab = ref('vocabulary')
const vocabularySection = ref<HTMLDivElement | null>(null)
const phrasesSection = ref<HTMLDivElement | null>(null)
const tipsSection = ref<HTMLDivElement | null>(null)
const body = computed(() => ({ content: props.description }))

const { data, status } = await useFetch('/api/scene-words', {
  method: 'POST',
  body,
})

const isLoading = computed(() => status.value === 'pending')

provide('activeTab', activeTab)

function setActiveTab(tab: string) {
  activeTab.value = tab
  const element = document.getElementById(tab)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

provide('setActiveTab', setActiveTab)

function handleScroll() {
  const sections = [
    { id: 'vocabulary', ref: vocabularySection },
    { id: 'phrases', ref: phrasesSection },
    { id: 'tips', ref: tipsSection },
  ]

  for (const section of sections) {
    if (!section.ref.value)
      continue

    const rect = section.ref.value.getBoundingClientRect()
    if (rect.top <= 200 && rect.bottom >= 200) {
      activeTab.value = section.id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <TabNavigation />
    <template v-if="isLoading">
      <div class="space-y-8">
        <Skeleton :count="2" />
        <Skeleton :count="2" />
        <Skeleton :count="2" />
      </div>
    </template>

    <template v-else-if="data">
      <div id="vocabulary" ref="vocabularySection" class="scroll-mt-32">
        <VocabularySection :items="data.vocabulary" />
      </div>

      <div id="phrases" ref="phrasesSection" class="scroll-mt-32">
        <PhrasesSection :items="data.phrases" />
      </div>

      <div id="tips" ref="tipsSection" class="scroll-mt-32">
        <TipsSection :items="data.tips" />
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
