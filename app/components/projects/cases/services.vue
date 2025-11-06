<template>
  <section class="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-10 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-6xl mx-auto">
      <p 
        v-motion
        :initial="titleAnimation.initial"
        :visibleOnce="titleAnimation.visibleOnce"
        class="text-3xl sm:text-4xl font-bold mb-12 text-dark-grey text-center"
      >
        Services
    </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="(item, index) in services"
          :key="item"
          v-motion
          :initial="cardAnimation.initial"
          :visibleOnce="getCardAnimation(index)"
          class="group relative"
        >
          <div class="relative h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-red/20">
            <div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-red/10 text-red transition-transform duration-300 group-hover:scale-110 group-hover:bg-red/20">
              <phosphor-icon
                name="check-circle"
                class="w-6 h-6"
                weight="fill"
              />
            </div>

            <p class="text-lg font-medium text-dark-grey leading-relaxed">
              {{ item }}
            </p>

            <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  services: string[]
}>()

const titleAnimation = ref({
  initial: {
    opacity: 0,
    y: -20,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 600,
      ease: 'easeOut',
    }
  }
})

const cardAnimation = ref({
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  }
})

const getCardAnimation = (index: number) => {
  const row = Math.floor(index / 3)
  const col = index % 3
  
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 600,
      ease: 'easeOut',
      delay: 200 + (row * 100) + (col * 80),
    }
  }
}
</script>