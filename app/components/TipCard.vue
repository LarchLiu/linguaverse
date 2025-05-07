<script setup lang="ts">
import type { TipsItem } from '~/types'

defineProps<TipsItem>()
const activeExplain = ref('')
const showPopup = ref(false)
const tooltipPosition = ref({ top: 0, left: 0 })
const tooltipRef = ref<HTMLElement | null>(null)

async function handleExplainClick(explain: string, event: MouseEvent) {
  event.stopPropagation()
  activeExplain.value = explain
  showPopup.value = true

  await nextTick()

  if (tooltipRef.value) {
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    const tooltipRect = tooltipRef.value.getBoundingClientRect()

    // 获取视窗尺寸和滚动位置
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // 初始位置计算（按钮上方居中）
    let top = rect.top - tooltipRect.height - 10
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2)

    // 检查顶部是否有足够空间
    const hasSpaceOnTop = top >= 0
    // 检查底部是否有足够空间
    const hasSpaceOnBottom = (rect.bottom + tooltipRect.height + 10) <= viewportHeight

    // 垂直位置调整
    if (!hasSpaceOnTop && hasSpaceOnBottom) {
      // 如果上方空间不足但下方空间足够，显示在下方
      top = rect.bottom + 10
    }
    else if (!hasSpaceOnTop && !hasSpaceOnBottom) {
      // 如果上下都不够，尽量居中显示
      top = Math.max(10, Math.min(viewportHeight - tooltipRect.height - 10, rect.top))
    }

    // 水平位置调整
    if (left < 0) {
      // 左边超出屏幕
      left = 10
    }
    else if ((left + tooltipRect.width) > viewportWidth) {
      // 右边超出屏幕
      left = viewportWidth - tooltipRect.width - 10
    }

    // 更新位置
    tooltipPosition.value = {
      top,
      left,
    }
  }
}

// 点击页面任意位置关闭 tooltip
function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  const button = event.target as HTMLElement

  // 如果点击的是按钮本身，不处理
  if (button.closest('.explain-button')) {
    return
  }

  if (tooltipRef.value && !tooltipRef.value.contains(target)) {
    showPopup.value = false
  }
}

// 处理滚动事件
function handleScroll() {
  if (showPopup.value) {
    showPopup.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
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
            <button
              v-if="example.explain"
              class="p-1 mr-2 text-primary rounded-full hover:bg-blue-50 relative  explain-button"
              @click="(event: MouseEvent) => handleExplainClick(example.explain!, event)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
            <AudioButton :audio-source="example.english" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="tooltip">
      <div
        v-show="showPopup"
        ref="tooltipRef"
        class="fixed z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs text-sm"
        :style="{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: 'translateY(0)',
        }"
        @click.stop
      >
        {{ activeExplain }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
