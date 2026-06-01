<template>
  <div 
    v-motion
    :initial="cardAnimation.initial"
    :visibleOnce="getCardAnimation()"
    class="group cursor-pointer border border-light-grey rounded-xl overflow-hidden w-full lg:w-[540px] bg-white"
  >
    <div class="relative overflow-hidden bg-light-grey/10 aspect-[4/3]">
      <img 
        :src="image" 
        :alt="title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    
    <div class="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h3 class="text-xl sm:text-2xl font-medium">
        {{ title }}
      </h3>
      
      <NuxtLinkLocale
        :to="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-red hover:text-red/80 transition-colors font-medium group/link"
      >
        <span class="transition-transform duration-200 group-hover/link:translate-x-1">
          {{ $t('reference.more') }}
        </span>
        <phosphor-icon
          name="arrow-square-out"
          class="w-5 h-5 transition-transform duration-200 group-hover/link:rotate-12"
        />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  image: string
  link: string
  animationDelay?: number
}>()

const cardAnimation = ref({
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98
  }
})

const getCardAnimation = () => {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: props.animationDelay || 200,
      duration: 600,
      ease: 'easeOut'
    }
  }
}
</script>