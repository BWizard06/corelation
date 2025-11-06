<template>
  <section class="px-6 sm:px-10 lg:px-14 py-6 sm:py-10 max-w-4xl mx-auto">
    <p
      v-motion
      :initial="titleAnimation.initial"
      :visibleOnce="titleAnimation.visibleOnce"
      class="text-3xl sm:text-4xl font-bold mb-6 text-dark-grey"
    >
      {{ title }}
    </p>
    
    <p 
      v-motion
      :initial="textAnimation.initial"
      :visibleOnce="textAnimation.visibleOnce"
      class="text-lg leading-relaxed text-dark-grey whitespace-pre-line"
      v-html="text"
    >
    
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  text: string
}>()

const titleAnimation = ref({
  initial: {
    opacity: 0,
    x: -20,
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 600,
      ease: 'easeOut',
      delay: 100,
    }
  }
})

const textAnimation = ref({
  initial: {
    opacity: 0,
    y: 20,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 700,
      ease: 'easeOut',
      delay: 300,
    }
  }
})
</script>