<script setup lang="ts">
import type { TipsItem } from '~/types'

defineProps<TipsItem>()
</script>

<template>
  <div class="p-4 mb-6 bg-white rounded-xl shadow-sm">
    <h3 class="mb-2 text-base font-semibold">
      {{ chinese }}
    </h3>
    <p class="mb-3 text-sm text-gray-700">
      {{ english }}
    </p>

    <div v-if="examples && examples.length > 0" class="mt-4">
      <div v-for="(example, index) in examples" :key="index" class="p-3 mb-2 rounded-lg bg-gray-50">
        <div class="flex items-center justify-between">
          <div>
            <div class="mb-1 text-base font-semibold">
              {{ example.chinese }}
            </div>
            <!-- <div class="mb-1 text-xs text-gray-600">
              {{ example.pinyin }}
            </div> -->
            <div class="text-sm">
              {{ example.english }}
            </div>
          </div>
          <div class="flex items-center">
            <button v-if="example.explain" class="p-1 mr-2 text-primary rounded-full hover:bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
            <AudioButton :audio-source="english" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
