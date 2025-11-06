<template>
  <component 
    :is="to ? NuxtLinkLocale : 'div'" 
    :to="to" 
    v-motion
    :initial="cardAnimation.initial"
    :visibleOnce="getCardAnimation()"
    class="block group cursor-pointer"
  >
    <div
      class="aspect-square rounded-2xl border border-black/5 bg-white overflow-hidden
             shadow-sm transition-all duration-300 flex flex-col
             hover:translate-y-[-4px] hover:shadow-lg"
    >
      <div class="relative flex-1 min-h-0 overflow-hidden">
        <img
          :src="image"
          :alt="`${company} – ${title}`"
          class="absolute inset-0 h-full w-full object-cover object-center
                 transition duration-300 group-hover:scale-[1.05]"
        />
      </div>

      <div class="p-6 relative overflow-hidden">
        <div class="absolute top-0 left-0 h-[2px] w-0 bg-red transition-all duration-300 group-hover:w-full"></div>
        
        <p class="text-xs md:text-sm text-slate-500 transition-colors duration-200 group-hover:text-slate-700">
          {{ company }}
        </p>
        <p class="mt-1 text-lg md:text-2xl leading-tight font-semibold text-slate-900">
          {{ title }}
        </p>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale') as Component
const props = defineProps<{
  company: string
  title: string
  image: string
  to?: string
  animationDelay?: number
}>()

const cardAnimation = ref({
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.97
  }
})

const getCardAnimation = () => {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: props.animationDelay || 0,
      duration: 500,
      ease: 'easeOut'
    }
  }
}
</script>