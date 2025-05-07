<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:subtitle'])
const isEditing = ref(false)
const editedSubtitle = ref(props.subtitle)

function handleSubmit() {
  isEditing.value = false
  emit('update:subtitle', editedSubtitle.value)
}

function startEditing() {
  isEditing.value = true
  editedSubtitle.value = props.subtitle
  // 使用 nextTick 确保输入框渲染后再获取焦点
  nextTick(() => {
    document.getElementById('subtitle-input').focus()
  })
}
</script>

<template>
  <div class="flex items-center py-4">
    <div class="flex-1">
      <div class="flex items-center mb-2">
        <button class="p-1 mr-2 text-primary rounded-full hover:bg-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div class="flex items-center space-x-2">
          <button class="p-1 text-blue-600 rounded-full hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </button>
          <button class="p-1 text-gray-600 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-primary">
        {{ title }}
      </h1>
      <div class="flex items-center">
        <template v-if="isEditing">
          <input
            id="subtitle-input"
            v-model="editedSubtitle"
            class="text-2xl font-bold text-text-primary bg-transparent outline-none w-full"
            @blur="handleSubmit"
            @keyup.enter="handleSubmit"
          >
          <button
            class="p-1 text-green-600 rounded-full hover:bg-green-50 ml-2"
            @click="handleSubmit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        </template>
        <div v-else class="w-full" @click="startEditing">
          <h2
            class="text-2xl font-bold text-text-primary cursor-pointer hover:text-primary min-h-[2rem]"
          >
            {{ subtitle }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
